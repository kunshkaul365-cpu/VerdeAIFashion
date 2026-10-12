import React, { useRef } from "react";
import { StoreProvider, useStore } from "./context/StoreContext";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProductCatalog from "./components/ProductCatalog";
import SustainabilitySection from "./components/SustainabilitySection";
import Footer from "./components/Footer";
import StyleQuizModal from "./components/StyleQuizModal";
import AiStylistDrawer from "./components/AiStylistDrawer";
import ProductQuickViewModal from "./components/ProductQuickViewModal";
import CartDrawer from "./components/CartDrawer";
import SettingsModal from "./components/SettingsModal";
import { Sparkles } from "lucide-react";

function MainStorefront() {
  const catalogRef = useRef(null);
  const { isAiDrawerOpen, setIsAiDrawerOpen } = useStore();

  const handleScrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-charcoal font-sans selection:bg-verde-200 selection:text-verde-900">
      {/* Top Navbar */}
      <Navbar onScrollToCatalog={handleScrollToCatalog} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Editorial Hero Banner */}
        <HeroSection onExploreClick={handleScrollToCatalog} />

        {/* Catalog & Filter Grid */}
        <ProductCatalog catalogRef={catalogRef} />

        {/* Radical Sustainability Pillars */}
        <SustainabilitySection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive AI Floating Pill (Visible when drawer is closed) */}
      {!isAiDrawerOpen && (
        <button
          onClick={() => setIsAiDrawerOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-verde-900 hover:bg-verde-950 text-cream p-4 rounded-full shadow-2xl flex items-center gap-2.5 transition-all hover:scale-105 group border-2 border-verde-500/40"
          title="Chat with Aria - AI Eco Stylist"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-verde-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-verde-400" />
          </span>
          <Sparkles className="w-5 h-5 text-verde-300 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline font-semibold text-xs tracking-wide">
            AI Eco-Stylist
          </span>
        </button>
      )}

      {/* Modals & Slide-out Drawers */}
      <StyleQuizModal />
      <AiStylistDrawer />
      <ProductQuickViewModal />
      <CartDrawer />
      <SettingsModal />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainStorefront />
    </StoreProvider>
  );
}
