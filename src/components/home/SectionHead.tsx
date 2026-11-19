export function SectionHead({ id, title, intro }: { id?: string; title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      <h2 id={id} className="display text-[2.4rem] text-fg sm:text-[3.4rem]">
        {title}
      </h2>
      {intro ? <p className="mt-5 text-pretty text-lg leading-relaxed text-fg-muted">{intro}</p> : null}
    </div>
  );
}
