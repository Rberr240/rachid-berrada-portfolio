import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { AbstractFigure } from "@/components/ui/AbstractFigure";
import { siteConfig } from "@/data/profile";
import { getWhatsAppLink } from "@/lib/whatsapp";

const taglineParts = siteConfig.tagline.split(" • ");

export function Hero() {
  const [firstName, ...restName] = siteConfig.name.split(" ");
  const lastName = restName.join(" ");

  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-hero-glow pt-14 pb-20 sm:pt-20 sm:pb-28 lg:pb-32"
    >
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_1fr] lg:gap-10">
          {/* Colonne texte */}
          <div className="motion-safe:animate-fade-in-up">
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

          {/* Colonne composition portrait */}
          <div className="motion-safe:animate-fade-in relative mx-auto aspect-[4/5] w-full max-w-[420px] lg:mx-0 lg:max-w-none">
            <AbstractFigure className="absolute -inset-x-6 -inset-y-10 sm:-inset-x-10 sm:-inset-y-14" />

            <div
              className="halo-blue absolute -inset-10 -z-10 sm:-inset-14"
              aria-hidden="true"
            />

            <div className="portrait-fade-edge relative h-full w-full overflow-hidden rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)]">
              <Image
                src="/images/rachid/hero-rachid.jpg"
                alt="Rachid Berrada, ingénieur en solutions digitales"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 85vw"
                className="portrait-treatment object-cover object-top"
              />
              <div
                className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_100%,rgba(2,3,7,0.55)_0%,transparent_55%)]"
                aria-hidden="true"
              />
            </div>

            <div
              className="pointer-events-none absolute -right-2 top-6 hidden flex-col items-end gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle sm:flex"
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
