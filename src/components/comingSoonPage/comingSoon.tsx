"use client";

import Lottie from "lottie-react";
import { ArrowLeft, Clock3, Sparkles } from "lucide-react";
import comingsoon from "@/assets/Coming-soon.json";

export default function Comingsoon() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#f6f8fc] px-4 py-8 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="pointer-events-none absolute bottom-[-150px] left-[-100px] h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="pointer-events-none absolute right-[-120px] top-1/3 h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-3xl" />

      {/* Main Container */}
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full items-center gap-8 overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8 md:p-10 lg:grid-cols-2 lg:p-12">
          {/* ================= LEFT CONTENT ================= */}
          <div className="order-2 flex flex-col justify-center text-center lg:order-1 lg:text-left">
            {/* Badge */}
            <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 lg:mx-0">
              <Sparkles size={14} className="text-blue-600" />

              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
                WorkFlowOS
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-[#030A24] sm:text-5xl lg:text-6xl">
              Something
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Great Is Coming.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-slate-500 sm:text-base sm:leading-7 lg:mx-0">
              We’re working behind the scenes to bring this feature to
              WorkFlowOS. It’s not ready just yet, but it’ll be worth the wait.
            </p>

            {/* Status */}
            <div className="mx-auto mt-7 flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 lg:mx-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                <Clock3 size={17} className="text-blue-600" />
              </div>

              <div className="text-left">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Current Status
                </p>

                <p className="text-sm font-bold text-[#030A24]">
                  Under Development
                </p>
              </div>

              <span className="ml-2 h-2.5 w-2.5 animate-pulse rounded-full bg-amber-400" />
            </div>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => window.history.back()}
              className="group mx-auto mt-7 flex w-fit items-center gap-2 rounded-xl bg-[#030A24] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#07133d] hover:shadow-xl lg:mx-0"
            >
              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back to Dashboard
            </button>
          </div>

          {/* ================= RIGHT ANIMATION ================= */}
          <div className="order-1 flex items-center justify-center lg:order-2">
            <div className="relative flex w-full max-w-[420px] items-center justify-center">
              {/* Animation Glow */}
              <div className="absolute h-52 w-52 rounded-full bg-blue-500/10 blur-3xl sm:h-64 sm:w-64" />

              {/* Animation Card */}
              <div className="relative flex w-full items-center justify-center rounded-[24px] border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-5 shadow-inner sm:p-8">
                <Lottie
                  animationData={comingsoon}
                  autoPlay
                  loop
                  className="h-auto w-full max-w-[320px] sm:max-w-[380px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
