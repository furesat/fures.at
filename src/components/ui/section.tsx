import type { ReactNode } from "react";

import { cn } from "./utils";

/**
 * Shared marketing-section primitives.
 *
 * The MeinHotel case study established the layout the rest of the site now
 * follows: one ambient wash per section, a container with the same gutters,
 * and a heading block of eyebrow → title → description.
 */

export function Section({
  children,
  className,
  glow = true,
  id,
}: {
  children: ReactNode;
  className?: string;
  /** Set false for sections that bring their own background treatment. */
  glow?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={cn("fures-section", className)}>
      {glow && <div className="fures-section-glow" aria-hidden="true" />}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("mb-14 text-center", className)}>
      {eyebrow && (
        <p className="mb-3 text-sm uppercase tracking-[0.32em] text-orange-400">{eyebrow}</p>
      )}
      <Heading
        className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
        style={{ letterSpacing: "-0.02em" }}
      >
        {title}
      </Heading>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60">
          {description}
        </p>
      )}
    </div>
  );
}

/** Gradient-clipped headline. Fit-content so short titles show the whole ramp. */
export function GradientTitle({
  children,
  className,
  as: Heading = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Heading
      className={cn(
        "mx-auto block w-fit bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent",
        className,
      )}
      style={{ letterSpacing: "-0.02em" }}
    >
      {children}
    </Heading>
  );
}

/** Icon badge used on every card, matching the case-study cards. */
export function CardIcon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "liquid-icon mb-5 flex h-11 w-11 items-center justify-center rounded-2xl",
        className,
      )}
    >
      {children}
    </span>
  );
}
