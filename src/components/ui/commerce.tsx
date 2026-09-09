"use client";

/**
 * Store, menu, cart and bill.
 *
 * Money is always shown with its reason: the cart bar keeps the pre-discount
 * total visible, and the bill names each reduction rather than silently
 * shrinking the number.
 */

import type { ReactNode } from "react";
import { ChevronRight, MapPin, Plus } from "lucide-react";

import { MediaPlaceholder } from "./placeholder";
import styles from "./ui.module.css";

export type Product = {
  id: string;
  name: string;
  price: string;
  /** Which drawn placeholder stands in for the photo. No photography ships here. */
  art: number;
};

export function Price({ value, was }: { value: string; was?: string }) {
  return (
    <span className={styles.price}>
      {value}
      {was ? <span className={styles.priceWas}>{was}</span> : null}
    </span>
  );
}

export function ProductGrid({ children }: { children: ReactNode }) {
  return <div className={styles.productGrid}>{children}</div>;
}

export function ProductTile({
  product,
  onOpen,
  onAdd,
}: {
  product: Product;
  onOpen?: () => void;
  onAdd?: () => void;
}) {
  return (
    <div className={styles.productTile}>
      <button
        type="button"
        className={styles.productMedia}
        onClick={onOpen}
        aria-label={product.name}
        style={{ border: 0, padding: 0, cursor: "pointer", display: "block", width: "100%" }}
      >
        <MediaPlaceholder className={styles.productImage} variant={product.art} />
      </button>
      <div style={{ position: "relative" }}>
        {/* On the image edge, bottom-right: where the thumb already is. */}
        <button
          type="button"
          className={styles.productAdd}
          onClick={onAdd}
          aria-label={`Thêm ${product.name}`}
        >
          <Plus size={17} />
        </button>
      </div>
      <div className={styles.productInfo}>
        <p className={styles.productName}>{product.name}</p>
        <Price value={product.price} />
      </div>
    </div>
  );
}

export function ProductRow({ product, onAdd }: { product: Product; onAdd?: () => void }) {
  return (
    <div className={styles.productRow}>
      <MediaPlaceholder className={styles.productThumb} variant={product.art} />
      <span className={styles.rowBody}>
        <span className={styles.rowTitle} style={{ whiteSpace: "normal" }}>
          {product.name}
        </span>
        <Price value={product.price} />
      </span>
      <button
        type="button"
        className={styles.productAdd}
        style={{ position: "static" }}
        onClick={onAdd}
        aria-label={`Thêm ${product.name}`}
      >
        <Plus size={17} />
      </button>
    </div>
  );
}

/** The store is chosen before the menu, because price and stock depend on it. */
export function StoreBar({
  name,
  address,
  onChange,
}: {
  name: string;
  address: string;
  onChange?: () => void;
}) {
  return (
    <div className={styles.storeBar}>
      <MapPin size={16} />
      <span className={styles.storeName}>{name}</span>
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
        {address}
      </span>
      <button type="button" className={styles.storeChange} onClick={onChange}>
        Đổi
      </button>
    </div>
  );
}

export function CartBar({
  count,
  total,
  original,
  onClick,
}: {
  count: number;
  total: string;
  original?: string;
  onClick?: () => void;
}) {
  return (
    <button type="button" className={styles.cartBar} onClick={onClick}>
      <span>
        {count} món · {total}
        {original ? <span className={styles.cartBarStrike}>{original}</span> : null}
      </span>
      <ChevronRight size={18} />
    </button>
  );
}

export function Bill({
  rows,
  total,
  saving,
}: {
  rows: { label: string; value: string; discount?: boolean }[];
  total: string;
  saving?: string;
}) {
  return (
    <div className={styles.bill}>
      {rows.map((row) => (
        <div
          className={row.discount ? `${styles.billRow} ${styles.billDiscount}` : styles.billRow}
          key={row.label}
        >
          <span>{row.label}</span>
          <b>{row.value}</b>
        </div>
      ))}
      <div className={styles.billRule} />
      <div className={styles.billTotal}>
        <span>Tổng cộng</span>
        <b>{total}</b>
      </div>
      {saving ? <div className={styles.billSaving}>{saving}</div> : null}
    </div>
  );
}

export function PaymentRow({
  name,
  note,
  onChange,
}: {
  name: string;
  note: string;
  onChange?: () => void;
}) {
  return (
    <div className={styles.payMethod}>
      <span className={styles.payLogo}>momo</span>
      <span style={{ flex: 1 }}>
        <span className={styles.rowTitle}>{name}</span>
        <span className={styles.rowSub}>{note}</span>
      </span>
      <button type="button" className={styles.storeChange} onClick={onChange}>
        Đổi
      </button>
    </div>
  );
}
