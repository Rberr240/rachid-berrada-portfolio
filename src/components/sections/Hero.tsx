import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { siteConfig } from "@/data/profile";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-hero-glow pt-16 pb-20 sm:pt-24 sm:pb-28"
    >
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />

      <Container className="relative">
        <div className="motion-safe:animate-fade-in-up max-w-3xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-strong bg-white/[0.03] px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent-2">
            {siteConfig.title}
          </p>

          <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-fg sm:text-5xl md:text-6xl">
            {siteConfig.name}
          </h1>

          <p className="mt-6 text-balance text-xl font-medium leading-snug text-fg sm:text-2xl">
            {siteConfig.heroHeadline}
          </p>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
            {siteConfig.heroSubtitle}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CtaLink href={getWhatsAppLink()} variant="primary">
              Discuter de mon projet
            </CtaLink>
            <CtaLink href="#services" variant="secondary" icon={false}>
              Découvrir mes services
            </CtaLink>
          </div>

          <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
            {siteConfig.tagline}
          </p>
        </div>
      </Container>
    </section>
  );
}
