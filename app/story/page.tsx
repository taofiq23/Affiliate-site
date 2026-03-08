export default function StoryPage() {
  return (
    <section className="bg-base-2 py-16 md:py-24">
      <div className="container-luxe grid gap-12 md:grid-cols-2 md:items-center">
        <div className="luxe-image">
          <div className="aspect-[4/5] bg-gradient-to-b from-[#dfd2be] via-[#c3ab80] to-[#7b6540]" />
        </div>
        <div>
          <p className="kicker">Our Method</p>
          <h1 className="section-title mt-4">How Scent Picks Chooses Products</h1>
          <p className="mt-6 text-sm uppercase leading-relaxed tracking-[0.14em] text-secondary/72">
            Scent Picks is an affiliate-first editorial site. We shortlist fragrances
            based on scent profile, wear time, value by bottle size, and how often
            each recommendation solves a real buying problem.
          </p>
          <p className="mt-4 text-sm uppercase leading-relaxed tracking-[0.14em] text-secondary/72">
            The site avoids fake cart flows and account clutter. Each page is built
            to answer the main question quickly, then move the visitor to a retailer
            with clear affiliate disclosure.
          </p>
        </div>
      </div>
    </section>
  );
}
