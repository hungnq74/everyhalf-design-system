"use client";

import type { ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

import styles from "./workbench.module.css";

/** A numbered top-level section, e.g. "01 · Colour". */
export function Section({
  id,
  index,
  title,
  copy,
  children,
}: {
  id: string;
  index: string;
  title: string;
  copy: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.section}>
      <header className={styles.sectionHead}>
        <p className={styles.sectionIndex}>{index}</p>
        <h2>{title}</h2>
        <p className={styles.sectionCopy}>{copy}</p>
      </header>
      {children}
    </section>
  );
}

/** A sub-group inside a section. `hint` carries the token names it documents. */
export function Group({
  title,
  hint,
  note,
  children,
}: {
  title: string;
  hint?: string;
  note?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.group}>
      <div className={styles.groupHead}>
        <h3>{title}</h3>
        {hint ? <code>{hint}</code> : null}
      </div>
      {note ? <p className={styles.groupNote}>{note}</p> : null}
      {children}
    </div>
  );
}

export function SpecGrid({ children }: { children: ReactNode }) {
  return <div className={styles.specGrid}>{children}</div>;
}

/**
 * One live specimen. `source` names the export and file it comes from, so the
 * page always says where a thing is defined rather than only showing it.
 *
 * `stretch` lays the stage out as a column for specimens that need full width
 * (bars, rows, bills) rather than centring them as a cluster.
 */
export function Spec({
  label,
  source,
  note,
  wide,
  stretch,
  children,
}: {
  label: string;
  source?: string;
  note?: ReactNode;
  wide?: boolean;
  stretch?: boolean;
  children: ReactNode;
}) {
  return (
    <article className={wide ? styles.specWide : styles.spec}>
      <div className={stretch ? styles.specStageStretch : styles.specStage}>{children}</div>
      <div className={styles.specFoot}>
        <span className={styles.specLabel}>{label}</span>
        {source ? <code className={styles.specSource}>{source}</code> : null}
      </div>
      {note ? <p className={styles.specNote}>{note}</p> : null}
    </article>
  );
}

/** Copy-to-clipboard button that reports success rather than assuming it. */
export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className={styles.codeButton}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : label}
    </button>
  );
}
