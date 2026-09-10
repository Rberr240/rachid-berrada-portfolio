import Image from "next/image";
import Link from "next/link";
import { Building2, FileCheck2, Cpu, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { Badge } from "@/components/ui/Badge";
import type { ProjectItem, UiCopy } from "@/data/types";

const fallbackIcons: Record<string, LucideIcon> = {
  "residence-mirador": Building2,
  "gestion-attestations": FileCheck2,
  jarvis: Cpu,
};

interface ProjectsProps {
  projects: ProjectItem[];
  copy: UiCopy["projects"];
  caseStudyBasePath: string;
}

export function Projects({ projects, copy, caseStudyBasePath }: ProjectsProps) {
  return (
    <section id="realisations" className="scroll-mt-[68px] border-t border-border bg-navy/30 py-20 sm:py-28">
      <Container>
        <SectionIndex number="05" label={copy.eyebrow} />
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          {copy.title}
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
          {copy.intro}
        </p>

        <div className="mt-16 space-y-24 sm:space-y-32">
          {projects.map((project, index) => {
            const demoLink = project.links.find((l) => l.type === "demo");
            const repoLink = project.links.find((l) => l.type === "repo");
            const FallbackIcon = fallbackIcons[project.id];
            const reversed = index % 2 === 1;

            return (
              <article
                key={project.id}
                className={`group flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16 ${
                  reversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full lg:w-[56%]">
                  {project.image ? (
                    <div className="corner-marks relative aspect-[16/12] w-full overflow-hidden bg-graphite">
                      {project.image.layout === "desktop" ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-dot-grid p-4 sm:p-6">
                          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.01]">
                            <Image
                              src={project.image.desktop}
                              alt={project.image.alt}
                              fill
                              sizes="(min-width: 1024px) 50vw, 100vw"
                              className="object-contain object-top"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-dot-grid p-7 sm:p-10">
                          {/* Les captures sont des sites mobile-first : un cadrage
                              "appareil" portrait évite les larges marges vides que
                              leur propre capture desktop laisserait dans un cadre
                              plein cadre. */}
                          <div className="relative h-full aspect-[9/17.5] overflow-hidden rounded-[1.4rem] border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.015]">
                            <Image
                              src={project.image.mobile}
                              alt={project.image.alt}
                              fill
                              sizes="(min-width: 1024px) 20vw, 45vw"
                              className="object-cover object-top"
                            />
                          </div>
                        </div>
                      )}
                      {project.placeholder ? (
                        <span className="absolute end-3 top-3">
                          <Badge tone="warning">{copy.placeholderBadge}</Badge>
                        </span>
                      ) : null}
                    </div>
                  ) : (
                    <div className="corner-marks bg-hatch relative aspect-[16/12] w-full overflow-hidden border border-border bg-surface">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none font-serif text-[9rem] leading-none text-white/[0.05] sm:text-[11rem]"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="absolute start-6 top-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
                        <span className="size-1.5 rounded-full bg-accent-2" aria-hidden="true" />
                        {project.statusLabel}
                      </div>
                      {FallbackIcon ? (
                        <FallbackIcon
                          className="absolute bottom-6 end-6 size-6 text-fg-subtle transition-colors duration-300 group-hover:text-accent-2"
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                  )}
                </div>

                <div className="lg:w-[44%]">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-2xl italic text-accent-2">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
                      {project.category}
                    </span>
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

                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-subtle">
                    {project.tags.map((tag, i) => (
                      <span key={tag}>
                        {i > 0 ? <span className="text-border-strong"> / </span> : null}
                        {tag}
                      </span>
                    ))}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6">
                    {project.caseStudy ? (
                      <Link
                        href={`${caseStudyBasePath}/${project.id}`}
                        className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-accent-2 transition-colors hover:text-fg"
                      >
                        {copy.viewProject}
                        <ArrowRight
                          className="size-3.5 rtl:rotate-180 transition-transform duration-200 group-hover/link:translate-x-0.5"
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
                        {copy.viewSite}
                      </a>
                    ) : null}
                    {repoLink ? (
                      <a
                        href={repoLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-fg-muted transition-colors hover:text-fg"
                      >
                        {copy.viewRepo}
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
