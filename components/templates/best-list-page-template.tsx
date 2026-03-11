import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { resolveProductImageUrl } from "@/lib/generated-content-normalizers";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema, buildItemListSchema } from "@/lib/seo";
import { getComparisons, getGuides, getProducts, type BestListRecord } from "@/lib/content-store";

type Props = {
  page: BestListRecord;
};

function cleanShortlistSummary(summary: string) {
  return summary
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => !/\b\d+(?:,\d{3})*\s+shopper reviews?\b/i.test(sentence))
    .filter((sentence) => !/\b\d(?:\.\d)?\/5\b/i.test(sentence))
    .filter((sentence) => !/\bcarries?\s+a\s+\d(?:\.\d)?\s+rating\b/i.test(sentence))
    .join(" ")
    .trim();
}

function isProofFeature(feature: string) {
  return /\b\d+(?:,\d{3})*\s+shopper reviews?\b/i.test(feature) || /\b\d(?:\.\d)?\/5\b/i.test(feature) || /\brating\b/i.test(feature);
}

export function BestListPageTemplate({ page }: Props) {
  const rankedProducts = getProducts(page.productSlugs);
  const relatedGuides = getGuides(page.relatedGuides);
  const relatedComparisons = getComparisons(page.relatedComparisons);
  const reviewCountFormatter = new Intl.NumberFormat("en-US");
  const leadProduct = rankedProducts[0];

  return (
    <section className="min-h-screen bg-white py-16 md:py-24">
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Best", path: "/best/top-picks" }, { name: page.title, path: `/best/${page.slug}` }])} />
      <JsonLd data={buildArticleSchema(page.title, page.description, `/best/${page.slug}`, leadProduct ? resolveProductImageUrl(leadProduct) : undefined)} />
      <JsonLd data={buildItemListSchema(page.title, rankedProducts.map((product) => `/reviews/${product.slug}`))} />
      <JsonLd data={buildFaqSchema(page.faq)} />

      <div className="container-luxe">
        <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Best", href: "/best/top-picks" }, { label: page.title }]} />
        <div className="mb-12 text-center md:mb-16">
          <p className="kicker text-xs tracking-[0.3em] text-black/70">BEST LIST</p>
          <h1 className="mt-5 font-display text-[2.5rem] leading-[0.94] sm:text-5xl md:mt-6 md:text-8xl">{page.title}</h1>
          <p className="mx-auto mt-6 max-w-3xl text-[15px] leading-7 text-black md:mt-8 md:text-[1.02rem] md:leading-8" style={{ color: "#171717" }}>
            {page.intro}
          </p>
        </div>

        {page.highlights.length > 0 ? (
          <div className="mb-16 grid gap-4 border-y border-black/10 py-8 md:grid-cols-3">
            {page.highlights.map((highlight) => (
              <article key={highlight} className="border border-black/10 bg-[#faf9f5] p-5">
                <p className="text-sm leading-relaxed text-black/72">{highlight}</p>
              </article>
            ))}
          </div>
        ) : null}

        <div className="mb-16">
          <div className="mb-8 border-b border-black/10 pb-6">
            <p className="text-xs uppercase tracking-[0.16em] text-black/60">Ranked Product Cards</p>
            <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">Top Recommendations</h2>
          </div>

          <div className="grid gap-5">
            {rankedProducts.map((product, index) => (
              <article key={product.slug} className="grid gap-5 border border-black/10 bg-white p-4 shadow-[0_12px_28px_rgba(0,0,0,0.03)] sm:p-5 md:grid-cols-[74px_minmax(0,1fr)_212px] md:items-start md:p-6">
                <div className="flex h-16 w-16 items-center justify-center border border-black/10 bg-[#faf9f5] text-sm uppercase tracking-[0.2em] text-black/55 md:h-[74px] md:w-[74px]">
                  #{index + 1}
                </div>

                <div>
                  <span className="inline-flex items-center border border-black/10 bg-[#faf9f5] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-black/70">
                    {product.highlightLabel}
                  </span>
                  <h3 className="mt-3 font-display text-[2rem] leading-[0.96] sm:text-3xl">{product.name}</h3>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-sm leading-6 text-black/72">
                    <span className="inline-flex items-center gap-[1px] text-[#f59e0b]" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <span key={`${product.slug}-star-${starIndex}`} className="text-[13px] leading-none">
                          &#9733;
                        </span>
                      ))}
                    </span>
                    <span className="font-semibold text-black">{product.rating.toFixed(1)}/5</span>
                    <span aria-hidden="true" className="text-black/25">
                      |
                    </span>
                    <span>
                      <span className="font-semibold text-black">{reviewCountFormatter.format(product.reviewCount)}</span> shopper reviews
                    </span>
                  </div>
                  <p className="mt-4 text-[14px] font-medium leading-6 text-black/80 sm:text-[15px]">{cleanShortlistSummary(product.summary)}</p>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {product.features
                      .filter((feature) => !isProofFeature(feature))
                      .slice(0, 3)
                      .map((feature) => (
                        <span key={feature} className="rounded-full border border-black/10 bg-white px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-black/60">
                          {feature}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-3 border-t border-black/10 pt-4 md:border-l md:border-t-0 md:pl-5 md:pt-0">
                  <div className="relative overflow-hidden border border-black/10 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${product.tone} opacity-[0.13]`} />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.92),transparent_44%),linear-gradient(180deg,rgba(255,255,255,0.58),rgba(255,255,255,0.14))]" />
                    <div className="relative h-[100px] sm:h-[118px]">
                      <Image
                        src={resolveProductImageUrl(product)}
                        alt={product.name}
                        fill
                        sizes="220px"
                        quality={95}
                        className="object-contain p-4"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-black/45">Price Range</p>
                    <p className="mt-2 text-2xl leading-none">{product.priceRange}</p>
                  </div>
                  <div className="grid gap-2">
                    <Link href={`/reviews/${product.slug}`} className="border border-accent bg-accent px-4 py-3 text-center text-[10px] uppercase tracking-[0.18em] text-secondary transition-colors hover:brightness-95 sm:tracking-[0.22em]">
                      Read Review
                    </Link>
                    <a
                      href={product.affiliateLinks[0]?.affiliateUrl}
                      target="_blank"
                      rel="noreferrer sponsored"
                      className="border border-secondary/18 bg-white px-4 py-3 text-center text-[10px] uppercase tracking-[0.18em] text-secondary transition-colors hover:border-secondary hover:bg-secondary hover:text-base-2 sm:tracking-[0.22em]"
                    >
                      {product.affiliateLinks[0]?.ctaLabel ?? "Check Deal"}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-8 border-b border-black/10 pb-6">
            <p className="text-xs uppercase tracking-[0.16em] text-black/60">Quick Comparison Table</p>
            <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">Shortlist Snapshot</h2>
          </div>

          <div className="overflow-x-auto border border-black/10">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-[#faf9f5] text-xs uppercase tracking-[0.16em] text-black/55">
                <tr>
                  <th className="border-b border-black/10 px-4 py-4">Product</th>
                  <th className="border-b border-black/10 px-4 py-4">Category</th>
                  <th className="border-b border-black/10 px-4 py-4">Rating</th>
                  <th className="border-b border-black/10 px-4 py-4">Price Range</th>
                  <th className="border-b border-black/10 px-4 py-4">Best For</th>
                </tr>
              </thead>
              <tbody>
                {rankedProducts.map((product) => (
                  <tr key={`row-${product.slug}`}>
                    <td className="border-b border-black/10 px-4 py-4 font-medium">{product.name}</td>
                    <td className="border-b border-black/10 px-4 py-4 uppercase text-black/60">{product.category}</td>
                    <td className="border-b border-black/10 px-4 py-4">{product.rating.toFixed(1)}</td>
                    <td className="border-b border-black/10 px-4 py-4">{product.priceRange}</td>
                    <td className="border-b border-black/10 px-4 py-4 text-black/68">{product.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-8 border-b border-black/10 pb-6">
            <p className="text-xs uppercase tracking-[0.16em] text-black/60">FAQ</p>
            <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">Common Questions</h2>
          </div>

          <div className="border-t border-black/10">
            {page.faq.map((item) => (
              <details key={item.question} className="border-b border-black/10 py-4">
                <summary className="cursor-pointer text-xs uppercase tracking-[0.2em] text-black/86">{item.question}</summary>
                <p className="mt-3 max-w-3xl text-[15px] leading-7 text-black/78">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <InternalLinkGrid
        title="Related Reviews"
        kicker="More Reviews"
        items={rankedProducts.map((product) => ({
          title: `${product.name} Review`,
          description: cleanShortlistSummary(product.summary),
          href: `/reviews/${product.slug}`,
          label: "Review",
          imageUrl: resolveProductImageUrl(product),
          tone: product.tone,
          priceText: product.priceRange,
          stockText: "Usually in stock",
          rating: product.rating,
          reviewCount: product.reviewCount
        }))}
      />

      <InternalLinkGrid
        title="Related Guides"
        kicker="Helpful Guides"
        items={relatedGuides.map((guide) => ({
          title: guide.title,
          description: guide.description,
          href: `/guides/${guide.slug}`,
          label: "Guide"
        }))}
      />

      <InternalLinkGrid
        title="Related Comparisons"
        kicker="Compare Options"
        items={relatedComparisons.map((comparison) => ({
          title: comparison.title,
          description: comparison.description,
          href: `/compare/${comparison.slug}`,
          label: "Comparison"
        }))}
      />
    </section>
  );
}
