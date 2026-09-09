"use client";

/**
 * Media placeholders.
 *
 * A design system should not ship photography it does not own, and a library
 * illustrated with somebody's camera roll reads as unfinished. These are drawn
 * instead: soft overlapping fields of colour, built from the same token layer as
 * everything else, so they theme with light and dark and can never 404.
 *
 * Deliberately abstract. A placeholder that draws a cup invites the reader to
 * judge the drawing; one that is only atmosphere lets them look past it at the
 * component, which is the thing being documented.
 *
 * Gradient ids are namespaced with `useId` because several of these render on
 * one page, and duplicate `defs` ids would make every instance resolve to
 * whichever mounted first.
 */

import { useId } from "react";

import styles from "./ui.module.css";

type Glow = { color: string; cx: number; cy: number; r: number; opacity: number };
type Variant = { field: string; glows: Glow[] };

/** On-palette atmospheres. Variants cycle so a grid never repeats side by side. */
const VARIANTS: Variant[] = [
  {
    field: "var(--eh-tint-brand)",
    glows: [
      { color: "var(--eh-purple-300)", cx: 28, cy: 26, r: 62, opacity: 0.95 },
      { color: "var(--eh-purple-400)", cx: 78, cy: 72, r: 54, opacity: 0.6 },
      { color: "var(--eh-light-purple)", cx: 62, cy: 18, r: 38, opacity: 0.5 },
    ],
  },
  {
    field: "var(--eh-gold-50)",
    glows: [
      { color: "var(--eh-gold-300)", cx: 70, cy: 32, r: 60, opacity: 0.9 },
      { color: "var(--eh-gold-500)", cx: 26, cy: 74, r: 50, opacity: 0.5 },
      { color: "var(--eh-purple-300)", cx: 88, cy: 88, r: 40, opacity: 0.28 },
    ],
  },
  {
    field: "var(--eh-bg-subtle)",
    glows: [
      { color: "var(--eh-neutral-300)", cx: 34, cy: 70, r: 64, opacity: 0.9 },
      { color: "var(--eh-purple-300)", cx: 76, cy: 26, r: 52, opacity: 0.45 },
      { color: "var(--eh-neutral-400)", cx: 18, cy: 22, r: 36, opacity: 0.35 },
    ],
  },
  {
    field: "var(--eh-tint-brand)",
    glows: [
      { color: "var(--eh-purple-400)", cx: 74, cy: 66, r: 66, opacity: 0.8 },
      { color: "var(--eh-gold-300)", cx: 24, cy: 30, r: 46, opacity: 0.42 },
      { color: "var(--eh-purple-300)", cx: 50, cy: 92, r: 44, opacity: 0.55 },
    ],
  },
];

/**
 * `slice` on a square viewBox fills any slot at any aspect ratio. There is no
 * subject to crop, so a wide banner and a square tile can share one composition.
 */
export function MediaPlaceholder({
  variant = 0,
  className,
  label = "",
}: {
  variant?: number;
  className?: string;
  label?: string;
}) {
  const id = useId().replace(/:/g, "");
  const { field, glows } = VARIANTS[variant % VARIANTS.length];

  return (
    <svg
      className={className ?? styles.placeholder}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      style={{ background: field }}
      role="img"
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        {glows.map((glow, index) => (
          <radialGradient key={index} id={`${id}-${index}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={glow.color} stopOpacity={glow.opacity} />
            <stop offset="55%" stopColor={glow.color} stopOpacity={glow.opacity * 0.45} />
            <stop offset="100%" stopColor={glow.color} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      {glows.map((glow, index) => (
        <circle
          key={index}
          cx={glow.cx}
          cy={glow.cy}
          r={glow.r}
          fill={`url(#${id}-${index})`}
        />
      ))}
    </svg>
  );
}
