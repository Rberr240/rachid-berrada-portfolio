import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import type { FaqItem, UiCopy } from "@/data/types";

interface FaqProps {
  faqs: FaqItem[];
  copy: UiCopy["faq"];
}

export function Faq({ faqs, copy }: FaqProps) {
  return (
    <section className="border-t border-border bg-navy/30 py-20 sm:py-28">
      <Container>
        <SectionIndex number="09" label={copy.eyebrow} />
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          {copy.title}
        </h2>

        <div className="mt-10 max-w-3xl divide-y divide-border border-y border-border">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-fg marker:content-none">
                {faq.question}
                <Plus
                  className="size-4 shrink-0 text-fg-muted transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
