"use client";

interface getAnnocuementProp {
  title: string;
  categtory: string;
  priority: string;
  details: string;
}

import Lottie from "lottie-react";
import NotificationAnimation from "@/assets/Glassmorphism-Document-Lottie-Animation.json";
import axios from "axios";
import { useState, useEffect } from "react";

export default function NotificationPage() {
  const [annoucement, setAnnoucement] = useState<getAnnocuementProp[]>([]);
  const [loading, setLoading] = useState(true);

  const GetAnnoucement = async () => {
    try {
      const response = await axios.get("/api/annoucement/render");

      setAnnoucement(response.data.data || []);
    } catch (error) {
      console.log(error);
      setAnnoucement([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetAnnoucement();
  }, []);

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

        {/* Content */}
        <section className="flex-1">
          {/* Loading */}
          {loading ? (
            <div className="flex min-h-[500px] items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
            </div>
          ) : annoucement.length > 0 ? (
            /* =========================
               ANNOUNCEMENTS AVAILABLE
            ========================== */
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {annoucement.map((item, index) => (
                <div
                  key={index}
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    shadow-[0_8px_30px_rgba(15,23,42,0.04)]
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_15px_40px_rgba(15,23,42,0.08)]
                  "
                >
                  {/* Category + Priority */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                      {item.categtory}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.priority === "High"
                          ? "bg-red-50 text-red-600"
                          : item.priority === "Medium"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="mt-5 text-lg font-semibold text-[#030A24]">
                    {item.title}
                  </h2>

                  {/* Details */}
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {item.details}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            /* =========================
               NO ANNOUNCEMENTS
            ========================== */
            <div className="flex min-h-[calc(100vh-180px)] items-center justify-center">
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
                  announcements, requests, and other activities will appear
                  here.
                </p>

                {/* Status Badge */}
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  You're all caught up
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
