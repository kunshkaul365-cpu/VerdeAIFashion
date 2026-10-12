import React from "react";
import { Leaf, ArrowRight, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-verde-950 text-cream pt-16 pb-12 border-t border-verde-900 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-verde-800/80">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-3xl tracking-[0.2em] font-semibold text-white">
                VERDE
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-verde-300 -mt-1 font-medium">
                Sustainable Atelier • Paris & Bengaluru
              </span>
            </div>
            <p className="text-xs sm:text-sm text-verde-200/80 max-w-sm leading-relaxed">
              Pioneering the intersection of regenerative agronomy, luxury silhouettes, and conversational artificial intelligence to eliminate fashion waste.
            </p>
            <div className="flex items-center gap-3 text-xs text-verde-300 font-medium">
              <span className="flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5" /> 100% Carbon Neutral
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> GOTS Certified
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-verde-300">
              Navigation
            </h4>
            <ul className="text-xs space-y-2 text-verde-100/70">
              <li><a href="#collection" className="hover:text-white transition-colors">Capsule Collection</a></li>
              <li><a href="#sustainability" className="hover:text-white transition-colors">Environmental Ledger</a></li>
              <li><span className="text-verde-400 font-semibold cursor-pointer">AI Styling Engine</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Fiber Sourcing Transparency</span></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-verde-300">
              Conscious Gazette
            </h4>
            <p className="text-xs text-verde-200/80 leading-relaxed">
              Join 18,000+ patrons receiving our quarterly circular design dispatches and private AI capsule drops.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed to the Conscious Gazette! 🌿"); }} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="bg-verde-900/90 border border-verde-700 rounded-full px-4 py-2.5 text-xs text-white placeholder:text-verde-400 focus:outline-none focus:ring-1 focus:ring-verde-400 flex-1"
              />
              <button
                type="submit"
                className="bg-verde-200 hover:bg-white text-verde-950 px-4 py-2.5 rounded-full text-xs font-semibold transition-colors flex items-center justify-center"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-verde-300/60 gap-4">
          <p>© 2026 VERDE Studio Inc. All rights reserved. Zero synthetic plastics guaranteed.</p>
          <div className="flex items-center gap-1 text-verde-300/80">
            <span>Built with precision for D2C AI Fashion Innovation</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
