/**
 * Contrat du formulaire de devis, partagé par le formulaire (navigateur),
 * la fonction Netlify lead-automation (serveur) et les tests.
 * Aucun import : doit rester exécutable tel quel par Node et Netlify.
 *
 * Les noms historiques (name, company, phone, email, projectType, message)
 * sont conservés pour ne pas casser le mapping Make existant ; les autres
 * champs sont ajoutés (voir docs/PORTFOLIO_V2/07_LEAD_SYSTEM.md).
 */

export const FORM_NAME = "contact";

export const LEAD_FIELDS = [
  "name",
  "company",
  "email",
  "phone",
  "projectType",
  "message",
  "timeline",
  "contactPreference",
  "budget",
  "consent",
  "locale",
  "channel",
  "sourceDetail",
  "entryPage",
] as const;

export type LeadField = (typeof LEAD_FIELDS)[number];
export type LeadValues = Record<LeadField, string>;

export const LEAD_LIMITS: Record<LeadField, number> = {
  name: 200,
  company: 200,
  email: 320,
  phone: 40,
  projectType: 40,
  message: 5000,
  timeline: 40,
  contactPreference: 20,
  budget: 120,
  consent: 10,
  locale: 5,
  channel: 20,
  sourceDetail: 200,
  entryPage: 300,
};

export const SERVICE_VALUES = ["presence", "automation", "apps", "ai", "other"] as const;
export const TIMELINE_VALUES = ["asap", "1-3-months", "3-plus-months", "unsure"] as const;
export const CONTACT_PREFERENCE_VALUES = ["whatsapp", "phone", "email"] as const;

/** Clés d'erreur = clés de Dictionary["quote"]["errors"]. */
export type LeadErrorKey =
  | "name"
  | "contact"
  | "email"
  | "phone"
  | "service"
  | "description"
  | "consent";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!/^\+?[\d\s().-]+$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "").length;
  return digits >= 8 && digits <= 15;
}

export function validateLead(values: Partial<Record<LeadField, string>>): LeadErrorKey[] {
  const v = (key: LeadField) => (values[key] ?? "").trim();
  const errors: LeadErrorKey[] = [];

  if (!v("name")) errors.push("name");
  if (!v("email") && !v("phone")) errors.push("contact");
  if (v("email") && !isValidEmail(v("email"))) errors.push("email");
  if (v("phone") && !isValidPhone(v("phone"))) errors.push("phone");
  if (!(SERVICE_VALUES as readonly string[]).includes(v("projectType"))) errors.push("service");
  if (v("message").length < 10) errors.push("description");
  if (v("consent") !== "yes") errors.push("consent");

  for (const field of LEAD_FIELDS) {
    if (v(field).length > LEAD_LIMITS[field]) {
      if (field === "message") errors.push("description");
      else if (field === "name") errors.push("name");
    }
  }
  return [...new Set(errors)];
}
