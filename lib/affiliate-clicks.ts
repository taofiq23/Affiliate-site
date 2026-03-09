import "server-only";
import { appendFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

type ClickEvent = {
  clickedAt: string;
  reviewSlug: string;
  offerSlug: string;
  retailerName: string;
  affiliateUrl: string;
  referer: string;
  userAgent: string;
  ipHash: string;
  path: string;
};

type ClickInput = {
  request: Request;
  reviewSlug: string;
  offerSlug: string;
  retailerName: string;
  affiliateUrl: string;
};

// Default salt is intentionally non-secret and only used for local hashing.
function hashIp(rawIp: string) {
  const salt = process.env.CLICK_HASH_SALT ?? "affiliate-clicks-v2";
  return createHash("sha256").update(`${salt}:${rawIp}`).digest("hex").slice(0, 16);
}

function appendNdjsonLine(filePath: string, value: unknown) {
  const dir = path.dirname(filePath);
  mkdirSync(dir, { recursive: true });
  appendFileSync(filePath, `${JSON.stringify(value)}\n`, "utf8");
}

function resolveClickEventsPath() {
  if (process.env.CLICK_EVENTS_PATH) {
    return process.env.CLICK_EVENTS_PATH;
  }

  // Local dev default (ignored in git). On Vercel this path is non-persistent.
  return path.join(process.cwd(), "automation", "data", "click-events.ndjson");
}

export function recordAffiliateClick({ request, reviewSlug, offerSlug, retailerName, affiliateUrl }: ClickInput) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const ipHash = hashIp(forwardedFor || realIp || "unknown");
  const referer = request.headers.get("referer") ?? "";
  const userAgent = request.headers.get("user-agent") ?? "";
  const clickEvent: ClickEvent = {
    clickedAt: new Date().toISOString(),
    reviewSlug,
    offerSlug,
    retailerName,
    affiliateUrl,
    referer,
    userAgent,
    ipHash,
    path: new URL(request.url).pathname
  };

  try {
    appendNdjsonLine(resolveClickEventsPath(), clickEvent);
  } catch (error) {
    console.warn("Failed to record affiliate click:", error);
  }

  return clickEvent;
}
