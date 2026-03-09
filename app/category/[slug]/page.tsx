import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/templates/category-page-template";
import { resolveProductImageUrl } from "@/lib/generated-content-normalizers";
import { buildMetadata } from "@/lib/seo";
import { categories, getCategory, getProducts } from "@/lib/content-store";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return categories.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getCategory(params.slug);

  if (!page) {
    return {};
  }

  const leadProduct = getProducts(page.productSlugs)[0];

  return buildMetadata({
    title: `${page.title} Reviews, Top Picks & Guides`,
    description: page.description,
    pathname: `/category/${page.slug}`,
    imagePath: leadProduct ? resolveProductImageUrl(leadProduct) : undefined,
    keywords: [page.title, `${page.title} reviews`, `${page.title} buying guide`, `${page.title} top picks`]
  });
}

export default function CategoryPage({ params }: Props) {
  const page = getCategory(params.slug);

  if (!page) {
    notFound();
  }

  return <CategoryPageTemplate page={page} />;
}
