import { test } from "node:test";
import assert from "node:assert/strict";
import { buildVCard, escapeVCardText, foldLine } from "../src/lib/vcard.ts";
import { classifyVisit, withWhatsAppMessage } from "../src/lib/attribution.ts";

const card = buildVCard({
  givenName: "Rachid",
  familyName: "Berrada",
  title: "Développeur web & solutions digitales",
  email: "rachid.berrada20@gmail.com",
  phoneE164: "+212648552222",
  url: "https://rachidberrada.com/fr",
  githubUrl: "https://github.com/Rberr240",
  note: "Sites, automatisations; applications, sur mesure.",
  photoBase64: "A".repeat(500),
});

test("vCard 3.0 structurée et terminée en CRLF", () => {
  assert.ok(card.startsWith("BEGIN:VCARD\r\nVERSION:3.0\r\n"));
  assert.ok(card.endsWith("END:VCARD\r\n"));
  assert.ok(!/[^\r]\n/.test(card), "aucun LF isolé");
  assert.match(card, /\r\nN:Berrada;Rachid;;;\r\n/);
  assert.match(card, /\r\nFN:Rachid Berrada\r\n/);
  assert.match(card, /\r\nTEL;TYPE=CELL,VOICE:\+212648552222\r\n/);
  assert.match(card, /\r\nEMAIL;TYPE=INTERNET,PREF:rachid\.berrada20@gmail\.com\r\n/);
});

test("vCard : échappement et pliage à 75 octets", () => {
  assert.equal(escapeVCardText("a,b;c\\d\ne"), "a\\,b\\;c\\\\d\\ne");
  assert.match(card, /NOTE:Sites\\, automatisations\\; applications\\, sur mesure\./);
  const encoder = new TextEncoder();
  for (const line of card.split("\r\n")) assert.ok(encoder.encode(line).length <= 75, line);
  // Pliage sûr pour l'arabe (caractères multi-octets).
  const folded = foldLine("TITLE:" + "مطوّر ويب وحلول رقمية ".repeat(6));
  for (const line of folded.split("\r\n")) assert.ok(encoder.encode(line).length <= 75);
  assert.equal(folded.replace(/\r\n /g, ""), "TITLE:" + "مطوّر ويب وحلول رقمية ".repeat(6));
});

const base = { referrer: "", host: "rachidberrada.com", pathname: "/fr" };

test("attribution : carte de visite via UTM ou paramètre source", () => {
  assert.equal(classifyVisit({ ...base, search: "?utm_source=business_card&utm_medium=qr" }).channel, "business_card");
  assert.equal(classifyVisit({ ...base, search: "?source=business-card" }).channel, "business_card");
  assert.equal(classifyVisit({ ...base, search: "?utm_medium=qr" }).channel, "business_card");
});

test("attribution : organique et direct", () => {
  const organic = classifyVisit({ ...base, search: "", referrer: "https://www.google.com/" });
  assert.deepEqual(organic, { channel: "organic", detail: "ref:www.google.com", entryPage: "/fr" });
  assert.equal(classifyVisit({ ...base, search: "?utm_source=instagram" }).detail, "utm:instagram");
  assert.equal(classifyVisit({ ...base, search: "" }).channel, "direct");
  assert.equal(classifyVisit({ ...base, search: "", referrer: "https://rachidberrada.com/en" }).channel, "direct");
  assert.equal(classifyVisit({ ...base, search: "", referrer: "pas une url" }).channel, "direct");
});

test("message WhatsApp remplacé et encodé", () => {
  const href = withWhatsAppMessage("https://wa.me/212648552222?text=Bonjour", "J’ai scanné votre carte & …");
  const url = new URL(href);
  assert.equal(url.pathname, "/212648552222");
  assert.equal(url.searchParams.get("text"), "J’ai scanné votre carte & …");
});
