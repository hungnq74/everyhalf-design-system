import type { Metadata } from "next";

import { FoundationSurface } from "@/components/surfaces/foundation";

export const metadata: Metadata = {
  title: "Foundation · Every Half Mobile System",
  description:
    "Colour with recorded provenance, the Bricolage width axis, spacing, radius, elevation, motion and the mobile-only tokens.",
};

export default function FoundationPage() {
  return <FoundationSurface />;
}
