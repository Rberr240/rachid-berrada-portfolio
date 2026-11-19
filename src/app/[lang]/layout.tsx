import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Fraunces, Cairo } from "next/font/google";
import "../globals.css";
import { getDictionary } from "@/content";
import { getSiteUrl, person } from "@/content/facts";
import { LOCALES, LOCALE_META, isLocale } from "@/lib/i18n";
import { alternatesFor, openGraphFor } from "@/lib/seo";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { AttributionTracker } from "@/components/site/Attribution";
import { Analytics } from "@/components/site/Analytics";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

// Instance statique (400, romain) : ~4x plus légère que la variable
// opsz/SOFT + italique, préchargée en concurrence avec le portrait (LCP).
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], weight: "400" });

// Geist et Fraunces ne couvrent pas l'arabe : Cairo prend le relais sur /ar
// (voir l'override html[lang="ar"] dans globals.css).
const cairo = Cairo({ variable: "--font-cairo", subsets: ["arabic", "latin"], preload: false });

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(getSiteUrl()),
    title: { default: t.meta.title, template: `%s — ${person.name}` },
    description: t.meta.description,
    keywords: t.meta.keywords,
    authors: [{ name: person.name }],
    creator: person.name,
    alternates: alternatesFor(lang),
    openGraph: openGraphFor(lang, `/${lang}`, t.meta.title, t.meta.description),
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0f1115",
  colorScheme: "dark",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const meta = LOCALE_META[lang];

  return (
    <html
      lang={meta.htmlLang}
      dir={meta.dir}
      className={`${geist.variable} ${fraunces.variable} ${lang === "ar" ? cairo.variable : ""} antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-ink font-sans text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          {t.common.skipToContent}
        </a>
        <Header
          lang={lang}
          name={person.name}
          monogram={person.monogram}
          labels={{
            ariaLabel: t.nav.ariaLabel,
            openMenu: t.nav.openMenu,
            closeMenu: t.nav.closeMenu,
            requestQuote: t.common.requestQuote,
            language: t.nav.language,
            autoLanguage: t.nav.autoLanguage,
            autoLanguageHint: t.nav.autoLanguageHint,
            items: [
              { id: "services", label: t.nav.services },
              { id: "realisations", label: t.nav.work },
              { id: "methode", label: t.nav.method },
              { id: "a-propos", label: t.nav.about },
              { id: "contact", label: t.nav.contact },
            ],
          }}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} t={t} />
        <FloatingWhatsApp
          href={getWhatsAppLink(person.whatsappNumber, t.whatsapp.defaultMessage)}
          label={t.whatsapp.floatingLabel}
        />
        <AttributionTracker cardMessage={t.whatsapp.cardMessage} />
        <Analytics />
      </body>
    </html>
  );
}
