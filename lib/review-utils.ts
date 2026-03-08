import type { RetailerOffer } from "@/lib/review-data";

export const affiliateLinkRel = "nofollow sponsored noopener noreferrer";

export function sortRetailerOffers(offers: RetailerOffer[]) {
  return offers.slice().sort((left, right) => left.priority - right.priority);
}
