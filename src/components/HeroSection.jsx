import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Droplets, Leaf, Compass } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function HeroSection({ onExploreClick }) {
  const { setIsQuizOpen, setIsAiDrawerOpen } = useStore();

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-24">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-verde-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 -z-10 w-[400px] h-[400px] bg-earth-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            
            <div className="inline-flex items-center gap-2 bg-verde-100/90 text-verde-900 border border-verde-300/80 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider w-fit">
              <Sparkles className="w-3.5 h-3.5 text-verde-700" />
              <span>Next-Gen AI Fashion Engine • SS '26</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-verde-950 leading-[1.12]">
              Conscious Luxury, <br />
              <span className="italic font-normal text-earth-700">intelligently tailored</span> for your lifestyle.
            </h1>

            <p className="text-base sm:text-lg text-charcoal/70 max-w-xl leading-relaxed">
              We replace synthetic microplastics with pure French linen, organic hemp, and cruelty-free peace silk. Our real-time AI styling engine eliminates impulse returns by building your perfect eco-capsule.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => setIsQuizOpen(true)}
                className="group flex items-center justify-center gap-3 bg-verde-800 hover:bg-verde-900 text-cream px-7 py-4 rounded-full font-medium text-sm sm:text-base shadow-lg shadow-verde-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-5 h-5 text-verde-300 group-hover:rotate-12 transition-transform" />
                <span>Take the AI Style Quiz</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreClick}
                className="flex items-center justify-center gap-2 bg-white/80 hover:bg-white text-charcoal border border-earth-300 px-6 py-4 rounded-full font-medium text-sm sm:text-base transition-all hover:border-verde-500 shadow-sm"
              >
                <span>Explore Catalog</span>
              </button>
            </div>

            {/* Quick prompt */}
            <div className="pt-2">
              <div
                onClick={() => setIsAiDrawerOpen(true)}
                className="inline-flex items-center gap-3 bg-white/70 hover:bg-white border border-earth-200/80 px-4 py-2.5 rounded-2xl cursor-pointer transition-all hover:shadow-md group"
              >
                <div className="w-7 h-7 rounded-full bg-verde-100 flex items-center justify-center text-verde-700">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-charcoal/60">Try asking our AI Stylist:</p>
                  <p className="text-xs sm:text-sm font-semibold text-verde-900 group-hover:text-verde-700">
                    "Find me a breathable linen outfit for a summer brunch under ₹4,000" →
                  </p>
                </div>
              </div>
            </div>

            {/* Eco metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-earth-200/70 text-charcoal/80">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-verde-600 flex-shrink-0" />
                <span className="text-xs font-medium">1,420L Avg Water Saved</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-verde-600 flex-shrink-0" />
                <span className="text-xs font-medium">0% Virgin Polyester</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-verde-600 flex-shrink-0" />
                <span className="text-xs font-medium">GOTS & B-Corp Certified</span>
              </div>
            </div>

          </div>

          {/* Featured media card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-earth-100">
                <img
                  src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=85"
                  alt="Sustainable Organic Dress"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-semibold text-verde-900">
                  <Leaf className="w-3.5 h-3.5 text-verde-600" />
                  <span>100% Ahimsa Peace Silk</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <p className="text-xs uppercase tracking-widest text-verde-200 font-semibold">Featured Capsule</p>
                  <h3 className="font-serif text-2xl font-normal">Sylvan Botanical Tiered Sundress</h3>
                  <p className="text-xs text-white/80 mt-1">Naturally plant-dyed with marigold & madder roots.</p>
                </div>
              </div>

              {/* Floating recommendation card */}
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md border border-verde-200 p-4 rounded-2xl shadow-xl max-w-[280px] hidden sm:block text-left animate-pulse-subtle">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-verde-600 text-white flex items-center justify-center text-xs font-bold">
                    AI
                  </div>
                  <span className="text-xs font-bold text-verde-900">Live AI Matcher: 98% Fit</span>
                </div>
                <p className="text-xs text-charcoal/80 leading-snug">
                  "Pairs impeccably with Tierra Hemp Trousers for coastal dinners."
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-verde-700 font-semibold border-t border-earth-100 pt-1.5">
                  <span>-1,850 Liters H₂O</span>
                  <span className="text-charcoal font-bold">₹5,299</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
