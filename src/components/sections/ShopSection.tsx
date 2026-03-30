import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, Mail, MapPin, Plus, Minus, Phone, MessageCircle, Play, ShoppingCart, ArrowUp } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import honeyJars from "@/assets/honey-jars.jpg";
import honeycombFrames from "@/assets/honeycomb-frames.jpg";
import CandleGrid from "./CandleGrid";

// Viber icon SVG
const ViberIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
    <path d="M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.541 6.769.453 9.975c-.088 3.207-.2 9.222 5.648 10.847h.004l-.003 2.478s-.04.999.621 1.203c.799.247 1.268-.513 2.032-1.333.42-.45.998-1.112 1.434-1.617 3.95.332 6.99-.427 7.335-.538.797-.256 5.307-.836 6.04-6.82.754-6.166-.361-10.063-2.386-11.822C19.078.893 14.878.025 11.4 0zm.504 1.682c3.078.022 6.648.733 8.282 2.162 1.711 1.484 2.68 4.963 2.015 10.416-.621 5.072-4.351 5.46-5.034 5.68-.287.093-2.932.753-6.327.56 0 0-2.508 3.025-3.29 3.82-.123.127-.27.176-.367.153-.136-.033-.174-.195-.172-.43l.024-4.149c-4.978-1.38-4.687-6.508-4.612-9.209.074-2.7.693-4.909 2.14-6.339C5.89 2.965 9.025 1.665 11.904 1.682z" />
    <path d="M12.03 4.022c-.21 0-.21.326 0 .334 1.615.072 3.037.624 4.115 1.688 1.078 1.065 1.607 2.444 1.68 4.047.007.212.338.206.33-.006-.078-1.717-.651-3.211-1.814-4.36-1.162-1.149-2.681-1.725-4.311-1.703zm.218 1.252c-.21-.003-.216.32-.006.332 1.23.1 2.154.577 2.903 1.378.75.8 1.082 1.784 1.118 2.948.003.21.336.208.333-.003-.039-1.275-.41-2.375-1.243-3.262-.833-.887-1.876-1.39-3.105-1.393zm.124 1.258c-.207-.01-.226.308-.02.332.77.093 1.34.384 1.808.888.47.505.677 1.105.698 1.87.006.21.34.206.334-.003-.024-.868-.276-1.57-.815-2.15-.538-.58-1.234-.917-2.005-.937zm-2.896.742c-.177-.005-.373.06-.548.265l-.632.72c-.284.325-.252.755-.032 1.126.01.015.016.03.027.045.345.557.77 1.206 1.371 1.89.767.872 1.758 1.79 3.053 2.59l.031.016c.55.322 1.18.593 1.618.78.016.008.034.012.05.02.417.18.776.18 1.055-.11l.656-.67c.314-.32.294-.752-.06-1.04l-1.582-1.285c-.314-.255-.695-.21-.963.058l-.586.599c-.113.116-.283.134-.42.066l-.015-.008c-.478-.234-1.054-.645-1.619-1.21-.564-.564-.978-1.142-1.216-1.62l-.01-.018c-.07-.137-.054-.31.062-.424l.596-.59c.265-.27.308-.653.055-.968L9.04 7.545c-.17-.2-.386-.268-.563-.272z" />
  </svg>
);

const addLabel: Record<string, string> = {
  bg: "Добави",
  en: "Add",
  es: "Añadir",
};

const sendOrderVia: Record<string, string> = {
  bg: "Изпрати поръчка чрез",
  en: "Send order via",
  es: "Enviar pedido por",
};

const modifyOrderLabel: Record<string, string> = {
  bg: "Промени поръчката ↑",
  en: "Modify order ↑",
  es: "Modificar pedido ↑",
};

const browseProductsLabel: Record<string, string> = {
  bg: "↑ Разгледай продукти",
  en: "↑ Browse products",
  es: "↑ Ver productos",
};

const addedLabel: Record<string, string> = {
  bg: "Добавено ✓",
  en: "Added ✓",
  es: "Añadido ✓",
};

export type Cart = Record<string, number>;

export interface ShopSectionProps {
  cart: Cart;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
}

const ShopSection = ({ cart, addToCart, removeFromCart }: ShopSectionProps) => {
  const { lang } = useLanguage();
  const tp = translations.products;
  const to = translations.orderForm;
  const tc = translations.contact;
  const [submitted, setSubmitted] = useState(false);
  const [delivery, setDelivery] = useState<"pickup" | "delivery">("pickup");
  const [sendVia, setSendVia] = useState<"whatsapp" | "viber">("whatsapp");
  const [flashId, setFlashId] = useState<string | null>(null);

  const handleAdd = useCallback((id: string) => {
    addToCart(id);
    setFlashId(id);
    setTimeout(() => setFlashId(null), 600);
  }, [addToCart]);

  const cartItems = useMemo(() => {
    const items: { id: string; name: string; qty: number; price: number; unitPrice: number }[] = [];
    for (const product of tp.items) {
      const qty = cart[product.id] || 0;
      if (qty > 0) items.push({ id: product.id, name: product.title[lang], qty, price: product.unitPrice * qty, unitPrice: product.unitPrice });
    }
    for (const candle of tp.candles) {
      const qty = cart[candle.id] || 0;
      if (qty > 0) items.push({ id: candle.id, name: candle.name[lang], qty, price: candle.unitPrice * qty, unitPrice: candle.unitPrice });
    }
    return items;
  }, [cart, lang]);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const hasItems = cartItems.length > 0;

  const buildOrderText = (name: string, phone: string, address: string, message: string) => {
    const deliveryType = delivery === "pickup" ? to.pickup[lang] : to.deliveryOption[lang];
    const productList = cartItems.map((item) => `• ${item.name} × ${item.qty} — ${item.price.toFixed(2)} €`).join("\n");
    return `${to.whatsappIntro[lang]}\n\n${productList}\n\n${to.total[lang]}: ${cartTotal.toFixed(2)} €\n\n${to.name[lang]}: ${name}\n${to.phone[lang]}: ${phone}\n${to.deliveryLabel[lang]}: ${deliveryType}${delivery === "delivery" && address ? `\n${to.address[lang]}: ${address}` : ""}${message ? `\n${to.message[lang]}: ${message}` : ""}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const phone = data.get("phone") as string;
    const address = data.get("address") as string;
    const message = data.get("message") as string;
    const text = buildOrderText(name, phone, address, message);
    const encoded = encodeURIComponent(text);

    const url = sendVia === "whatsapp"
      ? `https://wa.me/359878512315?text=${encoded}`
      : `viber://chat?number=%2B359878512315&text=${encoded}`;
    
    // Try window.open first, fall back to direct navigation if blocked
    const win = window.open(url, "_blank");
    if (!win) {
      window.location.href = url;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  // Products
  const honeyProduct = tp.items[0];
  const beeProduct = tp.items[2];
  const honeyQty = cart[honeyProduct.id] || 0;
  const beeQty = cart[beeProduct.id] || 0;

  const contactItems = [
    {
      icon: null,
      title: tc.phone[lang],
      content: (
        <div className="flex items-center gap-3">
          <a href="tel:+359878512315" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors" title="Call">
            <Phone className="w-4 h-4 text-foreground" />
          </a>
          <a href="https://wa.me/359878512315" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-[#25D366]/10 transition-colors" title="WhatsApp">
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
          </a>
          <a href="viber://chat?number=%2B359878512315" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-[#7360F2]/10 transition-colors" title="Viber">
            <span className="text-[#7360F2]"><ViberIcon /></span>
          </a>
          <span className="text-muted-foreground text-lg ml-1">+359 87 851 2315</span>
        </div>
      ),
    },
    {
      icon: Mail,
      title: tc.email[lang],
      content: <a href="mailto:dimitarnikolovterziev@yahoo.es" className="text-muted-foreground hover:text-primary transition-colors">dimitarnikolovterziev@yahoo.es</a>,
    },
    {
      icon: MapPin,
      title: tc.address[lang],
      content: <p className="text-muted-foreground text-lg whitespace-pre-line">{tc.addressValue[lang]}</p>,
    },
  ];

  // Add button with flash feedback
  const AddButton = ({ id, label, large }: { id: string; label: string; large?: boolean }) => {
    const isFlashing = flashId === id;
    const qty = cart[id] || 0;

    if (qty > 0) {
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={() => removeFromCart(id)}
            className={`${large ? "w-10 h-10" : "w-8 h-8"} rounded-full bg-muted flex items-center justify-center hover:bg-destructive/20 transition-colors`}
          >
            <Minus className={large ? "w-5 h-5" : "w-4 h-4"} />
          </button>
          <span className={`${large ? "text-xl w-8" : "text-base w-6"} font-semibold text-foreground text-center`}>{qty}</span>
          <button
            onClick={() => handleAdd(id)}
            className={`${large ? "w-10 h-10" : "w-8 h-8"} rounded-full flex items-center justify-center transition-all active:scale-110 ${
              isFlashing
                ? "bg-green-500 text-white"
                : "bg-primary text-primary-foreground hover:brightness-110"
            }`}
          >
            {isFlashing ? <Check className={large ? "w-5 h-5" : "w-4 h-4"} /> : <Plus className={large ? "w-5 h-5" : "w-4 h-4"} />}
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={() => handleAdd(id)}
        className={`inline-flex items-center gap-2 rounded-full font-semibold transition-all active:scale-110 ${
          isFlashing
            ? "bg-green-500 text-white"
            : "bg-primary text-primary-foreground hover:brightness-110"
        } ${large ? "px-6 py-3 text-base" : "px-4 py-2 text-sm"}`}
      >
        {isFlashing ? (
          <>
            <Check className="w-4 h-4" />
            {addedLabel[lang]}
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            {label}
          </>
        )}
      </button>
    );
  };

  return (
    <section id="products" className="py-12 md:py-16 px-6 bg-card scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Products header */}
        <div className="text-center mb-10">
          <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs mb-4">{tp.label[lang]}</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground">{tp.title[lang]}</h2>
        </div>

        {/* ★ HONEY HERO PRODUCT - Full width featured card */}
        <div className="group bg-background rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 overflow-hidden mb-6">
          <div className="grid md:grid-cols-2">
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
              <img
                src={honeyJars}
                alt={honeyProduct.title[lang]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {tp.label[lang]}
              </div>
              <h3 className="text-3xl md:text-4xl text-foreground mb-3">{honeyProduct.title[lang]}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{honeyProduct.desc[lang]}</p>

              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-3xl md:text-4xl font-bold text-primary">{honeyProduct.price[lang]}</span>
              </div>

              {"discount" in honeyProduct && honeyProduct.discount && (
                <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl px-4 py-2.5 mb-5 inline-flex items-center gap-2 w-fit">
                  <span className="text-green-600 dark:text-green-400 font-bold text-sm">✦</span>
                  <p className="text-green-700 dark:text-green-400 font-bold text-base">{(honeyProduct as any).discount[lang]}</p>
                </div>
              )}

              <div className="flex items-center gap-4 mb-4">
                <AddButton id={honeyProduct.id} label={addLabel[lang]} large />
              </div>

              <a
                href="#videos"
                className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline"
              >
                <Play className="w-4 h-4" />
                {tp.watchVideo[lang]}
              </a>
            </div>
          </div>
        </div>

        {/* Candles & Bee products combined section */}
        <CandleGrid
          cart={cart}
          onAdd={handleAdd}
          onRemove={removeFromCart}
          flashId={flashId}
          beeProduct={beeProduct}
          beeQty={beeQty}
          AddButton={AddButton}
        />

        {/* Shipping info banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5 text-center mb-12">
          <p className="text-foreground font-medium text-sm">{translations.cta.shipping[lang]}</p>
        </div>

        {/* Order form + Sticky sidebar */}
        <div id="order" className="scroll-mt-20">
          <div className="mb-8 text-center">
            <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs mb-4">{to.label[lang]}</p>
            <h3 className="text-3xl md:text-4xl text-foreground mb-2">{to.title[lang]}</h3>
            <p className="text-muted-foreground text-lg">{to.subtitle[lang]}</p>
          </div>

          <div className="grid lg:grid-cols-[1fr,340px] gap-8 items-start">
            {/* Form */}
            <form
              id="order-form"
              onSubmit={handleSubmit}
              className="bg-background rounded-3xl p-6 md:p-8 border border-border shadow-sm space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{to.name[lang]} *</label>
                  <input
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{to.phone[lang]} *</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  />
                </div>
              </div>

              {/* Delivery option */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">{to.deliveryLabel[lang]} *</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setDelivery("pickup")}
                    className={`flex-1 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      delivery === "pickup"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    📍 {to.pickup[lang]}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDelivery("delivery")}
                    className={`flex-1 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      delivery === "delivery"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    🚚 {to.deliveryOption[lang]}
                  </button>
                </div>
              </div>

              {/* Address field */}
              <AnimatePresence>
                {delivery === "delivery" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">{to.address[lang]} *</label>
                    <input
                      name="address"
                      required
                      placeholder={to.addressPlaceholder[lang]}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{to.message[lang]}</label>
                <textarea
                  name="message"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow resize-none"
                />
              </div>

              {/* Send via toggle */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">{sendOrderVia[lang]}</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSendVia("whatsapp")}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      sendVia === "whatsapp"
                        ? "border-[#25D366] bg-[#25D366]/10 text-[#25D366]"
                        : "border-border text-muted-foreground hover:border-[#25D366]/30"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setSendVia("viber")}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      sendVia === "viber"
                        ? "border-[#7360F2] bg-[#7360F2]/10 text-[#7360F2]"
                        : "border-border text-muted-foreground hover:border-[#7360F2]/30"
                    }`}
                  >
                    <ViberIcon />
                    Viber
                  </button>
                </div>
              </div>

              {/* Submit - visible on mobile, hidden on desktop (it's in the sidebar) */}
              <div className="lg:hidden">
                <button
                  type="submit"
                  disabled={!hasItems}
                  className="w-full inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      {to.success[lang]}
                    </>
                  ) : (
                    <>
                      {sendVia === "whatsapp" ? <MessageCircle className="w-5 h-5" /> : <ViberIcon />}
                      {to.submit[lang]}
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Sticky order summary sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-20 space-y-4">
                <div className="bg-background rounded-2xl border-2 border-primary/30 shadow-lg overflow-hidden">
                  <div className="bg-primary/5 px-5 py-4 border-b border-primary/10">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                      {to.cartSummary[lang]}
                    </h4>
                  </div>

                  <div className="p-5">
                    {hasItems ? (
                      <>
                        <div className="space-y-3 mb-4">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                                <p className="text-xs text-muted-foreground">{item.unitPrice.toFixed(2)} € × {item.qty}</p>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-destructive/20 transition-colors">
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-sm font-semibold w-5 text-center">{item.qty}</span>
                                <button onClick={() => handleAdd(item.id)} className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:brightness-110 transition-all">
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <span className="text-sm font-semibold text-foreground w-16 text-right">{item.price.toFixed(2)} €</span>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-border pt-3 flex justify-between items-center mb-4">
                          <span className="font-semibold text-foreground">{to.total[lang]}</span>
                          <span className="font-bold text-primary text-2xl">{cartTotal.toFixed(2)} €</span>
                        </div>

                        <a href="#products" className="text-primary text-xs font-medium hover:underline inline-flex items-center gap-1 mb-4">
                          <ArrowUp className="w-3 h-3" />
                          {modifyOrderLabel[lang]}
                        </a>

                        {/* Submit button in sidebar */}
                        <button
                          type="submit"
                          form="order-form"
                          onClick={(e) => {
                            // Find and submit the form
                            const form = document.querySelector('form') as HTMLFormElement;
                            if (form) {
                              form.requestSubmit();
                            }
                          }}
                          className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-full text-base font-semibold hover:brightness-110 active:scale-[0.98] transition-all"
                        >
                          {submitted ? (
                            <>
                              <Check className="w-5 h-5" />
                              {to.success[lang]}
                            </>
                          ) : (
                            <>
                              {sendVia === "whatsapp" ? <MessageCircle className="w-5 h-5" /> : <ViberIcon />}
                              {to.submit[lang]}
                            </>
                          )}
                        </button>
                      </>
                    ) : (
                      <div className="text-center py-6">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                          <ShoppingCart className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">{to.cartEmpty[lang]}</p>
                        <a
                          href="#products"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all"
                        >
                          <ArrowUp className="w-4 h-4" />
                          {browseProductsLabel[lang]}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick contact in sidebar */}
                <div className="bg-background rounded-2xl border border-border p-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">{tc.label[lang]}</p>
                  <div className="flex items-center gap-2">
                    <a href="tel:+359878512315" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors" title="Call">
                      <Phone className="w-3.5 h-3.5 text-foreground" />
                    </a>
                    <a href="https://wa.me/359878512315" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-[#25D366]/10 transition-colors" title="WhatsApp">
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    </a>
                    <a href="viber://chat?number=%2B359878512315" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-[#7360F2]/10 transition-colors" title="Viber">
                      <span className="text-[#7360F2]"><ViberIcon /></span>
                    </a>
                    <span className="text-muted-foreground text-sm ml-1">+359 87 851 2315</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile cart summary - shown above form on mobile */}
          <div className="lg:hidden mt-8">
            {hasItems && (
              <div className="bg-background rounded-2xl p-5 border-2 border-primary/30 shadow-md mb-6">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  {to.cartSummary[lang]}
                </h4>
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.name} × {item.qty}</span>
                      <span className="text-foreground font-medium">{item.price.toFixed(2)} €</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border mt-3 pt-3 flex justify-between">
                  <span className="font-semibold text-foreground">{to.total[lang]}</span>
                  <span className="font-bold text-primary text-xl">{cartTotal.toFixed(2)} €</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact section - Full width below order */}
        <div id="contact" className="mt-16 scroll-mt-16">
          <div className="mb-8">
            <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs mb-4">{tc.label[lang]}</p>
            <h3 className="text-3xl md:text-4xl text-foreground">{tc.title[lang]}</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {contactItems.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  {item.icon && (
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2958.5!2d24.7836!3d42.0657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd6e5c1d6e3a1%3A0x5c8b3e2e8a6b4c0d!2sKatunitsa%2C%20Bulgaria!5e0!3m2!1sbg!2sbg!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={tc.mapTitle[lang]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
