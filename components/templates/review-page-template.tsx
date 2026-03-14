import Image from "next/image";
import Link from "next/link";
import { ProductBuyPanel } from "@/components/product/product-buy-panel";
import { ProductMediaGallery } from "@/components/product/product-media-gallery";
import { JsonLd } from "@/components/json-ld";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { TrackedAffiliateLink } from "@/components/tracked-affiliate-link";
import { FeatureSnapshotTable } from "@/components/review/feature-snapshot-table";
import { RetailerOffersBlock } from "@/components/review/retailer-offers-block";
import { getProduct } from "@/lib/content-store";
import { dedupeImageGallery, resolveProductImageUrl, resolveReviewImageUrl } from "@/lib/generated-content-normalizers";
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
  const currentProduct = getProduct(review.slug);
  const galleryImages = dedupeImageGallery([imageUrl, ...(review.imageGallery ?? [])]);
  const compactAlternativeSummary = (summary: string) => {
    const sentences = summary.split(/(?<=[.!?])\s+/).filter(Boolean);
    let result = "";

    for (const sentence of sentences) {
      const candidate = result ? `${result} ${sentence}` : sentence;

      if (candidate.length > 170 && result) {
        break;
      }

      result = candidate;
    }

    if (!result) {
      return summary;
    }

    return result.length < summary.length ? `${result.replace(/[.!?]+$/, "")}.` : result;
  };
  const alternativeCards = review.alternatives.map((item) => {
    const slug = item.reviewUrl.split("/").filter(Boolean).pop() ?? "";
    const relatedProduct = getProduct(slug);

    return {
      ...item,
      imageUrl: relatedProduct ? resolveProductImageUrl(relatedProduct) : undefined,
      tone: relatedProduct?.tone,
      fallbackPriceText: relatedProduct?.priceRange ?? item.priceText,
      rating: relatedProduct?.rating,
      reviewCount: relatedProduct?.reviewCount
    };
  });
  const relatedReviewCards = review.relatedReviews.map((item) => {
    const slug = item.url.split("/").filter(Boolean).pop() ?? "";
    const relatedProduct = getProduct(slug);

    return {
      title: item.title,
      description: item.summary,
      href: item.url,
      label: "Review",
      imageUrl: relatedProduct ? resolveProductImageUrl(relatedProduct) : undefined,
      tone: relatedProduct?.tone,
      priceText: relatedProduct?.priceRange,
      stockText: relatedProduct ? "Usually in stock" : undefined,
      rating: relatedProduct?.rating,
      reviewCount: relatedProduct?.reviewCount
    };
  });
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
      <JsonLd data={buildProductSchema(review, { shopperRating: currentProduct?.rating, shopperReviewCount: currentProduct?.reviewCount })} />
      <JsonLd data={buildReviewSchema(review, { shopperRating: currentProduct?.rating, shopperReviewCount: currentProduct?.reviewCount })} />
      <JsonLd data={buildFaqSchema(review.faq)} />

      <div className="mx-auto w-full max-w-[1580px] px-4 pt-5 md:px-8 xl:px-12">
        <SiteBreadcrumbs items={breadcrumbItems} />
      </div>

      <div className="mt-8">
        <ProductMediaGallery tone={review.tone} title={review.name} images={galleryImages} />
      </div>

      <ProductBuyPanel review={review} shopperRating={currentProduct?.rating} shopperReviewCount={currentProduct?.reviewCount} />

      <div className="mx-auto w-full max-w-[1580px] px-4 py-10 md:px-8 md:py-12 xl:px-12">
        <section className="border-t border-black/10 pt-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/88">Full Review Summary</p>
          <div className="mt-5 border border-black/10 bg-[#faf9f5] p-5 md:p-7">
            <div className="max-w-5xl space-y-5">
              <p className="text-[15px] leading-7 text-black/80">{review.summary}</p>
              <p className="text-[15px] leading-7 text-black/80">{review.quickVerdict}</p>
              <p className="text-[15px] leading-7 text-black/80">
                <span className="font-semibold text-black">Why buy it:</span> {review.whyBuy}
              </p>
              <p className="text-[15px] leading-7 text-black/80">
                <span className="font-semibold text-black">Main drawback:</span> {review.mainDrawback}
              </p>
              <p className="text-[15px] leading-7 text-black/80">
                <span className="font-semibold text-black">Skip it if:</span> {review.avoidIf}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 border-t border-black/10 pt-8 md:grid-cols-2">
          <article>
            <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-black/88">Pros</h2>
            <div className="mt-4 border border-black/10 bg-[#faf9f5] p-5">
              <ul className="space-y-3 text-[15px] leading-7 text-black/80">
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
            <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-black/88">Cons</h2>
            <div className="mt-4 border border-black/10 bg-white p-5">
              <ul className="space-y-3 text-[15px] leading-7 text-black/80">
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

        <FeatureSnapshotTable review={review} />

        <section className="mt-10 border-t border-black/10 pt-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/88">Performance / Real Use Assessment</p>
          <div className="mt-5 max-w-5xl border border-black/10 bg-white p-5 md:p-6">
            <p className="text-[15px] leading-7 text-black/80">{review.performanceText}</p>
          </div>
        </section>

        <section className="mt-10 border-t border-black/10 pt-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/88">Buyer Fit</p>
          <div className="mt-5 border border-black/10 bg-white p-5 md:p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-black/60">Who Should Buy</p>
                <p className="mt-3 text-[15px] leading-7 text-black/80">{review.whoShouldBuy}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-black/60">Who Should Skip</p>
                <p className="mt-3 text-[15px] leading-7 text-black/80">{review.whoShouldSkip}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <RetailerOffersBlock review={review} />

      {review.alternatives.length > 0 ? (
        <div className="border-t border-black/10 bg-white">
          <div className="mx-auto w-full max-w-[1580px] px-4 py-12 md:px-8 md:py-14 xl:px-12">
          <div className="mb-8 border-b border-black/10 pb-6">
              <p className="text-xs uppercase tracking-[0.16em] text-black/60">Alternatives</p>
              <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">Other Picks To Consider</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {alternativeCards.map((item) => (
                <Link key={`${item.label}-${item.title}`} href={item.reviewUrl} className="group block">
                  <article className="flex h-full flex-col overflow-hidden border border-black/10 bg-white transition-colors duration-200 hover:bg-[#fbfaf6]">
                    {item.imageUrl ? (
                      <div className="relative overflow-hidden border-b border-black/10 bg-[#f7f3ec]">
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.tone ?? "from-[#ece5d9] to-[#cab59a]"} opacity-[0.22]`} />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.92),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.64))]" />
                        <div className="relative aspect-[16/10]">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                            quality={95}
                            className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </div>
                        <div className="absolute left-4 top-4">
                          <span className="inline-flex items-center border border-black/10 bg-white/92 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-black/70">
                            {item.label}
                          </span>
                        </div>
                      </div>
                    ) : null}
                    <div className="flex h-full flex-col p-4 md:p-5">
                      {!item.imageUrl ? <p className="text-xs uppercase tracking-[0.16em] text-black/60">{item.label}</p> : null}
                      <h3 className="mt-3 font-display text-[1.55rem] leading-[0.98] text-black md:min-h-[3.2rem] md:text-2xl">{item.title}</h3>
                      <p className="mt-3.5 text-[15px] leading-7 text-black/78 md:min-h-[5.75rem]">{compactAlternativeSummary(item.summary)}</p>
                      <div className="mt-4 border-t border-black/10 pt-4">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                          <p className="font-medium">{item.fallbackPriceText}</p>
                          <div className="inline-flex items-center gap-2 font-medium text-[#1f6f43]">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#1f6f43]" aria-hidden="true" />
                            Usually in stock
                          </div>
                          {item.rating ? (
                            <div className="inline-flex items-center gap-2 text-black/72">
                              <span className="inline-flex items-center gap-[1px] text-[#f59e0b]" aria-hidden="true">
                                {Array.from({ length: 5 }).map((_, starIndex) => (
                                  <span key={`${item.reviewUrl}-star-${starIndex}`} className="text-[12px] leading-none">
                                    &#9733;
                                  </span>
                                ))}
                              </span>
                              <span className="font-semibold text-black">{item.rating.toFixed(1)}/5</span>
                            </div>
                          ) : null}
                          {item.reviewCount ? <p className="text-xs leading-5 text-black/68">{item.reviewCount.toLocaleString("en-US")} reviews</p> : null}
                        </div>
                        <span className="btn-commerce-primary mt-4 min-h-[50px] w-full px-6 py-3.5 text-[12px] font-semibold tracking-[0.16em]">
                          Read Review
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
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
                <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">Check The Latest Price</h2>
                <p className="mt-3 text-sm leading-relaxed text-black/68">
                  If this review matches what you need, use the current lead offer to confirm the latest price, stock, and shipping details.
                </p>
              </div>
              <TrackedAffiliateLink
                href={lowerPageOffer.affiliateUrl}
                rel="nofollow sponsored noopener noreferrer"
                target="_blank"
                className="btn-commerce-primary min-h-[52px] px-6 text-[10px] tracking-[0.22em]"
                signal={{ slug: review.slug, slot: "review-lower-cta", destination: lowerPageOffer.retailerName }}
              >
                {lowerPageOffer.ctaLabel} | {lowerPageOffer.priceText}
              </TrackedAffiliateLink>
            </div>
          </div>
        </section>
      ) : null}

      {review.comparisons.length > 0 ? (
        <div className="border-t border-black/10 bg-[#f8f6f1]">
          <div className="mx-auto w-full max-w-[1580px] px-4 py-12 md:px-8 md:py-14 xl:px-12">
          <div className="mb-8 border-b border-black/10 pb-6">
              <p className="text-xs uppercase tracking-[0.16em] text-black/60">Compare Before You Buy</p>
              <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">Comparison Links</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {review.comparisons.map((item) => (
                <Link key={item.url} href={item.url} className="group block">
                  <article className="h-full border border-black/10 bg-white p-5 transition-colors duration-200 hover:bg-[#fbfaf6]">
                    <p className="text-xs uppercase tracking-[0.16em] text-black/60">Comparison</p>
                    <h3 className="mt-3 font-display text-2xl leading-[0.98]">{item.title}</h3>
                    <p className="mt-3 text-[15px] leading-7 text-black/78">{item.summary}</p>
                    <span className="btn-commerce-primary mt-5 min-h-[50px] w-full px-6 py-3.5 text-[12px] font-semibold tracking-[0.16em]">
                      Open Comparison
                    </span>
                  </article>
                </Link>
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
                <summary className="cursor-pointer text-xs uppercase tracking-[0.2em] text-black/86">{item.question}</summary>
                <p className="mt-3 max-w-3xl text-[15px] leading-7 text-black/78">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <InternalLinkGrid
        title="Related Guides"
        kicker="Helpful Guides"
        items={review.relatedGuides.map((guide) => ({
          title: guide.title,
          description: guide.summary,
          href: guide.url,
          label: "Guide"
        }))}
      />

      <InternalLinkGrid
        title="Related Reviews"
        kicker="More Reviews"
        items={relatedReviewCards}
      />
    </section>
  );
}
