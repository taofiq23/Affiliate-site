import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BestListPageTemplate } from "@/components/templates/best-list-page-template";
import { resolveProductImageUrl } from "@/lib/generated-content-normalizers";
import { buildMetadata } from "@/lib/seo";
import { bestLists, getBestList, getProducts } from "@/lib/content-store";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return bestLists.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getBestList(params.slug);

  if (!page) {
    return {};
  }

  const leadProduct = getProducts(page.productSlugs)[0];

  return buildMetadata({
    title: `${page.title} | Top Rated Picks`,
    description: page.description,
    pathname: `/best/${page.slug}`,
    imagePath: leadProduct ? resolveProductImageUrl(leadProduct) : undefined,
    keywords: [page.title, `${page.title} reviews`, `${page.title} shortlist`, "top rated home products"]
  });
}

export default function BestPage({ params }: Props) {
  const page = getBestList(params.slug);

  if (!page) {
    notFound();
  }

  return <BestListPageTemplate page={page} />;
}
