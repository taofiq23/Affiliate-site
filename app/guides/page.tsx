import type { Metadata } from "next";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { buildMetadata } from "@/lib/seo";
import { bestLists, categories, guides } from "@/lib/content-store";

const primaryGuideSlugs = [
  "how-to-choose-a-coffee-maker",
  "how-to-choose-an-air-fryer",
  "how-to-choose-a-blender"
];

const featuredBestSlugs = [
  "top-picks",
  "best-coffee-gear",
  "best-coffee-makers-for-home",
  "best-kitchen-appliances",
  "best-air-fryers-for-home",
  "best-blenders-for-smoothies"
];

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Buying Guides: Coffee Makers, Air Fryers, and Blenders",
    description:
      "Browse buyer-focused guides for coffee makers, air fryers, and blenders. Start with the category guide, then move into best lists and reviews.",
    pathname: "/guides"
  });
}

export default function GuidesIndexPage() {
  const guideMap = Object.fromEntries(guides.map((guide) => [guide.slug, guide]));
  const primaryGuides = primaryGuideSlugs.map((slug) => guideMap[slug]).filter(Boolean);
  const fallbackPrimary = primaryGuides.length > 0 ? primaryGuides : guides.slice(0, 3);
  const secondaryGuides = guides.filter((guide) => !primaryGuideSlugs.includes(guide.slug));
  const bestListMap = Object.fromEntries(bestLists.map((page) => [page.slug, page]));
  const featuredBestLists = featuredBestSlugs.map((slug) => bestListMap[slug]).filter(Boolean);
  const fallbackBestLists = featuredBestLists.length > 0 ? featuredBestLists : bestLists.slice(0, 4);

  return (
    <section className="min-h-screen bg-white py-16 md:py-24">
      <div className="container-luxe">
        <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides" }]} />
        <div className="mb-12 text-center md:mb-16">
          <p className="kicker text-xs tracking-[0.3em] text-black/70">BUYING GUIDES</p>
          <h1 className="mt-5 font-display text-[2.5rem] leading-[0.94] sm:text-5xl md:mt-6 md:text-7xl">
            Start With The Right Category Guide
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-[15px] leading-7 text-black/74 md:mt-8 md:text-base md:leading-8">
            Use these guides to narrow the category first, then move into the best lists and review pages. The goal is a
            cleaner decision path, not a bigger list of random products.
          </p>
        </div>
      </div>

      <InternalLinkGrid
        title="Core Buying Guides"
        kicker="Start Here"
        items={fallbackPrimary.map((guide) => ({
          title: guide.title,
          description: guide.description,
          href: `/guides/${guide.slug}`,
          label: "Guide"
        }))}
      />

      <InternalLinkGrid
        title="More Guides"
        kicker="Explore"
        items={secondaryGuides.map((guide) => ({
          title: guide.title,
          description: guide.description,
          href: `/guides/${guide.slug}`,
          label: "Guide"
        }))}
      />

      <InternalLinkGrid
        title="Best Lists"
        kicker="Top Picks"
        items={fallbackBestLists.map((page) => ({
          title: page.title,
          description: page.description,
          href: `/best/${page.slug}`,
          label: "Best"
        }))}
      />

      <InternalLinkGrid
        title="Categories"
        kicker="Browse"
        items={categories.map((category) => ({
          title: category.title,
          description: category.description,
          href: `/category/${category.slug}`,
          label: "Category"
        }))}
      />
    </section>
  );
}
