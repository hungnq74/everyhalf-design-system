"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import type { ReactNode } from "react";

import { useDesignSystemTheme } from "./theme-context";
import styles from "./workbench.module.css";

export const SURFACES = [
  { href: "/foundation", label: "Foundation" },
  { href: "/components", label: "Components" },
] as const;

export function TopBar() {
  const pathname = usePathname();
  const { dark, toggle } = useDesignSystemTheme();
  const ref = useRef<HTMLElement>(null);

  /**
   * Publish the bar's own height so anything sticking below it can offset
   * correctly. It wraps to two rows on narrow screens, so a fixed offset would
   * leave a gap at one width and an overlap at another. Writing a CSS property
   * is a DOM write, not React state.
   */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const publish = () =>
      document.documentElement.style.setProperty("--eh-topbar-h", `${el.offsetHeight}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header className={styles.topbar} ref={ref}>
      <div className={styles.topbarInner}>
        <Link className={styles.lockup} href="/foundation">
          <Image
            className={styles.mark}
            src="/brand/everyhalf-mark.png"
            alt=""
            width={80}
            height={80}
            priority
          />
          <span>
            <strong>Every Half</strong>
            <span>Mobile design system</span>
          </span>
        </Link>

        <nav className={styles.topNav} aria-label="Surfaces">
          {SURFACES.map((surface) => (
            <Link
              key={surface.href}
              className={pathname === surface.href ? styles.topLinkActive : styles.topLink}
              href={surface.href}
              aria-current={pathname === surface.href ? "page" : undefined}
            >
              {surface.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={styles.themeToggle}
          aria-pressed={dark}
          title="Light and dark are the same components — only surface, text, border and tint tokens move."
          onClick={toggle}
        >
          {dark ? <Moon size={14} /> : <Sun size={14} />}
          {dark ? "Dark" : "Light"}
        </button>
      </div>
    </header>
  );
}

export function Canvas({ children }: { children: ReactNode }) {
  return (
    <main className={styles.canvas}>
      <div className={styles.inner}>{children}</div>
    </main>
  );
}

export function Hero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: ReactNode;
}) {
  return (
    <header className={styles.hero}>
      <p className={styles.heroEyebrow}>{eyebrow}</p>
      <h1>{title}</h1>
      <p className={styles.heroLead}>{lead}</p>
    </header>
  );
}
