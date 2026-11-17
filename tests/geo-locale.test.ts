import { test } from "node:test";
import assert from "node:assert/strict";
import localeRedirect, { config } from "../netlify/edge-functions/locale-redirect.ts";
import { LOCALE_COOKIE, localeForCountry, resolveRootLocale } from "../src/lib/i18n.ts";

// Simule une requête Netlify sur "/" avec un pays GeoIP fictif (jamais une vraie IP).
function visit(path: string, country?: string, cookie?: string, method = "GET") {
  const headers = new Headers(cookie ? { cookie } : {});
  const request = new Request(`https://rachidberrada.com${path}`, { method, headers });
  return localeRedirect(request, country === undefined ? {} : { geo: { country: { code: country } } });
}

const matrix: [string, string][] = [
  ["MA", "fr"],
  ["FR", "fr"],
  ["PT", "pt"],
  ["US", "en"],
  ["ES", "en"],
  ["DE", "en"],
  ["GB", "en"],
  ["BR", "en"],
  ["CA", "en"],
  ["XX", "en"],
];

for (const [country, locale] of matrix) {
  test(`GeoIP ${country} -> /${locale}`, () => {
    const res = visit("/", country);
    assert.equal(res?.status, 302);
    assert.equal(res?.headers.get("location"), `/${locale}`);
  });
}

test("pays absent (GeoIP indisponible) -> /en", () => {
  assert.equal(visit("/")?.headers.get("location"), "/en");
  assert.equal(localeForCountry(undefined), "en");
  assert.equal(localeForCountry(""), "en");
});

test("code pays en minuscules ou avec espaces toléré", () => {
  assert.equal(localeForCountry(" ma "), "fr");
  assert.equal(localeForCountry("pt"), "pt");
});

test("préférence manuelle prioritaire sur la GeoIP", () => {
  assert.equal(visit("/", "PT", `${LOCALE_COOKIE}=en`)?.headers.get("location"), "/en");
  assert.equal(visit("/", "US", `other=1; ${LOCALE_COOKIE}=ar`)?.headers.get("location"), "/ar");
  assert.equal(visit("/", "MA", `${LOCALE_COOKIE}=pt`)?.headers.get("location"), "/pt");
});

test("préférence supprimée (détection automatique) -> retour à la GeoIP", () => {
  assert.equal(visit("/", "PT", `${LOCALE_COOKIE}=`)?.headers.get("location"), "/pt");
  assert.equal(visit("/", "PT")?.headers.get("location"), "/pt");
});

test("cookie invalide ignoré", () => {
  assert.equal(visit("/", "FR", `${LOCALE_COOKIE}=de`)?.headers.get("location"), "/fr");
  assert.equal(visit("/", "FR", `${LOCALE_COOKIE}=%E0%A4%A`)?.headers.get("location"), "/fr");
  assert.equal(resolveRootLocale({ preference: "../en", country: "US" }), "en");
});

test("UTM et paramètres QR conservés", () => {
  const qs = "?utm_source=business_card&utm_medium=qr&source=business-card";
  assert.equal(visit(`/${qs}`, "MA")?.headers.get("location"), `/fr${qs}`);
});

test("redirection temporaire, non mise en cache, variant par cookie", () => {
  const res = visit("/", "FR");
  assert.equal(res?.status, 302);
  assert.match(res?.headers.get("cache-control") ?? "", /no-store/);
  assert.match(res?.headers.get("cache-control") ?? "", /private/);
  assert.equal(res?.headers.get("vary"), "Cookie");
});

test("pas de boucle : la fonction ne cible que '/' et redirige toujours vers une locale", () => {
  assert.equal(config.path, "/");
  for (const [country] of matrix) {
    const location = visit("/", country)?.headers.get("location") ?? "";
    assert.match(location, /^\/(fr|en|pt|ar)(\?|$)/);
    assert.notEqual(location, "/");
  }
});

test("méthodes non-GET laissées intactes (formulaires)", () => {
  assert.equal(visit("/", "FR", undefined, "POST"), undefined);
  assert.equal(visit("/", "FR", undefined, "HEAD")?.status, 302);
});
