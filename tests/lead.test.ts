import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LEAD_FIELDS, isValidEmail, isValidPhone, validateLead } from "../src/lib/lead.ts";
import {
  buildLeadPayload,
  isContactFormSubmission,
  isTestLead,
  safeSpreadsheetText,
} from "../netlify/functions/lead-automation.mts";

const valid = {
  name: "[TEST] Client fictif",
  email: "test@example.com",
  phone: "",
  projectType: "presence",
  message: "Site pour un café de quartier, test automatisé.",
  consent: "yes",
};

test("demande valide acceptée", () => {
  assert.deepEqual(validateLead(valid), []);
});

test("e-mail OU téléphone suffit", () => {
  assert.deepEqual(validateLead({ ...valid, email: "", phone: "+212 6 00 00 00 00" }), []);
  assert.deepEqual(validateLead({ ...valid, email: "", phone: "" }), ["contact"]);
});

test("erreurs de validation détectées", () => {
  const errors = validateLead({
    name: " ",
    email: "pas-un-email",
    phone: "abc",
    projectType: "hack",
    message: "court",
    consent: "",
  });
  assert.deepEqual(errors.sort(), ["consent", "description", "email", "name", "phone", "service"].sort());
});

test("formats e-mail et téléphone", () => {
  assert.ok(isValidEmail("nom@domaine.pt"));
  assert.ok(!isValidEmail("nom@domaine"));
  assert.ok(isValidPhone("+351 912 345 678"));
  assert.ok(isValidPhone("06 48 55 22 22"));
  assert.ok(!isValidPhone("12345"));
  assert.ok(!isValidPhone("+212 6 48 55 22 22 ext. 4"));
});

test("message trop long refusé", () => {
  assert.deepEqual(validateLead({ ...valid, message: "x".repeat(5001) }), ["description"]);
});

test("payload normalisé : champs historiques conservés, neutralisation tableur", () => {
  const payload = buildLeadPayload({ ...valid, company: "=HYPERLINK(\"x\")", phone: "+212600000000", locale: "fr" });
  assert.equal(payload.source, "Portfolio");
  assert.equal(payload.status, "Nouveau");
  assert.equal(payload.company, "'=HYPERLINK(\"x\")");
  assert.equal(payload.phone, "'+212600000000");
  assert.equal(payload.locale, "fr");
  assert.equal(payload.isTest, true);
  for (const key of ["name", "company", "phone", "email", "projectType", "message"]) {
    assert.ok(key in payload, key);
  }
});

test("détection des demandes de test et du formulaire", () => {
  assert.ok(isTestLead({ name: "[TEST] x" }));
  assert.ok(!isTestLead({ name: "Vrai client" }));
  assert.ok(isContactFormSubmission({ "form-name": "contact" }));
  assert.ok(!isContactFormSubmission({ "form-name": "autre" }));
  assert.equal(safeSpreadsheetText("@cmd"), "'@cmd");
});

test("le HTML de détection Netlify déclare exactement les champs du formulaire", () => {
  const html = readFileSync(new URL("../public/netlify-forms/contact.html", import.meta.url), "utf8");
  const declared = [...html.matchAll(/name="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((n) => !["contact", "robots", "form-name", "bot-field"].includes(n));
  assert.deepEqual(new Set(declared), new Set(LEAD_FIELDS));
});
