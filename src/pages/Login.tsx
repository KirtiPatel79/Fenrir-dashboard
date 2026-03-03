import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Eye, EyeOff, Star } from "lucide-react";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 " +
  "placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 " +
  "dark:border-neutral-600 dark:bg-neutral-800 dark:text-white";

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function MetaLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-(--bg-primary)">
      {/* Left side: marketing/branding (desktop only) */}
      <aside className="hidden lg:flex lg:w-[55%] flex-col bg-neutral-950 px-12 py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-liner-to-r from-teal-500/10 to-transparent opacity-60" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full bg-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white mt-16 leading-tight">
            Expert level Cybersecurity
            <br />
            <span className="text-teal-500">in hours not weeks.</span>
          </h1>

          <div className="mt-12">
            <h3 className="text-white font-medium mb-4">
              What&apos;s included
            </h3>
            <ul className="space-y-3 text-neutral-300">
              <li className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                Effortlessly spider and map targets to uncover hidden security
                flaws
              </li>
              <li className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                Deliver high-quality, validated findings in hours, not weeks.
              </li>
              <li className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                Generate professional, enterprise-grade security reports
                automatically.
              </li>
            </ul>
          </div>

          <div className="mt-auto pt-20 flex items-center gap-3">
            <Star className="w-5 h-5 text-green-500 fill-green-500" />
            <span className="text-white font-medium">Trustpilot</span>
            <span className="text-neutral-400">Rated 4.5/5.0</span>
            <span className="text-neutral-500 text-sm">(100k+ reviews)</span>
          </div>
        </div>
      </aside>

      {/* Right side: form */}
      <main className="flex-1 flex items-center justify-center p-6 bg-linear-to-bl from-amber-200/30 via-neutral-100 to-rose-200/20 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950">
        <div className="w-full max-w-105">
          {/* Mobile header */}
          <div className="lg:hidden flex justify-between items-center mb-8">
            <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full bg-white" />
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-8 border border-neutral-200 dark:border-neutral-800">
            <h2 className="mt-6 text-2xl font-bold text-neutral-900 dark:text-white">
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </h2>

            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {mode === "signup" ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-teal-500 hover:underline"
                  >
                    Log in
                  </button>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-teal-500 hover:underline"
                  >
                    Sign up
                  </button>
                </>
              )}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {mode === "signup" && (
                <>
                  <input
                    type="text"
                    placeholder="First name*"
                    className={inputClass}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last name*"
                    className={inputClass}
                    required
                  />
                </>
              )}

              <input
                type="email"
                placeholder="Email address*"
                className={inputClass}
                required
              />

              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder={
                    mode === "signup"
                      ? "Password (8+ characters)*"
                      : "Password*"
                  }
                  className={`${inputClass} pr-12`}
                  minLength={mode === "signup" ? 8 : undefined}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {mode === "signup" && (
                <div className="flex items-start gap-2">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 rounded border-neutral-400 text-teal-500 focus:ring-teal-500"
                  />

                  <label
                    htmlFor="terms"
                    className="text-sm text-neutral-600 dark:text-neutral-400"
                  >
                    I agree to Aps&apos;s{" "}
                    <Link to="/terms" className="text-teal-500 hover:underline">
                      Terms &amp; Conditions
                    </Link>{" "}
                    and acknowledge the{" "}
                    <Link
                      to="/privacy"
                      className="text-teal-500 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={mode === "signup" && !agreed}
                className="w-full py-3 rounded-lg bg-linear-to-r from-teal-500 to-teal-600 text-white font-semibold
                           hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {mode === "signup" ? "Create account" : "Log in"}
              </button>
            </form>

            {/* Social buttons with logos */}
            <div className="mt-6">
              <p className="text-center text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                Or continue with
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex-1 py-2.5 rounded-lg bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors
                             dark:bg-neutral-800 dark:border dark:border-neutral-600 dark:hover:bg-neutral-700"
                  aria-label="Continue with Apple"
                >
                  <AppleLogo className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  className="flex-1 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-700 flex items-center justify-center hover:bg-neutral-100 transition-colors
                             dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                  aria-label="Continue with Google"
                >
                  <GoogleLogo className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors
                             dark:hover:bg-blue-500"
                  aria-label="Continue with Meta"
                >
                  <MetaLogo className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
