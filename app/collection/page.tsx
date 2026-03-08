import type { Metadata } from "next";
import { BestListPageTemplate } from "@/components/templates/best-list-page-template";
import { buildMetadata } from "@/lib/seo";
import { getBestList } from "@/lib/content-store";

export const metadata: Metadata = buildMetadata({
  title: "Top Picks Collection",
  description: "Legacy collection alias that renders the top picks best-list template.",
  pathname: "/collection"
});

export default function CollectionPage() {
  return <BestListPageTemplate page={getBestList("top-picks")!} />;
}
