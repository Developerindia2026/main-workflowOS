"use client";

import {
  BadgeCheck,
  CalendarDays,
  Clock3,
  LogIn,
  LogOut,
  Timer,
  TrendingUp,
  CheckCircle2,
  Circle,
} from "lucide-react";

const attendanceHistory = [
  {
    date: "Today",
    checkIn: "09:12 AM",
    checkOut: "--",
    worked: "04h 23m",
    status: "Working",
  },
  {
    date: "17 Aug 2026",
    checkIn: "09:05 AM",
    checkOut: "06:14 PM",
    worked: "09h 09m",
    status: "Completed",
  },
  {
    date: "16 Aug 2026",
    checkIn: "09:18 AM",
    checkOut: "06:02 PM",
    worked: "08h 44m",
    status: "Completed",
  },
  {
    date: "15 Aug 2026",
    checkIn: "09:10 AM",
    checkOut: "06:21 PM",
    worked: "09h 11m",
    status: "Completed",
  },
  {
    date: "14 Aug 2026",
    checkIn: "09:02 AM",
    checkOut: "05:58 PM",
    worked: "08h 56m",
    status: "Completed",
  },
];

export default function CheckInPage() {
  return (
    <div className="min-h-screen bg-[#f6f8fc] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* ================= HEADER ================= */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#030A24]">
                <Clock3 size={16} className="text-white" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Attendance
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#030A24] sm:text-3xl lg:text-4xl">
              Check-In Management
            </h1>

            <p className="mt-1 max-w-xl text-sm text-slate-500 sm:text-base">
              Track your daily attendance, working hours and check-in history.
            </p>
          </div>

          {/* Date */}
          <div className="flex w-fit items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <CalendarDays size={19} className="text-slate-500" />

            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Today
              </p>

              <p className="text-sm font-semibold text-[#030A24]">
                18 August 2026
              </p>
            </div>
          </div>
        </div>

        {/* ================= STATUS CARD ================= */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
          <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                <span className="absolute h-3 w-3 animate-pulse rounded-full bg-emerald-500" />
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold text-[#030A24]">
                    You are currently working
                  </h2>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                    CHECKED IN
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Checked in today at{" "}
                  <span className="font-semibold text-slate-700">09:12 AM</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
              <div className="rounded-xl bg-slate-50 px-5 py-3">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Working Time
                </p>
                <p className="mt-1 text-lg font-bold text-[#030A24]">04h 23m</p>
              </div>

              <div className="rounded-xl bg-slate-50 px-5 py-3">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Expected
                </p>
                <p className="mt-1 text-lg font-bold text-[#030A24]">08h 00m</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ACTION SECTION ================= */}
        <div className="mb-7 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* CHECK IN */}
          <button
            type="button"
            className="group relative overflow-hidden rounded-2xl border border-emerald-200 bg-white text-left shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_15px_35px_rgba(16,185,129,0.12)]"
          >
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-emerald-50 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative flex items-center justify-between p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-transform duration-300 group-hover:scale-105">
                  <LogIn size={26} strokeWidth={2.2} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-600">
                    Start Work
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-[#030A24]">
                    Check-In
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Mark your arrival for today
                  </p>
                </div>
              </div>

              <BadgeCheck
                size={25}
                className="text-emerald-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-500"
              />
            </div>
          </button>

          {/* CHECK OUT */}
          <button
            type="button"
            className="group relative overflow-hidden rounded-2xl border border-rose-200 bg-white text-left shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-rose-300 hover:shadow-[0_15px_35px_rgba(244,63,94,0.10)]"
          >
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-rose-50 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative flex items-center justify-between p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-lg shadow-rose-500/20 transition-transform duration-300 group-hover:scale-105">
                  <LogOut size={26} strokeWidth={2.2} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-rose-600">
                    End Work
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-[#030A24]">
                    Check-Out
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Mark your departure for today
                  </p>
                </div>
              </div>

              <LogOut
                size={24}
                className="text-rose-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-rose-500"
              />
            </div>
          </button>
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <Clock3 size={19} className="text-blue-600" />
              </div>

              <span className="text-xs font-semibold text-emerald-600">
                +12%
              </span>
            </div>

            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
              Today
            </p>

            <p className="mt-1 text-2xl font-bold text-[#030A24]">04h 23m</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
              <Timer size={19} className="text-violet-600" />
            </div>

            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
              This Week
            </p>

            <p className="mt-1 text-2xl font-bold text-[#030A24]">36h 42m</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <CheckCircle2 size={19} className="text-emerald-600" />
            </div>

            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
              Attendance
            </p>

            <p className="mt-1 text-2xl font-bold text-[#030A24]">96.4%</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <TrendingUp size={19} className="text-amber-600" />
            </div>

            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
              Avg. Hours
            </p>

            <p className="mt-1 text-2xl font-bold text-[#030A24]">08h 47m</p>
          </div>
        </div>

        {/* ================= HISTORY ================= */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
          {/* History Header */}
          <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="text-lg font-bold text-[#030A24] sm:text-xl">
                Attendance History
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your recent check-in and check-out records
              </p>
            </div>

            <button
              type="button"
              className="w-fit rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              View All
            </button>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Check-In
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Check-Out
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Working Hours
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {attendanceHistory.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50/60"
                  >
                    <td className="px-6 py-5">
                      <span className="text-sm font-semibold text-[#030A24]">
                        {item.date}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-sm font-medium text-slate-700">
                          {item.checkIn}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-rose-400" />
                        <span className="text-sm font-medium text-slate-700">
                          {item.checkOut}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="text-sm font-semibold text-[#030A24]">
                        {item.worked}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      {item.status === "Working" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                          Working
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                          <CheckCircle2 size={13} />
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-slate-100 md:hidden">
            {attendanceHistory.map((item, index) => (
              <div key={index} className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#030A24]">
                      {item.date}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Attendance record
                    </p>
                  </div>

                  {item.status === "Working" ? (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                      Working
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                      Completed
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="mb-1 flex items-center gap-1.5">
                      <LogIn size={14} className="text-emerald-500" />

                      <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        Check-In
                      </span>
                    </div>

                    <p className="text-sm font-bold text-slate-700">
                      {item.checkIn}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="mb-1 flex items-center gap-1.5">
                      <LogOut size={14} className="text-rose-500" />

                      <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        Check-Out
                      </span>
                    </div>

                    <p className="text-sm font-bold text-slate-700">
                      {item.checkOut}
                    </p>
                  </div>

                  <div className="col-span-2 flex items-center justify-between rounded-xl border border-slate-100 px-3 py-3">
                    <div className="flex items-center gap-2">
                      <Timer size={15} className="text-slate-400" />

                      <span className="text-xs font-medium text-slate-500">
                        Working Hours
                      </span>
                    </div>

                    <span className="text-sm font-bold text-[#030A24]">
                      {item.worked}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= FOOTER INFO ================= */}
        <div className="mt-5 flex items-center justify-center gap-2 pb-6 text-center text-xs text-slate-400">
          <Circle size={7} className="fill-emerald-500 text-emerald-500" />
          Attendance data is automatically synced with WorkFlowOS
        </div>
      </div>
    </div>
  );
}
