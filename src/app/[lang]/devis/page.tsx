import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import { getDictionary } from "@/content";
import { person } from "@/content/facts";
import { isLocale } from "@/lib/i18n";
import { paths } from "@/lib/paths";
import { alternatesFor, openGraphFor } from "@/lib/seo";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { QuoteForm } from "@/components/quote/QuoteForm";

export async function generateMetadata({ params }: PageProps<"/[lang]/devis">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { quote } = getDictionary(lang);
  return {
    title: quote.metaTitle,
    description: quote.metaDescription,
    alternates: alternatesFor(lang, "/devis"),
    openGraph: openGraphFor(lang, `/${lang}/devis`, quote.metaTitle, quote.metaDescription),
  };
}

export default async function QuotePage({ params }: PageProps<"/[lang]/devis">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const q = t.quote;

  const direct = (
    <ul className="flex flex-wrap gap-x-6 gap-y-3">
      <li>
        <a
          href={getWhatsAppLink(person.whatsappNumber, t.whatsapp.quoteMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 font-medium text-fg hover:text-accent-text"
        >
          <WhatsAppIcon className="size-5 text-accent-text" />
          {t.common.whatsapp}
          <span className="sr-only"> {t.common.externalHint}</span>
        </a>
      </li>
      <li>
        <a href={`tel:${person.phoneE164}`} dir="ltr" className="inline-flex min-h-11 items-center gap-2 font-medium text-fg hover:text-accent-text">
          <Phone className="size-5 text-accent-text" aria-hidden="true" />
          {person.phoneDisplay}
        </a>
      </li>
      <li>
        <a href={`mailto:${person.email}`} dir="ltr" className="inline-flex min-h-11 items-center gap-2 break-all font-medium text-fg hover:text-accent-text">
          <Mail className="size-5 shrink-0 text-accent-text" aria-hidden="true" />
          {person.email}
        </a>
      </li>
    </ul>
  );

  return (
    <Container className="grid gap-14 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-16">
      <div>
        <h1 className="display text-[2.75rem] text-fg sm:text-6xl">{q.title}</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">{q.intro}</p>
        <div className="mt-10">
          <QuoteForm lang={lang} q={q} privacyHref={paths.privacy(lang)} fallback={direct} />
        </div>
      </div>

      <aside className="space-y-12 lg:pt-4">
        <section aria-labelledby="direct-title" className="rounded-[1.75rem] border border-line bg-surface p-7">
          <h2 id="direct-title" className="display text-2xl text-fg">
            {q.directTitle}
          </h2>
          <p className="mt-2 mb-5 text-fg-muted">{q.directBody}</p>
          {direct}
        </section>

        <section aria-labelledby="faq-title">
          <h2 id="faq-title" className="display text-2xl text-fg">
            {q.faqTitle}
          </h2>
          <div className="mt-4">
            {q.faq.map((item) => (
              <details key={item.question} className="group border-b border-line py-4">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-medium text-fg [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span className="text-xl text-gold transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-2 text-pretty leading-relaxed text-fg-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </aside>
    </Container>
  );
}
