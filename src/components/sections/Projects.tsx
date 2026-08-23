import Image from "next/image";
import Link from "next/link";
import { Building2, FileCheck2, Cpu, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { Badge } from "@/components/ui/Badge";
import { AbstractFigure } from "@/components/ui/AbstractFigure";
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
        <SectionIndex number="05" label="Réalisations" />
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          Réalisations sélectionnées
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
          Problème, solution, fonctionnalités et technologies — présentés uniquement pour ce
          qui est réellement vérifié.
        </p>

        <div className="mt-16 space-y-20 sm:space-y-28">
          {projects.map((project, index) => {
            const demoLink = project.links.find((l) => l.label === "Voir le site");
            const repoLink = project.links.find((l) => l.label === "Voir le repository");
            const FallbackIcon = fallbackIcons[project.id];
            const reversed = index % 2 === 1;

            return (
              <article
                key={project.id}
                className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14 ${
                  reversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-border bg-ink lg:w-[58%]">
                  {project.image ? (
                    <Image
                      src={project.image.desktop}
                      alt={project.image.alt}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-hero-glow">
                      <AbstractFigure
                        className="absolute inset-[-20%]"
                        animated={false}
                      />
                      {FallbackIcon ? (
                        <FallbackIcon
                          className="relative size-12 text-fg-subtle"
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                  )}
                  {project.placeholder ? (
                    <span className="absolute right-3 top-3">
                      <Badge tone="warning">À compléter</Badge>
                    </span>
                  ) : null}
                </div>

                <div className="lg:w-[42%]">
                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
                    <span className="text-accent-2">{String(index + 1).padStart(2, "0")}</span>
                    <span>{project.category}</span>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                    {project.title}
                  </h3>

                  <div className="mt-3">
                    <Badge tone="accent">{project.statusLabel}</Badge>
                  </div>

                  <p className="mt-5 text-pretty text-base leading-relaxed text-fg-muted">
                    {project.summary}
                  </p>

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

                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6">
                    {project.caseStudy ? (
                      <Link
                        href={`/realisations/${project.id}`}
                        className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-accent-2 transition-colors hover:text-fg"
                      >
                        Voir le projet
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
                    {repoLink ? (
                      <a
                        href={repoLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-fg-muted transition-colors hover:text-fg"
                      >
                        Voir le repository
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
