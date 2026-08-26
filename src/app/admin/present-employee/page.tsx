"use client";

import {
  Users,
  Clock3,
  LogIn,
  LogOut,
  CircleCheck,
  ArrowLeft,
} from "lucide-react";

import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

export default function PresentEmployees() {
  const [attendence, setAttendence] = useState(null);

  const GetAttendence = async () => {
    try {
      const response = await axios.get(`/api/attendence/today`);
      console.log(response.data.attendence);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 px-4 py-6 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="mx-auto w-full max-w-6xl">
        <Link href="/admin">
          <button
            type="button"
            className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>
        </Link>

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
              <Users size={17} />
              <span>EMPLOYEE MANAGEMENT</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Present Employees
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Monitor employees currently present in the workplace.
            </p>
          </div>

          {/* Present Count */}
          <div className="flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CircleCheck size={21} />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Currently Present
              </p>

              <p className="text-xl font-bold text-slate-900">1 Employee</p>
            </div>
          </div>
        </div>

        {/* Employee Table Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Table Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
            <div>
              <h2 className="font-semibold text-slate-900">
                Attendance Overview
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Live employee attendance status
              </p>
            </div>

            <div className="hidden items-center gap-2 text-xs font-medium text-emerald-600 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Live
            </div>
          </div>

          {/* Responsive Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Employee
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <div className="flex items-center gap-2">
                      <LogIn size={15} />
                      Check-in Time
                    </div>
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <div className="flex items-center gap-2">
                      <LogOut size={15} />
                      Check-out Time
                    </div>
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {/* Employee Row */}
                <tr className="transition hover:bg-slate-50">
                  {/* Name */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                        D
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          Deepanshu
                        </p>

                        <p className="text-xs text-slate-400">Employee</p>
                      </div>
                    </div>
                  </td>

                  {/* Checkin */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <Clock3 size={16} className="text-slate-400" />
                      09:15 AM
                    </div>
                  </td>

                  {/* Checkout */}
                  <td className="px-6 py-5">
                    <span className="text-sm text-slate-400">
                      Not checked out
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Present
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
