import { motion } from "framer-motion";
import { CLUB_NAME, CONTACT_EMAIL } from "../lib/data";
import { fadeUp, inViewProps } from "../lib/motion";

export default function Footer() {
  return (
    <motion.footer
      {...inViewProps}
      variants={fadeUp}
      className="border-t border-zinc-200 bg-white"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-[13px] text-zinc-500 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p>© 2026 {CLUB_NAME}. All rights reserved.</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="w-fit transition-colors hover:text-zinc-900"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </motion.footer>
  );
}
