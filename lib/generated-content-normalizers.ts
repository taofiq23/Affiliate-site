import type { ProductRecord } from "./site-data";
import type { ReviewRecord } from "./review-data";

const fallbackImage = "/placeholder/generated-product.svg";

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

function normalizeImageGallery(values?: string[]) {
  const gallery = Array.from(new Set((values ?? []).map((value) => normalizeImageValue(value)).filter(Boolean)));

  return gallery.filter((value) => value !== fallbackImage || gallery.length === 1);
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
    imageUrl: resolveProductImageUrl(product),
    imageGallery: normalizeImageGallery(product.imageGallery ?? [product.imageUrl ?? product.image ?? ""])
  } as ProductRecord;
}

export function normalizeReviewRecord<T extends ReviewRecord | (Partial<ReviewRecord> & { imageUrl?: string; heroImage?: string; imageGallery?: string[] })>(review: T) {
  return {
    ...review,
    imageUrl: resolveReviewImageUrl(review),
    imageGallery: normalizeImageGallery(review.imageGallery ?? [review.imageUrl ?? review.heroImage ?? ""])
  } as ReviewRecord;
}
