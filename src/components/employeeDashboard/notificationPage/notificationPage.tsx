"use client";

import Lottie from "lottie-react";
import NotificationAnimation from "@/assets/Glassmorphism-Document-Lottie-Animation.json";

export default function NotificationPage() {
  return (
    <main className="min-h-screen w-full bg-[#F8FAFC] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-7xl flex-col">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              🔔
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight text-[#030A24] sm:text-2xl">
                Notifications
              </h1>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Stay updated with your latest activities and company updates.
              </p>
            </div>
          </div>
        </div>

        {/* Notification Container */}
        <section className="flex flex-1 items-center justify-center">
          <div
            className="
              flex
              w-full
              max-w-2xl
              flex-col
              items-center
              justify-center
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-6
              py-12
              text-center
              shadow-[0_8px_30px_rgba(15,23,42,0.04)]
              sm:px-10
              sm:py-14
              lg:px-16
              lg:py-16
            "
          >
            {/* Lottie */}
            <div className="mb-5 h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56">
              <Lottie
                animationData={NotificationAnimation}
                autoplay
                loop
                className="h-full w-full"
              />
            </div>

            {/* Empty State */}
            <h2 className="text-lg font-semibold text-[#030A24] sm:text-xl">
              No New Notifications
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              You're all caught up! New notifications about tasks,
              announcements, requests, and other activities will appear here.
            </p>

            {/* Status Badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              You're all caught up
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
