import Link from "next/link";
import { ProductBuyPanel } from "@/components/product/product-buy-panel";
import { ProductMediaGallery } from "@/components/product/product-media-gallery";
import { JsonLd } from "@/components/json-ld";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { FeatureSnapshotTable } from "@/components/review/feature-snapshot-table";
import { RetailerOffersBlock } from "@/components/review/retailer-offers-block";
import { resolveReviewImageUrl } from "@/lib/generated-content-normalizers";
import { buildBreadcrumbSchema, buildFaqSchema, buildProductSchema, buildReviewSchema } from "@/lib/seo";
import type { ReviewRecord } from "@/lib/review-data";
import { sortRetailerOffers } from "@/lib/review-utils";

type Props = {
  review: ReviewRecord;
};

export function ReviewPageTemplate({ review }: Props) {
  const sortedOffers = sortRetailerOffers(review.retailerOffers);
  const lowerPageOffer = sortedOffers[0];
  const imageUrl = resolveReviewImageUrl(review);
  const galleryImages = review.imageGallery && review.imageGallery.length > 0 ? review.imageGallery : [imageUrl];
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: review.category, href: `/category/${review.category.toLowerCase()}` },
    { label: review.name }
  ];

  return (
    <section className="min-h-screen bg-white">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: review.category, path: `/category/${review.category.toLowerCase()}` },
          { name: review.name, path: `/reviews/${review.slug}` }
        ])}
      />
      <JsonLd data={buildProductSchema(review)} />
      <JsonLd data={buildReviewSchema(review)} />
      <JsonLd data={buildFaqSchema(review.faq)} />

      <div className="mx-auto w-full max-w-[1580px] px-4 pt-5 md:px-8 xl:px-12">
        <SiteBreadcrumbs items={breadcrumbItems} />
      </div>

      <div className="mx-auto w-full max-w-[1580px] px-4 pt-2 md:px-8 xl:px-12">
        <h1 className="font-display text-4xl leading-[0.95] md:text-5xl">{review.name} Review</h1>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-black/70">{review.summary}</p>
      </div>

      <div className="mt-8">
        <ProductMediaGallery tone={review.tone} title={review.name} images={galleryImages} />
      </div>

      <div className="mx-auto w-full max-w-[1580px] px-4 py-10 md:px-8 md:py-12 xl:px-12">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_440px] 2xl:grid-cols-[minmax(0,1fr)_460px]">
          <div>
            <section className="border-t border-black/10 pt-8">
              <p className="text-sm uppercase tracking-[0.2em] text-black/80">Quick Verdict</p>
              <div className="mt-5 border border-black/10 bg-[#faf9f5] p-5">
                <p className="text-sm leading-relaxed text-black/72">{review.quickVerdict}</p>
              </div>
            </section>

            <section className="mt-10 border-t border-black/10 pt-8">
              <p className="text-sm uppercase tracking-[0.2em] text-black/80">Decision Box</p>
              <div className="mt-5 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2">
                <article className="bg-[#faf9f5] p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-black/45">Best For</p>
                  <p className="mt-3 text-sm leading-relaxed text-black/72">{review.bestFor}</p>
                </article>
                <article className="bg-white p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-black/45">Avoid If</p>
                  <p className="mt-3 text-sm leading-relaxed text-black/72">{review.avoidIf}</p>
                </article>
                <article className="bg-white p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-black/45">Why Buy</p>
                  <p className="mt-3 text-sm leading-relaxed text-black/72">{review.whyBuy}</p>
                </article>
                <article className="bg-[#faf9f5] p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-black/45">Main Drawback</p>
                  <p className="mt-3 text-sm leading-relaxed text-black/72">{review.mainDrawback}</p>
                </article>
              </div>
            </section>

            <FeatureSnapshotTable review={review} />

            <section className="mt-10 grid gap-6 border-t border-black/10 pt-8 md:grid-cols-2">
              <article>
                <h2 className="text-sm uppercase tracking-[0.2em] text-black/80">Pros</h2>
                <div className="mt-4 border border-black/10 bg-[#faf9f5] p-5">
                  <ul className="space-y-3 text-sm leading-relaxed text-black/72">
                    {review.pros.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-black/55" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
              <article>
                <h2 className="text-sm uppercase tracking-[0.2em] text-black/80">Cons</h2>
                <div className="mt-4 border border-black/10 bg-white p-5">
                  <ul className="space-y-3 text-sm leading-relaxed text-black/72">
                    {review.cons.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-black/55" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </section>

            <section className="mt-10 border-t border-black/10 pt-8">
              <p className="text-sm uppercase tracking-[0.2em] text-black/80">Performance / Real Use Assessment</p>
              <div className="mt-5 max-w-4xl border border-black/10 bg-white p-5">
                <p className="text-sm leading-relaxed text-black/72">{review.performanceText}</p>
              </div>
            </section>

            <section className="mt-10 grid gap-6 border-t border-black/10 pt-8 md:grid-cols-2">
              <article className="border border-black/10 bg-[#faf9f5] p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-black/45">Who Should Buy</p>
                <p className="mt-3 text-sm leading-relaxed text-black/72">{review.whoShouldBuy}</p>
              </article>
              <article className="border border-black/10 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-black/45">Who Should Skip</p>
                <p className="mt-3 text-sm leading-relaxed text-black/72">{review.whoShouldSkip}</p>
              </article>
            </section>
          </div>

          <ProductBuyPanel review={review} />
        </div>
      </div>

      <RetailerOffersBlock review={review} />

      {review.alternatives.length > 0 ? (
        <div className="border-t border-black/10 bg-white">
          <div className="mx-auto w-full max-w-[1580px] px-4 py-12 md:px-8 md:py-14 xl:px-12">
            <div className="mb-8 border-b border-black/10 pb-6">
              <p className="text-xs uppercase tracking-[0.16em] text-black/45">Alternatives</p>
              <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">Other Picks To Consider</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {review.alternatives.map((item) => (
                <article key={`${item.label}-${item.title}`} className="border border-black/10 bg-white p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-black/50">{item.label}</p>
                  <h3 className="mt-3 font-display text-2xl leading-[0.98]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/68">{item.summary}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4">
                    <p className="text-sm font-medium">{item.priceText}</p>
                    <Link href={item.reviewUrl} className="text-xs uppercase tracking-[0.14em] text-black/70 transition-colors hover:text-black">
                      Read Review
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {lowerPageOffer ? (
        <section className="border-t border-black/10 bg-[#f8f6f1]">
          <div className="mx-auto w-full max-w-[1580px] px-4 py-10 md:px-8 md:py-12 xl:px-12">
            <div className="flex flex-col gap-5 border border-black/10 bg-white p-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.16em] text-black/45">Ready To Check The Current Offer?</p>
                <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">{review.name} Buying Shortcut</h2>
                <p className="mt-3 text-sm leading-relaxed text-black/68">
                  If this review matches what you need, use the current lead offer to confirm the latest price, stock, and shipping details.
                </p>
              </div>
              <a
                href={lowerPageOffer.affiliateUrl}
                rel="nofollow sponsored noopener noreferrer"
                target="_blank"
                className="inline-flex min-h-[52px] items-center justify-center border border-black bg-black px-6 text-center text-[10px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-black/90"
              >
                {lowerPageOffer.ctaLabel} | {lowerPageOffer.priceText}
              </a>
            </div>
          </div>
        </section>
      ) : null}

      {review.comparisons.length > 0 ? (
        <div className="border-t border-black/10 bg-[#f8f6f1]">
          <div className="mx-auto w-full max-w-[1580px] px-4 py-12 md:px-8 md:py-14 xl:px-12">
            <div className="mb-8 border-b border-black/10 pb-6">
              <p className="text-xs uppercase tracking-[0.16em] text-black/45">Compare Before You Buy</p>
              <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">Comparison Links</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {review.comparisons.map((item) => (
                <article key={item.url} className="border border-black/10 bg-white p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-black/45">Comparison</p>
                  <h3 className="mt-3 font-display text-2xl leading-[0.98]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/68">{item.summary}</p>
                  <Link href={item.url} className="mt-5 inline-block text-xs uppercase tracking-[0.14em] text-black/70 transition-colors hover:text-black">
                    Open Comparison
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="border-t border-black/10 bg-white">
        <div className="mx-auto w-full max-w-[1580px] px-4 py-12 md:px-8 md:py-14 xl:px-12">
          <div className="mb-8 border-b border-black/10 pb-6">
            <p className="text-xs uppercase tracking-[0.16em] text-black/45">FAQ</p>
            <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">Common Questions</h2>
          </div>

          <div className="border-t border-black/10">
            {review.faq.map((item) => (
              <details key={item.question} className="border-b border-black/10 py-4">
                <summary className="cursor-pointer text-xs uppercase tracking-[0.2em] text-secondary/75">{item.question}</summary>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-secondary/80">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <InternalLinkGrid
        title="Related Guides"
        kicker="Guide Paths"
        items={review.relatedGuides.map((guide) => ({
          title: guide.title,
          description: guide.summary,
          href: guide.url,
          label: "Guide"
        }))}
      />

      <InternalLinkGrid
        title="Related Reviews"
        kicker="Review Paths"
        items={review.relatedReviews.map((item) => ({
          title: item.title,
          description: item.summary,
          href: item.url,
          label: "Review"
        }))}
      />
    </section>
  );
}
