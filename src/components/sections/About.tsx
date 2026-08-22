import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { siteConfig, socialLinks } from "@/data/profile";

export function About() {
  const github = socialLinks.find((s) => s.label === "GitHub" && s.enabled);

  return (
    <section id="a-propos" className="scroll-mt-[68px] border-t border-border py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <SectionHeading eyebrow="À propos" title="Une approche orientée résultats" />

          <div className="space-y-5">
            {siteConfig.aboutText.map((paragraph, i) => (
              <p key={i} className="text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap gap-2 pt-2">
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
                className="group inline-flex items-center gap-2 pt-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
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
