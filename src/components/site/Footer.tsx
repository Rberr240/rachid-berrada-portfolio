import Link from "next/link";
import type { Dictionary } from "@/content/types";
import { person } from "@/content/facts";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/i18n";
import { paths } from "@/lib/paths";
import { Container } from "@/components/ui/Container";

const link = "text-fg-muted transition-colors hover:text-fg";

export function Footer({ lang, t }: { lang: Locale; t: Dictionary }) {
  const sections = [
    { id: "services", label: t.nav.services },
    { id: "realisations", label: t.nav.work },
    { id: "methode", label: t.nav.method },
    { id: "a-propos", label: t.nav.about },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <footer className="border-t border-line">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="display text-3xl text-fg">{person.name}</p>
          <p className="mt-2 text-fg-muted">{t.person.title}</p>
          <ul className="mt-6 space-y-2 text-[0.95rem]">
            <li>
              <a href={`tel:${person.phoneE164}`} dir="ltr" className={link}>
                {person.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${person.email}`} dir="ltr" className={`${link} break-all`}>
                {person.email}
              </a>
            </li>
            <li>
              <a href={person.githubUrl} target="_blank" rel="noopener noreferrer" className={link}>
                {t.common.github}
                <span className="sr-only"> {t.common.externalHint}</span>
              </a>
            </li>
          </ul>
        </div>

        <ul className="space-y-2 text-[0.95rem]">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={paths.section(lang, s.id)} className={link}>
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <Link href={paths.quote(lang)} className={link}>
              {t.common.requestQuote}
            </Link>
          </li>
        </ul>

        <div className="space-y-6 text-[0.95rem]">
          <div>
            <p className="font-semibold text-fg">{t.footer.languages}</p>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {LOCALES.map((code) => (
                <li key={code}>
                  <a href={paths.home(code)} hrefLang={LOCALE_META[code].htmlLang} lang={LOCALE_META[code].htmlLang} className={link}>
                    {LOCALE_META[code].label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <ul className="space-y-2">
            <li>
              <Link href={paths.legal(lang)} className={link}>
                {t.footer.legal}
              </Link>
            </li>
            <li>
              <Link href={paths.privacy(lang)} className={link}>
                {t.footer.privacy}
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="border-t border-line py-6 text-sm text-fg-subtle">
        © {new Date().getFullYear()} {person.name}. {t.footer.rights}
      </Container>
    </footer>
  );
}
