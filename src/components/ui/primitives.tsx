"use client";

/** Actions, choice and input — the parts every other component is built from. */

import type { ReactNode } from "react";
import { Check, Search } from "lucide-react";

import styles from "./ui.module.css";

/* ===== Button ============================================================ */

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "danger";

/**
 * `primary` is ink and means a commitment — money, a stamp, a redemption.
 * `tertiary` is the only variant allowed to be purple, because it never
 * commits: it navigates or discloses.
 */
export function Button({
  children,
  variant = "primary",
  small,
  block,
  loading,
  disabled,
  icon,
  onClick,
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  small?: boolean;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
}) {
  const base = {
    primary: styles.buttonPrimary,
    secondary: styles.buttonSecondary,
    tertiary: styles.buttonTertiary,
    danger: styles.buttonDanger,
  }[variant];

  return (
    <button
      type="button"
      className={[base, small ? styles.buttonSmall : "", block ? styles.buttonBlock : ""]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={onClick}
    >
      {loading ? <span className={styles.spinner} aria-hidden /> : icon}
      {children}
    </button>
  );
}

export function IconButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button type="button" className={styles.iconButton} aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
}

export function Spinner() {
  return <span className={styles.spinner} role="status" aria-label="Đang tải" />;
}

/* ===== Segmented control ================================================= */

export function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className={styles.segmented} role="tablist">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="tab"
          aria-selected={value === option}
          className={value === option ? styles.segmentOn : styles.segment}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

/* ===== Switch, checkbox, radio =========================================== */

export function Switch({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={checked ? styles.switchOn : styles.switch}
      onClick={() => onChange(!checked)}
    >
      <span className={styles.switchKnob} />
    </button>
  );
}

/** The whole row is the target — a 22px box alone is under the 44pt minimum. */
export function CheckRow({
  checked,
  children,
  kind = "checkbox",
  onChange,
}: {
  checked: boolean;
  children: ReactNode;
  kind?: "checkbox" | "radio";
  onChange: (next: boolean) => void;
}) {
  const box =
    kind === "radio"
      ? checked
        ? styles.radioOn
        : styles.radio
      : checked
        ? styles.checkboxOn
        : styles.checkbox;

  return (
    <button
      type="button"
      role={kind === "radio" ? "radio" : "checkbox"}
      aria-checked={checked}
      className={styles.controlRow}
      onClick={() => onChange(!checked)}
    >
      <span className={box}>{kind === "checkbox" && checked ? <Check size={14} /> : null}</span>
      <span>{children}</span>
    </button>
  );
}

/* ===== Input ============================================================= */

export function TextInput({
  placeholder,
  value,
  invalid,
  onChange,
}: {
  placeholder: string;
  value?: string;
  invalid?: boolean;
  onChange?: (next: string) => void;
}) {
  return (
    <input
      className={invalid ? styles.inputInvalid : styles.input}
      placeholder={placeholder}
      value={value}
      aria-invalid={invalid || undefined}
      onChange={(event) => onChange?.(event.target.value)}
    />
  );
}

export function SearchField({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value?: string;
  onChange?: (next: string) => void;
}) {
  return (
    <div className={styles.search}>
      <Search size={17} />
      <input
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </div>
  );
}

/**
 * A code entry display. The barista types the fallback code from a QR pass, so
 * the cells are monospace and generously sized — this gets read aloud across a
 * counter, often twice.
 */
export function CodeCells({ value, length = 6 }: { value: string; length?: number }) {
  return (
    <div className={styles.otpRow}>
      {Array.from({ length }).map((_, index) => (
        <span
          key={index}
          className={index === value.length ? styles.otpCellActive : styles.otpCell}
        >
          {value[index] ?? ""}
        </span>
      ))}
    </div>
  );
}
