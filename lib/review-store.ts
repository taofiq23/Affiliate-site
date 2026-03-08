import "server-only";
import path from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { getReview as getFallbackReview, getReviews as getFallbackReviews, reviewMap as fallbackReviewMap, reviews as fallbackReviews, type ReviewRecord } from "./review-data";
import { normalizeReviewRecord } from "./generated-content-normalizers";

export type { ReviewRecord } from "./review-data";

function readGeneratedJson<T>(relativePath: string) {
  const filePath = path.join(process.cwd(), relativePath);

  if (!existsSync(filePath)) {
    return undefined;
  }

  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as T;
  } catch (error) {
    console.warn(`Failed to load generated reviews from ${filePath}:`, error);
    return undefined;
  }
}

export const reviews = (readGeneratedJson<ReviewRecord[]>("automation/output/reviews/index.json") ?? fallbackReviews).map(normalizeReviewRecord);
export const reviewMap = Object.fromEntries(reviews.map((review) => [review.slug, review])) as Record<string, ReviewRecord>;

export function getReview(slug: string) {
  return reviewMap[slug] ?? getFallbackReview(slug);
}

export function getReviews(slugs: string[]) {
  const resolved = slugs.map((slug) => reviewMap[slug]).filter((review): review is ReviewRecord => Boolean(review));
  return resolved.length > 0 ? resolved : getFallbackReviews(slugs);
}

export { fallbackReviewMap };
