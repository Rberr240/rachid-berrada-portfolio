import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CtaLink } from "@/components/ui/CtaLink";
import { getCaseStudyProjects, getProject, publicAssetExists } from "@/lib/portfolio";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function generateStaticParams() {
  return getCaseStudyProjects().map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) return {};

  return {
    title: `${project.title} — Réalisation`,
    description: project.caseStudy.metaDescription,
    alternates: { canonical: `/realisations/${project.id}` },
    openGraph: {
      title: `${project.title} | Rachid Berrada`,
      description: project.caseStudy.metaDescription,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();

  const { caseStudy } = project;

  const physicalCardPath = "/portfolio/gold-fitness/card-real.jpg";
  const hasPhysicalCard = project.id === "gold-fitness" && publicAssetExists(physicalCardPath);

  const gallery = [
    ...(caseStudy.gallery ?? []),
    ...(hasPhysicalCard
      ? [{ src: physicalCardPath, alt: `Carte physique ${project.title} avec QR code` }]
      : []),
  ];

  return (
    <article>
      <section className="border-b border-border bg-hero-glow py-16 sm:py-20">
        <Container>
          <Link
            href="/#realisations"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Retour aux réalisations
          </Link>

          <div className="max-w-2xl">
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent-2">
              {project.category}
            </p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-fg-muted">
              {caseStudy.heroSubtitle}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge tone="accent">{project.statusLabel}</Badge>
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <aside className="space-y-10 lg:sticky lg:top-24 lg:self-start">
            <div>
              <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-fg-subtle">
                Technologies
              </h2>
              <ul className="mt-4 space-y-2.5">
                {caseStudy.technologies.map((tech) => (
                  <li key={tech.name} className="text-sm">
                    <span className="font-medium text-fg">{tech.name}</span>
                    {tech.note ? <span className="text-fg-muted"> — {tech.note}</span> : null}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-fg-subtle">
                Liens
              </h2>
              {project.links.length > 0 ? (
                <div className="mt-4 flex flex-col gap-3">
                  {project.links.map((link) => (
                    <CtaLink key={link.href} href={link.href} variant="secondary" external>
                      {link.label}
                    </CtaLink>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                  Aucun lien public n&apos;est partagé pour ce projet : il traite des données
                  réelles, et le code source reste privé par prudence.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-surface/60 p-6">
              <p className="text-sm font-medium text-fg">Un projet similaire en tête ?</p>
              <p className="mt-1.5 text-sm text-fg-muted">
                Discutons de votre besoin et de ce qui est réaliste de mettre en place.
              </p>
              <div className="mt-4">
                <CtaLink href={getWhatsAppLink()} variant="primary" className="w-full sm:w-auto">
                  Discuter sur WhatsApp
                </CtaLink>
              </div>
            </div>
          </aside>

          <div className="space-y-14">
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-fg">Le besoin</h2>
              <div className="mt-4 space-y-4">
                {caseStudy.need.map((p, i) => (
                  <p key={i} className="text-pretty leading-relaxed text-fg-muted">
                    {p}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-tight text-fg">La solution</h2>
              <div className="mt-4 space-y-4">
                {caseStudy.solution.map((p, i) => (
                  <p key={i} className="text-pretty leading-relaxed text-fg-muted">
                    {p}
                  </p>
                ))}
              </div>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {caseStudy.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-fg-muted">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-accent-2" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            {caseStudy.experience ? (
              <section>
                <h2 className="text-xl font-semibold tracking-tight text-fg">Expérience</h2>
                <div className="mt-4 space-y-3">
                  {caseStudy.experience.map((flow) => (
                    <div
                      key={flow}
                      className="flex flex-wrap items-center gap-2 text-sm font-medium text-fg-muted"
                    >
                      {flow
                        .split("→")
                        .map((step) => step.trim())
                        .map((step, i, arr) => (
                          <span key={step} className="flex items-center gap-2">
                            <span className="rounded-full border border-border-strong bg-surface px-3.5 py-1.5 text-fg">
                              {step}
                            </span>
                            {i < arr.length - 1 ? (
                              <ArrowRight className="size-4 text-accent-2" aria-hidden="true" />
                            ) : null}
                          </span>
                        ))}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {gallery.length > 0 ? (
              <section>
                <h2 className="text-xl font-semibold tracking-tight text-fg">Galerie</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {gallery.map((item) => {
                    const isMobileShot = item.src.includes("mobile");
                    return (
                      <div
                        key={item.src}
                        className={`relative overflow-hidden rounded-2xl border border-border bg-ink ${
                          isMobileShot ? "aspect-[9/16] sm:mx-auto sm:w-2/3" : "aspect-[4/3]"
                        }`}
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover object-top"
                          sizes="(min-width: 640px) 33vw, 100vw"
                        />
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : null}

            <section className="rounded-2xl border border-border bg-surface/40 p-6">
              <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-fg-subtle">
                Résultat
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-fg-muted">{project.result}</p>
            </section>
          </div>
        </div>
      </Container>
    </article>
  );
}
