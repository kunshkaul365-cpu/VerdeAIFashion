export const PRODUCTS = [
  {
    id: "verde-01",
    name: "Aura Relaxed Linen Resort Shirt",
    subtitle: "100% Belgian Flax Organic Linen",
    category: "Tops",
    gender: "Unisex",
    price: 3499,
    originalPrice: 4299,
    rating: 4.9,
    reviewsCount: 128,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
    tag: "Bestseller",
    materials: ["100% Certified Organic French Flax", "AZO-Free Natural Earth Dyes", "Corozo Nut Buttons"],
    ecoMetrics: {
      waterSavedLiters: 1420,
      co2ReducedKg: 3.8,
      chemicalFree: true
    },
    vibeTags: ["Resort", "Minimalist", "Breezy", "Vacation", "Earthy"],
    occasions: ["Brunch", "Beach Vacation", "Weekend Casual", "Summer Lounging"],
    fit: "Relaxed Boxy Fit",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Raw Ecru", hex: "#EAE6DF" },
      { name: "Sage Forest", hex: "#71AA8D" },
      { name: "Terracotta Earth", hex: "#CCA17D" }
    ],
    certifications: ["GOTS Certified", "OEKO-TEX 100", "Zero-Waste Dye"],
    description: "Spun from naturally aerated French flax linen, the Aura Resort Shirt embodies effortless coastal sophistication while consuming 70% less water than conventional cotton.",
    bestPairWithIds: ["verde-02", "verde-06"],
    inStock: true
  },
  {
    id: "verde-02",
    name: "Tierra Wide-Leg Hemp Trousers",
    subtitle: "Zero-Pesticide Raw Hemp & Organic Cotton",
    category: "Bottoms",
    gender: "Unisex",
    price: 4199,
    originalPrice: 4999,
    rating: 4.8,
    reviewsCount: 94,
    image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
    tag: "Eco Innovation",
    materials: ["55% Industrial Hemp", "45% GOTS Organic Cotton"],
    ecoMetrics: {
      waterSavedLiters: 2100,
      co2ReducedKg: 5.2,
      chemicalFree: true
    },
    vibeTags: ["Minimalist", "Workwear", "Contemporary", "Tailored"],
    occasions: ["Creative Office", "Brunch", "Evening Dinner", "Casual Day Out"],
    fit: "High-Rise Wide Leg with Elastic Drawcord",
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Desert Sand", hex: "#DEC0A3" },
      { name: "Olive Slate", hex: "#4C8D6E" },
      { name: "Charcoal Ash", hex: "#2C312E" }
    ],
    certifications: ["Fair Trade Certified", "Regenerative Organic Alliance"],
    description: "Hemp requires zero chemical pesticides and regenerates the soil it grows in. Tierra trousers give you a crisp, fluid drape with all-day breathable comfort.",
    bestPairWithIds: ["verde-01", "verde-04", "verde-08"],
    inStock: true
  },
  {
    id: "verde-03",
    name: "Sylvan Botanical Tiered Sundress",
    subtitle: "Plant-Dyed Peace Silk & Bamboo Weave",
    category: "Dresses",
    gender: "Women",
    price: 5299,
    originalPrice: 6500,
    rating: 5.0,
    reviewsCount: 162,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
    tag: "Artisanal",
    materials: ["70% Bamboo Viscose", "30% Ahimsa Peace Silk"],
    ecoMetrics: {
      waterSavedLiters: 1850,
      co2ReducedKg: 4.1,
      chemicalFree: true
    },
    vibeTags: ["Boho", "Romantic", "Resort", "Vacation", "Summer Breezy"],
    occasions: ["Beach Vacation", "Outdoor Weddings", "Brunch", "Garden Party"],
    fit: "Flowing Tiered Maxi with Adjustable Tie Straps",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Olive Flora", hex: "#8DAF9A" },
      { name: "Sun-Washed Ochre", hex: "#D6A76E" }
    ],
    certifications: ["Cruelty-Free Ahimsa Silk", "GOTS Certified Dyes"],
    description: "Crafted without harming silkworms, dyed using madder roots and marigold flowers. An ethereal summer piece that moves with the morning breeze.",
    bestPairWithIds: ["verde-06", "verde-09"],
    inStock: true
  },
  {
    id: "verde-04",
    name: "Solstice Organic Heavyweight Tee",
    subtitle: "280 GSM Regenerative Farmed Cotton",
    category: "Tops",
    gender: "Unisex",
    price: 1899,
    originalPrice: 2299,
    rating: 4.9,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80",
    tag: "Essential",
    materials: ["100% Regenerative Organic Certified Cotton"],
    ecoMetrics: {
      waterSavedLiters: 980,
      co2ReducedKg: 2.4,
      chemicalFree: true
    },
    vibeTags: ["Everyday Minimal", "Streetwear", "Clean Cut", "Monochrome"],
    occasions: ["Casual Day Out", "Travel", "Weekend Lounging", "Gym / Athleisure"],
    fit: "Subtly Boxy Drop-Shoulder Silhouette",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Unbleached Milk", hex: "#F7F5F0" },
      { name: "Vintage Sage", hex: "#83A591" },
      { name: "Washed Carbon", hex: "#323533" }
    ],
    certifications: ["Cradle to Cradle Certified", "100% Biodegradable"],
    description: "The ultimate heavyweight t-shirt engineered to last a decade. No microplastics, pre-shrunk naturally without harmful toxic finishing baths.",
    bestPairWithIds: ["verde-02", "verde-05", "verde-08"],
    inStock: true
  },
  {
    id: "verde-05",
    name: "Natura Reversible Hemp Chore Jacket",
    subtitle: "Upcycled Heritage Cotton Liner",
    category: "Outerwear",
    gender: "Unisex",
    price: 6499,
    originalPrice: 7999,
    rating: 4.9,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80",
    tag: "Limited Batch",
    materials: ["Outer: 100% Organic Hemp Canvas", "Lining: Deadstock Factory Offcut Cotton"],
    ecoMetrics: {
      waterSavedLiters: 3400,
      co2ReducedKg: 8.5,
      chemicalFree: true
    },
    vibeTags: ["Heritage", "Utility", "Workwear", "Modern Tailored"],
    occasions: ["Creative Office", "Travel", "Cool Evenings", "Art Galleries"],
    fit: "Structured Utility Cut with Deep Patch Pockets",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Forest Moss", hex: "#397056" },
      { name: "Terracotta Brick", hex: "#B07052" }
    ],
    certifications: ["Zero Waste Production", "B Corp Certified"],
    description: "Inspired by vintage work jackets, cut from thick tactile hemp canvas that softens beautifully with age and wear, telling your life story.",
    bestPairWithIds: ["verde-04", "verde-02"],
    inStock: true
  },
  {
    id: "verde-06",
    name: "Komorebi Woven Sisal & Recycled Tote",
    subtitle: "Hand-Braided Wild Sisal & Organic Cotton Webbing",
    category: "Accessories",
    gender: "Unisex",
    price: 2199,
    originalPrice: 2799,
    rating: 4.8,
    reviewsCount: 79,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
    tag: "Handcrafted",
    materials: ["70% Wild Harvested Sisal", "30% Upcycled Cotton Straps"],
    ecoMetrics: {
      waterSavedLiters: 850,
      co2ReducedKg: 1.9,
      chemicalFree: true
    },
    vibeTags: ["Beach Vacation", "Boho", "Market Day", "Earthy"],
    occasions: ["Beach Vacation", "Farmers Market", "Weekend Brunch"],
    fit: "Spacious 24L Capacity with Interior Zip Pocket",
    sizes: ["One Size"],
    colors: [
      { name: "Natural Dune", hex: "#EBD9C6" }
    ],
    certifications: ["100% Artisan Fair Wages", "Compostable Fiber"],
    description: "Woven by an indigenous women-led collective. Naturally water-resistant, ultra-durable, and 100% biodegradable at end-of-life.",
    bestPairWithIds: ["verde-01", "verde-03"],
    inStock: true
  },
  {
    id: "verde-07",
    name: "Zephyr Pleated Lyocell Midi Skirt",
    subtitle: "Closed-Loop Eucalyptus TENCEL™ Lyocell",
    category: "Bottoms",
    gender: "Women",
    price: 3899,
    originalPrice: 4699,
    rating: 4.9,
    reviewsCount: 112,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?auto=format&fit=crop&w=900&q=80",
    tag: "Trending",
    materials: ["100% TENCEL™ Modal by Lenzing"],
    ecoMetrics: {
      waterSavedLiters: 1650,
      co2ReducedKg: 3.9,
      chemicalFree: true
    },
    vibeTags: ["Elegance", "Minimalist", "Fluid", "Day to Night"],
    occasions: ["Evening Dinner", "Brunch", "Creative Office", "Cocktail Hour"],
    fit: "Bias-Cut High Waist with Concealed Side Zip",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Sage Mist", hex: "#9EC7B0" },
      { name: "Espresso Bean", hex: "#42281D" }
    ],
    certifications: ["EU Ecolabel", "Biodegradable in Ocean Water"],
    description: "Flows like water against the skin. Lenzing's closed-loop process recycles 99.8% of solvent water back into the manufacturing cycle.",
    bestPairWithIds: ["verde-04", "verde-08"],
    inStock: true
  },
  {
    id: "verde-08",
    name: "Elysian Oversized Cashmere-Cotton Knit",
    subtitle: "50% Recycled Post-Consumer Cashmere",
    category: "Outerwear",
    gender: "Unisex",
    price: 5999,
    originalPrice: 7500,
    rating: 5.0,
    reviewsCount: 145,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80",
    tag: "Luxe Reborn",
    materials: ["50% Recycled Italian Cashmere", "50% Organic Combed Cotton"],
    ecoMetrics: {
      waterSavedLiters: 4200,
      co2ReducedKg: 9.8,
      chemicalFree: true
    },
    vibeTags: ["Cozy Luxury", "Minimalist", "Monochrome", "Autumn Layers"],
    occasions: ["Cool Evenings", "Travel", "Coffee Dates", "Creative Office"],
    fit: "Slouchy Relaxed Fit with Ribbed Cuffs",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Oatmeal Heather", hex: "#E8E2D8" },
      { name: "Dark Pine", hex: "#284839" }
    ],
    certifications: ["Global Recycled Standard (GRS)", "Animal Welfare Certified"],
    description: "Sourced from reclaimed knitwear shredded and re-spun into clouds of softness. Gives pre-loved luxury cashmere a magnificent second chapter.",
    bestPairWithIds: ["verde-02", "verde-07"],
    inStock: true
  }
];

export const VIBE_CATEGORIES = [
  { id: "all", label: "All Items" },
  { id: "Tops", label: "Tops & Shirts" },
  { id: "Bottoms", label: "Trousers & Skirts" },
  { id: "Dresses", label: "Dresses" },
  { id: "Outerwear", label: "Knitwear & Jackets" },
  { id: "Accessories", label: "Eco Accessories" }
];

export const SUSTAINABILITY_PILLARS = [
  {
    icon: "Droplets",
    title: "1.4M+ Liters Water Saved",
    description: "Closed-loop washing and rainfed hemp cut municipal water dependency by 80%."
  },
  {
    icon: "TreePine",
    title: "100% Zero Synthetic Plastics",
    description: "No polyester, no microplastic-shedding nylon. Naturally compostable fabrics."
  },
  {
    icon: "ShieldCheck",
    title: "Fair Living Wages",
    description: "All partner artisanal studios operate with audited living wages and clean solar energy."
  },
  {
    icon: "Sparkles",
    title: "AI Precision Fit & Zero-Waste",
    description: "Recommendation algorithms prevent impulse returns, slashing reverse-logistics carbon emissions."
  }
];
