import { motion } from "framer-motion";
import { fadeUp, staggerParent, inViewProps } from "../lib/motion";

export default function Domains() {
  return (
    <section id="domains" className="scroll-mt-24 border-t border-zinc-200 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div {...inViewProps} variants={staggerParent} className="max-w-2xl">
          <motion.p
            variants={fadeUp}
            className="mb-4 text-[13px] font-medium tracking-[0.18em] text-zinc-500 uppercase"
          >
            DOMAINS
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif-display text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl"
          >
            Seven domains, multiple ways to contribute
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-[15px] leading-relaxed text-zinc-500"
          >
            Every domain maps to real work — from events you organize to projects you
            build and ship. Each tag shows how you'll contribute and where you'll spend your
            time.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}