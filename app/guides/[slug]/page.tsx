import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GuidePageTemplate } from "@/components/templates/guide-page-template";
import { resolveProductImageUrl } from "@/lib/generated-content-normalizers";
import { buildMetadata } from "@/lib/seo";
import { getGuide, getProducts, guides } from "@/lib/content-store";

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

  const leadProduct = getProducts(page.relatedReviews)[0];

  return buildMetadata({
    title: `${page.title} | Buying Guide`,
    description: page.description,
    pathname: `/guides/${page.slug}`,
    imagePath: leadProduct ? resolveProductImageUrl(leadProduct) : undefined,
    keywords: [page.title, `${page.title} guide`, "home appliance buying guide", "product buying advice"]
  });
}

export default function GuidePage({ params }: Props) {
  const page = getGuide(params.slug);

  if (!page) {
    notFound();
  }

  return <GuidePageTemplate page={page} />;
}
