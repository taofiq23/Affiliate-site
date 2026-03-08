"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type CapsuleCategory = "all" | "men" | "women";

type CapsuleProduct = {
  slug: string;
  name: string;
  category: Exclude<CapsuleCategory, "all">;
  size: string;
  price: string;
  tone: string;
};

const products: CapsuleProduct[] = [
  {
    slug: "velvet-oud",
    name: "Velvet Oud",
    category: "men",
    size: "100ml",
    price: "$220",
    tone: "from-[#e2d8c8] to-[#b59967]"
  },
  {
    slug: "amber-noir",
    name: "Amber Noir",
    category: "men",
    size: "90ml",
    price: "$195",
    tone: "from-[#dad0bf] to-[#9e7d49]"
  },
  {
    slug: "rose-ombre",
    name: "Rose Ombre",
    category: "women",
    size: "75ml",
    price: "$175",
    tone: "from-[#eadfda] to-[#b58e78]"
  },
  {
    slug: "midnight-musk",
    name: "Midnight Musk",
    category: "women",
    size: "100ml",
    price: "$205",
    tone: "from-[#dbd7d0] to-[#7f776b]"
  },
  {
    slug: "noir-reserve",
    name: "Noir Reserve",
    category: "men",
    size: "100ml",
    price: "$235",
    tone: "from-[#ddd5c6] to-[#8f7752]"
  },
  {
    slug: "golden-veil",
    name: "Golden Veil",
    category: "women",
    size: "90ml",
    price: "$210",
    tone: "from-[#e8ddd4] to-[#a47c66]"
  },
  {
    slug: "lunar-smoke",
    name: "Lunar Smoke",
    category: "men",
    size: "75ml",
    price: "$185",
    tone: "from-[#d9cfbe] to-[#8d6f43]"
  },
  {
    slug: "velour-iris",
    name: "Velour Iris",
    category: "women",
    size: "75ml",
    price: "$190",
    tone: "from-[#dfd9d0] to-[#8e8478]"
  },
  {
    slug: "obsidian-tonka",
    name: "Obsidian Tonka",
    category: "men",
    size: "100ml",
    price: "$240",
    tone: "from-[#d8d0c2] to-[#6f5b3b]"
  },
  {
    slug: "silk-amber",
    name: "Silk Amber",
    category: "women",
    size: "90ml",
    price: "$225",
    tone: "from-[#eadfcd] to-[#ae8a61]"
  },
  {
    slug: "black-saffron",
    name: "Black Saffron",
    category: "men",
    size: "75ml",
    price: "$198",
    tone: "from-[#ddd2c0] to-[#806645]"
  },
  {
    slug: "velvet-rose",
    name: "Velvet Rose",
    category: "women",
    size: "100ml",
    price: "$230",
    tone: "from-[#ead7d3] to-[#9c7464]"
  }
];

export function CapsuleCollection() {
  const [activeTab, setActiveTab] = useState<CapsuleCategory>("all");

  const visibleProducts = useMemo(() => {
    if (activeTab === "all") {
      return products;
    }
    return products.filter((item) => item.category === activeTab);
  }, [activeTab]);

  return (
    <section className="py-16 md:py-24">
      <div className="px-5 md:px-10">
        <div className="mb-12 border-b border-black/10 pb-10 text-center">
          <div className="mx-auto max-w-4xl">
            <p className="kicker text-xs tracking-[0.25em] text-black/60">EDITOR'S TOP PICKS</p>
            <h2 className="mt-4 font-display text-4xl leading-[0.95] md:text-5xl">Explore The Reviews</h2>
            <p className="mx-auto mt-6 max-w-xl text-xs uppercase leading-relaxed tracking-[0.08em] text-black/50">
              Compare the highest-conviction picks by audience, bottle size, and current partner pricing
            </p>
          </div>
        </div>

        <div className="mb-12 flex flex-wrap items-center justify-center gap-10 border-b border-black/10 pb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-2 text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
              activeTab === "all"
                ? "border-b border-black text-black"
                : "text-black/40 hover:text-black"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("men")}
            className={`pb-2 text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
              activeTab === "men"
                ? "border-b border-black text-black"
                : "text-black/40 hover:text-black"
            }`}
          >
            For Him
          </button>
          <button
            onClick={() => setActiveTab("women")}
            className={`pb-2 text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
              activeTab === "women"
                ? "border-b border-black text-black"
                : "text-black/40 hover:text-black"
            }`}
          >
            For Her
          </button>
        </div>

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {visibleProducts.map((product) => (
            <article key={product.slug} className="group relative">
              <div className="relative overflow-hidden">
                <Link href={`/product/${product.slug}`} className="luxe-image block">
                  <div className={`relative aspect-[4/5] bg-gradient-to-b ${product.tone} transition-all duration-500 md:group-hover:scale-105`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/90">
                          {product.category === 'men' ? 'HIM' : 'HER'}
                        </span>
                        <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/90">
                          {product.size}
                        </span>
                      </div>
                    </div>
                    {/* Hover overlay with details */}
                    <div className="absolute inset-0 bg-black/15 transition-all duration-300 md:bg-black/0 md:group-hover:bg-black/40">
                      <div className="absolute inset-0 hidden items-center justify-center opacity-0 transition-all duration-300 md:flex md:group-hover:opacity-100">
                        <div className="text-center p-6">
                          <div className="mb-4">
                            <span className="inline-block border border-white/50 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white">
                              See Review
                            </span>
                          </div>
                          <p className="text-xs uppercase tracking-[0.15em] text-white/90 mt-4">
                            {product.category === 'men' ? 'Top pick for him' : 'Top pick for her'}
                          </p>
                        </div>
                      </div>
                      <p className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.14em] text-white/95 md:hidden">
                        {product.category === "men" ? "Top pick for him" : "Top pick for her"}
                      </p>
                    </div>
                  </div>
                </Link>
                {/* Always visible product info */}
                <div className="mt-4 text-center">
                  <p className="font-display text-xl tracking-tight">{product.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-black/50">
                    {product.category === 'men' ? 'Partner pick for him' : 'Partner pick for her'}
                  </p>
                  <p className="mt-2 text-sm font-medium tracking-[0.08em]">
                    From {product.price}
                  </p>
                </div>
                <div className="mt-4 md:hidden">
                  <Link
                    href={`/product/${product.slug}`}
                    className="block w-full bg-black py-3 text-center text-xs uppercase tracking-[0.15em] text-white"
                  >
                    Read Review
                  </Link>
                </div>
                {/* Hidden button that appears on hover */}
                <div className="absolute bottom-0 left-0 right-0 hidden translate-y-full opacity-0 transition-all duration-300 md:block md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <Link
                    href={`/product/${product.slug}`}
                    className="block w-full bg-black py-3 text-center text-xs uppercase tracking-[0.15em] text-white transition-all hover:bg-black/90"
                  >
                    Read Review
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
