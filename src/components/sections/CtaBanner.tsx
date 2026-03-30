import { Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const ViberIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
    <path d="M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.541 6.769.453 9.975c-.088 3.207-.2 9.222 5.648 10.847h.004l-.003 2.478s-.04.999.621 1.203c.799.247 1.268-.513 2.032-1.333.42-.45.998-1.112 1.434-1.617 3.95.332 6.99-.427 7.335-.538.797-.256 5.307-.836 6.04-6.82.754-6.166-.361-10.063-2.386-11.822C19.078.893 14.878.025 11.4 0zm.504 1.682c3.078.022 6.648.733 8.282 2.162 1.711 1.484 2.68 4.963 2.015 10.416-.621 5.072-4.351 5.46-5.034 5.68-.287.093-2.932.753-6.327.56 0 0-2.508 3.025-3.29 3.82-.123.127-.27.176-.367.153-.136-.033-.174-.195-.172-.43l.024-4.149c-4.978-1.38-4.687-6.508-4.612-9.209.074-2.7.693-4.909 2.14-6.339C5.89 2.965 9.025 1.665 11.904 1.682z" />
    <path d="M12.03 4.022c-.21 0-.21.326 0 .334 1.615.072 3.037.624 4.115 1.688 1.078 1.065 1.607 2.444 1.68 4.047.007.212.338.206.33-.006-.078-1.717-.651-3.211-1.814-4.36-1.162-1.149-2.681-1.725-4.311-1.703zm.218 1.252c-.21-.003-.216.32-.006.332 1.23.1 2.154.577 2.903 1.378.75.8 1.082 1.784 1.118 2.948.003.21.336.208.333-.003-.039-1.275-.41-2.375-1.243-3.262-.833-.887-1.876-1.39-3.105-1.393zm.124 1.258c-.207-.01-.226.308-.02.332.77.093 1.34.384 1.808.888.47.505.677 1.105.698 1.87.006.21.34.206.334-.003-.024-.868-.276-1.57-.815-2.15-.538-.58-1.234-.917-2.005-.937zm-2.896.742c-.177-.005-.373.06-.548.265l-.632.72c-.284.325-.252.755-.032 1.126.01.015.016.03.027.045.345.557.77 1.206 1.371 1.89.767.872 1.758 1.79 3.053 2.59l.031.016c.55.322 1.18.593 1.618.78.016.008.034.012.05.02.417.18.776.18 1.055-.11l.656-.67c.314-.32.294-.752-.06-1.04l-1.582-1.285c-.314-.255-.695-.21-.963.058l-.586.599c-.113.116-.283.134-.42.066l-.015-.008c-.478-.234-1.054-.645-1.619-1.21-.564-.564-.978-1.142-1.216-1.62l-.01-.018c-.07-.137-.054-.31.062-.424l.596-.59c.265-.27.308-.653.055-.968L9.04 7.545c-.17-.2-.386-.268-.563-.272z" />
  </svg>
);

const orderLabel: Record<string, string> = {
  bg: "Направи поръчка",
  en: "Place order",
  es: "Hacer pedido",
};

const trustBadge: Record<string, string> = {
  bg: "✓ Над 100 доволни клиента",
  en: "✓ Over 100 happy customers",
  es: "✓ Más de 100 clientes satisfechos",
};

const CtaBanner = () => {
  const { lang } = useLanguage();
  const t = translations.cta;

  return (
    <section className="py-14 px-6 bg-primary relative overflow-hidden scroll-mt-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(32_90%_58%/0.4),transparent_60%)]" />
      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl text-primary-foreground mb-4">{t.title[lang]}</h2>
        <p className="text-primary-foreground/70 text-lg mb-2 font-light">{t.subtitle[lang]}</p>
        <p className="text-primary-foreground/90 text-sm font-medium mb-3">{t.shipping[lang]}</p>
        <p className="text-primary-foreground/60 text-sm mb-8">{trustBadge[lang]}</p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://wa.me/359878512315"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-full font-semibold hover:scale-[1.03] active:scale-[0.98] transition-transform shadow-lg"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            WhatsApp
          </a>
          <a
            href="viber://chat?number=%2B359878512315"
            className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-full font-semibold hover:scale-[1.03] active:scale-[0.98] transition-transform shadow-lg"
          >
            <span className="text-[#7360F2]"><ViberIcon /></span>
            Viber
          </a>
          <a
            href="tel:+359878512315"
            className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-full font-semibold hover:scale-[1.03] active:scale-[0.98] transition-transform shadow-lg"
          >
            <Phone className="w-5 h-5" />
            {t.button[lang]}
          </a>
          <a
            href="#order"
            className="inline-flex items-center gap-2 bg-primary-foreground/20 text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary-foreground/30 transition-colors border border-primary-foreground/20"
          >
            {orderLabel[lang]}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
