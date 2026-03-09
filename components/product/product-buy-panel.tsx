"use client";

import { affiliateLinkRel, sortRetailerOffers } from "@/lib/review-utils";
import type { ReviewRecord } from "@/lib/review-data";

type Props = {
  review: ReviewRecord;
  shopperRating?: number;
  shopperReviewCount?: number;
};

export function ProductBuyPanel({ review, shopperRating, shopperReviewCount }: Props) {
  const sortedOffers = sortRetailerOffers(review.retailerOffers);
  const primaryOffer = sortedOffers[0];
  const secondaryOffer = sortedOffers[1];
  const ratingPercent = Math.max(0, Math.min(100, (review.editorScore / 5) * 100));
  const reviewCountText = shopperReviewCount ? new Intl.NumberFormat("en-US").format(shopperReviewCount) : undefined;

  return (
    <div className="border-t border-black/10 bg-white">
      <div className="mx-auto w-full max-w-[1580px] px-4 py-8 md:px-8 md:py-10 xl:px-12">
        <div className="border border-black/10 bg-white p-5 md:p-6 lg:p-7">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] lg:gap-8">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="border border-black/15 bg-[#faf9f5] px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-black/60">
                  Editor Review
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#1f6f43]/15 bg-[#f4f8f5] px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-[#1f6f43]">
                  <span className="h-2 w-2 rounded-full bg-[#1f6f43]" aria-hidden="true" />
                  Usually in stock
                </span>
              </div>

              <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-black/55">
                {review.category} / {review.brand}
              </p>
              <h1 className="mt-3 font-display text-[2.2rem] leading-[0.94] sm:text-[2.7rem] md:text-[3.25rem]">
                {review.name}
              </h1>

              <div className="mt-5 flex flex-wrap items-end gap-x-8 gap-y-5 border-t border-black/10 pt-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">Price</p>
                  <p className="mt-2 text-[2rem] leading-none sm:text-[2.2rem]">{review.priceText}</p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">Editor Score</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <div className="relative inline-block text-[18px] leading-none tracking-[0.18em]">
                      <div className="text-[#d1d5db]">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                      <div className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap text-[#f59e0b]" style={{ width: `${ratingPercent}%` }}>
                        &#9733;&#9733;&#9733;&#9733;&#9733;
                      </div>
                    </div>
                    <p className="text-[18px] leading-none">{review.editorScore.toFixed(1)} / 5</p>
                  </div>
                </div>

                {shopperRating ? (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">Shopper Rating</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-black/72">
                      <span className="inline-flex items-center gap-[1px] text-[#f59e0b]" aria-hidden="true">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span key={`shopper-star-${index}`} className="text-[13px] leading-none">
                            &#9733;
                          </span>
                        ))}
                      </span>
                      <span className="font-semibold text-black">{shopperRating.toFixed(1)}/5</span>
                      {reviewCountText ? <span>{reviewCountText} reviews</span> : null}
                    </div>
                  </div>
                ) : null}
              </div>

              <p className="mt-5 max-w-4xl text-[15px] leading-7 text-black/76">{review.quickVerdict}</p>
              <p className="mt-3 text-[12px] uppercase tracking-[0.16em] text-black/52">Last checked: {review.lastChecked}</p>
            </div>

            <div className="border-t border-black/10 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">Buy Now</p>
              <div className="mt-4 grid gap-3">
                {primaryOffer ? (
                  <a
                    href={primaryOffer.affiliateUrl}
                    rel={affiliateLinkRel}
                    target="_blank"
                    className="border border-black bg-black px-4 py-4 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-[#1a1a1a]"
                  >
                    {primaryOffer.ctaLabel} | {primaryOffer.priceText}
                  </a>
                ) : null}
                {secondaryOffer ? (
                  <a
                    href={secondaryOffer.affiliateUrl}
                    rel={affiliateLinkRel}
                    target="_blank"
                    className="border border-black px-4 py-4 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-black transition-colors duration-200 hover:bg-black hover:text-white"
                  >
                    {secondaryOffer.ctaLabel} | {secondaryOffer.priceText}
                  </a>
                ) : null}
              </div>

              <div className="mt-5 space-y-3 border-t border-black/10 pt-5 text-sm leading-6 text-black/72">
                <p>
                  <span className="font-medium text-black">Availability:</span> Retailer stock and shipping timing can change quickly.
                </p>
                <p>{review.disclosureText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
