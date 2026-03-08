import Link from "next/link";
import { ProductBuyPanel } from "@/components/product/product-buy-panel";
import { ProductMediaGallery } from "@/components/product/product-media-gallery";
import { JsonLd } from "@/components/json-ld";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { buildBreadcrumbSchema, buildReviewSchema } from "@/lib/seo";
import { getComparisons, getGuides, getProducts, type ProductRecord } from "@/lib/site-data";

type Props = {
  product: ProductRecord;
};

export function ReviewPageTemplate({ product }: Props) {
  const alternatives = getProducts(product.alternatives);
  const relatedGuides = getGuides(product.relatedGuides);
  const comparisonLinks = getComparisons(product.relatedComparisons);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Reviews", href: `/category/${product.category}` },
    { label: product.name }
  ];

  return (
    <section className="min-h-screen bg-white">
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Reviews", path: `/category/${product.category}` }, { name: product.name, path: `/reviews/${product.slug}` }])} />
      <JsonLd data={buildReviewSchema(`${product.name} Review`, product.summary, `/reviews/${product.slug}`, product.rating)} />

      <div className="mx-auto w-full max-w-[1580px] px-4 pt-5 md:px-8 xl:px-12">
        <SiteBreadcrumbs items={breadcrumbItems} />
      </div>

      <ProductMediaGallery tone={product.tone} />

      <div className="mx-auto w-full max-w-[1580px] px-4 py-10 md:px-8 md:py-12 xl:px-12">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_440px] 2xl:grid-cols-[minmax(0,1fr)_460px]">
          <div>
            <h1 className="font-display text-4xl leading-[0.95] md:text-5xl">{product.name} Review</h1>
            <p className="mt-4 text-sm text-black/70">{product.summary}</p>

            <div className="mt-10 grid gap-6 border-t border-black/10 pt-8 md:grid-cols-2">
              <article className="border border-black/10 bg-[#faf9f5] p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-black/45">Quick Verdict</p>
                <p className="mt-4 text-sm leading-relaxed text-black/72">{product.quickVerdict}</p>
              </article>
              <article className="border border-black/10 bg-[#faf9f5] p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-black/45">Who This Is Best For</p>
                <p className="mt-4 text-sm leading-relaxed text-black/72">{product.bestFor}</p>
              </article>
            </div>

            <div className="mt-10 border-t border-black/10 pt-8">
              <h2 className="text-sm uppercase tracking-[0.2em] text-black/80">Key Features</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <div key={feature} className="border border-black/10 p-4 text-sm leading-relaxed text-black/72">
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-6 border-t border-black/10 pt-8 md:grid-cols-2">
              <article>
                <h2 className="text-sm uppercase tracking-[0.2em] text-black/80">Pros</h2>
                <div className="mt-4 space-y-3">
                  {product.pros.map((item) => (
                    <p key={item} className="border border-black/10 bg-[#faf9f5] p-4 text-sm leading-relaxed text-black/72">
                      {item}
                    </p>
                  ))}
                </div>
              </article>
              <article>
                <h2 className="text-sm uppercase tracking-[0.2em] text-black/80">Cons</h2>
                <div className="mt-4 space-y-3">
                  {product.cons.map((item) => (
                    <p key={item} className="border border-black/10 bg-white p-4 text-sm leading-relaxed text-black/72">
                      {item}
                    </p>
                  ))}
                </div>
              </article>
            </div>

            <div className="mt-10 border-t border-black/10 pt-4 text-xs uppercase tracking-[0.16em] text-black/75">
              <details className="group border-b border-black/10 py-3" open>
                <summary className="flex cursor-pointer list-none items-center justify-between py-1">
                  <span>Performance</span>
                  <svg className="h-3 w-3 text-black/50 transition-transform duration-200 group-open:rotate-180" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.25" />
                  </svg>
                </summary>
                <p className="mt-2 pr-2 text-sm normal-case leading-relaxed text-black/70">{product.performance}</p>
              </details>
              <details className="group border-b border-black/10 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between py-1">
                  <span>Who Should Avoid It</span>
                  <svg className="h-3 w-3 text-black/50 transition-transform duration-200 group-open:rotate-180" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.25" />
                  </svg>
                </summary>
                <p className="mt-2 pr-2 text-sm normal-case leading-relaxed text-black/70">{product.avoidIf}</p>
              </details>
              <details className="group border-b border-black/10 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between py-1">
                  <span>Affiliate Note</span>
                  <svg className="h-3 w-3 text-black/50 transition-transform duration-200 group-open:rotate-180" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.25" />
                  </svg>
                </summary>
                <p className="mt-2 pr-2 text-sm normal-case leading-relaxed text-black/70">
                  Retailer buttons on this page are affiliate links. The site may earn a commission if a purchase happens after the click.
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
            <p className="text-xs uppercase tracking-[0.16em] text-black/45">Alternatives</p>
            <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">Other Picks To Consider</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {alternatives.map((item) => (
              <article key={item.slug} className="border border-black/10 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-black/50">{item.highlightLabel}</p>
                <h3 className="mt-3 font-display text-2xl leading-[0.98]">{item.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/68">{item.summary}</p>
                <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4">
                  <p className="text-sm font-medium">{item.priceRange}</p>
                  <Link href={`/reviews/${item.slug}`} className="text-xs uppercase tracking-[0.14em] text-black/70 transition-colors hover:text-black">
                    Read Review
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 bg-[#f8f6f1]">
        <div className="mx-auto w-full max-w-[1580px] px-4 py-12 md:px-8 md:py-14 xl:px-12">
          <div className="mb-8 border-b border-black/10 pb-6">
            <p className="text-xs uppercase tracking-[0.16em] text-black/45">FAQ</p>
            <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">Common Questions</h2>
          </div>

          <div className="border-t border-black/10">
            {product.faq.map((item) => (
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
        items={relatedGuides.map((guide) => ({
          title: guide.title,
          description: guide.description,
          href: `/guides/${guide.slug}`,
          label: "Guide"
        }))}
      />

      <InternalLinkGrid
        title="Comparison Paths"
        kicker="Decision Pages"
        items={comparisonLinks.map((comparison) => ({
          title: comparison.title,
          description: comparison.description,
          href: `/compare/${comparison.slug}`,
          label: "Comparison"
        }))}
      />
    </section>
  );
}
