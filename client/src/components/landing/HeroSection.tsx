export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FBFDFD] px-6 pb-20 pt-14 md:pb-28 md:pt-20">
      {/* Subtle geometric blue accents inspired by corporate report layouts */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#EBF6FB]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-0 h-48 w-48 rounded-r-3xl bg-[#EBF6FB]/70"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="animate-fade-up space-y-6 lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#BAD5ED] bg-[#EBF6FB] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#3A66B2]">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-[#5D8DD4]"
            />
            Academic Operations Platform
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#3C4044] sm:text-5xl lg:text-[3.25rem]">
            Organize Classrooms, Subjects, and People in{" "}
            <span className="text-[#3A66B2]">One Clear System</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-[#5C6670] sm:text-lg">
            Klaseta brings structure to everyday school administration. Manage
            teacher profiles, student records, class sections, and subject
            assignments in a clean, role-aware workspace built for clarity.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#get-started"
              className="inline-flex items-center justify-center rounded-lg bg-[#5D8DD4] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#3A66B2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A66B2]"
            >
              Get Started
              <svg
                aria-hidden="true"
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-lg border border-[#DDE9F0] bg-[#FBFDFD] px-6 py-3 text-sm font-semibold text-[#3C4044] transition-colors hover:border-[#BAD5ED] hover:bg-[#EBF6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D8DD4]"
            >
              See How It Works
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 border-t border-[#DDE9F0] pt-6 text-sm text-[#5C6670]">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EBF6FB] text-[#3A66B2]"
              >
                ✓
              </span>
              <span>Role-based access control</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EBF6FB] text-[#3A66B2]"
              >
                ✓
              </span>
              <span>Structured LRN &amp; section records</span>
            </div>
          </div>
        </div>

        {/* Corporate Report-Inspired Product Mockup */}
        <div className="animate-fade-up delay-200 lg:col-span-6">
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            <div className="rounded-2xl border border-[#DDE9F0] bg-[#FBFDFD] p-5 shadow-lg sm:p-6">
              {/* Mockup Header Bar */}
              <div className="flex items-center justify-between border-b border-[#DDE9F0] pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EBF6FB] text-sm font-bold text-[#3A66B2]">
                    K
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#3C4044]">
                      Academic Overview
                    </p>
                    <p className="text-xs text-[#A1AEB8]">
                      SY 2026–2027 · 1st Semester
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-[#EBF6FB] px-3 py-1 text-xs font-semibold text-[#3A66B2]">
                  Active Term
                </span>
              </div>

              {/* Summary Metric Strip */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-[#DDE9F0] bg-[#EBF6FB]/60 p-3.5">
                  <p className="text-xs font-medium text-[#5C6670]">
                    Classrooms
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[#3A66B2]">12</p>
                </div>
                <div className="rounded-xl border border-[#DDE9F0] bg-[#EBF6FB]/60 p-3.5">
                  <p className="text-xs font-medium text-[#5C6670]">Subjects</p>
                  <p className="mt-1 text-2xl font-bold text-[#3A66B2]">28</p>
                </div>
                <div className="rounded-xl border border-[#DDE9F0] bg-[#EBF6FB]/60 p-3.5">
                  <p className="text-xs font-medium text-[#5C6670]">Roles</p>
                  <p className="mt-1 text-2xl font-bold text-[#3A66B2]">2</p>
                </div>
              </div>

              {/* Classroom List Preview */}
              <div className="mt-5 space-y-2.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A1AEB8]">
                  Active Sections
                </p>

                <div className="flex items-center justify-between rounded-xl border border-[#DDE9F0] bg-[#FBFDFD] px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-[#3C4044]">
                      Grade 10 — Diamond
                    </p>
                    <p className="text-xs text-[#5C6670]">
                      Code: CLS-10D · Adviser Assigned
                    </p>
                  </div>
                  <span className="rounded-md bg-[#BAD5ED]/50 px-2.5 py-1 text-xs font-medium text-[#3A66B2]">
                    Science Dept
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-[#DDE9F0] bg-[#FBFDFD] px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-[#3C4044]">
                      Grade 11 — Rizal
                    </p>
                    <p className="text-xs text-[#5C6670]">
                      Code: CLS-11R · 6 Subjects Linked
                    </p>
                  </div>
                  <span className="rounded-md bg-[#BAD5ED]/50 px-2.5 py-1 text-xs font-medium text-[#3A66B2]">
                    STEM Track
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle floating accent card */}
            <div
              aria-hidden="true"
              className="animate-float-slow -bottom-5 -left-4 hidden rounded-xl border border-[#BAD5ED] bg-[#FBFDFD] px-4 py-3 shadow-md sm:absolute sm:flex sm:items-center sm:gap-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5D8DD4] text-xs font-bold text-white">
                ✓
              </div>
              <div>
                <p className="text-xs font-semibold text-[#3C4044]">
                  Student &amp; Teacher Sync
                </p>
                <p className="text-[11px] text-[#5C6670]">
                  Linked user accounts &amp; profiles
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
