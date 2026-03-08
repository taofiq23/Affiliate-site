import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { buildArticleSchema, buildBreadcrumbSchema, buildItemListSchema } from "@/lib/seo";
import { getComparisons, getGuides, getProducts, type BestListRecord } from "@/lib/content-store";

type Props = {
  page: BestListRecord;
};

export function BestListPageTemplate({ page }: Props) {
  const rankedProducts = getProducts(page.productSlugs);
  const relatedGuides = getGuides(page.relatedGuides);
  const relatedComparisons = getComparisons(page.relatedComparisons);

  return (
    <section className="min-h-screen bg-white py-16 md:py-24">
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Best", path: "/best/top-picks" }, { name: page.title, path: `/best/${page.slug}` }])} />
      <JsonLd data={buildArticleSchema(page.title, page.description, `/best/${page.slug}`)} />
      <JsonLd data={buildItemListSchema(page.title, rankedProducts.map((product) => `/reviews/${product.slug}`))} />

      <div className="container-luxe">
        <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Best", href: "/best/top-picks" }, { label: page.title }]} />
        <div className="mb-16 text-center">
          <p className="kicker text-xs tracking-[0.3em] text-black/60">BEST LIST TEMPLATE</p>
          <h1 className="mt-6 font-display text-6xl leading-[0.9] md:text-8xl">{page.title}</h1>
          <p className="mx-auto mt-8 max-w-3xl text-sm uppercase leading-relaxed tracking-[0.1em] text-black/50">{page.intro}</p>
        </div>

        <div className="mb-16 grid gap-4 border-y border-black/10 py-8 md:grid-cols-3">
          {page.highlights.map((highlight) => (
            <article key={highlight} className="border border-black/10 bg-[#faf9f5] p-5">
              <p className="text-sm leading-relaxed text-black/72">{highlight}</p>
            </article>
          ))}
        </div>

        <div className="mb-16">
          <div className="mb-8 border-b border-black/10 pb-6">
            <p className="text-xs uppercase tracking-[0.16em] text-black/45">Ranked Product Cards</p>
            <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">Top Recommendations</h2>
          </div>

          <div className="grid gap-6">
            {rankedProducts.map((product, index) => (
              <article key={product.slug} className="grid gap-6 border border-black/10 bg-white p-5 md:grid-cols-[84px_minmax(0,1fr)_220px] md:p-6">
                <div className="flex h-16 w-16 items-center justify-center border border-black/10 bg-[#faf9f5] text-sm uppercase tracking-[0.2em] text-black/55 md:h-20 md:w-20">
                  #{index + 1}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-black/45">{product.highlightLabel}</p>
                  <h3 className="mt-3 font-display text-3xl leading-[0.95]">{product.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-black/68">{product.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {product.features.slice(0, 3).map((feature) => (
                      <span key={feature} className="border border-black/10 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-black/60">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-4 border-t border-black/10 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-black/45">Price Range</p>
                    <p className="mt-2 text-2xl leading-none">{product.priceRange}</p>
                  </div>
                  <div className="grid gap-2">
                    <Link href={`/reviews/${product.slug}`} className="border border-black bg-black px-4 py-3 text-center text-[10px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-black/90">
                      Read Review
                    </Link>
                    <a
                      href={product.affiliateLinks[0]?.affiliateUrl}
                      target="_blank"
                      rel="noreferrer sponsored"
                      className="border border-black px-4 py-3 text-center text-[10px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-black hover:text-white"
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
            <p className="text-xs uppercase tracking-[0.16em] text-black/45">Quick Comparison Table</p>
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
            <p className="text-xs uppercase tracking-[0.16em] text-black/45">FAQ</p>
            <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">Common Questions</h2>
          </div>

          <div className="border-t border-black/10">
            {page.faq.map((item) => (
              <details key={item.question} className="border-b border-black/10 py-4">
                <summary className="cursor-pointer text-xs uppercase tracking-[0.2em] text-secondary/75">{item.question}</summary>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-secondary/80">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <InternalLinkGrid
        title="Related Reviews"
        kicker="Review Paths"
        items={rankedProducts.map((product) => ({
          title: `${product.name} Review`,
          description: product.summary,
          href: `/reviews/${product.slug}`,
          label: "Review"
        }))}
      />

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
        title="Related Comparisons"
        kicker="Decision Paths"
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
