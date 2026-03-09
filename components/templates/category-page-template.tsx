import { AffiliateProductCard } from "@/components/affiliate-product-card";
import { JsonLd } from "@/components/json-ld";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";
import { resolveProductImageUrl } from "@/lib/generated-content-normalizers";
import { getBestLists, getComparisons, getGuides, getProducts, type CategoryRecord } from "@/lib/content-store";

type Props = {
  page: CategoryRecord;
};

export function CategoryPageTemplate({ page }: Props) {
  const products = getProducts(page.productSlugs);
  const bestLists = getBestLists(page.bestSlugs);
  const guides = getGuides(page.guideSlugs);
  const comparisons = getComparisons(page.comparisonSlugs);
  const leadProduct = products[0];

  return (
    <section className="min-h-screen bg-white py-16 md:py-24">
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Category", path: `/category/${page.slug}` }, { name: page.title, path: `/category/${page.slug}` }])} />
      <JsonLd data={buildArticleSchema(page.title, page.description, `/category/${page.slug}`, leadProduct ? resolveProductImageUrl(leadProduct) : undefined)} />
      <JsonLd data={buildFaqSchema(page.faq)} />

      <div className="container-luxe">
        <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Category", href: `/category/${page.slug}` }, { label: page.title }]} />
        <div className="mb-12 text-center md:mb-16">
          <p className="kicker text-xs tracking-[0.3em] text-black/70">CATEGORY HUB</p>
          <h1 className="mt-5 font-display text-[2.5rem] leading-[0.94] sm:text-5xl md:mt-6 md:text-8xl">{page.title}</h1>
          <p className="mx-auto mt-6 max-w-3xl text-[15px] leading-7 text-black/74 md:mt-8 md:text-base md:leading-8">{page.intro}</p>
        </div>

        <div className="mb-16">
          <div className="mb-8 border-b border-black/10 pb-6">
            <p className="text-xs uppercase tracking-[0.16em] text-black/60">Featured Reviews</p>
            <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">Products In This Category</h2>
          </div>

          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <AffiliateProductCard key={product.slug} product={product} />
            ))}
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
        title="Best Lists"
        kicker="Top Picks"
        items={bestLists.map((item) => ({
          title: item.title,
          description: item.description,
          href: `/best/${item.slug}`,
          label: "Best"
        }))}
      />

      <InternalLinkGrid
        title="Buying Guides"
        kicker="Helpful Guides"
        items={guides.map((guide) => ({
          title: guide.title,
          description: guide.description,
          href: `/guides/${guide.slug}`,
          label: "Guide"
        }))}
      />

      <InternalLinkGrid
        title="Comparisons"
        kicker="Compare Options"
        items={comparisons.map((comparison) => ({
          title: comparison.title,
          description: comparison.description,
          href: `/compare/${comparison.slug}`,
          label: "Comparison"
        }))}
      />
    </section>
  );
}
