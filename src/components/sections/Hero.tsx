"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { HeroSculpture } from "@/components/ui/HeroSculpture";
import type { Profile, UiCopy } from "@/data/types";
import { useHeroScrollProgress, lerp } from "@/lib/useHeroScrollProgress";

interface HeroProps {
  siteConfig: Profile["siteConfig"];
  whatsappHref: string;
  copy: UiCopy["hero"];
}

function Headline({
  headline,
  highlight,
  className = "",
}: {
  headline: string;
  highlight: string;
  className?: string;
}) {
  const highlightIndex = highlight ? headline.indexOf(highlight) : -1;
  const before = highlightIndex >= 0 ? headline.slice(0, highlightIndex) : headline;
  const after = highlightIndex >= 0 ? headline.slice(highlightIndex + highlight.length) : "";

  return (
    <p className={`text-balance font-medium leading-[1.12] text-fg ${className}`}>
      {before}
      {highlightIndex >= 0 ? <span className="text-accent-2">{highlight}</span> : null}
      {after}
    </p>
  );
}

function Eyebrow({ title }: { title: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-white/[0.03] px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent-2">
      <span className="size-1.5 shrink-0 rounded-full bg-accent-2" aria-hidden="true" />
      {title}
    </p>
  );
}

function TagRow({ tagline }: { tagline: string }) {
  const taglineParts = tagline.split(" • ");
  return (
    <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-full border border-border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
      {taglineParts.map((part, i) => (
        <span key={part} className="flex items-center gap-3">
          {i > 0 ? <span className="size-1 rounded-full bg-accent-2/50" aria-hidden="true" /> : null}
          {part}
        </span>
      ))}
    </div>
  );
}

function CtaRow({ whatsappHref, copy }: { whatsappHref: string; copy: UiCopy["hero"] }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <CtaLink href={whatsappHref} variant="primary">
        {copy.ctaPrimary}
      </CtaLink>
      <CtaLink href="#realisations" variant="secondary" icon={false}>
        {copy.ctaSecondary}
      </CtaLink>
    </div>
  );
}

export function Hero({ siteConfig, whatsappHref, copy }: HeroProps) {
  const progress = useHeroScrollProgress();

  const textStyle = { transform: `translateY(${lerp(0, -20, progress)}px)` };
  const portraitStyle = {
    transform: `translateY(${lerp(0, -20, progress)}px) scale(${lerp(1, 0.78, progress)})`,
    opacity: lerp(1, 0.88, progress),
    transformOrigin: "bottom center",
  };
  const sculptureStyle = {
    transform: `translateY(${lerp(0, -14, progress)}px) scale(${lerp(1, 0.86, progress)})`,
    transformOrigin: "center 60%",
  };

  return (
    <section
      id="accueil"
      className="relative min-h-[100svh] overflow-hidden bg-hero-glow lg:h-[100svh] lg:min-h-[720px]"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div className="absolute inset-0 bg-dot-grid opacity-[0.06]" aria-hidden="true" />

      {/* Ligne de mise au sol — ancrage technologique en bas de composition */}
      <div
        className="absolute inset-x-[10%] bottom-0 h-px bg-gradient-to-r from-transparent via-accent-2/50 to-transparent transition-opacity duration-150"
        style={{ opacity: lerp(0.6, 0, progress) }}
        aria-hidden="true"
      />

      {/* Desktop : composition "poster" unifiée, tout en position absolue */}
      <div className="absolute inset-0 hidden lg:block">
        <div
          className="absolute right-[2%] top-[6%] h-[86%] w-[48%] transition-transform duration-150 ease-out"
          style={sculptureStyle}
        >
          <HeroSculpture className="h-full w-full" />
        </div>

        {/* Portrait principal — seul visuel du sujet, centré dans la composition */}
        <div
          className="absolute bottom-0 right-[7%] aspect-[1166/2000] h-[90%] transition-transform duration-150 ease-out"
          style={portraitStyle}
        >
          <div
            className="absolute inset-x-[6%] bottom-[4%] h-12 rounded-full bg-accent/35 blur-2xl"
            aria-hidden="true"
          />
          <Image
            src="/images/rachid/hero-rachid-cutout.png"
            alt={copy.portraitAlt}
            fill
            priority
            sizes="35vw"
            className="portrait-treatment object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
          />
        </div>

        {/* Bloc citation — positionnement, pas une statistique */}
        <div
          className="absolute right-[2%] top-[68%] w-[15%] rounded-xl border-l border-accent-2/40 bg-ink/50 py-1 pl-4 backdrop-blur-sm transition-opacity duration-150"
          style={{ opacity: lerp(1, 0.5, progress) }}
        >
          <p className="text-base italic leading-snug text-fg/90">
            <span className="text-accent-2">&ldquo;</span>Build.
            <br />
            Automate.
            <br />
            Innovate.
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
            — Rachid Berrada
          </p>
        </div>

        <Container className="relative flex h-full items-center">
          <div
            className="max-w-[38%] space-y-6 transition-transform duration-150 ease-out"
            style={textStyle}
          >
            <Eyebrow title={siteConfig.title} />

            <h1 className="text-balance text-[3.4rem] font-semibold leading-[0.96] tracking-tight text-fg xl:text-[4rem]">
              <span className="block">Rachid</span>
              <span className="block">Berrada</span>
            </h1>

            <Headline
              headline={siteConfig.heroHeadline}
              highlight={siteConfig.heroHighlight}
              className="max-w-md text-xl xl:text-2xl"
            />

            <p className="max-w-sm text-pretty text-sm leading-relaxed text-fg-muted xl:text-base">
              {siteConfig.heroSubtitle}
            </p>

            <TagRow tagline={siteConfig.tagline} />

            <div className="pt-2">
              <CtaRow whatsappHref={whatsappHref} copy={copy} />
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile / tablette : composition simplifiée et empilée */}
      <Container className="relative flex min-h-[100svh] flex-col justify-center gap-8 py-24 lg:hidden">
        <div className="motion-safe:animate-fade-in-up shrink-0 space-y-5">
          <Eyebrow title={siteConfig.title} />
          <h1 className="text-balance text-5xl font-semibold leading-[0.98] tracking-tight text-fg sm:text-6xl">
            <span className="block">Rachid</span>
            <span className="block">Berrada</span>
          </h1>
          <Headline
            headline={siteConfig.heroHeadline}
            highlight={siteConfig.heroHighlight}
            className="text-xl sm:text-2xl"
          />
          <p className="max-w-lg text-pretty text-base leading-relaxed text-fg-muted">
            {siteConfig.heroSubtitle}
          </p>
          <TagRow tagline={siteConfig.tagline} />
          <CtaRow whatsappHref={whatsappHref} copy={copy} />
        </div>

        <div className="motion-safe:animate-fade-in relative mx-auto aspect-[1166/2000] h-[42vh] max-h-[420px] w-auto shrink-0 sm:h-[46vh]">
          <HeroSculpture className="absolute -inset-x-16 -inset-y-16" animated={false} />
          <div
            className="absolute inset-x-[10%] bottom-[4%] h-8 rounded-full bg-accent/30 blur-2xl"
            aria-hidden="true"
          />
          <Image
            src="/images/rachid/hero-rachid-cutout.png"
            alt={copy.portraitAlt}
            fill
            priority
            sizes="70vw"
            className="portrait-treatment relative object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.55)]"
          />
        </div>
      </Container>
    </section>
  );
}
