import Link from "next/link";

const collection = [
  { slug: "velvet-oud", name: "Velvet Oud", family: "Woody Oriental", price: "$220" },
  { slug: "amber-noir", name: "Amber Noir", family: "Amber Spicy", price: "$195" },
  { slug: "rose-ombre", name: "Rose Ombre", family: "Floral Smoke", price: "$175" },
  { slug: "midnight-musk", name: "Midnight Musk", family: "Musk Leather", price: "$205" }
];

export default function CollectionPage() {
  return (
    <section className="min-h-screen bg-white py-24 md:py-32">
      <div className="container-luxe">
        <div className="mb-20 text-center">
          <p className="kicker text-xs tracking-[0.3em] text-black/60">EDITORIAL SHORTLIST</p>
          <h1 className="mt-6 font-display text-6xl leading-[0.9] md:text-8xl">Top Fragrance Picks</h1>
          <p className="mx-auto mt-8 max-w-2xl text-sm uppercase leading-relaxed tracking-[0.1em] text-black/50">
            Compare the bottles we recommend most often, then open the review page for notes, wear, and partner pricing
          </p>
        </div>

        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {collection.map((item) => (
            <article key={item.slug} className="group relative">
              <div className="relative overflow-hidden">
                <Link href={`/product/${item.slug}`} className="luxe-image block">
                  <div className="aspect-[3/4] bg-gradient-to-b from-[#ece1d0] to-[#b3925c] transition-all duration-500 md:group-hover:scale-105">
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/15 transition-all duration-300 md:bg-black/0 md:group-hover:bg-black/40">
                      <div className="absolute inset-0 hidden items-center justify-center opacity-0 transition-all duration-300 md:flex md:group-hover:opacity-100">
                        <div className="text-center p-6">
                          <div className="mb-4">
                            <span className="inline-block border border-white/50 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white">
                              Read Review
                            </span>
                          </div>
                          <p className="text-xs uppercase tracking-[0.15em] text-white/90 mt-4">
                            {item.family}
                          </p>
                        </div>
                      </div>
                      <p className="absolute bottom-4 left-4 text-[11px] uppercase tracking-[0.14em] text-white/95 md:hidden">
                        {item.family}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="mt-6 text-center">
                  <p className="font-display text-2xl tracking-tight">{item.name}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-black/50">{item.family}</p>
                  <p className="mt-3 text-sm font-medium tracking-[0.1em]">From {item.price}</p>
                </div>
                <div className="mt-4 md:hidden">
                  <Link
                    href={`/product/${item.slug}`}
                    className="block w-full bg-black py-3 text-center text-xs uppercase tracking-[0.2em] text-white"
                  >
                    Read Review
                  </Link>
                </div>
                {/* Hidden button that appears on hover */}
                <div className="absolute bottom-0 left-0 right-0 hidden translate-y-full opacity-0 transition-all duration-300 md:block md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <Link
                    href={`/product/${item.slug}`}
                    className="block w-full bg-black py-3 text-center text-xs uppercase tracking-[0.2em] text-white transition-all hover:bg-black/90"
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
