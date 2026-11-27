import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBFDFD] text-[#3C4044]">
      <header className="border-b border-[#DDE9F0] bg-[#FBFDFD]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/"
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
          </Link>

          <Link
            to="/register"
            className="rounded-lg border border-[#DDE9F0] bg-[#FBFDFD] px-4 py-2 text-sm font-medium text-[#3A66B2] transition-colors hover:bg-[#EBF6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D8DD4]"
          >
            Create Account
          </Link>
        </div>
      </header>

      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#EBF6FB]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#EBF6FB]"
        />

        <div className="animate-fade-up relative w-full max-w-md rounded-2xl border border-[#DDE9F0] bg-[#FBFDFD] p-8 shadow-lg">
          <div className="space-y-2 text-center">
            <span className="inline-block rounded-full border border-[#BAD5ED] bg-[#EBF6FB] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#3A66B2]">
              Welcome Back
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-[#3C4044] sm:text-3xl">
              Sign in to Klaseta
            </h1>
            <p className="text-sm text-[#5C6670]">
              Enter your credentials to access your classrooms and records.
            </p>
          </div>

          <form className="mt-8 space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="login-email"
                className="block text-sm font-medium text-[#3C4044]"
              >
                Email address
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="username"
                spellCheck={false}
                required
                placeholder="you@school.edu"
                className="w-full rounded-lg border border-[#DDE9F0] bg-[#FBFDFD] px-3.5 py-2.5 text-sm text-[#3C4044] placeholder:text-[#A1AEB8] transition-colors focus:border-[#5D8DD4] focus:outline-2 focus:outline-offset-0 focus:outline-[#BAD5ED]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-[#3C4044]"
                >
                  Password
                </label>
                <a
                  href="#forgot-password"
                  className="text-xs font-medium text-[#3A66B2] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D8DD4]"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                className="w-full rounded-lg border border-[#DDE9F0] bg-[#FBFDFD] px-3.5 py-2.5 text-sm text-[#3C4044] placeholder:text-[#A1AEB8] transition-colors focus:border-[#5D8DD4] focus:outline-2 focus:outline-offset-0 focus:outline-[#BAD5ED]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#5D8DD4] px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#3A66B2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A66B2]"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 border-t border-[#DDE9F0] pt-5 text-center text-sm text-[#5C6670]">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#3A66B2] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D8DD4]"
            >
              Create Account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
