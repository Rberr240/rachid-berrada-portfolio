import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industryIconMap } from "@/components/ui/icon-map";
import { industries } from "@/data/profile";

export function Industries() {
  return (
    <section id="solutions" className="scroll-mt-[68px] border-t border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Solutions par métier"
          title="Exemples de solutions que je peux concevoir"
          description="Chaque secteur a ses propres contraintes. Voici des pistes concrètes selon votre activité — adaptées ensuite à votre réalité."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const Icon = industryIconMap[industry.icon];
            return (
              <article
                key={industry.id}
                className="rounded-2xl border border-border bg-surface/60 p-7"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl border border-border-strong bg-white/[0.03] text-accent-2">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight text-fg">
                    {industry.name}
                  </h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {industry.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border px-3 py-1 text-xs text-fg-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
