import type { Metadata } from "next";
import { getOpsDashboardData } from "@/lib/ops-store";

export const metadata: Metadata = {
  title: "Ops",
  robots: {
    index: false,
    follow: false
  }
};

function formatTimestamp(value: string) {
  if (!value) {
    return "Not generated yet";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("en-US");
}

export default function OpsPage() {
  const { analytics, keywordClusters, seoBriefs, publishQueue } = getOpsDashboardData();

  return (
    <section className="px-6 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="rounded-[2rem] border border-black/10 bg-white/85 p-8 shadow-[0_20px_60px_rgba(39,31,20,0.08)]">
          <p className="text-xs uppercase tracking-[0.35em] text-black/45">Local Engine Ops</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-black/85 sm:text-4xl">Automation Status</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-black/60">
            Internal dashboard for keyword planning, brief generation, queue priority, and affiliate click tracking. This page is intentionally not linked in the public navigation.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.28em] text-black/40">Analytics snapshot: {formatTimestamp(analytics.generatedAt)}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-[1.75rem] border border-black/10 bg-[#f4efe7] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-black/45">Keyword Clusters</p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-black/85">{keywordClusters.length}</p>
          </div>
          <div className="rounded-[1.75rem] border border-black/10 bg-[#f7f2eb] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-black/45">SEO Briefs</p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-black/85">{seoBriefs.length}</p>
          </div>
          <div className="rounded-[1.75rem] border border-black/10 bg-[#f9f4ee] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-black/45">Tracked Clicks</p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-black/85">{analytics.totalClicks}</p>
          </div>
          <div className="rounded-[1.75rem] border border-black/10 bg-[#faf6f1] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-black/45">Ready Pages</p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-black/85">{analytics.publishQueue.ready}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-black/10 bg-white/85 p-7 shadow-[0_16px_40px_rgba(39,31,20,0.06)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-black/45">Publish Queue</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-black/85">Highest Priority Pages</h2>
              </div>
              <p className="text-sm text-black/55">{publishQueue.length} queued pages</p>
            </div>

            <div className="mt-6 space-y-4">
              {publishQueue.slice(0, 8).map((item) => (
                <div key={item.id} className="rounded-[1.5rem] border border-black/10 bg-[#fcf8f3] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-black/40">{item.pageType}</p>
                      <h3 className="mt-1 text-lg font-medium text-black/85">{item.primaryKeyword}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-black/45">
                      <span className="rounded-full border border-black/10 px-3 py-1">{item.status}</span>
                      <span className="rounded-full border border-black/10 px-3 py-1">{item.recommendedAction}</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-black/60">{item.reason}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-black/40">
                    <span>Priority {item.priorityScore.toFixed(2)}</span>
                    <span>Monetization {item.monetizationScore.toFixed(2)}</span>
                    <span>Freshness {item.freshnessScore.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-black/10 bg-white/85 p-7 shadow-[0_16px_40px_rgba(39,31,20,0.06)]">
              <p className="text-xs uppercase tracking-[0.28em] text-black/45">Top Reviews</p>
              <div className="mt-5 space-y-4">
                {analytics.topReviews.length > 0 ? (
                  analytics.topReviews.map((item) => (
                    <div key={item.key} className="flex items-center justify-between gap-3 border-b border-black/8 pb-3 text-sm text-black/65 last:border-b-0 last:pb-0">
                      <span>{item.label}</span>
                      <span className="font-medium text-black/85">{item.clicks}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm leading-7 text-black/55">No clicks tracked yet.</p>
                )}
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-white/85 p-7 shadow-[0_16px_40px_rgba(39,31,20,0.06)]">
              <p className="text-xs uppercase tracking-[0.28em] text-black/45">Recent Clicks</p>
              <div className="mt-5 space-y-4">
                {analytics.recentClicks.length > 0 ? (
                  analytics.recentClicks.slice(0, 6).map((item, index) => (
                    <div key={`${item.clickedAt}-${index}`} className="rounded-[1.35rem] border border-black/10 bg-[#fcf8f3] p-4 text-sm text-black/62">
                      <p className="font-medium text-black/82">
                        {item.reviewSlug}
                        {" to "}
                        {item.retailerName}
                      </p>
                      <p className="mt-2 leading-6">{formatTimestamp(item.clickedAt)}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm leading-7 text-black/55">No outbound clicks have been recorded yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
