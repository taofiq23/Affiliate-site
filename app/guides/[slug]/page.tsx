import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GuidePageTemplate } from "@/components/templates/guide-page-template";
import { buildMetadata } from "@/lib/seo";
import { getGuide, guides } from "@/lib/site-data";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return guides.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getGuide(params.slug);

  if (!page) {
    return {};
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    pathname: `/guides/${page.slug}`
  });
}

export default function GuidePage({ params }: Props) {
  const page = getGuide(params.slug);

  if (!page) {
    notFound();
  }

  return <GuidePageTemplate page={page} />;
}
