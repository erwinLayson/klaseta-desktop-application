import { useScrollReveal } from "../../hooks/useScrollReveal";

const FEATURES = [
  {
    title: "Classroom Organization",
    description:
      "Structure classes by grade level, section, academic year, and semester with unique class codes and adviser links.",
    icon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
    ),
  },
  {
    title: "Subject & Curriculum Mapping",
    description:
      "Define subjects with unique course codes, credit units, department tags, and direct assignments to teachers and classrooms.",
    icon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    title: "Student & Teacher Profiles",
    description:
      "Maintain clean faculty department directories alongside student LRN, grade level, and section records in one database.",
    icon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "Role-Based Access Control",
    description:
      "Authenticated sessions keep teacher and student permissions cleanly separated with HTTP-only cookie tokens.",
    icon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
] as const;

export function FeaturesSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="features"
      className="border-y border-[#DDE9F0] bg-[#EBF6FB] px-6 py-20 md:py-24"
    >
      <div
        ref={ref}
        className={`reveal mx-auto max-w-6xl ${isVisible ? "is-visible" : ""}`}
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#3A66B2]">
            Core Capabilities
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#3C4044] sm:text-4xl">
            Everything Needed to Structure Your School
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5C6670]">
            Built around clear relationships between users, teachers, students,
            classrooms, and subjects without unnecessary clutter.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <article
              key={feature.title}
              className={`card-hover flex flex-col rounded-2xl border border-[#DDE9F0] bg-[#FBFDFD] p-6 shadow-xs hover:border-[#BAD5ED] hover:shadow-md delay-${(index + 1) * 100}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EBF6FB] text-[#3A66B2]">
                {feature.icon}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#3C4044]">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#5C6670]">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
