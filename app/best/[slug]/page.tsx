import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BestListPageTemplate } from "@/components/templates/best-list-page-template";
import { buildMetadata } from "@/lib/seo";
import { bestLists, getBestList } from "@/lib/site-data";

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

  return buildMetadata({
    title: page.title,
    description: page.description,
    pathname: `/best/${page.slug}`
  });
}

export default function BestPage({ params }: Props) {
  const page = getBestList(params.slug);

  if (!page) {
    notFound();
  }

  return <BestListPageTemplate page={page} />;
}
