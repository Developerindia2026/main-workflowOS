"use client";

import leaveDataProp from "./leaveDataProp";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import axios from "axios";

export default function LeavePage() {
  const [leaveData, setLeaveData] = useState<leaveDataProp>({
    reason: "",
    leaveType: "",
  });

  const [leaves, setLeaves] = useState<leaveDataProp[]>([]);

  const [isloading, setisloading] = useState<boolean>(false);

  // leaveform-DATA
  const handleLeaveData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLeaveData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // sumit leave data
  const submitLeaveData = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setisloading(true);

    try {
      const response = await axios.post(`/api/leave`, leaveData);
      setLeaves(response.data.leave);
    } catch (error) {
      console.log(error);
    } finally {
      setisloading(false);
    }
  };

  // GET LEAVE
  const getLeaveData = async () => {
    try {
      const response = await axios.get(`/api/leave/me`);
      setLeaves(response.data.leaves);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLeaveData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#030A24] sm:text-3xl">
            Leave Management
          </h1>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Apply for leave and keep track of your leave requests.
          </p>
        </div>

        {/* Apply Leave Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                📅
              </div>

              <div>
                <h2 className="text-base font-semibold text-[#030A24] sm:text-lg">
                  Apply For Leave
                </h2>

                <p className="text-xs text-slate-500 sm:text-sm">
                  Submit a request to your manager for approval.
                </p>
              </div>
            </div>
          </div>

          <form className="space-y-5 p-5 sm:p-6" onSubmit={submitLeaveData}>
            {/* Leave Reason */}
            <div>
              <label
                htmlFor="leave-reason"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Reason for Leave
              </label>

              <TextField
                id="leave-reason"
                placeholder="Explain the reason for your leave..."
                multiline
                rows={5}
                fullWidth
                variant="outlined"
                onChange={handleLeaveData}
                value={leaveData.reason}
                name="reason"
              />
            </div>

            {/* RADIO BUTTON  */}

            <div className="leave-type w-full">
              <p className="mb-3 text-sm font-medium text-gray-600">
                Leave Type
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {/* Sick Leave */}
                <label className="group flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all duration-200 hover:border-red-300 hover:bg-red-50">
                  <input
                    type="radio"
                    name="leaveType"
                    value="sl"
                    className="h-4 w-4 accent-red-500"
                    onChange={handleLeaveData}
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Sick Leave
                    </p>
                    <p className="text-xs text-gray-500">Medical reason</p>
                  </div>
                </label>

                {/* Casual Leave */}
                <label className="group flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50">
                  <input
                    type="radio"
                    name="leaveType"
                    value="cl"
                    className="h-4 w-4 accent-blue-500"
                    onChange={handleLeaveData}
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Casual Leave
                    </p>
                    <p className="text-xs text-gray-500">Personal reason</p>
                  </div>
                </label>

                {/* Others */}
                <label className="group flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all duration-200 hover:border-purple-300 hover:bg-purple-50">
                  <input
                    type="radio"
                    name="leaveType"
                    value="others"
                    className="h-4 w-4 accent-purple-500"
                    onChange={handleLeaveData}
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Others
                    </p>
                    <p className="text-xs text-gray-500">Other leave reason</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full rounded-xl bg-[#030A24] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#07113d] hover:shadow-md sm:w-auto"
                disabled={isloading}
              >
                {isloading ? "Submtiing.." : "submit"}
              </button>
            </div>
          </form>
        </div>

        {/* Leave Status */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Status Header */}
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <h2 className="text-base font-semibold text-[#030A24] sm:text-lg">
              Leave Status
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Track the status of your submitted leave requests.
            </p>
          </div>

          {/* Responsive Table */}
          <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80">
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-6">
                      Leave Request
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-6">
                      Leave Type
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-6">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {leaves.map((leave) => {
                    const leaveDate = new Date(leave.createdAt);

                    const today = new Date();

                    const isToday =
                      leaveDate.toDateString() === today.toDateString();

                    const formattedDate = leaveDate.toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      },
                    );

                    return (
                      <tr
                        key={leave._id}
                        className="group transition-all duration-200 hover:bg-slate-50/70"
                      >
                        {/* Leave Request */}
                        <td className="px-5 py-5 sm:px-6">
                          <div className="max-w-2xl">
                            <p className="text-sm font-medium leading-6 text-slate-700">
                              {leave.reason}
                            </p>

                            <div className="mt-2 flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />

                              <p className="text-xs font-medium text-slate-400">
                                {isToday ? "Today" : formattedDate}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Leave Type */}
                        <td className="px-5 py-5 sm:px-6">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                              leave.leaveType === "sl"
                                ? "bg-red-50 text-red-600"
                                : leave.leaveType === "cl"
                                  ? "bg-blue-50 text-blue-600"
                                  : leave.leaveType === "el"
                                    ? "bg-purple-50 text-purple-600"
                                    : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                leave.leaveType === "sl"
                                  ? "bg-red-500"
                                  : leave.leaveType === "cl"
                                    ? "bg-blue-500"
                                    : leave.leaveType === "el"
                                      ? "bg-purple-500"
                                      : "bg-slate-500"
                              }`}
                            />

                            {leave.leaveType === "sl"
                              ? "Sick Leave"
                              : leave.leaveType === "cl"
                                ? "Casual Leave"
                                : leave.leaveType === "el"
                                  ? "Emergency Leave"
                                  : "Others"}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-5 sm:px-6">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                              leave.status === "approved"
                                ? "bg-emerald-50 text-emerald-600"
                                : leave.status === "decline"
                                  ? "bg-red-50 text-red-600"
                                  : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                leave.status === "approved"
                                  ? "bg-emerald-500"
                                  : leave.status === "decline"
                                    ? "bg-red-500"
                                    : "bg-amber-500"
                              }`}
                            />

                            <span className="capitalize">{leave.status}</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
            <p className="text-xs text-slate-400 sm:text-sm">
              Your manager will review and respond to your leave request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
