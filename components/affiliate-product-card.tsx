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

  return (
    <article className="group relative">
      <div className="relative overflow-hidden">
        <Link href={href} className="luxe-image block">
          <div className={`relative aspect-[4/4.7] bg-gradient-to-b ${product.tone} transition-all duration-500 sm:aspect-[4/5] md:group-hover:scale-105`}>
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 90vw"
              quality={95}
              className="absolute inset-0 object-contain p-4 sm:p-6"
            />
            <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-[#1f6f43]/15 bg-[#f4f8f5] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#1f6f43] sm:left-4 sm:top-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.16em]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1f6f43] sm:h-2 sm:w-2" aria-hidden="true" />
              Usually in stock
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-medium uppercase tracking-[0.13em] text-white/92 sm:text-xs sm:tracking-[0.15em]">{product.highlightLabel}</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.13em] text-white/92 sm:text-xs sm:tracking-[0.15em]">{product.priceRange}</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/15 transition-all duration-300 md:bg-black/0 md:group-hover:bg-black/40">
              <div className="absolute inset-0 hidden items-center justify-center opacity-0 transition-all duration-300 md:flex md:group-hover:opacity-100">
                <div className="text-center p-6">
                  <div className="mb-4">
                    <span className="inline-flex min-h-[48px] items-center justify-center border border-white/70 bg-black/55 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white">
                      {ctaLabel}
                    </span>
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.15em] text-white/90">{product.category}</p>
                </div>
              </div>
              <p className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.13em] text-white/95 sm:bottom-4 sm:left-4 sm:text-xs sm:tracking-[0.14em] md:hidden">{product.category}</p>
            </div>
          </div>
        </Link>
        <Link href={href} className="mt-4 block text-center">
          <p className="font-display text-[1.2rem] tracking-tight sm:text-xl">{product.name}</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.13em] text-black/66 sm:text-xs sm:tracking-[0.15em]">{product.brand}</p>
          <p className="mt-2 text-sm font-medium tracking-[0.06em] sm:tracking-[0.08em]">{product.priceRange}</p>
        </Link>
        <div className="mt-4 md:hidden">
          <Link href={href} className="block min-h-[46px] w-full bg-black px-4 py-3.5 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-white sm:text-[11px] sm:tracking-[0.16em]">
            {ctaLabel}
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 hidden translate-y-full opacity-0 transition-all duration-300 md:block md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <Link href={href} className="block w-full bg-black py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-all hover:bg-black/90">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
