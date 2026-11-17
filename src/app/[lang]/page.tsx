import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { getSiteUrl, person } from "@/content/facts";
import { isLocale } from "@/lib/i18n";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Problems } from "@/components/home/Problems";
import { Work } from "@/components/home/Work";
import { Method } from "@/components/home/Method";
import { About } from "@/components/home/About";
import { ContactSection } from "@/components/home/ContactSection";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const site = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: t.person.title,
    description: t.person.valueProp,
    url: `${site}/${lang}`,
    image: `${site}${person.portraits.square}`,
    email: `mailto:${person.email}`,
    telephone: person.phoneE164,
    sameAs: [person.githubUrl, ...(person.linkedinUrl ? [person.linkedinUrl] : [])],
    knowsAbout: t.meta.keywords.slice(1),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero lang={lang} t={t} />
      <Services lang={lang} t={t} />
      <Problems t={t} />
      <Work lang={lang} t={t} />
      <Method t={t} />
      <About t={t} />
      <ContactSection lang={lang} t={t} />
    </>
  );
}
