import { Link } from "react-router-dom";
import type { ComponentProps, ElementType, ReactNode } from "react";

function cx(...parts: Array<string | false | undefined | null>): string {
  return parts.filter(Boolean).join(" ");
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cx("py-12 sm:py-16", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Card({
  children,
  className,
  as,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const As = as ?? "div";
  return (
    <As className={cx("rounded-xl2 border border-sand-200 bg-white p-6 shadow-soft", className)}>
      {children}
    </As>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";
const buttonBase =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-base font-medium transition duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";
const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-soft",
  secondary: "bg-sand-100 text-ink-900 hover:bg-sand-200 border border-sand-200",
  ghost: "text-brand-700 hover:bg-brand-50",
};

export function Button({
  variant = "primary",
  className,
  ...rest
}: { variant?: ButtonVariant } & ComponentProps<"button">) {
  return <button className={cx(buttonBase, buttonVariants[variant], className)} {...rest} />;
}

export function LinkButton({
  variant = "primary",
  className,
  to,
  children,
  ...rest
}: { variant?: ButtonVariant; to: string; children: ReactNode } & Omit<ComponentProps<typeof Link>, "to">) {
  return (
    <Link to={to} className={cx(buttonBase, buttonVariants[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium",
        className ?? "bg-brand-50 text-brand-700",
      )}
    >
      {children}
    </span>
  );
}

/** Render an array of paragraphs as calm, readable prose. */
export function Prose({ paragraphs, className }: { paragraphs: string[]; className?: string }) {
  return (
    <div className={cx("space-y-4 text-lg leading-relaxed text-ink-700", className)}>
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  accentHex,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  accentHex?: string;
}) {
  return (
    <header className="mb-10 border-b border-sand-200 pb-8">
      {eyebrow && (
        <p
          className="mb-2 text-sm font-semibold uppercase tracking-wide"
          style={{ color: accentHex ?? "#2f7f77" }}
        >
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{title}</h1>
      {lead && <p className="mt-4 max-w-3xl text-xl text-ink-700">{lead}</p>}
    </header>
  );
}
