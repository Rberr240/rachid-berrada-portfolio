import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/content/facts";
import { LOCALES, LOCALE_META } from "@/lib/i18n";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

/**
 * 404 pour toute URL hors des routes connues (le layout racine vit sous
 * [lang], d'où la convention global-not-found). OG en URL absolue : sans
 * metadataBase dans sa chaîne, Next résoudrait vers localhost.
 */
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Page not found — Rachid Berrada",
  robots: { index: false, follow: false },
  openGraph: { images: [{ url: `${getSiteUrl()}/en/opengraph-image`, width: 1200, height: 630 }] },
};

const messages: Record<(typeof LOCALES)[number], string> = {
  fr: "Page introuvable — retour à l’accueil",
  en: "Page not found — back to the home page",
  pt: "Página não encontrada — voltar à página inicial",
  ar: "الصفحة غير موجودة — العودة إلى الصفحة الرئيسية",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-ink px-4 text-center font-sans text-fg">
        <p className="text-6xl font-light text-gold">404</p>
        <ul className="space-y-3">
          {LOCALES.map((code) => (
            <li key={code}>
              <a
                href={`/${code}`}
                lang={LOCALE_META[code].htmlLang}
                dir={LOCALE_META[code].dir}
                className="text-lg text-fg-muted underline decoration-line-strong underline-offset-4 hover:text-fg"
              >
                {messages[code]}
              </a>
            </li>
          ))}
        </ul>
      </body>
    </html>
  );
}
