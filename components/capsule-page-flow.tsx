export function CapsulePageFlow() {
  return (
    <>
      <section className="relative border-b border-black/10">
        <div className="relative h-[62vh] min-h-[450px] w-full md:h-[68vh] md:min-h-[530px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,#6d6354_0%,transparent_42%),linear-gradient(135deg,#2e2a24_0%,#141311_40%,#5c4f3a_100%)]" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="absolute bottom-6 left-0 right-0 md:bottom-10">
          <div className="container-luxe">
            <p className="kicker text-base/82">Affiliate Fragrance Guide</p>
            <h1 className="mt-4 max-w-4xl font-display text-[40px] leading-[0.94] text-base md:text-[86px]">
              Scent Picks
              <br className="hidden md:block" />
              Worth Clicking
            </h1>
            <p className="mt-4 max-w-xl text-[10px] uppercase tracking-[0.28em] text-base/82 md:text-[11px]">
              Updated March 2026
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-base-2 py-10 md:py-12">
        <div className="container-luxe text-center">
          <p className="mx-auto max-w-5xl text-sm leading-relaxed text-secondary/80 md:text-[15px]">
            We review standout perfumes, compare partner pricing, and explain who each scent fits before sending visitors to a retailer.
            The result is a cleaner affiliate experience built around trust, not catalog bloat.
          </p>
        </div>
      </section>
    </>
  );
}
