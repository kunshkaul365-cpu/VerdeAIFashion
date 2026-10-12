import React, { useState } from "react";
import { X, Sparkles, Check, ArrowRight, ArrowLeft, RefreshCw, ShoppingBag, Droplets, Leaf, Shield } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { curatePersonalizedOutfit } from "../services/aiService";
import confetti from "canvas-confetti";

export default function StyleQuizModal() {
  const { isQuizOpen, setIsQuizOpen, addBundleToCart, setActiveProductModal } = useStore();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // User selections
  const [aesthetic, setAesthetic] = useState("Minimalist");
  const [occasion, setOccasion] = useState("Brunch");
  const [weather, setWeather] = useState("Warm & Breezy");
  const [ecoPriority, setEcoPriority] = useState("Max Water Savings");
  const [gender, setGender] = useState("Women");

  if (!isQuizOpen) return null;

  const handleStartCuration = async () => {
    setLoading(true);
    setStep(4); // Loading step
    try {
      const outfit = await curatePersonalizedOutfit({
        aesthetic,
        occasion,
        weather,
        ecoPriority,
        gender
      });
      setResult(outfit);
      setStep(5); // Result step

      // Celebrate
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#4c8d6e', '#cca17d', '#f2f8f4']
        });
      } catch {}
    } catch (err) {
      console.error(err);
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-[#FAF8F5] w-full max-w-2xl rounded-3xl shadow-2xl border border-earth-300 overflow-hidden text-left animate-slide-up">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-earth-200/80 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-verde-100 flex items-center justify-center text-verde-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-verde-950">
                AI Style & Vibe Discovery
              </h3>
              <p className="text-[11px] text-charcoal/60">
                Personalized sustainable capsules powered by intelligent curation
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsQuizOpen(false)}
            className="p-1.5 text-charcoal/40 hover:text-charcoal hover:bg-earth-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">

          {/* STEP 1: Aesthetic & Gender */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-verde-800">
                  Step 1 of 3
                </span>
                <h4 className="font-serif text-2xl font-semibold text-charcoal mt-1">
                  What defines your visual aesthetic?
                </h4>
                <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
                  Our natural fabrics adapt to different silhouettes and personal expressions.
                </p>
              </div>

              {/* Aesthetic Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: "Minimalist",
                    title: "Earthbound Minimalist",
                    desc: "Clean lines, muted earth tones, unbleached cotton & raw linen."
                  },
                  {
                    id: "Resort Earth",
                    title: "Breezy Coastal Resort",
                    desc: "Relaxed resort silhouettes, high-breathability French flax."
                  },
                  {
                    id: "Tailored Workwear",
                    title: "Conscious Executive",
                    desc: "Hemp canvas chore jackets, tailored trousers, structured draping."
                  },
                  {
                    id: "Boho Romantic",
                    title: "Wildflora Artisan",
                    desc: "Flowing peace silk, plant-dyed botanical weaves, handcrafted textures."
                  }
                ].map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setAesthetic(opt.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      aesthetic === opt.id
                        ? "border-verde-700 bg-verde-50/70 shadow-sm"
                        : "border-earth-200 bg-white hover:border-earth-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-verde-950">{opt.title}</span>
                      {aesthetic === opt.id && <Check className="w-4 h-4 text-verde-700" />}
                    </div>
                    <p className="text-xs text-charcoal/60 leading-relaxed">{opt.desc}</p>
                  </div>
                ))}
              </div>

              {/* Target Gender */}
              <div className="pt-2 border-t border-earth-200">
                <label className="text-xs font-semibold text-charcoal/70 block mb-2">
                  Shopping Preference:
                </label>
                <div className="flex gap-2">
                  {["Women", "Men", "Unisex"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                        gender === g
                          ? "bg-verde-800 text-white"
                          : "bg-white border border-earth-200 text-charcoal/70 hover:bg-earth-50"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 bg-verde-800 hover:bg-verde-900 text-cream px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-md"
                >
                  <span>Continue to Occasion</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Occasion */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-verde-800">
                  Step 2 of 3
                </span>
                <h4 className="font-serif text-2xl font-semibold text-charcoal mt-1">
                  Where are you wearing this capsule?
                </h4>
                <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
                  AI will prioritize functional freedom and context-appropriate silhouettes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: "Brunch", label: "Weekend Brunch & Café Gatherings" },
                  { id: "Beach Vacation", label: "Coastal Vacation / Beach Getaway (e.g. Goa)" },
                  { id: "Creative Office", label: "Creative Office / Meetings / Studio" },
                  { id: "Evening Dinner", label: "Candlelit Dinners & Wine Evenings" },
                  { id: "Casual Day Out", label: "Everyday City Walk & Casual Ease" }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setOccasion(item.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      occasion === item.id
                        ? "border-verde-700 bg-verde-50/70 shadow-sm"
                        : "border-earth-200 bg-white hover:border-earth-300"
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-semibold text-verde-950">{item.label}</span>
                    {occasion === item.id && <Check className="w-4 h-4 text-verde-700 flex-shrink-0" />}
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-earth-200">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-charcoal/70 hover:text-charcoal"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 bg-verde-800 hover:bg-verde-900 text-cream px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-md"
                >
                  <span>Continue to Eco Priorities</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Weather & Eco Priority */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-verde-800">
                  Step 3 of 3
                </span>
                <h4 className="font-serif text-2xl font-semibold text-charcoal mt-1">
                  Climate & Sustainability Focus
                </h4>
                <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
                  Calibrate thermal breathability and ecological impact.
                </p>
              </div>

              {/* Weather selection */}
              <div>
                <label className="text-xs font-semibold text-charcoal/80 block mb-2">
                  Expected Weather / Climate:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "Warm & Breezy", desc: "Warm / Tropical (Prioritize Linen & Bamboo)" },
                    { id: "Cool / Mild", desc: "Mild / Chilly (Prioritize Heavyweight & Knitwear)" }
                  ].map((w) => (
                    <div
                      key={w.id}
                      onClick={() => setWeather(w.id)}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        weather === w.id
                          ? "border-verde-700 bg-verde-50/70"
                          : "border-earth-200 bg-white hover:border-earth-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs sm:text-sm text-verde-950">{w.id}</span>
                        {weather === w.id && <Check className="w-3.5 h-3.5 text-verde-700" />}
                      </div>
                      <p className="text-[11px] text-charcoal/60 mt-0.5">{w.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eco Priority */}
              <div>
                <label className="text-xs font-semibold text-charcoal/80 block mb-2">
                  Primary Ecological Priority:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "Max Water Savings", desc: "Rainfed hemp & closed-loop recycled water" },
                    { id: "Zero Chemical / 100% Organic", desc: "Plant dyes, raw silk, and zero AZO toxins" }
                  ].map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setEcoPriority(p.id)}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        ecoPriority === p.id
                          ? "border-verde-700 bg-verde-50/70"
                          : "border-earth-200 bg-white hover:border-earth-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs sm:text-sm text-verde-950">{p.id}</span>
                        {ecoPriority === p.id && <Check className="w-3.5 h-3.5 text-verde-700" />}
                      </div>
                      <p className="text-[11px] text-charcoal/60 mt-0.5">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-earth-200">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-charcoal/70 hover:text-charcoal"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleStartCuration}
                  className="flex items-center gap-2 bg-verde-800 hover:bg-verde-900 text-cream px-7 py-3 rounded-full text-sm font-semibold transition-all shadow-lg hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 text-verde-300 animate-spin" />
                  <span>Generate AI Capsule</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Loading State */}
          {step === 4 && (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-verde-100 border-2 border-verde-300 flex items-center justify-center mx-auto animate-pulse">
                <Sparkles className="w-8 h-8 text-verde-700 animate-spin" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-verde-950">
                Aria AI is weaving your capsule...
              </h4>
              <p className="text-xs text-charcoal/60 max-w-sm mx-auto">
                Analyzing fabric drape, thermal regulation for {weather}, and computing combined water conservation metrics.
              </p>
            </div>
          )}

          {/* STEP 5: Results Screen */}
          {step === 5 && result && (
            <div className="space-y-6">
              
              {/* Header Box */}
              <div className="bg-verde-900 text-cream p-5 rounded-2xl text-left shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Leaf className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-verde-300 text-xs font-semibold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Curated Capsule</span>
                  </div>
                  <h4 className="font-serif text-2xl font-semibold text-white">
                    {result.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-verde-100/90 mt-2 leading-relaxed">
                    {result.rationale}
                  </p>

                  {/* Impact Badges */}
                  <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-white/20 text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-verde-200">
                      <Droplets className="w-3.5 h-3.5" />
                      <span>{result.totalWaterSaved.toLocaleString()}L Water Saved</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-verde-200">
                      <Leaf className="w-3.5 h-3.5" />
                      <span>{result.totalCo2Reduced}kg CO₂ Offset</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Items in the capsule */}
              <div className="space-y-3">
                <h5 className="text-xs font-semibold uppercase text-charcoal/70 tracking-wider">
                  Curated Outfit Items ({result.outfitItems.length}):
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {result.outfitItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveProductModal(item)}
                      className="group bg-white p-2.5 rounded-xl border border-earth-200 hover:border-verde-500 cursor-pointer transition-all flex flex-col justify-between"
                    >
                      <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2 bg-sand">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <h6 className="font-serif text-xs font-semibold text-charcoal line-clamp-1 group-hover:text-verde-800">
                          {item.name}
                        </h6>
                        <p className="text-[10px] text-charcoal/50 truncate">{item.subtitle}</p>
                        <div className="flex items-center justify-between mt-1 text-xs font-semibold text-verde-950">
                          <span>₹{item.price.toLocaleString()}</span>
                          <span className="text-[10px] text-verde-700 font-normal">-{item.ecoMetrics.waterSavedLiters}L</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Styling Tips */}
              {result.stylingTips && result.stylingTips.length > 0 && (
                <div className="bg-earth-100/70 p-4 rounded-xl border border-earth-200 text-xs text-charcoal/80 space-y-1.5">
                  <span className="font-semibold text-verde-950 block">Stylist Advisory:</span>
                  {result.stylingTips.map((tip, idx) => (
                    <p key={idx} className="flex items-start gap-2">
                      <span className="text-verde-700">•</span>
                      <span>{tip}</span>
                    </p>
                  ))}
                </div>
              )}

              {/* Pricing & 1-Click Buy Look */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-earth-200">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-charcoal/50">Bundle Price:</span>
                    <span className="font-serif text-xl font-bold text-verde-950">
                      ₹{result.bundleDiscountPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-charcoal/40 line-through">
                      ₹{result.totalPrice.toLocaleString()}
                    </span>
                    <span className="bg-verde-100 text-verde-800 font-bold text-[10px] px-2 py-0.5 rounded-full">
                      10% BUNDLE OFF
                    </span>
                  </div>
                  <p className="text-[11px] text-verde-700">Includes carbon-neutral courier delivery</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    className="p-3 text-charcoal/60 hover:text-charcoal border border-earth-300 rounded-full hover:bg-earth-100"
                    title="Retake quiz"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      addBundleToCart(result.outfitItems);
                      setIsQuizOpen(false);
                    }}
                    className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-2 bg-verde-800 hover:bg-verde-900 text-cream px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-lg hover:scale-[1.02]"
                  >
                    <ShoppingBag className="w-4 h-4 text-verde-300" />
                    <span>Add Full Look to Bag</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
