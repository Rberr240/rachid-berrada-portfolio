import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { serviceIconMap } from "@/components/ui/icon-map";
import type { ServiceItem, UiCopy } from "@/data/types";

interface ServicesProps {
  services: ServiceItem[];
  copy: UiCopy["services"];
}

export function Services({ services, copy }: ServicesProps) {
  return (
    <section id="services" className="scroll-mt-[68px] border-t border-border py-20 sm:py-28">
      <Container>
        <SectionIndex number="02" label={copy.eyebrow} />
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          {copy.title}
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
          {copy.intro}
        </p>

        <div className="mt-14 border-y border-border">
          {services.map((service, index) => {
            const Icon = serviceIconMap[service.icon];
            const reversed = index % 2 === 1;
            return (
              <article
                key={service.id}
                className={`group relative grid gap-x-8 gap-y-6 border-b border-border py-10 last:border-b-0 sm:grid-cols-12 sm:gap-y-0 sm:py-14 ${
                  reversed ? "sm:text-right" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none col-span-4 row-span-2 select-none self-start font-serif text-[5.5rem] leading-none text-white/[0.04] transition-colors duration-300 group-hover:text-accent-2/10 sm:row-start-1 sm:text-[7rem] lg:text-[8.5rem] ${
                    reversed ? "sm:col-start-9 sm:text-right" : "sm:col-start-1"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div
                  className={`col-span-12 -mt-2 flex items-center gap-3 sm:col-span-5 sm:row-start-1 sm:mt-3 ${
                    reversed ? "sm:col-start-1 sm:justify-end" : "sm:col-start-4"
                  }`}
                >
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full border border-border-strong text-accent-2 ${
                      reversed ? "sm:order-2" : ""
                    }`}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                    {service.title}
                  </h3>
                </div>

                <div
                  className={`col-span-12 sm:col-span-8 sm:row-start-2 ${
                    reversed ? "sm:col-start-1" : "sm:col-start-4"
                  }`}
                >
                  <p className="max-w-xl text-pretty text-sm leading-relaxed text-fg-muted sm:text-base">
                    {service.description}
                  </p>

                  <ul
                    className={`mt-5 grid max-w-xl gap-x-6 gap-y-2 sm:grid-cols-2 ${
                      reversed ? "sm:ml-auto" : ""
                    }`}
                  >
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className={`flex items-start gap-2 text-sm text-fg-muted ${
                          reversed ? "sm:flex-row-reverse sm:text-right" : ""
                        }`}
                      >
                        <span className="mt-2 h-px w-3 shrink-0 bg-border-strong" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className={`mt-5 flex flex-wrap gap-x-4 gap-y-1.5 ${reversed ? "justify-end" : ""}`}>
                    {service.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-subtle"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
