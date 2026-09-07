import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import type { ProblemItem, UiCopy } from "@/data/types";

interface ProblemsProps {
  problems: ProblemItem[];
  copy: UiCopy["problems"];
}

export function Problems({ problems, copy }: ProblemsProps) {
  return (
    <section className="border-t border-border bg-navy/30 py-20 sm:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionIndex number="03" label={copy.eyebrow} />
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              {copy.title}
            </h2>
          </div>

          <ol className="divide-y divide-border border-t border-border lg:border-t-0">
            {problems.map((problem, i) => (
              <li key={problem.question} className="grid grid-cols-[2rem_1fr] gap-x-4 py-7 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-xs text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-sm font-medium text-fg-subtle">{problem.question}</p>
                  <p className="mt-2 font-serif text-xl italic leading-snug text-fg sm:text-2xl">
                    {problem.answer}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
