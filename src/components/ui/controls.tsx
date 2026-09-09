"use client";

/** The controls that carry ordering decisions: commit bar, chips, stepper, note. */

import type { ReactNode } from "react";
import { Minus, Plus } from "lucide-react";

import styles from "./ui.module.css";

/**
 * The one committed action on a screen. Ink, full width, in the thumb zone —
 * a filled black bar means the tap costs something.
 */
export function ActionBar({
  children,
  amount,
  quiet,
  disabled,
  onClick,
}: {
  children: ReactNode;
  amount?: string;
  quiet?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={quiet ? styles.actionBarQuiet : styles.actionBar}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{children}</span>
      {amount ? (
        <>
          <span aria-hidden className={styles.actionBarRule} />
          <span className={styles.actionBarAmount}>{amount}</span>
        </>
      ) : null}
    </button>
  );
}

export type ChipState = "default" | "selected" | "error" | "disabled";

/**
 * `error` is only ever reached after a failed submit. A required group that
 * opens in red accuses someone of a mistake they have not made yet.
 */
export function Chip({
  children,
  state = "default",
  onClick,
}: {
  children: ReactNode;
  state?: ChipState;
  onClick?: () => void;
}) {
  const className = {
    default: styles.chip,
    selected: styles.chipSelected,
    error: styles.chipError,
    disabled: styles.chipDisabled,
  }[state];

  return (
    <button
      type="button"
      className={className}
      aria-pressed={state === "selected"}
      disabled={state === "disabled"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function ChipRow({ children }: { children: ReactNode }) {
  return <div className={styles.chipRow}>{children}</div>;
}

export function FilterChip({
  children,
  count,
  selected,
  onClick,
}: {
  children: ReactNode;
  count?: number;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={selected ? styles.filterChipSelected : styles.filterChip}
      aria-pressed={selected}
      onClick={onClick}
    >
      {children}
      {count !== undefined ? <span className={styles.filterCount}>{count}</span> : null}
    </button>
  );
}

export function FilterRail({ children }: { children: ReactNode }) {
  return <div className={styles.filterRail}>{children}</div>;
}

/** Add is ink, remove is outlined: the two directions are not equally weighted. */
export function Stepper({
  value,
  min = 1,
  onChange,
}: {
  value: number;
  min?: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className={styles.stepper}>
      <button
        type="button"
        className={styles.stepperButton}
        aria-label="Giảm số lượng"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={18} />
      </button>
      <span className={styles.stepperValue}>{value}</span>
      <button
        type="button"
        className={styles.stepperAdd}
        aria-label="Tăng số lượng"
        onClick={() => onChange(value + 1)}
      >
        <Plus size={18} />
      </button>
    </div>
  );
}

export function Field({
  label,
  optional,
  placeholder,
  error,
}: {
  label: string;
  optional?: string;
  placeholder: string;
  error?: string;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>
        {label} {optional ? <span className={styles.fieldOptional}>{optional}</span> : null}
      </span>
      <textarea
        className={styles.fieldInput}
        rows={2}
        placeholder={placeholder}
        aria-invalid={Boolean(error) || undefined}
      />
      {error ? <span className={styles.fieldError}>{error}</span> : null}
    </label>
  );
}
