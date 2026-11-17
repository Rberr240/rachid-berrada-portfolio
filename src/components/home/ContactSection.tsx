import Link from "next/link";
import type { Dictionary } from "@/content/types";
import { person } from "@/content/facts";
import type { Locale } from "@/lib/i18n";
import { paths } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { button } from "@/components/ui/styles";
import { ContactActions } from "@/components/card/ContactActions";

export function ContactSection({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
        <div>
          <h2 id="contact-title" className="display text-[2.4rem] text-fg sm:text-[3.4rem]">
            {t.contact.title}
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-fg-muted">{t.contact.intro}</p>
          <div className="mt-8 max-w-2xl">
            <ContactActions lang={lang} t={t} />
          </div>
          <p className="mt-6 text-fg-muted">
            <a href={`tel:${person.phoneE164}`} dir="ltr" className="inline-flex min-h-11 items-center hover:text-fg">
              {person.phoneDisplay}
            </a>
            <span className="mx-3 text-line-strong" aria-hidden="true">
              |
            </span>
            <a href={`mailto:${person.email}`} dir="ltr" className="inline-flex min-h-11 items-center break-all hover:text-fg">
              {person.email}
            </a>
          </p>
        </div>
        <div className="self-start rounded-[1.75rem] border border-line bg-surface p-7 sm:p-9">
          <h3 className="display text-3xl text-fg">{t.contact.quoteTitle}</h3>
          <p className="mt-3 text-pretty leading-relaxed text-fg-muted">{t.contact.quoteBody}</p>
          <Link href={paths.quote(lang)} className={`${button.secondary} mt-7 w-full`}>
            {t.common.requestQuote}
          </Link>
        </div>
      </Container>
    </section>
  );
}
