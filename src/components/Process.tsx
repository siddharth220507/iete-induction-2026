import { motion } from "framer-motion";
import { STEPS } from "../lib/data";
import { fadeUp, staggerParent, inViewProps } from "../lib/motion";

export default function Process() {
  return (
    <section
      id="process"
      className="border-y border-zinc-200 bg-zinc-50/60 py-24 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div {...inViewProps} variants={staggerParent}>
          <motion.p
            variants={fadeUp}
            className="mb-4 text-[13px] font-medium tracking-[0.18em] text-zinc-500 uppercase"
          >
            Induction Process
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mb-14 font-serif-display text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl"
          >
            Three steps. No shortcuts, no gatekeeping.
          </motion.h2>
        </motion.div>

        <motion.ol
          {...inViewProps}
          variants={staggerParent}
          className="grid gap-y-10 md:grid-cols-3 md:gap-x-0"
        >
          {STEPS.map((step, i) => (
            <motion.li key={step.no} variants={fadeUp} className="relative">
              <div className="flex flex-col gap-2">
                <span className="text-[13px] font-medium text-zinc-400 tabular-nums">
                  {step.no}.
                </span>

                <h3 className="text-lg font-medium tracking-tight text-zinc-900">
                  {step.title}
                </h3>

                <p className="max-w-sm text-[15px] leading-relaxed text-zinc-500">
                  {step.description}
                </p>
              </div>

              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="mt-4 block h-px w-8 bg-zinc-300 md:hidden"
                />
              )}
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}