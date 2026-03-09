import { JsonLd } from "@/components/json-ld";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { getBestLists, getComparisons, getProducts, type GuideRecord } from "@/lib/content-store";
import { resolveProductImageUrl } from "@/lib/generated-content-normalizers";
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

        <article className="mx-auto mt-6 max-w-5xl" style={{ color: "#171717" }}>
          <div className="grid gap-8 md:grid-cols-[minmax(320px,0.86fr)_minmax(0,1.14fr)] md:items-center md:gap-10">
            <div className="luxe-image relative aspect-[4/4.6] overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-[#efe8dc] via-[#ddc9aa] to-[#9b7a4b] sm:aspect-[4/5] sm:rounded-[2rem]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.75),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.18),rgba(0,0,0,0.08))]" />
              <div className="absolute left-[10%] top-[11%] h-[34%] w-[56%] rounded-[1.6rem] border border-white/50 bg-white/82 shadow-[0_24px_70px_rgba(53,33,4,0.16)]" />
              <div className="absolute right-[11%] top-[24%] h-[24%] w-[34%] rounded-[1.4rem] border border-black/8 bg-[#f7f1e7]/90 shadow-[0_18px_45px_rgba(53,33,4,0.10)]" />
              <div className="absolute bottom-[13%] left-[14%] h-[26%] w-[64%] rounded-[1.8rem] border border-black/8 bg-white/86 shadow-[0_24px_70px_rgba(53,33,4,0.14)]" />
              <div className="absolute left-[18%] top-[18%] text-[0.58rem] uppercase tracking-[0.3em] text-[#8a6f49]">Guide Overview</div>
              <div className="absolute left-[18%] top-[25%] h-[0.3rem] w-[34%] rounded-full bg-[#9d7d4d]" />
              <div className="absolute left-[18%] top-[31%] h-[0.3rem] w-[24%] rounded-full bg-[#d5c0a1]" />
              <div className="absolute left-[18%] top-[38%] h-[0.3rem] w-[29%] rounded-full bg-[#e4d8c5]" />
              <div className="absolute right-[18%] top-[31%] text-[0.55rem] uppercase tracking-[0.24em] text-[#7d6240]">Checklist</div>
              <div className="absolute right-[18%] top-[38%] h-[0.28rem] w-[16%] rounded-full bg-[#b38f5f]" />
              <div className="absolute right-[18%] top-[43%] h-[0.28rem] w-[20%] rounded-full bg-[#ddc7aa]" />
              <div className="absolute left-[22%] bottom-[29%] text-[0.55rem] uppercase tracking-[0.24em] text-[#8a6f49]">Compare, Shortlist, Decide</div>
              <div className="absolute left-[22%] bottom-[23%] h-[0.3rem] w-[40%] rounded-full bg-[#9f7e4e]" />
              <div className="absolute left-[22%] bottom-[18%] h-[0.3rem] w-[31%] rounded-full bg-[#dfd2be]" />
              <div className="absolute left-[22%] bottom-[13%] h-[0.3rem] w-[24%] rounded-full bg-[#eadfcd]" />
            </div>

            <div>
              <p className="kicker">Buying Guide</p>
              <h1 className="section-title mt-4">{page.title}</h1>
              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-black md:mt-6 md:text-lg md:leading-8" style={{ color: "#171717" }}>
                {page.description}
              </p>
            </div>
          </div>

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
