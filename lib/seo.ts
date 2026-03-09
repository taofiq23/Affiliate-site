import type { Metadata } from "next";
import { resolveReviewImageUrl } from "./generated-content-normalizers";
import type { ReviewRecord } from "./review-data";
import { siteConfig } from "./site-data";

type MetaInput = {
  title: string;
  description: string;
  pathname: string;
  imagePath?: string;
  keywords?: string[];
  openGraphType?: "website" | "article";
};

export function absoluteUrl(pathname: string) {
  return `${siteConfig.url}${pathname}`;
}

function toAbsoluteImageUrl(imagePath: string) {
  return imagePath.startsWith("http") ? imagePath : absoluteUrl(imagePath);
}

function resolveReviewImageUrls(review: Pick<ReviewRecord, "imageGallery" | "imageUrl" | "heroImage">) {
  const gallery = Array.from(
    new Set(
      (review.imageGallery ?? [])
        .map((value) => value?.trim() ?? "")
        .filter(Boolean)
        .map((value) => toAbsoluteImageUrl(value))
    )
  );

  if (gallery.length > 0) {
    return gallery;
  }

  const fallback = resolveReviewImageUrl(review);
  return fallback ? [toAbsoluteImageUrl(fallback)] : [];
}

export function buildMetadata({ title, description, pathname, imagePath, keywords, openGraphType = "website" }: MetaInput): Metadata {
  const ogImage = imagePath ? (imagePath.startsWith("http") ? imagePath : absoluteUrl(imagePath)) : undefined;

  return {
    title,
    description,
    keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: absoluteUrl(pathname)
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(pathname),
      siteName: siteConfig.name,
      type: openGraphType,
      images: ogImage ? [{ url: ogImage, alt: title }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined
    }
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function buildItemListSchema(title: string, paths: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    itemListElement: paths.map((path, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(path)
    }))
  };
}

export function buildArticleSchema(title: string, description: string, pathname: string, imagePath?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: imagePath ? [toAbsoluteImageUrl(imagePath)] : undefined,
    mainEntityOfPage: absoluteUrl(pathname),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name
    }
  };
}

export function buildReviewSchema(
  review: ReviewRecord,
  options?: {
    shopperRating?: number;
    shopperReviewCount?: number;
  }
) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    name: `${review.name} Review`,
    reviewBody: `${review.summary} ${review.quickVerdict}`.trim(),
    itemReviewed: {
      "@type": "Product",
      name: review.name,
      image: resolveReviewImageUrls(review),
      brand: {
        "@type": "Brand",
        name: review.brand
      },
      category: review.category,
      sku: review.asin,
      aggregateRating:
        options?.shopperRating && options?.shopperReviewCount
          ? {
              "@type": "AggregateRating",
              ratingValue: options.shopperRating.toFixed(1),
              reviewCount: String(options.shopperReviewCount)
            }
          : undefined
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.editorScore.toFixed(1),
      bestRating: "5"
    },
    author: {
      "@type": "Organization",
      name: siteConfig.name
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name
    },
    datePublished: review.lastChecked,
    dateModified: review.lastChecked,
    mainEntityOfPage: absoluteUrl(`/reviews/${review.slug}`)
  };
}

export function buildProductSchema(
  review: ReviewRecord,
  options?: {
    shopperRating?: number;
    shopperReviewCount?: number;
  }
) {
  const topOffer = review.retailerOffers.slice().sort((left, right) => left.priority - right.priority)[0];
  const hasPrice = review.priceMin > 0 && review.priceMax > 0;
  const reviewPageUrl = absoluteUrl(`/reviews/${review.slug}`);
  const inferredAvailability =
    topOffer?.stockNote && /(in stock|available|ships soon)/i.test(topOffer.stockNote)
      ? "https://schema.org/InStock"
      : undefined;
  const aggregateRating =
    options?.shopperRating && options?.shopperReviewCount
      ? {
          "@type": "AggregateRating",
          ratingValue: options.shopperRating.toFixed(1),
          reviewCount: String(options.shopperReviewCount)
        }
      : {
          "@type": "AggregateRating",
          ratingValue: review.editorScore.toFixed(1),
          reviewCount: "1"
        };

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: review.name,
    sku: review.asin,
    image: resolveReviewImageUrls(review),
    url: reviewPageUrl,
    brand: {
      "@type": "Brand",
      name: review.brand
    },
    description: review.summary,
    category: review.category,
    offers: topOffer
      ? {
          "@type": "Offer",
          url: topOffer.affiliateUrl,
          availability: inferredAvailability,
          priceCurrency: "USD",
          price: hasPrice ? review.priceMin.toFixed(2) : undefined,
          priceSpecification: hasPrice
            ? {
                "@type": "PriceSpecification",
                minPrice: review.priceMin.toFixed(2),
                maxPrice: review.priceMax.toFixed(2),
                priceCurrency: "USD"
              }
            : undefined,
          itemCondition: "https://schema.org/NewCondition"
        }
      : undefined,
    aggregateRating
  };
}

export function buildFaqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
