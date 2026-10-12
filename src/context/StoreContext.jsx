import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("verde_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("verde_wishlist");
      return saved ? JSON.parse(saved) : ["verde-01"];
    } catch {
      return ["verde-01"];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem("verde_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("verde_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(prev => prev === message ? null : prev);
    }, 3200);
  };

  const addToCart = (product, size = "M", color = null) => {
    const chosenColor = color || (product.colors && product.colors[0]?.name) || "Natural";
    const chosenSize = size || (product.sizes && product.sizes[0]) || "Standard";

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === chosenSize && item.selectedColor === chosenColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prev, { product, selectedSize: chosenSize, selectedColor: chosenColor, quantity: 1 }];
      }
    });

    showToast(`Added ${product.name} to your eco bag! 🌿`);
  };

  const addBundleToCart = (products) => {
    setCart(prev => {
      let updated = [...prev];
      for (const prod of products) {
        const size = prod.sizes ? prod.sizes[0] : "M";
        const color = prod.colors ? prod.colors[0].name : "Natural";
        const existingIndex = updated.findIndex(
          i => i.product.id === prod.id && i.selectedSize === size && i.selectedColor === color
        );
        if (existingIndex > -1) {
          updated[existingIndex].quantity += 1;
        } else {
          updated.push({ product: prod, selectedSize: size, selectedColor: color, quantity: 1 });
        }
      }
      return updated;
    });

    // Trigger eco-confetti celebration
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#4c8d6e', '#71aa8d', '#cca17d', '#f4ede4']
      });
    } catch {}

    showToast(`Added full AI Curated Capsule (${products.length} items) to your bag! ✨`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, selectedSize, selectedColor) => {
    setCart(prev => prev.filter(
      item => !(item.product.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
    ));
  };

  const updateCartQuantity = (productId, selectedSize, selectedColor, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast("Removed from your eco wishlist");
        return prev.filter(id => id !== productId);
      } else {
        showToast("Saved to your eco wishlist 💚");
        return [...prev, productId];
      }
    });
  };

  // Aggregated calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartTotalWaterSaved = cart.reduce((sum, item) => sum + (item.product.ecoMetrics?.waterSavedLiters || 0) * item.quantity, 0);
  const cartTotalCo2Reduced = Number(
    cart.reduce((sum, item) => sum + (item.product.ecoMetrics?.co2ReducedKg || 0) * item.quantity, 0).toFixed(1)
  );
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        totalCartCount,
        cartSubtotal,
        cartTotalWaterSaved,
        cartTotalCo2Reduced,
        isCartOpen,
        setIsCartOpen,
        isQuizOpen,
        setIsQuizOpen,
        isAiDrawerOpen,
        setIsAiDrawerOpen,
        activeProductModal,
        setActiveProductModal,
        isSettingsOpen,
        setIsSettingsOpen,
        addToCart,
        addBundleToCart,
        removeFromCart,
        updateCartQuantity,
        toggleWishlist,
        showToast
      }}
    >
      {children}
      {/* Global Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-charcoal text-cream px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-verde-700/30 text-sm font-medium animate-slide-up">
          <span className="w-2 h-2 rounded-full bg-verde-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
}
