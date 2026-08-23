import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { serviceIconMap } from "@/components/ui/icon-map";
import { services } from "@/data/profile";

export function Services() {
  return (
    <section id="services" className="scroll-mt-[68px] border-t border-border py-20 sm:py-28">
      <Container>
        <SectionIndex number="02" label="Ce que je construis" />
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          Des solutions adaptées à votre activité
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
          Du site vitrine à l&apos;automatisation avancée, chaque solution est pensée pour
          résoudre un problème concret de votre entreprise.
        </p>

        <div className="mt-14 divide-y divide-border border-y border-border">
          {services.map((service, index) => {
            const Icon = serviceIconMap[service.icon];
            return (
              <article
                key={service.id}
                className="group grid gap-6 py-9 transition-colors duration-200 sm:grid-cols-[minmax(0,7rem)_minmax(0,1fr)] sm:gap-10 lg:grid-cols-[minmax(0,8rem)_minmax(0,1fr)_minmax(0,16rem)]"
              >
                <div className="flex items-start gap-4 sm:block">
                  <span className="font-mono text-3xl font-semibold tabular-nums text-fg-subtle transition-colors duration-200 group-hover:text-accent-2 sm:text-4xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border-strong bg-accent-soft text-accent-2 sm:mt-3">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-fg sm:text-xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-fg-muted sm:text-base">
                    {service.description}
                  </p>

                  <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm text-fg-muted">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-accent-2" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:col-span-2 sm:pl-[calc(7rem_+_2.5rem)] lg:col-span-1 lg:content-start lg:justify-end lg:pl-0">
                  {service.benefits.map((benefit) => (
                    <span
                      key={benefit}
                      className="h-fit rounded-full bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-fg-subtle"
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
