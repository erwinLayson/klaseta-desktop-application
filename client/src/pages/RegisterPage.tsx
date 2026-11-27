import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "../components/auth/AuthLayout";
import { PasswordInput } from "../components/auth/PasswordInput";

type AccountType = "personal" | "administrative";

export function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [accountType, setAccountType] = useState<AccountType | null>(null);

  return (
    <AuthLayout
      badge="Teacher Onboarding"
      headline="Set up your Klaseta teacher workspace."
      description="Create your teacher profile to organize classrooms, manage subject assignments, and keep student records structured."
    >
      <div className="rounded-2xl border border-[#DDE9F0] bg-[#FBFDFD] p-7 shadow-sm sm:p-9">
        {/* Step Progress Indicator */}
        <div
          aria-label="Registration steps"
          className="mb-7 flex items-center justify-between gap-3 border-b border-[#DDE9F0] pb-5"
        >
          <div className="flex items-center gap-2.5">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                step === 1
                  ? "bg-[#5D8DD4] text-white"
                  : "bg-[#EBF6FB] text-[#3A66B2]"
              }`}
            >
              1
            </span>
            <span
              className={`text-xs font-semibold ${
                step === 1 ? "text-[#3C4044]" : "text-[#5C6670]"
              }`}
            >
              Account Type
            </span>
          </div>

          <span aria-hidden="true" className="h-px flex-1 bg-[#DDE9F0]" />

          <div className="flex items-center gap-2.5">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                step === 2
                  ? "bg-[#5D8DD4] text-white"
                  : "bg-[#EBF6FB] text-[#A1AEB8]"
              }`}
            >
              2
            </span>
            <span
              className={`text-xs font-semibold ${
                step === 2 ? "text-[#3C4044]" : "text-[#A1AEB8]"
              }`}
            >
              Teacher Details
            </span>
          </div>
        </div>

        {step === 1 ? (
          <div className="animate-step-enter">
            <div className="space-y-1.5">
              <h1 className="text-2xl font-bold tracking-tight text-[#3C4044] sm:text-3xl">
                Choose account type
              </h1>
              <p className="text-sm text-[#5C6670]">
                What kind of teacher account would you like to create?
              </p>
            </div>

            <div className="mt-6 space-y-3.5">
              <button
                type="button"
                aria-pressed={accountType === "personal"}
                onClick={() => setAccountType("personal")}
                className={`w-full rounded-xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A66B2] ${
                  accountType === "personal"
                    ? "border-[#5D8DD4] bg-[#EBF6FB]"
                    : "border-[#DDE9F0] bg-[#FBFDFD] hover:border-[#BAD5ED] hover:bg-[#EBF6FB]/50"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-[#3C4044]">
                    Personal Use
                  </span>
                  <span className="rounded-full bg-[#FBFDFD] px-2.5 py-0.5 text-xs font-semibold text-[#3A66B2]">
                    Available
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#5C6670]">
                  For individual teachers managing their own classrooms,
                  subjects, and student records.
                </p>
              </button>

              <button
                type="button"
                aria-pressed={accountType === "administrative"}
                onClick={() => setAccountType("administrative")}
                className={`w-full rounded-xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A66B2] ${
                  accountType === "administrative"
                    ? "border-[#5D8DD4] bg-[#EBF6FB]"
                    : "border-[#DDE9F0] bg-[#FBFDFD] hover:border-[#BAD5ED] hover:bg-[#EBF6FB]/50"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-[#3C4044]">
                    Administrative Use
                  </span>
                  <span className="rounded-full border border-[#DDE9F0] bg-[#FBFDFD] px-2.5 py-0.5 text-xs font-medium text-[#A1AEB8]">
                    Not Available
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#5C6670]">
                  For school-wide administration, multi-department oversight,
                  and institutional provisioning.
                </p>
              </button>
            </div>

            <button
              type="button"
              disabled={!accountType}
              onClick={() => setStep(2)}
              className="mt-6 w-full rounded-lg bg-[#5D8DD4] px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#3A66B2] active:bg-[#3A66B2] disabled:cursor-not-allowed disabled:bg-[#BAD5ED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A66B2]"
            >
              Continue
            </button>
          </div>
        ) : (
          <div className="animate-step-enter">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mb-4 inline-flex items-center gap-1.5 rounded-md text-xs font-semibold text-[#3A66B2] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D8DD4]"
            >
              <span aria-hidden="true">←</span>
              Back to account type
            </button>

            {accountType === "administrative" ? (
              <div className="rounded-xl border border-[#BAD5ED] bg-[#EBF6FB] p-6 text-center">
                <span className="inline-block rounded-full bg-[#FBFDFD] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#3A66B2]">
                  Not Available
                </span>
                <h1 className="mt-3 text-xl font-bold text-[#3C4044]">
                  Administrative accounts are not available yet
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-[#5C6670]">
                  Administrative registration is currently unavailable. Please
                  switch to Personal Use to create an individual teacher
                  account.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-lg border border-[#DDE9F0] bg-[#FBFDFD] px-4 py-2 text-sm font-medium text-[#3C4044] transition-colors hover:bg-[#FBFDFD]/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D8DD4]"
                  >
                    Go Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType("personal")}
                    className="rounded-lg bg-[#5D8DD4] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3A66B2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A66B2]"
                  >
                    Switch to Personal Use
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-1.5">
                  <h1 className="text-2xl font-bold tracking-tight text-[#3C4044] sm:text-3xl">
                    Create teacher account
                  </h1>
                  <p className="text-sm text-[#5C6670]">
                    Personal Use · Complete your profile and account credentials.
                  </p>
                </div>

                <form className="mt-6 space-y-6">
                  {/* Group 1: Personal Information */}
                  <fieldset className="space-y-4">
                    <legend className="text-xs font-semibold uppercase tracking-wider text-[#3A66B2]">
                      Personal Information
                    </legend>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="register-firstname"
                          className="block text-sm font-medium text-[#3C4044]"
                        >
                          First name
                        </label>
                        <input
                          id="register-firstname"
                          name="firstname"
                          type="text"
                          autoComplete="given-name"
                          enterKeyHint="next"
                          required
                          placeholder="Juan"
                          className="w-full rounded-lg border border-[#DDE9F0] bg-[#FBFDFD] px-3.5 py-2.5 text-sm text-[#3C4044] placeholder:text-[#A1AEB8] transition-colors focus:border-[#5D8DD4] focus:outline-2 focus:outline-offset-0 focus:outline-[#BAD5ED]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="register-middlename"
                          className="block text-sm font-medium text-[#3C4044]"
                        >
                          Middle name
                        </label>
                        <input
                          id="register-middlename"
                          name="middlename"
                          type="text"
                          autoComplete="additional-name"
                          enterKeyHint="next"
                          placeholder="Santos"
                          className="w-full rounded-lg border border-[#DDE9F0] bg-[#FBFDFD] px-3.5 py-2.5 text-sm text-[#3C4044] placeholder:text-[#A1AEB8] transition-colors focus:border-[#5D8DD4] focus:outline-2 focus:outline-offset-0 focus:outline-[#BAD5ED]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="register-lastname"
                          className="block text-sm font-medium text-[#3C4044]"
                        >
                          Last name
                        </label>
                        <input
                          id="register-lastname"
                          name="lastname"
                          type="text"
                          autoComplete="family-name"
                          enterKeyHint="next"
                          required
                          placeholder="Dela Cruz"
                          className="w-full rounded-lg border border-[#DDE9F0] bg-[#FBFDFD] px-3.5 py-2.5 text-sm text-[#3C4044] placeholder:text-[#A1AEB8] transition-colors focus:border-[#5D8DD4] focus:outline-2 focus:outline-offset-0 focus:outline-[#BAD5ED]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="register-department"
                          className="block text-sm font-medium text-[#3C4044]"
                        >
                          Department{" "}
                          <span className="text-xs font-normal text-[#A1AEB8]">
                            (optional)
                          </span>
                        </label>
                        <input
                          id="register-department"
                          name="department"
                          type="text"
                          enterKeyHint="next"
                          placeholder="e.g. Science"
                          className="w-full rounded-lg border border-[#DDE9F0] bg-[#FBFDFD] px-3.5 py-2.5 text-sm text-[#3C4044] placeholder:text-[#A1AEB8] transition-colors focus:border-[#5D8DD4] focus:outline-2 focus:outline-offset-0 focus:outline-[#BAD5ED]"
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* Group 2: Account Credentials */}
                  <fieldset className="space-y-4 border-t border-[#DDE9F0] pt-5">
                    <legend className="text-xs font-semibold uppercase tracking-wider text-[#3A66B2]">
                      Account Credentials
                    </legend>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                          enterKeyHint="next"
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
                          enterKeyHint="next"
                          required
                          placeholder="Choose a username"
                          className="w-full rounded-lg border border-[#DDE9F0] bg-[#FBFDFD] px-3.5 py-2.5 text-sm text-[#3C4044] placeholder:text-[#A1AEB8] transition-colors focus:border-[#5D8DD4] focus:outline-2 focus:outline-offset-0 focus:outline-[#BAD5ED]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="register-password"
                        className="block text-sm font-medium text-[#3C4044]"
                      >
                        Password
                      </label>
                      <PasswordInput
                        id="register-password"
                        name="password"
                        autoComplete="new-password"
                        placeholder="Create a strong password"
                        enterKeyHint="done"
                        ariaDescribedBy="register-password-hint"
                      />
                      <p
                        id="register-password-hint"
                        className="text-xs text-[#5C6670]"
                      >
                        Use a unique password with letters, numbers, or symbols.
                      </p>
                    </div>
                  </fieldset>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[#5D8DD4] px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#3A66B2] active:bg-[#3A66B2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A66B2]"
                  >
                    Create Account
                  </button>
                </form>
              </>
            )}
          </div>
        )}

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
    </AuthLayout>
  );
}

export default RegisterPage;
