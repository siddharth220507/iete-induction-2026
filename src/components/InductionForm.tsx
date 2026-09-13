import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from '../lib/supabase';
import { CLUB_NAME, BRANCHES, DOMAINS, WHATSAPP_GROUP_URL } from "../lib/data";
import { fadeUp, inViewProps, staggerParent } from "../lib/motion";

interface InductionFormProps {
  selectedDomain: string | null;
  onConsumeSelectedDomain: () => void;
}

interface FormValues {
  fullName: string;
  branch: string;
  percentage12: string;
  cmlrank: string;
  whatsapp: string;
  email: string;
  domain: string;
  hobbies:string;
  strength:string;
  aim:string;
  achievements: string;

}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  fullName: "",
  branch: "",
  percentage12: "",
  cmlrank: "",
  whatsapp: "",
  email: "",
  domain: "",
  hobbies: "",
  strength: "",
  aim: "",
  achievements: "",
  
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.fullName.trim()) errors.fullName = "Required.";
  if (!values.branch) errors.branch = "Select your branch.";
  const percentage = Number(values.percentage12);
  if(!values.percentage12.trim()) errors.percentage12 = "Required.";
  else if (Number.isNaN(percentage) || percentage <0 || percentage > 100)
    errors.percentage12 = "Enter a percentage between 0 and 100.";
  const cmlrank = Number(values.cmlrank);
  if(!values.cmlrank.trim()) errors.cmlrank ="Required.";
  else if (!Number.isInteger(cmlrank)|| cmlrank <= 0) errors.cmlrank = "Enter a valid CML rank.";
  const whatsapp = values.whatsapp.replace(/\s+/g, " ");
  if (!/^\d{10}$/.test(whatsapp))  errors.whatsapp = "Enter a 10-digit number.";
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = "Enter a valid email.";
  if (!values.domain) errors.domain = "Select a domain.";
  if (!values.hobbies.trim()) errors.hobbies = "Required";
  if (!values.strength.trim()) errors.strength = "Required.";
  if (!values.aim.trim()) errors.aim = "Required.";
  if (!values.achievements.trim()) errors.achievements = "Required.";
  return errors;
}

const labelClass = "mb-2 block text-[13px] font-medium text-zinc-700";
const errorClass = "mt-1.5 text-[13px] text-red-600";

export default function InductionForm({ selectedDomain, onConsumeSelectedDomain }: InductionFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  // When a domain row is clicked above, preselect it here once.
  useEffect(() => {
    if (selectedDomain !== null) {
      setValues((v) => ({ ...v, domain: selectedDomain }));
      setErrors((e) => ({ ...e, domain: undefined }));
      onConsumeSelectedDomain();
    }
  }, [selectedDomain, onConsumeSelectedDomain]);

  const set = (field: keyof FormValues) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setValues((v) => ({ ...v, [field]: event.target.value }));
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setSubmittedName(values.fullName.trim());
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setSubmittedName(null);
  };

  return (
    <section id="apply" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div {...inViewProps} variants={staggerParent}>
          <motion.p
            variants={fadeUp}
            className="mb-4 text-[13px] font-medium tracking-[0.18em] text-zinc-500 uppercase"
          >
            Application
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mb-3 font-serif-display text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl"
          >
            Apply for induction.
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-14 max-w-xl text-[15px] leading-relaxed text-zinc-500">
            Honest answers over impressive ones. Every field matters, none take long.
          </motion.p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submittedName === null ? (
            <motion.form
              key="form"
              noValidate
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
              className="grid gap-x-10 gap-y-8 md:grid-cols-2"
            >
              <div>
                <label htmlFor="fullName" className={labelClass}>Full Name</label>
                <input id="fullName" type="text" autoComplete="name" placeholder="Your full name"
                  value={values.fullName} onChange={set("fullName")} className="w-full" />
                {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
              </div>

          

              <div>
                <label htmlFor="branch" className={labelClass}>Branch</label>
                <select id="branch" value={values.branch} onChange={set("branch")} className="w-full">
                  <option value="" disabled>Select your branch</option>
                  {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                {errors.branch && <p className={errorClass}>{errors.branch}</p>}
              </div>

              <div>
                <label htmlFor="percentage12" className={labelClass}>Class 12th Percentage</label>
                <input id="percentage12" type="number" min="0" max="100" step="0.01" placeholder = "e.g.87.5" 
                value={values.percentage12} onChange ={ set("percentage12")} className = "w-full"/> 
                {errors.percentage12 && (<p className="(errorClass}">{errors.percentage12}</p>)}
              </div>

              <div>
                <label htmlFor="cmlrank" className={labelClass}> CML Rank</label>
                <input id="cmlrank" type="number" min="1"  step="1" placeholder = "Enter your CML rank" 
                value={values.cmlrank} onChange ={ set("cmlrank")} className = "w-full"/> 
                {errors.cmlrank && (<p className="(errorClass}">{errors.cmlrank}</p>)}
              </div>

              <div>
                <label htmlFor="whatsapp" className={labelClass}>WhatsApp Number</label>
                <input id="whatsapp" type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile number"
                  value={values.whatsapp} onChange={set("whatsapp")} className="w-full" />
                {errors.whatsapp && <p className={errorClass}>{errors.whatsapp}</p>}
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <input id="email" type="email" autoComplete="email" placeholder="you@college.edu"
                  value={values.email} onChange={set("email")} className="w-full" />
                {errors.email && <p className={errorClass}>{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="domain" className={labelClass}>Domain of Interest</label>
                <select id="domain" value={values.domain} onChange={set("domain")} className="w-full">
                  <option value="" disabled>Select a domain</option>
                  {DOMAINS.map((d) => <option key={d.no} value={d.name}>{d.name}</option>)}
                </select>
                {errors.domain && <p className={errorClass}>{errors.domain}</p>}
              </div>

              <div>
                <label htmlFor="hobbies" className={labelClass}>Hobbies</label>
                <input id="hobbies" type="text" placeholder="e.g. Music,Cricket,Reading"
                  value={values.hobbies} onChange={set("hobbies")} className="w-full " />
                {errors.hobbies && <p className={errorClass}>{errors.hobbies}</p>}
              </div>

              <div>
                <label htmlFor="strength" className={labelClass}>Strength</label>
                <input id="strength" type="text" placeholder="e.g. Teamwork,Leadership"
                  value={values.strength} onChange={set("strength")} className="w-full " />
                {errors.strength && <p className={errorClass}>{errors.strength}</p>}
              </div>

              <div>
                <label htmlFor="aim" className={labelClass}>Aim</label>
                <input id="aim" type="text" placeholder="What is your career aim?"
                  value={values.aim} onChange={set("aim")} className="w-full " />
                {errors.aim && <p className={errorClass}>{errors.aim}</p>}
              </div>

              <div>
                <label htmlFor="achievements" className={labelClass}>Achievements</label>
                <textarea id="achievemets" rows={5}  placeholder="Mention your academic and extracurricular achievements such as academic awards , scholarships , competitions,sports,cultural activities, etc"
                  value={values.achievements} onChange={set("achievements")} className="w-full " />
                {errors.achievements && <p className={errorClass}>{errors.achievements}</p>}
              </div>

              

              <div className="md:col-span-2">
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                  className="w-full rounded-md bg-zinc-900 py-3.5 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-black md:w-auto md:px-14"
                >
                  Submit Application
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[13px] font-medium tracking-[0.18em] text-zinc-500 uppercase">
                Application Received
              </p>
              <h3 className="mt-4 font-serif-display text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
                Thank you, {submittedName}.
              </h3>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-500">
                Your application is in. Watch your email for the interactive task, and
                join the induction group below so you don't miss any updates.
              </p>
              <a
                href={WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex items-center gap-2 text-[15px] font-medium transition-colors"
                style={{ color: "#1E3A8A" }}
              >
                <span className="border-b pb-0.5" style={{ borderColor: "#1E3A8A" }}>
                  Join the induction WhatsApp group
                </span>
                <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <div className="mt-10 border-t border-zinc-200 pt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="cursor-pointer text-[13px] text-zinc-500 transition-colors hover:text-zinc-900"
                >
                  Submit another application →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

