import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_0_0_1px_rgba(61,99,255,0.4),0_8px_24px_-8px_rgba(61,99,255,0.55)] hover:bg-accent-2 hover:shadow-[0_0_0_1px_rgba(111,141,255,0.5),0_10px_28px_-6px_rgba(61,99,255,0.65)] active:scale-[0.98]",
  secondary:
    "border border-border-strong bg-white/[0.02] text-fg hover:border-accent-2/60 hover:bg-white/[0.05] active:scale-[0.98]",
  ghost: "text-fg-muted hover:text-fg",
};

export function CtaLink({
  href,
  children,
  variant = "primary",
  icon = true,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: boolean;
  external?: boolean;
  className?: string;
}) {
  const content = (
    <>
      {children}
      {icon ? (
        <ArrowRight
          className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  const classes = `group ${base} ${variants[variant]} ${className}`;

  if (external || href.startsWith("http") || href.startsWith("https://wa.me")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
