import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ComparisonPageTemplate } from "@/components/templates/comparison-page-template";
import { resolveProductImageUrl } from "@/lib/generated-content-normalizers";
import { buildMetadata } from "@/lib/seo";
import { comparisons, getComparison, getProducts } from "@/lib/content-store";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return comparisons.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getComparison(params.slug);

  if (!page) {
    return {};
  }

  const leadProduct = getProducts(page.productSlugs)[0];

  return buildMetadata({
    title: `${page.title} Comparison`,
    description: page.description,
    pathname: `/compare/${page.slug}`,
    imagePath: leadProduct ? resolveProductImageUrl(leadProduct) : undefined,
    keywords: [page.title, `${page.title} comparison`, `${page.title} review`, "product comparison guide"]
  });
}

export default function ComparePage({ params }: Props) {
  const page = getComparison(params.slug);

  if (!page) {
    notFound();
  }

  return <ComparisonPageTemplate page={page} />;
}
