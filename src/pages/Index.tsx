import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, ArrowDown } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ShopSection from "@/components/sections/ShopSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import DiscoverTeaser from "@/components/sections/DiscoverTeaser";
import CtaBanner from "@/components/sections/CtaBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import type { Cart } from "@/components/sections/ShopSection";

const itemsLabel: Record<string, string> = {
  bg: "продукта",
  en: "items",
  es: "artículos",
};

const viewOrderLabel: Record<string, string> = {
  bg: "Виж поръчката",
  en: "View order",
  es: "Ver pedido",
};

const Index = () => {
  const [cart, setCart] = useState<Cart>({});
  const [barMinimized, setBarMinimized] = useState(false);
  const { lang } = useLanguage();

  const addToCart = useCallback((id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setBarMinimized(false); // Show bar when adding
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id]--;
      else delete next[id];
      return next;
    });
  }, []);

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  // Calculate total & items for floating bar
  const tp = translations.products;
  const cartItems: { name: string; qty: number; price: number }[] = [];
  for (const product of tp.items) {
    const qty = cart[product.id] || 0;
    if (qty > 0) cartItems.push({ name: product.title[lang], qty, price: product.unitPrice * qty });
  }
  for (const candle of tp.candles) {
    const qty = cart[candle.id] || 0;
    if (qty > 0) cartItems.push({ name: candle.name[lang], qty, price: candle.unitPrice * qty });
  }
  const cartTotal = cartItems.reduce((s, i) => s + i.price, 0);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar cartCount={cartCount} />
      <HeroSection />
      <AboutSection />
      <ShopSection cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
      <TestimonialsSection />
      <DiscoverTeaser />
      <CtaBanner />
      <Footer />

      {/* Global sticky floating cart bar — expanded version */}
      <AnimatePresence>
        {cartCount > 0 && !barMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[380px] z-40 bg-background border-2 border-primary/30 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary/5 px-4 py-3 flex items-center justify-between border-b border-primary/10">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground text-sm">{cartCount} {itemsLabel[lang]}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary text-lg">{cartTotal.toFixed(2)} €</span>
                <button
                  onClick={() => setBarMinimized(true)}
                  className="w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Items list - max 3 shown */}
            <div className="px-4 py-2 space-y-1.5 max-h-[120px] overflow-y-auto">
              {cartItems.slice(0, 4).map((item) => (
                <div key={item.name} className="flex justify-between text-xs">
                  <span className="text-muted-foreground truncate mr-2">{item.name} × {item.qty}</span>
                  <span className="text-foreground font-medium shrink-0">{item.price.toFixed(2)} €</span>
                </div>
              ))}
              {cartItems.length > 4 && (
                <p className="text-xs text-muted-foreground">+{cartItems.length - 4} more...</p>
              )}
            </div>

            {/* CTA */}
            <div className="px-4 py-3 border-t border-border">
              <a
                href="#order"
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:brightness-110 transition-all"
              >
                <ArrowDown className="w-4 h-4" />
                {viewOrderLabel[lang]}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized floating cart pill */}
      <AnimatePresence>
        {cartCount > 0 && barMinimized && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setBarMinimized(false)}
            className="fixed bottom-4 right-4 z-40 bg-primary text-primary-foreground rounded-full px-4 py-3 shadow-xl flex items-center gap-2 hover:brightness-110 transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="font-bold">{cartCount}</span>
            <span className="font-semibold">{cartTotal.toFixed(2)} €</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
