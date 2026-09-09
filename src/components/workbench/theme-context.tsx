"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type ThemeValue = { dark: boolean; toggle: () => void };

const ThemeContext = createContext<ThemeValue>({ dark: false, toggle: () => {} });

/**
 * Light/dark for the workbench. Deliberately not persisted and not tied to the
 * OS preference: this is a documentation control for comparing two token sets.
 *
 * The attribute goes on <html> rather than on a wrapper element so that <body>
 * is inside the scope too — the dark token block has to reach the page
 * background, or the area behind the shell stays white on overscroll.
 */
export function DesignSystemTheme({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const toggle = useCallback(() => setDark((value) => !value), []);
  const value = useMemo(() => ({ dark, toggle }), [dark, toggle]);

  useEffect(() => {
    document.documentElement.dataset.ehTheme = dark ? "dark" : "light";
  }, [dark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useDesignSystemTheme() {
  return useContext(ThemeContext);
}
