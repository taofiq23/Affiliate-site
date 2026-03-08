export default function DisclosurePage() {
  return (
    <section className="container-luxe py-16 md:py-24">
      <p className="kicker">Disclosure</p>
      <h1 className="mt-4 font-display text-5xl leading-[0.95] md:text-6xl">Affiliate Disclosure</h1>
      <p className="mt-6 max-w-3xl text-sm uppercase leading-relaxed tracking-[0.12em] text-secondary/70">
        Some outbound links on this site are affiliate links.
      </p>

      <div className="mt-10 space-y-6">
        <article className="border border-black/10 p-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-secondary/70">What It Means</h2>
          <p className="mt-3 text-sm leading-relaxed text-secondary/80">
            If a visitor clicks a qualifying retailer link and makes a purchase, Scent Picks may receive a commission from that retailer.
          </p>
        </article>
        <article className="border border-black/10 p-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-secondary/70">Cost To Visitors</h2>
          <p className="mt-3 text-sm leading-relaxed text-secondary/80">
            Affiliate commissions do not increase the price paid by the visitor. Pricing and checkout happen on the retailer website.
          </p>
        </article>
        <article className="border border-black/10 p-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-secondary/70">Editorial Independence</h2>
          <p className="mt-3 text-sm leading-relaxed text-secondary/80">
            Recommendations are still written as editorial opinions. Products may be featured, reordered, or removed when better options appear.
          </p>
        </article>
      </div>
    </section>
  );
}
