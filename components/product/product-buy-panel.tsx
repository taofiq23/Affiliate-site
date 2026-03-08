"use client";

import { useMemo, useState } from "react";
import type { ProductRecord } from "@/lib/site-data";

type Props = {
  product: ProductRecord;
};

export function ProductBuyPanel({ product }: Props) {
  const [selectedRetailer, setSelectedRetailer] = useState(product.affiliateLinks[0]?.retailerName ?? "");

  const selectedOffer = useMemo(
    () => product.affiliateLinks.find((offer) => offer.retailerName === selectedRetailer) ?? product.affiliateLinks[0],
    [product.affiliateLinks, selectedRetailer]
  );

  return (
    <div className="h-fit border border-black/10 bg-white p-5 md:sticky md:top-24 md:p-7">
      <p className="text-[9px] uppercase tracking-[0.25em] text-black/45">{product.category}</p>
      <h2 className="mt-3 font-display text-[34px] leading-[0.95] md:text-[42px]">{product.name}</h2>
      <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-black/55">Partner Offer Snapshot</p>
      <p className="mt-5 border-t border-black/10 pt-5 text-sm leading-relaxed text-black/70">{product.quickVerdict}</p>

      <div className="mt-6 space-y-4 border-t border-black/10 pt-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">Best For</p>
          <p className="mt-2 text-sm leading-relaxed text-black/75">{product.bestFor}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">Avoid If</p>
          <p className="mt-2 text-sm leading-relaxed text-black/75">{product.avoidIf}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-baseline justify-between">
          <p className="text-[10px] uppercase tracking-[0.22em] text-black/55">Retailer Offers</p>
          <p className="text-[10px] uppercase tracking-[0.12em] text-black/45">Compare partner pricing</p>
        </div>
        <div className="mt-4 grid gap-2">
          {product.affiliateLinks.map((offer) => {
            const active = offer.retailerName === selectedRetailer;
            return (
              <button
                key={offer.retailerName}
                onClick={() => setSelectedRetailer(offer.retailerName)}
                className={`flex items-center justify-between border px-3 py-3 text-[10px] uppercase tracking-[0.16em] transition-colors duration-200 ${
                  active ? "border-black bg-black text-white" : "border-black/20 text-black/80 hover:border-black hover:text-black"
                }`}
              >
                <span>{offer.retailerName}</span>
                <span>{offer.priceText}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between border-t border-black/10 pt-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">Current Offer</p>
          <p className="mt-2 text-[30px] leading-none">{selectedOffer?.priceText ?? product.priceRange}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">Editor Score</p>
          <p className="mt-2 text-lg leading-none">{product.rating.toFixed(1)} / 5</p>
        </div>
      </div>

      <div className="mt-6 grid gap-2.5">
        <a
          href={selectedOffer?.affiliateUrl}
          target="_blank"
          rel="noreferrer sponsored"
          className="border border-black bg-black px-4 py-4 text-center text-[10px] uppercase tracking-[0.22em] text-white transition-colors duration-200 hover:bg-[#1a1a1a]"
        >
          {selectedOffer?.ctaLabel ?? "Check Deal"}
        </a>
        <a
          href={selectedOffer?.affiliateUrl}
          target="_blank"
          rel="noreferrer sponsored"
          className="border border-black px-4 py-4 text-center text-[10px] uppercase tracking-[0.22em] text-black transition-colors duration-200 hover:bg-black hover:text-white"
        >
          Visit Retailer
        </a>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-black/55">
        Affiliate disclosure: this page may earn a commission if a reader clicks through and purchases from a listed retailer.
      </p>
    </div>
  );
}
