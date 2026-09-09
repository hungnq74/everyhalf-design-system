"use client";

import { useMemo } from "react";

import { CodeBlock } from "../workbench/code-block";
import { Canvas, Hero } from "../workbench/chrome";
import { Group, Section } from "../workbench/shell";
import styles from "../workbench/workbench.module.css";
import {
  borders,
  brand,
  buildTokenCss,
  gold,
  loyaltySurfaces,
  mobile,
  motion,
  neutral,
  purple,
  radii,
  semantic,
  shadows,
  spacing,
  surfaces,
  textColors,
  typeScale,
  type Origin,
  type Swatch,
} from "../tokens";

const originClass: Record<Origin, string> = {
  brand: styles.originBrand,
  derived: styles.originDerived,
  product: styles.originProduct,
};

const originLabel: Record<Origin, string> = {
  brand: "guideline",
  derived: "derived",
  product: "product",
};

function Ramp({ swatches, prefix }: { swatches: Swatch[]; prefix?: string }) {
  return (
    <div className={styles.ramp}>
      {swatches.map((swatch) => (
        <div className={styles.rampStep} key={swatch.step}>
          <span className={styles.rampChip} style={{ background: swatch.value }} />
          <strong>{prefix ? `${prefix}-${swatch.step}` : swatch.step}</strong>
          <code>{swatch.value}</code>
          <span className={originClass[swatch.origin]}>{originLabel[swatch.origin]}</span>
          {swatch.note ? <small>{swatch.note}</small> : null}
        </div>
      ))}
    </div>
  );
}

function TokenRows({ swatches }: { swatches: Swatch[] }) {
  return (
    <div className={styles.tokenList}>
      {swatches.map((token) => (
        <div className={styles.tokenRow} key={token.step}>
          <span className={styles.tokenChip} style={{ background: token.value }} />
          <strong>--eh-{token.step}</strong>
          <code>{token.value}</code>
          <small>{token.note ?? ""}</small>
        </div>
      ))}
    </div>
  );
}

export function FoundationSurface() {
  const css = useMemo(() => buildTokenCss(), []);

  return (
    <Canvas>
      <Hero
        eyebrow="EVERY HALF · FOUNDATION"
        title="Five colours, one width axis, and the rest earned."
        lead={
          <>
            The guideline gives five colours and two typefaces. Everything else is derived or
            product-layer, and says so on its own swatch. The stylesheet at the end is generated
            from <code>tokens.ts</code> — the same one this page renders with.
          </>
        }
      />

      <Section
        id="colour"
        index="01"
        title="Colour"
        copy={
          <>
            Provenance decides who may change what. <b>guideline</b> is fixed by §2.1.{" "}
            <b>derived</b> is a ramp step around a guideline anchor. <b>product</b> is a colour the
            app uses that the guideline never covered.
          </>
        }
      >
        <Group
          title="Brand"
          hint="§2.1 — verbatim"
          note="All five. Light Gray does real work as the chip outline and divider."
        >
          <Ramp swatches={brand} />
        </Group>

        <Group
          title="Purple ramp"
          hint="purple-50 → purple-900"
          note="EH Purple at 500, Light Purple at 300. Text uses 700: EH Purple on white is 3.9:1, which fails AA."
        >
          <Ramp swatches={purple} prefix="purple" />
        </Group>

        <Group
          title="Neutral ramp"
          hint="neutral-0 → neutral-900"
          note="Anchored on the guideline neutrals: Soft White 100, Light Gray 300, Pure Black 900."
        >
          <Ramp swatches={neutral} prefix="neutral" />
        </Group>

        <Group
          title="Loyalty gold"
          hint="product layer"
          note="Not in the guideline, but the app uses it for stamps and tier. Reserved for earned value — never an action."
        >
          <Ramp swatches={gold} prefix="gold" />
        </Group>

        <Group
          title="Loyalty surfaces"
          hint="product layer"
          note="Near-black plums rather than flat Pure Black, so earned value reads as treasure without a sixth brand colour."
        >
          <Ramp swatches={loyaltySurfaces} />
        </Group>

        <Group title="Status" hint="each ramp carries -light, -default, -dark">
          <div className={styles.semanticGrid}>
            {semantic.map((entry) => (
              <article className={styles.semanticCard} key={entry.name}>
                <div className={styles.semanticHead}>
                  <strong>{entry.name}</strong>
                  <span>{entry.role}</span>
                </div>
                <div className={styles.semanticBar}>
                  <span style={{ background: entry.light }}>light</span>
                  <span style={{ background: entry.default, color: "#fff" }}>base</span>
                  <span style={{ background: entry.dark, color: "#fff" }}>dark</span>
                </div>
                <div className={styles.semanticValues}>
                  <code>{entry.light}</code>
                  <code>{entry.default}</code>
                  <code>{entry.dark}</code>
                </div>
              </article>
            ))}
          </div>
        </Group>

        <Group title="Surface, text and border" hint="the roles the ramps are consumed through">
          <TokenRows swatches={surfaces} />
          <div style={{ height: 12 }} />
          <TokenRows swatches={textColors} />
          <div style={{ height: 12 }} />
          <TokenRows swatches={borders} />
        </Group>
      </Section>

      <Section
        id="type"
        index="02"
        title="Typography"
        copy={
          <>
            The guideline uses two of Bricolage&apos;s axes: width <b>88</b> for display, <b>100</b>{" "}
            for reading (§3.3). Load the font without <code>wdth</code> and that voice disappears.
          </>
        }
      >
        <Group
          title="The width axis"
          hint='font-variation-settings: "wdth"'
          note="Same word, same size, same weight — only the width axis moves. 88 display, 100 body."
        >
          <div className={styles.axisDemo}>
            {[75, 88, 100].map((width) => (
              <div className={styles.axisRow} key={width}>
                <code>wdth {width}</code>
                <span
                  className={styles.axisSample}
                  style={{ fontVariationSettings: `"wdth" ${width}, "opsz" 40` }}
                >
                  Fine Robusta Cư M&apos;Gar
                </span>
              </div>
            ))}
          </div>
        </Group>

        <Group
          title="Scale"
          hint="display → eyebrow"
          note="§3.3 is print-scale. The axis settings and ±0.025em tracking carry over; the sizes do not."
        >
          <div>
            {typeScale.map((token) => (
              <div className={styles.typeRow} key={token.token}>
                <span className={styles.typeMeta}>
                  <strong>{token.token}</strong>
                  <small>
                    {token.size}/{token.line} · {token.weight} · wdth {token.width}
                  </small>
                  <small>tracking {token.tracking}</small>
                </span>
                <span
                  className={styles.typeSample}
                  style={{
                    fontFamily: `var(--eh-font-${token.family})`,
                    fontSize: token.size,
                    lineHeight: `${token.line}px`,
                    fontWeight: token.weight,
                    letterSpacing: token.tracking,
                    fontVariationSettings: `"wdth" ${token.width}`,
                    textTransform: token.family === "mono" ? "uppercase" : "none",
                  }}
                >
                  {token.sample}
                </span>
              </div>
            ))}
          </div>
        </Group>

        <Group
          title="Secondary typeface"
          hint="Pitch Sans — substituted"
          note={
            <>
              The guideline&apos;s secondary face (§3.2) is <b>Pitch Sans</b>, a commercial Klim
              release. It is rendered here in <b>Chivo Mono</b>, the closest Vietnamese-capable
              grotesque monospace available freely. Every eyebrow and origin label on this site is
              therefore a stand-in, not the brand face — the real spec is recorded in{" "}
              <code>tokens.ts</code>{" "}so swapping in licensed files is a one-line change.
            </>
          }
        >
          <div className={styles.axisDemo}>
            <div className={styles.axisRow}>
              <code>eyebrow</code>
              <span
                style={{
                  fontFamily: "var(--eh-font-mono)",
                  fontSize: 13,
                  letterSpacing: "-0.025em",
                  textTransform: "uppercase",
                }}
              >
                Vùng trồng: Cư M&apos;gar, Đắk Lắk · Natural
              </span>
            </div>
          </div>
        </Group>
      </Section>

      <Section
        id="space"
        index="03"
        title="Space, shape and elevation"
        copy="A 4px rhythm, six radii, four elevations. Radius carries meaning: a pill is always interactive."
      >
        <Group title="Spacing" hint="--eh-space-*">
          <div className={styles.scaleRow}>
            {spacing.map((step) => (
              <div className={styles.scaleCell} key={step.token}>
                <span className={styles.scaleBox} style={{ width: step.value, height: 40 }} />
                <code>{step.token}</code>
                <code>{step.value}px</code>
              </div>
            ))}
          </div>
        </Group>

        <Group title="Radius" hint="--eh-radius-*">
          <div className={styles.scaleRow}>
            {radii.map((radius) => (
              <div className={styles.scaleCell} key={radius.token}>
                <span
                  className={styles.scaleBox}
                  style={{ width: 76, height: 48, borderRadius: radius.value }}
                />
                <code>{radius.token}</code>
                <code>{radius.value}</code>
                <code style={{ fontSize: 10 }}>{radius.use}</code>
              </div>
            ))}
          </div>
        </Group>

        <Group title="Elevation" hint="--eh-shadow-*">
          <div className={styles.scaleRow}>
            {shadows.map((shadow) => (
              <div className={styles.scaleCell} key={shadow.token}>
                <span
                  style={{
                    display: "block",
                    width: 132,
                    height: 56,
                    borderRadius: 12,
                    background: "var(--eh-bg-surface)",
                    boxShadow: shadow.value,
                  }}
                />
                <code>{shadow.token}</code>
                <code style={{ fontSize: 10 }}>{shadow.use}</code>
              </div>
            ))}
          </div>
        </Group>
      </Section>

      <Section
        id="mobile"
        index="04"
        title="The mobile foundation"
        copy="The tokens a desktop system has no equivalent of, and the ones most often left implicit."
      >
        <Group title="Touch, safe area and reach" hint="--eh-tap-min, --eh-safe-*, --eh-thumb-reach">
          <div className={styles.tokenList}>
            {mobile.map((token) => (
              <div
                className={styles.tokenRow}
                key={token.token}
                style={{ gridTemplateColumns: "200px 220px 1fr" }}
              >
                <strong>--eh-{token.token}</strong>
                <code>{token.value}</code>
                <small>{token.note}</small>
              </div>
            ))}
          </div>
        </Group>

        <Group
          title="Motion"
          hint="--eh-motion-*"
          note="Durations climb with how much the screen changes. The slow curve exists only for the reward reveal."
        >
          <div className={styles.tokenList}>
            {motion.map((token) => (
              <div
                className={styles.tokenRow}
                key={token.token}
                style={{ gridTemplateColumns: "160px 110px 250px 1fr" }}
              >
                <strong>--eh-motion-{token.token}</strong>
                <code>{token.value}</code>
                <code>{token.curve}</code>
                <small>{token.use}</small>
              </div>
            ))}
          </div>
        </Group>
      </Section>

      <Section
        id="stylesheet"
        index="05"
        title="The stylesheet"
        copy={
          <>
            Every token above as plain custom properties, generated from{" "}
            <code>src/components/tokens.ts</code>. This is not a description of the system
            — it is the exact stylesheet this page and the prototype are rendered with, injected by{" "}
            <code>app/layout.tsx</code>{" "}from the same function. The swatches above and this
            block cannot disagree.
          </>
        }
      >
        <CodeBlock code={css} filename="everyhalf-tokens.css" downloadable />
      </Section>
    </Canvas>
  );
}
