export type AffiliateLink = {
  retailerName: string;
  affiliateUrl: string;
  priceText: string;
  ctaLabel: string;
};

export type ContentFaq = {
  question: string;
  answer: string;
};

export type ProductRecord = {
  asin?: string;
  name: string;
  slug: string;
  brand: string;
  imageUrl?: string;
  image?: string;
  imageGallery?: string[];
  summary: string;
  quickVerdict: string;
  features: string[];
  pros: string[];
  cons: string[];
  rating: number;
  reviewCount: number;
  priceRange: string;
  category: string;
  tags: string[];
  affiliateLinks: AffiliateLink[];
  alternatives: string[];
  relatedProducts: string[];
  relatedGuides: string[];
  relatedComparisons: string[];
  faq: ContentFaq[];
  performance: string;
  bestFor: string;
  avoidIf: string;
  tone: string;
  highlightLabel: string;
};

export type GuideSection = {
  heading: string;
  body: string[];
};

export type BestListRecord = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  highlights: string[];
  productSlugs: string[];
  faq: ContentFaq[];
  relatedGuides: string[];
  relatedReviews: string[];
  relatedComparisons: string[];
};

export type ComparisonRecord = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  productSlugs: [string, string];
  verdict: string;
  featureComparison: string;
  performanceComparison: string;
  priceComparison: string;
  faq: ContentFaq[];
  relatedGuides: string[];
  relatedReviews: string[];
};

export type GuideRecord = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: GuideSection[];
  faq: ContentFaq[];
  relatedBest: string[];
  relatedReviews: string[];
  relatedComparisons: string[];
};

export type CategoryRecord = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  productSlugs: string[];
  bestSlugs: string[];
  guideSlugs: string[];
  comparisonSlugs: string[];
  faq: ContentFaq[];
};

export const siteConfig = {
  name: "HomeSelect Daily",
  shortName: "HomeSelect",
  description: "HomeSelect Daily publishes coffee maker reviews, kitchen appliance guides, air purifier comparisons, and home product buying advice.",
  url: "https://affiliate-site-dusky.vercel.app"
} as const;

export const products: ProductRecord[] = [
  {
    name: "Atlas One",
    slug: "atlas-one",
    brand: "Northfield",
    image: "/placeholder/atlas-one.jpg",
    summary: "A balanced all-round option built for buyers who want strong baseline performance without paying for extras they will not use.",
    quickVerdict: "Atlas One is the easiest default recommendation when reliability, flexibility, and value matter more than niche features.",
    features: ["Fast setup", "Clean workflow", "Reliable support", "Solid entry value"],
    pros: ["Easy broad recommendation", "Low-friction onboarding", "Good baseline value"],
    cons: ["Not the most advanced option", "Limited premium extras", "Power users may outgrow it"],
    rating: 4.8,
    reviewCount: 248,
    priceRange: "$79-$149",
    category: "tools",
    tags: ["featured", "editor-choice", "balanced"],
    affiliateLinks: [
      { retailerName: "Retailer One", affiliateUrl: "https://example.com/go/atlas-one-retailer-1", priceText: "$79 starter", ctaLabel: "Check Deal" },
      { retailerName: "Retailer Two", affiliateUrl: "https://example.com/go/atlas-one-retailer-2", priceText: "$89 bundle", ctaLabel: "Visit Retailer" }
    ],
    alternatives: ["northstar-pro", "summit-core"],
    relatedProducts: ["northstar-pro", "summit-core", "vector-lite"],
    relatedGuides: ["how-to-choose-a-product", "product-buying-guide"],
    relatedComparisons: ["atlas-one-vs-northstar-pro"],
    faq: [
      { question: "Is Atlas One a good first pick?", answer: "Yes. It is built around dependable core performance and a lower learning curve than most alternatives." },
      { question: "Where does Atlas One fall short?", answer: "It is not the most specialized choice, so advanced buyers may want a higher-ceiling option later." }
    ],
    performance: "In everyday use, Atlas One stays consistent and predictable. It does not spike in one area, but it avoids weak spots that usually create buyer regret.",
    bestFor: "Shoppers who want a dependable general recommendation with low setup friction.",
    avoidIf: "You want the most advanced feature stack available or a highly specialized workflow.",
    tone: "from-[#e2d8c8] to-[#b59967]",
    highlightLabel: "Editor's choice"
  },
  {
    name: "Northstar Pro",
    slug: "northstar-pro",
    brand: "Northfield",
    image: "/placeholder/northstar-pro.jpg",
    summary: "A higher-end option aimed at buyers who want more control, more headroom, and stronger long-term flexibility.",
    quickVerdict: "Northstar Pro makes sense when upgrade headroom matters more than keeping the initial spend low.",
    features: ["Deeper customization", "Premium feature set", "Better scaling headroom", "Advanced controls"],
    pros: ["Better long-term ceiling", "More flexible for advanced buyers", "Stronger premium toolkit"],
    cons: ["Costs more upfront", "Longer setup time", "Excessive for casual use"],
    rating: 4.7,
    reviewCount: 212,
    priceRange: "$119-$199",
    category: "tools",
    tags: ["premium", "advanced", "power-user"],
    affiliateLinks: [
      { retailerName: "Retailer One", affiliateUrl: "https://example.com/go/northstar-pro-retailer-1", priceText: "$119 standard", ctaLabel: "Check Deal" },
      { retailerName: "Retailer Three", affiliateUrl: "https://example.com/go/northstar-pro-retailer-2", priceText: "$129 pro pack", ctaLabel: "Visit Retailer" }
    ],
    alternatives: ["atlas-one", "relay-max"],
    relatedProducts: ["atlas-one", "relay-max", "summit-core"],
    relatedGuides: ["how-to-compare-two-options", "when-to-upgrade-your-current-solution"],
    relatedComparisons: ["atlas-one-vs-northstar-pro"],
    faq: [
      { question: "Who should pay more for Northstar Pro?", answer: "Buyers who expect more advanced needs over time and want to avoid upgrading again soon." },
      { question: "Is Northstar Pro overkill for beginners?", answer: "For some buyers, yes. Its extra controls are valuable, but not everyone needs them on day one." }
    ],
    performance: "Northstar Pro performs best when buyers use its deeper configuration range. It rewards advanced setups more than quick starter use.",
    bestFor: "Experienced buyers who want more control and longer upgrade headroom.",
    avoidIf: "You want the simplest setup or the lowest possible upfront cost.",
    tone: "from-[#dad0bf] to-[#9e7d49]",
    highlightLabel: "Premium option"
  },
  {
    name: "Summit Core",
    slug: "summit-core",
    brand: "Summit Labs",
    image: "/placeholder/summit-core.jpg",
    summary: "A streamlined option designed around fast implementation, lower maintenance, and steady everyday value.",
    quickVerdict: "Summit Core works well when speed, simplicity, and predictable costs matter more than feature depth.",
    features: ["Simple setup", "Low maintenance", "Clean interface", "Stable value"],
    pros: ["Fast to get started", "Low friction for smaller teams", "Predictable cost structure"],
    cons: ["Lighter feature depth", "Not ideal for custom-heavy needs", "Fewer premium integrations"],
    rating: 4.6,
    reviewCount: 184,
    priceRange: "$59-$129",
    category: "platforms",
    tags: ["simple", "value", "starter"],
    affiliateLinks: [
      { retailerName: "Retailer Four", affiliateUrl: "https://example.com/go/summit-core-retailer-1", priceText: "$59 entry", ctaLabel: "Check Deal" },
      { retailerName: "Retailer Two", affiliateUrl: "https://example.com/go/summit-core-retailer-2", priceText: "$69 team plan", ctaLabel: "Visit Retailer" }
    ],
    alternatives: ["vector-lite", "atlas-one"],
    relatedProducts: ["vector-lite", "atlas-one", "harbor-plus"],
    relatedGuides: ["product-buying-guide", "how-to-choose-a-product"],
    relatedComparisons: ["summit-core-vs-vector-lite"],
    faq: [
      { question: "Is Summit Core good for smaller budgets?", answer: "Yes. It keeps the starting price low while still covering the basics well." },
      { question: "What kind of buyer outgrows Summit Core?", answer: "Buyers who need heavier customization or advanced workflows may eventually want a stronger tier." }
    ],
    performance: "Summit Core performs best in standard workflows where simplicity and consistent output matter more than extra complexity.",
    bestFor: "Buyers who want lower setup friction and predictable costs.",
    avoidIf: "You need advanced customization or a more premium feature ceiling.",
    tone: "from-[#eadfda] to-[#b58e78]",
    highlightLabel: "Best value"
  },
  {
    name: "Vector Lite",
    slug: "vector-lite",
    brand: "Vector Works",
    image: "/placeholder/vector-lite.jpg",
    summary: "A compact option that focuses on efficiency and lighter everyday use without pushing buyers into a premium price bracket.",
    quickVerdict: "Vector Lite is strong when buyers care about efficiency and want a leaner pick without paying for broader expansion room.",
    features: ["Lean setup", "Efficient daily use", "Compact learning curve", "Good short-term value"],
    pros: ["Very approachable", "Efficient for everyday use", "Lower ongoing complexity"],
    cons: ["Less headroom for expansion", "Fewer premium features", "Can feel limited for advanced use"],
    rating: 4.5,
    reviewCount: 163,
    priceRange: "$49-$109",
    category: "platforms",
    tags: ["lightweight", "beginner", "efficient"],
    affiliateLinks: [
      { retailerName: "Retailer Two", affiliateUrl: "https://example.com/go/vector-lite-retailer-1", priceText: "$49 starter", ctaLabel: "Check Deal" },
      { retailerName: "Retailer Five", affiliateUrl: "https://example.com/go/vector-lite-retailer-2", priceText: "$59 plus", ctaLabel: "Visit Retailer" }
    ],
    alternatives: ["summit-core", "harbor-plus"],
    relatedProducts: ["summit-core", "harbor-plus", "atlas-one"],
    relatedGuides: ["product-buying-guide", "how-to-compare-two-options"],
    relatedComparisons: ["summit-core-vs-vector-lite"],
    faq: [
      { question: "Who should choose Vector Lite first?", answer: "Buyers who value simplicity and do not expect advanced needs immediately." },
      { question: "Does Vector Lite give up too much for the price?", answer: "That depends on your workflow. It is efficient, but its lower ceiling is real." }
    ],
    performance: "Vector Lite stays efficient and accessible. Its main tradeoff is that it gives buyers less room to expand later.",
    bestFor: "Buyers who want a lightweight option with an easier learning curve.",
    avoidIf: "You expect advanced needs or want long-term premium flexibility.",
    tone: "from-[#dbd7d0] to-[#7f776b]",
    highlightLabel: "Beginner-friendly"
  },
  {
    name: "Harbor Plus",
    slug: "harbor-plus",
    brand: "Harbor Co.",
    image: "/placeholder/harbor-plus.jpg",
    summary: "A service-led option that stands out for support quality, hands-on setup help, and stronger buyer confidence.",
    quickVerdict: "Harbor Plus is worth considering when support and rollout guidance matter almost as much as the product itself.",
    features: ["Hands-on support", "Service coverage", "Guided onboarding", "Buyer reassurance"],
    pros: ["Best support experience", "Lower risk for cautious buyers", "Helpful rollout guidance"],
    cons: ["Higher service cost", "Less appealing for self-serve buyers", "Slower than leaner options"],
    rating: 4.6,
    reviewCount: 139,
    priceRange: "$99-$179",
    category: "services",
    tags: ["support", "service-led", "confidence"],
    affiliateLinks: [
      { retailerName: "Retailer Six", affiliateUrl: "https://example.com/go/harbor-plus-retailer-1", priceText: "$99 assisted plan", ctaLabel: "Check Deal" },
      { retailerName: "Retailer Four", affiliateUrl: "https://example.com/go/harbor-plus-retailer-2", priceText: "$109 managed setup", ctaLabel: "Visit Retailer" }
    ],
    alternatives: ["atlas-one", "relay-max"],
    relatedProducts: ["relay-max", "atlas-one", "vector-lite"],
    relatedGuides: ["how-to-choose-a-product", "when-to-upgrade-your-current-solution"],
    relatedComparisons: [],
    faq: [
      { question: "Why choose Harbor Plus over a lower-cost option?", answer: "Its value comes from stronger support and buyer guidance, not just the core offer alone." },
      { question: "Who will get the least value from Harbor Plus?", answer: "Buyers who prefer a fast self-serve setup may not need its added service layer." }
    ],
    performance: "Harbor Plus performs best when support quality influences the buying decision. It reduces friction more than it maximizes raw feature count.",
    bestFor: "Buyers who want guidance, support, and a lower-risk decision path.",
    avoidIf: "You prefer a pure self-serve option and want to minimize service costs.",
    tone: "from-[#ddd5c6] to-[#8f7752]",
    highlightLabel: "Support-first"
  },
  {
    name: "Relay Max",
    slug: "relay-max",
    brand: "Relay Works",
    image: "/placeholder/relay-max.jpg",
    summary: "A stronger performance-led pick for buyers who care about output, pace, and higher-end feature coverage.",
    quickVerdict: "Relay Max is the better fit when performance matters more than simplicity and the buyer can tolerate extra setup complexity.",
    features: ["Stronger output ceiling", "Better premium performance", "Broad feature range", "Longer runway"],
    pros: ["Strongest overall performance", "High feature ceiling", "Better long-term range"],
    cons: ["Takes more setup effort", "Costs more", "Not the easiest first option"],
    rating: 4.7,
    reviewCount: 201,
    priceRange: "$129-$229",
    category: "tools",
    tags: ["performance", "premium", "scalable"],
    affiliateLinks: [
      { retailerName: "Retailer Three", affiliateUrl: "https://example.com/go/relay-max-retailer-1", priceText: "$129 standard", ctaLabel: "Check Deal" },
      { retailerName: "Retailer Six", affiliateUrl: "https://example.com/go/relay-max-retailer-2", priceText: "$149 bundle", ctaLabel: "Visit Retailer" }
    ],
    alternatives: ["northstar-pro", "atlas-one"],
    relatedProducts: ["northstar-pro", "atlas-one", "harbor-plus"],
    relatedGuides: ["when-to-upgrade-your-current-solution", "how-to-compare-two-options"],
    relatedComparisons: [],
    faq: [
      { question: "Is Relay Max worth the premium?", answer: "It can be, especially when a buyer knows the extra output and feature depth will be used regularly." },
      { question: "Who should skip Relay Max?", answer: "Buyers who want the simplest or lowest-cost option should look elsewhere first." }
    ],
    performance: "Relay Max delivers the strongest raw performance profile in this sample catalog, but it asks for more setup patience in return.",
    bestFor: "Buyers who prioritize performance and long-term feature depth.",
    avoidIf: "You want a simpler first purchase or lower entry pricing.",
    tone: "from-[#e8ddd4] to-[#a47c66]",
    highlightLabel: "Performance pick"
  }
];
export const bestLists: BestListRecord[] = [
  {
    slug: "top-picks",
    title: "Best Products: Top Picks",
    description: "A ranked shortlist of the strongest all-around picks for readers narrowing down their best options.",
    intro: "This page acts as the main shortlist. It balances rating, value, support, and upgrade headroom so buyers can move from broad research to a tighter decision set.",
    highlights: ["Balanced picks for most buyers", "Fast scan of price ranges and strengths", "Built to feed readers into full reviews and affiliate offers"],
    productSlugs: ["atlas-one", "northstar-pro", "summit-core", "relay-max"],
    faq: [
      { question: "How are the products ranked?", answer: "The ranking balances overall value, consistency, flexibility, and how broadly each option fits likely buyer needs." },
      { question: "Should I buy the top-ranked option automatically?", answer: "Not always. The top pick is the broadest recommendation, but niche needs can make a lower-ranked option smarter." }
    ],
    relatedGuides: ["how-to-choose-a-product", "product-buying-guide"],
    relatedReviews: ["atlas-one", "northstar-pro", "summit-core"],
    relatedComparisons: ["atlas-one-vs-northstar-pro", "summit-core-vs-vector-lite"]
  },
  {
    slug: "best-value-products",
    title: "Best Value Products",
    description: "A focused shortlist of products that balance price, performance, and long-term usefulness.",
    intro: "This list is tuned for value-oriented traffic. It prioritizes options that keep compromises reasonable without forcing buyers into higher tiers immediately.",
    highlights: ["Lower entry prices", "Strong day-one value", "Useful for budget-aware buyers"],
    productSlugs: ["summit-core", "vector-lite", "atlas-one"],
    faq: [
      { question: "What counts as value here?", answer: "Value means strong practical payoff for the price, not simply the cheapest option." },
      { question: "Do value picks scale well?", answer: "Some do. Others work best when the buyer does not expect advanced needs soon." }
    ],
    relatedGuides: ["product-buying-guide"],
    relatedReviews: ["summit-core", "vector-lite", "atlas-one"],
    relatedComparisons: ["summit-core-vs-vector-lite"]
  }
];

export const comparisons: ComparisonRecord[] = [
  {
    slug: "atlas-one-vs-northstar-pro",
    title: "Atlas One vs Northstar Pro",
    description: "A side-by-side comparison for buyers deciding between a balanced default pick and a more advanced premium option.",
    intro: "This comparison is for readers who already narrowed the field and now need a direct recommendation between two strong options.",
    productSlugs: ["atlas-one", "northstar-pro"],
    verdict: "Choose Atlas One if you want the easier broad recommendation. Choose Northstar Pro if you need more headroom and know you will use its deeper controls.",
    featureComparison: "Northstar Pro has the stronger premium toolkit, while Atlas One stays more approachable for a wider audience.",
    performanceComparison: "Northstar Pro wins on ceiling. Atlas One wins on consistency and lower friction.",
    priceComparison: "Atlas One gives buyers a lower-cost entry. Northstar Pro asks for more upfront spend in exchange for longer runway.",
    faq: [
      { question: "Which option is better for most readers?", answer: "Atlas One is the safer broad recommendation for most readers." },
      { question: "When should I choose Northstar Pro instead?", answer: "Choose it when you know advanced features and future growth matter more than a simpler starting point." }
    ],
    relatedGuides: ["how-to-compare-two-options"],
    relatedReviews: ["atlas-one", "northstar-pro"]
  },
  {
    slug: "summit-core-vs-vector-lite",
    title: "Summit Core vs Vector Lite",
    description: "A comparison built for buyers choosing between two leaner, value-oriented options.",
    intro: "Both products serve budget-aware readers, but they solve different problems once setup style and long-term flexibility are considered.",
    productSlugs: ["summit-core", "vector-lite"],
    verdict: "Choose Summit Core if you want a steadier all-round value pick. Choose Vector Lite if you want the leanest setup and a faster learning curve.",
    featureComparison: "Summit Core keeps a slightly broader toolkit. Vector Lite prioritizes simplicity and efficiency.",
    performanceComparison: "Summit Core feels steadier in broader use cases, while Vector Lite performs best when the workflow stays narrow and efficient.",
    priceComparison: "Vector Lite starts cheaper, but Summit Core often offers the better longer-term value for moderate use.",
    faq: [
      { question: "Which one is better for beginners?", answer: "Vector Lite is easier to start with, though Summit Core may age better if needs grow." },
      { question: "Which one gives better long-term value?", answer: "Summit Core usually offers the better long-term balance." }
    ],
    relatedGuides: ["product-buying-guide"],
    relatedReviews: ["summit-core", "vector-lite"]
  }
];

export const guides: GuideRecord[] = [
  {
    slug: "how-to-choose-a-product",
    title: "How To Choose A Product",
    description: "A buying guide for readers deciding between multiple options before they commit to a shortlist.",
    intro: "This guide focuses on the core buying questions that matter before you compare individual products.",
    sections: [
      {
        heading: "Start With The Main Use Case",
        body: [
          "Most bad purchases happen because buyers compare feature lists before they define the real job the product needs to do.",
          "Start by narrowing the use case. Is the goal lower cost, easier setup, stronger output, or better support? Once that is clear, most options become easier to filter."
        ]
      },
      {
        heading: "Separate Must-Haves From Nice-To-Haves",
        body: [
          "A scalable affiliate site needs content that helps readers sort essential features from optional extras.",
          "That distinction improves conversion because readers can move from general guides into tighter best lists and then into individual reviews with more confidence."
        ]
      },
      {
        heading: "Compare Total Value, Not Just Entry Price",
        body: [
          "Low starting price can be helpful, but value usually depends on support, performance, durability, and upgrade runway as well.",
          "A good guide should prepare the reader to weigh total value before clicking an affiliate link."
        ]
      }
    ],
    faq: [
      { question: "What should buyers decide first?", answer: "The main use case should come first, because it filters out the most irrelevant options quickly." },
      { question: "Why do some guides link to best lists before reviews?", answer: "Best lists help narrow a broad topic into a manageable shortlist before deeper review reading begins." }
    ],
    relatedBest: ["top-picks", "best-value-products"],
    relatedReviews: ["atlas-one", "northstar-pro"],
    relatedComparisons: ["atlas-one-vs-northstar-pro"]
  },
  {
    slug: "product-buying-guide",
    title: "Product Buying Guide",
    description: "A reusable buying guide template designed to support long-form affiliate SEO content.",
    intro: "This page is structured for informational traffic. It explains how to think through a purchase and then routes readers into comparison and review content.",
    sections: [
      {
        heading: "Know Your Budget Range",
        body: [
          "Budget affects not just affordability, but also expectations around support, flexibility, and long-term ownership.",
          "The best buyer journeys usually move from a guide into a best-value page or a direct comparison once the budget range is known."
        ]
      },
      {
        heading: "Match Complexity To Buyer Experience",
        body: [
          "Many high-return products underperform because the buyer chose more complexity than they were ready to manage.",
          "Good affiliate content should identify when a simpler option leads to better real-world satisfaction."
        ]
      },
      {
        heading: "Use Reviews To Validate The Final Choice",
        body: [
          "Reviews are the point where intent becomes high enough for conversion. That makes them the natural final step before affiliate clicks.",
          "The review page should confirm fit, clarify tradeoffs, and make retailer options easy to compare."
        ]
      }
    ],
    faq: [
      { question: "Are buying guides meant to rank for broad keywords?", answer: "Yes. They are usually the top-of-funnel assets in the internal linking system." },
      { question: "What comes after the guide?", answer: "Best lists, comparison pages, and individual reviews normally sit deeper in the funnel." }
    ],
    relatedBest: ["top-picks", "best-value-products"],
    relatedReviews: ["summit-core", "vector-lite"],
    relatedComparisons: ["summit-core-vs-vector-lite"]
  },
  {
    slug: "how-to-compare-two-options",
    title: "How To Compare Two Options",
    description: "A guide for readers who already have a shortlist and need to make the final call.",
    intro: "Comparison-focused traffic often converts well because the reader is already closer to a buying decision. The page structure here is designed to serve that intent.",
    sections: [
      {
        heading: "Look At Tradeoffs, Not Winner-Take-All Claims",
        body: [
          "Most real comparisons are not about finding a universal winner. They are about identifying which option matches a specific buyer profile.",
          "That framing helps comparisons stay useful across niches instead of sounding like rigid sales copy."
        ]
      },
      {
        heading: "Use Reviews To Validate The Final Pick",
        body: [
          "Once a comparison narrows the decision, readers should move into the corresponding review pages for deeper confirmation.",
          "This is where internal linking directly supports affiliate conversion."
        ]
      }
    ],
    faq: [
      { question: "Why compare only two options?", answer: "Two-way comparison pages match high-intent searches well and are easier for readers to act on." },
      { question: "Should comparisons include price?", answer: "Yes. Price context is critical, even when value matters more than raw cost." }
    ],
    relatedBest: ["top-picks"],
    relatedReviews: ["atlas-one", "northstar-pro"],
    relatedComparisons: ["atlas-one-vs-northstar-pro", "summit-core-vs-vector-lite"]
  },
  {
    slug: "when-to-upgrade-your-current-solution",
    title: "When To Upgrade Your Current Solution",
    description: "A guide for readers deciding whether they should stay put, upgrade, or switch to a more capable option.",
    intro: "This guide targets mid-funnel readers who already have experience with a current option and want to know when an upgrade becomes worthwhile.",
    sections: [
      {
        heading: "Watch For Repeated Friction",
        body: [
          "Repeated workarounds, support gaps, and feature bottlenecks are usually stronger upgrade signals than marketing claims.",
          "The more often a reader experiences the same limitation, the more value there is in moving upmarket."
        ]
      },
      {
        heading: "Upgrade Only When The Added Capability Will Be Used",
        body: [
          "Not every frustration requires a premium upgrade. Sometimes the current option is still the correct fit.",
          "This is why upgrade guides should route readers into detailed comparisons before they route them into higher-cost reviews."
        ]
      }
    ],
    faq: [
      { question: "What is the clearest upgrade signal?", answer: "Repeated friction tied to core tasks is usually the clearest sign that the current option is no longer enough." },
      { question: "Should buyers always move to the premium pick?", answer: "No. They should move only when the extra capability will be used often enough to justify the higher spend." }
    ],
    relatedBest: ["top-picks"],
    relatedReviews: ["northstar-pro", "relay-max", "harbor-plus"],
    relatedComparisons: ["atlas-one-vs-northstar-pro"]
  }
];

export const categories: CategoryRecord[] = [
  {
    slug: "tools",
    title: "Tools",
    description: "A category hub for tool-style products with direct links into reviews, comparisons, and best lists.",
    intro: "Category pages help organize commercial-intent content so readers can move naturally into reviews, comparisons, and top picks.",
    productSlugs: ["atlas-one", "northstar-pro", "relay-max"],
    bestSlugs: ["top-picks"],
    guideSlugs: ["how-to-choose-a-product", "when-to-upgrade-your-current-solution"],
    comparisonSlugs: ["atlas-one-vs-northstar-pro"],
    faq: [
      { question: "Why use category pages?", answer: "They group related commercial and informational pages so search engines and readers can move through the site more clearly." },
      { question: "What should category pages link to?", answer: "They should point to best lists, review pages, comparison pages, and guides tied to the same topic cluster." }
    ]
  },
  {
    slug: "platforms",
    title: "Platforms",
    description: "A category hub for platform-style products with reusable SEO linking paths.",
    intro: "This category page supports broader discovery traffic while linking visitors deeper into rankings, comparisons, and reviews.",
    productSlugs: ["summit-core", "vector-lite"],
    bestSlugs: ["best-value-products"],
    guideSlugs: ["product-buying-guide"],
    comparisonSlugs: ["summit-core-vs-vector-lite"],
    faq: [
      { question: "How do category pages support SEO?", answer: "They create a stable internal linking layer that connects broad themes to deeper intent pages." },
      { question: "Should every category have its own best list?", answer: "Usually yes, especially when the category has enough products and search demand." }
    ]
  },
  {
    slug: "services",
    title: "Services",
    description: "A category hub for service-led products where support and implementation influence conversion.",
    intro: "Service-led content benefits from category pages because buyers often need more context before they click into direct review pages.",
    productSlugs: ["harbor-plus"],
    bestSlugs: ["top-picks"],
    guideSlugs: ["how-to-choose-a-product"],
    comparisonSlugs: [],
    faq: [
      { question: "Why do services need more context?", answer: "Support quality, rollout help, and risk reduction usually matter more in service-led decisions." },
      { question: "What should service category pages emphasize?", answer: "They should highlight support, confidence, fit, and route readers into relevant reviews." }
    ]
  }
];

export const productMap = Object.fromEntries(products.map((product) => [product.slug, product])) as Record<string, ProductRecord>;
export const bestListMap = Object.fromEntries(bestLists.map((item) => [item.slug, item])) as Record<string, BestListRecord>;
export const comparisonMap = Object.fromEntries(comparisons.map((item) => [item.slug, item])) as Record<string, ComparisonRecord>;
export const guideMap = Object.fromEntries(guides.map((item) => [item.slug, item])) as Record<string, GuideRecord>;
export const categoryMap = Object.fromEntries(categories.map((item) => [item.slug, item])) as Record<string, CategoryRecord>;

export const topRatedOrder = products.slice().sort((left, right) => right.rating - left.rating).map((product) => product.slug);

export function getProduct(slug: string) {
  return productMap[slug];
}

export function getBestList(slug: string) {
  return bestListMap[slug];
}

export function getComparison(slug: string) {
  return comparisonMap[slug];
}

export function getGuide(slug: string) {
  return guideMap[slug];
}

export function getCategory(slug: string) {
  return categoryMap[slug];
}

export function getProducts(slugs: string[]) {
  return slugs
    .map((slug) => productMap[slug])
    .filter((product): product is ProductRecord => Boolean(product));
}

export function getGuides(slugs: string[]) {
  return slugs
    .map((slug) => guideMap[slug])
    .filter((guide): guide is GuideRecord => Boolean(guide));
}

export function getBestLists(slugs: string[]) {
  return slugs
    .map((slug) => bestListMap[slug])
    .filter((page): page is BestListRecord => Boolean(page));
}

export function getComparisons(slugs: string[]) {
  return slugs
    .map((slug) => comparisonMap[slug])
    .filter((page): page is ComparisonRecord => Boolean(page));
}

export const homepageData = {
  heroTitle: "Better Home Product Picks, Without The Guesswork",
  heroKicker: "Reviews, Comparisons, And Buying Advice",
  heroDescription:
    "Explore product reviews, comparisons, buying guides, and top picks built to help shoppers research smarter and choose with more confidence.",
  featuredReviewSlugs: ["atlas-one", "northstar-pro", "summit-core", "vector-lite", "harbor-plus", "relay-max"],
  featuredBestSlug: "top-picks",
  popularComparisonSlugs: ["atlas-one-vs-northstar-pro", "summit-core-vs-vector-lite"],
  featuredGuideSlugs: ["how-to-choose-a-product", "product-buying-guide"],
  categorySlugs: ["tools", "platforms", "services"]
} as const;
