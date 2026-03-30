import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X, Globe, ShoppingCart, ArrowLeft, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, type Lang } from "@/i18n/translations";

const sectionIds = ["home", "about", "products", "reviews", "contact"] as const;

const discoverLabel: Record<string, string> = {
  bg: "📸 Видеа и снимки",
  en: "📸 Videos & Photos",
  es: "📸 Vídeos y fotos",
};

const backLabel: Record<string, string> = {
  bg: "Начало",
  en: "Home",
  es: "Inicio",
};

const langLabels: Record<Lang, string> = { bg: "БГ", en: "EN", es: "ES" };

interface NavbarProps {
  cartCount?: number;
}

const Navbar = ({ cartCount = 0 }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const t = translations.nav;
  const location = useLocation();
  const isDescubre = location.pathname === "/descubre";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isDescubre) {
      setHeroVisible(false);
      return;
    }
    const hero = document.getElementById("home");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isDescubre]);

  // On /descubre, section links point back to main page
  const linkPrefix = isDescubre ? "/" : "";

  const navLinks = sectionIds.map((id) => ({
    href: `${linkPrefix}#${id}`,
    label: t[id as keyof typeof t]?.[lang] ?? id,
  }));

  const showBg = !heroVisible || isDescubre;

  const linkClass = (active = false) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      active
        ? "text-primary"
        : showBg
        ? "text-foreground/70"
        : "text-foreground/60 hover:text-foreground"
    }`;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        !heroVisible || isDescubre
          ? "bg-gradient-to-br from-amber-100 via-orange-50 to-amber-50 dark:from-amber-950/40 dark:via-background dark:to-background shadow-sm border-b border-border/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Brand / Back to home */}
        <a href="/" className="flex items-center gap-2 min-w-[180px]">
          {isDescubre && (
            <ArrowLeft className="w-4 h-4 text-primary shrink-0" />
          )}
          <span
            className={`font-['Playfair_Display'] text-xl leading-tight tracking-tight transition-opacity duration-300 ${
              !isDescubre && heroVisible
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }`}
          >
            <span className="text-foreground">{t.brandPart1[lang]} </span>
            <span className="italic text-primary">{t.brandPart2[lang]}</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={linkClass()}>
              {link.label}
            </a>
          ))}
          <a href="/descubre" className={`${linkClass(isDescubre)} inline-flex items-center gap-1`}>
            {discoverLabel[lang]}
            <ExternalLink className="w-3 h-3 opacity-50" />
          </a>

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                showBg
                  ? "text-foreground/70 hover:text-primary"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <Globe className="w-4 h-4" />
              {langLabels[lang]}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 top-full mt-2 bg-background rounded-xl shadow-lg border border-border overflow-hidden min-w-[80px]"
                >
                  {(["bg", "en", "es"] as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLang(l);
                        setLangOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-sm text-left hover:bg-muted transition-colors ${
                        lang === l
                          ? "text-primary font-semibold"
                          : "text-foreground/70"
                      }`}
                    >
                      {langLabels[l]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href={`${linkPrefix}${
              cartCount > 0 ? "#order" : "#products"
            }`}
            className="relative inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:brightness-110 transition-all"
          >
            {t.orderNow[lang]}
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-background text-foreground text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-primary">
                {cartCount}
              </span>
            )}
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {cartCount > 0 && (
            <a
              href={`${linkPrefix}${
                cartCount > 0 ? "#order" : "#products"
              }`}
              className="relative p-2"
            >
              <ShoppingCart className="w-5 h-5 text-foreground" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </a>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-foreground"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {isDescubre && (
                <a
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {backLabel[lang]}
                </a>
              )}
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground/70 font-medium hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/descubre"
                onClick={() => setMobileOpen(false)}
                className={`inline-flex items-center gap-1 font-medium transition-colors ${
                  isDescubre
                    ? "text-primary font-semibold"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                {discoverLabel[lang]}
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
              <div className="flex gap-2 py-2">
                {(["bg", "en", "es"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                      lang === l
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground/60 hover:border-primary"
                    }`}
                  >
                    {langLabels[l]}
                  </button>
                ))}
              </div>
              <a
                href={`${linkPrefix}${
                  cartCount > 0 ? "#order" : "#products"
                }`}
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full font-semibold"
              >
                {t.orderNow[lang]}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
