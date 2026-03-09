import Image from "next/image";
import Link from "next/link";
import { resolveProductImageUrl } from "@/lib/generated-content-normalizers";
import type { ProductRecord } from "@/lib/site-data";

type Props = {
  product: ProductRecord;
  href?: string;
  ctaLabel?: string;
};

export function AffiliateProductCard({ product, href = `/reviews/${product.slug}`, ctaLabel = "Read Review" }: Props) {
  const imageUrl = resolveProductImageUrl(product);
  const reviewCount = new Intl.NumberFormat("en-US").format(product.reviewCount);

  return (
    <article className="group relative h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-[0_14px_34px_rgba(0,0,0,0.04)] transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-[0_22px_48px_rgba(0,0,0,0.08)]">
        <Link href={href} className="block">
          <div className={`relative aspect-[4/4.7] overflow-hidden bg-gradient-to-br ${product.tone} sm:aspect-[4/5]`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.92),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.5),rgba(255,255,255,0.14))]" />
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 90vw"
              quality={95}
              className="absolute inset-0 object-contain p-5 sm:p-6"
            />
            <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
              <span className="inline-flex items-center rounded-full border border-black/10 bg-white/92 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-black/68 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.16em]">
                {product.highlightLabel}
              </span>
            </div>
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1f6f43]/15 bg-[#f4f8f5] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#1f6f43] sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.16em]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1f6f43] sm:h-2 sm:w-2" aria-hidden="true" />
                In stock
              </span>
            </div>
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 md:group-hover:bg-black/8" />
            <div className="absolute inset-x-0 bottom-4 hidden justify-center opacity-0 transition-all duration-300 md:flex md:translate-y-2 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <span className="inline-flex min-h-[46px] items-center justify-center border border-white/70 bg-black/70 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                {ctaLabel}
              </span>
            </div>
          </div>
        </Link>

        <div className="flex h-full flex-col p-4 sm:p-5">
          <Link href={href} className="block">
            <p className="text-[11px] uppercase tracking-[0.16em] text-black/54">{product.brand}</p>
            <h3 className="mt-2 font-display text-[1.2rem] leading-[1] tracking-tight text-black sm:text-[1.3rem]">
              {product.name}
            </h3>
          </Link>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-black/72">
            <span className="inline-flex items-center gap-[1px] text-[#f59e0b]" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <span key={`${product.slug}-star-${starIndex}`} className="text-[12px] leading-none">
                  &#9733;
                </span>
              ))}
            </span>
            <span className="font-semibold text-black">{product.rating.toFixed(1)}/5</span>
            <span className="text-black/30" aria-hidden="true">
              |
            </span>
            <span className="text-[12px] text-black/60">{reviewCount} reviews</span>
          </div>

          <div className="mt-3 flex items-end justify-between gap-3 border-t border-black/8 pt-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-black/46">Price</p>
              <p className="mt-1 text-lg font-medium tracking-[0.03em] text-black">{product.priceRange}</p>
            </div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-black/46">{product.category}</p>
          </div>

          <div className="mt-4 md:hidden">
            <Link href={href} className="block min-h-[46px] w-full rounded-[14px] bg-black px-4 py-3.5 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-white sm:text-[11px] sm:tracking-[0.16em]">
              {ctaLabel}
            </Link>
          </div>

          <div className="mt-3 hidden md:block">
            <Link href={href} className="text-[11px] font-medium uppercase tracking-[0.16em] text-black/64 transition-colors hover:text-black">
              Read details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
