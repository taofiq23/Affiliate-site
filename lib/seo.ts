import type { Metadata } from "next";
import { siteConfig } from "./site-data";

type MetaInput = {
  title: string;
  description: string;
  pathname: string;
};

export function absoluteUrl(pathname: string) {
  return `${siteConfig.url}${pathname}`;
}

export function buildMetadata({ title, description, pathname }: MetaInput): Metadata {
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
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
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

export function buildReviewSchema(title: string, description: string, pathname: string, rating: number) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    name: title,
    reviewBody: description,
    itemReviewed: {
      "@type": "Product",
      name: title
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: rating.toFixed(1),
      bestRating: "5"
    },
    mainEntityOfPage: absoluteUrl(pathname)
  };
}
