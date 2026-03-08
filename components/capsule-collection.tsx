"use client";

import { useMemo, useState } from "react";
import { AffiliateProductCard } from "@/components/affiliate-product-card";
import type { ProductRecord } from "@/lib/site-data";

type Filter = "all" | "featured" | "value" | "premium";
type Props = {
  products: ProductRecord[];
};

export function CapsuleCollection({ products }: Props) {
  const [activeTab, setActiveTab] = useState<Filter>("all");

  const visibleProducts = useMemo(() => {
    if (activeTab === "all") {
      return products;
    }

    if (activeTab === "featured") {
      return products.filter((item) => item.tags.includes("featured") || item.tags.includes("editor-choice"));
    }

    if (activeTab === "value") {
      return products.filter((item) => item.tags.includes("value") || item.tags.includes("starter"));
    }

    return products.filter((item) => item.tags.includes("premium") || item.tags.includes("performance"));
  }, [activeTab, products]);

  return (
    <section className="py-16 md:py-24">
      <div className="px-5 md:px-10">
        <div className="mb-12 border-b border-black/10 pb-10 text-center">
          <div className="mx-auto max-w-4xl">
            <p className="kicker text-xs tracking-[0.25em] text-black/60">TOP PICKS AND FEATURED REVIEWS</p>
            <h2 className="mt-4 font-display text-4xl leading-[0.95] md:text-5xl">Explore Commercial Content Paths</h2>
            <p className="mx-auto mt-6 max-w-xl text-xs uppercase leading-relaxed tracking-[0.08em] text-black/50">
              Browse review-ready products, move into the right comparison pages, and send readers toward affiliate offers at the point of highest intent
            </p>
          </div>
        </div>

        <div className="mb-12 flex flex-wrap items-center justify-center gap-10 border-b border-black/10 pb-6">
          {[
            { id: "all", label: "All" },
            { id: "featured", label: "Featured" },
            { id: "value", label: "Best Value" },
            { id: "premium", label: "Premium" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Filter)}
              className={`pb-2 text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                activeTab === item.id ? "border-b border-black text-black" : "text-black/40 hover:text-black"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {visibleProducts.map((product) => (
            <AffiliateProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
