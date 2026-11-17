import { randomUUID } from "node:crypto";
import type { FormSubmittedEvent } from "@netlify/functions";
import { FORM_NAME, LEAD_LIMITS, validateLead, type LeadField } from "../../src/lib/lead.ts";

/**
 * Déclenchée par Netlify après acceptation d'une soumission de formulaire
 * (handler "formSubmitted"). Netlify Forms reste la source de vérité : cette
 * fonction ne fait que relayer une copie normalisée et validée vers
 * l'automatisation externe (Make.com → Google Sheets / Gmail).
 * Un échec ici ne fait jamais échouer la soumission déjà acceptée.
 */

const WEBHOOK_TIMEOUT_MS = 9000;

export function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function trimText(value: string, maxLength: number): string {
  return value.trim().slice(0, maxLength);
}

/**
 * Empêche qu'une valeur soit interprétée comme une formule par un tableur
 * (=, +, -, @ en tête) : un préfixe apostrophe force un rendu texte.
 */
export function safeSpreadsheetText(value: string): string {
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}

function normalize(data: Record<string, unknown>, field: LeadField): string {
  return safeSpreadsheetText(trimText(asString(data[field]), LEAD_LIMITS[field]));
}

export interface NormalizedLead {
  leadId: string;
  submittedAt: string;
  // Champs historiques — mapping Make existant inchangé.
  name: string;
  company: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
  status: "Nouveau";
  source: "Portfolio";
  followUpDate: "";
  notes: "";
  // Champs V2, ajoutés à la suite (colonnes Make/Sheets à créer).
  timeline: string;
  contactPreference: string;
  budget: string;
  consent: string;
  locale: string;
  channel: string;
  sourceDetail: string;
  entryPage: string;
  isTest: boolean;
}

/** Une demande de test se signale par un nom ou un message commençant par [TEST]. */
export function isTestLead(data: Record<string, unknown>): boolean {
  return /^\s*\[TEST\]/i.test(asString(data.name)) || /^\s*\[TEST\]/i.test(asString(data.message));
}

export function buildLeadPayload(data: Record<string, unknown>): NormalizedLead {
  return {
    leadId: randomUUID(),
    submittedAt: new Date().toISOString(),
    name: normalize(data, "name"),
    company: normalize(data, "company"),
    phone: normalize(data, "phone"),
    email: normalize(data, "email"),
    projectType: normalize(data, "projectType"),
    message: normalize(data, "message"),
    status: "Nouveau",
    source: "Portfolio",
    followUpDate: "",
    notes: "",
    timeline: normalize(data, "timeline"),
    contactPreference: normalize(data, "contactPreference"),
    budget: normalize(data, "budget"),
    consent: normalize(data, "consent"),
    locale: normalize(data, "locale"),
    channel: normalize(data, "channel"),
    sourceDetail: normalize(data, "sourceDetail"),
    entryPage: normalize(data, "entryPage"),
    isTest: isTestLead(data),
  };
}

export function isContactFormSubmission(data: Record<string, unknown>): boolean {
  if (typeof data["form-name"] === "string") return data["form-name"] === FORM_NAME;
  return typeof data.message === "string" && (typeof data.email === "string" || typeof data.phone === "string");
}

async function sendToAutomationWebhook(payload: NormalizedLead): Promise<void> {
  const webhookUrl = process.env.LEADS_AUTOMATION_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log("[lead-automation] automation disabled: webhook URL not configured");
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    console.log(
      `[lead-automation] submission=${payload.leadId} test=${payload.isTest} automation=${response.ok ? "success" : "failed"} httpStatus=${response.status}`,
    );
  } catch (error) {
    const reason = error instanceof Error && error.name === "AbortError" ? "timeout" : "network-error";
    console.log(`[lead-automation] submission=${payload.leadId} automation=failed reason=${reason}`);
  } finally {
    clearTimeout(timeoutId);
  }
}

const handlers = {
  async formSubmitted(event: FormSubmittedEvent) {
    const data = event.data as Record<string, unknown>;

    if (!isContactFormSubmission(data)) {
      console.log("[lead-automation] formName=other automation=skipped");
      return;
    }

    // Validation serveur : le navigateur valide aussi, mais une requête
    // forgée peut contourner le formulaire. Les données invalides ne sont
    // jamais relayées (elles restent visibles dans Netlify Forms).
    const errors = validateLead(
      Object.fromEntries(Object.entries(data).map(([k, v]) => [k, asString(v)])),
    );
    if (errors.length > 0) {
      console.log(`[lead-automation] validation=failed fields=${errors.join(",")} automation=skipped`);
      return;
    }

    const payload = buildLeadPayload(data);
    console.log(`[lead-automation] submission=${payload.leadId} test=${payload.isTest} automation=starting`);
    await sendToAutomationWebhook(payload);
  },
};

export default handlers;
