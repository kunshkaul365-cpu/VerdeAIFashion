import React, { useState } from "react";
import { Heart, ShoppingBag, Eye, Droplets, Sparkles, Star } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { wishlist, toggleWishlist, addToCart, setActiveProductModal, setIsAiDrawerOpen } = useStore();

  const isWishlisted = wishlist.includes(product.id);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-earth-200/80 shadow-sm hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand cursor-pointer" onClick={() => setActiveProductModal(product)}>
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.tag && (
            <span className="bg-verde-900/90 backdrop-blur-sm text-cream text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
              {product.tag}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-earth-600/90 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm w-fit">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 shadow-sm ${
            isWishlisted
              ? "bg-earth-600 text-white"
              : "bg-white/80 hover:bg-white text-charcoal/80 hover:text-earth-700"
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Eco Impact Floating Pill */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 text-[11px] font-semibold text-verde-900 border border-verde-200">
          <Droplets className="w-3 h-3 text-verde-600" />
          <span>-{product.ecoMetrics.waterSavedLiters}L Water</span>
        </div>

        {/* Hover Quick Actions */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveProductModal(product);
            }}
            className="flex-1 bg-white/95 hover:bg-white text-charcoal py-2.5 px-3 rounded-xl text-xs font-semibold shadow-lg flex items-center justify-center gap-1.5 border border-earth-200 hover:border-verde-500 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex-1 bg-verde-800 hover:bg-verde-900 text-cream py-2.5 px-3 rounded-xl text-xs font-semibold shadow-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-grow justify-between text-left">
        <div>
          {/* Subtitle / Fabric origin */}
          <div className="flex items-center justify-between text-[11px] text-charcoal/60 mb-1">
            <span className="truncate">{product.subtitle}</span>
            <span className="font-medium text-verde-800 bg-verde-50 px-1.5 py-0.5 rounded border border-verde-200 text-[10px]">
              {product.gender}
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setActiveProductModal(product)}
            className="font-serif text-base font-semibold text-charcoal hover:text-verde-800 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-charcoal/70">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-charcoal">{product.rating}</span>
            <span className="text-charcoal/40">({product.reviewsCount})</span>
            <span className="text-charcoal/30">•</span>
            <span className="text-[11px] text-verde-700 font-medium truncate">
              {product.certifications[0]}
            </span>
          </div>
        </div>

        {/* Bottom Price & AI Prompt */}
        <div className="mt-4 pt-3 border-t border-earth-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-semibold text-verde-950">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-charcoal/40 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* AI Advisor Trigger Button */}
          <button
            onClick={() => {
              setActiveProductModal(product);
            }}
            className="text-[11px] text-verde-700 hover:text-verde-900 font-semibold flex items-center gap-1 hover:underline"
            title="Ask AI Stylist about this fabric and pairing"
          >
            <Sparkles className="w-3 h-3 text-verde-600" />
            <span>AI Advice</span>
          </button>
        </div>
      </div>
    </div>
  );
}
