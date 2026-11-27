import { useScrollReveal } from "../../hooks/useScrollReveal";

const STEPS = [
  {
    step: "01",
    title: "Create Role Accounts",
    description:
      "Register teachers and students with linked user credentials in a single atomic transaction.",
  },
  {
    step: "02",
    title: "Set Up Classrooms",
    description:
      "Define grade levels, sections, academic years, and assign a faculty adviser to each room.",
  },
  {
    step: "03",
    title: "Assign Subjects",
    description:
      "Attach subject codes, credit units, and departments directly to classrooms and instructors.",
  },
  {
    step: "04",
    title: "Manage Daily Operations",
    description:
      "Look up students by LRN, update section details, and keep academic records synchronized.",
  },
] as const;

export function HowItWorksSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="how-it-works" className="bg-[#FBFDFD] px-6 py-20 md:py-24">
      <div
        ref={ref}
        className={`reveal mx-auto max-w-6xl ${isVisible ? "is-visible" : ""}`}
      >
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#3A66B2]">
            Workflow
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#3C4044] sm:text-4xl">
            How Klaseta Fits Into Your Term Setup
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5C6670]">
            A straightforward four-step flow takes your institution from initial
            account setup to an organized academic directory.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item) => (
            <li
              key={item.step}
              className="relative flex flex-col rounded-2xl border border-[#DDE9F0] bg-[#FBFDFD] p-6"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#3A66B2] text-sm font-bold text-white">
                  {item.step}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-[#DDE9F0] ml-4"
                />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-[#3C4044]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5C6670]">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
