import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductBuyPanel } from "@/components/product/product-buy-panel";
import { ProductMediaGallery } from "@/components/product/product-media-gallery";
import { productMap, ratingBreakdown, reviews, topRatedOrder } from "./product-data";

export function generateStaticParams() {
  return Object.keys(productMap).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = productMap[params.slug];

  if (!product) {
    notFound();
  }

  const currentSlug = params.slug;

  const relatedProducts = topRatedOrder
    .filter((slug) => slug !== currentSlug)
    .slice(0, 4)
    .map((slug, index) => {
      const item = productMap[slug];
      return {
        slug,
        ...item,
        rating: (4.9 - index * 0.1).toFixed(1),
        reviewCount: 240 - index * 32,
        price: item.sizes[item.sizes.length - 1]?.price ?? item.sizes[0].price
      };
    });

  return (
    <section className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[1580px] px-4 pt-5 md:px-8 xl:px-12">
        <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-black/45">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link href="/collection" className="hover:text-black">
            Top Picks
          </Link>
          <span>/</span>
          <span className="text-black/80">{product.name}</span>
        </nav>
      </div>

      <ProductMediaGallery tone={product.tone} />

      <div className="mx-auto w-full max-w-[1580px] px-4 py-10 md:px-8 md:py-12 xl:px-12">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_440px] 2xl:grid-cols-[minmax(0,1fr)_460px]">
          <div>
            <h1 className="font-display text-4xl leading-[0.95] md:text-5xl">{product.name}</h1>
            <p className="mt-4 text-sm text-black/70">
              {product.family} profile. Best for {product.bestFor.toLowerCase()}
            </p>

            <div className="mt-10 border-t border-black/10 pt-8">
              <h2 className="text-sm uppercase tracking-[0.2em] text-black/80">Review Summary</h2>
              <p className="mt-4 text-sm leading-relaxed text-black/70">{product.description}</p>
            </div>

            <div className="mt-10 border-t border-black/10 pt-4 text-xs uppercase tracking-[0.16em] text-black/75">
              <details className="group border-b border-black/10 py-3" open>
                <summary className="flex cursor-pointer list-none items-center justify-between py-1">
                  <span>Why We Picked It</span>
                  <svg className="h-3 w-3 text-black/50 transition-transform duration-200 group-open:rotate-180" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.25" />
                  </svg>
                </summary>
                <p className="mt-2 pr-2 text-sm normal-case leading-relaxed text-black/70">{product.whyItWins}</p>
              </details>
              <details className="group border-b border-black/10 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between py-1">
                  <span>Best For</span>
                  <svg className="h-3 w-3 text-black/50 transition-transform duration-200 group-open:rotate-180" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.25" />
                  </svg>
                </summary>
                <p className="mt-2 pr-2 text-sm normal-case leading-relaxed text-black/70">{product.bestFor}</p>
              </details>
              <details className="group border-b border-black/10 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between py-1">
                  <span>Performance Notes</span>
                  <svg className="h-3 w-3 text-black/50 transition-transform duration-200 group-open:rotate-180" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.25" />
                  </svg>
                </summary>
                <p className="mt-2 pr-2 text-sm normal-case leading-relaxed text-black/70">{product.wear}</p>
              </details>
              <details className="group border-b border-black/10 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between py-1">
                  <span>Affiliate Note</span>
                  <svg className="h-3 w-3 text-black/50 transition-transform duration-200 group-open:rotate-180" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.25" />
                  </svg>
                </summary>
                <p className="mt-2 pr-2 text-sm normal-case leading-relaxed text-black/70">
                  When you leave this page for {product.retailer}, the transaction happens on the retailer website. This site may earn a commission from qualifying purchases.
                </p>
              </details>
            </div>
          </div>

          <ProductBuyPanel product={product} />
        </div>
      </div>

      <div className="border-t border-black/10 bg-white">
        <div className="mx-auto w-full max-w-[1580px] px-4 py-12 md:px-8 md:py-14 xl:px-12">
          <div className="mb-8 border-b border-black/10 pb-6">
            <p className="text-xs uppercase tracking-[0.16em] text-black/45">Reader Feedback</p>
            <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">Reviews</h2>
          </div>

          <div className="grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="border border-black/10 bg-[#faf9f5] p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-black/50">Average Rating</p>
              <div className="mt-3 flex items-end gap-3">
                <p className="font-display text-5xl leading-none">4.7</p>
                <p className="pb-1 text-sm text-black/60">out of 5</p>
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-black/50">Based on 247 reviews</p>
              <div className="mt-5 space-y-2">
                {ratingBreakdown.map((row) => (
                  <div key={row.label} className="flex items-center gap-3">
                    <span className="w-3 text-xs text-black/60">{row.label}</span>
                    <div className="h-2 flex-1 bg-black/10">
                      <div className="h-2 bg-black" style={{ width: `${row.percent}%` }} />
                    </div>
                    <span className="w-9 text-right text-xs text-black/55">{row.percent}%</span>
                  </div>
                ))}
              </div>
            </aside>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {reviews.map((review) => (
                <article key={`${review.name}-${review.date}`} className="border border-black/10 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.14em] text-black/70">{review.name}</p>
                    <p className="text-xs text-black/45">{review.date}</p>
                  </div>
                  <p className="mt-2 text-xs text-black/70">{"*".repeat(review.rating)}{"-".repeat(5 - review.rating)}</p>
                  <h3 className="mt-3 text-sm font-medium uppercase tracking-[0.1em] text-black/85">{review.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/68">{review.comment}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 bg-[#f8f6f1]">
        <div className="mx-auto w-full max-w-[1580px] px-4 py-12 md:px-8 md:py-14 xl:px-12">
          <div className="mb-8 border-b border-black/10 pb-6 text-center">
            <div className="mx-auto max-w-2xl">
              <p className="text-xs uppercase tracking-[0.16em] text-black/45">More Reviews</p>
              <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">You May Also Like</h2>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-black/45">Compare a few strong alternatives before clicking out</p>
            </div>
          </div>

          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {relatedProducts.map((item) => (
              <article key={item.slug} className="group w-[290px] shrink-0 snap-start overflow-hidden border border-black/10 bg-white md:w-[320px]">
                <Link href={`/product/${item.slug}`} className="block">
                  <div className={`relative h-[220px] overflow-hidden bg-gradient-to-br ${item.tone}`}>
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.75),rgba(0,0,0,0.06))]" />
                  </div>
                </Link>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.16em] text-black/50">{item.family}</p>
                    <p className="text-xs tracking-[0.08em] text-black/60">{"*".repeat(5)} {item.rating}</p>
                  </div>
                  <h3 className="mt-2 font-display text-2xl leading-[1]">{item.name}</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-black/55">{item.reviewCount} Reviews</p>
                  <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4">
                    <p className="text-sm font-medium">From {item.price}</p>
                    <Link href={`/product/${item.slug}`} className="text-xs uppercase tracking-[0.14em] text-black/70 transition-colors hover:text-black">
                      Read Review
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
