import type { BestListRecord, CategoryRecord, ComparisonRecord, GuideRecord, ProductRecord } from "./site-data";
import type { ReviewFeatureSnapshotItem, ReviewLink, ReviewRecord } from "./review-data";

const fallbackImage = "/placeholder/generated-product.svg";
const hiddenSnapshotLabels = new Set(["buyer intent", "trend type", "price band", "cluster", "main category", "subcategory", "trend"]);
const internalCopyPatterns = [
  /search-demand/i,
  /\bviral\b/i,
  /evergreen demand profile/i,
  /budget-conscious buying intent/i,
  /optimized for shortlist traffic/i,
  /generic affiliate framework/i,
  /\baffiliate framework\b/i,
  /content engine/i
];

function cleanPublicText(value?: string) {
  if (!value) {
    return "";
  }

  return value
    .trim()
    .replace(/generic affiliate framework/gi, "shopping guides")
    .replace(/\baffiliate framework\b/gi, "shopping guides")
    .replace(/\bgeneric buying guide\b/gi, "buying guide")
    .replace(/\bniche-agnostic\b/gi, "broad")
    .replace(/\bgeneric marketplace language\b/gi, "marketing language")
    .replace(/\bbroad generic browsing\b/gi, "broad shopping")
    .replace(/\breview-ready\b/gi, "top-rated")
    .replace(/\bcontent engine\b/gi, "editorial approach")
    .replace(/\s+/g, " ")
    .trim();
}

function shouldHideInternalText(value?: string) {
  const text = cleanPublicText(value);
  return text.length === 0 || internalCopyPatterns.some((pattern) => pattern.test(text));
}

function sanitizeList(values?: string[]) {
  return Array.from(new Set((values ?? []).map((value) => cleanPublicText(value)).filter((value) => !shouldHideInternalText(value))));
}

function sanitizeFaq(values?: { question: string; answer: string }[]) {
  return (values ?? []).map((item) => ({
    question: cleanPublicText(item.question),
    answer: cleanPublicText(item.answer)
  }));
}

function sanitizeReviewLinks(values?: ReviewLink[]) {
  return (values ?? []).map((item) => ({
    ...item,
    title: cleanPublicText(item.title),
    summary: cleanPublicText(item.summary)
  }));
}

function sanitizeFeatureSnapshot(values?: ReviewFeatureSnapshotItem[]) {
  return (values ?? [])
    .map((item) => ({
      label: cleanPublicText(item.label),
      value: cleanPublicText(item.value)
    }))
    .filter((item) => item.label && item.value)
    .filter((item) => !hiddenSnapshotLabels.has(item.label.toLowerCase()))
    .filter((item) => !shouldHideInternalText(`${item.label}: ${item.value}`));
}

function sanitizeGuideSections(values?: { heading: string; body: string[] }[]) {
  return (values ?? []).map((section) => ({
    heading: cleanPublicText(section.heading),
    body: section.body.map((paragraph) => cleanPublicText(paragraph)).filter(Boolean)
  }));
}

function sanitizeHighlights(values?: string[]) {
  return sanitizeList(values).filter((value) => !/broad shopping/i.test(value));
}

function normalizeReviewMethodology(value?: string) {
  const cleaned = cleanPublicText(value);

  if (shouldHideInternalText(cleaned) || /it does not pretend to be hands-on lab testing/i.test(cleaned)) {
    return "This review weighs price, everyday usability, feature quality, buyer fit, and the tradeoffs that matter once the product is in regular use.";
  }

  return cleaned;
}

function normalizeImageValue(value?: string) {
  const imageValue = value?.trim() ?? "";

  if (!imageValue) {
    return fallbackImage;
  }

  // Older fallback records still point to deleted placeholder JPGs.
  if (imageValue.startsWith("/placeholder/") && imageValue !== fallbackImage) {
    return fallbackImage;
  }

  return imageValue;
}

function getImageDedupKey(value?: string) {
  const normalized = normalizeImageValue(value);

  if (!normalized) {
    return "";
  }

  try {
    const url = new URL(normalized, "https://example.com");
    const pathname = decodeURIComponent(url.pathname).toLowerCase();
    const canonicalPath = pathname.replace(/\._[^/]+?\./g, ".").replace(/\.(jpg|jpeg|png|webp)$/i, "");
    return `${url.hostname.toLowerCase()}${canonicalPath}`;
  } catch {
    return normalized.toLowerCase().replace(/\?.*$/, "").replace(/\._[^.]+?\./g, ".");
  }
}

export function dedupeImageGallery(values?: string[]) {
  const seen = new Set<string>();
  const gallery: string[] = [];

  for (const rawValue of values ?? []) {
    const normalized = normalizeImageValue(rawValue);

    if (!normalized) {
      continue;
    }

    const dedupeKey = getImageDedupKey(normalized);

    if (seen.has(dedupeKey)) {
      continue;
    }

    seen.add(dedupeKey);
    gallery.push(normalized);
  }

  return gallery.filter((value) => value !== fallbackImage || gallery.length === 1);
}

function normalizeImageGallery(values?: string[]) {
  return dedupeImageGallery(values);
}

function isAmazonAssociateUrl(value?: string) {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();

    if (hostname === "amzn.to" || hostname.endsWith(".amzn.to")) {
      return true;
    }

    if (!hostname.includes("amazon.")) {
      return false;
    }

    return url.searchParams.has("tag");
  } catch {
    return false;
  }
}

function sanitizeAffiliateLinks(values?: ProductRecord["affiliateLinks"]) {
  return (values ?? []).filter((item) => isAmazonAssociateUrl(item.affiliateUrl));
}

function sanitizeRetailerOffers(values?: ReviewRecord["retailerOffers"]) {
  return (values ?? []).filter((item) => isAmazonAssociateUrl(item.affiliateUrl));
}

export function resolveProductImageUrl(product: Pick<ProductRecord, "imageUrl" | "image" | "imageGallery">) {
  return normalizeImageValue(product.imageGallery?.[0] ?? product.imageUrl ?? product.image);
}

export function resolveReviewImageUrl(review: Pick<ReviewRecord, "imageUrl" | "heroImage" | "imageGallery">) {
  return normalizeImageValue(review.imageGallery?.[0] ?? review.imageUrl ?? review.heroImage);
}

export function normalizeProductRecord<T extends ProductRecord | (Partial<ProductRecord> & { image?: string; imageUrl?: string; imageGallery?: string[] })>(product: T) {
  return {
    ...product,
    name: cleanPublicText(product.name),
    brand: cleanPublicText(product.brand),
    summary: cleanPublicText(product.summary),
    quickVerdict: cleanPublicText(product.quickVerdict),
    features: sanitizeList(product.features),
    pros: sanitizeList(product.pros),
    cons: sanitizeList(product.cons),
    category: cleanPublicText(product.category),
    tags: sanitizeList(product.tags),
    affiliateLinks: sanitizeAffiliateLinks(product.affiliateLinks),
    performance: cleanPublicText(product.performance),
    bestFor: cleanPublicText(product.bestFor),
    avoidIf: cleanPublicText(product.avoidIf),
    highlightLabel: cleanPublicText(product.highlightLabel),
    faq: sanitizeFaq(product.faq),
    imageUrl: resolveProductImageUrl(product),
    imageGallery: normalizeImageGallery(product.imageGallery ?? [product.imageUrl ?? product.image ?? ""])
  } as ProductRecord;
}

export function normalizeReviewRecord<T extends ReviewRecord | (Partial<ReviewRecord> & { imageUrl?: string; heroImage?: string; imageGallery?: string[] })>(review: T) {
  return {
    ...review,
    name: cleanPublicText(review.name),
    brand: cleanPublicText(review.brand),
    category: cleanPublicText(review.category),
    canonicalAffiliateUrl: isAmazonAssociateUrl(review.canonicalAffiliateUrl) ? review.canonicalAffiliateUrl : undefined,
    shortAffiliateUrl: isAmazonAssociateUrl(review.shortAffiliateUrl) ? review.shortAffiliateUrl : undefined,
    preferredAffiliateUrl: isAmazonAssociateUrl(review.preferredAffiliateUrl) ? review.preferredAffiliateUrl : undefined,
    summary: cleanPublicText(review.summary),
    quickVerdict: cleanPublicText(review.quickVerdict),
    bestFor: cleanPublicText(review.bestFor),
    avoidIf: cleanPublicText(review.avoidIf),
    whyBuy: cleanPublicText(review.whyBuy),
    mainDrawback: cleanPublicText(review.mainDrawback),
    keyFeatures: sanitizeList(review.keyFeatures),
    featureSnapshot: sanitizeFeatureSnapshot(review.featureSnapshot),
    pros: sanitizeList(review.pros),
    cons: sanitizeList(review.cons),
    performanceText: cleanPublicText(review.performanceText),
    whoShouldBuy: cleanPublicText(review.whoShouldBuy),
    whoShouldSkip: cleanPublicText(review.whoShouldSkip),
    retailerOffers: sanitizeRetailerOffers(review.retailerOffers),
    alternatives: (review.alternatives ?? []).map((item) => ({
      ...item,
      label: cleanPublicText(item.label),
      title: cleanPublicText(item.title),
      summary: cleanPublicText(item.summary),
      priceText: cleanPublicText(item.priceText)
    })),
    comparisons: sanitizeReviewLinks(review.comparisons),
    faq: sanitizeFaq(review.faq),
    relatedGuides: sanitizeReviewLinks(review.relatedGuides),
    relatedReviews: sanitizeReviewLinks(review.relatedReviews),
    disclosureText: cleanPublicText(review.disclosureText),
    reviewMethodology: normalizeReviewMethodology(review.reviewMethodology),
    imageUrl: resolveReviewImageUrl(review),
    imageGallery: normalizeImageGallery(review.imageGallery ?? [review.imageUrl ?? review.heroImage ?? ""])
  } as ReviewRecord;
}

export function normalizeBestListRecord<T extends BestListRecord>(page: T) {
  return {
    ...page,
    title: cleanPublicText(page.title),
    description: cleanPublicText(page.description),
    intro: cleanPublicText(page.intro),
    highlights: sanitizeHighlights(page.highlights),
    faq: sanitizeFaq(page.faq)
  } as BestListRecord;
}

export function normalizeComparisonRecord<T extends ComparisonRecord>(page: T) {
  return {
    ...page,
    title: cleanPublicText(page.title),
    description: cleanPublicText(page.description),
    intro: cleanPublicText(page.intro),
    verdict: cleanPublicText(page.verdict),
    featureComparison: cleanPublicText(page.featureComparison),
    performanceComparison: cleanPublicText(page.performanceComparison),
    priceComparison: cleanPublicText(page.priceComparison),
    faq: sanitizeFaq(page.faq)
  } as ComparisonRecord;
}

export function normalizeGuideRecord<T extends GuideRecord>(page: T) {
  return {
    ...page,
    title: cleanPublicText(page.title),
    description: cleanPublicText(page.description),
    intro: cleanPublicText(page.intro),
    sections: sanitizeGuideSections(page.sections),
    faq: sanitizeFaq(page.faq)
  } as GuideRecord;
}

export function normalizeCategoryRecord<T extends CategoryRecord>(page: T) {
  return {
    ...page,
    title: cleanPublicText(page.title),
    description: cleanPublicText(page.description),
    intro: cleanPublicText(page.intro),
    faq: sanitizeFaq(page.faq)
  } as CategoryRecord;
}
