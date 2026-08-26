"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import LoginDataAdmin from "@/types/loginData";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";

export default function AdminLogin() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginDataAdmin>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Inncorrect, setIncorrect] = useState<boolean>(false);

  const handleInput = async (event: React.InputEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handalSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `/api/authentication/adminlogin`,
        formData,
      );
      router.push("/admin");
    } catch (error) {
      console.log(error);
      setIncorrect(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      {Inncorrect && (
        <div className="fixed top-5 left-1/2 z-[9999] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 sm:top-6 sm:right-6 sm:left-auto sm:w-[420px] sm:translate-x-0">
          <Alert
            severity="error"
            variant="filled"
            className="!rounded-2xl !px-4 !py-3 !shadow-[0_12px_35px_rgba(15,23,42,0.18)]"
          >
            <span className="text-sm font-medium">
              Please check your login credentials.
            </span>
          </Alert>
        </div>
      )}

      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl" />
      </div>

      {/* MAIN CARD */}
      <section className="relative w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-[0_25px_80px_rgba(15,23,42,0.12)] border border-slate-200/70">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] min-h-[620px]">
          {/* ================= LEFT BRAND PANEL ================= */}
          <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[#10172a] p-10 xl:p-12">
            {/* Decorative circles */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-white/10" />
            <div className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full border border-white/10" />

            <div className="relative z-10">
              {/* BRAND */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500 shadow-lg shadow-indigo-500/30">
                  <span className="text-lg font-black text-white">WF</span>
                </div>

                <div>
                  <h1 className="text-lg font-bold tracking-tight text-white">
                    WorkFlowOS
                  </h1>

                  <p className="text-[11px] text-slate-400">
                    Business Workflow Platform
                  </p>
                </div>
              </div>

              {/* ADMIN BADGE */}
              <div className="mt-20">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.9)]" />
                  Administrator Portal
                </div>

                <h2 className="max-w-sm text-4xl xl:text-5xl font-bold leading-[1.08] tracking-tight text-white">
                  Manage your
                  <span className="block text-indigo-400">workspace.</span>
                </h2>

                <p className="mt-6 max-w-sm text-sm leading-6 text-slate-400">
                  Access your administrative workspace to manage employees,
                  operations, attendance and business workflows.
                </p>
              </div>
            </div>

            {/* SECURITY INFO */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>

                <div>
                  <p className="text-xs font-semibold text-white">
                    Secure Administrator Access
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Protected workspace authentication
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT LOGIN PANEL ================= */}
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-16">
            {/* MOBILE BRAND */}
            <div className="mb-10 flex items-center justify-between lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10172a]">
                  <span className="text-sm font-black text-white">WF</span>
                </div>

                <div>
                  <h1 className="text-base font-bold text-slate-900">
                    WorkFlowOS
                  </h1>

                  <p className="text-[10px] text-slate-400">
                    Administrator Portal
                  </p>
                </div>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
            </div>

            {/* LOGIN CONTENT */}
            <div className="mx-auto w-full max-w-md">
              {/* HEADER */}
              <div className="mb-9">
                <div className="mb-5 inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 15v2" />
                    <path d="M7 10V7a5 5 0 0 1 10 0v3" />
                    <rect width="14" height="10" x="5" y="10" rx="2" />
                  </svg>
                  ADMIN ACCESS
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                  Welcome back
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Sign in to access your administrative workspace.
                </p>
              </div>

              {/* FORM */}
              <form className="space-y-5" onSubmit={handalSubmit}>
                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="admin-email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>

                    <input
                      id="admin-email"
                      type="email"
                      value={formData.email}
                      onChange={handleInput}
                      name="email"
                      placeholder="admin@workflowos.com"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="admin-password"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>

                    <a
                      href="/forgot-password"
                      className="text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          width="18"
                          height="11"
                          x="3"
                          y="11"
                          rx="2"
                          ry="2"
                        />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>

                    <input
                      id="admin-password"
                      type="password"
                      onChange={handleInput}
                      value={formData.password}
                      name="password"
                      placeholder="Enter your password"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>
                </div>

                {/* REMEMBER */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 accent-indigo-600"
                    />

                    <span className="text-xs font-medium text-slate-500">
                      Keep me signed in
                    </span>
                  </label>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Secure connection
                  </div>
                </div>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative mt-2 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#10172a] text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#18213b] hover:shadow-xl hover:shadow-indigo-900/10 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-90"
                >
                  {isLoading ? (
                    <>
                      {/* LOADING SPINNER */}
                      <svg
                        className="h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="opacity-25"
                        />

                        <path
                          d="M21 12a9 9 0 0 1-9 9"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>

                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign in to Admin Portal</span>

                      <svg
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* EMPLOYEE LOGIN */}
              <div className="my-8 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-100" />

                <span className="text-[11px] font-medium text-slate-400">
                  OR
                </span>

                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <a
                href="/"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h6v6" />
                  <path d="m10 14 11-11" />
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
                Sign in as Employee
              </a>

              {/* FOOTER */}
              <div className="mt-9 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-slate-400">
                <span>© 2026 WorkFlowOS</span>

                <span>•</span>

                <span>Admin Workspace</span>

                <span>•</span>

                <span>Secure Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
