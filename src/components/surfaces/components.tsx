"use client";

import { useCallback, useSyncExternalStore } from "react";

import { Canvas, Hero } from "../workbench/chrome";
import { Section } from "../workbench/shell";
import styles from "../workbench/workbench.module.css";
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

const ALL = "all";

/**
 * The location hash, as an external store.
 *
 * `useSyncExternalStore` rather than an effect: the hash is state that lives
 * outside React, and reading it into `useState` on mount would both trip
 * set-state-in-effect and render the wrong section for one frame.
 */
function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function useSectionFromHash() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.hash.slice(1),
    () => "" // server render: fall through to the default below
  );
}

export function ComponentsSurface() {
  const hash = useSectionFromHash();
  const active = hash === ALL || SECTIONS.some((s) => s.id === hash) ? hash : SECTIONS[0].id;
  const showing = active === ALL ? SECTIONS : SECTIONS.filter((s) => s.id === active);

  const select = useCallback((id: string) => {
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <nav className={styles.sectionBar} aria-label="Component sections">
        <div className={styles.sectionBarInner}>
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              className={active === section.id ? styles.sectionTabActive : styles.sectionTab}
              aria-current={active === section.id ? "page" : undefined}
              onClick={() => select(section.id)}
            >
              <span className={styles.sectionTabIndex}>{section.index}</span>
              {section.title}
            </button>
          ))}
          <button
            type="button"
            className={active === ALL ? styles.sectionTabActive : styles.sectionTab}
            aria-current={active === ALL ? "page" : undefined}
            onClick={() => select(ALL)}
          >
            All
          </button>
        </div>
      </nav>

      <Canvas>
        <Hero
          eyebrow="EVERY HALF · COMPONENTS"
          title="Every specimen here is the component, not a picture of it."
          lead={
            <>
              Every specimen imports from <code>src/components/ui</code> and names the export it
              comes from. Several can be operated, so the documentation cannot go stale.
            </>
          }
        />

        {showing.map(({ id, index, title, copy, Body }) => (
          <Section key={id} id={id} index={index} title={title} copy={copy}>
            <Body />
          </Section>
        ))}
      </Canvas>
    </>
  );
}
