import type { Dictionary } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "./SectionHead";

export function Problems({ t }: { t: Dictionary }) {
  const p = t.problems;
  return (
    <section id="solutions" aria-labelledby="problems-title" className="border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHead id="problems-title" title={p.title} intro={p.intro} />
        <ul className="mt-12">
          {p.items.map((item) => (
            <li
              key={item.situation}
              className="grid gap-3 border-t border-line py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12"
            >
              <p className="font-serif text-xl leading-snug text-fg sm:text-2xl">{item.situation}</p>
              <div>
                <p className="text-pretty leading-relaxed text-fg-muted">{item.solution}</p>
                <p className="mt-2 text-sm font-medium text-gold">{t.services.items[item.service].title}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
