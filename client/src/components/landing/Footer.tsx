export function Footer() {
  return (
    <footer className="border-t border-[#DDE9F0] bg-[#FBFDFD] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="space-y-3 md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5D8DD4] text-sm font-bold text-white"
              >
                K
              </span>
              <span className="text-lg font-bold tracking-tight text-[#3C4044]">
                Klaseta
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#5C6670]">
              Clean, reliable classroom and academic record management built for
              modern schools, teachers, and students.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#3A66B2]">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#5C6670]">
              <li>
                <a
                  href="#features"
                  className="transition-colors hover:text-[#3A66B2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D8DD4]"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="transition-colors hover:text-[#3A66B2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D8DD4]"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#preview"
                  className="transition-colors hover:text-[#3A66B2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D8DD4]"
                >
                  Workspace Preview
                </a>
              </li>
              <li>
                <a
                  href="#benefits"
                  className="transition-colors hover:text-[#3A66B2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D8DD4]"
                >
                  Benefits
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#3A66B2]">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#5C6670]">
              <li>
                <a
                  href="mailto:support@klaseta.edu"
                  className="transition-colors hover:text-[#3A66B2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D8DD4]"
                >
                  support@klaseta.edu
                </a>
              </li>
              <li>Academic Operations &amp; Records</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#DDE9F0] pt-6 text-xs text-[#A1AEB8] sm:flex-row">
          <p>© {new Date().getFullYear()} Klaseta. All rights reserved.</p>
          <p>Designed with clarity for educators and learners.</p>
        </div>
      </div>
    </footer>
  );
}
