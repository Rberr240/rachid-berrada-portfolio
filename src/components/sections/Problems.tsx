import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { problems } from "@/data/profile";

export function Problems() {
  return (
    <section className="border-t border-border bg-navy/30 py-20 sm:py-28">
      <Container>
        <SectionIndex number="03" label="Situations fréquentes" />
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          Des problèmes concrets, des solutions concrètes
        </h2>

        <div className="mt-12 divide-y divide-border border-y border-border">
          {problems.map((problem) => (
            <div
              key={problem.question}
              className="grid gap-2 py-6 sm:grid-cols-2 sm:items-center sm:gap-8"
            >
              <p className="text-base font-medium leading-snug text-fg">
                {problem.question}
              </p>
              <p className="flex items-start gap-2 text-sm font-medium leading-relaxed text-accent-2">
                <ArrowRight className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {problem.answer}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
