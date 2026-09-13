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
  rollNo: string;
  branch: string;
  whatsapp: string;
  email: string;
  domain: string;
  interest: string;
  whyIete: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  fullName: "",
  rollNo: "",
  branch: "",
  whatsapp: "",
  email: "",
  domain: "",
  interest: "",
  whyIete: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.fullName.trim()) errors.fullName = "Required.";
  if (!values.rollNo.trim()) errors.rollNo = "Required.";
  if (!values.branch) errors.branch = "Select your branch.";
  if (!/^\d{10}$/.test(values.whatsapp.replace(/\s+/g, "")))
    errors.whatsapp = "Enter a 10-digit number.";
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = "Enter a valid email.";
  if (!values.domain) errors.domain = "Select a domain.";
  if (!values.interest.trim()) errors.interest = "A line or two is enough.";
  if (!values.whyIete.trim()) errors.whyIete = "A line or two is enough.";
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
                <label htmlFor="rollNo" className={labelClass}>Roll No</label>
                <input id="rollNo" type="text" placeholder="e.g. 22BEC1234"
                  value={values.rollNo} onChange={set("rollNo")} className="w-full" />
                {errors.rollNo && <p className={errorClass}>{errors.rollNo}</p>}
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

              <div className="md:col-span-2">
                <label htmlFor="interest" className={labelClass}>
                  Briefly describe your interest or prior work
                </label>
                <textarea id="interest" rows={4} placeholder="Projects, clubs, courses, self-taught experiments — anything counts."
                  value={values.interest} onChange={set("interest")} className="w-full resize-y" />
                {errors.interest && <p className={errorClass}>{errors.interest}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="whyIete" className={labelClass}>Why IETE?</label>
                <textarea id="whyIete" rows={4} placeholder="What do you want out of this chapter?"
                  value={values.whyIete} onChange={set("whyIete")} className="w-full resize-y" />
                {errors.whyIete && <p className={errorClass}>{errors.whyIete}</p>}
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

