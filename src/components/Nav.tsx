import { motion } from "framer-motion";
import { CLUB_NAME, BATCH } from "../lib/data";
import Logo from "./Logo";

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur-sm"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo size={26} />
          <span className="text-[15px] font-semibold tracking-tight text-zinc-900">
            {CLUB_NAME}
          </span>
          <span className="ml-1 hidden border-l border-zinc-200 pl-3 text-[13px] text-zinc-400 sm:inline">
            {BATCH}
          </span>
        </a>
        <div className="flex items-center gap-6 md:gap-8">
          <span className="hidden items-center gap-2 text-[13px] text-zinc-500 sm:flex">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-navy" aria-hidden="true" />
            2026 Inductions Open
          </span>
          <a
            href="#apply"
            className="text-[14px] font-medium text-zinc-900 underline-offset-4 transition-colors hover:text-navy hover:underline"
          >
            Apply
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
