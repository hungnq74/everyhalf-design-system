"use client";

import { Canvas, Hero } from "../workbench/chrome";
import { Section } from "../workbench/shell";
import { ActionsSection } from "./sections-actions";
import { CommerceSection } from "./sections-commerce";
import { DisplaySection } from "./sections-display";
import { FeedbackSection } from "./sections-feedback";
import { FormsSection } from "./sections-forms";
import { LoyaltySection } from "./sections-loyalty";
import { NavigationSection } from "./sections-navigation";

const SECTIONS = [
  {
    id: "actions",
    index: "01",
    title: "Actions",
    copy: "Ink means commitment. Purple is brand and navigation, and never sits on an action that costs something.",
    Body: ActionsSection,
  },
  {
    id: "forms",
    index: "02",
    title: "Input",
    copy: "Every control clears 44pt. Where the visible control is smaller, the row around it is the target.",
    Body: FormsSection,
  },
  {
    id: "navigation",
    index: "03",
    title: "Navigation",
    copy: "The row is the workhorse: settings, vouchers, stores and payment are one component with different content.",
    Body: NavigationSection,
  },
  {
    id: "feedback",
    index: "04",
    title: "Feedback",
    copy: "Tone is never the only signal — every variant carries an icon too.",
    Body: FeedbackSection,
  },
  {
    id: "loyalty",
    index: "05",
    title: "Loyalty",
    copy: "Earned value. Gold appears only here and never on an action, so gold always means something you have.",
    Body: LoyaltySection,
  },
  {
    id: "commerce",
    index: "06",
    title: "Commerce",
    copy: "Money is always shown with its reason. Every reduction is named, never silent.",
    Body: CommerceSection,
  },
  {
    id: "display",
    index: "07",
    title: "Data display",
    copy: "Identity, counts, state and history. An itemised history is a record; a bare count is only a number.",
    Body: DisplaySection,
  },
] as const;

export function ComponentsSurface() {
  return (
    <Canvas>
      <Hero
        eyebrow="EVERY HALF · COMPONENTS"
        title="Every specimen here is the component, not a picture of it."
        lead={
          <>
            Every specimen imports from <code>src/components/ui</code> and names the export it comes
            from. Several can be operated, so the documentation cannot go stale.
          </>
        }
      />

      <nav
        aria-label="Sections"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          marginTop: -16,
          font: "var(--eh-text-caption)",
        }}
      >
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            style={{ color: "var(--eh-text-brand)", textDecoration: "none", fontWeight: 600 }}
          >
            {section.index} · {section.title}
          </a>
        ))}
      </nav>

      {SECTIONS.map(({ id, index, title, copy, Body }) => (
        <Section key={id} id={id} index={index} title={title} copy={copy}>
          <Body />
        </Section>
      ))}
    </Canvas>
  );
}
