import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/profile";

/**
 * Section masquée tant qu'aucun témoignage réel n'est renseigné dans
 * src/data/profile.ts (aucun témoignage n'est inventé).
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-t border-border py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Témoignages" title="Ce que mes clients en disent" />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-2xl border border-border bg-surface/60 p-7"
            >
              <p className="text-sm leading-relaxed text-fg-muted">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-5 text-sm font-medium text-fg">
                {t.name}
                <span className="block text-xs font-normal text-fg-subtle">
                  {t.role}
                  {t.company ? ` — ${t.company}` : ""}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
