"use client";

import { affiliateLinkRel, sortRetailerOffers } from "@/lib/review-utils";
import type { ReviewRecord } from "@/lib/review-data";

type Props = {
  review: ReviewRecord;
};

export function ProductBuyPanel({ review }: Props) {
  const sortedOffers = sortRetailerOffers(review.retailerOffers);
  const primaryOffer = sortedOffers[0];
  const secondaryOffer = sortedOffers[1];
  const keyHighlights = review.keyFeatures.slice(0, 3);

  return (
    <aside className="h-fit border border-black/10 bg-white p-5 md:sticky md:top-24 md:p-7">
      <div className="border-b border-black/10 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-black/55">Review Summary</p>
            <h2 className="mt-3 font-display text-[30px] leading-[0.95] md:text-[36px]">Should You Buy It?</h2>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">Editor Score</p>
            <p className="mt-2 text-[30px] leading-none">
              {review.editorScore.toFixed(1)}
              <span className="text-sm text-black/60"> / 5</span>
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-black/72">{review.quickVerdict}</p>
      </div>

      {primaryOffer ? (
        <div className="mt-5 border border-black/10 bg-[#faf9f5] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-black/55">Top Buying Option</p>
              <h3 className="mt-3 font-display text-2xl leading-[0.98]">{primaryOffer.retailerName}</h3>
              <p className="mt-2 text-sm leading-relaxed text-black/68">{primaryOffer.offerLabel}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">Price</p>
              <p className="mt-2 text-lg leading-none">{primaryOffer.priceText}</p>
            </div>
          </div>

          {primaryOffer.stockNote ? <p className="mt-4 text-sm leading-relaxed text-black/68">Stock: {primaryOffer.stockNote}</p> : null}
          {primaryOffer.shippingNote ? <p className="mt-2 text-sm leading-relaxed text-black/68">Shipping: {primaryOffer.shippingNote}</p> : null}
          <p className="mt-2 text-sm leading-relaxed text-black/60">Last checked: {review.lastChecked}</p>

          <a
            href={primaryOffer.affiliateUrl}
            rel={affiliateLinkRel}
            target="_blank"
            className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center border border-black bg-black px-4 text-center text-[10px] uppercase tracking-[0.22em] text-white transition-colors duration-200 hover:bg-[#1a1a1a]"
          >
            {primaryOffer.ctaLabel} | {primaryOffer.priceText}
          </a>

          {secondaryOffer ? (
            <a
              href={secondaryOffer.affiliateUrl}
              rel={affiliateLinkRel}
              target="_blank"
              className="mt-3 inline-flex min-h-[52px] w-full items-center justify-center border border-black px-4 text-center text-[10px] uppercase tracking-[0.22em] text-black transition-colors duration-200 hover:bg-black hover:text-white"
            >
              {secondaryOffer.ctaLabel} | {secondaryOffer.priceText}
            </a>
          ) : null}

          <p className="mt-4 text-[11px] leading-relaxed text-black/58">{review.disclosureText}</p>
        </div>
      ) : null}

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="border border-black/10 bg-white p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">Price Range</p>
          <p className="mt-3 text-2xl leading-none">{review.priceText}</p>
        </div>
        <div className="border border-black/10 bg-white p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">Best For</p>
          <p className="mt-3 text-sm leading-relaxed text-black/72">{review.bestFor}</p>
        </div>
      </div>

      {keyHighlights.length > 0 ? (
        <div className="mt-5 border-t border-black/10 pt-5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-black/55">Why It Stands Out</p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-black/72">
            {keyHighlights.map((feature) => (
              <li key={feature} className="flex gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-black/55" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-5 border-t border-black/10 pt-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">Main Drawback</p>
            <p className="mt-3 text-sm leading-relaxed text-black/72">{review.mainDrawback}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">How We Evaluated It</p>
            <p className="mt-3 text-sm leading-relaxed text-black/72">{review.reviewMethodology}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
