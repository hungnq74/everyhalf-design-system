"use client";

/** Small shared parts that several other modules build on. */

import type { CSSProperties, ReactNode } from "react";
import { Check, ChevronRight, Plus } from "lucide-react";

import styles from "./ui.module.css";

/* ===== Status pill ======================================================= */

export type StatusTone = "success" | "warning" | "danger" | "neutral" | "gold";

/** State as a word, not only as a colour. */
export function StatusPill({
  children,
  tone = "neutral",
  icon,
}: {
  children: ReactNode;
  tone?: StatusTone;
  icon?: ReactNode;
}) {
  const className = {
    success: styles.statusSuccess,
    warning: styles.statusWarning,
    danger: styles.statusDanger,
    neutral: styles.statusNeutral,
    gold: styles.statusGold,
  }[tone];

  return (
    <span className={className}>
      {icon}
      {children}
    </span>
  );
}

/* ===== Brand mark ======================================================== */

/** The EH lockup as a tile. The mark itself — not a glyph in a tinted box. */
export function MarkTile() {
  return (
    <span className={styles.markTile} aria-hidden>
      {"EV\nHA"}
    </span>
  );
}

/* ===== Card and rows ===================================================== */

export function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className={styles.card} style={style}>
      {children}
    </div>
  );
}

/**
 * The workhorse row. Deliberately type-led: no leading icon tile, because a
 * tinted square with a glyph in it says nothing the title does not already say,
 * and it is the same square every other app uses.
 */
export function Row({
  title,
  sub,
  subTone = "muted",
  trailing,
  onClick,
}: {
  title: ReactNode;
  sub?: ReactNode;
  subTone?: "muted" | "brand";
  trailing?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button type="button" className={styles.row} onClick={onClick}>
      <span className={styles.rowBody}>
        <span className={styles.rowTitle}>{title}</span>
        {sub ? (
          <span className={subTone === "brand" ? styles.rowSubBrand : styles.rowSub}>{sub}</span>
        ) : null}
      </span>
      {trailing ?? <ChevronRight className={styles.chevron} size={18} />}
    </button>
  );
}

export function SectionHead({
  icon,
  title,
  action,
  onAction,
}: {
  icon?: ReactNode;
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className={styles.sectionHead}>
      {icon}
      <h3 className={styles.sectionTitle}>{title}</h3>
      {action ? (
        <button type="button" className={styles.sectionLink} onClick={onAction}>
          {action} <ChevronRight size={14} />
        </button>
      ) : null}
    </div>
  );
}

/* ===== Timeline ========================================================== */

export function Timeline({ children }: { children: ReactNode }) {
  return <div className={styles.timeline}>{children}</div>;
}

/** Each entry says what earned the stamp, not only that one arrived. */
export function TimelineItem({
  state = "earned",
  title,
  sub,
  meta,
  amount,
}: {
  state?: "earned" | "done" | "pending";
  title: ReactNode;
  sub?: ReactNode;
  meta?: ReactNode;
  amount?: string;
}) {
  const markClass = {
    earned: styles.timelineMark,
    done: styles.timelineMarkDone,
    pending: styles.timelineMarkPending,
  }[state];

  return (
    <div className={styles.timelineItem}>
      <span className={markClass}>
        {state === "done" ? <Check size={15} /> : state === "pending" ? null : <Plus size={15} />}
      </span>
      <span className={styles.rowBody}>
        <span style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          {amount ? <span className={styles.timelineAmount}>{amount}</span> : null}
          <span className={styles.rowTitle} style={{ whiteSpace: "normal" }}>
            {title}
          </span>
        </span>
        {sub ? <span className={styles.rowSub}>{sub}</span> : null}
        {meta ? <span className={styles.rowSub}>{meta}</span> : null}
      </span>
    </div>
  );
}
