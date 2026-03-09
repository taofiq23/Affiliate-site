import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Contact HomeSelect Daily for editorial corrections, partnership questions, and product review inquiries.",
  pathname: "/contact"
});

export default function ContactPage() {
  return (
    <section className="container-luxe py-16 md:py-24">
      <p className="kicker">Contact</p>
      <h1 className="mt-4 font-display text-[2.35rem] leading-[0.96] sm:text-5xl md:text-6xl">Get In Touch</h1>
      <p className="mt-5 max-w-3xl text-[12px] uppercase leading-relaxed tracking-[0.08em] text-secondary/70 md:mt-6 md:text-sm md:tracking-[0.12em]">
        Reach the editorial desk for corrections, brand inquiries, product suggestions, or partnership questions.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <article className="border border-black/10 p-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-secondary/70">Email</h2>
          <p className="mt-3 text-sm text-secondary/80">hello@homeselectdaily.com</p>
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
          HOMESELECT DAILY
          <br />
          245 West 29th Street, Suite 406
          <br />
          New York, NY 10001, United States
        </p>
      </div>
    </section>
  );
}

