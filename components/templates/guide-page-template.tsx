import Image from "next/image";
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
  const leadProduct = relatedReviews[0];

  return (
    <section className="bg-base-2 py-16 md:py-24">
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: `/guides/${page.slug}` }, { name: page.title, path: `/guides/${page.slug}` }])} />
      <JsonLd data={buildArticleSchema(page.title, page.description, `/guides/${page.slug}`)} />

      <div className="container-luxe">
        <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: `/guides/${page.slug}` }, { label: page.title }]} />

        <article className="mx-auto mt-6 max-w-5xl">
          <div className="grid gap-10 md:grid-cols-[minmax(320px,0.86fr)_minmax(0,1.14fr)] md:items-center">
            <div className="luxe-image relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white">
              {leadProduct?.imageUrl || leadProduct?.image ? (
                <Image
                  src={leadProduct.imageUrl ?? leadProduct.image ?? ""}
                  alt={leadProduct.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 34vw"
                  className="object-contain p-8 md:p-10"
                  priority
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-[#e9e1d5] via-[#d5c3a5] to-[#9b7c4e]" />
              )}
            </div>

            <div>
              <p className="kicker">Buying Guide</p>
              <h1 className="section-title mt-4">{page.title}</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-black/72 md:text-lg">
                {page.description}
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-[2rem] border border-black/10 bg-white/72 p-8 shadow-[0_18px_60px_rgba(0,0,0,0.06)] md:p-10">
            <p className="text-base leading-8 text-black/74 md:text-lg">{page.intro}</p>
          </div>

          <div className="mt-12 border-t border-black/10 pt-12">
            <div className="space-y-12">
              {page.sections.map((section) => (
                <section key={section.heading} className="space-y-6">
                  <h2 className="font-display text-3xl leading-tight md:text-4xl">{section.heading}</h2>
                  <div className="space-y-5">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-black/74 md:text-[1.04rem]">
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
            <div className="mt-6 divide-y divide-black/10 rounded-[2rem] border border-black/10 bg-white/55 px-6 md:px-8">
              {page.faq.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="cursor-pointer list-none pr-8 text-base font-medium leading-7 text-black/88 marker:hidden md:text-[1.03rem]">
                    {item.question}
                  </summary>
                  <p className="mt-3 max-w-3xl text-base leading-8 text-black/74">{item.answer}</p>
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
