import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const ASSOCIATE_TAG = "smartpickgu05-20";
const SGD_TO_USD = 0.74;

const PRODUCT_OVERRIDES = {
  B0C33CHG99: {
    name: "COSORI TurboBlaze Air Fryer 6-Qt",
    slug: "cosori-turboblaze-air-fryer-6qt",
    brand: "COSORI",
    subcategory: "air-fryers",
    highlightLabel: "Fast-Crisp Pick",
    tone: "from-[#d9dee6] to-[#71859d]"
  },
  B0CSZ7WBYW: {
    name: "Ninja Air Fryer Pro 5-Qt",
    slug: "ninja-air-fryer-pro-5qt",
    brand: "Ninja",
    subcategory: "air-fryers",
    highlightLabel: "Best Value Air Fryer",
    tone: "from-[#dde0e2] to-[#7f868d]"
  },
  B089TQWJKK: {
    name: "Ninja Foodi DualZone Air Fryer 8-Qt",
    slug: "ninja-foodi-dualzone-air-fryer-8qt",
    brand: "Ninja",
    subcategory: "air-fryers",
    highlightLabel: "Family Size Pick",
    tone: "from-[#ddd8d0] to-[#7b746a]"
  },
  B08DKYBTPH: {
    name: "Chefman TurboFry Air Fryer 8-Qt",
    slug: "chefman-turbofry-air-fryer-8qt",
    brand: "Chefman",
    subcategory: "air-fryers",
    highlightLabel: "Large Basket Pick",
    tone: "from-[#d7dcdf] to-[#7b8a91]"
  },
  B08DL8WH9V: {
    name: "Chefman Multifunction Air Fryer Oven 10L",
    slug: "chefman-multifunction-air-fryer-oven-10l",
    brand: "Chefman",
    subcategory: "air-fryer-ovens",
    highlightLabel: "Oven-Style Pick",
    tone: "from-[#d8d8d6] to-[#7a7872]"
  },
  B09B7SB46R: {
    name: "Emeril Lagasse French Door Air Fryer Oven 26QT",
    slug: "emeril-lagasse-french-door-air-fryer-oven-26qt",
    brand: "Emeril Lagasse",
    subcategory: "air-fryer-ovens",
    highlightLabel: "Premium Oven Pick",
    tone: "from-[#e0dad1] to-[#91795d]"
  },
  B0DDDD8WD6: {
    name: "Ninja Crispi Glass Air Fryer",
    slug: "ninja-crispi-glass-air-fryer",
    brand: "Ninja",
    subcategory: "air-fryers",
    highlightLabel: "Glass Basket Pick",
    tone: "from-[#dce2e6] to-[#6e8199]"
  },
  B08QZWDLP4: {
    name: "Ninja Nutri-Blender Plus",
    slug: "ninja-nutri-blender-plus",
    brand: "Ninja",
    subcategory: "blenders",
    highlightLabel: "Smoothie Value Pick",
    tone: "from-[#dad9d6] to-[#85827c]"
  },
  B08QXJ31WR: {
    name: "Ninja Nutri Pro Personal Blender",
    slug: "ninja-nutri-pro-personal-blender",
    brand: "Ninja",
    subcategory: "blenders",
    highlightLabel: "Power Smoothie Pick",
    tone: "from-[#d9d9d7] to-[#8a8781]"
  },
  B00NGV4506: {
    name: "Ninja Professional Blender 72-Oz",
    slug: "ninja-professional-blender-72oz",
    brand: "Ninja",
    subcategory: "blenders",
    highlightLabel: "Countertop Blender Pick",
    tone: "from-[#d8d8d8] to-[#777777]"
  },
  B07CTBHQZK: {
    name: "NutriBullet Personal Blender 24-Oz",
    slug: "nutribullet-personal-blender-24oz",
    brand: "NutriBullet",
    subcategory: "blenders",
    highlightLabel: "Entry Blender Pick",
    tone: "from-[#ddd9d2] to-[#8e867b]"
  }
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function parseAsin(url) {
  const match = url.match(/\/dp\/([A-Z0-9]{10})/i) || url.match(/\/gp\/product\/([A-Z0-9]{10})/i);
  return match?.[1]?.toUpperCase() ?? "";
}

function parseNumber(text) {
  const cleaned = text.replace(/[^0-9.]/g, "");
  return cleaned ? Number(cleaned) : 0;
}

function parseReviewCount(text) {
  const cleaned = text.replace(/[^0-9]/g, "");
  return cleaned ? Number(cleaned) : 0;
}

function convertSgdPriceToUsd(priceText) {
  const value = parseNumber(priceText);
  if (!value) {
    return 0;
  }

  return Math.max(1, Math.round(value * SGD_TO_USD));
}

function formatMoney(value) {
  return `$${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value)}`;
}

function buildPriceRange(value) {
  if (!value) {
    return "Check Amazon";
  }

  const min = Math.max(1, Math.round(value * 0.9));
  const max = Math.max(min + 1, Math.round(value * 1.1));
  return `${formatMoney(min)}-${formatMoney(max)}`;
}

function subcategoryLabel(subcategory) {
  if (subcategory === "air-fryers") return "Air Fryers";
  if (subcategory === "air-fryer-ovens") return "Air Fryer Ovens";
  return "Blenders";
}

function categoryTitle(subcategory) {
  return subcategory.startsWith("air-fryer") ? "Kitchen Appliances" : "Blenders";
}

function useCase(subcategory) {
  if (subcategory === "air-fryers") return "Fast crisp cooking, reheating, and weeknight meals with less oil.";
  if (subcategory === "air-fryer-ovens") return "Multi-function countertop cooking for roasting, air frying, and batch meals.";
  return "Smoothies, frozen drinks, sauces, and quick daily blending.";
}

function benefitLine(subcategory) {
  if (subcategory === "air-fryers") return "faster, crisp cooking without heating the full oven";
  if (subcategory === "air-fryer-ovens") return "oven-style flexibility without giving up air-fry speed";
  return "quick smoothie and sauce prep without a bulky full kitchen machine";
}

function bestForLine(subcategory) {
  if (subcategory === "air-fryers") return "home cooks who want quicker meals, crisp textures, and easier cleanup than a full oven routine";
  if (subcategory === "air-fryer-ovens") return "buyers who want one countertop cooker for air frying, roasting, reheating, and larger family portions";
  return "buyers who make smoothies, protein shakes, frozen drinks, or quick sauces several times a week";
}

function avoidIfLine(subcategory) {
  if (subcategory === "air-fryers") return "you need extra-large oven capacity or want the absolute cheapest air fryer available";
  if (subcategory === "air-fryer-ovens") return "you have very limited counter space or only want a small basket-style air fryer";
  return "you mostly need large-batch food processing or want a blender that can stay on the counter for heavy family use";
}

function cleanImages(images) {
  return [...new Set(images)]
    .filter((image) => /^https:\/\/(m\.media-amazon\.com|images-na\.ssl-images-amazon\.com)\//.test(image))
    .filter((image) => !/grey-pixel|play-button/i.test(image))
    .slice(0, 5);
}

function shortProductSummary(name, subcategory, usdPrice, rating, reviews) {
  const priceText = usdPrice ? `usually lands around ${formatMoney(usdPrice)}` : "is worth checking on Amazon";
  const ratingText = rating && reviews ? `${rating.toFixed(1)} stars from ${new Intl.NumberFormat("en-US").format(reviews)} shopper reviews` : "strong shopper interest";
  return `${name} is a practical ${subcategoryLabel(subcategory).toLowerCase()} pick for buyers who want ${benefitLine(subcategory)}. It ${priceText} and currently shows ${ratingText}.`;
}

function buildReviewContent(base) {
  const { name, subcategory, usdPrice, rating, reviews, bestFor, avoidIf, priceRange } = base;
  const subcategoryText = subcategoryLabel(subcategory).toLowerCase();
  const ratingText = rating && reviews
    ? `${rating.toFixed(1)} stars from ${new Intl.NumberFormat("en-US").format(reviews)} Amazon reviews`
    : "solid marketplace proof";

  return {
    summary: `${name} is a strong ${subcategoryText} option for buyers who want ${benefitLine(subcategory)}. The main reasons to consider it are clear fit, useful everyday convenience, and enough review proof to make it easier to shortlist with confidence.`,
    quickVerdict: `A solid choice if you want ${benefitLine(subcategory)} and would rather buy a proven model than gamble on a cheaper unknown listing.`,
    whyBuy: `It solves a clear kitchen problem, carries real shopper proof, and fits buyers who want something practical instead of feature overload.`,
    mainDrawback: `The value only makes sense if its size, feature set, and daily routine fit the way you actually cook or blend.`,
    performanceText: `${name} performs best when the buyer is clear about the job it needs to do. Right now the product shows ${ratingText}, which gives it better marketplace proof than a random low-confidence listing. The real decision still comes down to fit: capacity, cleanup, footprint, and whether the feature set will help after the first week, not just on the day it arrives.`,
    whoShouldBuy: `Buy it if you want ${benefitLine(subcategory)} and the current ${priceRange} range feels reasonable for the way you cook or blend.`,
    whoShouldSkip: `Skip it if ${avoidIf}.`,
    pros: [
      `It matches buyers who want ${benefitLine(subcategory)} without overcomplicating the purchase.`,
      `The review proof is strong enough to make it easier to shortlist with confidence.`,
      `The feature mix feels practical for everyday kitchen use, not just marketing copy.`
    ],
    cons: [
      `The price only feels right if the product actually fits your daily routine.`,
      `Counter space, cleanup, or storage can still be a deciding factor in this category.`,
      `You should still compare one nearby alternative before the final click.`
    ],
    faq: [
      {
        question: `Is ${name} worth it at the current price?`,
        answer: `It can be, especially if ${benefitLine(subcategory)} is exactly what you need and the current Amazon price fits your budget.`
      },
      {
        question: `Who should buy ${name}?`,
        answer: `It is best for ${bestFor}.`
      },
      {
        question: `What should you compare before buying?`,
        answer: `Compare capacity, cleanup, daily use, and one nearby alternative in the same ${subcategoryText} category before checkout.`
      }
    ]
  };
}

function buildFeatureSnapshot({ subcategory, priceRange, editorScore, bestAlternative }) {
  return [
    { label: "Category", value: "Kitchen" },
    { label: "Subcategory", value: subcategoryLabel(subcategory) },
    { label: "Price range", value: priceRange },
    { label: "Editor score", value: `${editorScore.toFixed(1)}/5` },
    { label: "Use case", value: useCase(subcategory) },
    { label: "Best alternative", value: bestAlternative || "Another top-rated option in this category" }
  ];
}

function sanitizeBrand(byline, fallback) {
  const cleaned = byline.replace(/^Visit the\s+/i, "").replace(/\s+Store$/i, "").trim();
  return cleaned || fallback;
}

function inferProductGroup(product) {
  const text = `${product.slug} ${product.name}`.toLowerCase();

  if (/(air-fryer|air fryer|air-fryer-oven|air fryer oven|dualzone|turbofry|crispi)/.test(text)) {
    return "air-fryers";
  }

  if (/(blender|nutribullet|magic-bullet|nutri)/.test(text)) {
    return "blenders";
  }

  if (/(coffee-maker|coffee maker|keurig|hamilton-beach|mueller-home|black-decker-12-cup)/.test(text)) {
    return "coffee-makers";
  }

  if (/(grinder|mug-warmer)/.test(text)) {
    return "coffee-tools";
  }

  if (/(chopper|scale|sprayer|toaster|slow|breakfast-station|silverware|spice-rack)/.test(text)) {
    return "kitchen-tools";
  }

  if (/(air-purifier|air purifier|levoit)/.test(text)) {
    return "air-treatment";
  }

  return product.category;
}

function mergeBySlug(existing, incoming) {
  const map = new Map(existing.map((item) => [item.slug, item]));
  for (const item of incoming) {
    map.set(item.slug, item);
  }
  return [...map.values()];
}

async function scrapeProducts(shortUrls) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  const results = [];

  for (const shortUrl of shortUrls) {
    await page.goto(shortUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(1800);
    const finalUrl = page.url();
    const asin = parseAsin(finalUrl);
    const override = PRODUCT_OVERRIDES[asin];

    if (!override) {
      throw new Error(`Missing override for ${shortUrl} (${asin})`);
    }

    const scraped = await page.evaluate(() => {
      const text = (sel) => document.querySelector(sel)?.textContent?.trim() || "";
      const attr = (sel, name) => document.querySelector(sel)?.getAttribute(name)?.trim() || "";
      const imageCandidates = [];

      for (const img of document.querySelectorAll("#altImages img, #imageBlock img, img.a-dynamic-image")) {
        const values = [img.getAttribute("data-old-hires"), img.getAttribute("src"), img.getAttribute("data-a-dynamic-image")];
        for (const value of values) {
          if (!value) continue;
          if (value.startsWith("{")) {
            try {
              const parsed = JSON.parse(value);
              for (const key of Object.keys(parsed)) imageCandidates.push(key);
            } catch {}
          } else {
            imageCandidates.push(value);
          }
        }
      }

      return {
        title: text("#productTitle") || document.title,
        byline: text("#bylineInfo"),
        price: text("#corePriceDisplay_desktop_feature_div .a-price .a-offscreen") ||
          text(".priceToPay span.a-offscreen") ||
          text("#corePrice_feature_div .a-price .a-offscreen") ||
          text(".apexPriceToPay span.a-offscreen"),
        ratingText: attr("#acrPopover", "title") || text("#acrPopover .a-size-base"),
        reviewsText: text("#acrCustomerReviewText"),
        images: imageCandidates
      };
    });

    results.push({
      shortUrl,
      finalUrl,
      asin,
      ...override,
      title: scraped.title,
      byline: scraped.byline,
      price: scraped.price,
      rating: parseNumber(scraped.ratingText),
      reviewCount: parseReviewCount(scraped.reviewsText),
      images: cleanImages(scraped.images.map((value) => value.replace(/\._[^.]+_\./g, "._SL1500_.")))
    });
  }

  await browser.close();
  return results;
}

function buildGeneratedRecords(scrapedItems, existingProducts) {
  const allProducts = [...existingProducts];
  const newProducts = [];
  const newReviews = [];

  for (const item of scrapedItems) {
    const usdPrice = convertSgdPriceToUsd(item.price);
    const priceRange = buildPriceRange(usdPrice);
    const category = "kitchen";
    const editorScore = item.rating ? Math.max(4.2, Math.min(4.8, Number((item.rating - 0.1).toFixed(1)))) : 4.4;
    const bestFor = bestForLine(item.subcategory);
    const avoidIf = avoidIfLine(item.subcategory);
    const conciseSummary = shortProductSummary(item.name, item.subcategory, usdPrice, item.rating, item.reviewCount);
    const canonicalProductUrl = `https://www.amazon.com/dp/${item.asin}`;
    const canonicalAffiliateUrl = `${canonicalProductUrl}?tag=${ASSOCIATE_TAG}`;
    const content = buildReviewContent({
      name: item.name,
      subcategory: item.subcategory,
      usdPrice,
      rating: item.rating,
      reviews: item.reviewCount,
      bestFor,
      avoidIf,
      priceRange
    });

    const productRecord = {
      asin: item.asin,
      name: item.name,
      slug: item.slug,
      brand: sanitizeBrand(item.byline, item.brand),
      imageUrl: item.images[0],
      imageGallery: item.images,
      summary: conciseSummary,
      quickVerdict: content.quickVerdict,
      features: [
        useCase(item.subcategory),
        item.rating && item.reviewCount ? `${item.rating.toFixed(1)}/5 rating from ${new Intl.NumberFormat("en-US").format(item.reviewCount)} shopper reviews` : "Strong shopper proof on Amazon",
        item.subcategory === "blenders" ? "Built for fast smoothies, frozen drinks, and quick daily prep." : "Built for fast cooking, reheating, and easier everyday kitchen use.",
        usdPrice ? `Current Amazon pricing is roughly ${formatMoney(usdPrice)}.` : "Check Amazon for the latest current price."
      ],
      pros: content.pros,
      cons: content.cons,
      rating: editorScore,
      reviewCount: item.reviewCount,
      priceRange,
      category,
      tags: ["kitchen", item.subcategory, item.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-")],
      affiliateLinks: [
        {
          retailerName: "Amazon",
          affiliateUrl: item.shortUrl,
          priceText: usdPrice ? `Around ${formatMoney(usdPrice)}` : "Check current price",
          ctaLabel: "Check Amazon"
        }
      ],
      alternatives: [],
      relatedProducts: [],
      relatedGuides: ["product-buying-guide", "how-to-choose-kitchen-appliances"],
      relatedComparisons: [],
      faq: content.faq,
      performance: content.performanceText,
      bestFor,
      avoidIf,
      tone: item.tone,
      highlightLabel: item.highlightLabel
    };

    allProducts.push(productRecord);
    newProducts.push(productRecord);

    const reviewRecord = {
      asin: item.asin,
      name: item.name,
      slug: item.slug,
      brand: sanitizeBrand(item.byline, item.brand),
      category,
      imageUrl: item.images[0],
      imageGallery: item.images,
      canonicalProductUrl,
      canonicalAffiliateUrl,
      shortAffiliateUrl: item.shortUrl,
      preferredAffiliateUrl: item.shortUrl,
      summary: content.summary,
      quickVerdict: content.quickVerdict,
      editorScore,
      priceMin: usdPrice ? Math.max(1, Math.round(usdPrice * 0.9)) : 0,
      priceMax: usdPrice ? Math.max(1, Math.round(usdPrice * 1.1)) : 0,
      priceText: priceRange,
      lastChecked: "March 11, 2026",
      bestFor,
      avoidIf,
      whyBuy: content.whyBuy,
      mainDrawback: content.mainDrawback,
      keyFeatures: productRecord.features,
      featureSnapshot: buildFeatureSnapshot({ subcategory: item.subcategory, priceRange, editorScore, bestAlternative: "" }),
      pros: content.pros,
      cons: content.cons,
      performanceText: content.performanceText,
      whoShouldBuy: `Buy ${item.name} if you want ${benefitLine(item.subcategory)} and prefer a proven Amazon listing over guesswork.`,
      whoShouldSkip: `Skip it if ${avoidIf}.`,
      retailerOffers: [
        {
          offerSlug: "amazon-preferred",
          retailerName: "Amazon",
          affiliateUrl: item.shortUrl,
          priceText: usdPrice ? `Current listing around ${formatMoney(usdPrice)}` : "Check the current Amazon price",
          offerLabel: "Manual affiliate link verified",
          stockNote: "Availability can change quickly on Amazon listings.",
          shippingNote: "Prime timing depends on listing and location.",
          ctaLabel: "Check Amazon",
          priority: 1
        },
        {
          offerSlug: "amazon-canonical",
          retailerName: "Amazon",
          affiliateUrl: canonicalAffiliateUrl,
          priceText: "Open the direct Amazon listing",
          offerLabel: "Fallback direct listing",
          stockNote: "Useful if the short link rotates or expires.",
          shippingNote: "Compare sellers and shipping before checkout.",
          ctaLabel: "Open Listing",
          priority: 2
        }
      ],
      alternatives: [],
      comparisons: [],
      faq: content.faq,
      relatedGuides: [
        {
          title: "Home Appliance Buying Guide: How To Choose The Right Product",
          summary: "A practical guide for narrowing the field before you move into reviews and top picks.",
          url: "/guides/product-buying-guide"
        },
        {
          title: "How To Choose Kitchen Appliances: What Matters Before You Buy",
          summary: "A simple buyer's guide for kitchen gear, countertop appliances, and everyday-use tools.",
          url: "/guides/how-to-choose-kitchen-appliances"
        }
      ],
      relatedReviews: [],
      disclosureText: "Affiliate links on this page may earn a commission if a reader clicks through and completes a purchase.",
      reviewMethodology: "This page is written to help buyers compare real Amazon listings with practical context, not fluff. The focus is daily use, value, fit, and what should be checked before clicking through.",
      tone: item.tone,
      heroImage: item.images[0]
    };

    newReviews.push(reviewRecord);
  }

  return { newProducts, newReviews };
}

function attachRelations(products, reviews) {
  const bySlug = new Map(products.map((product) => [product.slug, product]));

  for (const review of reviews) {
    const sourceProduct = bySlug.get(review.slug);
    if (!sourceProduct) continue;

    const sourceGroup = inferProductGroup(sourceProduct);
    const siblingProducts = products.filter((product) => product.slug !== review.slug && inferProductGroup(product) === sourceGroup);
    const fallbackProducts = products.filter((product) => product.slug !== review.slug && product.category === sourceProduct.category);
    const related = (siblingProducts.length > 0 ? siblingProducts : fallbackProducts).slice(0, 3);
    const supportedReviewGroup = ["air-fryers", "air-fryer-ovens", "blenders"].includes(sourceGroup);
    const groupLabel = supportedReviewGroup ? subcategoryLabel(sourceGroup).toLowerCase() : "this category";

    review.alternatives = related.map((product, index) => ({
      label: index === 0 ? "Alternative to compare" : index === 1 ? "Value alternative" : "Another option",
      title: product.name,
      summary: `${product.name} is worth opening next if you want a different take on ${groupLabel} pricing, size, or everyday fit.`,
      priceText: product.priceRange,
      reviewUrl: `/reviews/${product.slug}`
    }));

    review.relatedReviews = related.map((product) => ({
      title: `${product.name} Review`,
      summary: `${product.name} is another practical option if you want to compare buyer fit, daily use, and price before checkout.`,
      url: `/reviews/${product.slug}`
    }));

    if (supportedReviewGroup) {
      review.featureSnapshot = buildFeatureSnapshot({
        subcategory: sourceGroup,
        priceRange: review.priceText,
        editorScore: review.editorScore,
        bestAlternative: related[0]?.name ?? "Another top-rated option in this category"
      });
    }

    sourceProduct.alternatives = related.map((product) => product.slug);
    sourceProduct.relatedProducts = related.map((product) => product.slug);
  }

  return { products, reviews };
}

async function main() {
  const shortUrls = process.argv.slice(2);
  if (shortUrls.length === 0) {
    throw new Error("Provide at least one Amazon short link.");
  }

  const cwd = process.cwd();
  const productsPath = path.join(cwd, "content/generated/products.json");
  const reviewsIndexPath = path.join(cwd, "content/generated/reviews/index.json");
  const homepagePath = path.join(cwd, "content/generated/homepage.json");
  const topPicksPath = path.join(cwd, "content/generated/top-picks/index.json");
  const categoriesPath = path.join(cwd, "content/generated/categories/index.json");
  const reviewDir = path.join(cwd, "content/generated/reviews");

  const existingProducts = readJson(productsPath);
  const existingReviews = readJson(reviewsIndexPath);
  const homepage = readJson(homepagePath);
  const bestLists = readJson(topPicksPath);
  const categories = readJson(categoriesPath);

  const scraped = await scrapeProducts([...new Set(shortUrls)]);
  const { newProducts, newReviews } = buildGeneratedRecords(scraped, existingProducts);
  const mergedProducts = mergeBySlug(existingProducts, newProducts);
  const mergedReviews = mergeBySlug(existingReviews, newReviews);
  const related = attachRelations(mergedProducts, mergedReviews);

  writeJson(productsPath, related.products);
  writeJson(reviewsIndexPath, related.reviews);

  for (const review of newReviews) {
    const fullReview = related.reviews.find((item) => item.slug === review.slug);
    writeJson(path.join(reviewDir, `${review.slug}.json`), fullReview);
  }

  const newSlugs = newProducts.map((item) => item.slug);
  homepage.featuredReviewSlugs = [...new Set([...homepage.featuredReviewSlugs, ...newSlugs])];
  writeJson(homepagePath, homepage);

  const topPicks = bestLists.find((item) => item.slug === "top-picks");
  const bestKitchen = bestLists.find((item) => item.slug === "best-kitchen-appliances");
  if (topPicks) {
    topPicks.productSlugs = [...new Set([...topPicks.productSlugs, ...newSlugs])];
  }
  if (bestKitchen) {
    bestKitchen.productSlugs = [...new Set([...bestKitchen.productSlugs, ...newSlugs])];
  }
  writeJson(topPicksPath, bestLists);

  const kitchenCategory = categories.find((item) => item.slug === "kitchen");
  if (kitchenCategory) {
    kitchenCategory.productSlugs = [...new Set([...kitchenCategory.productSlugs, ...newSlugs])];
  }
  writeJson(categoriesPath, categories);

  console.log(`Imported ${newProducts.length} products.`);
  for (const product of newProducts) {
    console.log(`- ${product.slug}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
