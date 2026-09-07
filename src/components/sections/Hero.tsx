"use client";

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
      {highlightIndex >= 0 ? (
        <span className="font-serif italic font-normal">{highlight}</span>
      ) : null}
      {after}
    </p>
  );
}

function Eyebrow({ title }: { title: string }) {
  return (
    <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle">
      <span className="h-px w-6 shrink-0 bg-accent-2" aria-hidden="true" />
      {title}
    </p>
  );
}

function TagRow({ tagline }: { tagline: string }) {
  const taglineParts = tagline.split(" • ");
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
      {taglineParts.map((part, i) => (
        <span key={part} className="flex items-center gap-4">
          {i > 0 ? <span className="text-border-strong" aria-hidden="true">/</span> : null}
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

/** Panneau vertical "index" — remplace, en documentation technique, l'espace
 * laissé vacant par le retrait du portrait : les domaines réels (siteConfig)
 * plutôt qu'une statistique inventée. */
function FocusIndex({ eyebrow, items }: { eyebrow: string; items: string[] }) {
  return (
    <div className="space-y-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">{eyebrow}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-baseline gap-2.5 text-sm leading-snug text-fg-muted">
            <span className="h-px w-3 shrink-0 translate-y-[-0.3em] bg-accent-2/50" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuoteBlock({ words }: { words: string[] }) {
  return (
    <div className="border-l border-gold/50 py-1 pl-4">
      <p className="font-serif text-lg italic leading-snug text-fg/90">
        {words.map((word, i) => (
          <span key={word}>
            {i > 0 ? <br /> : null}
            {word}
          </span>
        ))}
      </p>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-gold">— Rachid Berrada</p>
    </div>
  );
}

export function Hero({ siteConfig, whatsappHref, copy }: HeroProps) {
  const progress = useHeroScrollProgress();

  const textStyle = { transform: `translateY(${lerp(0, -20, progress)}px)` };
  const sculptureStyle = {
    transform: `translateY(${lerp(0, -14, progress)}px) scale(${lerp(1, 0.9, progress)})`,
    transformOrigin: "center 55%",
  };
  const railStyle = {
    transform: `translateY(${lerp(0, -14, progress)}px)`,
    opacity: lerp(1, 0.5, progress),
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
          className="absolute right-[-3%] top-[9%] h-[82%] w-[58%] transition-transform duration-150 ease-out"
          style={sculptureStyle}
        >
          <HeroSculpture className="h-full w-full" />
        </div>

        {/* Colonne de métadonnées — index technique + signature, seule
            présence "sujet" de la composition après retrait du portrait */}
        <div
          className="absolute right-[4%] top-[13%] flex h-[74%] w-[17%] flex-col justify-between transition-transform duration-150 ease-out"
          style={railStyle}
        >
          <FocusIndex eyebrow={copy.focusEyebrow} items={siteConfig.knowsAbout} />
          <QuoteBlock words={copy.quoteWords} />
        </div>

        <Container className="relative flex h-full items-center">
          <div
            className="max-w-[48%] space-y-6 transition-transform duration-150 ease-out"
            style={textStyle}
          >
            <Eyebrow title={siteConfig.title} />

            <h1 className="text-balance font-serif text-[3.6rem] font-medium leading-[0.94] tracking-tight text-fg xl:text-[4.8rem]">
              <span className="block">Rachid</span>
              <span className="block">Berrada</span>
            </h1>

            <Headline
              headline={siteConfig.heroHeadline}
              highlight={siteConfig.heroHighlight}
              className="max-w-lg text-xl xl:text-2xl"
            />

            <p className="max-w-md text-pretty text-sm leading-relaxed text-fg-muted xl:text-base">
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
      <Container className="relative flex min-h-[100svh] flex-col justify-center gap-10 py-24 lg:hidden">
        <div className="motion-safe:animate-fade-in-up shrink-0 space-y-5">
          <Eyebrow title={siteConfig.title} />
          <h1 className="text-balance font-serif text-5xl font-medium leading-[0.98] tracking-tight text-fg sm:text-6xl">
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

        <div className="motion-safe:animate-fade-in flex shrink-0 flex-col items-center gap-5">
          <div className="relative aspect-square w-full max-w-[240px] sm:max-w-[260px]">
            <HeroSculpture className="h-full w-full" animated={false} />
          </div>
          <TagRow tagline={siteConfig.knowsAbout.join(" • ")} />
        </div>
      </Container>
    </section>
  );
}
