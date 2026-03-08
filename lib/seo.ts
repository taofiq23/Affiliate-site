import type { Metadata } from "next";
import { resolveReviewImageUrl } from "./generated-content-normalizers";
import type { ReviewRecord } from "./review-data";
import { siteConfig } from "./site-data";

type MetaInput = {
  title: string;
  description: string;
  pathname: string;
  imagePath?: string;
  openGraphType?: "website" | "article";
};

export function absoluteUrl(pathname: string) {
  return `${siteConfig.url}${pathname}`;
}

export function buildMetadata({ title, description, pathname, imagePath, openGraphType = "website" }: MetaInput): Metadata {
  const ogImage = imagePath ? (imagePath.startsWith("http") ? imagePath : absoluteUrl(imagePath)) : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: pathname
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

export function buildArticleSchema(title: string, description: string, pathname: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: absoluteUrl(pathname),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name
    }
  };
}

export function buildReviewSchema(review: ReviewRecord) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    name: `${review.name} Review`,
    reviewBody: review.summary,
    itemReviewed: {
      "@type": "Product",
      name: review.name,
      image: resolveReviewImageUrl(review),
      brand: {
        "@type": "Brand",
        name: review.brand
      },
      category: review.category,
      sku: review.asin
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

export function buildProductSchema(review: ReviewRecord) {
  const topOffer = review.retailerOffers.slice().sort((left, right) => left.priority - right.priority)[0];
  const hasPrice = review.priceMin > 0 && review.priceMax > 0;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: review.name,
    sku: review.asin,
    image: resolveReviewImageUrl(review),
    url: review.canonicalProductUrl ?? absoluteUrl(`/reviews/${review.slug}`),
    brand: {
      "@type": "Brand",
      name: review.brand
    },
    description: review.summary,
    category: review.category,
    offers: topOffer && hasPrice
      ? {
          "@type": "Offer",
          url: topOffer.affiliateUrl,
          priceCurrency: "USD",
          price: review.priceMin.toFixed(2),
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: review.priceMin.toFixed(2),
            maxPrice: review.priceMax.toFixed(2),
            priceCurrency: "USD"
          }
        }
      : undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: review.editorScore.toFixed(1),
      reviewCount: "1"
    }
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
