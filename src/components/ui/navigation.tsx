"use client";

/** Getting around: app bar, bottom nav, disclosure and separation. */

import { useState, type ReactNode } from "react";
import { ArrowLeft, ChevronDown, ChevronRight, Coffee, Gift, House } from "lucide-react";

import styles from "./ui.module.css";

export function AppBar({
  title,
  onBack,
  action,
}: {
  title: string;
  onBack?: () => void;
  action?: ReactNode;
}) {
  return (
    <header className={styles.appBar}>
      {onBack ? (
        <button type="button" className={styles.iconButton} aria-label="Quay lại" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
      ) : (
        <span className={styles.appBarSlot} />
      )}
      <strong className={styles.appBarTitle}>{title}</strong>
      {action ?? <span className={styles.appBarSlot} />}
    </header>
  );
}

export type NavTab = "home" | "order" | "rewards";

const TABS: { id: NavTab; label: string; icon: ReactNode }[] = [
  { id: "home", label: "Trang chủ", icon: <House size={19} /> },
  { id: "order", label: "Đặt đến lấy", icon: <Coffee size={19} /> },
  { id: "rewards", label: "Phần thưởng", icon: <Gift size={19} /> },
];

/**
 * Three destinations, which is the right number for a thumb. The badge sits on
 * Rewards because that is the only tab whose contents expire.
 */
export function BottomNav({
  active,
  badge,
  onChange,
}: {
  active: NavTab;
  badge?: number;
  onChange?: (next: NavTab) => void;
}) {
  return (
    <nav className={styles.bottomNav} aria-label="Điều hướng chính">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={active === tab.id ? styles.navTabOn : styles.navTab}
          aria-current={active === tab.id ? "page" : undefined}
          onClick={() => onChange?.(tab.id)}
        >
          <span style={{ position: "relative", display: "inline-flex" }}>
            {tab.icon}
            {tab.id === "rewards" && badge ? <span className={styles.navBadge}>{badge}</span> : null}
          </span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export function Divider() {
  return <hr className={styles.divider} />;
}

export function Accordion({
  title,
  children,
  defaultOpen,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(Boolean(defaultOpen));

  return (
    <div className={styles.accordion}>
      <button
        type="button"
        className={styles.accordionHead}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span style={{ flex: 1 }}>{title}</span>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      <div className={styles.accordionBody} hidden={!open}>
        {children}
      </div>
    </div>
  );
}
