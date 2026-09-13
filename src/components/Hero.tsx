import { motion } from "framer-motion";
import { FULL_CLUB_NAME, DOMAINS } from "../lib/data";
import { fadeUp, staggerParent } from "../lib/motion";

/** Large faint circuit-trace motif — pure monochrome line work, no gradients. */
function CircuitTrace() {
  const traces = [
    "M 62 0 V 34 Q 62 46 74 46 H 152 Q 164 46 164 58 V 118",
    "M 96 0 V 22 Q 96 34 108 34 H 236 Q 248 34 248 46 V 150",
    "M 200 0 V 12 Q 200 24 212 24 H 320 Q 332 24 332 36 V 96",
    "M 40 200 V 160 Q 40 148 52 148 H 128 Q 140 148 140 136 V 112",
    "M 260 190 V 128 Q 260 116 272 116 H 330",
  ];
  const nodes: Array<[number, number]> = [
    [62, 118], [164, 118], [248, 150], [332, 96], [140, 112], [128, 148], [330, 116], [40, 200],
  ];
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-16 mx-auto h-full w-full max-w-6xl opacity-[0.55]"
      viewBox="0 0 380 220"
      fill="none"
      preserveAspectRatio="xMidYMin slice"
    >
      {traces.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="#D4D4D8"
          strokeWidth="0.7"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.35 + i * 0.22, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <motion.circle
          key={`n-${i}`}
          cx={cx}
          cy={cy}
          r="1.6"
          fill="#A1A1AA"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.1 + i * 0.1, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}

const STATS = [
  { value: String(DOMAINS.length), label: "Domains" },
  { value: "3", label: "Rounds" },
  { value: "120+", label: "Members" },
  { value: "0", label: "Fees" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 pt-40 pb-16 md:pt-48 md:pb-20">
      <CircuitTrace />
      <motion.div
        variants={staggerParent}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-6xl px-6 md:px-8"
      >
        <motion.p
          variants={fadeUp}
          className="mb-6 text-[13px] font-medium tracking-[0.18em] text-zinc-500 uppercase"
        >
          Inductions — Batch 2026
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="max-w-4xl font-serif-display text-4xl leading-[1.08] font-semibold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl"
        >
          {FULL_CLUB_NAME}
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-500">
          A student forum for engineers who build — electronics, software, and everything
          in between. Join a community that learns in public, ships real projects, and grows together.
        </motion.p>
        <motion.a
          variants={fadeUp}
          href="#apply"
          className="group mt-10 inline-flex items-center gap-2 text-[15px] font-medium text-zinc-900 transition-colors hover:text-navy"
        >
          <span className="border-b border-zinc-900 pb-0.5 transition-colors group-hover:border-navy">
            Start your application
          </span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </motion.a>

        <motion.div
          variants={fadeUp}
          className="mt-16 grid grid-cols-2 gap-y-8 border-t border-zinc-200 pt-8 sm:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="pr-6">
              <p className="font-serif-display text-3xl font-semibold text-zinc-900 tabular-nums">
                {stat.value}
              </p>
              <p className="mt-1 text-[13px] text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
