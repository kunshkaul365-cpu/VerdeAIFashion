import React from "react";
import { Droplets, TreePine, ShieldCheck, Sparkles, Check, X } from "lucide-react";
import { SUSTAINABILITY_PILLARS } from "../data/products";

export default function SustainabilitySection() {
  const iconMap = {
    Droplets: Droplets,
    TreePine: TreePine,
    ShieldCheck: ShieldCheck,
    Sparkles: Sparkles
  };

  return (
    <section id="sustainability" className="py-16 lg:py-24 bg-[#F4EDE4]/60 border-y border-earth-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-verde-800">
            Radical Transparency
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-verde-950 mt-2">
            Fashion that leaves zero scars on our planet.
          </h2>
          <p className="text-sm sm:text-base text-charcoal/70 mt-3 leading-relaxed">
            By eliminating synthetic polyester and optimizing demand using AI recommendation models, we curb textile landfill waste before production even starts.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SUSTAINABILITY_PILLARS.map((pillar, idx) => {
            const Icon = iconMap[pillar.icon] || Sparkles;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-earth-200/90 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-verde-100 text-verde-800 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-verde-950 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-earth-100 flex items-center text-[11px] font-semibold text-verde-700">
                  <span>Verified Third-Party Audit ✓</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fast Fashion vs VERDE Comparison */}
        <div className="bg-white rounded-3xl border border-earth-200/90 p-6 sm:p-10 shadow-sm max-w-4xl mx-auto text-left">
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-charcoal text-center mb-6">
            The Industry Standard vs. The VERDE Standard
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fast Fashion */}
            <div className="p-5 rounded-2xl bg-red-50/50 border border-red-200/70 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-red-700 block">
                Conventional Fast Fashion
              </span>
              <ul className="text-xs text-charcoal/80 space-y-2.5">
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Sheds up to 700,000 microplastic fibers per domestic wash cycle.</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Uses petroleum-derived polyester and toxic AZO carcinogenic dyes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>35% return rate due to sizing mismatch, often incinerated.</span>
                </li>
              </ul>
            </div>

            {/* VERDE */}
            <div className="p-5 rounded-2xl bg-verde-50/70 border border-verde-200 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-verde-800 block">
                VERDE AI-Powered Storefront
              </span>
              <ul className="text-xs text-verde-950 space-y-2.5">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-verde-600 flex-shrink-0 mt-0.5" />
                  <span>100% Biodegradable French linen, peace silk, and regenerative hemp.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-verde-600 flex-shrink-0 mt-0.5" />
                  <span>Zero petrochemical synthetics; roots and flower botanical pigments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-verde-600 flex-shrink-0 mt-0.5" />
                  <span>AI Pre-Purchase styling reduces size mismatches by 68%.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
