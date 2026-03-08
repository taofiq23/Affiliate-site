import "server-only";
import path from "node:path";
import { existsSync, readFileSync } from "node:fs";
import {
  bestLists as fallbackBestLists,
  categories as fallbackCategories,
  comparisons as fallbackComparisons,
  getBestList as getFallbackBestList,
  getBestLists as getFallbackBestLists,
  getCategory as getFallbackCategory,
  getComparison as getFallbackComparison,
  getComparisons as getFallbackComparisons,
  getGuide as getFallbackGuide,
  getGuides as getFallbackGuides,
  getProduct as getFallbackProduct,
  getProducts as getFallbackProducts,
  guides as fallbackGuides,
  homepageData as fallbackHomepageData,
  productMap as fallbackProductMap,
  products as fallbackProducts,
  siteConfig,
  topRatedOrder as fallbackTopRatedOrder,
  type BestListRecord,
  type CategoryRecord,
  type ComparisonRecord,
  type GuideRecord,
  type ProductRecord
} from "./site-data";
import { normalizeProductRecord } from "./generated-content-normalizers";

export type { BestListRecord, CategoryRecord, ComparisonRecord, GuideRecord, ProductRecord } from "./site-data";

type HomepageData = typeof fallbackHomepageData;

function readGeneratedJson<T>(relativePath: string) {
  const filePath = path.join(process.cwd(), relativePath);

  if (!existsSync(filePath)) {
    return undefined;
  }

  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as T;
  } catch (error) {
    console.warn(`Failed to load generated content from ${filePath}:`, error);
    return undefined;
  }
}

export const products = (readGeneratedJson<ProductRecord[]>("automation/output/products.json") ?? fallbackProducts).map(normalizeProductRecord);
export const bestLists = readGeneratedJson<BestListRecord[]>("automation/output/top-picks/index.json") ?? fallbackBestLists;
export const comparisons = readGeneratedJson<ComparisonRecord[]>("automation/output/comparisons/index.json") ?? fallbackComparisons;
export const guides = readGeneratedJson<GuideRecord[]>("automation/output/guides/index.json") ?? fallbackGuides;
export const categories = readGeneratedJson<CategoryRecord[]>("automation/output/categories/index.json") ?? fallbackCategories;
export const homepageData = readGeneratedJson<HomepageData>("automation/output/homepage.json") ?? fallbackHomepageData;

export const productMap = Object.fromEntries(products.map((product) => [product.slug, product])) as Record<string, ProductRecord>;
export const bestListMap = Object.fromEntries(bestLists.map((page) => [page.slug, page])) as Record<string, BestListRecord>;
export const comparisonMap = Object.fromEntries(comparisons.map((page) => [page.slug, page])) as Record<string, ComparisonRecord>;
export const guideMap = Object.fromEntries(guides.map((page) => [page.slug, page])) as Record<string, GuideRecord>;
export const categoryMap = Object.fromEntries(categories.map((page) => [page.slug, page])) as Record<string, CategoryRecord>;
export const topRatedOrder = products.slice().sort((left, right) => right.rating - left.rating).map((product) => product.slug);

export function getProduct(slug: string) {
  return productMap[slug] ?? getFallbackProduct(slug);
}

export function getBestList(slug: string) {
  return bestListMap[slug] ?? getFallbackBestList(slug);
}

export function getComparison(slug: string) {
  return comparisonMap[slug] ?? getFallbackComparison(slug);
}

export function getGuide(slug: string) {
  return guideMap[slug] ?? getFallbackGuide(slug);
}

export function getCategory(slug: string) {
  return categoryMap[slug] ?? getFallbackCategory(slug);
}

export function getProducts(slugs: string[]) {
  const resolved = slugs.map((slug) => productMap[slug]).filter((product): product is ProductRecord => Boolean(product));
  return resolved.length > 0 ? resolved : getFallbackProducts(slugs);
}

export function getBestLists(slugs: string[]) {
  const resolved = slugs.map((slug) => bestListMap[slug]).filter((page): page is BestListRecord => Boolean(page));
  return resolved.length > 0 ? resolved : getFallbackBestLists(slugs);
}

export function getComparisons(slugs: string[]) {
  const resolved = slugs.map((slug) => comparisonMap[slug]).filter((page): page is ComparisonRecord => Boolean(page));
  return resolved.length > 0 ? resolved : getFallbackComparisons(slugs);
}

export function getGuides(slugs: string[]) {
  const resolved = slugs.map((slug) => guideMap[slug]).filter((page): page is GuideRecord => Boolean(page));
  return resolved.length > 0 ? resolved : getFallbackGuides(slugs);
}

export { siteConfig, fallbackProductMap };
