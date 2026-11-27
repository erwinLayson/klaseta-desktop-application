import { useState } from "react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Preview", href: "#preview" },
  { label: "Benefits", href: "#benefits" },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#DDE9F0] bg-[#FBFDFD]/95">
      <a
        href="#main-content"
        className="visually-hidden fixed left-4 top-4 z-50 rounded-lg bg-[#3A66B2] px-4 py-2 text-sm font-semibold text-white shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D8DD4]"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a
          href="#"
          className="flex items-center gap-2.5 rounded-md text-[#3A66B2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5D8DD4]"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5D8DD4] text-base font-bold text-white shadow-xs"
          >
            K
          </span>
          <span className="text-xl font-bold tracking-tight text-[#3C4044]">
            Klaseta
          </span>
        </a>

        <nav aria-label="Primary" className="flex items-center gap-4">
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-md px-1 py-1 text-sm font-medium text-[#3C4044] transition-colors hover:text-[#3A66B2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5D8DD4]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#preview"
              className="rounded-lg px-4 py-2 text-sm font-medium text-[#3A66B2] transition-colors hover:bg-[#EBF6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D8DD4]"
            >
              Explore Workspace
            </a>
            <a
              href="#get-started"
              className="rounded-lg bg-[#5D8DD4] px-4 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#3A66B2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A66B2]"
            >
              Get Started
            </a>
          </div>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDE9F0] bg-[#FBFDFD] text-[#3C4044] transition-colors hover:bg-[#EBF6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D8DD4] md:hidden"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          className="mobile-menu-panel border-t border-[#DDE9F0] bg-[#FBFDFD] px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#3C4044] transition-colors hover:bg-[#EBF6FB] hover:text-[#3A66B2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D8DD4]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2 border-t border-[#DDE9F0] pt-4">
            <a
              href="#preview"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg border border-[#DDE9F0] px-4 py-2.5 text-center text-sm font-medium text-[#3A66B2] transition-colors hover:bg-[#EBF6FB]"
            >
              Explore Workspace
            </a>
            <a
              href="#get-started"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg bg-[#5D8DD4] px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#3A66B2]"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
