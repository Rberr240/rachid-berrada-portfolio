import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { industryIconMap } from "@/components/ui/icon-map";
import type { IndustryItem, UiCopy } from "@/data/types";

interface IndustriesProps {
  industries: IndustryItem[];
  copy: UiCopy["industries"];
}

export function Industries({ industries, copy }: IndustriesProps) {
  return (
    <section id="solutions" className="scroll-mt-[68px] border-t border-border py-20 sm:py-28">
      <Container>
        <SectionIndex number="04" label={copy.eyebrow} />
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          {copy.title}
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
          {copy.intro}
        </p>

        <div className="mt-14 divide-y divide-border border-y border-border">
          {industries.map((industry) => {
            const Icon = industryIconMap[industry.icon];
            return (
              <article
                key={industry.id}
                className="group grid gap-4 py-7 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:items-center sm:gap-8"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border-strong bg-white/[0.03] text-accent-2 transition-colors duration-200 group-hover:border-accent-2/40">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight text-fg">
                    {industry.name}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-1.5">
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
