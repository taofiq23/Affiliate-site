import { JsonLd } from "@/components/json-ld";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { getBestLists, getComparisons, getProducts, type GuideRecord } from "@/lib/content-store";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo";

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

        <article className="mx-auto mt-6 max-w-4xl">
          <p className="kicker">Buying Guide</p>
          <h1 className="section-title mt-4">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-secondary/82 md:text-lg">
            {page.description}
          </p>

          <div className="mt-8 rounded-[2rem] border border-black/10 bg-white/55 p-8 shadow-[0_18px_60px_rgba(0,0,0,0.06)] md:p-10">
            <p className="text-base leading-8 text-secondary/84 md:text-lg">{page.intro}</p>
          </div>

          <div className="mt-12 border-t border-black/10 pt-12">
            <div className="space-y-12">
              {page.sections.map((section) => (
                <section key={section.heading} className="space-y-6">
                  <h2 className="font-display text-3xl leading-tight md:text-4xl">{section.heading}</h2>
                  <div className="space-y-5">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-secondary/82 md:text-[1.04rem]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <div className="mt-14 border-t border-black/10 pt-10">
            <p className="text-xs uppercase tracking-[0.16em] text-black/45">Frequently Asked Questions</p>
            <div className="mt-6 divide-y divide-black/10 rounded-[2rem] border border-black/10 bg-white/45 px-6 md:px-8">
              {page.faq.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="cursor-pointer list-none pr-8 text-base font-medium leading-7 text-secondary marker:hidden md:text-[1.03rem]">
                    {item.question}
                  </summary>
                  <p className="mt-3 max-w-3xl text-base leading-8 text-secondary/80">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </article>
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
