import Link from "next/link";
import type { ProductRecord } from "@/lib/site-data";

type Props = {
  product: ProductRecord;
  href?: string;
  ctaLabel?: string;
};

export function AffiliateProductCard({ product, href = `/reviews/${product.slug}`, ctaLabel = "Read Review" }: Props) {
  return (
    <article className="group relative">
      <div className="relative overflow-hidden">
        <Link href={href} className="luxe-image block">
          <div className={`relative aspect-[4/5] bg-gradient-to-b ${product.tone} transition-all duration-500 md:group-hover:scale-105`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/90">{product.highlightLabel}</span>
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/90">{product.priceRange}</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/15 transition-all duration-300 md:bg-black/0 md:group-hover:bg-black/40">
              <div className="absolute inset-0 hidden items-center justify-center opacity-0 transition-all duration-300 md:flex md:group-hover:opacity-100">
                <div className="text-center p-6">
                  <div className="mb-4">
                    <span className="inline-block border border-white/50 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white">
                      {ctaLabel}
                    </span>
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.15em] text-white/90">{product.category}</p>
                </div>
              </div>
              <p className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.14em] text-white/95 md:hidden">{product.category}</p>
            </div>
          </div>
        </Link>
        <div className="mt-4 text-center">
          <p className="font-display text-xl tracking-tight">{product.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-black/50">{product.brand}</p>
          <p className="mt-2 text-sm font-medium tracking-[0.08em]">{product.priceRange}</p>
        </div>
        <div className="mt-4 md:hidden">
          <Link href={href} className="block w-full bg-black py-3 text-center text-xs uppercase tracking-[0.15em] text-white">
            {ctaLabel}
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 hidden translate-y-full opacity-0 transition-all duration-300 md:block md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <Link href={href} className="block w-full bg-black py-3 text-center text-xs uppercase tracking-[0.15em] text-white transition-all hover:bg-black/90">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
