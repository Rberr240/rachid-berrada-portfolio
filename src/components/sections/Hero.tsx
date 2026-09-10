"use client";

import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
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

  const before =
    highlightIndex >= 0 ? headline.slice(0, highlightIndex) : headline;

  const after =
    highlightIndex >= 0
      ? headline.slice(highlightIndex + highlight.length)
      : "";

  return (
    <p
      className={`text-balance font-medium leading-[1.12] text-fg ${className}`}
    >
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
      <span
        className="h-px w-6 shrink-0 bg-accent-2"
        aria-hidden="true"
      />

      {title}
    </p>
  );
}

function TagRow({ tagline }: { tagline: string }) {
  const taglineParts = tagline.split(" • ");

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
      {taglineParts.map((part, i) => (
        <span key={`${part}-${i}`} className="flex items-center gap-4">
          {i > 0 ? (
            <span className="text-border-strong" aria-hidden="true">
              /
            </span>
          ) : null}

          {part}
        </span>
      ))}
    </div>
  );
}

function CtaRow({
  whatsappHref,
  copy,
}: {
  whatsappHref: string;
  copy: UiCopy["hero"];
}) {
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

function QuoteBlock({ words }: { words: string[] }) {
  return (
    <div className="border-s border-gold/50 py-1 ps-4">
      <p className="font-serif text-lg italic leading-snug text-fg/90">
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            {i > 0 ? <br /> : null}
            {word}
          </span>
        ))}
      </p>

      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-gold">
        — Rachid Berrada
      </p>
    </div>
  );
}

export function Hero({
  siteConfig,
  whatsappHref,
  copy,
}: HeroProps) {
  const progress = useHeroScrollProgress();

  const textStyle = {
    transform: `translateY(${lerp(0, -20, progress)}px)`,
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
      {/* Background */}
      <div
        className="absolute inset-0 bg-grid opacity-40"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-dot-grid opacity-[0.06]"
        aria-hidden="true"
      />

      {/* Ligne décorative basse */}
      <div
        className="absolute inset-x-[10%] bottom-0 h-px bg-gradient-to-r from-transparent via-accent-2/50 to-transparent transition-opacity duration-150"
        style={{
          opacity: lerp(0.6, 0, progress),
        }}
        aria-hidden="true"
      />

      {/* ========================= */}
      {/* DESKTOP */}
      {/* ========================= */}

      <div className="absolute inset-0 hidden lg:block">
        {/* Signature / quote à droite */}
        <div
          className="absolute end-[6%] bottom-[12%] w-[18%] transition-transform duration-150 ease-out"
          style={railStyle}
        >
          <QuoteBlock words={copy.quoteWords} />
        </div>

        <Container className="relative flex h-full items-center">
          <div
            className="max-w-[58%] space-y-6 transition-transform duration-150 ease-out"
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

            {/* Garde uniquement le petit WEB / AI / AUTOMATION */}
            <TagRow tagline={siteConfig.tagline} />

            <div className="pt-2">
              <CtaRow
                whatsappHref={whatsappHref}
                copy={copy}
              />
            </div>
          </div>
        </Container>
      </div>

      {/* ========================= */}
      {/* MOBILE / TABLETTE */}
      {/* ========================= */}

      <Container className="relative flex min-h-[100svh] items-center py-24 lg:hidden">
        <div className="motion-safe:animate-fade-in-up w-full max-w-xl space-y-5">
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

          {/* Garde uniquement le petit WEB / AI / AUTOMATION */}
          <TagRow tagline={siteConfig.tagline} />

          <CtaRow
            whatsappHref={whatsappHref}
            copy={copy}
          />
        </div>
      </Container>
    </section>
  );
}