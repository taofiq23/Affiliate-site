import { JsonLd } from "@/components/json-ld";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo";
import { getBestLists, getComparisons, getProducts, type GuideRecord } from "@/lib/content-store";

type Props = {
  page: GuideRecord;
};

export function GuidePageTemplate({ page }: Props) {
  const relatedBest = getBestLists(page.relatedBest);
  const relatedReviews = getProducts(page.relatedReviews);
  const relatedComparisons = getComparisons(page.relatedComparisons);

  return (
    <section className="bg-base-2 py-16 md:py-24">
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: `/guides/${page.slug}` }, { name: page.title, path: `/guides/${page.slug}` }])} />
      <JsonLd data={buildArticleSchema(page.title, page.description, `/guides/${page.slug}`)} />

      <div className="container-luxe">
        <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: `/guides/${page.slug}` }, { label: page.title }]} />
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <div className="luxe-image sticky top-24">
            <div className="aspect-[4/5] bg-gradient-to-b from-[#dfd2be] via-[#c3ab80] to-[#7b6540]" />
          </div>
          <div>
            <p className="kicker">Guide Template</p>
            <h1 className="section-title mt-4">{page.title}</h1>
            <p className="mt-6 text-sm uppercase leading-relaxed tracking-[0.14em] text-secondary/72">{page.intro}</p>

            <div className="mt-10 space-y-10 border-t border-black/10 pt-10">
              {page.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-3xl leading-[0.95] md:text-4xl">{section.heading}</h2>
                  <div className="mt-5 space-y-4">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-relaxed text-secondary/80">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 border-t border-black/10 pt-10">
              <p className="text-xs uppercase tracking-[0.16em] text-black/45">FAQ</p>
              <div className="mt-6 border-t border-black/10">
                {page.faq.map((item) => (
                  <details key={item.question} className="border-b border-black/10 py-4">
                    <summary className="cursor-pointer text-xs uppercase tracking-[0.2em] text-secondary/75">{item.question}</summary>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-secondary/80">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <InternalLinkGrid
        title="Best Lists"
        kicker="Shortlist Paths"
        items={relatedBest.map((item) => ({
          title: item.title,
          description: item.description,
          href: `/best/${item.slug}`,
          label: "Best"
        }))}
      />

      <InternalLinkGrid
        title="Review Pages"
        kicker="Review Paths"
        items={relatedReviews.map((product) => ({
          title: `${product.name} Review`,
          description: product.summary,
          href: `/reviews/${product.slug}`,
          label: "Review"
        }))}
      />

      <InternalLinkGrid
        title="Comparison Pages"
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
