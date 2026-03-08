"use client";

import { affiliateLinkRel, sortRetailerOffers } from "@/lib/review-utils";
import { resolveReviewImageUrl } from "@/lib/generated-content-normalizers";
import type { ReviewRecord } from "@/lib/review-data";

type Props = {
  review: ReviewRecord;
};

export function ProductBuyPanel({ review }: Props) {
  const sortedOffers = sortRetailerOffers(review.retailerOffers);
  const primaryOffer = sortedOffers[0];
  const secondaryOffer = sortedOffers[1];
  const imageUrl = resolveReviewImageUrl(review);

  return (
    <div className="h-fit border border-black/10 bg-white p-5 md:sticky md:top-24 md:p-7">
      <div className="relative overflow-hidden border border-black/10 bg-[#f1eee7]">
        <div className={`absolute inset-0 bg-gradient-to-br ${review.tone}`} />
        <div
          className="absolute inset-0 bg-center bg-cover opacity-20"
          style={{ backgroundImage: `url(${imageUrl})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.72),rgba(255,255,255,0.12))]" />
        <div className="relative flex min-h-[200px] flex-col justify-between p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="border border-black/15 bg-white/70 px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-black/60">
              Editor Review
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-black/55">{review.brand}</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-black/55">{review.category}</p>
            <h2 className="mt-3 font-display text-[34px] leading-[0.95] md:text-[42px]">{review.name}</h2>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mt-5 text-[9px] uppercase tracking-[0.25em] text-black/45">Buyer Snapshot</p>
          <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-black/70">{review.quickVerdict}</p>
        </div>
        <div className="text-right">
          <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-black/55">Editor Score</p>
          <p className="mt-2 text-[28px] leading-none">{review.editorScore.toFixed(1)} / 5</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 border-t border-black/10 pt-5 sm:grid-cols-2">
        <div className="border border-black/10 bg-[#faf9f5] p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">Price Range</p>
          <p className="mt-3 text-2xl leading-none">{review.priceText}</p>
        </div>
        <div className="border border-black/10 bg-[#faf9f5] p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">Last Checked</p>
          <p className="mt-3 text-sm leading-relaxed text-black/75">{review.lastChecked}</p>
        </div>
      </div>

      <div className="mt-5 border-t border-black/10 pt-5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-black/55">Review Method</p>
        <p className="mt-3 text-sm leading-relaxed text-black/70">{review.reviewMethodology}</p>
      </div>

      <div className="mt-6 grid gap-2.5">
        {primaryOffer ? (
          <a
            href={primaryOffer.affiliateUrl}
            rel={affiliateLinkRel}
            target="_blank"
            className="border border-black bg-black px-4 py-4 text-center text-[10px] uppercase tracking-[0.22em] text-white transition-colors duration-200 hover:bg-[#1a1a1a]"
          >
            {primaryOffer.ctaLabel} | {primaryOffer.priceText}
          </a>
        ) : null}
        {secondaryOffer ? (
          <a
            href={secondaryOffer.affiliateUrl}
            rel={affiliateLinkRel}
            target="_blank"
            className="border border-black px-4 py-4 text-center text-[10px] uppercase tracking-[0.22em] text-black transition-colors duration-200 hover:bg-black hover:text-white"
          >
            {secondaryOffer.ctaLabel} | {secondaryOffer.priceText}
          </a>
        ) : null}
      </div>

      <div className="mt-6 border-t border-black/10 pt-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">Trust Note</p>
        <p className="mt-3 text-sm leading-relaxed text-black/75">{review.disclosureText}</p>
      </div>
    </div>
  );
}
