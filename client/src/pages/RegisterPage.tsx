import { Link } from "react-router-dom";

export function RegisterPage() {
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
            to="/login"
            className="rounded-lg border border-[#DDE9F0] bg-[#FBFDFD] px-4 py-2 text-sm font-medium text-[#3A66B2] transition-colors hover:bg-[#EBF6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D8DD4]"
          >
            Sign In
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
              Get Started
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-[#3C4044] sm:text-3xl">
              Create your account
            </h1>
            <p className="text-sm text-[#5C6670]">
              Set up your Klaseta profile to join or manage classrooms.
            </p>
          </div>

          <form className="mt-8 space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="register-email"
                className="block text-sm font-medium text-[#3C4044]"
              >
                Email address
              </label>
              <input
                id="register-email"
                name="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                required
                placeholder="you@school.edu"
                className="w-full rounded-lg border border-[#DDE9F0] bg-[#FBFDFD] px-3.5 py-2.5 text-sm text-[#3C4044] placeholder:text-[#A1AEB8] transition-colors focus:border-[#5D8DD4] focus:outline-2 focus:outline-offset-0 focus:outline-[#BAD5ED]"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="register-username"
                className="block text-sm font-medium text-[#3C4044]"
              >
                Username
              </label>
              <input
                id="register-username"
                name="username"
                type="text"
                autoComplete="username"
                spellCheck={false}
                autoCapitalize="none"
                autoCorrect="off"
                required
                placeholder="Choose a username"
                className="w-full rounded-lg border border-[#DDE9F0] bg-[#FBFDFD] px-3.5 py-2.5 text-sm text-[#3C4044] placeholder:text-[#A1AEB8] transition-colors focus:border-[#5D8DD4] focus:outline-2 focus:outline-offset-0 focus:outline-[#BAD5ED]"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="register-role"
                className="block text-sm font-medium text-[#3C4044]"
              >
                Role
              </label>
              <select
                id="register-role"
                name="role"
                defaultValue="student"
                required
                className="w-full rounded-lg border border-[#DDE9F0] bg-[#FBFDFD] px-3.5 py-2.5 text-sm text-[#3C4044] transition-colors focus:border-[#5D8DD4] focus:outline-2 focus:outline-offset-0 focus:outline-[#BAD5ED]"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="register-password"
                className="block text-sm font-medium text-[#3C4044]"
              >
                Password
              </label>
              <input
                id="register-password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Create a strong password"
                className="w-full rounded-lg border border-[#DDE9F0] bg-[#FBFDFD] px-3.5 py-2.5 text-sm text-[#3C4044] placeholder:text-[#A1AEB8] transition-colors focus:border-[#5D8DD4] focus:outline-2 focus:outline-offset-0 focus:outline-[#BAD5ED]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#5D8DD4] px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#3A66B2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A66B2]"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 border-t border-[#DDE9F0] pt-5 text-center text-sm text-[#5C6670]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#3A66B2] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D8DD4]"
            >
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;
