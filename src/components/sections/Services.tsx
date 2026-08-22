import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceIconMap } from "@/components/ui/icon-map";
import { services } from "@/data/profile";

export function Services() {
  return (
    <section id="services" className="scroll-mt-[68px] border-t border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Ce que je peux faire"
          title="Des solutions adaptées à votre activité"
          description="Du site vitrine à l'automatisation avancée, chaque solution est pensée pour résoudre un problème concret de votre entreprise."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = serviceIconMap[service.icon];
            return (
              <article
                key={service.id}
                className="group flex flex-col rounded-2xl border border-border bg-surface/60 p-7 transition-colors duration-200 hover:border-border-strong"
              >
                <div className="flex size-11 items-center justify-center rounded-xl border border-border-strong bg-accent-soft text-accent-2">
                  <Icon className="size-5" aria-hidden="true" />
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-tight text-fg">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {service.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {service.bullets.slice(0, 4).map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-fg-muted">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-accent-2" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-border pt-5">
                  {service.benefits.map((benefit) => (
                    <span
                      key={benefit}
                      className="rounded-full bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-fg-subtle"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
