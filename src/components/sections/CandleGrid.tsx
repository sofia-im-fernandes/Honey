import { motion } from "framer-motion";
import { Plus, Minus, Check, ShoppingCart } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

import velaGnomo from "@/assets/vela-gnomo.jpg";
import velaAbeto from "@/assets/vela-abeto.jpg";
import velaMuneco from "@/assets/vela-muneco.jpg";
import velaBurbujas from "@/assets/vela-burbujas.jpg";
import velaPanal from "@/assets/vela-panal.jpg";
import velaHuevo from "@/assets/vela-huevo.jpg";
import honeycombFrames from "@/assets/honeycomb-frames.jpg";

const candleImages: Record<string, string> = {
  "vela-gnomo": velaGnomo,
  "vela-abeto": velaAbeto,
  "vela-muneco": velaMuneco,
  "vela-burbujas": velaBurbujas,
  "vela-panal": velaPanal,
  "vela-huevo": velaHuevo,
};

const addLabel: Record<string, string> = {
  bg: "Добави",
  en: "Add",
  es: "Añadir",
};

const addedLabel: Record<string, string> = {
  bg: "Добавено ✓",
  en: "Added ✓",
  es: "Añadido ✓",
};

interface CandleGridProps {
  cart: Record<string, number>;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  flashId?: string | null;
  beeProduct?: { id: string; title: Record<string, string>; desc: Record<string, string>; price: Record<string, string> };
  beeQty?: number;
  AddButton?: React.ComponentType<{ id: string; label: string; large?: boolean }>;
}

const CandleGrid = ({ cart, onAdd, onRemove, flashId, beeProduct, beeQty = 0, AddButton }: CandleGridProps) => {
  const { lang } = useLanguage();
  const tp = translations.products;

  return (
    <div className="mb-8">
      <div className="border-t border-border pt-8 mb-6">
        <h3 className="text-2xl md:text-3xl text-foreground mb-2 text-center">{tp.candlesTitle[lang]}</h3>
        <p className="text-muted-foreground text-center">{tp.candlesSubtitle[lang]}</p>
      </div>

      {/* Bee products featured card */}
      {beeProduct && (
        <div className="group bg-background rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 overflow-hidden mb-6">
          <div className="grid md:grid-cols-[1fr,2fr]">
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
              <img
                src={honeycombFrames}
                alt={beeProduct.title[lang]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <h4 className="text-2xl md:text-3xl text-foreground mb-2">{beeProduct.title[lang]}</h4>
              <p className="text-primary font-bold text-xl mb-2">{beeProduct.price[lang]}</p>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm">{beeProduct.desc[lang]}</p>
              {AddButton && <div className="w-fit"><AddButton id={beeProduct.id} label={addLabel[lang]} /></div>}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {tp.candles.map((candle, i) => {
          const qty = cart[candle.id] || 0;
          const isFlashing = flashId === candle.id;
          return (
            <motion.div
              key={candle.image}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 relative"
            >
              {qty > 0 && (
                <span className="absolute top-2 right-2 z-10 w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {qty}
                </span>
              )}
              <div className="aspect-square overflow-hidden">
                <img
                  src={candleImages[candle.image]}
                  alt={candle.name[lang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  loading="lazy"
                />
              </div>
              <div className="p-3 md:p-4">
                <h4 className="text-foreground font-semibold text-sm md:text-base">{candle.name[lang]}</h4>
                <p className="text-muted-foreground text-xs md:text-sm">{candle.dimensions}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-primary font-bold text-base md:text-lg">{candle.price}</p>
                  <div className="flex items-center gap-1.5">
                    {qty > 0 ? (
                      <>
                        <button
                          onClick={() => onRemove(candle.id)}
                          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-destructive/20 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onAdd(candle.id)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-110 ${
                            isFlashing
                              ? "bg-green-500 text-white"
                              : "bg-primary text-primary-foreground hover:brightness-110"
                          }`}
                        >
                          {isFlashing ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => onAdd(candle.id)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-110 ${
                          isFlashing
                            ? "bg-green-500 text-white"
                            : "bg-primary text-primary-foreground hover:brightness-110"
                        }`}
                      >
                        {isFlashing ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        {addLabel[lang]}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CandleGrid;
