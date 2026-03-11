import Image from "next/image";
import Link from "next/link";
import { resolveProductImageUrl } from "@/lib/generated-content-normalizers";
import type { ProductRecord } from "@/lib/site-data";

type Props = {
  heroKicker: string;
  heroTitle: string;
  heroDescription: string;
  products: ProductRecord[];
};

function HeroImageRail({ products }: { products: ProductRecord[] }) {
  const leadProducts = products.slice(0, 6);
  const upperRail = [...leadProducts, ...leadProducts];
  const lowerRail = [...leadProducts.slice().reverse(), ...leadProducts.slice().reverse()];

  return (
    <div className="pointer-events-none absolute inset-y-7 right-4 hidden w-[42%] overflow-hidden md:block lg:right-6 lg:w-[44%]">
      <div className="absolute inset-0 rounded-[28px] border border-white/12 bg-white/6 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_left,rgba(20,19,17,0.12),rgba(20,19,17,0)_18%,rgba(20,19,17,0)_82%,rgba(20,19,17,0.2))]" />

      <div className="absolute left-5 right-5 top-7">
        <div className="hero-rail-track hero-rail-track-top">
          {upperRail.map((product, index) => (
            <article
              key={`top-${product.slug}-${index}`}
              className="hero-rail-card w-[182px] shrink-0 rounded-[26px] border border-white/15 bg-[rgba(255,255,255,0.1)] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur-sm"
            >
              <div className={`relative aspect-[4/4.5] overflow-hidden rounded-[20px] bg-gradient-to-br ${product.tone}`}>
                <Image
                  src={resolveProductImageUrl(product)}
                  alt={product.name}
                  fill
                  sizes="182px"
                  quality={95}
                  className="object-contain p-4"
                />
              </div>
              <p className="mt-3 truncate text-[10px] uppercase tracking-[0.18em] text-white/70">{product.category}</p>
              <p className="mt-2 line-clamp-2 text-sm leading-snug text-white">{product.name}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="absolute bottom-7 left-5 right-5">
        <div className="hero-rail-track hero-rail-track-bottom">
          {lowerRail.map((product, index) => (
            <article
              key={`bottom-${product.slug}-${index}`}
              className="hero-rail-card w-[168px] shrink-0 rounded-[24px] border border-white/12 bg-[rgba(255,255,255,0.08)] p-3 shadow-[0_18px_46px_rgba(0,0,0,0.22)] backdrop-blur-sm"
            >
              <div className="relative aspect-[4/4] overflow-hidden rounded-[18px] bg-white/90">
                <Image
                  src={resolveProductImageUrl(product)}
                  alt={product.name}
                  fill
                  sizes="168px"
                  quality={95}
                  className="object-contain p-3"
                />
              </div>
              <p className="mt-3 truncate text-[10px] uppercase tracking-[0.18em] text-white/70">{product.brand}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CapsulePageFlow({ heroKicker, heroTitle, heroDescription, products }: Props) {
  return (
    <>
      <section className="relative border-b border-black/10">
        <div className="relative h-[66svh] min-h-[440px] w-full sm:h-[64vh] sm:min-h-[480px] md:h-[68vh] md:min-h-[530px]">
          <div className="hero-surface absolute inset-0" />
          <HeroImageRail products={products} />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="absolute bottom-5 left-0 right-0 sm:bottom-6 md:bottom-10">
          <div className="container-luxe">
            <p className="kicker-inverse">{heroKicker}</p>
            <h1 className="mt-3 max-w-4xl font-display text-[33px] leading-[0.96] text-base sm:mt-4 sm:text-[40px] md:text-[86px]">{heroTitle}</h1>
            <p className="mt-4 max-w-xl text-[10px] uppercase leading-relaxed tracking-[0.18em] text-white/80 sm:max-w-2xl sm:text-[11px] sm:tracking-[0.22em] md:text-[12px]">
              Product reviews, best lists, comparison pages, and buying guides for coffee gear, kitchen appliances, and everyday home upgrades.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center">
              <Link href="/best/top-picks" className="btn-hero-primary w-full sm:w-auto">
                Explore Top Picks
              </Link>
              <Link href="/guides/product-buying-guide" className="btn-hero-secondary w-full sm:w-auto">
                Open Buying Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-base-2 py-8 md:py-12">
        <div className="container-luxe text-center">
          <p className="mx-auto max-w-5xl text-[15px] leading-7 text-secondary/80 md:text-[15px]">{heroDescription}</p>
        </div>
      </section>
    </>
  );
}
