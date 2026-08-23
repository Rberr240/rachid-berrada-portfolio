"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { AbstractFigure } from "@/components/ui/AbstractFigure";
import { siteConfig } from "@/data/profile";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { useHeroScrollProgress, lerp } from "@/lib/useHeroScrollProgress";

const taglineParts = siteConfig.tagline.split(" • ");

export function Hero() {
  const [firstName, ...restName] = siteConfig.name.split(" ");
  const lastName = restName.join(" ");
  const progress = useHeroScrollProgress();

  const textStyle = {
    transform: `translateY(${lerp(0, -20, progress)}px)`,
  };
  const portraitStyle = {
    transform: `translateY(${lerp(0, -20, progress)}px) scale(${lerp(1, 0.56, progress)})`,
    opacity: lerp(1, 0.85, progress),
    transformOrigin: "bottom center",
  };

  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-hero-glow pt-28 pb-20 sm:pt-32 sm:pb-28 lg:pb-32"
    >
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_1fr] lg:gap-10">
          {/* Colonne texte */}
          <div
            className="motion-safe:animate-fade-in-up transition-transform duration-150 ease-out"
            style={textStyle}
          >
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-strong bg-white/[0.03] px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent-2">
              {siteConfig.title}
            </p>

            <h1 className="text-balance text-5xl font-semibold leading-[0.98] tracking-tight text-fg sm:text-6xl md:text-7xl">
              <span className="block">{firstName}</span>
              {lastName ? <span className="block">{lastName}</span> : null}
            </h1>

            <p className="mt-7 max-w-lg text-balance text-xl font-medium leading-snug text-fg sm:text-2xl">
              {siteConfig.heroHeadline}
            </p>

            <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
              {siteConfig.heroSubtitle}
            </p>

            <div
              className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle"
              aria-hidden="true"
            >
              {taglineParts.map((part, i) => (
                <span key={part} className="flex items-center gap-3">
                  {i > 0 ? <span className="size-1 rounded-full bg-accent-2/50" /> : null}
                  {part}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <CtaLink href={getWhatsAppLink()} variant="primary">
                Discuter de mon projet
              </CtaLink>
              <CtaLink href="#realisations" variant="secondary" icon={false}>
                Voir mes réalisations
              </CtaLink>
            </div>
          </div>

          {/* Colonne composition portrait — cutout détouré, sans arrière-plan photo */}
          <div
            className="motion-safe:animate-fade-in relative mx-auto w-full max-w-[360px] transition-transform duration-150 ease-out lg:mx-0 lg:max-w-none"
            style={portraitStyle}
          >
            <AbstractFigure className="absolute -inset-x-10 -inset-y-16 sm:-inset-x-16 sm:-inset-y-20" />

            <div
              className="halo-blue absolute -inset-16 -z-10 sm:-inset-20"
              aria-hidden="true"
            />

            <div
              className="absolute inset-x-[12%] bottom-[6%] h-10 rounded-full bg-accent/30 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative mx-auto aspect-[1166/2000] w-full max-w-[300px] lg:max-w-[380px]">
              <Image
                src="/images/rachid/hero-rachid-cutout.png"
                alt="Rachid Berrada, ingénieur en solutions digitales"
                fill
                priority
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 70vw"
                className="portrait-treatment object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.55)]"
              />
            </div>

            <div
              className="pointer-events-none absolute -right-2 top-0 hidden flex-col items-end gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle sm:flex"
              aria-hidden="true"
            >
              <span>{siteConfig.monogram}</span>
              <span className="h-8 w-px bg-gradient-to-b from-accent-2/50 to-transparent" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
