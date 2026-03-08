import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/templates/category-page-template";
import { buildMetadata } from "@/lib/seo";
import { categories, getCategory } from "@/lib/site-data";

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

  return buildMetadata({
    title: page.title,
    description: page.description,
    pathname: `/category/${page.slug}`
  });
}

export default function CategoryPage({ params }: Props) {
  const page = getCategory(params.slug);

  if (!page) {
    notFound();
  }

  return <CategoryPageTemplate page={page} />;
}
