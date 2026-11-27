import { useScrollReveal } from "../../hooks/useScrollReveal";

export function CtaSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="get-started"
      className="bg-[#FBFDFD] px-6 pb-20 pt-4 md:pb-24"
    >
      <div
        ref={ref}
        className={`reveal mx-auto max-w-6xl ${isVisible ? "is-visible" : ""}`}
      >
        <div className="relative overflow-hidden rounded-3xl border border-[#BAD5ED] bg-[#EBF6FB] px-6 py-14 text-center sm:px-12 md:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-[#BAD5ED]/40"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-[#BAD5ED]/40"
          />

          <div className="relative mx-auto max-w-2xl space-y-5">
            <h2 className="text-3xl font-bold tracking-tight text-[#3C4044] sm:text-4xl">
              Ready to Bring Clarity to Your Classrooms?
            </h2>
            <p className="text-base leading-relaxed text-[#5C6670]">
              Start organizing your school’s teachers, students, sections, and
              subject catalogs in one dependable workspace.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-lg bg-[#5D8DD4] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#3A66B2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A66B2]"
              >
                Explore Features
              </a>
              <a
                href="#preview"
                className="inline-flex items-center justify-center rounded-lg border border-[#BAD5ED] bg-[#FBFDFD] px-6 py-3 text-sm font-semibold text-[#3A66B2] transition-colors hover:bg-[#FBFDFD]/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D8DD4]"
              >
                View Directory Preview
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
