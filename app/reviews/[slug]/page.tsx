import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ReviewPageTemplate } from "@/components/templates/review-page-template";
import { resolveReviewImageUrl } from "@/lib/generated-content-normalizers";
import { buildMetadata } from "@/lib/seo";
import { getReview, reviews } from "@/lib/review-store";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return reviews.map((review) => ({ slug: review.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const review = getReview(params.slug);

  if (!review) {
    return {};
  }

  return buildMetadata({
    title: `${review.name} Review`,
    description: review.summary,
    pathname: `/reviews/${review.slug}`,
    imagePath: resolveReviewImageUrl(review),
    openGraphType: "article"
  });
}

export default function ReviewPage({ params }: Props) {
  const review = getReview(params.slug);

  if (!review) {
    notFound();
  }

  return <ReviewPageTemplate review={review} />;
}
