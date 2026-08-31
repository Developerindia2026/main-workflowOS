"use client";

import axios, { AxiosError } from "axios";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  LogIn,
  LogOut,
  MapPin,
  RefreshCw,
  Timer,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

/* =========================================================
   TYPES
========================================================= */

interface AttendanceLocation {
  latitude?: number;
  longitude?: number;
}

interface CheckInData extends AttendanceLocation {
  time?: string;
}

interface CheckOutData extends AttendanceLocation {
  time?: string;
}

interface AttendanceRecord {
  _id?: string;

  date?: string;

  employee?: {
    _id?: string;
    username?: string;
    email?: string;
    department?: string;
    designation?: string;
  };

  checkIn?: CheckInData;

  checkOut?: CheckOutData;

  status?: string;

  workingTime?: number | string;
}

interface AttendanceApiResponse {
  attendence?: AttendanceRecord | null;
  attendance?: AttendanceRecord | null;
}

type ActionType = "checkIn" | "checkOut" | "refresh" | null;

/* =========================================================
   API ENDPOINTS
========================================================= */

/*
  IMPORTANT:

  This endpoint must return ONLY the logged-in employee's
  attendance for TODAY.

  Example response:

  {
    attendence: {
      _id: "...",
      employee: {...},
      checkIn: {
        time: "2026-08-27T07:10:02.004Z"
      },
      checkOut: null,
      status: "Present"
    }
  }
*/

const MY_TODAY_API = "/api/attendence/my-today";

const CHECK_IN_API = "/api/attendence/checkIn";

const CHECK_OUT_API = "/api/attendence/checkout";

/* =========================================================
   DATE / TIME HELPERS
========================================================= */

const IST_OPTIONS: Intl.DateTimeFormatOptions = {
  timeZone: "Asia/Kolkata",
};

/* ---------------------------------------------------------
   Format Time
--------------------------------------------------------- */

const formatTime = (time?: string) => {
  if (!time) {
    return "--:--";
  }

  const date = new Date(time);

  if (Number.isNaN(date.getTime())) {
    return "--:--";
  }

  return date.toLocaleTimeString("en-IN", {
    ...IST_OPTIONS,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

/* ---------------------------------------------------------
   Format Date
--------------------------------------------------------- */

const formatDate = (date?: string) => {
  const value = date ? new Date(date) : new Date();

  if (Number.isNaN(value.getTime())) {
    return "Today";
  }

  return value.toLocaleDateString("en-IN", {
    ...IST_OPTIONS,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/* ---------------------------------------------------------
   Live Current Time
--------------------------------------------------------- */

const formatCurrentTime = (date: Date) => {
  return date.toLocaleTimeString("en-IN", {
    ...IST_OPTIONS,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

/* =========================================================
   WORKING TIME
========================================================= */

const calculateWorkingTime = (
  checkIn?: string,
  checkOut?: string,
  currentTime: number = Date.now(),
) => {
  if (!checkIn) {
    return "0h 0m";
  }

  const start = new Date(checkIn).getTime();

  if (Number.isNaN(start)) {
    return "0h 0m";
  }

  let end = currentTime;

  if (checkOut) {
    end = new Date(checkOut).getTime();
  }

  if (Number.isNaN(end) || end < start) {
    return "0h 0m";
  }

  const totalMinutes = Math.floor((end - start) / 60000);

  const hours = Math.floor(totalMinutes / 60);

  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

/* =========================================================
   API RESPONSE HELPER
========================================================= */

const extractAttendance = (
  data: AttendanceApiResponse,
): AttendanceRecord | null => {
  return data.attendence ?? data.attendance ?? null;
};

/* =========================================================
   PAGE
========================================================= */

export default function CheckInPage() {
  /* =======================================================
     STATE
  ======================================================= */

  const [attendance, setAttendance] = useState<AttendanceRecord | null>(null);

  const [initialLoading, setInitialLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState<ActionType>(null);

  const [locationLoading, setLocationLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [currentTime, setCurrentTime] = useState(new Date());

  /* =======================================================
     DERIVED STATES
  ======================================================= */

  const isCheckedIn = Boolean(attendance?.checkIn?.time);

  const isCheckedOut = Boolean(attendance?.checkOut?.time);

  const isWorking = isCheckedIn && !isCheckedOut;

  /* =======================================================
     WORKING TIME
  ======================================================= */

  const workingTime = useMemo(() => {
    return calculateWorkingTime(
      attendance?.checkIn?.time,
      attendance?.checkOut?.time,
      currentTime.getTime(),
    );
  }, [attendance?.checkIn?.time, attendance?.checkOut?.time, currentTime]);

  /* =======================================================
     LIVE CLOCK
  ======================================================= */

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  /* =======================================================
     FETCH TODAY'S ATTENDANCE
  ======================================================= */

  const fetchTodayAttendance = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) {
        setActionLoading("refresh");
      }

      const response = await axios.get<AttendanceApiResponse>(MY_TODAY_API, {
        /*
                Prevent browser/proxy from giving us
                an unwanted cached response.
              */
        params: {
          _: Date.now(),
        },
      });

      const data = extractAttendance(response.data);

      setAttendance(data);
    } catch (error) {
      const axiosError = error as AxiosError;

      /*
          404 can simply mean:
          "employee hasn't checked in today."
        */
      if (axiosError.response?.status === 404) {
        setAttendance(null);
      } else {
        console.error("FETCH TODAY ATTENDANCE ERROR:", error);
      }
    } finally {
      if (showLoader) {
        setActionLoading(null);
      }
    }
  }, []);

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    const loadAttendance = async () => {
      setInitialLoading(true);

      await fetchTodayAttendance();

      setInitialLoading(false);
    };

    loadAttendance();
  }, [fetchTodayAttendance]);

  /* =======================================================
     LOCATION
  ======================================================= */

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

  /* =======================================================
     LOCATION ERROR
  ======================================================= */

  const getLocationErrorMessage = (error: unknown) => {
    if (error instanceof GeolocationPositionError) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          return "Location permission was denied. Please allow location access and try again.";

        case error.POSITION_UNAVAILABLE:
          return "Your current location could not be detected. Please try again.";

        case error.TIMEOUT:
          return "Location request timed out. Please try again.";

        default:
          return "Unable to get your current location.";
      }
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "Something went wrong. Please try again.";
  };

  /* =======================================================
     CHECK IN
  ======================================================= */

  const handleCheckIn = async () => {
    /*
      Protection 1:
      Don't check in if already checked in.
    */

    if (isCheckedIn) {
      return;
    }

    /*
      Protection 2:
      Don't allow two actions simultaneously.
    */

    if (actionLoading !== null) {
      return;
    }

    try {
      setErrorMessage("");
      setSuccessMessage("");

      setActionLoading("checkIn");

      setLocationLoading(true);

      /* -----------------------------------------------
         GET CURRENT LOCATION
      ----------------------------------------------- */

      const location = await getCurrentLocation();

      setLocationLoading(false);

      /* -----------------------------------------------
         SEND CHECK-IN
      ----------------------------------------------- */

      await axios.post(CHECK_IN_API, {
        latitude: location.latitude,

        longitude: location.longitude,
      });

      /*
        IMPORTANT:

        Don't depend only on POST response.

        Fetch the latest record from database.
      */

      await fetchTodayAttendance();

      setSuccessMessage("Check-in recorded successfully.");
    } catch (error) {
      console.error("CHECK-IN ERROR:", error);

      /*
        Important recovery:

        Backend might save the record successfully
        but frontend could still receive an error.

        So check DB one more time.
      */

      try {
        const response = await axios.get<AttendanceApiResponse>(MY_TODAY_API, {
          params: {
            _: Date.now(),
          },
        });

        const existingAttendance = extractAttendance(response.data);

        if (existingAttendance?.checkIn?.time) {
          setAttendance(existingAttendance);

          setSuccessMessage("Check-in was recorded successfully.");

          setErrorMessage("");

          return;
        }
      } catch (recoveryError) {
        console.error("CHECK-IN RECOVERY ERROR:", recoveryError);
      }

      setErrorMessage(getLocationErrorMessage(error));
    } finally {
      setActionLoading(null);

      setLocationLoading(false);
    }
  };

  /* =======================================================
     CHECK OUT
  ======================================================= */

  const handleCheckOut = async () => {
    /*
      Can't checkout without check-in.
    */

    if (!isCheckedIn) {
      return;
    }

    /*
      Can't checkout twice.
    */

    if (isCheckedOut) {
      return;
    }

    /*
      Prevent duplicate request.
    */

    if (actionLoading !== null) {
      return;
    }

    try {
      setErrorMessage("");
      setSuccessMessage("");

      setActionLoading("checkOut");

      setLocationLoading(true);

      /* -----------------------------------------------
         GET LOCATION
      ----------------------------------------------- */

      const location = await getCurrentLocation();

      setLocationLoading(false);

      /* -----------------------------------------------
         SEND CHECKOUT
      ----------------------------------------------- */

      await axios.post(CHECK_OUT_API, {
        latitude: location.latitude,

        longitude: location.longitude,
      });

      /*
        Fetch fresh DB record.

        This gives us:
        checkIn
        checkOut
        status
        etc.
      */

      await fetchTodayAttendance();

      setSuccessMessage("Check-out recorded successfully.");
    } catch (error) {
      console.error("CHECK-OUT ERROR:", error);

      /*
        Recovery check.

        Maybe DB saved checkout even though
        frontend received an error.
      */

      try {
        const response = await axios.get<AttendanceApiResponse>(MY_TODAY_API, {
          params: {
            _: Date.now(),
          },
        });

        const existingAttendance = extractAttendance(response.data);

        if (existingAttendance?.checkOut?.time) {
          setAttendance(existingAttendance);

          setSuccessMessage("Check-out was recorded successfully.");

          setErrorMessage("");

          return;
        }
      } catch (recoveryError) {
        console.error("CHECK-OUT RECOVERY ERROR:", recoveryError);
      }

      setErrorMessage(getLocationErrorMessage(error));
    } finally {
      setActionLoading(null);

      setLocationLoading(false);
    }
  };

  /* =======================================================
     STATUS
  ======================================================= */

  const getStatus = () => {
    if (initialLoading) {
      return {
        label: "Loading",
        description: "Checking today's attendance...",
        icon: RefreshCw,
        className: "bg-slate-100 text-slate-500",
      };
    }

    if (!attendance) {
      return {
        label: "Not Started",
        description: "Your workday has not started yet.",
        icon: Circle,
        className: "bg-slate-100 text-slate-600",
      };
    }

    if (isWorking) {
      return {
        label: "Currently Working",
        description: "Your attendance session is active.",
        icon: TrendingUp,
        className: "bg-emerald-50 text-emerald-600",
      };
    }

    if (isCheckedOut) {
      return {
        label: "Day Completed",
        description: "Your attendance has been completed.",
        icon: CheckCircle2,
        className: "bg-blue-50 text-blue-600",
      };
    }

    return {
      label: "Present",
      description: "Attendance marked successfully.",
      icon: BadgeCheck,
      className: "bg-emerald-50 text-emerald-600",
    };
  };

  const status = getStatus();

  const StatusIcon = status.icon;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="min-h-screen w-full bg-[#f6f7fb] px-4 py-5 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* =================================================
            HEADER
        ================================================= */}

        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500">
              <CalendarDays size={16} />

              <span>
                {currentTime.toLocaleDateString("en-IN", {
                  timeZone: "Asia/Kolkata",

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

          {/* CURRENT TIME */}

          <div className="flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
              <Clock3 size={20} className="text-slate-600" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Current Time
              </p>

              <p className="text-lg font-bold tracking-tight text-slate-900">
                {formatCurrentTime(currentTime)}
              </p>

              <p className="text-[10px] font-medium text-slate-400">
                IST • Asia/Kolkata
              </p>
            </div>
          </div>
        </header>

        {/* =================================================
            ERROR
        ================================================= */}

        {errorMessage && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm">
            <XCircle size={20} className="mt-0.5 shrink-0" />

            <div className="min-w-0 flex-1">
              <p className="font-semibold">Attendance action failed</p>

              <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
            </div>

            <button
              type="button"
              onClick={() => setErrorMessage("")}
              className="text-xs font-semibold text-red-500 transition hover:text-red-700"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* =================================================
            SUCCESS
        ================================================= */}

        {successMessage && (
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700 shadow-sm">
            <CheckCircle2 size={20} className="shrink-0" />

            <p className="text-sm font-semibold">{successMessage}</p>
          </div>
        )}

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* =================================================
              TODAY ATTENDANCE
          ================================================= */}

          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {/* Background decoration */}

            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />

            <div className="relative">
              {/* CARD HEADER */}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.15em] text-slate-400">
                    TODAY'S ATTENDANCE
                  </p>

                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                    {formatDate(attendance?.date)}
                  </h2>
                </div>

                <div
                  className={`flex w-fit items-center gap-2 rounded-full px-3 py-2 text-xs font-bold ${status.className}`}
                >
                  <StatusIcon
                    size={15}
                    className={initialLoading ? "animate-spin" : ""}
                  />

                  {status.label}
                </div>
              </div>

              {/* STATUS DESCRIPTION */}

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
                {status.description}
              </p>

              {/* =================================================
                  TIME CARDS
              ================================================= */}

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {/* CHECK IN */}

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                      <LogIn size={18} className="text-emerald-600" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Check In
                      </p>

                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {formatTime(attendance?.checkIn?.time)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CHECK OUT */}

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                      <LogOut size={18} className="text-red-600" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Check Out
                      </p>

                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {formatTime(attendance?.checkOut?.time)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* WORKING TIME */}

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                      <Timer size={18} className="text-blue-600" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Working Time
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
                {/* CHECK IN */}

                <button
                  type="button"
                  onClick={handleCheckIn}
                  disabled={
                    initialLoading || actionLoading !== null || isCheckedIn
                  }
                  className="group flex min-h-[58px] items-center justify-center gap-3 rounded-2xl bg-slate-950 px-5 font-semibold text-white shadow-lg shadow-slate-950/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  {actionLoading === "checkIn" ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      <span>
                        {locationLoading
                          ? "Getting location..."
                          : "Checking in..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <LogIn
                        size={19}
                        className="transition-transform group-hover:-translate-x-1"
                      />

                      <span>{isCheckedIn ? "Checked In" : "Check In"}</span>
                    </>
                  )}
                </button>

                {/* CHECK OUT */}

                <button
                  type="button"
                  onClick={handleCheckOut}
                  disabled={
                    initialLoading ||
                    actionLoading !== null ||
                    !isCheckedIn ||
                    isCheckedOut
                  }
                  className="group flex min-h-[58px] items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  {actionLoading === "checkOut" ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />

                      <span>
                        {locationLoading
                          ? "Getting location..."
                          : "Checking out..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <LogOut
                        size={19}
                        className="transition-transform group-hover:translate-x-1"
                      />

                      <span>{isCheckedOut ? "Checked Out" : "Check Out"}</span>
                    </>
                  )}
                </button>
              </div>

              {/* LOCATION */}

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                <MapPin size={14} />

                <span>Location verification is required for attendance.</span>
              </div>
            </div>
          </div>

          {/* =================================================
              SUMMARY
          ================================================= */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <TrendingUp size={20} className="text-blue-600" />
              </div>

              <div>
                <p className="text-xs font-bold tracking-[0.15em] text-slate-400">
                  ATTENDANCE SUMMARY
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-950">
                  Today's Overview
                </h2>
              </div>
            </div>

            <div className="mt-7 space-y-3">
              {/* STATUS */}

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

              {/* CHECK IN */}

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

              {/* CHECK OUT */}

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

              {/* WORKING */}

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

            {/* MESSAGE */}

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

            {/* REFRESH */}

            <button
              type="button"
              onClick={() => fetchTodayAttendance(true)}
              disabled={actionLoading !== null}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                size={15}
                className={actionLoading === "refresh" ? "animate-spin" : ""}
              />
              Refresh Attendance
            </button>
          </div>
        </section>

        {/* =================================================
            TODAY'S RECORD
        ================================================= */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-6 sm:p-7">
            <p className="text-xs font-bold tracking-[0.15em] text-slate-400">
              RECORDS
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-950">
              Today's Attendance Record
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your attendance activity for today.
            </p>
          </div>

          {/* DESKTOP TABLE */}

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
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
                    <td colSpan={5} className="px-6 py-14 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                          <CalendarDays size={21} className="text-slate-400" />
                        </div>

                        <p className="mt-4 font-semibold text-slate-700">
                          No attendance recorded today
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          Check in to create your attendance record.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE RECORD */}

          <div className="p-4 md:hidden">
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
