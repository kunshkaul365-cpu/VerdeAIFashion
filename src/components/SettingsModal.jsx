import React, { useState } from "react";
import { X, Key, Check, Cpu, Sparkles, Shield, AlertCircle } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { getSavedApiKey, saveApiKey } from "../services/aiService";

export default function SettingsModal() {
  const { isSettingsOpen, setIsSettingsOpen, showToast } = useStore();
  const [apiKey, setApiKey] = useState(() => getSavedApiKey());
  const [saved, setSaved] = useState(false);

  if (!isSettingsOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    saveApiKey(apiKey);
    setSaved(true);
    showToast(apiKey ? "OpenAI API Key saved successfully!" : "Using built-in Intelligent Fallback Engine");
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    setApiKey("");
    saveApiKey("");
    showToast("Cleared API key. Switched to Built-in Engine.");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl border border-earth-300 overflow-hidden text-left animate-slide-up p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-earth-200">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-verde-700" />
            <h3 className="font-serif text-lg font-semibold text-verde-950">AI Engine Configuration</h3>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-1.5 text-charcoal/40 hover:text-charcoal rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4">
          <p className="text-xs text-charcoal/70 leading-relaxed">
            VERDE Studio supports both a <strong>Live OpenAI GPT-4o-mini</strong> API and an <strong>Intelligent Local Neural Matcher</strong>. Even without an API key, the platform works 100% seamlessly offline!
          </p>

          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-charcoal/80 block mb-1">
                OpenAI API Key (Optional):
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-proj-..."
                  className="w-full bg-sand border border-earth-300 rounded-xl pl-9 pr-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-verde-600"
                />
              </div>
              <p className="text-[10px] text-charcoal/50 mt-1">
                Your key stays strictly local inside your browser's localStorage.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              {apiKey && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-earth-700 hover:underline"
                >
                  Clear Key
                </button>
              )}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-charcoal/70 hover:bg-earth-100 rounded-xl"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-verde-800 hover:bg-verde-900 text-cream px-5 py-2 rounded-xl text-xs font-semibold shadow transition-all"
                >
                  {saved ? <Check className="w-3.5 h-3.5 text-verde-300" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>{saved ? "Saved!" : "Save Engine"}</span>
                </button>
              </div>
            </div>
          </form>

          {/* Engine Status Banner */}
          <div className="p-3 bg-verde-50 rounded-2xl border border-verde-200 text-xs flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-verde-700 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-verde-950">
                Current Active Engine: {apiKey ? "Live OpenAI GPT-4o-mini" : "Smart Offline Neural Matcher"}
              </p>
              <p className="text-[11px] text-verde-900/80 mt-0.5">
                Evaluates breathability, drape synergy, thermal scores, and water conservation ratios.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
