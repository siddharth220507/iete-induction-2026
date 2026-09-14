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
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            2026 Inductions Open
          </span>
          <a
            href="#apply"
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-zinc-950 text-white text-xs font-semibold tracking-tight shadow-sm hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Apply Now →
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
