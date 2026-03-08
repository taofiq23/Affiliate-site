import type { Metadata } from "next";
import { GuidePageTemplate } from "@/components/templates/guide-page-template";
import { buildMetadata } from "@/lib/seo";
import { getGuide } from "@/lib/content-store";

export const metadata: Metadata = buildMetadata({
  title: "Guide Overview",
  description: "Legacy story alias that renders the main generic buying guide.",
  pathname: "/story"
});

export default function StoryPage() {
  return <GuidePageTemplate page={getGuide("product-buying-guide")!} />;
}
