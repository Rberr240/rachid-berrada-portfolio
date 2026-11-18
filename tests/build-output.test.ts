/**
 * Vérifie le HTML réellement généré par `next build` (.next/server/app) :
 * langue/direction, canonical + hreflang, liens internes non cassés,
 * absence de chaîne d'une autre langue et de visuel conceptuel supprimé.
 * Ignoré si aucun build n'est présent (lancer `npm run build` avant).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const APP = join(process.cwd(), ".next", "server", "app");
const LOCALES = ["fr", "en", "pt", "ar"];
const HTML_LANG: Record<string, string> = { fr: "fr", en: "en-US", pt: "pt-PT", ar: "ar" };
const built = existsSync(join(APP, "fr.html"));

function pages(): Map<string, string> {
  const map = new Map<string, string>();
  const walk = (dir: string, prefix: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full, `${prefix}/${entry.name}`);
      else if (entry.name.endsWith(".html") && !entry.name.startsWith("_")) {
        map.set(`${prefix}/${entry.name.replace(/\.html$/, "")}`, readFileSync(full, "utf8"));
      }
    }
  };
  walk(APP, "");
  return map;
}

test("build : chaque page localisée déclare la bonne langue et direction", { skip: !built }, () => {
  for (const [route, html] of pages()) {
    const lang = route.split("/")[1];
    if (!LOCALES.includes(lang)) continue;
    assert.match(html, new RegExp(`<html lang="${HTML_LANG[lang]}" dir="${lang === "ar" ? "rtl" : "ltr"}"`), route);
  }
});

test("build : canonical et hreflang réciproques sur les pages indexables", { skip: !built }, () => {
  for (const [route, html] of pages()) {
    if (!LOCALES.includes(route.split("/")[1]) || route.endsWith("/c")) continue;
    assert.match(html, new RegExp(`<link rel="canonical" href="https://rachidberrada.com${route}"`), route);
    const suffix = route.replace(/^\/(fr|en|pt|ar)/, "");
    for (const l of LOCALES) {
      assert.match(html, new RegExp(`hrefLang="${HTML_LANG[l]}" href="https://rachidberrada.com/${l}${suffix}"`), `${route} -> ${l}`);
    }
    assert.match(html, /hrefLang="x-default"/, route);
  }
});

test("build : aucun lien interne cassé", { skip: !built }, () => {
  const all = pages();
  const known = new Set([...all.keys(), "/"]);
  const extra = /^\/(fr|en|pt|ar)\/rachid-berrada\.vcf$|^\/netlify-forms\/contact\.html$/;
  for (const [route, html] of all) {
    for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
      if (href.startsWith("/_next/") || href.startsWith("/images/") || href.startsWith("/portfolio/")) continue;
      if (/\/(icon|apple-icon|opengraph-image)/.test(href)) continue;
      assert.ok(known.has(href) || extra.test(href), `${route} -> ${href}`);
    }
  }
});

test("build : pas de visuel conceptuel ni de chaîne d'autre langue", { skip: !built }, () => {
  const all = pages();
  for (const [route, html] of all) {
    assert.ok(!html.includes("dashbord.png"), `${route} : visuel conceptuel`);
  }
  // Marqueurs propres à chaque langue, cherchés dans les pages des autres langues.
  const markers: Record<string, string> = { fr: "Demander un devis", en: "Request a quote", pt: "Pedir orçamento" };
  for (const [route, html] of all) {
    const lang = route.split("/")[1];
    if (!LOCALES.includes(lang)) continue;
    for (const [markerLang, marker] of Object.entries(markers)) {
      if (markerLang !== lang) assert.ok(!html.includes(`>${marker}<`), `${route} contient « ${marker} »`);
    }
  }
});

test("build : la page /fr contient les 4 actions de contact", { skip: !built }, () => {
  const html = readFileSync(join(APP, "fr.html"), "utf8");
  assert.match(html, /href="https:\/\/wa\.me\/212661857517\?text=/);
  assert.match(html, /href="tel:\+212661857517"/);
  assert.match(html, /href="mailto:rachid\.berrada20@gmail\.com"/);
  assert.match(html, /href="\/fr\/rachid-berrada\.vcf"/);
});
