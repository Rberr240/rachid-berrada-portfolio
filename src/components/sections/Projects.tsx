import Image from "next/image";
import Link from "next/link";
import { Building2, FileCheck2, Cpu, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/data/profile";

const fallbackIcons: Record<string, LucideIcon> = {
  "residence-mirador": Building2,
  "gestion-attestations": FileCheck2,
  jarvis: Cpu,
};

export function Projects() {
  return (
    <section id="realisations" className="scroll-mt-[68px] border-t border-border bg-navy/30 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Réalisations"
          title="Quelques réalisations"
          description="Problème, solution, fonctionnalités et technologies — présentés uniquement pour ce qui est réellement vérifié."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => {
            const demoLink = project.links.find((l) => l.label === "Voir le site");
            const FallbackIcon = fallbackIcons[project.id];

            return (
              <article
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/60 transition-colors duration-200 hover:border-border-strong"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-ink">
                  {project.image ? (
                    <Image
                      src={project.image.desktop}
                      alt={project.image.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="bg-grid flex h-full w-full items-center justify-center">
                      {FallbackIcon ? (
                        <FallbackIcon className="size-10 text-fg-subtle" aria-hidden="true" />
                      ) : null}
                    </div>
                  )}
                  {project.placeholder ? (
                    <span className="absolute right-3 top-3">
                      <Badge tone="warning">À compléter</Badge>
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-fg-subtle">
                      {project.category}
                    </span>
                    <Badge tone="accent">{project.statusLabel}</Badge>
                  </div>

                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-fg">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{project.summary}</p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-fg-subtle"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5">
                    {project.caseStudy ? (
                      <Link
                        href={`/realisations/${project.id}`}
                        className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-accent-2 transition-colors hover:text-fg"
                      >
                        Découvrir le projet
                        <ArrowRight
                          className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    ) : null}
                    {demoLink ? (
                      <a
                        href={demoLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-fg-muted transition-colors hover:text-fg"
                      >
                        Voir le site
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
