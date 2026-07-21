import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal.jsx";

const FAQS = [
  {
    q: "Will the chatbot give patients medical advice?",
    a: "No. It handles intake, scheduling, and FAQs, and is configured to hand anything clinical to your staff — it never diagnoses or prescribes.",
  },
  {
    q: "How long does setup take?",
    a: "Most practices are live within two to three weeks, from your first call with our AI specialists to a working bot on your site and phone line.",
  },
  {
    q: "Does it work with our existing scheduling system?",
    a: "Yes — we integrate with most common calendar and booking tools. If yours is unusual, we'll say so plainly during the demo, not after you've signed anything.",
  },
  {
    q: "What happens if the bot doesn't understand something?",
    a: "It's built to recognize its own limits. Anything outside its script is handed to a person on your team, with the full conversation attached.",
  },
  {
    q: "Is patient data handled securely?",
    a: "Every build goes through a review of data handling and access before it goes live. We're glad to walk through our specific practices on a call.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="container-px py-20">
      <Reveal>
        <p className="eyebrow mb-3 text-center">FAQ</p>
        <h2 className="font-display text-3xl md:text-4xl text-center mb-12 text-balance">
          Questions clinics ask before saying yes
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="max-w-2xl mx-auto border-t border-line">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-line">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg text-balance group-hover:text-teal-600 transition-colors duration-200">
                    {f.q}
                  </span>
                  <Plus
                    size={18}
                    className={`flex-shrink-0 text-teal-500 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-ink/60 leading-relaxed pb-6 pr-8">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
