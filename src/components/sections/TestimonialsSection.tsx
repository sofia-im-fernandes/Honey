import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink, Send } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#1877F2]" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const avatarColors = ["bg-amber-600", "bg-emerald-600", "bg-blue-600", "bg-rose-600", "bg-violet-600"];

const disclaimerText: Record<string, string> = {
  bg: "* Вашият отзив ще се показва до презареждане на страницата.",
  en: "* Your review will appear until you reload the page.",
  es: "* Tu opinión aparecerá hasta que recargues la página.",
};

interface UserReview {
  name: string;
  text: string;
  rating: number;
}

const TestimonialsSection = () => {
  const { lang } = useLanguage();
  const t = translations.testimonials;
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newText, setNewText] = useState("");
  const [newRating, setNewRating] = useState(5);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;
    setUserReviews((prev) => [...prev, { name: newName, text: newText, rating: newRating }]);
    setNewName("");
    setNewText("");
    setNewRating(5);
    setFormOpen(false);
  };

  return (
    <section id="reviews" className="py-16 md:py-20 px-6 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs mb-4">{t.label[lang]}</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground">{t.title[lang]}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {t.items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card rounded-3xl p-8 border border-border hover:border-primary/20 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-4 h-4 ${j < item.rating ? "fill-primary text-primary" : "text-border"}`} />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6 text-lg italic">
                "{item.text[lang]}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white font-semibold text-sm`}>
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <a
                      href="https://www.facebook.com/share/1AxT3bs8NV/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground text-sm flex items-center gap-1.5 hover:text-[#1877F2] transition-colors"
                    >
                      <FacebookIcon />
                      {t.verifiedFb[lang]}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* User-submitted reviews */}
          {userReviews.map((review, i) => (
            <motion.div
              key={`user-${i}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-3xl p-8 border border-primary/20 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-4 h-4 ${j < review.rating ? "fill-primary text-primary" : "text-border"}`} />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6 text-lg italic">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${avatarColors[(t.items.length + i) % avatarColors.length]} flex items-center justify-center text-white font-semibold text-sm`}>
                  {review.name.charAt(0)}
                </div>
                <p className="font-semibold text-foreground">{review.name}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Actions: FB link + leave review */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <a
            href="https://www.facebook.com/share/1AxT3bs8NV/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card text-foreground font-medium hover:border-primary/40 transition-colors"
          >
            <FacebookIcon />
            {t.facebookLink[lang]}
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>
          <button
            onClick={() => setFormOpen(!formOpen)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:brightness-110 transition-all"
          >
            <Star className="w-4 h-4" />
            {t.leaveReview[lang]}
          </button>
        </div>

        {/* Review form */}
        {formOpen && (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmitReview}
            className="max-w-lg mx-auto mt-8 bg-card rounded-2xl p-6 border border-border space-y-4"
          >
            <p className="text-muted-foreground text-xs">{disclaimerText[lang]}</p>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">{t.reviewName[lang]}</label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">{t.reviewText[lang]}</label>
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground mr-2">Rating:</span>
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setNewRating(r)}
                  className="p-0.5"
                >
                  <Star className={`w-5 h-5 ${r <= newRating ? "fill-primary text-primary" : "text-border"}`} />
                </button>
              ))}
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium hover:brightness-110 transition-all"
            >
              <Send className="w-4 h-4" />
              {t.reviewSubmit[lang]}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
