import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, BookOpen } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const videoFiles = [
  "/videos/apiary-4.mp4",
  "/videos/apiary-5.mp4",
  "/videos/apiary-1.mp4",
  "/videos/apiary-2.mp4",
];

const VideosSection = () => {
  const { lang } = useLanguage();
  const t = translations.videos;
  const [activeVideo, setActiveVideo] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const handleSelectVideo = (index: number) => {
    if (index === activeVideo) return;
    setActiveVideo(index);
    setPlaying(false);
  };

  useEffect(() => {
    setPlaying(false);
  }, [activeVideo]);

  const currentItem = t.items[activeVideo];

  return (
    <section id="videos" className="py-10 md:py-14 px-6 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs mb-2">
            {t.label[lang]}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
            {t.title[lang]}
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            {t.subtitle[lang]}
          </p>
        </div>

        <motion.div
          key={activeVideo}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* 3-column layout: menu | vertical video | learn more */}
          <div className="grid md:grid-cols-[200px,280px,1fr] gap-5 items-start">
            {/* Col 1: Video list */}
            <div className="order-2 md:order-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {lang === "es" ? "Vídeos" : lang === "bg" ? "Видеа" : "Videos"}
              </p>
              <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
                {t.items.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectVideo(i)}
                    className={`flex-shrink-0 text-left px-3 py-2.5 rounded-lg border transition-all group ${
                      activeVideo === i
                        ? "border-primary bg-primary/10 text-foreground shadow-sm"
                        : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${
                          activeVideo === i
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                        }`}
                      >
                        {i + 1}
                      </div>
                      <p
                        className={`text-sm font-medium truncate md:whitespace-normal ${
                          activeVideo === i ? "text-foreground" : ""
                        }`}
                      >
                        {item.title[lang]}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Col 2: Vertical video player (center) */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-lg w-full max-w-[280px]">
                <div
                  className="relative aspect-[9/16] cursor-pointer group"
                  onClick={handlePlay}
                >
                  <video
                    ref={videoRef}
                    key={videoFiles[activeVideo]}
                    preload="metadata"
                    className="w-full h-full object-cover"
                    onEnded={() => setPlaying(false)}
                    onPause={() => setPlaying(false)}
                    onPlay={() => setPlaying(true)}
                  >
                    <source
                      src={`${videoFiles[activeVideo]}#t=0.5`}
                      type="video/mp4"
                    />
                  </video>
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                      playing
                        ? "opacity-0 group-hover:opacity-100"
                        : "opacity-100"
                    } bg-black/10`}
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      {playing ? (
                        <Pause className="w-6 h-6 text-primary-foreground" />
                      ) : (
                        <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 3: Learn more / educational content */}
            <div className="order-3">
              {currentItem?.article && (
                <div className="p-5 rounded-xl border border-border bg-card/50 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {lang === "es"
                        ? "Aprende más"
                        : lang === "bg"
                        ? "Научи повече"
                        : "Learn more"}
                    </p>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {currentItem.title[lang]}
                  </h3>
                  <p className="text-muted-foreground text-xs mb-3">
                    {currentItem.desc[lang]}
                  </p>
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    {currentItem.article[lang]}
                  </p>
                </div>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideosSection;
