"use client";

/**
 * The parts that carry earned value.
 *
 * Gold appears only in this module and never on an action, so a customer can
 * tell at a glance whether a gold thing is something they have or something
 * they are being asked to do.
 */

import type { ReactNode } from "react";
import { Copy, Crown, Gift, QrCode, RefreshCw } from "lucide-react";

import { StatusPill } from "./common";
import styles from "./ui.module.css";

/**
 * The stamp board. The final slot is drawn as a dashed coupon rather than an
 * eleventh stamp, so the goal is legible before it is reached.
 */
export function StampBoard({
  earned,
  total = 10,
  tone = "purple",
  wide,
}: {
  earned: number;
  total?: number;
  tone?: "purple" | "gold";
  wide?: boolean;
}) {
  return (
    <div
      className={wide ? styles.stampGridWide : styles.stampGrid}
      role="img"
      aria-label={`${earned} trên ${total} tem`}
    >
      {Array.from({ length: total }).map((_, index) => {
        if (index === total - 1) {
          return (
            <span className={styles.stampReward} key={index}>
              <Gift size={16} />
            </span>
          );
        }
        if (index < earned) {
          return (
            <span
              className={tone === "gold" ? styles.stampGoldFilled : styles.stampFilled}
              key={index}
            />
          );
        }
        return <span className={styles.stampEmpty} key={index} />;
      })}
    </div>
  );
}

export function Progress({
  value,
  max,
  tone = "purple",
}: {
  value: number;
  max: number;
  tone?: "purple" | "gold";
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      className={styles.progressTrack}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <span
        className={tone === "gold" ? styles.progressFillGold : styles.progressFill}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function TierBadge({ children }: { children: ReactNode }) {
  return (
    <span className={styles.tierBadge}>
      <Crown size={13} />
      {children}
    </span>
  );
}

/**
 * The dark header at the top of a loyalty screen. `headline` is whatever
 * deserves display size there — a points balance on the rewards tab, the
 * member's name on the home tab.
 */
export function LoyaltyHeader({
  eyebrow,
  headline,
  trailing,
  warm,
}: {
  eyebrow: string;
  headline: string;
  trailing?: ReactNode;
  warm?: boolean;
}) {
  return (
    <header className={warm ? styles.loyaltyWarm : styles.loyaltyHeader}>
      <p className={styles.loyaltyEyebrow}>{eyebrow}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <p className={styles.loyaltyPoints}>{headline}</p>
        <span style={{ marginLeft: "auto" }}>{trailing}</span>
      </div>
    </header>
  );
}

/**
 * A voucher. The perforation is not decoration — it is the fastest available
 * signal that this is a detachable benefit rather than a notification.
 */
export function VoucherTicket({
  title,
  kind,
  remaining,
  code,
  onCopy,
}: {
  title: string;
  kind: string;
  remaining: string;
  code: string;
  onCopy?: () => void;
}) {
  return (
    <div className={styles.ticket}>
      <div className={styles.ticketHero}>
        <StatusPill tone="gold">{remaining}</StatusPill>
        <h3 className={styles.ticketTitle}>{title}</h3>
        <p className={styles.ticketKind}>{kind}</p>
      </div>
      <div className={styles.ticketPerf} aria-hidden />
      <div className={styles.ticketBody}>
        <Barcode value={code} />
        <div className={styles.ticketCode}>{code}</div>
        <button type="button" className={styles.copyHint} onClick={onCopy}>
          <Copy size={13} /> Nhấn để sao chép
        </button>
      </div>
    </div>
  );
}

/**
 * A specimen barcode, drawn deterministically from the code itself rather than
 * randomly: the same voucher always renders the same bars, so it never
 * mismatches between the server render and the client.
 */
export function Barcode({ value }: { value: string }) {
  const bars = Array.from({ length: 44 }, (_, index) => {
    const code = value.charCodeAt(index % value.length);
    return ((code * (index + 7)) % 5) + 1;
  });

  return (
    <div className={styles.barcode} aria-hidden>
      {bars.map((weight, index) => (
        <span
          className={styles.barcodeBar}
          key={index}
          style={{ width: weight, opacity: weight % 2 ? 1 : 0.18 }}
        />
      ))}
    </div>
  );
}

/**
 * Eligibility, expiry and store scope travel with the voucher — a benefit whose
 * limits are one screen away is a benefit that fails at the counter.
 *
 * Set as a spec table: a mono label against its value, hairline between. The
 * same shape the brand guideline uses for its own type specimens, and it reads
 * as a contract rather than as three decorated cards.
 */
export function FactList({ children }: { children: ReactNode }) {
  return <dl className={styles.factList}>{children}</dl>;
}

export function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.factRow}>
      <dt className={styles.factLabel}>{label}</dt>
      <dd className={styles.factValue}>{value}</dd>
    </div>
  );
}

/** A product bought with points rather than money — the cost is the badge. */
export function RewardCard({ name, cost, note }: { name: string; cost: string; note: string }) {
  return (
    <article className={styles.rewardCard}>
      <div className={styles.rewardMedia}>
        {note}
        <span className={styles.rewardCost}>{cost}</span>
      </div>
      <p className={styles.rewardName}>{name}</p>
    </article>
  );
}

/**
 * The in-store earning pass. The fallback code is not a fallback in the sense
 * of an edge case — counters are busy and scanners fail, so it is given equal
 * billing rather than hidden behind a link.
 */
export function QrPass({
  code,
  countdown,
  onRefresh,
}: {
  code: string;
  countdown: string;
  onRefresh?: () => void;
}) {
  return (
    <div className={styles.qrPass}>
      <QrCode size={132} strokeWidth={1.3} />
      <div className={styles.qrFallback}>
        <span className={styles.qrFallbackLabel}>Mã dự phòng</span>
        <span className={styles.qrFallbackCode} aria-live="polite">
          {code}
        </span>
      </div>
      <button type="button" className={styles.refreshButton} onClick={onRefresh}>
        <RefreshCw size={14} /> Làm mới · {countdown}
      </button>
    </div>
  );
}
