"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface attendenceProp {
  checkIn: {
    time: string;
  };
  checkOut: {
    time: string;
  };
  date: string;
  status: string;
  workingTime: string;
}

export default function Checkin() {
  const [attendence, setAttendence] = useState<attendenceProp[]>([]);
  const [alert, setAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [action, setAction] = useState<"checkin" | "checkout" | null>(null);
  const [history, setHistory] = useState<attendenceProp[]>([]);
  const [click, setClick] = useState<boolean>(false);

  const getHistory = async () => {
    try {
      const response = await axios.get(`/api/attendence/history`);
      setHistory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAttendence = async () => {
    try {
      const response = await axios.get(`/api/attendence/today`);
      console.log(response.data.data);
      setAttendence(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const CheckinSend = async () => {
    setLoading(true);
    setAction("checkin");
    setClick(true);

    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;

            await axios.post(`/api/attendence/checkIn`, {
              longitude,
              latitude,
            });

            setAlert(true);
            await getAttendence();
            await getHistory();

            setTimeout(() => {
              setAlert(false);
            }, 3000);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
            setAction(null);
          }
        },
        (error) => {
          console.log(error);
          setLoading(false);
          setAction(null);
        },
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      setAction(null);
    }
  };

  const checkoutSend = async () => {
    setLoading(true);
    setAction("checkout");

    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;

            await axios.post(`/api/attendence/checkout`, {
              latitude,
              longitude,
            });
            await getAttendence();
            await getHistory();

            setAlert(true);

            setTimeout(() => {
              setAlert(false);
            }, 3000);

            setClick(false);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
            setAction(null);
          }
        },
        (error) => {
          console.log(error);
          setLoading(false);
          setAction(null);
        },
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      setAction(null);
    }
  };

  useEffect(() => {
    getAttendence();
    getHistory();
  }, []);

  const todayRecord = attendence[0];

  const formatDate = (date?: string) => {
    if (!date) return "--";

    try {
      return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "--";
    }
  };

  const formatWorkingTime = (time?: string) => {
    if (!time) return "--";

    const milliseconds = Number(time);

    if (isNaN(milliseconds)) return "--";

    const totalSeconds = Math.floor(milliseconds / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0",
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const formatTime = (time?: string) => {
    if (!time) return "--";

    try {
      return new Date(time).toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "--";
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      {/* Success Alert */}
      {alert && (
        <div className="fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-sm animate-[fadeIn_0.3s_ease-out]">
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            className="rounded-xl shadow-lg"
          >
            Attendance successfully updated
          </Alert>
        </div>
      )}

      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600">
                <AccessTimeIcon sx={{ fontSize: 15 }} />
                Attendance
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                Check In / Check Out
              </h1>

              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                Manage your daily attendance and track your working hours.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <CalendarTodayIcon sx={{ fontSize: 17 }} />
              <span>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Attendance Action Card */}
        <div className="mb-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <LocationOnIcon sx={{ fontSize: 21 }} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Mark Attendance
                </h2>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Your location will be used to verify your attendance.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Check In Button */}
              <button
                type="button"
                onClick={CheckinSend}
                disabled={click || !!todayRecord?.checkIn?.time}
                className="group relative flex min-h-[110px] items-center justify-center gap-4 overflow-hidden rounded-2xl bg-emerald-600 px-6 py-5 text-left text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  {action === "checkin" && loading ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <LoginIcon sx={{ fontSize: 26 }} />
                  )}
                </div>

                <div>
                  <p className="text-base font-bold sm:text-lg">
                    {action === "checkin" && loading
                      ? "Checking In..."
                      : "Check In"}
                  </p>

                  <p className="mt-1 text-xs text-emerald-100 sm:text-sm">
                    Start your workday
                  </p>
                </div>
              </button>

              {/* Check Out Button */}
              <button
                type="button"
                onClick={checkoutSend}
                disabled={click || !!todayRecord?.checkIn?.time}
                className="group relative flex min-h-[110px] items-center justify-center gap-4 overflow-hidden rounded-2xl bg-slate-900 px-6 py-5 text-left text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  {action === "checkout" && loading ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <LogoutIcon sx={{ fontSize: 26 }} />
                  )}
                </div>

                <div>
                  <p className="text-base font-bold sm:text-lg">
                    {action === "checkout" && loading
                      ? "Checking Out..."
                      : "Check Out"}
                  </p>

                  <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                    End your workday
                  </p>
                </div>
              </button>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500 sm:text-sm">
              <LocationOnIcon
                sx={{ fontSize: 17 }}
                className="mt-0.5 shrink-0"
              />
              <p>
                Please allow location access when your browser asks for
                permission.
              </p>
            </div>
          </div>
        </div>

        {/* Attendance Records */}
        {/* Attendance History */}
        <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Section Header */}
          <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <WorkHistoryIcon sx={{ fontSize: 19 }} />
                  </div>

                  <h2 className="text-lg font-bold tracking-tight text-slate-900">
                    Attendance History
                  </h2>
                </div>

                <p className="mt-2 text-sm leading-5 text-slate-500">
                  View your previous attendance records and working hours.
                </p>
              </div>

              {/* Record Count */}
              <div className="flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                {history?.length} {history?.length === 1 ? "Record" : "Records"}
              </div>
            </div>
          </div>

          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Date
                  </th>

                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Check In
                  </th>

                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Check Out
                  </th>

                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Working Hours
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {history.length > 0 ? (
                  history.map((data, index) => {
                    const isPresent = data.status?.toLowerCase() === "present";

                    return (
                      <tr
                        key={`${data.date}-${index}`}
                        className="group transition-colors hover:bg-slate-50/70"
                      >
                        {/* Date */}
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
                              <CalendarTodayIcon sx={{ fontSize: 16 }} />
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                {formatDate(data.date)}
                              </p>

                              <p className="mt-0.5 text-[11px] text-slate-400">
                                Attendance day
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Check In */}
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />

                            <span className="text-sm font-medium text-slate-700">
                              {formatTime(data.checkIn?.time)}
                            </span>
                          </div>
                        </td>

                        {/* Check Out */}
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-rose-500" />

                            <span className="text-sm font-medium text-slate-700">
                              {formatTime(data.checkOut?.time)}
                            </span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                              isPresent
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                isPresent ? "bg-emerald-500" : "bg-slate-400"
                              }`}
                            />

                            {data.status || "Unknown"}
                          </span>
                        </td>

                        {/* Working Hours */}
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className="text-sm font-bold text-slate-800">
                            {formatWorkingTime(data.workingTime)}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-16">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                          <WorkHistoryIcon sx={{ fontSize: 25 }} />
                        </div>

                        <h3 className="mt-4 text-sm font-bold text-slate-800">
                          No attendance history
                        </h3>

                        <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                          Your previous attendance records will appear here once
                          you start checking in.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE CARDS ================= */}
          <div className="divide-y divide-slate-100 md:hidden">
            {history.length > 0 ? (
              history?.map((data, index) => {
                const isPresent = data.status?.toLowerCase() === "present";

                return (
                  <div
                    key={`${data.date}-${index}`}
                    className="p-5 transition-colors hover:bg-slate-50/60"
                  >
                    {/* Card Header */}
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                          <CalendarTodayIcon sx={{ fontSize: 18 }} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-900">
                            {formatDate(data.date)}
                          </p>

                          <p className="mt-0.5 text-[11px] text-slate-400">
                            Attendance record
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          isPresent
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isPresent ? "bg-emerald-500" : "bg-slate-400"
                          }`}
                        />

                        {data.status || "Unknown"}
                      </span>
                    </div>

                    {/* Time Details */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Check In */}
                      <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
                        <div className="mb-2 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Check In
                          </p>
                        </div>

                        <p className="text-sm font-bold text-slate-800">
                          {formatTime(data.checkIn?.time)}
                        </p>
                      </div>

                      {/* Check Out */}
                      <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
                        <div className="mb-2 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />

                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Check Out
                          </p>
                        </div>

                        <p className="text-sm font-bold text-slate-800">
                          {formatTime(data.checkOut?.time)}
                        </p>
                      </div>

                      {/* Working Hours */}
                      <div className="col-span-2 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3.5">
                        <div className="mb-2 flex items-center gap-1.5">
                          <WorkHistoryIcon
                            sx={{ fontSize: 14 }}
                            className="text-indigo-500"
                          />

                          <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                            Working Hours
                          </p>
                        </div>

                        <p className="text-sm font-bold text-indigo-700">
                          {formatWorkingTime(data.workingTime)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-5 py-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <WorkHistoryIcon sx={{ fontSize: 24 }} />
                </div>

                <h3 className="mt-4 text-sm font-bold text-slate-800">
                  No attendance history
                </h3>

                <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-slate-400">
                  Your attendance records will appear here once you start
                  checking in.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
