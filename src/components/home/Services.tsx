import Link from "next/link";
import type { Dictionary } from "@/content/types";
import { SERVICE_IDS, projects } from "@/content/facts";
import type { Locale } from "@/lib/i18n";
import { paths } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { textLink } from "@/components/ui/styles";
import { SectionHead } from "./SectionHead";

export function Services({ lang, t }: { lang: Locale; t: Dictionary }) {
  const s = t.services;
  return (
    <section id="services" aria-labelledby="services-title" className="border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHead id="services-title" title={s.title} intro={s.intro} />
        <div className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line md:grid-cols-2">
          {SERVICE_IDS.map((id) => {
            const item = s.items[id];
            const proof = projects.find((p) => p.services.includes(id));
            return (
              <article key={id} className="flex flex-col bg-ink p-6 sm:p-9">
                <h3 className="display text-[1.9rem] text-fg">{item.title}</h3>
                <p className="mt-4 text-pretty leading-relaxed text-fg-muted">{item.problem}</p>
                <dl className="mt-6 space-y-4 text-[0.95rem]">
                  <div>
                    <dt className="font-semibold text-fg">{s.audienceLabel}</dt>
                    <dd className="mt-1 text-fg-muted">{item.audience}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-fg">{s.deliverableLabel}</dt>
                    <dd className="mt-1 text-fg-muted">{item.deliverable}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-fg">{s.includedLabel}</dt>
                    <dd className="mt-2">
                      <ul className="space-y-1.5 text-fg-muted">
                        {item.included.map((line) => (
                          <li key={line} className="flex gap-3">
                            <span className="mt-[0.7em] h-px w-3 shrink-0 bg-gold" aria-hidden="true" />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
                {item.note ? (
                  <p className="mt-6 border-s border-gold/60 ps-4 text-sm leading-relaxed text-fg-muted">
                    {item.note}
                  </p>
                ) : null}
                <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-8 text-[0.95rem]">
                  <Link href={`${paths.quote(lang)}?service=${id}`} className={textLink}>
                    {s.cta}
                  </Link>
                  {proof ? (
                    <Link
                      href={paths.project(lang, proof.id)}
                      className="text-fg-muted underline decoration-line-strong underline-offset-4 hover:text-fg"
                    >
                      {s.proofLabel} {t.projects[proof.id].title}
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
