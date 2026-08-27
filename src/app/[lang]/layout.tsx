import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/layout/WhatsAppFloatingButton";
import { Analytics } from "@/components/layout/Analytics";
import { getProfile, isLocale, locales } from "@/data/profile";
import { getWhatsAppLink } from "@/lib/whatsapp";
import type { Locale } from "@/data/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// L'anglais est servi à la racine "/" via une réécriture (next.config.ts) :
// c'est l'URL publique canonique, même si la route interne est "/en".
function publicHomeHref(lang: Locale) {
  return lang === "en" ? "/" : "/fr";
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { siteConfig } = getProfile(lang);
  const home = publicHomeHref(lang);
  const title = `${siteConfig.name} | ${siteConfig.title}`;

  return {
    metadataBase: new URL(siteConfig.website),
    title: { default: title, template: `%s | ${siteConfig.name}` },
    description: siteConfig.metaDescription,
    keywords: siteConfig.knowsAbout,
    authors: [{ name: siteConfig.name, url: siteConfig.website }],
    creator: siteConfig.name,
    alternates: {
      canonical: home,
      languages: { en: "/", fr: "/fr" },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.localeTag,
      url: home,
      siteName: siteConfig.name,
      title,
      description: siteConfig.metaDescription,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: siteConfig.metaDescription,
      images: ["/opengraph-image"],
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#020307",
  colorScheme: "dark",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const profile = getProfile(lang);
  const { siteConfig, nav, socialLinks, ui } = profile;

  const enabledSocials = socialLinks.filter((s) => s.enabled).map((s) => s.href);
  const whatsappHref = getWhatsAppLink(siteConfig.whatsappNumber, siteConfig.whatsappDefaultMessage);
  const otherLang: Locale = lang === "en" ? "fr" : "en";
  const localeSwitch = {
    href: publicHomeHref(otherLang),
    label: otherLang.toUpperCase(),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    description: siteConfig.metaDescription,
    url: siteConfig.website,
    email: siteConfig.email,
    knowsAbout: siteConfig.knowsAbout,
    ...(siteConfig.location
      ? { address: { "@type": "PostalAddress", addressLocality: siteConfig.location } }
      : {}),
    ...(enabledSocials.length > 0 ? { sameAs: enabledSocials } : {}),
  };

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink text-fg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          {ui.skipToContent}
        </a>
        <Header
          nav={nav}
          monogram={siteConfig.monogram}
          name={siteConfig.name}
          whatsappHref={whatsappHref}
          email={siteConfig.email}
          copy={ui.nav}
          localeSwitch={localeSwitch}
        />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer
          nav={nav}
          socialLinks={socialLinks}
          name={siteConfig.name}
          monogram={siteConfig.monogram}
          title={siteConfig.title}
          tagline={siteConfig.tagline}
          email={siteConfig.email}
          location={siteConfig.location}
          whatsappHref={whatsappHref}
          copy={ui.footer}
        />
        <WhatsAppFloatingButton href={whatsappHref} ariaLabel={ui.whatsapp.floatingButtonAriaLabel} />
        <Analytics />
      </body>
    </html>
  );
}
