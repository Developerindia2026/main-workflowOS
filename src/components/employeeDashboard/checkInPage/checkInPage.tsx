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

  const getAttendence = async () => {
    try {
      const response = await axios.get(`/api/attendence/today`);
      console.log(response.data.data);
      setAttendence(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const CheckinSend = async () => {
    setLoading(true);
    setAction("checkin");

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

            setAlert(true);

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

  useEffect(() => {
    getAttendence();
  }, []);

  const todayRecord = attendence[0];

  const formatTime = (time?: string) => {
    if (!time) return "--";

    try {
      return new Date(time).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "--";
    }
  };

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

    try {
      return new Date(time).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
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

        {/* Today's Overview */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Check In */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <LoginIcon sx={{ fontSize: 21 }} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                CHECK IN
              </span>
            </div>

            <p className="text-2xl font-bold text-slate-900">
              {formatTime(todayRecord?.checkIn?.time)}
            </p>

            <p className="mt-1 text-sm text-slate-500">Today's check-in time</p>
          </div>

          {/* Check Out */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <LogoutIcon sx={{ fontSize: 21 }} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                CHECK OUT
              </span>
            </div>

            <p className="text-2xl font-bold text-slate-900">
              {formatTime(todayRecord?.checkOut?.time)}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Today's check-out time
            </p>
          </div>

          {/* Working Hours */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <WorkHistoryIcon sx={{ fontSize: 21 }} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                WORKING HOURS
              </span>
            </div>

            <p className="text-2xl font-bold text-slate-900">
              {formatWorkingTime(todayRecord?.workingTime)}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Total working duration
            </p>
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
                disabled={loading}
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
                disabled={loading}
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
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Section Header */}
          <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Attendance Records
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your attendance history and working hours.
              </p>
            </div>

            <div className="w-fit rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
              {attendence.length}{" "}
              {attendence.length === 1 ? "Record" : "Records"}
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Date
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Check In
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Check Out
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Working Hours
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {attendence.length > 0 ? (
                  attendence.map((data, index) => (
                    <tr
                      key={`${data.date}-${index}`}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">
                        {formatDate(data.date)}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        {formatTime(data.checkIn?.time)}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        {formatTime(data.checkOut?.time)}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            data.status?.toLowerCase() === "present"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {data.status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">
                        {formatWorkingTime(data.workingTime)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      No attendance records available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-slate-100 md:hidden">
            {attendence.length > 0 ? (
              attendence.map((data, index) => (
                <div
                  key={`${data.date}-${index}`}
                  className="p-5 transition hover:bg-slate-50/70"
                >
                  {/* Card Top */}
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {formatDate(data.date)}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Attendance record
                      </p>
                    </div>

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        data.status?.toLowerCase() === "present"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {data.status}
                    </span>
                  </div>

                  {/* Card Details */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="mb-1 text-xs font-medium text-slate-400">
                        CHECK IN
                      </p>

                      <p className="text-sm font-semibold text-slate-800">
                        {formatTime(data.checkIn?.time)}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="mb-1 text-xs font-medium text-slate-400">
                        CHECK OUT
                      </p>

                      <p className="text-sm font-semibold text-slate-800">
                        {formatTime(data.checkOut?.time)}
                      </p>
                    </div>

                    <div className="col-span-2 rounded-xl bg-indigo-50 p-3">
                      <p className="mb-1 text-xs font-medium text-indigo-400">
                        WORKING HOURS
                      </p>

                      <p className="text-sm font-semibold text-indigo-700">
                        {formatWorkingTime(data.workingTime)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-5 py-12 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <AccessTimeIcon className="text-slate-400" />
                </div>

                <p className="text-sm font-medium text-slate-700">
                  No attendance records
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Your attendance records will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
