import React, { useState } from "react";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Droplets, Leaf, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useStore } from "../context/StoreContext";
import confetti from "canvas-confetti";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartTotalWaterSaved,
    cartTotalCo2Reduced
  } = useStore();

  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 3000;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const shippingCost = cartSubtotal >= freeShippingThreshold || cart.length === 0 ? 0 : 199;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");
    const code = promoCode.trim().toUpperCase();
    if (code === "ECOFIRST" || code === "CONSCIOUS") {
      setDiscountPercent(10);
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
      } catch {}
    } else {
      setPromoError("Invalid code. Try 'ECOFIRST' for 10% off!");
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4c8d6e', '#cca17d', '#397056', '#ffffff']
        });
      } catch {}
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-charcoal/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-earth-300 text-left animate-slide-up sm:animate-fade-in">
        
        {/* Header */}
        <div className="p-4 bg-white border-b border-earth-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-verde-800" />
            <h3 className="font-serif text-lg font-semibold text-verde-950">Your Eco Bag</h3>
            <span className="text-xs bg-verde-100 text-verde-800 font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((sum, i) => sum + i.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-charcoal/40 hover:text-charcoal hover:bg-earth-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Tracker */}
        <div className="bg-verde-50/70 p-3 border-b border-verde-200/60 text-xs">
          {remainingForFreeShipping > 0 ? (
            <p className="text-charcoal/80 mb-1.5">
              Add <strong className="text-verde-900">₹{remainingForFreeShipping.toLocaleString()}</strong> more for Free Carbon-Neutral Shipping!
            </p>
          ) : (
            <p className="text-verde-900 font-semibold mb-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-verde-600" />
              <span>Unlocked Free Carbon-Neutral Delivery!</span>
            </p>
          )}
          <div className="w-full bg-verde-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-verde-600 h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Order Completed Confirmation Overlay */}
        {orderComplete ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-verde-100 text-verde-700 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-serif text-2xl font-semibold text-verde-950">
              Order Confirmed & Impact Planted!
            </h4>
            <p className="text-xs text-charcoal/70 max-w-xs leading-relaxed">
              Thank you for dressing consciously. Your order has saved <strong>{cartTotalWaterSaved} Liters of water</strong>. Order confirmation & tracking details have been simulated for this demo.
            </p>
            <div className="p-4 bg-earth-50 rounded-2xl border border-earth-200 text-xs text-left w-full space-y-1">
              <div className="flex justify-between">
                <span className="text-charcoal/60">Order ID:</span>
                <span className="font-semibold text-verde-900">VRD-SS26-8941</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/60">Estimated Carbon Offset:</span>
                <span className="font-semibold text-verde-900">{cartTotalCo2Reduced} kg CO₂</span>
              </div>
            </div>
            <button
              onClick={() => {
                setOrderComplete(false);
                setIsCartOpen(false);
              }}
              className="w-full bg-verde-800 text-cream py-3 rounded-full text-xs font-semibold hover:bg-verde-900"
            >
              Continue Exploring
            </button>
          </div>
        ) : cart.length === 0 ? (
          /* Empty Bag */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-earth-100 flex items-center justify-center text-earth-600">
              <ShoppingBag className="w-6 h-6 opacity-60" />
            </div>
            <h4 className="font-serif text-lg font-semibold text-charcoal">Your bag is empty</h4>
            <p className="text-xs text-charcoal/60 max-w-xs">
              Explore our timeless pieces or let Aria AI curate an outfit matching your lifestyle.
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="mt-2 bg-verde-800 text-cream px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-verde-900"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          /* Cart Item List */
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                className="bg-white p-3 rounded-2xl border border-earth-200/90 flex gap-3 items-center shadow-xs"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-20 object-cover rounded-xl bg-sand flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h5 className="font-serif text-xs font-semibold text-charcoal truncate">
                      {item.product.name}
                    </h5>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                      className="text-charcoal/30 hover:text-earth-700 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-charcoal/50">
                    Size: {item.selectedSize} • Color: {item.selectedColor}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-bold text-verde-950">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 bg-earth-100 rounded-full px-2 py-0.5 border border-earth-200">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor, -1)}
                        className="text-charcoal/70 hover:text-charcoal"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-3 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor, 1)}
                        className="text-charcoal/70 hover:text-charcoal"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Environmental Impact Summary Widget */}
            <div className="p-3.5 bg-verde-900 text-cream rounded-2xl shadow-sm text-xs space-y-1.5">
              <span className="text-verde-300 font-semibold uppercase tracking-wider text-[10px] block">
                Total Eco Impact of this Bag:
              </span>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-verde-100">
                  <Droplets className="w-3.5 h-3.5 text-verde-300" />
                  <span>Freshwater Conserved:</span>
                </span>
                <strong className="text-white font-mono">{cartTotalWaterSaved.toLocaleString()} Liters</strong>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-verde-100">
                  <Leaf className="w-3.5 h-3.5 text-verde-300" />
                  <span>CO₂ Emissions Mitigated:</span>
                </span>
                <strong className="text-white font-mono">{cartTotalCo2Reduced} kg</strong>
              </div>
            </div>
          </div>
        )}

        {/* Footer Checkout Summary */}
        {!orderComplete && cart.length > 0 && (
          <div className="p-4 bg-white border-t border-earth-200 space-y-3">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Discount code (try ECOFIRST)"
                className="flex-1 bg-sand border border-earth-300 rounded-xl px-3 py-1.5 text-xs text-charcoal uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-verde-600"
              />
              <button
                type="submit"
                className="bg-earth-200 hover:bg-earth-300 text-charcoal font-semibold text-xs px-3 py-1.5 rounded-xl transition-colors"
              >
                Apply
              </button>
            </form>
            {promoError && <p className="text-[11px] text-earth-700">{promoError}</p>}
            {discountPercent > 0 && (
              <p className="text-[11px] text-verde-700 font-medium">✓ 10% Conscious discount applied!</p>
            )}

            {/* Calculations Breakdown */}
            <div className="text-xs space-y-1.5 text-charcoal/70 border-t border-earth-100 pt-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-charcoal">₹{cartSubtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-verde-700">
                  <span>Eco Discount</span>
                  <span>-₹{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Carbon-Neutral Shipping</span>
                <span className="font-medium text-charcoal">
                  {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-verde-950 border-t border-earth-200 pt-1.5">
                <span>Estimated Total</span>
                <span className="font-serif text-base">₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-verde-800 hover:bg-verde-900 disabled:opacity-50 text-cream py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              {isCheckingOut ? (
                <span>Planting Your Order...</span>
              ) : (
                <>
                  <span>Checkout Consciously</span>
                  <ArrowRight className="w-4 h-4 text-verde-300" />
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-charcoal/50">
              100% Biodegradable Packaging • Zero Microplastic Promise
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
