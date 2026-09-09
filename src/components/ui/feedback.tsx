"use client";

/** What the system says happened, and what it asks before something is lost. */

import type { ReactNode } from "react";

import { Button } from "./primitives";
import styles from "./ui.module.css";

export type AlertTone = "info" | "success" | "warning" | "danger";

const alertClass: Record<AlertTone, string> = {
  info: styles.alertInfo,
  success: styles.alertSuccess,
  warning: styles.alertWarning,
  danger: styles.alertDanger,
};

/** The status name, in the product's language. This is the non-colour signal. */
const alertLabel: Record<AlertTone, string> = {
  info: "Thông tin",
  success: "Thành công",
  warning: "Lưu ý",
  danger: "Lỗi",
};

/**
 * Inline, and next to the thing it is about.
 *
 * A rule and a word rather than a filled pill: the mono status label carries
 * the meaning, so colour is a marker rather than the message, and the body text
 * stays ink instead of being tinted to match the tone. Naming the status also
 * survives colour blindness better than an icon does — a glyph still has to be
 * interpreted, a word does not.
 */
export function InlineAlert({
  tone = "info",
  title,
  children,
}: {
  tone?: AlertTone;
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className={alertClass[tone]} role={tone === "danger" ? "alert" : undefined}>
      <span className={styles.alertLabel}>{title ?? alertLabel[tone]}</span>
      <span>{children}</span>
    </div>
  );
}

/** Transient, and always about something that already finished. */
export function Toast({
  children,
  action,
  onAction,
}: {
  children: ReactNode;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className={styles.toast} role="status">
      <span>{children}</span>
      {action ? (
        <button type="button" className={styles.toastAction} onClick={onAction}>
          {action}
        </button>
      ) : null}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  children,
  action,
  onAction,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className={styles.emptyState}>
      <span className={styles.emptyIcon}>{icon}</span>
      <h3 className={styles.emptyTitle}>{title}</h3>
      <p className={styles.emptyCopy}>{children}</p>
      {action ? (
        <div style={{ marginTop: 8 }}>
          <Button variant="secondary" small onClick={onAction}>
            {action}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

/** Shaped like the content it stands in for, so the layout does not jump. */
export function Skeleton({
  width = "100%",
  height = 14,
  radius,
}: {
  width?: number | string;
  height?: number;
  radius?: number;
}) {
  return (
    <span
      className={styles.skeleton}
      style={{ width, height, borderRadius: radius }}
      aria-hidden
    />
  );
}

/**
 * The mobile modal. Rises from the bottom edge and keeps a grabber, because a
 * sheet with no visible way out traps people who arrived at it by accident.
 */
export function Sheet({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.sheetScrim}>
      <div className={styles.sheet} role="dialog" aria-label={title}>
        <span className={styles.sheetGrabber} />
        <h3 className={styles.sheetTitle}>{title}</h3>
        {children}
      </div>
    </div>
  );
}

/** Reserved for destructive confirmation — the only thing worth blocking for. */
export function ConfirmDialog({
  title,
  children,
  confirm,
  cancel = "Huỷ",
}: {
  title: string;
  children: ReactNode;
  confirm: string;
  cancel?: string;
}) {
  return (
    <div className={styles.dialogScrim}>
      <div className={styles.dialog} role="alertdialog" aria-label={title}>
        <h3 className={styles.sheetTitle}>{title}</h3>
        <p className={styles.emptyCopy} style={{ margin: "0 auto 16px" }}>
          {children}
        </p>
        <div style={{ display: "grid", gap: 8 }}>
          <Button variant="danger" block>
            {confirm}
          </Button>
          <Button variant="tertiary" block>
            {cancel}
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Points progress toward a reward reads better as a ring than as a bar. */
export function ProgressRing({
  value,
  max,
  size = 72,
}: {
  value: number;
  max: number;
  size?: number;
}) {
  const stroke = 7;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(1, value / max));

  return (
    <svg
      className={styles.progressRing}
      width={size}
      height={size}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--eh-bg-subtle)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--eh-eh-purple)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - pct)}
      />
    </svg>
  );
}
