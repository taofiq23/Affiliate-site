import { NextResponse } from "next/server";
import { getReview } from "@/lib/review-store";
import { siteConfig } from "@/lib/content-store";

type Props = {
  params: {
    slug: string;
    offer: string;
  };
};

export function GET(request: Request, { params }: Props) {
  const review = getReview(params.slug);
  const offer = review?.retailerOffers.find((item) => item.offerSlug === params.offer);

  if (!offer) {
    return NextResponse.redirect(new URL("/", siteConfig.url));
  }

  return NextResponse.redirect(offer.affiliateUrl, {
    headers: {
      "X-Robots-Tag": "noindex, nofollow"
    }
  });
}
