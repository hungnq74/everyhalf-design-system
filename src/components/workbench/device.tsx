"use client";

import type { ReactNode } from "react";

import styles from "./workbench.module.css";

/**
 * A phone-sized presentation container.
 *
 * Some components only mean anything inside a screen: a sticky action bar has
 * to sit above a home indicator, a bottom nav has to sit against a bottom edge,
 * a sheet has to rise from somewhere. Those specimens are shown in here so the
 * thing being documented is the component in its real context — 390pt, the
 * width of an iPhone 14/15.
 */
export function Device({
  children,
  height = 620,
  label,
}: {
  children: ReactNode;
  height?: number;
  label?: string;
}) {
  return (
    <div>
      <div className={styles.device} style={{ height }}>
        <div className={styles.deviceScreen}>
          <span className={styles.deviceNotch} aria-hidden />
          <div className={styles.statusBar}>
            <span>15:06</span>
            <span aria-hidden>●●●</span>
          </div>
          {children}
        </div>
      </div>
      {label ? <p className={styles.deviceCaption}>{label}</p> : null}
    </div>
  );
}
