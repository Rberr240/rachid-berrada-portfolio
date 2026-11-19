/**
 * Garde-fou du numéro professionnel (confirmé le 18/11/2026) :
 * l'ancien numéro ne doit réapparaître ni dans les sources, ni dans la
 * documentation, ni dans le site généré ; le nouveau doit être utilisé
 * au format national à l'affichage et international pour tel:, wa.me et vCard.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const ROOT = process.cwd();
// Ancien numéro, quel que soit le format (espaces, points, tirets, préfixe 0 ou +212).
const OLD_NUMBER = /(?:\+?212|0)[\s.-]?6[\s.-]?48[\s.-]?55[\s.-]?22[\s.-]?22/;
const TEXT = new Set([".ts", ".tsx", ".mts", ".js", ".mjs", ".json", ".html", ".css", ".md", ".txt", ".toml", ".example", ".vcf", ".body"]);

function* files(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* files(full);
    else if (TEXT.has(extname(name)) || name === ".env.example") yield full;
  }
}

test("ancien numéro absent des sources, de la config et de la documentation", () => {
  const roots = ["src", "public", "netlify", "docs", "README.md", "netlify.toml", ".env.example", "package.json"];
  const hits: string[] = [];
  for (const r of roots) {
    const path = join(ROOT, r);
    if (!existsSync(path)) continue;
    const list = statSync(path).isDirectory() ? [...files(path)] : [path];
    for (const f of list) if (OLD_NUMBER.test(readFileSync(f, "utf8"))) hits.push(f.slice(ROOT.length + 1));
  }
  assert.deepEqual(hits, []);
});

test("source unique : affichage national, liens au format international", async () => {
  const facts = readFileSync(join(ROOT, "src/content/facts.ts"), "utf8");
  assert.match(facts, /phoneDisplay: "0661857517"/);
  assert.match(facts, /phoneE164: "\+212661857517"/);
  assert.match(facts, /whatsappNumber: "212661857517"/);
  assert.ok(!facts.includes("NEXT_PUBLIC_WHATSAPP_NUMBER"), "aucune surcharge par variable d'environnement");
});

const APP = join(ROOT, ".next", "server", "app");
const built = existsSync(join(APP, "fr.html"));

test("site généré : nouveau numéro partout, ancien nulle part", { skip: !built }, () => {
  for (const f of files(APP)) {
    const content = readFileSync(f, "utf8");
    assert.ok(!OLD_NUMBER.test(content), `ancien numéro dans ${f}`);
  }
  for (const lang of ["fr", "en", "pt", "ar"]) {
    const html = readFileSync(join(APP, `${lang}.html`), "utf8");
    assert.match(html, /href="tel:\+212661857517"/, lang);
    assert.match(html, /href="https:\/\/wa\.me\/212661857517\?text=/, lang);
    assert.match(html, />0661857517</, `${lang} : affichage national`);
    const legal = readFileSync(join(APP, lang, "mentions-legales.html"), "utf8");
    assert.match(legal, /0661857517/, `${lang} : mentions légales`);
    assert.ok(!legal.includes("{phone}") && !legal.includes("{email}"), `${lang} : jetons non remplacés`);
  }
});
