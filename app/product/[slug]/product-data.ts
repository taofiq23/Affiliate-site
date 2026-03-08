export type ProductDetails = {
  name: string;
  family: string;
  description: string;
  tone: string;
  bestFor: string;
  wear: string;
  whyItWins: string;
  retailer: string;
  affiliateUrl: string;
  sizes: Array<{ label: string; price: string }>;
};

export const productMap: Record<string, ProductDetails> = {
  "velvet-oud": {
    name: "Velvet Oud",
    family: "Woody Oriental",
    description: "Smoked oud with saffron and suede vanilla. Built for evenings and lasting presence.",
    tone: "from-[#e2d8c8] to-[#b59967]",
    bestFor: "Night wear, colder weather, and buyers who want a heavier signature scent.",
    wear: "Projects strongly for the first hour and settles into a warm amber-wood trail for most of the evening.",
    whyItWins: "It feels expensive immediately, keeps its shape on skin, and gives the strongest luxury impression in this shortlist.",
    retailer: "FragranceX",
    affiliateUrl: "https://example.com/go/velvet-oud",
    sizes: [
      { label: "50 ml", price: "$150" },
      { label: "90 ml", price: "$220" }
    ]
  },
  "amber-noir": {
    name: "Amber Noir",
    family: "Amber Spicy",
    description: "Warm amber and spice layered with resin depth and soft musk finish.",
    tone: "from-[#dad0bf] to-[#9e7d49]",
    bestFor: "Date nights, cooler evenings, and shoppers who want spice without full oud density.",
    wear: "Starts with spice and resin, then dries down smoother and closer to the skin after a few hours.",
    whyItWins: "This is the easiest warm fragrance in the lineup to recommend because it feels rich without becoming difficult.",
    retailer: "Jomashop",
    affiliateUrl: "https://example.com/go/amber-noir",
    sizes: [
      { label: "50 ml", price: "$135" },
      { label: "90 ml", price: "$195" }
    ]
  },
  "rose-ombre": {
    name: "Rose Ombre",
    family: "Floral Smoke",
    description: "Dark rose, plum accord, and mineral woods in a modern unisex structure.",
    tone: "from-[#eadfda] to-[#b58e78]",
    bestFor: "Rose lovers who want something moodier than a bright daytime floral.",
    wear: "Moderate projection with a smoky floral dry-down that stays interesting over several hours.",
    whyItWins: "It gives a more niche-feeling rose profile without jumping into very challenging territory.",
    retailer: "Sephora",
    affiliateUrl: "https://example.com/go/rose-ombre",
    sizes: [
      { label: "50 ml", price: "$125" },
      { label: "75 ml", price: "$175" }
    ]
  },
  "midnight-musk": {
    name: "Midnight Musk",
    family: "Musk Leather",
    description: "A clean leather-musk signature with cardamom and tonka bean warmth.",
    tone: "from-[#dbd7d0] to-[#7f776b]",
    bestFor: "Daily wear, office use, and buyers who want something polished but not loud.",
    wear: "Smooth opening, moderate projection, and a clean close-to-skin finish by late afternoon.",
    whyItWins: "This is the safest blind-buy style option if the goal is versatility over drama.",
    retailer: "Nordstrom",
    affiliateUrl: "https://example.com/go/midnight-musk",
    sizes: [
      { label: "50 ml", price: "$145" },
      { label: "100 ml", price: "$205" }
    ]
  },
  "noir-reserve": {
    name: "Noir Reserve",
    family: "Dark Woody",
    description: "A richer oud-forward blend layered with incense and warm resin.",
    tone: "from-[#ddd5c6] to-[#8f7752]",
    bestFor: "Collectors who already own lighter woody scents and want something denser.",
    wear: "Long wear with a deep resinous base that keeps showing up late into the day.",
    whyItWins: "It is the strongest specialist pick in the set and feels most suited to experienced fragrance buyers.",
    retailer: "FragranceNet",
    affiliateUrl: "https://example.com/go/noir-reserve",
    sizes: [
      { label: "50 ml", price: "$165" },
      { label: "100 ml", price: "$235" }
    ]
  },
  "golden-veil": {
    name: "Golden Veil",
    family: "Amber Floral",
    description: "A smooth amber-floral composition with elegant evening depth.",
    tone: "from-[#e8ddd4] to-[#a47c66]",
    bestFor: "Dressier settings and buyers who want amber warmth with a softer floral top.",
    wear: "Balanced and refined, with enough body for evenings without becoming heavy.",
    whyItWins: "It threads the line between approachable and upscale better than most floral-amber picks.",
    retailer: "Macy's",
    affiliateUrl: "https://example.com/go/golden-veil",
    sizes: [
      { label: "50 ml", price: "$145" },
      { label: "90 ml", price: "$210" }
    ]
  },
  "lunar-smoke": {
    name: "Lunar Smoke",
    family: "Spiced Wood",
    description: "Dry woods and smoked spice designed for a modern statement trail.",
    tone: "from-[#d9cfbe] to-[#8d6f43]",
    bestFor: "Buyers who want smoky woods without moving fully into leather or oud territory.",
    wear: "Noticeable in the first few hours, then settles into a crisp woody skin scent.",
    whyItWins: "It gives strong character for the price and reads more contemporary than classic spice-heavy options.",
    retailer: "Amazon",
    affiliateUrl: "https://example.com/go/lunar-smoke",
    sizes: [
      { label: "50 ml", price: "$130" },
      { label: "75 ml", price: "$185" }
    ]
  },
  "velour-iris": {
    name: "Velour Iris",
    family: "Powdered Floral",
    description: "Velvety iris and soft musk accords with contemporary refinement.",
    tone: "from-[#dfd9d0] to-[#8e8478]",
    bestFor: "Clean, soft fragrance fans who want polish rather than projection.",
    wear: "Sits closer to the skin and performs best in daytime or indoor settings.",
    whyItWins: "It is the most refined soft option in the lineup and works well when subtlety matters.",
    retailer: "Bloomingdale's",
    affiliateUrl: "https://example.com/go/velour-iris",
    sizes: [
      { label: "50 ml", price: "$132" },
      { label: "75 ml", price: "$190" }
    ]
  },
  "obsidian-tonka": {
    name: "Obsidian Tonka",
    family: "Warm Tonka",
    description: "Roasted tonka, cocoa facets, and smoky woods for a rich evening signature.",
    tone: "from-[#d8d0c2] to-[#6f5b3b]",
    bestFor: "Sweet-leaning evening wear and buyers who want gourmand warmth without full dessert vibes.",
    wear: "Dense opening with good staying power and a sweeter dry-down late into the evening.",
    whyItWins: "It offers the biggest comfort-factor payoff if the buyer likes tonka and cocoa notes.",
    retailer: "Saks Fifth Avenue",
    affiliateUrl: "https://example.com/go/obsidian-tonka",
    sizes: [
      { label: "50 ml", price: "$170" },
      { label: "100 ml", price: "$240" }
    ]
  },
  "silk-amber": {
    name: "Silk Amber",
    family: "Soft Amber",
    description: "Silken amber wrapped in delicate florals and creamy sandalwood.",
    tone: "from-[#eadfcd] to-[#ae8a61]",
    bestFor: "Buyers who want something warm, smooth, and easy to wear year-round.",
    wear: "Gentle projection with a creamy amber dry-down that feels polished instead of sharp.",
    whyItWins: "It covers the everyday amber slot well and has broad appeal across seasons.",
    retailer: "Ulta",
    affiliateUrl: "https://example.com/go/silk-amber",
    sizes: [
      { label: "50 ml", price: "$155" },
      { label: "90 ml", price: "$225" }
    ]
  },
  "black-saffron": {
    name: "Black Saffron",
    family: "Spiced Leather",
    description: "Saffron spice over dark leather and cedar for a bold modern trail.",
    tone: "from-[#ddd2c0] to-[#806645]",
    bestFor: "Statement wear and buyers who like sharper spice with noticeable leather.",
    wear: "Projects early, then stays textured and dry on the skin for several more hours.",
    whyItWins: "It stands out fast and feels more daring than the safer woody-spice options.",
    retailer: "Neiman Marcus",
    affiliateUrl: "https://example.com/go/black-saffron",
    sizes: [
      { label: "50 ml", price: "$145" },
      { label: "75 ml", price: "$198" }
    ]
  },
  "velvet-rose": {
    name: "Velvet Rose",
    family: "Rose Amber",
    description: "Velvety rose petals blended with amber and warm musks.",
    tone: "from-[#ead7d3] to-[#9c7464]",
    bestFor: "Romantic evening wear and shoppers who want rose with warmth instead of fresh brightness.",
    wear: "Smooth projection and a softer rosy amber dry-down after the first couple of hours.",
    whyItWins: "It is one of the easiest rose-based affiliate picks to position as an evening compliment magnet.",
    retailer: "Dillard's",
    affiliateUrl: "https://example.com/go/velvet-rose",
    sizes: [
      { label: "50 ml", price: "$160" },
      { label: "100 ml", price: "$230" }
    ]
  }
};

export const topRatedOrder = [
  "velvet-oud",
  "amber-noir",
  "noir-reserve",
  "golden-veil",
  "midnight-musk",
  "rose-ombre",
  "lunar-smoke",
  "velour-iris"
];

export const reviews = [
  {
    name: "Michael T.",
    date: "Feb 18, 2026",
    rating: 5,
    title: "Helpful breakdown before buying",
    comment:
      "The review page made it clear what to expect before I clicked through to the retailer. That made the purchase decision faster."
  },
  {
    name: "Daniel K.",
    date: "Feb 02, 2026",
    rating: 4,
    title: "Good scent profile summary",
    comment:
      "I liked that the page focused on wear, occasion, and value instead of pretending to be a checkout page."
  },
  {
    name: "Rahim A.",
    date: "Jan 27, 2026",
    rating: 5,
    title: "Useful for comparing options",
    comment:
      "The shortlist format is strong. I could compare a few similar fragrances and then leave for the store page when ready."
  }
];

export const ratingBreakdown = [
  { label: "5", percent: 72 },
  { label: "4", percent: 19 },
  { label: "3", percent: 7 },
  { label: "2", percent: 1 },
  { label: "1", percent: 1 }
];
