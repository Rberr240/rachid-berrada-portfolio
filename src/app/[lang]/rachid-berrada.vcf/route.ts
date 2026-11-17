import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getDictionary } from "@/content";
import { getSiteUrl, person } from "@/content/facts";
import { LOCALES, isLocale } from "@/lib/i18n";
import { buildVCard } from "@/lib/vcard";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

/** Fiche contact (vCard 3.0) générée au build à partir des faits vérifiés. */
export async function GET(_request: Request, { params }: RouteContext<"/[lang]/rachid-berrada.vcf">) {
  const { lang } = await params;
  if (!isLocale(lang)) return new Response("Not found", { status: 404 });
  const t = getDictionary(lang);
  const photo = await readFile(join(process.cwd(), "public", person.portraits.square), "base64");

  const body = buildVCard({
    givenName: person.givenName,
    familyName: person.familyName,
    title: t.person.title,
    email: person.email,
    phoneE164: person.phoneE164,
    url: `${getSiteUrl()}/${lang}`,
    githubUrl: person.githubUrl,
    note: t.person.valueProp,
    photoBase64: photo,
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'inline; filename="rachid-berrada.vcf"',
    },
  });
}
