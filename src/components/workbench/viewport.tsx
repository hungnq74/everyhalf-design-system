"use client";

import type { ReactNode } from "react";

import styles from "./workbench.module.css";

/**
 * A phone-width presentation container.
 *
 * Some components only mean anything against a screen edge: a sheet has to rise
 * from the bottom, a tab bar has to sit against it, a dialog has to be centred
 * over a scrim. Those specimens are shown in here, at the 390pt width the system
 * designs for.
 *
 * Deliberately not drawn as a phone. A device frame at documentation height is
 * a squat box with a notch on it, which is a worse lie than an honest panel —
 * and the bezel is not what is being documented.
 */
export function Viewport({
  children,
  height = 380,
  label,
}: {
  children: ReactNode;
  height?: number;
  label?: string;
}) {
  return (
    <div>
      <div className={styles.viewport} style={{ height }}>
        {children}
      </div>
      {label ? <p className={styles.viewportCaption}>{label}</p> : null}
    </div>
  );
}
