"use client";

/** Surfaces that carry content: identity, counts, history and campaign. */

import type { ReactNode } from "react";

import { StatusPill, type StatusTone } from "./common";
import { MediaPlaceholder } from "./placeholder";
import styles from "./ui.module.css";

export function Avatar({ initials, ring }: { initials: string; ring?: boolean }) {
  return <span className={ring ? styles.avatarRing : styles.avatar}>{initials}</span>;
}

export function CountBadge({ children }: { children: ReactNode }) {
  return <span className={styles.countBadge}>{children}</span>;
}

/**
 * The three numbers a member checks first. Kept as one group because they only
 * make sense compared with each other — points alone say nothing about whether
 * a free coffee is close.
 */
export function StatGroup({
  stats,
}: {
  stats: { value: string; label: string; tone?: "brand" | "gold" | "success" }[];
}) {
  const colour = {
    brand: "var(--eh-text-brand)",
    gold: "var(--eh-on-gold)",
    success: "var(--eh-on-success)",
  };

  return (
    <div className={styles.statGroup}>
      {stats.map((stat) => (
        <span className={styles.statCell} key={stat.label}>
          <span
            className={styles.statValue}
            style={{ color: stat.tone ? colour[stat.tone] : undefined }}
          >
            {stat.value}
          </span>
          <span className={styles.statLabel}>{stat.label}</span>
        </span>
      ))}
    </div>
  );
}

/** One past order: code, contents, money and state in a single glance. */
export function OrderCard({
  code,
  item,
  date,
  total,
  status,
  tone,
  store,
  onReorder,
}: {
  code: string;
  item: string;
  date: string;
  total: string;
  status: string;
  tone: StatusTone;
  store: string;
  onReorder?: () => void;
}) {
  return (
    <article className={styles.orderCard}>
      <div className={styles.orderTop}>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span className={styles.orderCode}>{code}</span>
          <span className={styles.orderMeta}>{item}</span>
          <span className={styles.orderMeta}>{date}</span>
        </span>
        <span style={{ display: "grid", justifyItems: "end", gap: 6 }}>
          <StatusPill tone={tone}>{status}</StatusPill>
          <b style={{ font: "var(--eh-text-label)", fontWeight: 700 }}>{total}</b>
        </span>
      </div>
      <div className={styles.orderFoot}>
        <span style={{ flex: 1 }}>Pickup tại {store}</span>
        <button
          type="button"
          style={{
            border: 0,
            background: "none",
            font: "var(--eh-text-caption)",
            fontWeight: 600,
            color: "var(--eh-text-brand)",
            cursor: "pointer",
          }}
          onClick={onReorder}
        >
          Đặt lại
        </button>
      </div>
    </article>
  );
}

/** Whether a store is open, and how far away, before anything else about it. */
export function StoreCard({
  name,
  distance,
  open,
  variant = 0,
}: {
  name: string;
  distance: string;
  open: boolean;
  variant?: number;
}) {
  return (
    <article className={styles.storeCard}>
      <MediaPlaceholder className={styles.storePhoto} variant={variant} />
      <div className={styles.storeCardMeta}>
        <span style={{ flex: 1 }}>
          <span className={styles.orderCode}>{name}</span>
          <span className={styles.orderMeta}>{distance}</span>
        </span>
        <StatusPill tone={open ? "success" : "neutral"}>
          {open ? "Đang mở" : "Đã đóng"}
        </StatusPill>
      </div>
    </article>
  );
}

export function CampaignBanner({ title, note }: { title: string; note: string }) {
  return (
    <div className={styles.banner}>
      <p className={styles.bannerTitle}>{title}</p>
      <p className={styles.bannerNote}>{note}</p>
    </div>
  );
}
