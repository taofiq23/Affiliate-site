import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Contact page for editorial corrections, partnership questions, and affiliate framework inquiries.",
  pathname: "/contact"
});

export default function ContactPage() {
  return (
    <section className="container-luxe py-16 md:py-24">
      <p className="kicker">Contact</p>
      <h1 className="mt-4 font-display text-5xl leading-[0.95] md:text-6xl">Get In Touch</h1>
      <p className="mt-6 max-w-3xl text-sm uppercase leading-relaxed tracking-[0.12em] text-secondary/70">
        Reach the editorial desk for corrections, brand inquiries, or affiliate partnership questions.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <article className="border border-black/10 p-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-secondary/70">Email</h2>
          <p className="mt-3 text-sm text-secondary/80">hello@pickstack.co</p>
        </article>
        <article className="border border-black/10 p-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-secondary/70">Phone</h2>
          <p className="mt-3 text-sm text-secondary/80">+1 (800) 555-0144</p>
        </article>
        <article className="border border-black/10 p-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-secondary/70">Hours</h2>
          <p className="mt-3 text-sm text-secondary/80">Mon-Fri, 9:00 AM - 7:00 PM ET</p>
        </article>
      </div>

      <div className="mt-10 border border-black/10 p-6">
        <h2 className="text-xs uppercase tracking-[0.2em] text-secondary/70">Editorial Desk</h2>
        <p className="mt-3 text-sm leading-relaxed text-secondary/80">
          PICKSTACK Media
          <br />
          245 West 29th Street, Suite 406
          <br />
          New York, NY 10001, United States
        </p>
      </div>
    </section>
  );
}

