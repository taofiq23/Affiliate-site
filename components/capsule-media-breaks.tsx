import Link from "next/link";
import { getCategory, getComparison, getGuide, homepageData } from "@/lib/site-data";

const comparisons = homepageData.popularComparisonSlugs
  .map((slug) => getComparison(slug))
  .filter((item): item is NonNullable<ReturnType<typeof getComparison>> => Boolean(item));
const guides = homepageData.featuredGuideSlugs
  .map((slug) => getGuide(slug))
  .filter((item): item is NonNullable<ReturnType<typeof getGuide>> => Boolean(item));
const categories = homepageData.categorySlugs
  .map((slug) => getCategory(slug))
  .filter((item): item is NonNullable<ReturnType<typeof getCategory>> => Boolean(item));

export function CapsuleMediaBreaks() {
  return (
    <>
      <section className="border-y border-black/10">
        <div className="relative h-[84vh] min-h-[620px] w-full">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,#7e6a46_0%,transparent_35%),linear-gradient(160deg,#161411_0%,#221f1b_35%,#5b4a34_100%)]" />
          <div className="media-overlay-soft absolute inset-0" />
          <div className="absolute bottom-10 left-0 right-0 md:bottom-16">
            <div className="container-luxe">
              <p className="kicker text-base/80">Homepage Structure</p>
              <h2 className="mt-4 max-w-3xl font-display text-5xl leading-[0.92] text-base md:text-[96px]">
                Guides Feed Best Lists.
                <br className="hidden md:block" />
                Best Lists Feed Reviews.
              </h2>
              <Link
                href="/compare/atlas-one-vs-northstar-pro"
                className="mt-8 inline-flex h-11 items-center justify-center border border-base/80 px-6 text-[10px] uppercase tracking-[0.24em] text-base"
              >
                View Popular Comparison
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 py-24 md:py-36">
        <div className="container-luxe grid gap-8 md:grid-cols-3">
          <div>
            <p className="kicker">Buying Guides</p>
            <div className="mt-6 space-y-4">
              {guides.map((guide) => (
                <article key={guide.slug} className="border border-black/10 p-5">
                  <h3 className="font-display text-2xl leading-[0.96]">{guide.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary/72">{guide.description}</p>
                  <Link href={`/guides/${guide.slug}`} className="mt-4 inline-block text-xs uppercase tracking-[0.16em] text-black/70 hover:text-black">
                    Open Guide
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <div>
            <p className="kicker">Popular Comparisons</p>
            <div className="mt-6 space-y-4">
              {comparisons.map((comparison) => (
                <article key={comparison.slug} className="border border-black/10 p-5">
                  <h3 className="font-display text-2xl leading-[0.96]">{comparison.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary/72">{comparison.description}</p>
                  <Link href={`/compare/${comparison.slug}`} className="mt-4 inline-block text-xs uppercase tracking-[0.16em] text-black/70 hover:text-black">
                    Open Comparison
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <div>
            <p className="kicker">Categories</p>
            <div className="mt-6 space-y-4">
              {categories.map((category) => (
                <article key={category.slug} className="border border-black/10 p-5">
                  <h3 className="font-display text-2xl leading-[0.96]">{category.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary/72">{category.description}</p>
                  <Link href={`/category/${category.slug}`} className="mt-4 inline-block text-xs uppercase tracking-[0.16em] text-black/70 hover:text-black">
                    Open Category
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
