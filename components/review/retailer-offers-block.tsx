import { affiliateLinkRel, sortRetailerOffers } from "@/lib/review-utils";
import type { ReviewRecord } from "@/lib/review-data";

type Props = {
  review: ReviewRecord;
};

export function RetailerOffersBlock({ review }: Props) {
  const offers = sortRetailerOffers(review.retailerOffers);

  return (
    <section className="border-t border-black/10 bg-white">
      <div className="mx-auto w-full max-w-[1580px] px-4 py-12 md:px-8 md:py-14 xl:px-12">
        <div className="mb-8 border-b border-black/10 pb-6">
          <p className="text-xs uppercase tracking-[0.16em] text-black/60">Retailer Offers</p>
          <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">Current Buying Options</h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-black/78">
            Prices and offer terms change over time. Use these retailer links to confirm the latest pricing, stock, and shipping details before you buy.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((offer) => (
            <article key={offer.offerSlug} className="border border-black/10 bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-black/60">{offer.offerLabel}</p>
                  <h3 className="mt-3 font-display text-2xl leading-[0.98]">{offer.retailerName}</h3>
                </div>
                <p className="text-sm font-medium">{offer.priceText}</p>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#1f6f43]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#1f6f43]" aria-hidden="true" />
                Usually in stock
              </div>
              {offer.stockNote ? <p className="mt-2 text-[15px] leading-7 text-black/78">{offer.stockNote}</p> : null}
              {offer.shippingNote ? <p className="mt-2 text-[15px] leading-7 text-black/78">Shipping: {offer.shippingNote}</p> : null}
              <p className="mt-2 text-sm leading-relaxed text-black/66">Last checked: {review.lastChecked}</p>

              <a
                href={offer.affiliateUrl}
                rel={affiliateLinkRel}
                target="_blank"
                className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center border border-accent bg-accent px-4 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-secondary transition-colors hover:brightness-95"
              >
                {offer.ctaLabel}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
