# Every Half Mobile Design System

A standalone Next.js site documenting the design system behind the Every Half
loyalty and pickup app. Two surfaces:

| Route | What it is |
| --- | --- |
| `/foundation` | Colour with recorded provenance, the Bricolage width axis, spacing, radius, elevation, motion, the mobile-only tokens — plus the whole system as a copyable and downloadable stylesheet |
| `/components` | The mobile component library: actions, input, navigation, feedback, loyalty, commerce and data display. One section shows at a time via a sticky switcher — `#loyalty`, `#commerce` and so on deep-link, and `#all` shows everything at once |

`/` redirects to the foundation.

This project is deliberately independent of the portfolio it started in. It
shares no code, no fonts and no global styles with it.

## Running it

```bash
npm install
npm run dev
```

## How it is put together

`src/components/tokens.ts` is the single source of truth. The swatches on the
foundation page, the stylesheet offered at the foot of it, and the tokens the
site is actually rendered with all come from `buildTokenCss()` in that file —
injected once in `src/app/layout.tsx`. The page does not describe a stylesheet;
it ships the one it documents, so the two cannot drift apart.

Every token records where it came from, because that decides who may change it:

- **guideline** — verbatim from `docs/EH_Guideline_Color&Typo.pdf` §2.1. Five
  colours, no more. Not ours to change.
- **derived** — ramp steps interpolated around a guideline anchor so the
  interface has the tints and shades it needs.
- **product** — colours the shipping app uses that the guideline never covered:
  the loyalty golds, the dark loyalty surfaces, the campaign orange and the
  status ramps.

`src/components/ui/` is the component library, grouped by the job a component
does rather than by what it looks like. `src/components/surfaces/` documents it,
one `sections-*.tsx` per section. Specimens render the real exports and several
can be operated — the stepper steps, the required chip group can be failed, the
in-store pass rotates — so the documentation cannot quietly go out of date.

There is no prototype and no mock flow. This is a component library to build
from, not a demo of screens.

## Imagery

The project ships no photography. The only asset in `public/` is the Every Half
logo mark (`public/brand/everyhalf-mark.png`, the site icon from everyhalf.vn) —
a brand asset rather than content.

Anywhere a photo would go, `MediaPlaceholder` draws one instead: soft overlapping fields of
colour in inline SVG, built from the same tokens as everything else, so they
theme with light and dark and can never 404.

They are deliberately abstract. A placeholder that draws a cup invites the reader
to judge the drawing; one that is only atmosphere lets them look past it at the
component, which is the thing being documented. Four variants cycle so a grid
never repeats side by side, and a square viewBox with `slice` means one
composition fills a square tile, a 64px thumbnail and a wide banner equally well.

Swapping in real product photography means changing the `MediaPlaceholder` call
sites in `ui/commerce.tsx` and `ui/display.tsx`; nothing else depends on it.

## Typography

Bricolage Grotesque is loaded with the `wdth` axis, because the guideline sets
display type at width 88 and body at width 100 (§3.3). Without that axis the
condensed headline voice that identifies the brand is simply absent.

The guideline's secondary face, **Pitch Sans** (§3.2), is a commercial Klim
release and is not bundled. It is substituted throughout by **Chivo Mono**, the
closest Vietnamese-capable grotesque monospace on Google Fonts, and labelled as a
substitute on the foundation page. The real spec is recorded in `tokens.ts`, so
swapping in licensed files is a one-line change in `src/app/layout.tsx`.

## Language

UI copy is Vietnamese, matching the shipping product. The documentation around it
is English.

## Reference

- `docs/everyhalf-mobile-system.md` — the written system: product rules, app
  shell, component contracts, flows, edge cases.
- `docs/everyhalf-mobile-tokens.json` — platform-neutral tokens in Design Tokens
  Community Group format, for Figma, SwiftUI, Compose or React Native.
- `docs/reference/` — screenshots of the shipping app, kept as reference for
  component behaviour and states. They are reference material only and are not
  served by the site.
