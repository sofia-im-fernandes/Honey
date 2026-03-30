import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { MessageCircle } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const ViberIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
    <path d="M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.541 6.769.453 9.975c-.088 3.207-.2 9.222 5.648 10.847h.004l-.003 2.478s-.04.999.621 1.203c.799.247 1.268-.513 2.032-1.333.42-.45.998-1.112 1.434-1.617 3.95.332 6.99-.427 7.335-.538.797-.256 5.307-.836 6.04-6.82.754-6.166-.361-10.063-2.386-11.822C19.078.893 14.878.025 11.4 0z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const quickLinksLabel: Record<string, string> = {
  bg: "Навигация",
  en: "Navigation",
  es: "Navegación",
};

const sectionIds = ["home", "about", "products", "contact"] as const;

const discoverLinkLabel: Record<string, string> = {
  bg: "Открий",
  en: "Discover",
  es: "Descubre",
};

const Footer = () => {
  const { lang } = useLanguage();
  const t = translations;

  return (
    <footer className="py-12 px-6 bg-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-8">
          {/* Col 1: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src={logo} alt={t.nav.brand[lang]} className="w-10 h-10 rounded-full object-cover" />
              <span className="font-['Playfair_Display'] text-lg text-primary-foreground font-semibold">
                {t.nav.brand[lang]}
              </span>
            </div>
            <p className="text-primary-foreground/50 text-sm leading-relaxed">
              {t.contact.addressValue[lang]}
            </p>
            <p className="text-primary-foreground/50 text-sm mt-1">📞 +359 87 851 2315</p>
            <p className="text-primary-foreground/50 text-sm">✉️ dimitarnikolovterziev@yahoo.es</p>
            <p className="text-primary-foreground/50 text-sm">🕐 08:00 – 20:00</p>
          </div>

          {/* Col 2: Quick links */}
          <div>
            <h4 className="text-primary-foreground font-semibold text-sm uppercase tracking-wider mb-4">
              {quickLinksLabel[lang]}
            </h4>
            <div className="flex flex-col gap-2">
              {sectionIds.map((id) => (
                <a
                  key={id}
                  href={`/#${id}`}
                  className="text-primary-foreground/50 hover:text-primary transition-colors text-sm"
                >
                  {t.nav[id as keyof typeof t.nav]?.[lang] ?? id}
                </a>
              ))}
              <a
                href="/descubre"
                className="text-primary-foreground/50 hover:text-primary transition-colors text-sm"
              >
                {discoverLinkLabel[lang]}
              </a>
            </div>
          </div>

          {/* Col 3: Social */}
          <div>
            <h4 className="text-primary-foreground font-semibold text-sm uppercase tracking-wider mb-4">
              Social
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.facebook.com/share/1AxT3bs8NV/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-foreground/50 hover:text-primary transition-colors text-sm"
              >
                <FacebookIcon />
                Facebook
              </a>
              <a
                href="https://wa.me/359878512315"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-foreground/50 hover:text-primary transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href="viber://chat?number=%2B359878512315"
                className="inline-flex items-center gap-2 text-primary-foreground/50 hover:text-primary transition-colors text-sm"
              >
                <span className="text-current"><ViberIcon /></span>
                Viber
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center">
          <p className="text-primary-foreground/40 text-sm">
            © {new Date().getFullYear()} {t.footer.copyright[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
