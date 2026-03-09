import "server-only";
import { createHash } from "node:crypto";
import { automationConfig } from "../automation/config";
import { appendNdjsonLine } from "../automation/io";
import type { ClickEvent } from "../automation/types";

type ClickInput = {
  request: Request;
  reviewSlug: string;
  offerSlug: string;
  retailerName: string;
  affiliateUrl: string;
};

function hashIp(rawIp: string) {
  return createHash("sha256").update(`${automationConfig.clickHashSalt}:${rawIp}`).digest("hex").slice(0, 16);
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
    appendNdjsonLine(automationConfig.clickEventsPath, clickEvent);
  } catch (error) {
    console.warn("Failed to record affiliate click:", error);
  }

  return clickEvent;
}
