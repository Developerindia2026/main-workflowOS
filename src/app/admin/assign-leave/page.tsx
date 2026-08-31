"use client";

interface GetLeavesProp {
  _id: string;
  reason: string;
  user: {
    username: string;
    email: string;
    desgination: string;
    role: string;
  };
  leaveType: string;
  status: string;
}

interface BackendProp {
  userId: string;
  status: string;
}

import axios from "axios";
import { useState, useEffect } from "react";
import {
  Check,
  X,
  RefreshCw,
  ClipboardList,
  User,
  Mail,
  BriefcaseBusiness,
  Clock3,
  Inbox,
} from "lucide-react";

export default function AdminLeave() {
  const [Leaves, setLeaves] = useState<GetLeavesProp[]>([]);

  const getLeaves = async () => {
    try {
      const response = await axios.get("/api/leave/all");
      setLeaves(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const ResponseBackend = async ({ userId, status }: BackendProp) => {
    try {
      const response = await axios.put("/api/leave/response", {
        USERID: userId,
        status: status,
      });

      console.log(response.data);

      setLeaves((prev) => prev.filter((leave) => leave._id !== userId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLeaves();
  }, []);

  const getLeaveType = (leaveType: string) => {
    switch (leaveType) {
      case "sl":
        return "Sick Leave";
      case "cl":
        return "Casual Leave";
      case "others":
        return "Others";
      case "el":
        return "Emergency Leave";
      default:
        return leaveType;
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
              <ClipboardList size={14} />
              Admin Panel
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Leave Management
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Review and respond to employee leave requests.
            </p>
          </div>

          {/* Refresh */}
          <button
            type="button"
            onClick={getLeaves}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-100 hover:shadow-md active:scale-95"
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Pending Requests
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900">
                  {Leaves.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Clock3 size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Action Required
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900">
                  {Leaves.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Inbox size={21} />
              </div>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Card Header */}
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                <ClipboardList size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">Leave Requests</h2>

                <p className="text-xs text-slate-500">
                  Requests waiting for your response
                </p>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {Leaves.length === 0 ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Inbox size={30} />
              </div>

              <h3 className="text-lg font-semibold text-slate-800">
                No pending requests
              </h3>

              <p className="mt-1 max-w-sm text-sm text-slate-500">
                There are currently no leave requests waiting for approval.
              </p>

              <button
                type="button"
                onClick={getLeaves}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-95"
              >
                <RefreshCw size={16} />
                Check Again
              </button>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Employee
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Request
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Leave Type
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                        Response
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {Leaves.map((leave) => {
                      return (
                        <tr
                          key={leave._id}
                          className="group transition-colors hover:bg-slate-50/80"
                        >
                          {/* Employee */}
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                                <User size={18} />
                              </div>

                              <div className="min-w-0">
                                <p className="truncate font-semibold text-slate-900">
                                  {leave.user.username}
                                </p>

                                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                                  <Mail size={12} />
                                  <span className="max-w-[180px] truncate">
                                    {leave.user.email}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Request */}
                          <td className="max-w-[350px] px-6 py-5">
                            <p className="line-clamp-2 text-sm leading-6 text-slate-600">
                              {leave.reason}
                            </p>
                          </td>

                          {/* Leave Type */}
                          <td className="px-6 py-5">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">
                              <BriefcaseBusiness size={13} />
                              {getLeaveType(leave.leaveType)}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-5">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  ResponseBackend({
                                    userId: leave._id,
                                    status: "approve",
                                  })
                                }
                                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 hover:shadow-md active:scale-95"
                              >
                                <Check size={15} />
                                Approve
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  ResponseBackend({
                                    userId: leave._id,
                                    status: "decline",
                                  })
                                }
                                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-600 ring-1 ring-inset ring-rose-200 transition-all duration-200 hover:bg-rose-100 active:scale-95"
                              >
                                <X size={15} />
                                Decline
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="divide-y divide-slate-100 md:hidden">
                {Leaves.map((leave) => {
                  return (
                    <div
                      key={leave._id}
                      className="p-5 transition-colors hover:bg-slate-50"
                    >
                      {/* Employee */}
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                          <User size={19} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-slate-900">
                            {leave.user.username}
                          </h3>

                          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                            <Mail size={12} />
                            <span className="truncate">{leave.user.email}</span>
                          </p>
                        </div>

                        <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                          Pending
                        </span>
                      </div>

                      {/* Leave Type */}
                      <div className="mt-5">
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Leave Type
                        </p>

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">
                          <BriefcaseBusiness size={13} />
                          {getLeaveType(leave.leaveType)}
                        </span>
                      </div>

                      {/* Reason */}
                      <div className="mt-5">
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Reason
                        </p>

                        <div className="rounded-xl bg-slate-50 p-3.5">
                          <p className="text-sm leading-6 text-slate-600">
                            {leave.reason}
                          </p>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="mt-5 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            ResponseBackend({
                              userId: leave._id,
                              status: "approve",
                            })
                          }
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-3 text-xs font-bold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95"
                        >
                          <Check size={15} />
                          Approve
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            ResponseBackend({
                              userId: leave._id,
                              status: "decline",
                            })
                          }
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-50 px-3 py-3 text-xs font-bold text-rose-600 ring-1 ring-inset ring-rose-200 transition-all hover:bg-rose-100 active:scale-95"
                        >
                          <X size={15} />
                          Decline
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
