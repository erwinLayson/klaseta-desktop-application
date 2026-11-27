import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  badge: string;
  headline: string;
  description: string;
  children: ReactNode;
  contentClassName?: string;
}

const BRAND_HIGHLIGHTS = [
  {
    title: "Structured Classrooms",
    detail: "Organize sections, grade levels, and academic terms in one place.",
  },
  {
    title: "Connected Profiles",
    detail: "Keep teacher departments and student LRN records synchronized.",
  },
  {
    title: "Role-Scoped Access",
    detail: "Dedicated workflows and permissions for teachers and students.",
  },
] as const;

export function AuthLayout({
  badge,
  headline,
  description,
  children,
  contentClassName = "w-full max-w-lg",
}: AuthLayoutProps) {
  return (
    <div className="h-dvh overflow-hidden bg-[#FBFDFD] text-[#3C4044] lg:grid lg:grid-cols-12">
      {/* Desktop Left Branding Panel */}
      <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-[#DDE9F0] bg-[#EBF6FB] p-7 lg:col-span-5 lg:flex xl:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#BAD5ED]/45"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-[#BAD5ED]/35"
        />

        <div className="relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 rounded-md text-[#3A66B2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5D8DD4]"
          >
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5D8DD4] text-lg font-bold text-white shadow-xs"
            >
              K
            </span>
            <span className="text-xl font-bold tracking-tight text-[#3C4044]">
              Klaseta
            </span>
          </Link>
        </div>

        <div className="relative my-auto space-y-3 py-4">
          <span className="inline-block rounded-full border border-[#BAD5ED] bg-[#FBFDFD] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#3A66B2]">
            {badge}
          </span>
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-[#3C4044] xl:text-3xl">
            {headline}
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-[#5C6670]">
            {description}
          </p>

          <ul className="space-y-2.5 pt-1">
            {BRAND_HIGHLIGHTS.map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-3.5 rounded-xl border border-[#DDE9F0] bg-[#FBFDFD]/90 p-3 shadow-2xs"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#5D8DD4] text-xs font-bold text-white"
                >
                  ✓
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#3C4044]">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#5C6670]">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-[#5C6670]">
          © {new Date().getFullYear()} Klaseta · Academic Operations Platform
        </p>
      </aside>

      {/* Right / Mobile Main Auth Column */}
      <div className="flex h-dvh min-h-0 flex-col lg:col-span-7">
        {/* Compact Mobile Header */}
        <header className="border-b border-[#DDE9F0] bg-[#FBFDFD] lg:hidden">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 rounded-md text-[#3A66B2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5D8DD4]"
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
            </Link>
          </div>
        </header>

        <main className="auth-scroll flex min-h-0 flex-1 justify-center overflow-y-auto px-6 py-5 sm:px-10 sm:py-6 lg:py-8">
          <div className={`animate-fade-up my-auto ${contentClassName}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
