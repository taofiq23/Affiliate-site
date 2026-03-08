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

export function resolveProductImageUrl(product: Pick<ProductRecord, "imageUrl" | "image">) {
  return normalizeImageValue(product.imageUrl ?? product.image);
}

export function resolveReviewImageUrl(review: Pick<ReviewRecord, "imageUrl" | "heroImage">) {
  return normalizeImageValue(review.imageUrl ?? review.heroImage);
}

export function normalizeProductRecord<T extends ProductRecord | (Partial<ProductRecord> & { image?: string; imageUrl?: string })>(product: T) {
  return {
    ...product,
    imageUrl: resolveProductImageUrl(product)
  } as ProductRecord;
}

export function normalizeReviewRecord<T extends ReviewRecord | (Partial<ReviewRecord> & { imageUrl?: string; heroImage?: string })>(review: T) {
  return {
    ...review,
    imageUrl: resolveReviewImageUrl(review)
  } as ReviewRecord;
}
