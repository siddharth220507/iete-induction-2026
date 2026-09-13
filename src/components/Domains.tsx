import { motion } from "framer-motion";
import { DOMAINS, CATEGORY_ORDER, type Domain } from "../lib/data";
import { fadeUp, staggerParent, inViewProps } from "../lib/motion";

interface DomainsProps {
  onSelectDomain?: (domain: string) => void;
}

const categoryStyle: Record<Domain["category"], string> = {
  Build: "border-zinc-300 text-zinc-600",
  Create: "border-zinc-300 text-zinc-600",
  Compete: "border-zinc-300 text-zinc-600",
  Lead: "border-zinc-300 text-zinc-600",
};

const categoryLegend: Record<Domain["category"], string> = {
  Build: "projects & tech",
  Create: "design & media",
  Compete: "contests & problem solving",
  Lead: "events & operations",
};

export default function Domains({ onSelectDomain }: DomainsProps) {
  return (
    <section id="domains" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div {...inViewProps} variants={staggerParent}>
          <motion.p
            variants={fadeUp}
            className="mb-4 text-[13px] font-medium tracking-[0.18em] text-zinc-500 uppercase"
          >
            Domains
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="max-w-2xl font-serif-display text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl"
          >
            Seven domains, multiple ways to contribute.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-500">
            Every domain maps to real work — from events you organize to projects you build and ship.
             Each tag shows how you’ll contribute and where you’ll spend your time. Select one to start your application.
          </motion.p>
        </motion.div>

        <motion.ul {...inViewProps} variants={staggerParent} className="mt-14 border-t border-zinc-200">
          {DOMAINS.map((domain) => (
            <motion.li
              key={domain.no}
              variants={fadeUp}
              className="group border-b border-zinc-200 transition-colors duration-300 hover:bg-zinc-50"
            >
              <button
                type="button"
                onClick={() => onSelectDomain?.(domain.name)}
                className="flex w-full cursor-pointer items-baseline gap-4 px-2 py-6 text-left transition-transform duration-300 ease-out group-hover:translate-x-2 md:gap-10 md:py-7"
              >
                <span className="text-[13px] font-medium text-zinc-400 tabular-nums">{domain.no}</span>
                <span className="flex-1 text-lg font-medium tracking-tight text-zinc-900 transition-colors duration-300 group-hover:text-navy md:text-xl">
                  {domain.name}
                </span>
                <span
                  className={`hidden rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide uppercase ${categoryStyle[domain.category]} sm:inline-block`}
                >
                  {domain.category}
                </span>
                <span className="hidden max-w-xs text-right text-sm leading-relaxed text-zinc-500 lg:block">
                  {domain.description}
                </span>
                <span
                  aria-hidden="true"
                  className="text-zinc-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-zinc-900"
                >
                  →
                </span>
              </button>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-zinc-500">
          <span className="font-medium text-zinc-700">Legend:</span>
          {CATEGORY_ORDER.map((cat) => (
            <span key={cat} className="flex items-center gap-2">
              <span className="rounded-full border border-zinc-300 px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase">
                {cat}
              </span>
              <span>{categoryLegend[cat]}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
