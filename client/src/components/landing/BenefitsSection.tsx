import { useScrollReveal } from "../../hooks/useScrollReveal";

const HIGHLIGHTS = [
  {
    value: "4",
    label: "Core Academic Modules",
    detail: "Classrooms, Subjects, Teachers, and Students linked cleanly.",
  },
  {
    value: "2",
    label: "Dedicated User Roles",
    detail: "Separate Teacher and Student workflows backed by role guards.",
  },
  {
    value: "1",
    label: "Unified Relational Schema",
    detail: "Transactional account creation keeps user and profile records synced.",
  },
] as const;

export function BenefitsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="benefits" className="bg-[#FBFDFD] px-6 py-20 md:py-24">
      <div
        ref={ref}
        className={`reveal mx-auto max-w-6xl ${isVisible ? "is-visible" : ""}`}
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#3A66B2]">
            Designed for Reliability
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#3C4044] sm:text-4xl">
            Structured Data Without Administrative Friction
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[#DDE9F0] bg-[#FBFDFD] p-8 text-center shadow-xs"
            >
              <p className="text-5xl font-bold tracking-tight text-[#3A66B2]">
                {item.value}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-[#3C4044]">
                {item.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5C6670]">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
