import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, Heart, Truck, Users } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import apiarySelfie from "@/assets/apiary-selfie.jpg";
import hivesSummer from "@/assets/hives-summer.jpg";

const photos = [
  { src: apiarySelfie, alt: { bg: "Димитър и Джулия — пчелари", en: "Dimitar and Julia — beekeepers", es: "Dimitar y Julia — apicultores" } },
  { src: hivesSummer, alt: { bg: "Пчелинът сред зелените поля", en: "Apiary in green fields", es: "Apiario en campos verdes" } },
];

const aboutContent = {
  label: { bg: "За нас", en: "About us", es: "Sobre nosotros" },
  title: {
    bg: "Ние сме Димитър и Джулия",
    en: "We are Dimitar and Julia",
    es: "Somos Dimitar y Julia",
  },
  intro: {
    bg: "Млади пчелари от село Катуница. Заедно с двете ни деца се грижим за пчелните семейства и произвеждаме мед, който можеш да проследиш до нашия пчелин.",
    en: "Young beekeepers from Katunitsa village. Together with our two children, we care for our bee colonies and produce honey you can trace back to our apiary.",
    es: "Apicultores jóvenes del pueblo de Katunitsa. Junto con nuestros dos hijos, cuidamos nuestras colonias y producimos miel que puedes rastrear hasta nuestro apiario.",
  },
  stats: [
    {
      icon: Leaf,
      value: "100%",
      label: {
        bg: "Непреработен — без загряване, без филтриране. Запазени всички ензими и полен.",
        en: "Unprocessed — no heating, no filtering. All enzymes and pollen preserved.",
        es: "Sin procesar — sin calentar, sin filtrar. Todas las enzimas y polen conservados.",
      },
      title: {
        bg: "Натурален",
        en: "Natural",
        es: "Natural",
      },
    },
    {
      icon: Users,
      value: "0",
      label: {
        bg: "Директно от нас до теб. Без магазини, без дистрибутори, без надценка.",
        en: "Directly from us to you. No shops, no distributors, no markup.",
        es: "Directamente de nosotros a ti. Sin tiendas, sin distribuidores, sin recargo.",
      },
      title: {
        bg: "Посредници",
        en: "Middlemen",
        es: "Intermediarios",
      },
    },
    {
      icon: Truck,
      value: "48ч",
      label: {
        bg: "Поръчай по WhatsApp, получи с Еконт. Бързо и лесно.",
        en: "Order via WhatsApp, receive via Ekont. Fast and easy.",
        es: "Pide por WhatsApp, recibe con Ekont. Rápido y fácil.",
      },
      title: {
        bg: "Доставка",
        en: "Delivery",
        es: "Entrega",
      },
    },
    {
      icon: Heart,
      value: "∞",
      label: {
        bg: "Екологично чист район, далеч от индустрия. Пчелинът е нашият дом.",
        en: "Ecologically clean area, far from industry. The apiary is our home.",
        es: "Zona ecológicamente limpia, lejos de la industria. El apiario es nuestro hogar.",
      },
      title: {
        bg: "Любов",
        en: "Love",
        es: "Amor",
      },
    },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

const AboutSection = () => {
  const { lang } = useLanguage();
  const t = aboutContent;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    const interval = setInterval(() => api.scrollNext(), 4000);
    return () => { api.off("select", onSelect); clearInterval(interval); };
  }, [api]);

  return (
    <section id="about" className="py-12 md:py-16 px-6 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Top: Intro + Carousel */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p variants={fadeUp} custom={0} className="text-primary font-semibold uppercase tracking-[0.2em] text-xs mb-4">
              {t.label[lang]}
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-5 leading-[1.1]">
              {t.title[lang]}
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg leading-relaxed">
              {t.intro[lang]}
            </motion.p>
          </motion.div>

          <div className="relative">
            <Carousel setApi={setApi} opts={{ loop: true }} className="rounded-3xl overflow-hidden shadow-xl">
              <CarouselContent>
                {photos.map((photo, i) => (
                  <CarouselItem key={i}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={photo.src} alt={photo.alt[lang]} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>


            <div className="flex justify-center gap-1.5 mt-4">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    current === i ? "bg-primary w-5" : "bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: 4 differentiator cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-card rounded-2xl border border-border p-5 text-center hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                {stat.icon && <stat.icon className="w-5 h-5 text-primary" />}
              </div>
              <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-sm font-semibold text-foreground mb-1">{stat.title[lang]}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{stat.label[lang]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
