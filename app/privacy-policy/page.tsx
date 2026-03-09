import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for HomeSelect Daily.",
  pathname: "/privacy-policy"
});

export default function PrivacyPolicyPage() {
  return (
    <section className="container-luxe py-16 md:py-24">
      <p className="kicker">Legal</p>
      <h1 className="mt-4 font-display text-[2.35rem] leading-[0.96] sm:text-5xl md:text-6xl">Privacy Policy</h1>
      <p className="mt-5 max-w-3xl text-[12px] uppercase leading-relaxed tracking-[0.08em] text-secondary/70 md:mt-6 md:text-sm md:tracking-[0.12em]">
        This policy explains how HomeSelect Daily collects, uses, and protects visitor information.
      </p>

      <div className="mt-10 space-y-6">
        <article className="border border-black/10 p-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-secondary/70">Data We Collect</h2>
          <p className="mt-3 text-sm leading-relaxed text-secondary/80">
            Basic analytics, contact form submissions, referral tracking information, and cookies used to understand site performance.
          </p>
        </article>
        <article className="border border-black/10 p-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-secondary/70">How We Use Data</h2>
          <p className="mt-3 text-sm leading-relaxed text-secondary/80">
            To improve editorial content, measure outbound affiliate clicks, respond to messages, and maintain site security.
          </p>
        </article>
        <article className="border border-black/10 p-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-secondary/70">Your Choices</h2>
          <p className="mt-3 text-sm leading-relaxed text-secondary/80">
            You may request data access or deletion, limit cookies in your browser, or contact us about analytics and referral tracking.
          </p>
        </article>
      </div>
    </section>
  );
}

