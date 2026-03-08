import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ComparisonPageTemplate } from "@/components/templates/comparison-page-template";
import { buildMetadata } from "@/lib/seo";
import { comparisons, getComparison } from "@/lib/site-data";

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

  return buildMetadata({
    title: page.title,
    description: page.description,
    pathname: `/compare/${page.slug}`
  });
}

export default function ComparePage({ params }: Props) {
  const page = getComparison(params.slug);

  if (!page) {
    notFound();
  }

  return <ComparisonPageTemplate page={page} />;
}
