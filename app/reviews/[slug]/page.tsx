import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ReviewPageTemplate } from "@/components/templates/review-page-template";
import { buildMetadata } from "@/lib/seo";
import { getProduct, products } from "@/lib/site-data";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProduct(params.slug);

  if (!product) {
    return {};
  }

  return buildMetadata({
    title: `${product.name} Review`,
    description: product.summary,
    pathname: `/reviews/${product.slug}`
  });
}

export default function ReviewPage({ params }: Props) {
  const product = getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return <ReviewPageTemplate product={product} />;
}
