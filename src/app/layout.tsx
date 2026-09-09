import type { Metadata } from "next";
import { Bricolage_Grotesque, Chivo_Mono } from "next/font/google";

import { buildTokenCss } from "@/components/tokens";
import { TopBar } from "@/components/workbench/chrome";
import { DesignSystemTheme } from "@/components/workbench/theme-context";
import styles from "@/components/workbench/workbench.module.css";
import "./globals.css";

// Every Half's primary typeface. The brand guideline (§3.3) sets display type at
// width 88 and body at width 100, so the `wdth` axis has to ship — without it
// the condensed headline voice that identifies the brand is simply absent.
// `vietnamese` is required: the product's UI copy is Vietnamese.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "vietnamese"],
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
  display: "swap",
});

// Stand-in for Pitch Sans (the guideline's secondary typeface, §3.2), which is a
// commercial Klim face. Chivo Mono is the closest Vietnamese-capable grotesque
// monospace on Google Fonts. Labelled as a substitute wherever it is documented.
const chivoMono = Chivo_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-eh-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Every Half · Mobile Design System",
  description:
    "The loyalty and pickup design system behind the Every Half mobile app — tokens and components.",
};

/**
 * The token layer is injected from `buildTokenCss()` — the same function whose
 * output the Foundation page offers to copy. The site does not describe a
 * stylesheet, it ships the one it documents, so the two cannot drift apart.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-eh-theme="light" className={`${bricolage.variable} ${chivoMono.variable}`}>
      <body>
        <style dangerouslySetInnerHTML={{ __html: buildTokenCss() }} />
        <DesignSystemTheme>
          <div className={styles.shell}>
            <TopBar />
            {children}
          </div>
        </DesignSystemTheme>
      </body>
    </html>
  );
}
