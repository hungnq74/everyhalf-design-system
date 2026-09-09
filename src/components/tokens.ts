/**
 * Every Half mobile design system — one source of truth.
 *
 * The swatches and specimens rendered on /foundation and the
 * stylesheet offered at the foot of that page are both generated from this
 * file, so a value can never be documented as one thing and shipped as another.
 *
 * Provenance matters here and is recorded per token:
 *   `brand`   — taken verbatim from EH_Guideline_Color&Typo.pdf §2.1. Five
 *               colours, no more. These are not ours to change.
 *   `derived` — ramp steps interpolated around a brand anchor so the product
 *               has the tints and shades an interface needs. Documented as
 *               derived, never presented as brand colour.
 *   `product` — colours the shipping app uses that the guideline does not
 *               cover at all: the loyalty golds, the dark loyalty surfaces, the
 *               campaign orange, and the status ramps. Recorded here rather
 *               than left to drift through the codebase.
 */

export type Origin = "brand" | "derived" | "product";

export type Swatch = {
  step: string;
  value: string;
  origin: Origin;
  note?: string;
};

/* --------------------------------------------------------------------------
   Colour
   -------------------------------------------------------------------------- */

/** The five guideline colours, verbatim. §2.1. */
export const brand: Swatch[] = [
  { step: "eh-purple", value: "#7864BE", origin: "brand", note: "Core. Brand, navigation, earned value" },
  { step: "light-purple", value: "#C8BEF0", origin: "brand", note: "Softens the tone; background accent" },
  { step: "light-gray", value: "#D0D2D3", origin: "brand", note: "Breathing space; dividers, inactive" },
  { step: "soft-white", value: "#F1F1F2", origin: "brand", note: "Quiet canvas" },
  { step: "pure-black", value: "#231F20", origin: "brand", note: "Anchors the system; committed action" },
];

/** Purple ramp. 300 and 500 are the guideline's Light Purple and EH Purple. */
export const purple: Swatch[] = [
  { step: "50", value: "#F5F3FC", origin: "derived", note: "selected row, tint background" },
  { step: "100", value: "#EBE7F8", origin: "derived" },
  { step: "200", value: "#DAD3F4", origin: "derived" },
  { step: "300", value: "#C8BEF0", origin: "brand", note: "Light Purple" },
  { step: "400", value: "#A08FD9", origin: "derived" },
  { step: "500", value: "#7864BE", origin: "brand", note: "EH Purple" },
  { step: "600", value: "#64509F", origin: "derived", note: "pressed / hover" },
  { step: "700", value: "#503F80", origin: "derived", note: "text on light — passes AA" },
  { step: "800", value: "#3B2F5F", origin: "derived" },
  { step: "900", value: "#271F3F", origin: "derived" },
];

/** Neutral ramp. 100, 300 and 900 are guideline colours. */
export const neutral: Swatch[] = [
  { step: "0", value: "#FFFFFF", origin: "derived", note: "card surface" },
  { step: "50", value: "#F8F8F8", origin: "derived", note: "app canvas" },
  { step: "100", value: "#F1F1F2", origin: "brand", note: "Soft White" },
  { step: "200", value: "#E4E4E5", origin: "derived", note: "hairline" },
  { step: "300", value: "#D0D2D3", origin: "brand", note: "Light Gray — borders, inactive" },
  { step: "400", value: "#B0B2B3", origin: "derived", note: "disabled text" },
  { step: "500", value: "#8A8C8D", origin: "derived" },
  { step: "600", value: "#66686A", origin: "derived", note: "secondary text" },
  { step: "700", value: "#4A4C4D", origin: "derived" },
  { step: "800", value: "#333536", origin: "derived" },
  { step: "900", value: "#231F20", origin: "brand", note: "Pure Black — primary text" },
];

/**
 * Loyalty gold. Not in the guideline; the shipping app uses it for stamps, the
 * member tier badge and reward surfaces, so it is documented rather than
 * scattered. Reserved for earned value — never for navigation or actions.
 */
export const gold: Swatch[] = [
  { step: "50", value: "#FBF7EA", origin: "product", note: "tint behind a reward row" },
  { step: "300", value: "#E0C67E", origin: "product", note: "stamp ring, filled" },
  { step: "500", value: "#C9A961", origin: "product", note: "tier badge, stamp fill" },
  { step: "700", value: "#8A6D2B", origin: "product", note: "text on gold tint" },
];

/**
 * Loyalty surfaces. The app's rewards and voucher headers are near-black plums
 * rather than flat Pure Black — they read as "treasure" against the calm canvas.
 */
export const loyaltySurfaces: Swatch[] = [
  { step: "loyalty-base", value: "#241726", origin: "product", note: "rewards header, voucher hero" },
  { step: "loyalty-raised", value: "#34203A", origin: "product", note: "raised card on that header" },
  { step: "loyalty-warm", value: "#2A1D18", origin: "product", note: "home greeting header" },
];

export type SemanticRamp = {
  name: string;
  role: string;
  light: string;
  default: string;
  dark: string;
};

/** Status ramps. Product layer — the guideline has no status colour. */
export const semantic: SemanticRamp[] = [
  { name: "success", role: "Đang mở, Hoàn thành, stamp earned", light: "#E6F6EF", default: "#0E9F6E", dark: "#07694A" },
  { name: "warning", role: "Sắp hết hạn, cần chú ý", light: "#FEF3DA", default: "#B54708", dark: "#7A2E0E" },
  { name: "danger", role: "Đã hủy, đăng xuất, huỷ đơn", light: "#FDECEA", default: "#D92D20", dark: "#912018" },
  { name: "campaign", role: "New Crop and seasonal storytelling", light: "#FBEDE7", default: "#E2714A", dark: "#A34A2A" },
];

export const surfaces: Swatch[] = [
  { step: "bg-canvas", value: "#F8F8F8", origin: "derived", note: "the screen itself" },
  { step: "bg-surface", value: "#FFFFFF", origin: "derived", note: "cards, rows, fields" },
  { step: "bg-subtle", value: "#F1F1F2", origin: "brand", note: "inset wells, unselected chip" },
  { step: "bg-inverse", value: "#231F20", origin: "brand", note: "sticky action bar" },
  { step: "bg-scrim", value: "rgba(35,31,32,0.44)", origin: "derived", note: "behind a sheet" },
];

export const textColors: Swatch[] = [
  { step: "text-primary", value: "#231F20", origin: "brand" },
  { step: "text-secondary", value: "#66686A", origin: "derived" },
  { step: "text-disabled", value: "#B0B2B3", origin: "derived" },
  { step: "text-inverse", value: "#FFFFFF", origin: "derived" },
  { step: "text-brand", value: "#64509F", origin: "derived", note: "price, links — AA on white" },
];

export const borders: Swatch[] = [
  { step: "border-default", value: "#E4E4E5", origin: "derived" },
  { step: "border-strong", value: "#D0D2D3", origin: "brand", note: "Light Gray — chip outline" },
  { step: "border-focus", value: "#7864BE", origin: "brand" },
  { step: "border-error", value: "#D92D20", origin: "product" },
];

/* --------------------------------------------------------------------------
   Type
   -------------------------------------------------------------------------- */

export type TypeToken = {
  token: string;
  size: number;
  line: number;
  weight: number;
  /** Bricolage's `wdth` axis. 88 is the guideline's display width, 100 its body width. */
  width: number;
  tracking: string;
  family: "display" | "body" | "mono";
  sample: string;
};

/**
 * The guideline's §3.3 specimen is set for print — an 82px headline. The ratios
 * and the axis settings carry over to mobile; the absolute sizes do not. These
 * are the mobile-scale equivalents, keeping width 88 for display voice and 100
 * for reading, and the guideline's ±0.025em tracking split.
 */
export const typeScale: TypeToken[] = [
  { token: "display", size: 32, line: 34, weight: 500, width: 88, tracking: "-0.4px", family: "display", sample: "Mỗi lần trở lại" },
  { token: "headline", size: 24, line: 28, weight: 600, width: 88, tracking: "-0.3px", family: "display", sample: "Phần thưởng của bạn" },
  { token: "title", size: 20, line: 26, weight: 600, width: 92, tracking: "-0.2px", family: "display", sample: "Thức uống nổi bật" },
  { token: "body-lg", size: 17, line: 24, weight: 400, width: 100, tracking: "0", family: "body", sample: "Thức uống (Creamy Cloud Matcha)" },
  { token: "body", size: 15, line: 22, weight: 400, width: 100, tracking: "0.02em", family: "body", sample: "Bạn có 1 ly miễn phí đang chờ đổi." },
  { token: "label", size: 14, line: 20, weight: 500, width: 100, tracking: "0", family: "body", sample: "Thêm vào giỏ hàng" },
  { token: "caption", size: 12, line: 16, weight: 400, width: 100, tracking: "0", family: "body", sample: "HSD: 25/11/2026" },
  { token: "eyebrow", size: 11, line: 14, weight: 500, width: 100, tracking: "-0.025em", family: "mono", sample: "ĐIỂM ĐỔI QUÀ" },
];

export const fontStacks = {
  display: `var(--font-bricolage), "Arial Narrow", Arial, sans-serif`,
  body: `var(--font-bricolage), Arial, sans-serif`,
  mono: `var(--font-eh-mono), "Courier New", monospace`,
};

/* --------------------------------------------------------------------------
   Space, shape, motion — and the mobile-only tokens
   -------------------------------------------------------------------------- */

export const spacing = [
  { token: "2xs", value: 4 },
  { token: "xs", value: 8 },
  { token: "sm", value: 12 },
  { token: "md", value: 16, note: "screen gutter" },
  { token: "lg", value: 20 },
  { token: "xl", value: 24 },
  { token: "2xl", value: 32 },
  { token: "3xl", value: 40 },
];

export const radii = [
  { token: "xs", value: "8px", use: "chips, small tiles" },
  { token: "sm", value: "12px", use: "inputs, list thumbnails" },
  { token: "md", value: "16px", use: "cards, product tiles" },
  { token: "lg", value: "20px", use: "sheets, hero cards" },
  { token: "xl", value: "28px", use: "loyalty headers" },
  { token: "full", value: "999px", use: "pills, stamps, avatars" },
];

export const shadows = [
  { token: "none", value: "none", use: "flat row on canvas" },
  { token: "card", value: "0 1px 2px rgba(35,31,32,.04), 0 4px 16px rgba(35,31,32,.05)", use: "cards" },
  { token: "sticky", value: "0 -2px 12px rgba(35,31,32,.08)", use: "sticky action bar, bottom nav" },
  { token: "sheet", value: "0 -8px 40px rgba(35,31,32,.18)", use: "bottom sheet" },
];

/**
 * Mobile-only foundation. A desktop system has no equivalent of these, and they
 * are the tokens most often left implicit — which is how a mobile UI ends up
 * with a 32px tap target under the home indicator.
 */
export const mobile = [
  { token: "tap-min", value: "44px", note: "minimum touch target — every interactive element" },
  { token: "safe-top", value: "env(safe-area-inset-top, 44px)", note: "status bar / notch" },
  { token: "safe-bottom", value: "env(safe-area-inset-bottom, 34px)", note: "home indicator" },
  { token: "nav-height", value: "56px", note: "bottom tab bar, above safe-bottom" },
  { token: "action-height", value: "56px", note: "sticky commit bar" },
  { token: "gutter", value: "16px", note: "screen edge padding" },
  { token: "thumb-reach", value: "62%", note: "lower share of the screen a thumb covers one-handed; commit actions live here" },
];

export const motion = [
  { token: "instant", value: "80ms", curve: "linear", use: "chip select, stamp fill" },
  { token: "fast", value: "160ms", curve: "cubic-bezier(.2,0,0,1)", use: "row press, tab change" },
  { token: "base", value: "240ms", curve: "cubic-bezier(.2,0,0,1)", use: "screen push, sheet open" },
  { token: "slow", value: "420ms", curve: "cubic-bezier(.16,1,.3,1)", use: "reward reveal, stamp celebration" },
];

/* --------------------------------------------------------------------------
   Stylesheet emitter
   -------------------------------------------------------------------------- */

/** Emits the whole system as plain custom properties — what the page offers to copy. */
export function buildTokenCss(): string {
  const line = (name: string, value: string) => `  --eh-${name}: ${value};`;
  const block = (title: string, rows: string[]) => `\n  /* ${title} */\n${rows.join("\n")}`;

  return `/* ==========================================================================
   Every Half — mobile design tokens
   Generated from src/components/tokens.ts

   Brand colours are verbatim from EH_Guideline_Color&Typo.pdf §2.1.
   Ramp steps and product colours are marked in that file with their origin.
   ========================================================================== */

:root {${block(
    "Brand — guideline §2.1, do not alter",
    brand.map((s) => line(s.step, s.value))
  )}
${block("Purple ramp — 300 and 500 are brand", purple.map((s) => line(`purple-${s.step}`, s.value)))}
${block("Neutral ramp — 100, 300 and 900 are brand", neutral.map((s) => line(`neutral-${s.step}`, s.value)))}
${block("Loyalty gold — product layer, earned value only", gold.map((s) => line(`gold-${s.step}`, s.value)))}
${block("Loyalty surfaces — product layer", loyaltySurfaces.map((s) => line(s.step, s.value)))}
${block(
    "Status",
    semantic.flatMap((s) => [
      line(`${s.name}-light`, s.light),
      line(s.name, s.default),
      line(`${s.name}-dark`, s.dark),
    ])
  )}
${block("Surface", surfaces.map((s) => line(s.step, s.value)))}
${block("Text", textColors.map((s) => line(s.step, s.value)))}
${block("Border", borders.map((s) => line(s.step, s.value)))}

  /* Tint surfaces, and the text that sits on them. These are surface tokens
     by role rather than palette entries, which is why dark mode moves them
     while the base hues stay put. */
  --eh-tint-brand: #F5F3FC;
  --eh-on-brand-tint: #64509F;
  --eh-on-success: #07694A;
  --eh-on-warning: #7A2E0E;
  --eh-on-danger: #912018;
  --eh-on-gold: #8A6D2B;

  /* Typography — Bricolage Grotesque on the wdth axis, mono accent for eyebrows */
  --eh-font-display: ${fontStacks.display};
  --eh-font-body: ${fontStacks.body};
  --eh-font-mono: ${fontStacks.mono};
${typeScale
    .map(
      (t) =>
        `  --eh-text-${t.token}: ${t.weight} ${t.size}px/${t.line}px var(--eh-font-${t.family});\n` +
        `  --eh-tracking-${t.token}: ${t.tracking};\n` +
        `  --eh-width-${t.token}: ${t.width};`
    )
    .join("\n")}
${block("Spacing — 4px base rhythm", spacing.map((s) => line(`space-${s.token}`, `${s.value}px`)))}
${block("Radius", radii.map((r) => line(`radius-${r.token}`, r.value)))}
${block("Elevation", shadows.map((s) => line(`shadow-${s.token}`, s.value)))}
${block("Mobile foundation", mobile.map((m) => line(m.token, m.value)))}
${block("Motion", motion.map((m) => line(`motion-${m.token}`, `${m.value} ${m.curve}`)))}
}

/* --------------------------------------------------------------------------
   Base — how a screen is set up
   -------------------------------------------------------------------------- */

.eh-screen {
  background: var(--eh-bg-canvas);
  color: var(--eh-text-primary);
  font: var(--eh-text-body);
  letter-spacing: var(--eh-tracking-body);
  font-variation-settings: "wdth" 100;
  padding-inline: var(--eh-gutter);
}

/* Display voice: the condensed width axis is what makes this look like Every
   Half rather than any other grotesque. */
.eh-display {
  font: var(--eh-text-display);
  letter-spacing: var(--eh-tracking-display);
  font-variation-settings: "wdth" var(--eh-width-display), "opsz" 40;
}

/* Every interactive element clears the minimum target, even when it looks small. */
.eh-tappable {
  min-height: var(--eh-tap-min);
  min-width: var(--eh-tap-min);
}

/* The one committed action on a screen. Ink, never purple. */
.eh-action-bar {
  position: sticky;
  bottom: 0;
  height: var(--eh-action-height);
  border-radius: var(--eh-radius-md);
  background: var(--eh-bg-inverse);
  color: var(--eh-text-inverse);
  box-shadow: var(--eh-shadow-sticky);
  margin-bottom: var(--eh-safe-bottom);
}

:focus-visible {
  outline: 2px solid var(--eh-border-focus);
  outline-offset: 2px;
}

/* --------------------------------------------------------------------------
   Dark — a token swap, not a second design.

   The surface, text, border and tint families move. The base hues never do:
   EH Purple is still #7864BE and the loyalty gold is still gold, so earned
   value reads the same in both skies. What changes is what those hues are
   painted *on*, and the text painted on top of them — a tint that stays light
   in dark mode is a bright island with unreadable text on it.
   -------------------------------------------------------------------------- */

[data-eh-theme="dark"] {
  --eh-bg-canvas: #191519;
  --eh-bg-surface: #231F24;
  --eh-bg-subtle: #2C272D;
  --eh-bg-inverse: #F1F1F2;
  --eh-bg-scrim: rgba(0, 0, 0, 0.6);

  --eh-text-primary: #F1F1F2;
  --eh-text-secondary: #A5A2A6;
  --eh-text-disabled: #6B676C;
  --eh-text-inverse: #231F20;
  --eh-text-brand: #C8BEF0;

  --eh-border-default: #353036;
  --eh-border-strong: #4A444B;
  --eh-border-focus: #C8BEF0;

  --eh-shadow-card: 0 1px 2px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.32);
  --eh-shadow-sticky: 0 -2px 12px rgba(0, 0, 0, 0.44);

  /* Tints darken and the text on them lightens, so a status message stays a
     quiet band rather than becoming the brightest thing on the screen. */
  --eh-tint-brand: #2A2338;
  --eh-success-light: #10291F;
  --eh-warning-light: #2E2413;
  --eh-danger-light: #2F1A18;
  --eh-gold-50: #2B2415;

  --eh-on-brand-tint: #C8BEF0;
  --eh-on-success: #6EE7B7;
  --eh-on-warning: #FBD38D;
  --eh-on-danger: #FCA5A5;
  --eh-on-gold: #E0C67E;
}

/* The sticky commit bar inverts with the theme: it must always be the highest
   contrast thing on the screen, which in dark means light-on-dark reversed. */
[data-eh-theme="dark"] .eh-action-bar {
  background: var(--eh-bg-inverse);
  color: var(--eh-text-inverse);
}
`;
}
