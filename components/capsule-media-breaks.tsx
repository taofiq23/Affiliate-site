import Link from "next/link";
import type { CategoryRecord, ComparisonRecord, GuideRecord } from "@/lib/site-data";

type Props = {
  comparisons: ComparisonRecord[];
  guides: GuideRecord[];
  categories: CategoryRecord[];
};

export function CapsuleMediaBreaks({ comparisons, guides, categories }: Props) {
  const leadComparisonHref = comparisons[0] ? `/compare/${comparisons[0].slug}` : "/best/top-picks";

  return (
    <>
      <section className="border-y border-black/10">
        <div className="relative h-[58vh] min-h-[400px] w-full sm:h-[64vh] sm:min-h-[460px] md:h-[84vh] md:min-h-[620px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,#2c5c8a_0%,transparent_35%),linear-gradient(160deg,#141821_0%,#1c2634_40%,#2c5c8a_100%)]" />
          <div className="media-overlay-soft absolute inset-0" />
          <div className="absolute bottom-7 left-0 right-0 sm:bottom-10 md:bottom-16">
            <div className="container-luxe">
              <p className="kicker-inverse">Start Here</p>
              <h2 className="mt-4 max-w-3xl font-display text-[2.3rem] leading-[0.94] text-base sm:text-5xl md:text-[96px]">
                Start with guides.
                <br className="hidden md:block" />
                Narrow with top picks.
              </h2>
              <Link href={leadComparisonHref} className="btn-hero-secondary mt-6 sm:mt-8 sm:h-11">
                View Popular Comparison
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 py-16 md:py-36">
        <div className="container-luxe grid gap-6 md:grid-cols-3 md:gap-8">
          <div>
            <p className="kicker">Buying Guides</p>
            <div className="mt-5 space-y-4 md:mt-6">
              {guides.map((guide) => (
                <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group block">
                  <article className="border border-black/10 p-5 transition-colors duration-200 hover:bg-[#faf9f5]">
                    <h3 className="font-display text-[1.8rem] leading-[0.96] md:text-2xl">{guide.title}</h3>
                    <p className="mt-3 text-[15px] leading-7 text-black/78">{guide.description}</p>
                    <span className="mt-4 inline-block text-xs uppercase tracking-[0.16em] text-black/76 group-hover:text-black">
                      Read Guide
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="kicker">Popular Comparisons</p>
            <div className="mt-5 space-y-4 md:mt-6">
              {comparisons.map((comparison) => (
                <Link key={comparison.slug} href={`/compare/${comparison.slug}`} className="group block">
                  <article className="border border-black/10 p-5 transition-colors duration-200 hover:bg-[#faf9f5]">
                    <h3 className="font-display text-[1.8rem] leading-[0.96] md:text-2xl">{comparison.title}</h3>
                    <p className="mt-3 text-[15px] leading-7 text-black/78">{comparison.description}</p>
                    <span className="mt-4 inline-block text-xs uppercase tracking-[0.16em] text-black/76 group-hover:text-black">
                      Read Comparison
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="kicker">Categories</p>
            <div className="mt-5 space-y-4 md:mt-6">
              {categories.map((category) => (
                <Link key={category.slug} href={`/category/${category.slug}`} className="group block">
                  <article className="border border-black/10 p-5 transition-colors duration-200 hover:bg-[#faf9f5]">
                    <h3 className="font-display text-[1.8rem] leading-[0.96] md:text-2xl">{category.title}</h3>
                    <p className="mt-3 text-[15px] leading-7 text-black/78">{category.description}</p>
                    <span className="mt-4 inline-block text-xs uppercase tracking-[0.16em] text-black/76 group-hover:text-black">
                      Browse Category
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
