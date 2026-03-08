import type { Metadata } from "next";
import { CapsuleCollection } from "@/components/capsule-collection";
import { CapsuleMediaBreaks } from "@/components/capsule-media-breaks";
import { CapsulePageFlow } from "@/components/capsule-page-flow";
import { getCategory, getComparison, getGuide, getProducts, homepageData } from "@/lib/content-store";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Affiliate SEO Framework Home",
  description: "Homepage for a reusable affiliate framework covering reviews, comparisons, best lists, guides, and category pages.",
  pathname: "/"
});

export default function HomePage() {
  const featuredProducts = getProducts([...homepageData.featuredReviewSlugs]);
  const comparisons = homepageData.popularComparisonSlugs
    .map((slug) => getComparison(slug))
    .filter((item): item is NonNullable<ReturnType<typeof getComparison>> => Boolean(item));
  const guides = homepageData.featuredGuideSlugs
    .map((slug) => getGuide(slug))
    .filter((item): item is NonNullable<ReturnType<typeof getGuide>> => Boolean(item));
  const categories = homepageData.categorySlugs
    .map((slug) => getCategory(slug))
    .filter((item): item is NonNullable<ReturnType<typeof getCategory>> => Boolean(item));

  return (
    <>
      <CapsulePageFlow heroKicker={homepageData.heroKicker} heroTitle={homepageData.heroTitle} heroDescription={homepageData.heroDescription} />
      <CapsuleCollection products={featuredProducts} />
      <CapsuleMediaBreaks comparisons={comparisons} guides={guides} categories={categories} />
    </>
  );
}
