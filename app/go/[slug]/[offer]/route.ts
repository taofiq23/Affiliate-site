import { NextResponse } from "next/server";
import { getReview } from "@/lib/review-store";
import { siteConfig } from "@/lib/content-store";

function isAmazonAssociateUrl(value?: string) {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();

    if (hostname === "amzn.to" || hostname.endsWith(".amzn.to")) {
      return true;
    }

    return hostname.includes("amazon.") && url.searchParams.has("tag");
  } catch {
    return false;
  }
}

type Props = {
  params: {
    slug: string;
    offer: string;
  };
};

export function GET(request: Request, { params }: Props) {
  const review = getReview(params.slug);
  const offer = review?.retailerOffers.find((item) => item.offerSlug === params.offer);

  if (!offer || !isAmazonAssociateUrl(offer.affiliateUrl)) {
    return NextResponse.redirect(new URL("/", siteConfig.url));
  }

  return NextResponse.redirect(offer.affiliateUrl, {
    headers: {
      "X-Robots-Tag": "noindex, nofollow"
    }
  });
}
