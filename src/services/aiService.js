import { PRODUCTS } from "../data/products";

// Helper to check for configured API key
export function getSavedApiKey() {
  return localStorage.getItem("verde_openai_key") || import.meta.env.VITE_OPENAI_API_KEY || "";
}

export function saveApiKey(key) {
  if (key) {
    localStorage.setItem("verde_openai_key", key.trim());
  } else {
    localStorage.removeItem("verde_openai_key");
  }
}

// Local outfit matcher fallback
function localCurateOutfit({ occasion, aesthetic, weather, ecoPriority, gender }) {
  let filtered = [...PRODUCTS];

  // Gender filter if specified and not Unisex
  if (gender && gender !== "All") {
    filtered = filtered.filter(p => p.gender === gender || p.gender === "Unisex");
  }

  // Score each product based on match criteria
  const scored = filtered.map(p => {
    let score = 0;
    
    // Occasion match
    if (occasion && p.occasions.some(o => o.toLowerCase().includes(occasion.toLowerCase()))) {
      score += 4;
    }

    // Aesthetic / Vibe match
    if (aesthetic && p.vibeTags.some(v => v.toLowerCase().includes(aesthetic.toLowerCase()))) {
      score += 5;
    }

    // Weather heuristics
    if (weather === "Warm & Breezy" || weather === "Hot / Tropical") {
      if (p.materials.some(m => m.toLowerCase().includes("linen") || m.toLowerCase().includes("bamboo"))) score += 3;
      if (p.category === "Tops" || p.category === "Dresses") score += 2;
    } else if (weather === "Cool / Mild" || weather === "Chilly") {
      if (p.category === "Outerwear" || p.materials.some(m => m.toLowerCase().includes("cashmere") || m.toLowerCase().includes("canvas"))) score += 4;
    }

    // Eco priority
    if (ecoPriority === "Max Water Savings" && p.ecoMetrics.waterSavedLiters > 1500) {
      score += 3;
    }
    if (ecoPriority === "Zero Chemical / 100% Organic" && p.ecoMetrics.chemicalFree) {
      score += 3;
    }

    return { product: p, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Build a cohesive 2 or 3 piece outfit: Top + Bottom + Accessory/Outerwear OR Dress + Accessory
  const selectedProducts = [];
  const categoriesPicked = new Set();

  for (const item of scored) {
    if (selectedProducts.length >= 3) break;
    const cat = item.product.category;
    
    if (!categoriesPicked.has(cat)) {
      selectedProducts.push(item.product);
      categoriesPicked.add(cat);
      // If dress is picked, don't pick top or bottom
      if (cat === "Dresses") {
        categoriesPicked.add("Tops");
        categoriesPicked.add("Bottoms");
      }
    }
  }

  // Fallback to top scored if less than 2
  if (selectedProducts.length < 2) {
    for (const item of scored) {
      if (!selectedProducts.find(p => p.id === item.product.id)) {
        selectedProducts.push(item.product);
        if (selectedProducts.length >= 2) break;
      }
    }
  }

  const totalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscountPrice = Math.round(totalPrice * 0.90); // 10% bundle saving
  const totalWaterSaved = selectedProducts.reduce((sum, p) => sum + p.ecoMetrics.waterSavedLiters, 0);
  const totalCo2Reduced = Number(selectedProducts.reduce((sum, p) => sum + p.ecoMetrics.co2ReducedKg, 0).toFixed(1));

  const aestheticTitles = {
    "Minimalist": "The Earthbound Minimalist Capsule",
    "Resort Earth": "Breezy Coastal Solitude Look",
    "Tailored Workwear": "The Conscious Executive Ensemble",
    "Boho Romantic": "Wildflora Artisan Silhouette"
  };

  const title = aestheticTitles[aesthetic] || `The ${aesthetic || "Curated"} Eco-Capsule`;

  return {
    title,
    rationale: `Selected specifically for a ${occasion || "versatile"} setting in ${weather || "temperate"} weather. These pieces harmoniously blend breathable natural fibers (organic flax, hemp, and cruelty-free peace silk) with unrestrictive silhouettes that transition seamlessly from day into twilight.`,
    outfitItems: selectedProducts,
    totalPrice,
    bundleDiscountPrice,
    totalWaterSaved,
    totalCo2Reduced,
    stylingTips: [
      `Drape the top loosely or tuck gently into the waistband for an effortless proportional balance.`,
      `Accentuate the earthy tones with raw linen accessories and minimally treated leather or vegan cork sandals.`,
      `This coordinated pairing saves ${totalWaterSaved.toLocaleString()} Liters of fresh water compared to standard petrochemical fast-fashion garments.`
    ],
    mode: "local_heuristic"
  };
}

// Curate outfit recommendation
export async function curatePersonalizedOutfit(preferences) {
  const apiKey = getSavedApiKey();

  if (!apiKey) {
    // Simulated delay
    await new Promise(res => setTimeout(res, 600));
    return localCurateOutfit(preferences);
  }

  try {
    const prompt = `
You are the Lead Eco-Fashion Stylist for VERDE Studio, an ultra-luxury sustainable fashion brand.
Recommend a perfectly coordinated 2-to-3 piece outfit from the following catalog based on user preferences.

User Preferences:
- Occasion: ${preferences.occasion || "Versatile"}
- Aesthetic: ${preferences.aesthetic || "Earthy Minimalist"}
- Weather/Climate: ${preferences.weather || "Mild"}
- Eco Priority: ${preferences.ecoPriority || "High"}
- Target Gender: ${preferences.gender || "Any"}

Available Catalog JSON:
${JSON.stringify(PRODUCTS.map(p => ({
  id: p.id,
  name: p.name,
  category: p.category,
  price: p.price,
  vibeTags: p.vibeTags,
  occasions: p.occasions,
  materials: p.materials,
  waterSaved: p.ecoMetrics.waterSavedLiters,
  co2Reduced: p.ecoMetrics.co2ReducedKg
})))}

Respond ONLY with valid JSON in this exact structure:
{
  "title": "A short poetic collection title",
  "rationale": "2-3 sentences explaining why this exact combination works for the user's occasion and aesthetics, highlighting fabric synergies.",
  "selectedIds": ["verde-01", "verde-02"],
  "stylingTips": [
    "Tip 1 on how to wear/layer",
    "Tip 2 on footwear or attitude",
    "Tip 3 on eco-impact care"
  ]
}
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: "You are a sustainable fashion AI stylist." }, { role: "user", content: prompt }],
        temperature: 0.6,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API returned status ${response.status}`);
    }

    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content);

    const outfitItems = parsed.selectedIds
      .map(id => PRODUCTS.find(p => p.id === id))
      .filter(Boolean);

    // Fallback if AI returned invalid IDs
    if (outfitItems.length < 2) {
      return localCurateOutfit(preferences);
    }

    const totalPrice = outfitItems.reduce((sum, p) => sum + p.price, 0);
    const bundleDiscountPrice = Math.round(totalPrice * 0.90);
    const totalWaterSaved = outfitItems.reduce((sum, p) => sum + p.ecoMetrics.waterSavedLiters, 0);
    const totalCo2Reduced = Number(outfitItems.reduce((sum, p) => sum + p.ecoMetrics.co2ReducedKg, 0).toFixed(1));

    return {
      title: parsed.title,
      rationale: parsed.rationale,
      outfitItems,
      totalPrice,
      bundleDiscountPrice,
      totalWaterSaved,
      totalCo2Reduced,
      stylingTips: parsed.stylingTips || [
        "Layer lightly for optimal thermal comfort and fluid drape.",
        "Spot-clean and air-dry to extend the lifespan of natural fibers."
      ],
      mode: "openai_live"
    };
  } catch (err) {
    console.warn("Falling back to local heuristic engine due to API error:", err);
    return localCurateOutfit(preferences);
  }
}

// Natural language search helper
export async function searchWithAiStylist(query) {
  const qLower = query.toLowerCase();
  const apiKey = getSavedApiKey();

  // OpenAI call if key exists
  if (apiKey) {
    try {
      const systemPrompt = `You are Aria, an intelligent and warm AI Eco-Stylist for VERDE Studio.
Analyze the user's fashion shopping query, match the best 1-3 items from the catalog, and provide styling advice.
Catalog:
${JSON.stringify(PRODUCTS.map(p => ({
  id: p.id,
  name: p.name,
  category: p.category,
  price: p.price,
  materials: p.materials,
  vibeTags: p.vibeTags,
  occasions: p.occasions
})))}

Respond ONLY in JSON format:
{
  "message": "Friendly, stylish 2-sentence conversational response addressing the user's specific query and why these picks excel.",
  "matchedIds": ["verde-01", "verde-02"]
}
`;
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: systemPrompt }, { role: "user", content: query }],
          temperature: 0.5,
          response_format: { type: "json_object" }
        })
      });

      if (response.ok) {
        const resData = await response.json();
        const parsed = JSON.parse(resData.choices[0].message.content);
        const matches = parsed.matchedIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
        if (matches.length > 0) {
          return {
            reply: parsed.message,
            products: matches,
            mode: "openai"
          };
        }
      }
    } catch (e) {
      console.warn("OpenAI search failed, running intelligent semantic fallback", e);
    }
  }

  // Local search fallback
  await new Promise(r => setTimeout(r, 400));

  // Extract budget if mentioned (e.g., "under 4000", "< 3500", "budget 5000")
  const budgetMatch = qLower.match(/under\s*₹?\s*(\d+)/) || qLower.match(/below\s*₹?\s*(\d+)/) || qLower.match(/less than\s*₹?\s*(\d+)/);
  const maxBudget = budgetMatch ? parseInt(budgetMatch[1], 10) : null;

  const scored = PRODUCTS.map(p => {
    let score = 0;
    const allText = `${p.name} ${p.subtitle} ${p.category} ${p.materials.join(" ")} ${p.vibeTags.join(" ")} ${p.occasions.join(" ")} ${p.description}`.toLowerCase();

    // Word matches
    const words = qLower.split(/\s+/).filter(w => w.length > 2 && !["the", "for", "and", "with", "show", "give", "want", "need", "like", "under"].includes(w));
    for (const w of words) {
      if (allText.includes(w)) score += 3;
      if (p.name.toLowerCase().includes(w)) score += 5;
    }

    // Material tags
    if (qLower.includes("linen") && allText.includes("linen")) score += 6;
    if (qLower.includes("hemp") && allText.includes("hemp")) score += 6;
    if (qLower.includes("cotton") && allText.includes("cotton")) score += 5;
    if (qLower.includes("silk") && allText.includes("silk")) score += 6;
    if (qLower.includes("cashmere") && allText.includes("cashmere")) score += 6;

    // Occasion tags
    if (qLower.includes("beach") || qLower.includes("vacation") || qLower.includes("goa")) {
      if (p.occasions.some(o => o.toLowerCase().includes("vacation") || o.toLowerCase().includes("beach"))) score += 5;
    }
    if (qLower.includes("office") || qLower.includes("work")) {
      if (p.occasions.some(o => o.toLowerCase().includes("office") || o.toLowerCase().includes("work"))) score += 5;
    }
    if (qLower.includes("brunch") || qLower.includes("date") || qLower.includes("dinner")) {
      if (p.occasions.some(o => o.toLowerCase().includes("brunch") || o.toLowerCase().includes("dinner"))) score += 4;
    }

    // Budget constraint check
    if (maxBudget && p.price > maxBudget) {
      score -= 10;
    } else if (maxBudget && p.price <= maxBudget) {
      score += 2;
    }

    return { product: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const matched = scored.filter(s => s.score > 2).slice(0, 3).map(s => s.product);

  const fallbackList = matched.length > 0 ? matched : PRODUCTS.slice(0, 2);

  let responseReply = `I've analyzed our sustainable inventory for "${query}". Here are our prime organic picks tailored to your exact aesthetic, crafted with zero synthetic microplastics.`;

  if (maxBudget) {
    responseReply = `Curated our finest eco-conscious garments within your ₹${maxBudget.toLocaleString()} budget that match your vibe without compromising sustainability.`;
  } else if (qLower.includes("goa") || qLower.includes("beach") || qLower.includes("vacation")) {
    responseReply = `For your getaway, lightweight breathability is key. Here are our top French flax and peace-silk pieces designed for coastal air and balmy sunsets.`;
  } else if (qLower.includes("office") || qLower.includes("work")) {
    responseReply = `Here are structured yet effortlessly comfortable organic pieces that bring modern sustainability into your workday.`;
  }

  return {
    reply: responseReply,
    products: fallbackList,
    mode: "local_semantic"
  };
}

// Product assistant helper
export async function askProductAssistant(product, question) {
  const q = question.toLowerCase();
  await new Promise(r => setTimeout(r, 350));

  if (q.includes("wash") || q.includes("care") || q.includes("clean")) {
    return `Because the ${product.name} uses ${product.materials[0]}, we recommend a cold gentle machine wash (or hand wash) with plant-based detergent. Line-dry in the shade. It requires no dry cleaning and naturally softens with every wash.`;
  }

  if (q.includes("size") || q.includes("fit")) {
    return `The ${product.name} is designed with a ${product.fit}. We advise ordering your standard size for an intentionally relaxed silhouette. If you prefer a closer, tailored fit, consider sizing down one notch.`;
  }

  if (q.includes("summer") || q.includes("hot") || q.includes("weather") || q.includes("temperature")) {
    return `Natural fibers allow thermal regulation. Because this piece uses ${product.materials.join(", ")}, heat and moisture dissipate rapidly, keeping you 2-3°C cooler than synthetic polyester blends.`;
  }

  return `The ${product.name} is crafted from ${product.materials.join(" and ")}. By choosing this, you help save ${product.ecoMetrics.waterSavedLiters}L of water and support certified ethical artisanal studios.`;
}
