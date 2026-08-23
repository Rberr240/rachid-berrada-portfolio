export function SectionIndex({ number, label }: { number: string; label: string }) {
  return (
    <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
      <span className="text-accent-2">{number}</span>
      <span className="h-px flex-1 max-w-16 bg-border-strong" />
      <span>{label}</span>
    </div>
  );
}
