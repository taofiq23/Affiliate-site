import "server-only";
import path from "node:path";
import { existsSync, readFileSync } from "node:fs";
import type { AnalyticsSnapshot, KeywordCluster, PublishQueueItem, SeoBrief } from "../automation/types";

function readGeneratedJson<T>(relativePath: string, fallback: T) {
  const filePath = path.join(process.cwd(), relativePath);

  if (!existsSync(filePath)) {
    return fallback;
  }

  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as T;
  } catch (error) {
    console.warn(`Failed to load ops data from ${filePath}:`, error);
    return fallback;
  }
}

const emptyAnalytics: AnalyticsSnapshot = {
  generatedAt: "",
  totalClicks: 0,
  uniqueReviewCount: 0,
  uniqueRetailerCount: 0,
  topReviews: [],
  topRetailers: [],
  recentClicks: [],
  revenueReadiness: {
    pagesWithAffiliateLinks: 0,
    pagesWithClicks: 0,
    clickThroughCoverage: 0
  },
  publishQueue: {
    total: 0,
    ready: 0,
    needsReview: 0,
    queued: 0,
    highestPriority: []
  }
};

export function getOpsDashboardData() {
  return {
    keywordClusters: readGeneratedJson<KeywordCluster[]>("automation/data/keyword_clusters.json", []),
    seoBriefs: readGeneratedJson<SeoBrief[]>("automation/data/seo_briefs.json", []),
    publishQueue: readGeneratedJson<PublishQueueItem[]>("automation/data/publish_queue.json", []),
    analytics: readGeneratedJson<AnalyticsSnapshot>("automation/data/analytics_snapshot.json", emptyAnalytics)
  };
}
