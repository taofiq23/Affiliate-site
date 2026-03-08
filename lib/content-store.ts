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

type HomepageData = {
  heroTitle: string;
  heroKicker: string;
  heroDescription: string;
  featuredReviewSlugs: string[];
  featuredBestSlug: string;
  popularComparisonSlugs: string[];
  featuredGuideSlugs: string[];
  categorySlugs: string[];
};

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

function readGeneratedJsonFromCandidates<T>(relativePaths: string[]) {
  for (const relativePath of relativePaths) {
    const data = readGeneratedJson<T>(relativePath);

    if (data !== undefined) {
      return data;
    }
  }

  return undefined;
}

function mergeBySlug<T extends { slug: string }>(primary: T[], secondary: T[]) {
  return Array.from(new Map([...secondary, ...primary].map((item) => [item.slug, item])).values());
}

function mergeHomepageData(generatedHomepageData: HomepageData | undefined) {
  if (!generatedHomepageData) {
    return fallbackHomepageData;
  }

  const mergeSlugs = (generatedSlugs: string[], fallbackSlugs: readonly string[]) =>
    Array.from(new Set([...generatedSlugs, ...fallbackSlugs]));

  return {
    ...fallbackHomepageData,
    featuredReviewSlugs: mergeSlugs(generatedHomepageData.featuredReviewSlugs, fallbackHomepageData.featuredReviewSlugs),
    featuredBestSlug: generatedHomepageData.featuredBestSlug || fallbackHomepageData.featuredBestSlug,
    popularComparisonSlugs: mergeSlugs(generatedHomepageData.popularComparisonSlugs, fallbackHomepageData.popularComparisonSlugs),
    featuredGuideSlugs: mergeSlugs(generatedHomepageData.featuredGuideSlugs, fallbackHomepageData.featuredGuideSlugs),
    categorySlugs: mergeSlugs(generatedHomepageData.categorySlugs, fallbackHomepageData.categorySlugs)
  } satisfies HomepageData;
}

const generatedProducts = readGeneratedJsonFromCandidates<ProductRecord[]>(["content/generated/products.json", "automation/output/products.json"]) ?? [];
const generatedBestLists = readGeneratedJsonFromCandidates<BestListRecord[]>(["content/generated/top-picks/index.json", "automation/output/top-picks/index.json"]) ?? [];
const generatedComparisons =
  readGeneratedJsonFromCandidates<ComparisonRecord[]>(["content/generated/comparisons/index.json", "automation/output/comparisons/index.json"]) ?? [];
const generatedGuides = readGeneratedJsonFromCandidates<GuideRecord[]>(["content/generated/guides/index.json", "automation/output/guides/index.json"]) ?? [];
const generatedCategories =
  readGeneratedJsonFromCandidates<CategoryRecord[]>(["content/generated/categories/index.json", "automation/output/categories/index.json"]) ?? [];
const generatedHomepageData = readGeneratedJsonFromCandidates<HomepageData>(["content/generated/homepage.json", "automation/output/homepage.json"]);

export const products = mergeBySlug(
  generatedProducts.map(normalizeProductRecord),
  fallbackProducts.map(normalizeProductRecord)
);
export const bestLists = mergeBySlug(fallbackBestLists, generatedBestLists);
export const comparisons = mergeBySlug(fallbackComparisons, generatedComparisons);
export const guides = mergeBySlug(fallbackGuides, generatedGuides);
export const categories = mergeBySlug(fallbackCategories, generatedCategories);
export const homepageData = mergeHomepageData(generatedHomepageData);

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
