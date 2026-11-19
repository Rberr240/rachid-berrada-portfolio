import Link from "next/link";
import type { Dictionary } from "@/content/types";
import { projects } from "@/content/facts";
import type { Locale } from "@/lib/i18n";
import { paths } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { textLink } from "@/components/ui/styles";
import { StatusBadge } from "@/components/project/StatusBadge";
import { PhoneShot } from "@/components/project/PhoneShot";
import { SectionHead } from "./SectionHead";

const secondaryLink = "inline-flex min-h-11 items-center text-fg-muted underline decoration-line-strong underline-offset-4 hover:text-fg";

/**
 * Hiérarchie de preuve : les projets avec captures réelles en grand,
 * les prototypes et la R&D (sans visuel) en liste compacte — jamais de
 * maquette inventée pour combler l'absence de capture.
 */
export function Work({ lang, t }: { lang: Locale; t: Dictionary }) {
  const w = t.work;
  const withVisual = projects.filter((p) => p.screenshots?.some((s) => s.kind === "mobile"));
  const withoutVisual = projects.filter((p) => !withVisual.includes(p));

  return (
    <section id="realisations" aria-labelledby="work-title" className="border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHead id="work-title" title={w.title} intro={w.intro} />

        <div className="mt-14 space-y-16 sm:space-y-20">
          {withVisual.map((project) => {
            const text = t.projects[project.id];
            const shot = project.screenshots!.find((s) => s.kind === "mobile")!;
            return (
              <article
                key={project.id}
                className="grid items-center gap-8 border-t border-line pt-10 md:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] md:gap-14"
              >
                <PhoneShot
                  src={shot.src}
                  alt={text.screenshotAlt?.mobile ?? text.title}
                  sizes="(min-width: 768px) 260px, 60vw"
                  className="mx-auto w-[58%] max-w-[17rem] md:w-full"
                />
                <div>
                  <StatusBadge status={project.status} label={w.status[project.status]} />
                  <h3 className="display mt-5 text-4xl text-fg sm:text-5xl">{text.title}</h3>
                  <p className="mt-2 text-fg-subtle">{text.category}</p>
                  <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-fg-muted">{text.summary}</p>
                  <dl className="mt-6 grid gap-4 text-[0.95rem] sm:grid-cols-2">
                    <div>
                      <dt className="font-semibold text-fg">{w.roleLabel}</dt>
                      <dd className="mt-1 text-fg-muted">{text.role}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-fg">{w.stackLabel}</dt>
                      <dd className="mt-1 text-fg-muted">{project.stack.join(", ")}</dd>
                    </div>
                  </dl>
                  <ProjectLinks lang={lang} t={t} id={project.id} demoUrl={project.demoUrl} repoUrl={project.repoUrl} />
                </div>
              </article>
            );
          })}
        </div>

        <ul className="mt-20 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line md:grid-cols-3">
          {withoutVisual.map((project) => {
            const text = t.projects[project.id];
            return (
              <li key={project.id} className="flex flex-col bg-ink p-6 sm:p-8">
                <StatusBadge status={project.status} label={w.status[project.status]} />
                <h3 className="display mt-5 text-[1.75rem] text-fg">{text.title}</h3>
                <p className="mt-1 text-sm text-fg-subtle">{text.category}</p>
                <p className="mt-4 text-pretty leading-relaxed text-fg-muted">{text.summary}</p>
                <p className="mt-4 text-sm text-fg-subtle">{project.stack.join(", ")}</p>
                <div className="mt-auto">
                  <ProjectLinks lang={lang} t={t} id={project.id} demoUrl={project.demoUrl} repoUrl={project.repoUrl} />
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

function ProjectLinks({
  lang,
  t,
  id,
  demoUrl,
  repoUrl,
}: {
  lang: Locale;
  t: Dictionary;
  id: string;
  demoUrl?: string;
  repoUrl?: string;
}) {
  return (
    <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem]">
      <Link href={paths.project(lang, id)} className={textLink}>
        {t.work.viewCase}
      </Link>
      {demoUrl ? (
        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className={secondaryLink}>
          {t.work.viewDemo}
          <span className="sr-only"> {t.common.externalHint}</span>
        </a>
      ) : null}
      {repoUrl ? (
        <a href={repoUrl} target="_blank" rel="noopener noreferrer" className={secondaryLink}>
          {t.work.viewRepo}
          <span className="sr-only"> {t.common.externalHint}</span>
        </a>
      ) : null}
    </div>
  );
}
