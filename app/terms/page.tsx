import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms and Conditions",
  description: "Terms covering editorial content, retailer responsibility, and affiliate relationships.",
  pathname: "/terms"
});

export default function TermsPage() {
  return (
    <section className="container-luxe py-16 md:py-24">
      <p className="kicker">Legal</p>
      <h1 className="mt-4 font-display text-5xl leading-[0.95] md:text-6xl">Terms & Conditions</h1>
      <p className="mt-6 max-w-3xl text-sm uppercase leading-relaxed tracking-[0.12em] text-secondary/70">
        By using this site, you agree to the following content and referral terms.
      </p>

      <div className="mt-10 space-y-6">
        <article className="border border-black/10 p-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-secondary/70">Editorial Content</h2>
          <p className="mt-3 text-sm leading-relaxed text-secondary/80">
            Product opinions, rankings, and comparisons are editorial judgments. They are provided for informational purposes and can change without notice.
          </p>
        </article>
        <article className="border border-black/10 p-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-secondary/70">Retailer Responsibility</h2>
          <p className="mt-3 text-sm leading-relaxed text-secondary/80">
            Final pricing, shipping, returns, stock, and checkout are handled by third-party retailers, not by this site.
          </p>
        </article>
        <article className="border border-black/10 p-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-secondary/70">Affiliate Relationships</h2>
          <p className="mt-3 text-sm leading-relaxed text-secondary/80">
            Some links are affiliate links. We may earn a commission when qualifying purchases occur after a referral click.
          </p>
        </article>
      </div>
    </section>
  );
}

