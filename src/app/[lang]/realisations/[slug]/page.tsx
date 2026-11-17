import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getDictionary } from "@/content";
import { getProjectFacts, projects } from "@/content/facts";
import { LOCALES, isLocale } from "@/lib/i18n";
import { paths } from "@/lib/paths";
import { alternatesFor, openGraphFor } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { button, textLink } from "@/components/ui/styles";
import { StatusBadge } from "@/components/project/StatusBadge";
import { PhoneShot } from "@/components/project/PhoneShot";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => projects.map((p) => ({ lang, slug: p.id })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/realisations/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const facts = getProjectFacts(slug);
  if (!isLocale(lang) || !facts) notFound();
  const text = getDictionary(lang).projects[facts.id];
  return {
    title: text.title,
    description: text.metaDescription,
    alternates: alternatesFor(lang, `/realisations/${facts.id}`),
    openGraph: openGraphFor(lang, paths.project(lang, facts.id), text.title, text.metaDescription),
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="display text-[1.75rem] text-fg">{title}</h2>
      <div className="mt-4 space-y-4 text-pretty text-lg leading-relaxed text-fg-muted">{children}</div>
    </section>
  );
}

function Bullets({ items, marker = "bg-gold" }: { items: string[]; marker?: string }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className={`mt-[0.8em] h-px w-3 shrink-0 ${marker}`} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/[lang]/realisations/[slug]">) {
  const { lang, slug } = await params;
  const facts = getProjectFacts(slug);
  if (!isLocale(lang) || !facts) notFound();
  const t = getDictionary(lang);
  const text = t.projects[facts.id];
  const c = t.caseStudy;
  const mobile = facts.screenshots?.find((s) => s.kind === "mobile");
  const desktop = facts.screenshots?.find((s) => s.kind === "desktop");
  const others = projects.filter((p) => p.id !== facts.id);

  return (
    <article>
      <Container className="pt-8 pb-14 sm:pt-12">
        <Link href={paths.section(lang, "realisations")} className="inline-flex min-h-11 items-center gap-2 text-fg-muted hover:text-fg">
          <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
          {c.back}
        </Link>

        <header className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end">
          <div>
            <StatusBadge status={facts.status} label={t.work.status[facts.status]} />
            <h1 className="display mt-6 text-[2.75rem] text-fg sm:text-7xl">{text.title}</h1>
            <p className="mt-3 text-fg-subtle">{text.category}</p>
            <p className="mt-6 max-w-2xl font-serif text-2xl leading-snug text-fg sm:text-[1.75rem]">{text.tagline}</p>
          </div>
          <dl className="grid gap-5 rounded-[1.75rem] border border-line bg-surface p-6 text-[0.95rem]">
            <div>
              <dt className="font-semibold text-fg">{c.contextLabel}</dt>
              <dd className="mt-1 text-fg-muted">{text.context}</dd>
            </div>
            <div>
              <dt className="font-semibold text-fg">{c.roleLabel}</dt>
              <dd className="mt-1 text-fg-muted">{text.role}</dd>
            </div>
            <div>
              <dt className="font-semibold text-fg">{c.stackLabel}</dt>
              <dd className="mt-1 text-fg-muted">{facts.stack.join(", ")}</dd>
            </div>
            <div>
              <dt className="font-semibold text-fg">{c.linksLabel}</dt>
              <dd className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
                {facts.demoUrl ? (
                  <a href={facts.demoUrl} target="_blank" rel="noopener noreferrer" className={textLink}>
                    {t.work.viewDemo}
                    <span className="sr-only"> {t.common.externalHint}</span>
                  </a>
                ) : null}
                {facts.repoUrl ? (
                  <a href={facts.repoUrl} target="_blank" rel="noopener noreferrer" className={textLink}>
                    {t.work.viewRepo}
                    <span className="sr-only"> {t.common.externalHint}</span>
                  </a>
                ) : null}
                {!facts.demoUrl && !facts.repoUrl ? <span className="text-fg-muted">{c.noLinks}</span> : null}
              </dd>
            </div>
          </dl>
        </header>
      </Container>

      <Container className="grid gap-14 pb-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16">
        <div className="space-y-12">
          <Block title={c.problemLabel}>
            {text.problem.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Block>
          <Block title={c.solutionLabel}>
            {text.solution.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Block>
          <Block title={c.featuresLabel}>
            <Bullets items={text.features} />
          </Block>
          {text.flow ? (
            <Block title={c.flowLabel}>
              <ol className="flex flex-wrap gap-2 text-base">
                {text.flow.map((step, i) => (
                  <li key={step} className="rounded-full border border-line-strong px-4 py-2 text-fg">
                    <span className="me-2 text-gold">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </Block>
          ) : null}
          <Block title={c.evidenceLabel}>
            <Bullets items={text.evidence} />
          </Block>
          <Block title={c.limitationsLabel}>
            <Bullets items={text.limitations} marker="bg-fg-subtle" />
          </Block>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <section aria-labelledby="shots-title">
            <h2 id="shots-title" className="sr-only">
              {c.screenshotsLabel}
            </h2>
            {mobile ? (
              <PhoneShot
                src={mobile.src}
                alt={text.screenshotAlt?.mobile ?? text.title}
                sizes="(min-width: 1024px) 300px, 70vw"
                className="mx-auto w-[70%] max-w-[18rem] lg:w-[80%]"
              />
            ) : (
              <p className="rounded-[1.75rem] border border-dashed border-line-strong p-6 text-fg-muted">{c.noScreenshots}</p>
            )}
          </section>
          <section className="rounded-[1.75rem] border border-line bg-surface p-7">
            <h2 className="display text-2xl text-fg">{c.ctaTitle}</h2>
            <p className="mt-2 text-fg-muted">{c.ctaBody}</p>
            <Link href={`${paths.quote(lang)}?service=${facts.services[0]}`} className={`${button.primary} mt-6 w-full`}>
              {t.common.requestQuote}
            </Link>
          </section>
        </aside>
      </Container>

      {desktop ? (
        <Container className="pb-20">
          <h2 className="display text-[1.75rem] text-fg">{c.screenshotsLabel}</h2>
          <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-line bg-surface">
            <Image
              src={desktop.src}
              alt={text.screenshotAlt?.desktop ?? text.title}
              fill
              sizes="(min-width: 1152px) 1088px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </Container>
      ) : null}

      <Container className="border-t border-line py-14">
        <h2 className="display text-[1.75rem] text-fg">{c.otherProjects}</h2>
        <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {others.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <Link href={paths.project(lang, p.id)} className="text-lg font-medium text-fg hover:text-accent-text">
                {t.projects[p.id].title}
              </Link>
              <StatusBadge status={p.status} label={t.work.status[p.status]} />
            </li>
          ))}
        </ul>
      </Container>
    </article>
  );
}
