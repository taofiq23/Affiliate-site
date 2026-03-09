"use client";

import Image from "next/image";
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
  const ratingPercent = Math.max(0, Math.min(100, (review.editorScore / 5) * 100));

  return (
    <div className="h-fit border border-black/10 bg-white p-4 sm:p-5 md:sticky md:top-24 md:p-7">
      <div className="relative overflow-hidden border border-black/10 bg-[#f1eee7]">
        <div className={`absolute inset-0 bg-gradient-to-br ${review.tone}`} />
        {imageUrl ? (
          <div className="absolute inset-y-0 right-0 w-[48%]">
            <Image
              src={imageUrl}
              alt={review.name}
              fill
              sizes="(min-width: 1536px) 220px, (min-width: 1280px) 26vw, 40vw"
              quality={100}
              className="object-contain object-right-bottom p-4 md:p-5"
            />
          </div>
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.9),rgba(255,255,255,0.76)_45%,rgba(255,255,255,0.18)_80%)]" />
        <div className="relative flex min-h-[190px] flex-col justify-between p-4 sm:min-h-[220px] sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="border border-black/15 bg-white/70 px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-black/60">
                Editor Review
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#1f6f43]/15 bg-[#f4f8f5] px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-[#1f6f43]">
                <span className="h-2 w-2 rounded-full bg-[#1f6f43]" aria-hidden="true" />
                Usually in stock
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-black/55">{review.brand}</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-black/55">{review.category}</p>
            <h2 className="mt-3 font-display text-[28px] leading-[0.96] sm:text-[34px] md:text-[42px]">{review.name}</h2>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mt-5 text-[9px] uppercase tracking-[0.25em] text-black/45">Buyer Snapshot</p>
          <p className="mt-3 max-w-[18rem] text-[14px] leading-6 text-black/70 sm:text-sm sm:leading-relaxed">{review.quickVerdict}</p>
        </div>
        <div className="text-right">
          <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-black/55">Editor Score</p>
          <div className="mt-2 inline-flex flex-col items-end gap-2">
            <div className="relative inline-block text-[18px] leading-none tracking-[0.18em]">
              <div className="text-[#d1d5db]">★★★★★</div>
              <div className="absolute inset-y-0 left-0 overflow-hidden text-[#f59e0b]" style={{ width: `${ratingPercent}%` }}>
                ★★★★★
              </div>
            </div>
            <p className="text-[22px] leading-none sm:text-[24px]">{review.editorScore.toFixed(1)} / 5</p>
          </div>
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
        <p className="text-[10px] uppercase tracking-[0.22em] text-black/55">How We Evaluated It</p>
        <p className="mt-3 text-sm leading-relaxed text-black/70">{review.reviewMethodology}</p>
      </div>

      <div className="mt-6 grid gap-2.5">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-[#1f6f43]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#1f6f43]" aria-hidden="true" />
          Usually in stock
        </div>
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

      <div className="mt-6 border-t border-black/10 pt-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">Affiliate Disclosure</p>
        <p className="mt-3 text-sm leading-relaxed text-black/75">{review.disclosureText}</p>
      </div>
    </div>
  );
}
