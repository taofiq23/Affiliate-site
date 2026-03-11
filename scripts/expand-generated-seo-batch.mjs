import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

function writeJson(relativePath, value) {
  writeFileSync(path.join(root, relativePath), `${JSON.stringify(value, null, 2)}\n`);
}

function upsertBySlug(list, entry) {
  const next = [...list];
  const index = next.findIndex((item) => item.slug === entry.slug);
  if (index >= 0) {
    next[index] = entry;
  } else {
    next.push(entry);
  }
  return next;
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function paragraph(parts) {
  return parts.filter(Boolean).join(" ");
}

function makeGuide({ slug, title, description, noun, plural, styles, routineFocus, sizeFocus, performanceFocus, valueFocus, mistakes, shortlist, nextSteps, relatedBest, relatedReviews, relatedComparisons }) {
  const intro = paragraph([
    `This ${noun} buying guide is written for shoppers who want a clear path from research into a smarter shortlist, not a random scroll of listings.`,
    `If you are searching for the best ${noun} for home use, the real decision is not just which brand is most popular; it is which type of ${noun} matches the way you actually use it.`,
    `That means paying attention to ${routineFocus}, ${sizeFocus}, and how much day-to-day friction the product adds or removes in your kitchen.`,
    `This guide is built to help you compare the right tradeoffs, cut through marketing noise, and move into the best list and review pages with more confidence.`
  ]);

  const sections = [
    {
      heading: "Start With The Routine You Actually Have",
      body: [
        paragraph([
          `The best ${noun} for one buyer can be the wrong choice for another because home routines vary so much.`,
          `If you use your ${noun} every morning or several times a week, convenience and workflow matter more than a long feature list.`,
          `If your use is occasional, the smartest choice may be a simpler model that still fits your space and budget.`
        ]),
        paragraph([
          `This is why a good ${noun} guide begins with routine rather than brand.`,
          `When you are clear about ${routineFocus}, the shortlist gets much smaller and the decision becomes less stressful.`,
          `That clarity is what separates smart buyers from buyers who end up with a product that feels wrong after a few weeks.`
        ])
      ]
    },
    {
      heading: "Choose The Right Style Before Comparing Brands",
      body: [
        paragraph([
          `Most shoppers compare brands too early.`,
          `It is almost always smarter to decide on the ${noun} style first: ${styles}.`,
          `Each style solves a different problem, so picking the right style upfront saves you hours of confusion later.`
        ]),
        paragraph([
          `Once the style is clear, brand comparisons finally make sense.`,
          `You can then focus on a few realistic finalists instead of bouncing between unrelated product types.`,
          `That is the cleanest way to move from broad research into review pages that actually help.`
        ])
      ]
    },
    {
      heading: "Size, Footprint, And Cleanup Shape Daily Use",
      body: [
        paragraph([
          `Listing pages spend a lot of time on features, but real satisfaction often comes from practical details.`,
          `${sizeFocus} matters because it determines whether the ${noun} stays easy to use every day.`,
          `A machine that feels awkward to refill or clean usually becomes less appealing over time, even if the specs look strong.`
        ]),
        paragraph([
          `Cleanup friction is one of the most common reasons buyers regret a purchase.`,
          `When choosing a ${noun}, consider how often you will clean it and whether that cleanup fits your routine.`,
          `A product that is easy to keep clean tends to get used more, which is the real path to long-term value.`
        ])
      ]
    },
    {
      heading: "Performance Features That Actually Matter",
      body: [
        paragraph([
          `Not every feature improves real-world performance.`,
          `${performanceFocus} are the features that typically matter the most once the ${noun} is in daily use.`,
          `If a feature does not solve a real problem in your routine, it is often just marketing.`
        ]),
        paragraph([
          `The goal is not to buy the most complex ${noun}.`,
          `The goal is to buy the one that makes your daily routine feel easier and more consistent.`,
          `That is why a focused review page is more useful than a generic spec sheet.`
        ])
      ]
    },
    {
      heading: "Value Depends On Long-Term Fit, Not Just Price",
      body: [
        paragraph([
          `Price only makes sense when you compare it against frequency of use.`,
          `A lower-priced ${noun} can be a bad value if it creates daily friction or does not fit your routine.`,
          `A slightly higher-priced option can be smarter if it removes friction you feel every day.`
        ]),
        paragraph([
          `This is why buyers searching for the best ${plural} are usually looking for value, not just the cheapest listing.`,
          `If the product saves time, improves consistency, or eliminates a regular annoyance, it often earns the higher price.`,
          `If it does not, a simpler or cheaper option can be the better decision.`
        ])
      ]
    },
    {
      heading: "Common Buying Mistakes To Avoid",
      body: [
        paragraph([
          `The most common mistake is buying for an imagined routine instead of the real one.`,
          `Another is overpaying for features that never get used.`,
          `A third is underestimating how much ${mistakes} affects long-term satisfaction.`
        ]),
        paragraph([
          `The smartest buyers compare fit first, then compare brand.`,
          `If the product does not match the job you do repeatedly, even strong reviews will not make it feel right.`,
          `This is the logic that keeps a ${noun} purchase from becoming a regret.`
        ])
      ]
    },
    {
      heading: "How To Build A Smarter Shortlist",
      body: [
        paragraph([
          `After you pick the right ${noun} style, move into the best list page for this category.`,
          `From there, open two or three review pages that match your budget and routine.`,
          `This is faster than scanning random listings because each page answers a different decision step.`
        ]),
        paragraph([
          `That guide to best list to review path is also the best SEO flow.`,
          `It mirrors how people actually shop and keeps buyers moving toward clearer decisions.`,
          `${shortlist}`
        ])
      ]
    },
    {
      heading: "What To Read Next Before You Buy",
      body: [
        paragraph([
          `${nextSteps}`,
          `If two models still feel close, open the comparison page to settle the final decision.`,
          `The best ${noun} is rarely the one with the loudest listing; it is the one that fits the routine you actually live with.`
        ])
      ]
    }
  ];

  return {
    slug,
    title,
    description,
    intro,
    sections,
    faq: [
      {
        question: `How do I choose the right ${noun} for my home?`,
        answer: `Start with routine, then compare size, cleanup, and whether the ${noun} solves a repeated problem in your kitchen.`
      },
      {
        question: `Is a more expensive ${noun} always better?`,
        answer: "No. It is only better when the added cost removes real friction or improves a routine you repeat often."
      },
      {
        question: "What should I read after this guide?",
        answer: "Open the best-list page first, then review two or three finalists that match your routine and budget."
      }
    ],
    relatedBest,
    relatedReviews,
    relatedComparisons
  };
}
const guides = readJson("content/generated/guides/index.json");
const bestLists = readJson("content/generated/top-picks/index.json");
const comparisons = readJson("content/generated/comparisons/index.json");
const homepage = readJson("content/generated/homepage.json");
const categories = readJson("content/generated/categories/index.json");
const reviews = readJson("content/generated/reviews/index.json");

const newGuides = [
  makeGuide({
    slug: "how-to-choose-a-coffee-maker",
    title: "How To Choose A Coffee Maker For Home: What Actually Matters Before You Buy",
    description: "Learn how to choose a coffee maker by comparing brew style, capacity, cleanup, and daily value before you buy.",
    noun: "coffee maker",
    plural: "coffee makers",
    styles: "single-serve, drip, or flexible dual-format machines",
    routineFocus: "how many cups you actually brew and how fast you need them",
    sizeFocus: "counter fit, water reservoir access, and brew size",
    performanceFocus: "brew consistency, speed, and simple cleanup",
    valueFocus: "daily convenience versus long-term cost",
    mistakes: "cleanup and refill friction",
    shortlist: "A shortlist should include one convenient single-serve option and one multi-cup option so the tradeoffs are obvious.",
    nextSteps: "Start with the best coffee makers page, then open the review pages for the two or three models that fit your space and routine.",
    relatedBest: ["best-coffee-makers-for-home", "best-coffee-gear", "top-picks"],
    relatedReviews: [
      "keurig-k-elite-single-serve-k-cup-pod",
      "keurig-k-duo-hot-and-iced-coffee-maker",
      "hamilton-beach-2-way-programmable-coffee-maker",
      "keurig-k-mini-single-serve-coffee-maker"
    ],
    relatedComparisons: [
      "keurig-k-elite-single-serve-k-cup-pod-vs-hamilton-beach-2-way-programmable-coffee-maker"
    ]
  }),
  makeGuide({
    slug: "how-to-choose-a-coffee-grinder",
    title: "How To Choose A Coffee Grinder: What Makes A Better Home Coffee Setup",
    description: "Learn how to choose a coffee grinder by comparing grind consistency, noise, size, and everyday value before you buy.",
    noun: "coffee grinder",
    plural: "coffee grinders",
    styles: "compact daily grinders and stronger everyday models",
    routineFocus: "whether fresh grinding actually changes your daily coffee routine",
    sizeFocus: "noise level, footprint, and mess control",
    performanceFocus: "consistent grinding and easy daily use",
    valueFocus: "better coffee habits versus extra clutter",
    mistakes: "noise and cleanup",
    shortlist: "The best grinder shortlist includes one value option and one stronger option so you can compare price with real routine payoff.",
    nextSteps: "Open the coffee gear shortlist, then the grinder review page if you want a clear, low-friction first grinder.",
    relatedBest: ["best-coffee-gear", "best-coffee-makers-for-home", "top-picks"],
    relatedReviews: [
      "black-decker-one-touch-coffee-grinder-2-3",
      "keurig-k-elite-single-serve-k-cup-pod",
      "keurig-k-duo-hot-and-iced-coffee-maker"
    ],
    relatedComparisons: ["single-serve-vs-drip-coffee-maker"]
  }),
  makeGuide({
    slug: "how-to-choose-an-air-fryer",
    title: "How To Choose An Air Fryer: Basket Size, Cleanup, and Everyday Value",
    description: "Use this air fryer guide to compare basket size, cooking style, cleanup, and daily kitchen fit before you buy.",
    noun: "air fryer",
    plural: "air fryers",
    styles: "basket-style models and oven-style air fryer ovens",
    routineFocus: "how often you want fast meals versus larger batch flexibility",
    sizeFocus: "basket size, storage space, and countertop fit",
    performanceFocus: "crispy results, speed, and easy cleanup",
    valueFocus: "weekly cooking value rather than hype",
    mistakes: "cleanup and oversized footprint",
    shortlist: "Start with a basket model if you want speed, then compare one oven-style option if you need more flexibility.",
    nextSteps: "Use the best air fryers page to shortlist, then open two review pages before choosing.",
    relatedBest: ["best-air-fryers-for-home", "best-kitchen-appliances", "top-picks"],
    relatedReviews: [
      "ninja-air-fryer-pro-5qt",
      "cosori-turboblaze-air-fryer-6qt",
      "ninja-foodi-dualzone-air-fryer-8qt",
      "chefman-multifunction-air-fryer-oven-10l"
    ],
    relatedComparisons: ["ninja-air-fryer-pro-5qt-vs-cosori-turboblaze-air-fryer-6qt"]
  }),
  makeGuide({
    slug: "how-to-choose-a-blender",
    title: "How To Choose A Blender: Personal, Countertop, and Everyday Prep Needs",
    description: "Learn how to choose a blender by comparing serving size, cleanup, storage, and daily use before you buy.",
    noun: "blender",
    plural: "blenders",
    styles: "personal blenders and full-size countertop blenders",
    routineFocus: "smoothies, sauces, and how often you actually blend",
    sizeFocus: "cup size, jar size, and storage convenience",
    performanceFocus: "smoothie performance, speed, and simple cleanup",
    valueFocus: "repeat use versus headline power",
    mistakes: "overbuying size you do not need",
    shortlist: "Compare a compact personal blender against one full-size option before you decide.",
    nextSteps: "Open the best blenders page, then review two or three finalists that match your serving size.",
    relatedBest: ["best-blenders-for-smoothies", "best-kitchen-appliances", "top-picks"],
    relatedReviews: [
      "ninja-nutri-blender-plus",
      "nutribullet-personal-blender-24oz",
      "ninja-professional-blender-72oz",
      "magic-bullet-blender-small-silver"
    ],
    relatedComparisons: ["ninja-nutri-blender-plus-vs-nutribullet-personal-blender-24oz"]
  })
];
const comparisonGuides = [
  {
    slug: "single-serve-vs-drip-coffee-maker",
    title: "Single-Serve vs Drip Coffee Maker: Which Setup Fits Your Routine Better?",
    description: "Compare single-serve and drip coffee makers by speed, cleanup, cost, and daily convenience before you buy.",
    intro: "This comparison guide helps buyers decide between single-serve coffee makers and traditional drip machines. Both can be good buys, but they solve different problems, and the better choice depends on your routine, your kitchen space, and how many cups you actually brew in a typical week.",
    sections: [
      {
        heading: "When Single-Serve Coffee Makers Make More Sense",
        body: [
          "Single-serve machines win when speed and simplicity matter more than batch brewing. They fit small counters and make one cup fast.",
          "They are ideal for solo drinkers, households where people brew at different times, and buyers who want a low-friction routine."
        ]
      },
      {
        heading: "When Drip Machines Offer Better Value",
        body: [
          "Drip machines usually win when you brew multiple cups or serve more than one person. They often deliver better value per cup.",
          "They can feel less convenient for one-cup routines, but for households they are often the smarter long-term choice."
        ]
      },
      {
        heading: "What To Compare Before You Decide",
        body: [
          "Compare cleanup, counter space, and how many cups you actually brew. Those are the factors that decide satisfaction.",
          "If you want speed and minimal cleanup, single-serve tends to win. If you want volume and flexibility, drip usually wins."
        ]
      }
    ],
    faq: [
      {
        question: "Is a single-serve coffee maker better than a drip machine?",
        answer: "It is better for speed and one-cup convenience. Drip machines are often better for multi-cup households and overall value."
      }
    ],
    relatedBest: ["best-coffee-makers-for-home", "best-coffee-gear", "top-picks"],
    relatedReviews: [
      "keurig-k-elite-single-serve-k-cup-pod",
      "keurig-k-mini-single-serve-coffee-maker",
      "hamilton-beach-2-way-programmable-coffee-maker",
      "keurig-k-duo-hot-and-iced-coffee-maker"
    ],
    relatedComparisons: [
      "keurig-k-duo-hot-and-iced-coffee-maker-vs-keurig-k-mini-single-serve-coffee-maker"
    ]
  },
  {
    slug: "personal-blender-vs-full-size-blender",
    title: "Personal Blender vs Full-Size Blender: Which One Should You Buy?",
    description: "Compare personal and full-size blenders by serving size, cleanup, storage, and everyday kitchen value.",
    intro: "This guide helps buyers decide between compact personal blenders and larger countertop blenders. Both can be good buys, but the right choice depends on serving size, counter space, and how often you blend.",
    sections: [
      {
        heading: "Why Personal Blenders Feel Easier",
        body: [
          "Personal blenders win on speed, small footprint, and easy cleanup. They are ideal for single servings and quick smoothies.",
          "They can feel limited for family use, but they are often the most practical choice for solo routines."
        ]
      },
      {
        heading: "When A Full-Size Blender Is Worth It",
        body: [
          "Full-size blenders make sense when you need bigger batches or more prep flexibility. They can justify the bigger footprint.",
          "They are better for families and larger recipes, but can feel excessive for simple one-cup routines."
        ]
      },
      {
        heading: "How To Choose Between Them",
        body: [
          "The best choice depends on how often you blend and how many servings you need. Cleanup and storage matter more than extra power.",
          "If you want a blender that gets used daily, choose the one that fits your routine and space."
        ]
      }
    ],
    faq: [
      {
        question: "Is a personal blender better than a full-size blender?",
        answer: "Personal blenders are better for single servings and easy cleanup. Full-size blenders are better for larger batches."
      }
    ],
    relatedBest: ["best-blenders-for-smoothies", "best-kitchen-appliances", "top-picks"],
    relatedReviews: [
      "ninja-nutri-blender-plus",
      "nutribullet-personal-blender-24oz",
      "ninja-professional-blender-72oz",
      "magic-bullet-blender-small-silver"
    ],
    relatedComparisons: ["ninja-nutri-blender-plus-vs-nutribullet-personal-blender-24oz"]
  },
  {
    slug: "basket-air-fryer-vs-air-fryer-oven",
    title: "Basket Air Fryer vs Air Fryer Oven: Which Style Makes More Sense?",
    description: "Compare basket air fryers and air fryer ovens by speed, capacity, cleanup, and counter space.",
    intro: "This guide helps buyers choose between basket air fryers and oven-style air fryer models. Both can be smart buys, but they fit different kitchens and cooking routines.",
    sections: [
      {
        heading: "Why Basket Air Fryers Are Often The First Choice",
        body: [
          "Basket air fryers are simple, quick to heat, and easy to clean. They are often the easiest recommendation for first-time buyers.",
          "They work well for fast meals and small kitchens where speed and simplicity matter most."
        ]
      },
      {
        heading: "Why Air Fryer Ovens Still Matter",
        body: [
          "Air fryer ovens make sense when you need more capacity or want a broader countertop tool. They handle larger portions and more variety.",
          "They are usually larger and take more space, so they only make sense if you will use that extra flexibility."
        ]
      },
      {
        heading: "How To Decide Between The Two",
        body: [
          "If speed and easy cleanup are top priority, a basket model is usually best. If capacity and flexibility are the priority, oven style wins.",
          "The right choice depends on kitchen space, batch size, and how often you plan to use the appliance."
        ]
      }
    ],
    faq: [
      {
        question: "Is a basket air fryer better than an air fryer oven?",
        answer: "Basket models are usually better for speed and simplicity. Oven models are better for capacity and flexibility."
      }
    ],
    relatedBest: ["best-air-fryers-for-home", "best-kitchen-appliances", "top-picks"],
    relatedReviews: [
      "ninja-air-fryer-pro-5qt",
      "cosori-turboblaze-air-fryer-6qt",
      "chefman-multifunction-air-fryer-oven-10l",
      "emeril-lagasse-french-door-air-fryer-oven-26qt"
    ],
    relatedComparisons: ["ninja-air-fryer-pro-5qt-vs-cosori-turboblaze-air-fryer-6qt"]
  }
];

const newBestLists = [
  {
    slug: "best-coffee-makers-for-home",
    title: "Best Coffee Makers For Home: Smart Picks For Convenience, Value, and Daily Use",
    description: "A buyer-focused shortlist of the best coffee makers for home, built to help you compare convenience, flexibility, and daily value.",
    intro: "This page is for shoppers who already know they want a coffee maker and need a cleaner shortlist of the options most worth comparing. It focuses on home use value, workflow comfort, and whether the machine still feels right after the first few weeks.",
    highlights: [
      "Built around real home routines, not generic marketplace sorting",
      "Balances convenience, capacity, cleanup, and price comfort",
      "Best used to move into review pages and final comparisons"
    ],
    productSlugs: [
      "keurig-k-elite-single-serve-k-cup-pod",
      "keurig-k-duo-hot-and-iced-coffee-maker",
      "hamilton-beach-2-way-programmable-coffee-maker",
      "keurig-k-mini-single-serve-coffee-maker",
      "black-decker-12-cup-digital-coffee-maker-washable",
      "mueller-home-12-cup-red-coffee-maker"
    ],
    faq: [
      {
        question: "How should readers use this best coffee makers page?",
        answer: "Use it to narrow the field by routine first, then open two or three review pages that match your budget and space."
      },
      {
        question: "What matters most after reading this shortlist?",
        answer: "Compare cleanup, cup style, and whether you want one-cup convenience or multi-cup flexibility."
      }
    ],
    relatedGuides: ["how-to-choose-a-coffee-maker", "single-serve-vs-drip-coffee-maker", "how-to-choose-coffee-gear"],
    relatedReviews: [
      "keurig-k-elite-single-serve-k-cup-pod",
      "keurig-k-duo-hot-and-iced-coffee-maker",
      "hamilton-beach-2-way-programmable-coffee-maker"
    ],
    relatedComparisons: ["keurig-k-elite-single-serve-k-cup-pod-vs-hamilton-beach-2-way-programmable-coffee-maker"]
  },
  {
    slug: "best-air-fryers-for-home",
    title: "Best Air Fryers For Home: Fast, Practical Picks Worth Comparing",
    description: "A shortlist of the best air fryers for home use, built around cleanup, cooking style, capacity, and daily value.",
    intro: "This page is for buyers who already know an air fryer belongs on the shortlist and want the clearest path to a smarter final decision.",
    highlights: [
      "Focused on real home use, not just feature inflation",
      "Helps buyers compare basket models and oven-style options",
      "Designed to move readers into reviews and comparisons"
    ],
    productSlugs: [
      "ninja-air-fryer-pro-5qt",
      "cosori-turboblaze-air-fryer-6qt",
      "ninja-foodi-dualzone-air-fryer-8qt",
      "chefman-turbofry-air-fryer-8qt",
      "chefman-multifunction-air-fryer-oven-10l",
      "emeril-lagasse-french-door-air-fryer-oven-26qt",
      "ninja-crispi-glass-air-fryer"
    ],
    faq: [
      {
        question: "What should buyers compare first on this air fryer shortlist?",
        answer: "Start with basket size and format. Decide whether you want a basket model or an oven-style model first."
      }
    ],
    relatedGuides: ["how-to-choose-an-air-fryer", "basket-air-fryer-vs-air-fryer-oven", "how-to-choose-kitchen-appliances"],
    relatedReviews: [
      "ninja-air-fryer-pro-5qt",
      "cosori-turboblaze-air-fryer-6qt",
      "ninja-foodi-dualzone-air-fryer-8qt"
    ],
    relatedComparisons: ["ninja-air-fryer-pro-5qt-vs-cosori-turboblaze-air-fryer-6qt"]
  },
  {
    slug: "best-blenders-for-smoothies",
    title: "Best Blenders For Smoothies: Smart Picks For Daily Drinks and Quick Prep",
    description: "A buyer-focused shortlist of the best blenders for smoothies, sauces, and everyday kitchen prep.",
    intro: "This page is built for shoppers who already know they want a smoothie-friendly blender and now need a tighter shortlist of the models most worth reviewing next.",
    highlights: [
      "Focused on smoothie-friendly blenders with strong review proof",
      "Separates personal blenders from larger countertop options",
      "Best used as a bridge into review pages and final comparisons"
    ],
    productSlugs: [
      "ninja-nutri-blender-plus",
      "nutribullet-personal-blender-24oz",
      "ninja-nutri-pro-personal-blender",
      "ninja-professional-blender-72oz",
      "magic-bullet-blender-small-silver"
    ],
    faq: [
      {
        question: "How should readers use this best blenders shortlist?",
        answer: "Start by deciding whether you want a personal blender or a full-size blender, then open the review pages that match your serving size."
      }
    ],
    relatedGuides: ["how-to-choose-a-blender", "personal-blender-vs-full-size-blender", "how-to-choose-kitchen-appliances"],
    relatedReviews: [
      "ninja-nutri-blender-plus",
      "nutribullet-personal-blender-24oz",
      "ninja-professional-blender-72oz"
    ],
    relatedComparisons: ["ninja-nutri-blender-plus-vs-nutribullet-personal-blender-24oz"]
  }
];

const newComparisons = [
  {
    slug: "ninja-air-fryer-pro-5qt-vs-cosori-turboblaze-air-fryer-6qt",
    title: "Ninja Air Fryer Pro 5-Qt vs COSORI TurboBlaze Air Fryer 6-Qt: Which Air Fryer Is Better For Home Use?",
    description: "A side-by-side look at Ninja Air Fryer Pro 5-Qt and COSORI TurboBlaze Air Fryer 6-Qt covering size, cleanup, speed, and everyday value.",
    intro: "This comparison helps buyers choose between two popular basket air fryers by focusing on size, cleanup, and real kitchen fit.",
    productSlugs: ["ninja-air-fryer-pro-5qt", "cosori-turboblaze-air-fryer-6qt"],
    verdict: "Ninja Air Fryer Pro 5-Qt is the safer choice for most buyers who want strong proof and simple daily use, while COSORI TurboBlaze Air Fryer 6-Qt makes more sense if you want a little more capacity without leaving the basket style.",
    featureComparison: "Both models target fast countertop cooking. The real decision comes down to basket size, counter fit, and whether the extra capacity of the COSORI model matters for your routine.",
    performanceComparison: "Ninja Air Fryer Pro 5-Qt carries a larger review base, while COSORI TurboBlaze Air Fryer 6-Qt is also strongly rated. Fit and capacity are the deciding factors.",
    priceComparison: "Both models typically sit in the same general price range, so the best choice is usually the one that fits your kitchen better.",
    faq: [
      {
        question: "Which air fryer is easier to recommend first?",
        answer: "Ninja Air Fryer Pro 5-Qt is the safer first recommendation because its review base is stronger and it fits the classic basket-style use case well."
      }
    ],
    relatedGuides: ["how-to-choose-an-air-fryer", "basket-air-fryer-vs-air-fryer-oven"],
    relatedReviews: ["ninja-air-fryer-pro-5qt", "cosori-turboblaze-air-fryer-6qt"]
  },
  {
    slug: "ninja-nutri-blender-plus-vs-nutribullet-personal-blender-24oz",
    title: "Ninja Nutri-Blender Plus vs NutriBullet Personal Blender 24-Oz: Which Smoothie Blender Should You Buy?",
    description: "A buyer-focused comparison of Ninja Nutri-Blender Plus and NutriBullet Personal Blender 24-Oz for smoothies and quick prep.",
    intro: "This comparison helps buyers choose between two popular personal blenders by focusing on daily workflow, cleanup, and price comfort.",
    productSlugs: ["ninja-nutri-blender-plus", "nutribullet-personal-blender-24oz"],
    verdict: "Ninja Nutri-Blender Plus is the stronger all-around pick for buyers who want proven smoothie performance, while NutriBullet Personal Blender 24-Oz remains a strong option for simple, compact routines.",
    featureComparison: "Both machines target quick smoothies and single-serve prep. The decision comes down to cup workflow and how the machine fits your daily routine.",
    performanceComparison: "Both models show strong review proof, so the choice is usually about fit and cleanup rather than raw ratings.",
    priceComparison: "NutriBullet often lands slightly lower in price, while Ninja carries a small premium for broader proof. Fit should decide the final pick.",
    faq: [
      {
        question: "Which blender is easier to recommend first?",
        answer: "Ninja Nutri-Blender Plus is the safer first recommendation for most smoothie buyers, with NutriBullet as the value alternative."
      }
    ],
    relatedGuides: ["how-to-choose-a-blender", "personal-blender-vs-full-size-blender"],
    relatedReviews: ["ninja-nutri-blender-plus", "nutribullet-personal-blender-24oz"]
  },
  {
    slug: "keurig-k-duo-hot-and-iced-coffee-maker-vs-keurig-k-mini-single-serve-coffee-maker",
    title: "Keurig K-Duo Hot & Iced Coffee Maker vs Keurig K-Mini: Which Coffee Maker Fits Better?",
    description: "A side-by-side comparison of Keurig K-Duo Hot & Iced Coffee Maker and Keurig K-Mini covering flexibility, footprint, and daily value.",
    intro: "This comparison helps buyers choose between a flexible multi-format machine and a compact single-serve model.",
    productSlugs: ["keurig-k-duo-hot-and-iced-coffee-maker", "keurig-k-mini-single-serve-coffee-maker"],
    verdict: "Keurig K-Duo Hot & Iced Coffee Maker is best for shoppers who want flexibility and more than one brewing style, while Keurig K-Mini is best for buyers who want the smallest, simplest one-cup setup possible.",
    featureComparison: "K-Duo covers more brewing options, while K-Mini focuses on compact simplicity. The right choice depends on kitchen space and routine.",
    performanceComparison: "Both models hold strong review proof, so the decision is more about routine fit than raw ratings.",
    priceComparison: "K-Duo usually costs more than K-Mini, so the question is whether the added flexibility is worth paying for.",
    faq: [
      {
        question: "Which coffee maker is easier to recommend first?",
        answer: "Keurig K-Duo is the safer first recommendation when flexibility matters, while K-Mini is best for compact kitchens."
      }
    ],
    relatedGuides: ["how-to-choose-a-coffee-maker", "single-serve-vs-drip-coffee-maker"],
    relatedReviews: ["keurig-k-duo-hot-and-iced-coffee-maker", "keurig-k-mini-single-serve-coffee-maker"]
  }
];
let nextGuides = [...guides];
for (const guide of [...newGuides, ...comparisonGuides]) {
  nextGuides = upsertBySlug(nextGuides, guide);
}

let nextBestLists = [...bestLists];
for (const bestList of newBestLists) {
  nextBestLists = upsertBySlug(nextBestLists, bestList);
}

let nextComparisons = [...comparisons];
for (const comparison of newComparisons) {
  nextComparisons = upsertBySlug(nextComparisons, comparison);
}

const reviewTitles = Object.fromEntries(reviews.map((review) => [review.slug, `${review.name} Review`]));

const reviewLink = (slug, summary) => ({
  title: reviewTitles[slug] ?? "Related Review",
  summary,
  url: `/reviews/${slug}`
});

const comparisonLink = (slug, title, summary) => ({ title, summary, url: `/compare/${slug}` });
const guideLink = (slug, title, summary) => ({ title, summary, url: `/guides/${slug}` });

const guideMeta = {
  "how-to-choose-a-coffee-maker": {
    title: "How To Choose A Coffee Maker For Home: What Actually Matters Before You Buy",
    summary: "A practical coffee maker guide covering brew style, capacity, cleanup, and value."
  },
  "how-to-choose-a-coffee-grinder": {
    title: "How To Choose A Coffee Grinder: What Makes A Better Home Coffee Setup",
    summary: "A buyer-first grinder guide focused on consistency, noise, size, and daily value."
  },
  "how-to-choose-an-air-fryer": {
    title: "How To Choose An Air Fryer: Basket Size, Cleanup, and Everyday Value",
    summary: "A practical air fryer guide for basket size, cleanup, and daily fit."
  },
  "how-to-choose-a-blender": {
    title: "How To Choose A Blender: Personal, Countertop, and Everyday Prep Needs",
    summary: "A blender guide that focuses on serving size, cleanup, and real kitchen use."
  },
  "single-serve-vs-drip-coffee-maker": {
    title: "Single-Serve vs Drip Coffee Maker: Which Setup Fits Your Routine Better?",
    summary: "A clear comparison of single-serve and drip machines by routine and value."
  },
  "personal-blender-vs-full-size-blender": {
    title: "Personal Blender vs Full-Size Blender: Which One Should You Buy?",
    summary: "A comparison guide for personal vs full-size blenders."
  },
  "basket-air-fryer-vs-air-fryer-oven": {
    title: "Basket Air Fryer vs Air Fryer Oven: Which Style Makes More Sense?",
    summary: "A guide to choosing between basket air fryers and oven-style models."
  }
};

const comparisonMeta = {
  "ninja-air-fryer-pro-5qt-vs-cosori-turboblaze-air-fryer-6qt": {
    title: "Ninja Air Fryer Pro 5-Qt vs COSORI TurboBlaze Air Fryer 6-Qt: Which Air Fryer Is Better For Home Use?",
    summary: "A direct comparison of two popular basket air fryers.",
    products: ["ninja-air-fryer-pro-5qt", "cosori-turboblaze-air-fryer-6qt"]
  },
  "ninja-nutri-blender-plus-vs-nutribullet-personal-blender-24oz": {
    title: "Ninja Nutri-Blender Plus vs NutriBullet Personal Blender 24-Oz: Which Smoothie Blender Should You Buy?",
    summary: "A side-by-side comparison of two strong smoothie blenders.",
    products: ["ninja-nutri-blender-plus", "nutribullet-personal-blender-24oz"]
  },
  "keurig-k-duo-hot-and-iced-coffee-maker-vs-keurig-k-mini-single-serve-coffee-maker": {
    title: "Keurig K-Duo Hot & Iced Coffee Maker vs Keurig K-Mini: Which Coffee Maker Fits Better?",
    summary: "A comparison of flexible brewing versus compact single-serve convenience.",
    products: ["keurig-k-duo-hot-and-iced-coffee-maker", "keurig-k-mini-single-serve-coffee-maker"]
  }
};

const guideLinksBySlug = Object.fromEntries(
  Object.entries(guideMeta).map(([slug, meta]) => [slug, guideLink(slug, meta.title, meta.summary)])
);

const comparisonLinksBySlug = Object.fromEntries(
  Object.entries(comparisonMeta).map(([slug, meta]) => [slug, comparisonLink(slug, meta.title, meta.summary)])
);

const guideAssignments = {
  "keurig-k-elite-single-serve-k-cup-pod": ["how-to-choose-a-coffee-maker", "single-serve-vs-drip-coffee-maker"],
  "keurig-k-duo-hot-and-iced-coffee-maker": ["how-to-choose-a-coffee-maker", "single-serve-vs-drip-coffee-maker"],
  "hamilton-beach-2-way-programmable-coffee-maker": ["how-to-choose-a-coffee-maker", "single-serve-vs-drip-coffee-maker"],
  "keurig-k-mini-single-serve-coffee-maker": ["how-to-choose-a-coffee-maker", "single-serve-vs-drip-coffee-maker"],
  "black-decker-one-touch-coffee-grinder-2-3": ["how-to-choose-a-coffee-grinder"],
  "ninja-air-fryer-pro-5qt": ["how-to-choose-an-air-fryer", "basket-air-fryer-vs-air-fryer-oven"],
  "cosori-turboblaze-air-fryer-6qt": ["how-to-choose-an-air-fryer", "basket-air-fryer-vs-air-fryer-oven"],
  "ninja-foodi-dualzone-air-fryer-8qt": ["how-to-choose-an-air-fryer"],
  "chefman-multifunction-air-fryer-oven-10l": ["how-to-choose-an-air-fryer", "basket-air-fryer-vs-air-fryer-oven"],
  "emeril-lagasse-french-door-air-fryer-oven-26qt": ["how-to-choose-an-air-fryer", "basket-air-fryer-vs-air-fryer-oven"],
  "ninja-nutri-blender-plus": ["how-to-choose-a-blender", "personal-blender-vs-full-size-blender"],
  "nutribullet-personal-blender-24oz": ["how-to-choose-a-blender", "personal-blender-vs-full-size-blender"],
  "ninja-nutri-pro-personal-blender": ["how-to-choose-a-blender", "personal-blender-vs-full-size-blender"],
  "ninja-professional-blender-72oz": ["how-to-choose-a-blender", "personal-blender-vs-full-size-blender"],
  "magic-bullet-blender-small-silver": ["how-to-choose-a-blender", "personal-blender-vs-full-size-blender"]
};

const comparisonAssignments = Object.fromEntries(
  Object.entries(comparisonMeta).flatMap(([slug, meta]) => meta.products.map((product) => [product, slug]))
);

const reviewSummaries = {
  "keurig-k-elite-single-serve-k-cup-pod": "A coffee-maker review focused on one-cup convenience, cleanup, and price comfort.",
  "keurig-k-duo-hot-and-iced-coffee-maker": "A coffee-maker review focused on flexibility and daily use value.",
  "hamilton-beach-2-way-programmable-coffee-maker": "A review focused on batch brewing value and everyday fit.",
  "keurig-k-mini-single-serve-coffee-maker": "A compact coffee review for small kitchens and quick one-cup use.",
  "black-decker-one-touch-coffee-grinder-2-3": "A coffee grinder review focused on simple bean grinding and value.",
  "ninja-air-fryer-pro-5qt": "An air fryer review focused on basket size, cleanup, and daily value.",
  "cosori-turboblaze-air-fryer-6qt": "An air fryer review focused on capacity and weeknight convenience.",
  "ninja-foodi-dualzone-air-fryer-8qt": "A review focused on dual-zone flexibility and batch cooking.",
  "chefman-multifunction-air-fryer-oven-10l": "A review focused on oven-style flexibility and footprint.",
  "ninja-nutri-blender-plus": "A smoothie blender review focused on quick prep and easy cleanup.",
  "nutribullet-personal-blender-24oz": "A personal blender review focused on small-space convenience.",
  "ninja-professional-blender-72oz": "A full-size blender review focused on larger batches and kitchen prep.",
  "magic-bullet-blender-small-silver": "A compact blender review focused on budget-friendly daily use."
};

function mergeLinks(existing, additions) {
  const seen = new Set();
  const merged = [];
  for (const item of [...(existing ?? []), ...additions]) {
    if (!item?.url || seen.has(item.url)) {
      continue;
    }
    seen.add(item.url);
    merged.push(item);
  }
  return merged;
}

const nextReviews = reviews.map((review) => {
  const guideSlugs = guideAssignments[review.slug] ?? [];
  const comparisonSlug = comparisonAssignments[review.slug];
  const guideLinks = guideSlugs.map((slug) => guideLinksBySlug[slug]).filter(Boolean);
  const comparisonLinks = comparisonSlug ? [comparisonLinksBySlug[comparisonSlug]] : [];
  const relatedReviewLinks = (review.relatedProducts ?? [])
    .slice(0, 3)
    .map((slug) => reviewLink(slug, reviewSummaries[slug] ?? "Open the review to compare price, fit, and daily use."));

  if (guideLinks.length === 0 && comparisonLinks.length === 0 && relatedReviewLinks.length === 0) {
    return review;
  }

  return {
    ...review,
    relatedGuides: mergeLinks(review.relatedGuides, guideLinks),
    comparisons: mergeLinks(review.comparisons, comparisonLinks),
    relatedReviews: mergeLinks(review.relatedReviews, relatedReviewLinks)
  };
});

homepage.featuredGuideSlugs = unique([
  "product-buying-guide",
  "how-to-choose-a-coffee-maker",
  "how-to-choose-an-air-fryer",
  "how-to-choose-a-blender",
  ...homepage.featuredGuideSlugs
]);

homepage.popularComparisonSlugs = unique([
  "ninja-air-fryer-pro-5qt-vs-cosori-turboblaze-air-fryer-6qt",
  "ninja-nutri-blender-plus-vs-nutribullet-personal-blender-24oz",
  "keurig-k-duo-hot-and-iced-coffee-maker-vs-keurig-k-mini-single-serve-coffee-maker",
  ...homepage.popularComparisonSlugs
]);

const nextCategories = categories.map((category) => {
  if (category.slug === "coffee") {
    return {
      ...category,
      bestSlugs: unique([...category.bestSlugs, "best-coffee-makers-for-home"]),
      guideSlugs: unique([
        ...category.guideSlugs,
        "how-to-choose-a-coffee-maker",
        "how-to-choose-a-coffee-grinder",
        "single-serve-vs-drip-coffee-maker"
      ]),
      comparisonSlugs: unique([
        ...category.comparisonSlugs,
        "keurig-k-duo-hot-and-iced-coffee-maker-vs-keurig-k-mini-single-serve-coffee-maker"
      ])
    };
  }

  if (category.slug === "kitchen") {
    return {
      ...category,
      bestSlugs: unique([...category.bestSlugs, "best-air-fryers-for-home", "best-blenders-for-smoothies"]),
      guideSlugs: unique([
        ...category.guideSlugs,
        "how-to-choose-an-air-fryer",
        "how-to-choose-a-blender",
        "personal-blender-vs-full-size-blender",
        "basket-air-fryer-vs-air-fryer-oven"
      ]),
      comparisonSlugs: unique([
        ...category.comparisonSlugs,
        "ninja-air-fryer-pro-5qt-vs-cosori-turboblaze-air-fryer-6qt",
        "ninja-nutri-blender-plus-vs-nutribullet-personal-blender-24oz"
      ])
    };
  }

  return category;
});

writeJson("content/generated/guides/index.json", nextGuides);
writeJson("content/generated/top-picks/index.json", nextBestLists);
writeJson("content/generated/comparisons/index.json", nextComparisons);
writeJson("content/generated/homepage.json", homepage);
writeJson("content/generated/categories/index.json", nextCategories);
writeJson("content/generated/reviews/index.json", nextReviews);

for (const review of nextReviews) {
  const relativePath = `content/generated/reviews/${review.slug}.json`;
  if (existsSync(path.join(root, relativePath))) {
    writeJson(relativePath, review);
  }
}
