import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQS } from "../lib/data";
import { fadeUp, staggerParent, inViewProps } from "../lib/motion";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 border-t border-zinc-200 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
          <motion.div {...inViewProps} variants={staggerParent}>
            <motion.p
              variants={fadeUp}
              className="mb-4 text-[13px] font-medium tracking-[0.18em] text-zinc-500 uppercase"
            >
              FAQ
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif-display text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl"
            >
              Before you ask.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 max-w-xs text-[15px] leading-relaxed text-zinc-500">
              The questions almost everyone brings to induction season, answered plainly.
            </motion.p>
          </motion.div>

          <motion.ul {...inViewProps} variants={staggerParent} className="border-t border-zinc-200">
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.li key={faq.question} variants={fadeUp} className="border-b border-zinc-200">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`text-[16px] font-medium tracking-tight transition-colors duration-300 ${
                        isOpen ? "text-navy" : "text-zinc-900"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative shrink-0 text-lg leading-none text-zinc-400 transition-colors duration-300"
                    >
                      <span
                        className={`inline-block transition-transform duration-300 ${isOpen ? "rotate-90 opacity-0" : ""}`}
                      >
                        +
                      </span>
                      {isOpen && (
                        <span className="absolute inset-0 flex items-center justify-center text-zinc-900">
                          −
                        </span>
                      )}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-zinc-500">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
