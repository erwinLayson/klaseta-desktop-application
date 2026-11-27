import { Link } from "react-router-dom";
import { AuthLayout } from "../components/auth/AuthLayout";
import { PasswordInput } from "../components/auth/PasswordInput";

export function LoginPage() {
  return (
    <AuthLayout
      badge="Welcome Back"
      headline="Manage your classrooms with clarity."
      description="Sign in to access your sections, subjects, teacher directory, and student records in one unified workspace."
    >
      <div className="rounded-2xl border border-[#DDE9F0] bg-[#FBFDFD] p-7 shadow-sm sm:p-9">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-[#3C4044] sm:text-3xl">
            Sign in to Klaseta
          </h1>
          <p className="text-sm text-[#5C6670]">
            Enter your email address and password to continue.
          </p>
        </div>

        <form className="mt-7 space-y-5">
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
              enterKeyHint="next"
              required
              placeholder="you@school.edu"
              className="w-full rounded-lg border border-[#DDE9F0] bg-[#FBFDFD] px-3.5 py-2.5 text-sm text-[#3C4044] placeholder:text-[#A1AEB8] transition-colors focus:border-[#5D8DD4] focus:outline-2 focus:outline-offset-0 focus:outline-[#BAD5ED]"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
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
            <PasswordInput
              id="login-password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              enterKeyHint="done"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#5D8DD4] px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#3A66B2] active:bg-[#3A66B2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A66B2]"
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
    </AuthLayout>
  );
}

export default LoginPage;
