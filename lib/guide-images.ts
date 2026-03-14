const guideImageMap: Record<string, string> = {
  "product-buying-guide": "/image/Home Appliance Buying Guide How To Choose The Right Product For Daily Use.png",
  "how-to-choose-coffee-gear": "/image/How To Choose The Best Coffee Maker For Your Routine.png",
  "how-to-choose-a-coffee-maker": "/image/Coffee Maker For Home What Actually Matters Before You Buy.png",
  "how-to-choose-a-coffee-grinder": "/image/How To Choose A Coffee Grinder What Makes A Better Home Coffee Setup.png",
  "how-to-choose-kitchen-appliances": "/image/Kitchen Appliance Buying Guide How To Choose Small Appliances That Save Time.png",
  "how-to-choose-air-treatment": "/image/Air Purifier Buying Guide How To Choose The Right Air Treatment For Your Room.png",
  "how-to-choose-an-air-fryer": "/image/Air Fryer Basket Size, Cleanup, and Everyday Value.png",
  "how-to-choose-a-blender": "/image/Blender Personal, Countertop, and Everyday Prep Needs.png",
  "single-serve-vs-drip-coffee-maker": "/image/Single-Serve vs Drip Coffee Maker Which Setup Fits Your Routine Better s.png",
  "personal-blender-vs-full-size-blender": "/image/Personal Blender vs Full-Size Blender Which One Should You Buy.png",
  "basket-air-fryer-vs-air-fryer-oven": "/image/Basket Air Fryer vs Air Fryer Oven Which Style Makes More Sense.png"
};

const guideImageFallbacks: Record<string, string> = {
  coffee: "/image/How To Choose The Best Coffee Maker For Your Routine.png",
  grinder: "/image/How To Choose A Coffee Grinder What Makes A Better Home Coffee Setup.png",
  blender: "/image/Blender Personal, Countertop, and Everyday Prep Needs.png",
  air: "/image/Air Purifier Buying Guide How To Choose The Right Air Treatment For Your Room.png",
  fryer: "/image/Air Fryer Basket Size, Cleanup, and Everyday Value.png",
  kitchen: "/image/Kitchen Appliance Buying Guide How To Choose Small Appliances That Save Time.png",
  default: "/image/Home Appliance Buying Guide How To Choose The Right Product For Daily Use.png"
};

export function getGuideImageUrl(slug: string) {
  if (guideImageMap[slug]) {
    return guideImageMap[slug];
  }

  if (slug.includes("coffee-maker") || slug.includes("coffee-gear")) return guideImageFallbacks.coffee;
  if (slug.includes("grinder")) return guideImageFallbacks.grinder;
  if (slug.includes("blender")) return guideImageFallbacks.blender;
  if (slug.includes("air-treatment")) return guideImageFallbacks.air;
  if (slug.includes("air-fryer") || slug.includes("fryer")) return guideImageFallbacks.fryer;
  if (slug.includes("kitchen")) return guideImageFallbacks.kitchen;

  return guideImageFallbacks.default;
}
