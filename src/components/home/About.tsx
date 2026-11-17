import Image from "next/image";
import type { Dictionary } from "@/content/types";
import { person } from "@/content/facts";
import { Container } from "@/components/ui/Container";
import { GithubIcon } from "@/components/ui/BrandIcons";

export function About({ t }: { t: Dictionary }) {
  const [lead, ...rest] = t.about.paragraphs;
  return (
    <section id="a-propos" aria-labelledby="about-title" className="border-t border-line py-20 sm:py-28">
      <Container className="grid gap-12 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-16">
        <div className="relative mx-auto aspect-[4/5] w-3/4 max-w-sm rounded-[1.75rem] md:mx-0 md:w-full">
          <span className="card-edge" aria-hidden="true" />
          <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-surface">
            <Image
              src={person.portraits.about}
              alt={t.person.aboutPortraitAlt}
              fill
              sizes="(min-width: 768px) 30vw, 75vw"
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <h2 id="about-title" className="display text-[2.4rem] text-fg sm:text-[3.4rem]">
            {t.about.title}
          </h2>
          <p className="mt-6 text-pretty font-serif text-2xl leading-snug text-fg sm:text-[1.75rem]">{lead}</p>
          {rest.map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">
              {paragraph}
            </p>
          ))}
          <a
            href={person.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-11 items-center gap-2 font-medium text-fg-muted underline decoration-line-strong underline-offset-4 hover:text-fg"
          >
            <GithubIcon className="size-4" />
            {t.about.githubCta}
            <span className="sr-only"> {t.common.externalHint}</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
