import type { ProductRecord } from "./site-data";
import type { ReviewRecord } from "./review-data";

const fallbackImage = "/placeholder/generated-product.jpg";

export function resolveProductImageUrl(product: Pick<ProductRecord, "imageUrl" | "image">) {
  return product.imageUrl ?? product.image ?? fallbackImage;
}

export function resolveReviewImageUrl(review: Pick<ReviewRecord, "imageUrl" | "heroImage">) {
  return review.imageUrl ?? review.heroImage ?? fallbackImage;
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
