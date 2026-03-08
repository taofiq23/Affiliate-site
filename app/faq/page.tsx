export default function FaqPage() {
  return (
    <section className="container-luxe py-16 md:py-24">
      <p className="kicker">FAQ</p>
      <h1 className="mt-4 font-display text-5xl leading-[0.95] md:text-6xl">Frequently Asked Questions</h1>
      <p className="mt-6 max-w-3xl text-sm uppercase leading-relaxed tracking-[0.12em] text-secondary/70">
        Quick answers about our recommendations, affiliate links, and how prices are shown.
      </p>

      <div className="mt-10 border-t border-black/10">
        <details className="border-b border-black/10 py-4">
          <summary className="cursor-pointer text-xs uppercase tracking-[0.2em] text-secondary/75">
            How does this site make money?
          </summary>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-secondary/80">
            Some outbound retailer links are affiliate links. If a visitor buys through one of those links, the site may earn a commission.
          </p>
        </details>
        <details className="border-b border-black/10 py-4">
          <summary className="cursor-pointer text-xs uppercase tracking-[0.2em] text-secondary/75">
            Do affiliate links change the price?
          </summary>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-secondary/80">
            No. The commission is paid by the retailer and does not add extra cost for the visitor.
          </p>
        </details>
        <details className="border-b border-black/10 py-4">
          <summary className="cursor-pointer text-xs uppercase tracking-[0.2em] text-secondary/75">
            Are prices updated in real time?
          </summary>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-secondary/80">
            Not always. Prices are reviewed regularly, but the retailer page is the final source of truth before purchase.
          </p>
        </details>
        <details className="border-b border-black/10 py-4">
          <summary className="cursor-pointer text-xs uppercase tracking-[0.2em] text-secondary/75">
            Do you sell products directly?
          </summary>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-secondary/80">
            No. Scent Picks is a content and referral site. All transactions happen on the retailer's website.
          </p>
        </details>
      </div>
    </section>
  );
}

