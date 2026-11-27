import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/auth/AuthLayout";
import { PasswordInput } from "../components/auth/PasswordInput";
import { api } from "../api/fetchAPI";

type loginCredentials = {
  email: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();

  const [loginCredential, setLoginCredential] = useState<loginCredentials>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginCredential((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    for (const key in loginCredential) {
      console.log(key);
      if (!loginCredential[key as keyof loginCredentials]) {
        return alert(`${key} is required`);
      }
    }

    try {
      setIsLoading(true)
      const response = await api.post("auth/users/login", loginCredential)
      console.log(response.data);
    } catch (err) {
      throw err
    } finally {
      setIsLoading(false);
    }
  }


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

        <form onSubmit={handleLoginSubmit} className="mt-7 space-y-5">
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
              value={loginCredential.email}
              onChange={handleCredentialChange}
              placeholder="you@school.edu"
              className="w-full rounded-lg border border-[#DDE9F0] bg-[#FBFDFD] px-3.5 py-2.5 text-sm text-[#3C4044] placeholder:text-[#A1AEB8] transition-colors focus:border-[#5D8DD4] focus:outline-2 focus:outline-offset-0 focus:outline-[#BAD5ED]"
            />
          </div>

          <div className="space-y-1.5">
            <div className="block">
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-[#3C4044]"
              >
                Password
              </label>
            </div>
            <PasswordInput
              id="login-password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              enterKeyHint="done"
              value={loginCredential.password}
              onChange={handleCredentialChange}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#5D8DD4] px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#3A66B2] active:bg-[#3A66B2] disabled:cursor-not-allowed disabled:bg-[#BAD5ED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A66B2]"
          >
            {isLoading ? "Signing in…" : "Sign In"}
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
