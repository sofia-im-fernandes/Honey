import { ArrowRight, Play, Camera } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import beekeeperSelfie from "@/assets/beekeeper-selfie.jpg";
import hivesSummer from "@/assets/hives-summer.jpg";

const teaserLabel: Record<string, string> = {
  bg: "От пчелина",
  en: "From the apiary",
  es: "Desde el apiario",
};

const teaserTitle: Record<string, string> = {
  bg: "Влез в нашия свят",
  en: "Step into our world",
  es: "Entra en nuestro mundo",
};

const teaserDesc: Record<string, string> = {
  bg: "Видеа за ползите на меда, рецепти, и снимки от ежедневието на нашия пчелин и семейство.",
  en: "Videos about the benefits of honey, recipes, and photos from daily life at our apiary and family.",
  es: "Vídeos sobre los beneficios de la miel, recetas, y fotos del día a día en nuestro apiario y familia.",
};

const videosLabel: Record<string, string> = {
  bg: "Видеа и съвети",
  en: "Videos & tips",
  es: "Vídeos y consejos",
};

const photosLabel: Record<string, string> = {
  bg: "Фотогалерия",
  en: "Photo gallery",
  es: "Galería de fotos",
};

const ctaLabel: Record<string, string> = {
  bg: "Разгледай всичко",
  en: "Explore everything",
  es: "Explora todo",
};

const DiscoverTeaser = () => {
  const { lang } = useLanguage();

  return (
    <section className="py-14 md:py-20 px-6 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs mb-2">
            {teaserLabel[lang]}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            {teaserTitle[lang]}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {teaserDesc[lang]}
          </p>
        </div>

        {/* Two cards linking to /descubre */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {/* Videos card */}
          <a
            href="/descubre#videos"
            className="group relative rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all shadow-sm hover:shadow-lg"
          >
            <div className="aspect-[16/10] relative">
              <img
                src={hivesSummer}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-semibold text-lg">
                  {videosLabel[lang]}
                </p>
                <p className="text-white/70 text-sm mt-1">
                  4 {lang === "es" ? "vídeos" : lang === "bg" ? "видеа" : "videos"}
                </p>
              </div>
            </div>
          </a>

          {/* Gallery card */}
          <a
            href="/descubre#gallery"
            className="group relative rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all shadow-sm hover:shadow-lg"
          >
            <div className="aspect-[16/10] relative">
              <img
                src={beekeeperSelfie}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Camera className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-semibold text-lg">
                  {photosLabel[lang]}
                </p>
                <p className="text-white/70 text-sm mt-1">
                  {lang === "es" ? "Galería completa" : lang === "bg" ? "Пълна галерия" : "Full gallery"}
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* CTA button */}
        <div className="text-center">
          <a
            href="/descubre"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:brightness-110 transition-all shadow-md hover:shadow-lg group"
          >
            {ctaLabel[lang]}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DiscoverTeaser;
