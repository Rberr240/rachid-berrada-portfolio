import { getImageProps } from "next/image";
import type { Dictionary } from "@/content/types";
import { person } from "@/content/facts";
import type { Locale } from "@/lib/i18n";
import { paths } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { ContactActions } from "@/components/card/ContactActions";
import { ShareButton } from "@/components/card/ShareButton";

/**
 * Portrait = élément LCP. Direction artistique : recadrage paysage léger
 * sur mobile (cadre bas et large), portrait 3:4 sur desktop. Priorité
 * réseau haute, jamais de chargement différé.
 */
function HeroPortrait({ alt }: { alt: string }) {
  const {
    props: { srcSet: desktop },
  } = getImageProps({ alt, src: person.portraits.hero, width: 1200, height: 1600, sizes: "40vw" });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ alt, src: person.portraits.heroMobile, width: 1080, height: 831, sizes: "100vw" });
  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktop} sizes="40vw" />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt fourni via rest */}
      <img
        {...rest}
        srcSet={mobile}
        fetchPriority="high"
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
      />
    </picture>
  );
}

const quickLink =
  "inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-medium text-fg-muted underline decoration-line-strong underline-offset-[6px] transition-colors hover:text-fg hover:decoration-fg-subtle";

/**
 * Premier écran = carte de visite numérique : c'est ici qu'arrive le QR
 * code imprimé. Portrait authentique, identité, proposition de valeur et
 * les quatre actions de contact, visibles sans défiler sur mobile.
 * `compact` : variante de la page /[lang]/c (sans liens vers les sections).
 */
export function Hero({ lang, t, compact = false }: { lang: Locale; t: Dictionary; compact?: boolean }) {
  return (
    <section id="accueil" aria-labelledby="hero-name">
      <Container
        className={`grid pt-3 [grid-template-areas:'media'_'body'] lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-x-16 lg:pt-14 lg:[grid-template-areas:'name_media'_'body_media'] ${
          compact ? "pb-10 lg:pb-16" : "pb-16 lg:pb-24"
        }`}
      >
        <div className="relative h-[clamp(14rem,36svh,26rem)] rounded-[1.75rem] [grid-area:media] lg:aspect-[4/5] lg:h-auto lg:self-start">
          <span className="card-edge hidden lg:block" aria-hidden="true" />
          <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-surface">
            <HeroPortrait alt={t.person.portraitAlt} />
            <div
              className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink via-ink/55 to-transparent lg:hidden"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="z-10 self-end px-5 pb-5 [grid-area:media] lg:px-0 lg:pb-0 lg:[grid-area:name]">
          <h1 id="hero-name" className="display text-[2.75rem] text-fg sm:text-6xl lg:text-[5.4rem]">
            {person.name}
          </h1>
          <p className="mt-2 text-[1.05rem] text-fg/90 sm:text-lg lg:mt-4 lg:text-xl lg:text-fg-muted">
            {t.person.title}
          </p>
        </div>

        <div className="mt-5 space-y-6 [grid-area:body] lg:mt-8 lg:space-y-8">
          <p className="max-w-xl text-pretty text-[1.05rem] leading-relaxed text-fg-muted sm:text-lg lg:text-xl">
            {t.person.valueProp}
          </p>
          <ContactActions lang={lang} t={t} />
          <nav aria-label={t.hero.secondaryAriaLabel} className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {compact ? (
              <a href={paths.home(lang)} className={quickLink}>
                {t.card.fullSite}
              </a>
            ) : (
              <>
                <a href="#services" className={quickLink}>
                  {t.hero.viewServices}
                </a>
                <a href="#realisations" className={quickLink}>
                  {t.hero.viewWork}
                </a>
              </>
            )}
            <a href={paths.quote(lang)} className={quickLink}>
              {t.common.requestQuote}
            </a>
            <ShareButton
              label={t.common.share}
              copiedLabel={t.common.shareCopied}
              failedLabel={t.common.shareFailed}
              title={`${person.name} — ${t.person.title}`}
              text={t.person.valueProp}
              className={`${quickLink} cursor-pointer`}
            />
          </nav>
        </div>
      </Container>
    </section>
  );
}
