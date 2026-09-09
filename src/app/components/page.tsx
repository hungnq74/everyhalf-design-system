import type { Metadata } from "next";

import { ComponentsSurface } from "@/components/surfaces/components";

export const metadata: Metadata = {
  title: "Components · Every Half Mobile System",
  description:
    "The live mobile component library — actions, choice, loyalty, commerce and status.",
};

export default function ComponentsPage() {
  return <ComponentsSurface />;
}
