import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import honeyJars from "@/assets/honey-jars.jpg";
import honeycombFrames from "@/assets/honeycomb-frames.jpg";
import beekeeperSelfie from "@/assets/beekeeper-selfie.jpg";
import hivesWinter from "@/assets/hives-winter.jpg";
import honeyJarsMany from "@/assets/honey-jars-many.jpg";
import heroHives from "@/assets/hives-summer.jpg";
import apiaryPortrait from "@/assets/apiary-portrait.jpg";
import velaGnomo from "@/assets/vela-gnomo.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const categoryLabels: Record<string, Record<string, string>> = {
  apiary: { bg: "Нашият пчелин", en: "Our apiary", es: "Nuestro apiario" },
  products: { bg: "Нашите продукти", en: "Our products", es: "Nuestros productos" },
  team: { bg: "Нашият екип", en: "Our team", es: "Nuestro equipo" },
};

const imageSources = [
  // Apiary
  { src: heroHives, span: "md:col-span-2", category: "apiary", captionIdx: 5 },
  { src: hivesWinter, span: "", category: "apiary", captionIdx: 3 },
  // Products
  { src: honeyJars, span: "md:col-span-2 md:row-span-2", category: "products", captionIdx: 0 },
  { src: honeycombFrames, span: "", category: "products", captionIdx: 1 },
  { src: honeyJarsMany, span: "", category: "products", captionIdx: 4 },
  { src: velaGnomo, span: "", category: "products", captionIdx: 7 },
  // Team
  { src: apiaryPortrait, span: "md:col-span-2", category: "team", captionIdx: 6 },
  { src: beekeeperSelfie, span: "", category: "team", captionIdx: 2 },
];

const GallerySection = () => {
  const { lang } = useLanguage();
  const t = translations.gallery;
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const navigateImage = (direction: number) => {
    if (selectedImage === null) return;
    const next = (selectedImage + direction + imageSources.length) % imageSources.length;
    setSelectedImage(next);
  };

  // Group by category
  const categories = ["apiary", "products", "team"] as const;

  return (
    <section id="gallery" className="py-12 md:py-16 px-6 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs mb-4">{t.label[lang]}</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground">{t.title[lang]}</h2>
        </div>

        {categories.map((cat) => {
          const catImages = imageSources.filter((img) => img.category === cat);
          return (
            <div key={cat} className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">{categoryLabels[cat][lang]}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
                {catImages.map((img) => {
                  const globalIdx = imageSources.indexOf(img);
                  return (
                    <div
                      key={globalIdx}
                      className={`overflow-hidden rounded-2xl cursor-pointer group relative ${img.span}`}
                      onClick={() => setSelectedImage(globalIdx)}
                    >
                      <img
                        src={img.src}
                        alt={t.alts[img.captionIdx]?.[lang] ?? ""}
                        className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-90 transition-all duration-700"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs">{t.alts[img.captionIdx]?.[lang] ?? ""}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigateImage(-1); }}
              className="absolute left-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={imageSources[selectedImage].src}
              alt={t.alts[imageSources[selectedImage].captionIdx]?.[lang] ?? ""}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <p className="text-white/80 text-sm mt-3">
              {t.alts[imageSources[selectedImage].captionIdx]?.[lang] ?? ""}
            </p>

            <button
              onClick={(e) => { e.stopPropagation(); navigateImage(1); }}
              className="absolute right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="absolute bottom-4 text-white/60 text-sm">
              {selectedImage + 1} / {imageSources.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
