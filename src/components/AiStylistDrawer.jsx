import React, { useState, useRef, useEffect } from "react";
import { X, Sparkles, Send, ShoppingBag, Eye, Bot, User, Droplets, Leaf } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { searchWithAiStylist } from "../services/aiService";

export default function AiStylistDrawer() {
  const { isAiDrawerOpen, setIsAiDrawerOpen, addToCart, setActiveProductModal } = useStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: "intro-1",
      sender: "ai",
      text: "Hello! I'm Aria, your personal AI Eco-Stylist. What occasion, climate, or aesthetic are you looking to dress for today? You can also ask for specific natural fabrics like Belgian linen or peace silk.",
      products: []
    }
  ]);

  const quickPrompts = [
    "Linen & cotton outfit for brunch under ₹4,000",
    "Breathable Goa vacation wardrobe",
    "Conscious workwear for office meetings",
    "Garments with maximum water savings"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isAiDrawerOpen) {
      scrollToBottom();
    }
  }, [messages, isAiDrawerOpen]);

  if (!isAiDrawerOpen) return null;

  const handleSend = async (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMessageId = Date.now().toString();
    const newMessages = [
      ...messages,
      { id: userMessageId, sender: "user", text: textToSend, products: [] }
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await searchWithAiStylist(textToSend);
      setMessages([
        ...newMessages,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: response.reply,
          products: response.products || []
        }
      ]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "I experienced a hiccup connecting to our styling servers, but check out these timeless pieces crafted from organic French flax!",
          products: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-charcoal/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-earth-300 animate-slide-up sm:animate-fade-in text-left">
        
        {/* Header */}
        <div className="p-4 bg-white border-b border-earth-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-verde-800 text-cream flex items-center justify-center font-serif text-lg font-bold">
                A
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-verde-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif text-sm font-semibold text-verde-950">Aria</h3>
                <span className="bg-verde-100 text-verde-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-verde-200">
                  AI Stylist
                </span>
              </div>
              <p className="text-[11px] text-charcoal/60">Sustainable Wardrobe Intelligence</p>
            </div>
          </div>
          <button
            onClick={() => setIsAiDrawerOpen(false)}
            className="p-1.5 text-charcoal/40 hover:text-charcoal hover:bg-earth-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-verde-900 text-cream rounded-br-none"
                    : "bg-white text-charcoal border border-earth-200 shadow-xs rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>

              {/* Matched Product Cards within AI Response */}
              {msg.products && msg.products.length > 0 && (
                <div className="w-full mt-3 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/50">
                    Recommended Pieces:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {msg.products.map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-white p-2.5 rounded-xl border border-earth-200/90 flex gap-3 items-center shadow-xs hover:border-verde-500 transition-colors"
                      >
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-14 h-16 object-cover rounded-lg bg-sand flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-serif text-xs font-semibold text-charcoal truncate">
                            {prod.name}
                          </h5>
                          <p className="text-[10px] text-charcoal/50 truncate">{prod.subtitle}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-bold text-verde-950">
                              ₹{prod.price.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-verde-700 bg-verde-50 px-1 rounded">
                              -{prod.ecoMetrics.waterSavedLiters}L H₂O
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => setActiveProductModal(prod)}
                            className="p-1.5 text-charcoal/60 hover:text-charcoal hover:bg-earth-100 rounded-lg text-[10px] border border-earth-200"
                            title="Quick view"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => addToCart(prod)}
                            className="p-1.5 bg-verde-800 hover:bg-verde-900 text-cream rounded-lg text-[10px]"
                            title="Add to bag"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-verde-200" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-charcoal/60 bg-white border border-earth-200 px-3.5 py-2.5 rounded-2xl w-fit rounded-bl-none shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-verde-600 animate-spin" />
              <span>Aria is scanning fiber blends & styling notes...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Helper */}
        <div className="px-4 py-2 bg-white/70 border-t border-earth-200 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-[11px] bg-earth-100 hover:bg-earth-200 text-charcoal/80 px-2.5 py-1 rounded-full transition-colors border border-earth-200"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-earth-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Aria (e.g. Goa beach outfit under ₹4000)..."
              className="flex-1 bg-sand border border-earth-300 rounded-full px-4 py-2.5 text-xs sm:text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-verde-600 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 bg-verde-800 hover:bg-verde-900 disabled:opacity-40 text-cream rounded-full transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
