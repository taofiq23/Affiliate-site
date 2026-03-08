import type { Metadata } from "next";
import { CapsuleCollection } from "@/components/capsule-collection";
import { CapsuleMediaBreaks } from "@/components/capsule-media-breaks";
import { CapsulePageFlow } from "@/components/capsule-page-flow";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Affiliate SEO Framework Home",
  description: "Homepage for a reusable affiliate framework covering reviews, comparisons, best lists, guides, and category pages.",
  pathname: "/"
});

export default function HomePage() {
  return (
    <>
      <CapsulePageFlow />
      <CapsuleCollection />
      <CapsuleMediaBreaks />
    </>
  );
}
