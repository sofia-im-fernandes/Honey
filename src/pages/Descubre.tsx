import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GallerySection from "@/components/sections/GallerySection";
import VideosSection from "@/components/sections/VideosSection";
import { useLanguage } from "@/i18n/LanguageContext";

const pageTitle: Record<string, string> = {
  bg: "Открий нашата история",
  en: "Discover our story",
  es: "Descubre nuestra historia",
};

const pageSubtitle: Record<string, string> = {
  bg: "Снимки и видеа от нашия пчелин, продукти и семейство",
  en: "Photos and videos from our apiary, products and family",
  es: "Fotos y vídeos de nuestro apiario, productos y familia",
};

const Descubre = () => {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page header */}
      <div className="pt-24 pb-8 px-6 bg-gradient-to-b from-amber-50/50 to-background dark:from-amber-950/20 dark:to-background">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-3">{pageTitle[lang]}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">{pageSubtitle[lang]}</p>
        </div>
      </div>

      <VideosSection />
      <GallerySection />
      <Footer />
    </div>
  );
};

export default Descubre;
