import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { siteConfig, socialLinks } from "@/data/profile";

export function About() {
  const github = socialLinks.find((s) => s.label === "GitHub" && s.enabled);

  return (
    <section id="a-propos" className="scroll-mt-[68px] border-t border-border py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionIndex number="08" label="À propos" />

            <div className="portrait-fade-edge relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-tr-[2.75rem] rounded-bl-[2.75rem] rounded-tl-xl rounded-br-xl border border-white/10">
              <Image
                src="/images/rachid/about-rachid.jpg"
                alt="Rachid Berrada, portrait éditorial"
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

          <div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Une approche orientée résultats
            </h2>

            <div className="mt-7 space-y-5">
              {siteConfig.aboutText.map((paragraph, i) => (
                <p key={i} className="text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {["Développement web", "Applications", "Intelligence artificielle", "Automatisation"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border-strong bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-fg-muted"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>

            {github ? (
              <a
                href={github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
              >
                <GithubIcon className="size-4 shrink-0" />
                Voir mon code sur GitHub
                <span className="text-fg-subtle transition-transform duration-200 group-hover:translate-x-0.5">
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
