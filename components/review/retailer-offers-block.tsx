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
          <p className="text-xs uppercase tracking-[0.16em] text-black/45">Retailer Offers</p>
          <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">Current Buying Options</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/68">
            Prices and offer terms change over time. Use these retailer links to confirm the latest pricing, stock, and shipping details before you buy.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((offer) => (
            <article key={offer.offerSlug} className="border border-black/10 bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-black/45">{offer.offerLabel}</p>
                  <h3 className="mt-3 font-display text-2xl leading-[0.98]">{offer.retailerName}</h3>
                </div>
                <p className="text-sm font-medium">{offer.priceText}</p>
              </div>

              {offer.stockNote ? <p className="mt-4 text-sm leading-relaxed text-black/68">Stock: {offer.stockNote}</p> : null}
              {offer.shippingNote ? <p className="mt-2 text-sm leading-relaxed text-black/68">Shipping: {offer.shippingNote}</p> : null}
              <p className="mt-2 text-sm leading-relaxed text-black/60">Last checked: {review.lastChecked}</p>

              <a
                href={offer.affiliateUrl}
                rel={affiliateLinkRel}
                target="_blank"
                className="mt-5 inline-flex w-full items-center justify-center border border-black bg-black px-4 py-3 text-center text-[10px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-black/90"
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
