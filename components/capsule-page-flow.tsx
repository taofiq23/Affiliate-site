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
    <div className="pointer-events-none absolute inset-y-4 right-3 w-[44%] overflow-hidden sm:inset-y-6 sm:right-4 sm:w-[40%] md:inset-y-7 md:right-4 md:w-[42%] lg:right-6 lg:w-[44%]">
      <div className="absolute inset-0 rounded-[22px] border border-white/12 bg-white/6 backdrop-blur-[2px] md:rounded-[28px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_left,rgba(20,19,17,0.12),rgba(20,19,17,0)_18%,rgba(20,19,17,0)_82%,rgba(20,19,17,0.2))]" />

      <div className="absolute left-3 right-3 top-4 sm:left-4 sm:right-4 sm:top-5 md:left-5 md:right-5 md:top-7">
        <div className="hero-rail-track hero-rail-track-top">
          {upperRail.map((product, index) => (
            <article
              key={`top-${product.slug}-${index}`}
              className="hero-rail-card w-[96px] shrink-0 rounded-[16px] border border-white/15 bg-[rgba(255,255,255,0.1)] p-2 shadow-[0_16px_34px_rgba(0,0,0,0.24)] backdrop-blur-sm sm:w-[128px] sm:rounded-[20px] sm:p-3 md:w-[182px] md:rounded-[26px] md:p-4 md:shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
            >
              <div className={`relative aspect-[4/4.5] overflow-hidden rounded-[12px] bg-gradient-to-br ${product.tone} sm:rounded-[15px] md:rounded-[20px]`}>
                <Image
                  src={resolveProductImageUrl(product)}
                  alt={product.name}
                  fill
                  sizes="(min-width: 768px) 182px, (min-width: 640px) 128px, 96px"
                  quality={95}
                  className="object-contain p-2 sm:p-3 md:p-4"
                />
              </div>
              <p className="mt-2 truncate text-[7px] uppercase tracking-[0.16em] text-white/70 sm:text-[8px] md:mt-3 md:text-[10px] md:tracking-[0.18em]">{product.category}</p>
              <p className="mt-1 line-clamp-2 text-[10px] leading-[1.1] text-white sm:text-[11px] md:mt-2 md:text-sm md:leading-snug">{product.name}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-3 right-3 sm:bottom-5 sm:left-4 sm:right-4 md:bottom-7 md:left-5 md:right-5">
        <div className="hero-rail-track hero-rail-track-bottom">
          {lowerRail.map((product, index) => (
            <article
              key={`bottom-${product.slug}-${index}`}
              className="hero-rail-card w-[88px] shrink-0 rounded-[14px] border border-white/12 bg-[rgba(255,255,255,0.08)] p-2 shadow-[0_12px_28px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:w-[116px] sm:rounded-[18px] sm:p-2.5 md:w-[168px] md:rounded-[24px] md:p-3 md:shadow-[0_18px_46px_rgba(0,0,0,0.22)]"
            >
              <div className="relative aspect-[4/4] overflow-hidden rounded-[10px] bg-white/90 sm:rounded-[14px] md:rounded-[18px]">
                <Image
                  src={resolveProductImageUrl(product)}
                  alt={product.name}
                  fill
                  sizes="(min-width: 768px) 168px, (min-width: 640px) 116px, 88px"
                  quality={95}
                  className="object-contain p-2 sm:p-2.5 md:p-3"
                />
              </div>
              <p className="mt-2 truncate text-[7px] uppercase tracking-[0.16em] text-white/70 sm:text-[8px] md:mt-3 md:text-[10px] md:tracking-[0.18em]">{product.brand}</p>
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
        <div className="relative h-[68svh] min-h-[500px] w-full sm:h-[68vh] sm:min-h-[540px] md:h-[68vh] md:min-h-[530px]">
          <div className="hero-surface absolute inset-0" />
          <HeroImageRail products={products} />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="absolute bottom-5 left-0 right-0 sm:bottom-6 md:bottom-10">
          <div className="container-luxe">
            <p className="kicker-inverse">{heroKicker}</p>
            <h1 className="mt-3 max-w-[60%] font-display text-[25px] leading-[0.98] text-base sm:mt-4 sm:max-w-2xl sm:text-[40px] md:max-w-4xl md:text-[86px]">{heroTitle}</h1>
            <p className="mt-4 max-w-[60%] text-[9px] uppercase leading-relaxed tracking-[0.16em] text-white/80 sm:max-w-2xl sm:text-[11px] sm:tracking-[0.22em] md:max-w-xl md:text-[12px]">
              Product reviews, best lists, comparison pages, and buying guides for coffee gear, kitchen appliances, and everyday home upgrades.
            </p>
            <div className="mt-6 flex max-w-[60%] flex-col gap-3 sm:mt-7 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center">
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
