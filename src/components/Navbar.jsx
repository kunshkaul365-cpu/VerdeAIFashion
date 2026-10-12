import React from "react";
import { Sparkles, ShoppingBag, Heart, Search, SlidersHorizontal, Leaf, Settings } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Navbar({ onScrollToCatalog }) {
  const {
    totalCartCount,
    cartTotalWaterSaved,
    wishlist,
    setIsCartOpen,
    setIsQuizOpen,
    setIsAiDrawerOpen,
    setIsSettingsOpen
  } = useStore();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-earth-200/60 transition-all">
      {/* Top Eco Announcement Bar */}
      <div className="bg-verde-900 text-verde-100 text-xs py-1.5 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <Leaf className="w-3.5 h-3.5 text-verde-300 animate-pulse" />
        <span>100% Organic & Plastic-Free • Free Carbon-Neutral Shipping on orders over ₹3,000</span>
        <span className="hidden sm:inline opacity-60">|</span>
        <button
          onClick={() => setIsQuizOpen(true)}
          className="hidden sm:inline-flex items-center gap-1 underline underline-offset-2 hover:text-white transition-colors"
        >
          Take the 60-Sec AI Style Quiz →
        </button>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-charcoal/80">
          <button
            onClick={onScrollToCatalog}
            className="hover:text-verde-700 transition-colors"
          >
            Collection
          </button>
          <button
            onClick={() => setIsQuizOpen(true)}
            className="group flex items-center gap-1.5 text-verde-800 font-semibold hover:text-verde-600 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-verde-600 group-hover:rotate-12 transition-transform" />
            <span>AI Style Matcher</span>
            <span className="bg-verde-100 text-verde-800 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full border border-verde-300">
              New
            </span>
          </button>
          <a href="#sustainability" className="hover:text-verde-700 transition-colors">
            Eco Impact
          </a>
        </nav>

        {/* Center: Brand Logo */}
        <div className="flex flex-col items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-semibold text-verde-950">
            VERDE
          </span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-earth-700 -mt-1 font-medium">
            Sustainable Atelier
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* AI Stylist Assistant Trigger Button */}
          <button
            onClick={() => setIsAiDrawerOpen(true)}
            className="flex items-center gap-2 bg-verde-100/80 hover:bg-verde-200/80 text-verde-900 border border-verde-300/80 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all shadow-sm group"
            title="Chat with AI Eco-Stylist"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-verde-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-verde-600"></span>
            </span>
            <Sparkles className="w-4 h-4 text-verde-700 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Ask AI Stylist</span>
          </button>

          {/* Settings / API Key */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 text-charcoal/70 hover:text-charcoal hover:bg-earth-100 rounded-full transition-colors"
            title="AI Engine Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Wishlist */}
          <div className="relative">
            <button
              onClick={() => onScrollToCatalog()}
              className="p-2 text-charcoal/70 hover:text-charcoal hover:bg-earth-100 rounded-full transition-colors"
              title="Saved items"
            >
              <Heart className="w-5 h-5" />
            </button>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-earth-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>

          {/* Cart Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-charcoal text-cream hover:bg-verde-900 px-3.5 py-2 rounded-full transition-all text-xs sm:text-sm font-medium shadow-md"
          >
            <ShoppingBag className="w-4 h-4 text-verde-300" />
            <span>Bag</span>
            <span className="bg-verde-500 text-verde-950 font-bold text-xs px-1.5 py-0.2 rounded-full">
              {totalCartCount}
            </span>
            {cartTotalWaterSaved > 0 && (
              <span className="hidden lg:inline text-[11px] text-verde-300 font-normal pl-1 border-l border-white/20">
                -{cartTotalWaterSaved}L
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
