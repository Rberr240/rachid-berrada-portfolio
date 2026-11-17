import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale } from "@/lib/i18n";
import { alternatesFor, openGraphFor } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";

/**
 * Carte de contact compacte (/fr/c…), à partager en signature ou par
 * message. Route ADDITIONNELLE : le QR code imprimé continue de viser "/".
 */
export async function generateMetadata({ params }: PageProps<"/[lang]/c">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  return {
    title: t.card.metaTitle,
    description: t.card.metaDescription,
    alternates: alternatesFor(lang, "/c"),
    openGraph: openGraphFor(lang, `/${lang}/c`, t.card.metaTitle, t.card.metaDescription),
    // Doublon volontaire du premier écran de l'accueil : pas d'indexation.
    robots: { index: false, follow: true },
  };
}

export default async function CardPage({ params }: PageProps<"/[lang]/c">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <Hero lang={lang} t={getDictionary(lang)} compact />;
}
