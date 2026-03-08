import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo";
import { getGuides, getProducts, type ComparisonRecord } from "@/lib/site-data";

type Props = {
  page: ComparisonRecord;
};

export function ComparisonPageTemplate({ page }: Props) {
  const [left, right] = getProducts(page.productSlugs);
  const relatedGuides = getGuides(page.relatedGuides);

  return (
    <section className="min-h-screen bg-white py-16 md:py-24">
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Compare", path: `/compare/${page.slug}` }, { name: page.title, path: `/compare/${page.slug}` }])} />
      <JsonLd data={buildArticleSchema(page.title, page.description, `/compare/${page.slug}`)} />

      <div className="container-luxe">
        <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare", href: `/compare/${page.slug}` }, { label: page.title }]} />
        <div className="mb-16 text-center">
          <p className="kicker text-xs tracking-[0.3em] text-black/60">COMPARISON TEMPLATE</p>
          <h1 className="mt-6 font-display text-5xl leading-[0.9] md:text-7xl">{page.title}</h1>
          <p className="mx-auto mt-8 max-w-3xl text-sm uppercase leading-relaxed tracking-[0.1em] text-black/50">{page.intro}</p>
        </div>

        <div className="mb-16 overflow-x-auto border border-black/10">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-[#faf9f5] text-xs uppercase tracking-[0.16em] text-black/55">
              <tr>
                <th className="border-b border-black/10 px-4 py-4">Area</th>
                <th className="border-b border-black/10 px-4 py-4">{left.name}</th>
                <th className="border-b border-black/10 px-4 py-4">{right.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-black/10 px-4 py-4 font-medium">Brand</td>
                <td className="border-b border-black/10 px-4 py-4">{left.brand}</td>
                <td className="border-b border-black/10 px-4 py-4">{right.brand}</td>
              </tr>
              <tr>
                <td className="border-b border-black/10 px-4 py-4 font-medium">Category</td>
                <td className="border-b border-black/10 px-4 py-4 uppercase text-black/60">{left.category}</td>
                <td className="border-b border-black/10 px-4 py-4 uppercase text-black/60">{right.category}</td>
              </tr>
              <tr>
                <td className="border-b border-black/10 px-4 py-4 font-medium">Rating</td>
                <td className="border-b border-black/10 px-4 py-4">{left.rating.toFixed(1)}</td>
                <td className="border-b border-black/10 px-4 py-4">{right.rating.toFixed(1)}</td>
              </tr>
              <tr>
                <td className="border-b border-black/10 px-4 py-4 font-medium">Price Range</td>
                <td className="border-b border-black/10 px-4 py-4">{left.priceRange}</td>
                <td className="border-b border-black/10 px-4 py-4">{right.priceRange}</td>
              </tr>
              <tr>
                <td className="border-b border-black/10 px-4 py-4 font-medium">Best For</td>
                <td className="border-b border-black/10 px-4 py-4 text-black/68">{left.bestFor}</td>
                <td className="border-b border-black/10 px-4 py-4 text-black/68">{right.bestFor}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid gap-6 border-y border-black/10 py-10 md:grid-cols-3">
          <article className="border border-black/10 bg-[#faf9f5] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-black/45">Feature Comparison</p>
            <p className="mt-4 text-sm leading-relaxed text-black/72">{page.featureComparison}</p>
          </article>
          <article className="border border-black/10 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-black/45">Performance Comparison</p>
            <p className="mt-4 text-sm leading-relaxed text-black/72">{page.performanceComparison}</p>
          </article>
          <article className="border border-black/10 bg-[#faf9f5] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-black/45">Price Comparison</p>
            <p className="mt-4 text-sm leading-relaxed text-black/72">{page.priceComparison}</p>
          </article>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {[left, right].map((product) => (
            <article key={product.slug} className="border border-black/10 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-black/45">{product.highlightLabel}</p>
              <h2 className="mt-3 font-display text-3xl leading-[0.95]">{product.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-black/68">{product.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {product.features.slice(0, 3).map((feature) => (
                  <span key={feature} className="border border-black/10 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-black/60">
                    {feature}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
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
            </article>
          ))}
        </div>

        <div className="mt-16 border-t border-black/10 pt-10">
          <p className="text-xs uppercase tracking-[0.16em] text-black/45">Verdict</p>
          <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">Final Decision</h2>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-black/72">{page.verdict}</p>
        </div>

        <div className="mt-16">
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
        items={[left, right].map((product) => ({
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
    </section>
  );
}
