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

        <div className="mt-14 grid gap-x-8 gap-y-0 border-t border-border sm:grid-cols-2">
          {industries.map((industry, i) => {
            const Icon = industryIconMap[industry.icon];
            const isLastOdd = i === industries.length - 1 && industries.length % 2 === 1;
            return (
              <article
                key={industry.id}
                className={`group flex items-start gap-4 border-b border-border py-7 sm:py-8 ${
                  isLastOdd ? "sm:col-span-2" : ""
                }`}
              >
                <Icon
                  className="mt-0.5 size-5 shrink-0 text-fg-subtle transition-colors duration-200 group-hover:text-accent-2"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-fg">{industry.name}</h3>
                  <ul className="mt-1.5 max-w-md text-pretty text-sm leading-relaxed text-fg-muted">
                    {industry.items.map((item, itemIndex) => (
                      <li key={item} className="inline">
                        {item}
                        {itemIndex < industry.items.length - 1 ? ", " : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
