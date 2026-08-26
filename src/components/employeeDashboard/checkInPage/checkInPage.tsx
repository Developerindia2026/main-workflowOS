"use client";

import axios from "axios";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  LogIn,
  LogOut,
  MapPin,
  Timer,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

/* =========================================================
   TYPES
========================================================= */

interface AttendanceRecord {
  _id?: string;
  date?: string;

  checkIn?: {
    time?: string;
    latitude?: number;
    longitude?: number;
  };

  checkOut?: {
    time?: string;
    latitude?: number;
    longitude?: number;
  };

  status?: string;
  workingTime?: number | string;
}

type ActionType = "checkIn" | "checkOut" | null;

/* =========================================================
   HELPERS
========================================================= */

const formatTime = (time?: string) => {
  if (!time) return "--:--";

  const date = new Date(time);

  if (Number.isNaN(date.getTime())) {
    return time;
  }

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDate = (date?: string) => {
  if (!date) return "Today";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString([], {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const calculateWorkingTime = (checkIn?: string, checkOut?: string): string => {
  if (!checkIn) return "0h 0m";

  const start = new Date(checkIn).getTime();

  if (Number.isNaN(start)) {
    return "0h 0m";
  }

  const end = checkOut ? new Date(checkOut).getTime() : Date.now();

  if (Number.isNaN(end) || end < start) {
    return "0h 0m";
  }

  const totalMinutes = Math.floor((end - start) / 60000);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

/* =========================================================
   PAGE
========================================================= */

export default function CheckInPage() {
  const [attendance, setAttendance] = useState<AttendanceRecord | null>(null);

  const [actionLoading, setActionLoading] = useState<ActionType>(null);

  const [locationLoading, setLocationLoading] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());

  const [errorMessage, setErrorMessage] = useState("");

  /* =========================================================
     LIVE CLOCK
  ========================================================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* =========================================================
     DERIVED STATES
  ========================================================= */

  const isCheckedIn = Boolean(attendance?.checkIn?.time);

  const isCheckedOut = Boolean(attendance?.checkOut?.time);

  const isWorking = isCheckedIn && !isCheckedOut;

  const workingTime = useMemo(() => {
    return calculateWorkingTime(
      attendance?.checkIn?.time,
      attendance?.checkOut?.time,
    );
  }, [attendance?.checkIn?.time, attendance?.checkOut?.time, currentTime]);

  /* =========================================================
     GET LOCATION
  ========================================================= */

  const getCurrentLocation = (): Promise<{
    latitude: number;
    longitude: number;
  }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser."));

        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    });
  };

  /* =========================================================
     CHECK IN
  ========================================================= */

  const handleCheckIn = async () => {
    if (isCheckedIn) return;

    try {
      setErrorMessage("");
      setActionLoading("checkIn");
      setLocationLoading(true);

      const location = await getCurrentLocation();

      setLocationLoading(false);

      const response = await axios.post("/api/attendence/checkIn", {
        latitude: location.latitude,
        longitude: location.longitude,
      });

      setAttendance(response.data.attendence);

      console.log("CHECK-IN SUCCESS:", response.data.attendence);
    } catch (error) {
      console.error("CHECK-IN ERROR:", error);

      setErrorMessage(
        "Unable to check in. Please allow location access and try again.",
      );
    } finally {
      setActionLoading(null);
      setLocationLoading(false);
    }
  };

  /* =========================================================
     CHECK OUT
  ========================================================= */

  const handleCheckOut = async () => {
    if (!isCheckedIn || isCheckedOut) return;

    try {
      setErrorMessage("");
      setActionLoading("checkOut");
      setLocationLoading(true);

      const location = await getCurrentLocation();

      setLocationLoading(false);

      const response = await axios.post("/api/attendence/checkout", {
        latitude: location.latitude,
        longitude: location.longitude,
      });

      setAttendance(response.data.attendence);

      console.log("CHECK-OUT SUCCESS:", response.data.attendence);
    } catch (error) {
      console.error("CHECK-OUT ERROR:", error);

      setErrorMessage(
        "Unable to check out. Please allow location access and try again.",
      );
    } finally {
      setActionLoading(null);
      setLocationLoading(false);
    }
  };

  /* =========================================================
     STATUS
  ========================================================= */

  const getStatus = () => {
    if (!attendance) {
      return {
        label: "Not Started",
        description: "Your workday has not started yet.",
        icon: Circle,
        className: "text-slate-500 bg-slate-100",
      };
    }

    if (isWorking) {
      return {
        label: "Currently Working",
        description: "Your attendance session is active.",
        icon: TrendingUp,
        className: "text-emerald-600 bg-emerald-50",
      };
    }

    if (isCheckedOut) {
      return {
        label: "Day Completed",
        description: "Your attendance has been completed.",
        icon: CheckCircle2,
        className: "text-blue-600 bg-blue-50",
      };
    }

    return {
      label: "Present",
      description: "Attendance marked successfully.",
      icon: BadgeCheck,
      className: "text-emerald-600 bg-emerald-50",
    };
  };

  const status = getStatus();

  const StatusIcon = status.icon;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="min-h-screen w-full bg-[#f6f7fb] px-4 py-5 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500">
              <CalendarDays size={16} />

              <span>
                {currentTime.toLocaleDateString([], {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Attendance
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your daily check-in and check-out.
            </p>
          </div>

          {/* LIVE CLOCK */}

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
              <Clock3 size={19} className="text-slate-600" />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Current Time
              </p>

              <p className="text-lg font-bold tracking-tight text-slate-900">
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </div>
          </div>
        </header>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {errorMessage && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            <XCircle size={20} className="mt-0.5 shrink-0" />

            <div>
              <p className="font-semibold">Attendance action failed</p>

              <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* ===================================================
              TODAY'S ATTENDANCE CARD
          =================================================== */}

          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {/* Decorative background */}

            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-50 blur-3xl" />

            <div className="relative">
              {/* Card Header */}

              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-400">
                    TODAY'S ATTENDANCE
                  </p>

                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                    {formatDate(attendance?.date)}
                  </h2>
                </div>

                <div
                  className={`flex w-fit items-center gap-2 rounded-full px-3 py-2 text-xs font-bold ${status.className}`}
                >
                  <StatusIcon size={15} />

                  {status.label}
                </div>
              </div>

              {/* Status Description */}

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
                {status.description}
              </p>

              {/* TIME GRID */}

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {/* Check In */}

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                      <LogIn size={18} className="text-emerald-600" />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        CHECK IN
                      </p>

                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {formatTime(attendance?.checkIn?.time)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Check Out */}

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                      <LogOut size={18} className="text-red-600" />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        CHECK OUT
                      </p>

                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {formatTime(attendance?.checkOut?.time)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Working Time */}

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                      <Timer size={18} className="text-blue-600" />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        WORKING TIME
                      </p>

                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {workingTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  ACTION BUTTONS
              ================================================= */}

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {/* CHECK IN BUTTON */}

                <button
                  type="button"
                  onClick={handleCheckIn}
                  disabled={actionLoading !== null || isCheckedIn}
                  className="group flex min-h-[58px] items-center justify-center gap-3 rounded-2xl bg-slate-950 px-5 font-semibold text-white shadow-lg shadow-slate-950/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
                >
                  {actionLoading === "checkIn" ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      {locationLoading
                        ? "Getting location..."
                        : "Checking in..."}
                    </>
                  ) : (
                    <>
                      <LogIn
                        size={19}
                        className="transition-transform group-hover:-translate-x-1"
                      />

                      {isCheckedIn ? "Checked In" : "Check In"}
                    </>
                  )}
                </button>

                {/* CHECK OUT BUTTON */}

                <button
                  type="button"
                  onClick={handleCheckOut}
                  disabled={
                    actionLoading !== null || !isCheckedIn || isCheckedOut
                  }
                  className="group flex min-h-[58px] items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  {actionLoading === "checkOut" ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />

                      {locationLoading
                        ? "Getting location..."
                        : "Checking out..."}
                    </>
                  ) : (
                    <>
                      <LogOut
                        size={19}
                        className="transition-transform group-hover:translate-x-1"
                      />

                      {isCheckedOut ? "Checked Out" : "Check Out"}
                    </>
                  )}
                </button>
              </div>

              {/* Location indicator */}

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                <MapPin size={14} />

                <span>Location verification is required for attendance.</span>
              </div>
            </div>
          </div>

          {/* ===================================================
              SUMMARY CARD
          =================================================== */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <TrendingUp size={20} className="text-blue-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-400">
                  ATTENDANCE SUMMARY
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-950">
                  Today&apos;s Overview
                </h2>
              </div>
            </div>

            <div className="mt-7 space-y-3">
              {/* Status */}

              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <BadgeCheck size={18} className="text-slate-500" />

                  <span className="text-sm font-medium text-slate-600">
                    Status
                  </span>
                </div>

                <span className="text-sm font-bold text-slate-900">
                  {status.label}
                </span>
              </div>

              {/* Check In */}

              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <LogIn size={18} className="text-emerald-500" />

                  <span className="text-sm font-medium text-slate-600">
                    Check In
                  </span>
                </div>

                <span className="text-sm font-bold text-slate-900">
                  {formatTime(attendance?.checkIn?.time)}
                </span>
              </div>

              {/* Check Out */}

              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <LogOut size={18} className="text-red-500" />

                  <span className="text-sm font-medium text-slate-600">
                    Check Out
                  </span>
                </div>

                <span className="text-sm font-bold text-slate-900">
                  {formatTime(attendance?.checkOut?.time)}
                </span>
              </div>

              {/* Working */}

              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <Timer size={18} className="text-blue-500" />

                  <span className="text-sm font-medium text-slate-600">
                    Working Time
                  </span>
                </div>

                <span className="text-sm font-bold text-slate-900">
                  {workingTime}
                </span>
              </div>
            </div>

            {/* Bottom message */}

            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-semibold text-blue-900">
                {isWorking
                  ? "Your work session is active."
                  : isCheckedOut
                    ? "Great work today! Your attendance is complete."
                    : "Ready to start your workday?"}
              </p>

              <p className="mt-1 text-xs leading-5 text-blue-700">
                {isWorking
                  ? "Remember to check out when your workday is finished."
                  : isCheckedOut
                    ? "Your check-in and check-out have been recorded."
                    : "Check in to start recording your attendance."}
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            ATTENDANCE HISTORY
        ===================================================== */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-400">RECORDS</p>

              <h2 className="mt-1 text-xl font-bold text-slate-950">
                Attendance History
              </h2>
            </div>

            <button
              type="button"
              className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <CalendarDays size={16} />
              View Calendar
            </button>
          </div>

          {/* DESKTOP TABLE */}

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Date
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Check In
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Check Out
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Working Time
                  </th>
                </tr>
              </thead>

              <tbody>
                {attendance ? (
                  <tr className="border-b border-slate-100 last:border-0">
                    <td className="px-6 py-5 text-sm font-semibold text-slate-800">
                      {formatDate(attendance.date)}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {formatTime(attendance.checkIn?.time)}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {formatTime(attendance.checkOut?.time)}
                    </td>

                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                        <CheckCircle2 size={14} />

                        {attendance.status || "Present"}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm font-semibold text-slate-800">
                      {workingTime}
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                          <CalendarDays size={21} className="text-slate-400" />
                        </div>

                        <p className="mt-4 font-semibold text-slate-700">
                          No attendance recorded today
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          Your attendance record will appear here after you
                          check in.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE RECORD */}

          <div className="space-y-3 p-4 md:hidden">
            {attendance ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {formatDate(attendance.date)}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Attendance Record
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                    {attendance.status || "Present"}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Check In
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {formatTime(attendance.checkIn?.time)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Check Out
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {formatTime(attendance.checkOut?.time)}
                    </p>
                  </div>

                  <div className="col-span-2 rounded-xl bg-white p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Working Time
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {workingTime}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-10 text-center">
                <CalendarDays size={22} className="mx-auto text-slate-400" />

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  No attendance recorded today
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Check in to create your attendance record.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
