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

        <div className="flex items-centre gap-5">
          <a href="https://www.instagram.com/ietebits?stkn=dng0M3EwZG93MGFl" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="/instagram_logo.jpeg" alt="Instagram" className="h-6 w-6 transition-transform hover:scale-110"/>
          </a>
          <a href="https://x.com/IETE_BITS" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <img src="/twitter_logo.jpeg" alt="Twitter" className="h-6 w-6 transition-transform hover:scale-110"/>
          </a>
          <a href="https://www.linkedin.com/company/iete-students-chapter-bit-sindri123/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <img src="/linkedin_logo.jpeg" alt="LinkedIn" className="h-6 w-6 transition-transform hover:scale-110"/>
          </a>
          
        </div>
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
