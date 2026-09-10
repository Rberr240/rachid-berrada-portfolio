import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { SectionIndex } from "@/components/ui/SectionIndex";
import type { SocialLink, UiCopy } from "@/data/types";

interface AboutProps {
  aboutText: string[];
  socialLinks: SocialLink[];
  copy: UiCopy["about"];
}

export function About({ aboutText, socialLinks, copy }: AboutProps) {
  const github = socialLinks.find((s) => s.label === "GitHub" && s.enabled);

  return (
    <section id="a-propos" className="scroll-mt-[68px] border-t border-border py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionIndex number="08" label={copy.eyebrow} />

            <div className="relative max-w-sm">
              <div
                className="absolute -bottom-4 -end-4 aspect-[4/5] w-full rounded-tr-[2.75rem] rounded-bl-[2.75rem] rounded-tl-xl rounded-br-xl border border-gold/30"
                aria-hidden="true"
              />
              <div className="portrait-fade-edge relative aspect-[4/5] w-full overflow-hidden rounded-tr-[2.75rem] rounded-bl-[2.75rem] rounded-tl-xl rounded-br-xl border border-white/10">
                <Image
                  src="/images/rachid/about-rachid.jpg"
                  alt={copy.portraitAlt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 60vw"
                  className="object-cover"
                  style={{ filter: "saturate(0.55) contrast(1.1) brightness(0.92) hue-rotate(-6deg)" }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              {copy.title}
            </h2>

            <div className="mt-8 space-y-5">
              {aboutText.map((paragraph, i) =>
                i === 0 ? (
                  <p key={i} className="text-balance font-serif text-2xl italic leading-snug text-fg sm:text-3xl">
                    {paragraph}
                  </p>
                ) : (
                  <p key={i} className="text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
                    {paragraph}
                  </p>
                ),
              )}
            </div>

            <p className="mt-8 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
              {copy.tags.join(" / ")}
            </p>

            {github ? (
              <a
                href={github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
              >
                <GithubIcon className="size-4 shrink-0" />
                {copy.githubCta}
                <span className="inline-block text-fg-subtle transition-transform duration-200 rtl:-scale-x-100 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
