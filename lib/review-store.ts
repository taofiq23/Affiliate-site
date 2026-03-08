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

function readGeneratedJsonFromCandidates<T>(relativePaths: string[]) {
  for (const relativePath of relativePaths) {
    const data = readGeneratedJson<T>(relativePath);

    if (data !== undefined) {
      return data;
    }
  }

  return undefined;
}

const generatedReviews = readGeneratedJsonFromCandidates<ReviewRecord[]>(["content/generated/reviews/index.json", "automation/output/reviews/index.json"]) ?? [];
const hasGeneratedReviews = generatedReviews.length > 0;

export const reviews = (hasGeneratedReviews ? generatedReviews : fallbackReviews).map(normalizeReviewRecord);
export const reviewMap = Object.fromEntries(reviews.map((review) => [review.slug, review])) as Record<string, ReviewRecord>;

export function getReview(slug: string) {
  return reviewMap[slug] ?? (!hasGeneratedReviews ? getFallbackReview(slug) : undefined);
}

export function getReviews(slugs: string[]) {
  const resolved = slugs.map((slug) => reviewMap[slug]).filter((review): review is ReviewRecord => Boolean(review));
  return resolved.length > 0 ? resolved : !hasGeneratedReviews ? getFallbackReviews(slugs) : [];
}

export { fallbackReviewMap };
