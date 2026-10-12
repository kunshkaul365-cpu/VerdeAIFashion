import React, { useState } from "react";
import { X, Heart, ShoppingBag, Droplets, Leaf, ShieldCheck, Sparkles, MessageSquare, Star, ArrowRight } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { PRODUCTS } from "../data/products";
import { askProductAssistant } from "../services/aiService";

export default function ProductQuickViewModal() {
  const {
    activeProductModal,
    setActiveProductModal,
    addToCart,
    addBundleToCart,
    wishlist,
    toggleWishlist
  } = useStore();

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);

  if (!activeProductModal) return null;

  const product = activeProductModal;
  const isWishlisted = wishlist.includes(product.id);
  const currentImage = activeImage || product.image;
  const currentColor = selectedColor || (product.colors && product.colors[0]?.name) || "Natural";

  // Recommended pairing items
  const pairingProducts = (product.bestPairWithIds || [])
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean);

  const handleAskAi = async (customQuery) => {
    const q = customQuery || aiQuestion;
    if (!q) return;
    setLoadingAi(true);
    setAiAnswer(null);
    try {
      const answer = await askProductAssistant(product, q);
      setAiAnswer(answer);
    } catch {
      setAiAnswer("Cold wash with natural plant detergent and line-dry in the shade for highest fiber longevity.");
    } finally {
      setLoadingAi(false);
    }
  };

  const handleClose = () => {
    setActiveProductModal(null);
    setActiveImage(null);
    setAiAnswer(null);
    setAiQuestion("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-[#FAF8F5] w-full max-w-4xl rounded-3xl shadow-2xl border border-earth-300 overflow-hidden text-left animate-slide-up my-6">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-charcoal rounded-full shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left: Imagery Column */}
          <div className="md:col-span-6 p-6 bg-earth-50 flex flex-col justify-between">
            <div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-sand shadow-sm relative">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-verde-900 border border-verde-200 flex items-center gap-1.5 shadow-sm">
                  <Leaf className="w-3.5 h-3.5 text-verde-600" />
                  <span>{product.certifications[0]}</span>
                </div>
              </div>

              {/* Thumbnails */}
              {product.hoverImage && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setActiveImage(product.image)}
                    className={`w-14 h-18 rounded-lg overflow-hidden border-2 ${
                      currentImage === product.image ? "border-verde-700" : "border-transparent opacity-70"
                    }`}
                  >
                    <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover" />
                  </button>
                  <button
                    onClick={() => setActiveImage(product.hoverImage)}
                    className={`w-14 h-18 rounded-lg overflow-hidden border-2 ${
                      currentImage === product.hoverImage ? "border-verde-700" : "border-transparent opacity-70"
                    }`}
                  >
                    <img src={product.hoverImage} alt="Thumbnail 2" className="w-full h-full object-cover" />
                  </button>
                </div>
              )}
            </div>

            {/* Ecological Impact Metrics Box */}
            <div className="mt-4 p-4 bg-white/80 rounded-2xl border border-earth-200 text-xs">
              <span className="font-semibold text-verde-950 block mb-2">Verified Ecological Savings:</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-verde-600" />
                  <span><strong>{product.ecoMetrics.waterSavedLiters}L</strong> Water Conserved</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-verde-600" />
                  <span><strong>{product.ecoMetrics.co2ReducedKg}kg</strong> CO₂ Avoided</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Details & Purchase Column */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Header Title */}
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-verde-800">
                  {product.category} • {product.gender}
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal mt-1">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/60 mt-0.5">{product.subtitle}</p>
                
                {/* Rating & Price */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-bold text-verde-950">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-charcoal/40 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-charcoal/80">
                    <Star className="w-4 h-4 fill-current text-amber-500" />
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-charcoal/40">({product.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed border-t border-earth-200 pt-3">
                {product.description}
              </p>

              {/* Material Composition */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-charcoal">Botanical Materials:</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-earth-100 text-charcoal/80 px-2.5 py-1 rounded-full border border-earth-200"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <span className="text-xs font-semibold text-charcoal block mb-1.5">
                    Select Color: <span className="font-normal text-charcoal/70">{currentColor}</span>
                  </span>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${
                          currentColor === c.name ? "ring-2 ring-verde-700 ring-offset-2 scale-110" : "opacity-80"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-charcoal">Select Size:</span>
                    <button
                      onClick={() => handleAskAi("How does the sizing run for this product?")}
                      className="text-[11px] text-verde-700 hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-verde-600" />
                      <span>AI Size Advisor</span>
                    </button>
                  </div>
                  <div className="flex gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`w-10 h-10 rounded-xl text-xs font-semibold transition-all border ${
                          selectedSize === s
                            ? "bg-verde-900 text-cream border-verde-900 shadow-sm"
                            : "bg-white text-charcoal border-earth-300 hover:border-verde-400"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Product Care & Fit Interactive Accordion */}
              <div className="bg-white p-3.5 rounded-2xl border border-earth-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-verde-900">
                  <Sparkles className="w-4 h-4 text-verde-600" />
                  <span>Ask AI Stylist about this garment</span>
                </div>
                
                {/* Fast Question Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "How should I wash & care for it?",
                    "Is it good for 35°C summer?",
                    "How does the fit feel on body?"
                  ].map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleAskAi(q)}
                      className="text-[11px] bg-earth-50 hover:bg-earth-100 text-charcoal/80 px-2 py-0.5 rounded-full border border-earth-200 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {loadingAi && (
                  <p className="text-[11px] text-verde-700 animate-pulse">Aria AI is checking fabric care matrix...</p>
                )}

                {aiAnswer && (
                  <div className="p-2.5 bg-verde-50 rounded-xl text-[11px] text-verde-950 border border-verde-200 leading-relaxed animate-fade-in">
                    {aiAnswer}
                  </div>
                )}
              </div>

              {/* Complete the Look (Dynamic AI Cross-sell) */}
              {pairingProducts.length > 0 && (
                <div className="pt-2 border-t border-earth-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                      Complete the Look (10% Off Bundle):
                    </span>
                    <span className="text-[10px] bg-verde-100 text-verde-800 font-bold px-1.5 py-0.5 rounded">
                      AI Paired
                    </span>
                  </div>
                  <div className="space-y-2">
                    {pairingProducts.slice(0, 1).map((pair) => (
                      <div
                        key={pair.id}
                        className="bg-white p-2.5 rounded-xl border border-earth-200 flex items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={pair.image} alt={pair.name} className="w-10 h-12 object-cover rounded bg-sand" />
                          <div>
                            <h6 className="font-serif text-xs font-semibold text-charcoal line-clamp-1">{pair.name}</h6>
                            <span className="text-xs font-bold text-verde-950">₹{pair.price.toLocaleString()}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            addBundleToCart([product, pair]);
                            handleClose();
                          }}
                          className="bg-earth-100 hover:bg-verde-100 text-verde-900 px-3 py-1.5 rounded-full text-[11px] font-semibold border border-earth-300 hover:border-verde-400 transition-all flex items-center gap-1"
                        >
                          <span>Bundle Both</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-earth-200">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isWishlisted
                    ? "bg-earth-600 text-white border-earth-600"
                    : "bg-white text-charcoal/70 border-earth-300 hover:bg-earth-50"
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
              
              <button
                onClick={() => {
                  addToCart(product, selectedSize, currentColor);
                  handleClose();
                }}
                className="flex-1 bg-verde-800 hover:bg-verde-900 text-cream py-4 rounded-2xl font-semibold text-sm shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-verde-200" />
                <span>Add to Bag • ₹{product.price.toLocaleString()}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
