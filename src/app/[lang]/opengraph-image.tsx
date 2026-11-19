import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDictionary } from "@/content";
import { person } from "@/content/facts";
import { LOCALES, isLocale } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Rachid Berrada";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

/**
 * Aperçu de lien (WhatsApp, LinkedIn…) avec le vrai portrait. Le moteur de
 * rendu ne gère ni l'arabe ni le RTL : la version arabe affiche le titre anglais.
 */
export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(isLocale(lang) && lang !== "ar" ? lang : "en");
  const portrait = await readFile(join(process.cwd(), "public", person.portraits.og), "base64");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0f1115", color: "#eef0f4" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 64px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              border: "2px solid #c9a96a",
              color: "#c9a96a",
              fontSize: 26,
            }}
          >
            {person.monogram}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, letterSpacing: -2, lineHeight: 1 }}>{person.name}</div>
            <div style={{ marginTop: 20, fontSize: 32, color: "#a9b0bc" }}>{t.person.title}</div>
            <div style={{ marginTop: 40, width: 72, height: 2, background: "#c9a96a" }} />
            <div style={{ marginTop: 24, fontSize: 26, color: "#93a8ff" }}>rachidberrada.com</div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- rendu Satori, pas une page */}
        <img src={`data:image/jpeg;base64,${portrait}`} width={480} height={630} alt="" style={{ objectFit: "cover" }} />
      </div>
    ),
    size,
  );
}
