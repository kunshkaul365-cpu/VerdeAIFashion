import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ArrowUpDown, Sparkles, X, Check, Droplets } from "lucide-react";
import { PRODUCTS, VIBE_CATEGORIES } from "../data/products";
import ProductCard from "./ProductCard";
import { useStore } from "../context/StoreContext";

export default function ProductCatalog({ catalogRef }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGender, setSelectedGender] = useState("Women");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const { setIsAiDrawerOpen, setIsQuizOpen } = useStore();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      // Gender filter
      if (product.gender !== selectedGender) return false;
      // Search query filter (name, materials, vibeTags, occasions)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesMaterial = product.materials.some(m => m.toLowerCase().includes(query));
        const matchesVibe = product.vibeTags.some(v => v.toLowerCase().includes(query));
        const matchesOccasion = product.occasions.some(o => o.toLowerCase().includes(query));
        const matchesSub = product.subtitle.toLowerCase().includes(query);
        if (!matchesName && !matchesMaterial && !matchesVibe && !matchesOccasion && !matchesSub) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "water-saved") return b.ecoMetrics.waterSavedLiters - a.ecoMetrics.waterSavedLiters;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default order
    });
  }, [selectedCategory, selectedGender, sortBy, searchQuery]);

  return (
    <section ref={catalogRef} id="collection" className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 text-left border-b border-earth-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-verde-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-verde-600 inline-block" />
            <span>Curated Sustainable Catalog</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-verde-950">
            The Conscious Capsule Collection
          </h2>
          <p className="text-sm sm:text-base text-charcoal/70 mt-1 max-w-xl">
            Each garment crafted from renewable botanical fibers, free from synthetic coatings, and engineered for zero microplastic shedding.
          </p>
        </div>

        {/* AI Style Finder banner button */}
        <button
          onClick={() => setIsQuizOpen(true)}
          className="self-start md:self-auto flex items-center gap-2.5 bg-verde-50 hover:bg-verde-100 text-verde-900 border border-verde-300 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all group shadow-sm hover:shadow"
        >
          <Sparkles className="w-4 h-4 text-verde-600 group-hover:rotate-12 transition-transform" />
          <span>Curate Custom Look via AI Quiz</span>
        </button>
      </div>

      {/* Filter and Search Bar Control Center */}
      <div className="space-y-4 mb-10">
        
        {/* Top Controls: Search + Sort + Gender */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Natural Language / Keyword Search Bar */}
          <div className="relative flex-grow max-w-lg">
            <Search className="w-4 h-4 text-charcoal/50 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by fiber (linen, hemp), occasion (brunch), or vibe..."
              className="w-full bg-white border border-earth-300 rounded-full pl-11 pr-24 py-3 text-xs sm:text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-verde-600 focus:border-transparent transition-all shadow-sm"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-charcoal/40 hover:text-charcoal"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsAiDrawerOpen(true)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-verde-800 bg-verde-100 px-2.5 py-1 rounded-full flex items-center gap-1 hover:bg-verde-200"
              >
                <Sparkles className="w-3 h-3 text-verde-600" />
                <span>Ask AI</span>
              </button>
            )}
          </div>

          {/* Sort & Gender Selectors */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Gender Toggle */}
            <div className="bg-earth-100 p-1 rounded-full flex items-center text-xs font-medium border border-earth-200">
              {["Women", "Men", "Unisex"].map((gender) => (
                <button
                  key={gender}
                  onClick={() => setSelectedGender(gender)}
                  className={`px-3 py-1.5 rounded-full transition-all ${
                    selectedGender === gender
                      ? "bg-white text-verde-950 font-semibold shadow-sm"
                      : "text-charcoal/60 hover:text-charcoal"
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <ArrowUpDown className="w-3.5 h-3.5 text-charcoal/50 absolute left-3 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-earth-300 rounded-full pl-8 pr-8 py-2.5 text-xs sm:text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-verde-600 shadow-sm cursor-pointer"
              >
                <option value="featured">Featured Essentials</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="water-saved">Highest Water Saved 💧</option>
                <option value="rating">Top Customer Rated ★</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-left">
          {VIBE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-verde-900 text-cream shadow-md"
                  : "bg-white border border-earth-200/90 text-charcoal/70 hover:border-verde-400 hover:text-charcoal"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* Grid of Products or Empty State */}
      {filteredProducts.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Eco metric summary below grid */}
          <div className="mt-12 p-6 bg-earth-50 rounded-2xl border border-earth-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-verde-100 flex items-center justify-center text-verde-700">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-verde-950">
                  Every Choice Restores Our Ecosystem
                </h4>
                <p className="text-xs text-charcoal/70">
                  Purchasing these {filteredProducts.length} curated pieces prevents thousands of liters of chemical dye runoff into freshwater systems.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="text-xs font-semibold text-verde-800 hover:text-verde-950 underline underline-offset-4 whitespace-nowrap"
            >
              Let AI Build a Complete Outfit →
            </button>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-3xl border border-earth-200 p-8 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-earth-100 text-earth-700 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 opacity-70" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
            No exact matches for "{searchQuery}"
          </h3>
          <p className="text-sm text-charcoal/60 mb-6">
            Our catalog is carefully curated. Ask Aria, our AI Eco-Stylist, to parse what you're looking for or generate custom recommendations!
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setSearchQuery("")}
              className="px-4 py-2 text-xs font-medium border border-earth-300 rounded-full hover:bg-earth-50"
            >
              Clear filters
            </button>
            <button
              onClick={() => {
                setIsAiDrawerOpen(true);
              }}
              className="flex items-center gap-2 bg-verde-800 text-cream px-5 py-2 rounded-full text-xs font-semibold shadow hover:bg-verde-900"
            >
              <Sparkles className="w-3.5 h-3.5 text-verde-300" />
              <span>Ask AI Stylist</span>
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
