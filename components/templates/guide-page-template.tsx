import Image from "next/image";
import { JsonLd } from "@/components/json-ld";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { getBestLists, getComparisons, getProducts, type GuideRecord } from "@/lib/content-store";
import { resolveProductImageUrl } from "@/lib/generated-content-normalizers";
import { getGuideImageUrl } from "@/lib/guide-images";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";

type Props = {
  page: GuideRecord;
};

export function GuidePageTemplate({ page }: Props) {
  const relatedBest = getBestLists(page.relatedBest);
  const relatedReviews = getProducts(page.relatedReviews);
  const relatedComparisons = getComparisons(page.relatedComparisons);
  const leadProduct = relatedReviews[0];
  const guideImageUrl = getGuideImageUrl(page.slug);

  return (
    <section className="bg-base-2 py-16 md:py-24">
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: `/guides/${page.slug}` }, { name: page.title, path: `/guides/${page.slug}` }])} />
      <JsonLd data={buildArticleSchema(page.title, page.description, `/guides/${page.slug}`, leadProduct ? resolveProductImageUrl(leadProduct) : undefined)} />
      <JsonLd data={buildFaqSchema(page.faq)} />

      <div className="container-luxe">
        <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: `/guides/${page.slug}` }, { label: page.title }]} />

        <article className="mx-auto mt-6 max-w-5xl" style={{ color: "#171717" }}>
          <div>
            <p className="kicker">Buying Guide</p>
            <h1 className="section-title mt-4">{page.title}</h1>
            <p className="mt-5 max-w-4xl text-[15px] leading-7 text-black md:mt-6 md:text-lg md:leading-8" style={{ color: "#171717" }}>
              {page.description}
            </p>
          </div>

          {guideImageUrl ? (
            <div className="relative mt-8 overflow-hidden rounded-[1.6rem] border border-black/10 bg-[#f7f1ea] shadow-[0_22px_70px_rgba(0,0,0,0.08)] sm:mt-10 sm:rounded-[2rem]">
              <div className="relative aspect-[5/4] sm:aspect-[16/10] md:aspect-[16/8]">
                <Image
                  src={guideImageUrl}
                  alt={page.title}
                  fill
                  sizes="100vw"
                  priority
                  className="object-cover object-center"
                />
              </div>
            </div>
          ) : null}

          <div className="mt-8 rounded-[1.6rem] border border-black/10 bg-white p-5 shadow-[0_18px_60px_rgba(0,0,0,0.06)] sm:mt-10 sm:rounded-[2rem] sm:p-8 md:p-10">
            <p className="text-[15px] leading-7 text-black md:text-lg md:leading-8" style={{ color: "#171717" }}>{page.intro}</p>
          </div>

          <div className="mt-10 border-t border-black/10 pt-10 md:mt-12 md:pt-12">
            <div className="space-y-10 md:space-y-12">
              {page.sections.map((section) => (
                <section key={section.heading} className="space-y-5 md:space-y-6">
                  <h2 className="font-display text-[2rem] font-semibold leading-tight md:text-4xl">{section.heading}</h2>
                  <div className="space-y-5">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-[15px] leading-7 text-black md:text-[1.04rem] md:leading-8" style={{ color: "#171717" }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <div className="mt-12 border-t border-black/10 pt-10 md:mt-14">
            <p className="text-xs uppercase tracking-[0.16em] text-black/60">Frequently Asked Questions</p>
            <div className="mt-6 divide-y divide-black/10 rounded-[1.6rem] border border-black/10 bg-white px-5 sm:rounded-[2rem] sm:px-6 md:px-8">
              {page.faq.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="cursor-pointer list-none pr-8 text-[15px] font-medium leading-7 text-black marker:hidden md:text-[1.03rem]" style={{ color: "#171717" }}>
                    {item.question}
                  </summary>
                  <p className="mt-3 max-w-3xl text-[15px] leading-7 text-black md:text-base md:leading-8" style={{ color: "#171717" }}>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </article>
      </div>

      <InternalLinkGrid
        title="Best Lists"
        kicker="Top Picks"
        items={relatedBest.map((item) => ({
          title: item.title,
          description: item.description,
          href: `/best/${item.slug}`,
          label: "Best"
        }))}
      />

      <InternalLinkGrid
        title="Review Pages"
        kicker="More Reviews"
        items={relatedReviews.map((product) => ({
          title: `${product.name} Review`,
          description: product.summary,
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
        title="Comparison Pages"
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
