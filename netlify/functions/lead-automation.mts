import { randomUUID } from "node:crypto";
import type { FormSubmittedEvent } from "@netlify/functions";

/**
 * Déclenchée par Netlify après vérification d'une soumission de formulaire
 * (event-triggered function — handler "formSubmitted"). Netlify Forms reste
 * la source de vérité : cette fonction ne fait que relayer une copie
 * normalisée vers l'automatisation externe (Make.com → Google Sheets).
 * Un échec ici ne doit jamais faire échouer la soumission déjà acceptée
 * par Netlify — voir sendToAutomationWebhook().
 */

const FIELD_LIMITS = {
  name: 200,
  company: 200,
  phone: 80,
  email: 320,
  projectType: 100,
  message: 5000,
} as const;

const WEBHOOK_TIMEOUT_MS = 9000;

export function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function trimText(value: string, maxLength: number): string {
  return value.trim().slice(0, maxLength);
}

/**
 * Empêche qu'une valeur utilisateur soit interprétée comme une formule par
 * Excel/tableur (=, +, -, @ en tête). Un préfixe apostrophe force un rendu
 * texte inoffensif — technique standard de neutralisation CSV/Excel.
 * S'applique aussi au téléphone, qui commence naturellement par "+".
 */
export function safeSpreadsheetText(value: string): string {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function normalizeField(raw: unknown, maxLength: number): string {
  return safeSpreadsheetText(trimText(asString(raw), maxLength));
}

export interface NormalizedLead {
  leadId: string;
  submittedAt: string;
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
}

/**
 * event.data (FormSubmittedEvent) n'expose que les champs soumis — aucun
 * identifiant ni horodatage natif n'est documenté par l'API Netlify
 * actuelle. On génère donc un identifiant stable et un horodatage réel au
 * moment du traitement, conformément au repli explicitement autorisé.
 */
export function buildLeadPayload(data: Record<string, string>): NormalizedLead {
  return {
    leadId: randomUUID(),
    submittedAt: new Date().toISOString(),
    name: normalizeField(data.name, FIELD_LIMITS.name),
    company: normalizeField(data.company, FIELD_LIMITS.company),
    phone: normalizeField(data.phone, FIELD_LIMITS.phone),
    email: normalizeField(data.email, FIELD_LIMITS.email),
    projectType: normalizeField(data.projectType, FIELD_LIMITS.projectType),
    message: normalizeField(data.message, FIELD_LIMITS.message),
    status: "Nouveau",
    source: "Portfolio",
    followUpDate: "",
    notes: "",
  };
}

/**
 * "form-name" est un champ soumis par le formulaire lui-même et devrait
 * apparaître dans data. Si Netlify ne le propage pas, on retombe sur une
 * vérification structurelle (email + message requis) : le site n'a
 * aujourd'hui qu'un seul formulaire ("contact"), mais cela évite de
 * déclencher l'automatisation sur un futur formulaire différent.
 */
export function isContactFormSubmission(data: Record<string, string>): boolean {
  if (typeof data["form-name"] === "string") {
    return data["form-name"] === "contact";
  }
  return typeof data.email === "string" && typeof data.message === "string";
}

async function sendToAutomationWebhook(payload: NormalizedLead): Promise<void> {
  const webhookUrl = process.env.LEADS_AUTOMATION_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log("[lead-automation] lead automation disabled: webhook URL not configured");
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
      `[lead-automation] submission=${payload.leadId} automation=${response.ok ? "success" : "failed"} httpStatus=${response.status}`,
    );
  } catch (error) {
    const reason =
      error instanceof Error && error.name === "AbortError" ? "timeout" : "network-error";
    console.log(`[lead-automation] submission=${payload.leadId} automation=failed reason=${reason}`);
  } finally {
    clearTimeout(timeoutId);
  }
}

const handlers = {
  async formSubmitted(event: FormSubmittedEvent) {
    const { data } = event;

    if (!isContactFormSubmission(data)) {
      console.log("[lead-automation] formName=other automation=skipped");
      return;
    }

    const payload = buildLeadPayload(data);
    console.log(`[lead-automation] submission=${payload.leadId} formName=contact automation=starting`);

    // Ne doit jamais faire échouer/retarder la soumission Netlify déjà acceptée.
    await sendToAutomationWebhook(payload);
  },
};

export default handlers;
