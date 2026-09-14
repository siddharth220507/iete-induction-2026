export default function Process() {
  const steps = [
    { no: "01", title: "Fill Application", desc: "Submit your details below" },
    { no: "02", title: "Screening & Learning", desc: "Assess knowledge and skills through screening tests" },
    { no: "03", title: "Personal Interview", desc: "Interaction with the core team" },
  ];

  return (
    <section className="border-y border-zinc-200 bg-zinc-50/50 py-10">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
          {steps.map((step, idx) => (
            <div key={step.no} className="flex items-center gap-3 w-full sm:w-auto">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white">
                {step.no}
              </span>
              <div>
                <p className="text-sm font-semibold text-zinc-900">{step.title}</p>
                <p className="text-xs text-zinc-500">{step.desc}</p>
              </div>
              {idx < steps.length - 1 && (
                <span className="hidden lg:block text-zinc-300 ml-6 text-lg font-light">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}