import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/confidentialite">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const doc = getDictionary(lang).legal.privacy;
  return { title: doc.title, description: doc.description, alternates: alternatesFor(lang, "/confidentialite") };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/confidentialite">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <LegalPage doc={getDictionary(lang).legal.privacy} />;
}
