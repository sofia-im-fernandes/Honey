import { motion } from "framer-motion";
import logo from "@/assets/logo.jpeg";
import { useLanguage } from "@/i18n/LanguageContext";
import { ShoppingCart } from "lucide-react";

const heroContent = {
  title1: { bg: "Пчелна ферма", en: "Bee Farm", es: "Granja apícola" },
  title2: { bg: "Джулия", en: "Julia", es: "Julia" },
  tagline: {
    bg: "Натурален мед директно от пчеларя. Без посредници, без преработка.",
    en: "Natural honey straight from the beekeeper. No middlemen, no processing.",
    es: "Miel natural directo del apicultor. Sin intermediarios, sin procesar.",
  },
  bullets: [
    {
      icon: "🍯",
      text: {
        bg: "Непреработен мед — без загряване, без филтриране",
        en: "Unprocessed honey — no heating, no filtering",
        es: "Miel sin procesar — sin calentar, sin filtrar",
      },
    },
    {
      icon: "🌿",
      text: {
        bg: "Млади пчелари — знаеш кой произвежда меда ти",
        en: "Young beekeepers — you know who makes your honey",
        es: "Apicultores jóvenes — sabes quién produce tu miel",
      },
    },
    {
      icon: "📦",
      text: {
        bg: "Поръчай онлайн — доставка с Еконт до 48ч",
        en: "Order online — delivery via Ekont within 48h",
        es: "Pide online — envío con Ekont en 48h",
      },
    },
  ],
  cta: { bg: "Поръчай сега", en: "Order now", es: "Pide ahora" },
  heroAlt: { bg: "Лого на ферма Джулия", en: "Julia Farm logo", es: "Logo granja Julia" },
};

const HeroSection = () => {
  const { lang } = useLanguage();
  const t = heroContent;

  return (
    <section
      id="home"
      className="relative min-h-[auto] pt-24 pb-12 md:pt-28 md:pb-16 overflow-hidden bg-gradient-to-br from-amber-100 via-orange-50 to-amber-50 dark:from-amber-950/40 dark:via-background dark:to-background scroll-mt-16"
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-300/25 rounded-full blur-3xl" />
      </div>

      {/* Honeycomb pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34zm0-2l26-15V17L28 2 2 17v32z' fill='%23000' fill-opacity='.5'/%3E%3C/svg%3E")`,
        backgroundSize: '56px 100px',
      }} />

      {/* Stamp watermark on the right — embedded in background */}
      <div className="absolute right-6 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 pointer-events-none">
        <img
          src={logo}
          alt=""
          className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-2 leading-[1.05]">
            {t.title1[lang]}{" "}
            <span className="italic text-primary">{t.title2[lang]}</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed mb-6 max-w-xl">
            {t.tagline[lang]}
          </p>

          {/* Differentiator bullets */}
          <div className="flex flex-col gap-2.5 mb-6">
            {t.bullets.map((bullet, i) => (
              <div key={i} className="flex items-center gap-3 text-sm md:text-base text-foreground/80">
                <span className="text-lg shrink-0">{bullet.icon}</span>
                <span>
                  {bullet.text[lang].includes(" — ") ? (
                    <>
                      <span className="font-semibold text-foreground">{bullet.text[lang].split(" — ")[0]}</span>
                      {" — "}
                      {bullet.text[lang].split(" — ").slice(1).join(" — ")}
                    </>
                  ) : (
                    bullet.text[lang]
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#products"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-base font-semibold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg"
          >
            <ShoppingCart className="w-5 h-5" />
            {t.cta[lang]}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
