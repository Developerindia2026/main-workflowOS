"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Loader2,
  Save,
  XCircle,
} from "lucide-react";

interface TaskProp {
  _id: string;
  task: string;
  deadline: string;
  status: string;
}

export default function UpdateTask() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [taskData, setTaskData] = useState<TaskProp>({
    _id: "",
    task: "",
    deadline: "",
    status: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------------
  // Handle Input Changes
  // -----------------------------------
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------------
  // Get Task
  // -----------------------------------
  const getTaskData = async (taskId: string) => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`/api/task/employee/update/${taskId}`);

      setTaskData(response.data.data);
    } catch (error) {
      console.error(error);
      setError("Unable to load task details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------
  // Update Task
  // -----------------------------------
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) return;

    try {
      setUpdating(true);
      setError("");

      const response = await axios.put(
        `/api/task/employee/update/${id}`,
        taskData,
      );

      console.log(response.data.data);

      router.push("/employee/task");
    } catch (error) {
      console.error(error);
      setError("Unable to update task. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  // -----------------------------------
  // Fetch Task on Page Load
  // -----------------------------------
  useEffect(() => {
    if (id) {
      getTaskData(id);
    }
  }, [id]);

  // -----------------------------------
  // Loading UI
  // -----------------------------------
  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
              <Loader2 className="h-6 w-6 animate-spin text-slate-700" />
            </div>

            <p className="text-sm font-medium text-slate-500">
              Loading task details...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // -----------------------------------
  // Error UI
  // -----------------------------------
  if (error && !taskData._id) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
          <div className="w-full rounded-3xl border border-red-100 bg-white p-6 text-center shadow-sm sm:p-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
              <XCircle className="h-7 w-7 text-red-500" />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-slate-500">{error}</p>

            <button
              onClick={() => id && getTaskData(id)}
              className="mt-6 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* -------------------------------- */}
        {/* Header */}
        {/* -------------------------------- */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() => router.back()}
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Tasks
            </button>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Update Task
              </h1>

              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                Update the deadline and status of your assigned task.
              </p>
            </div>
          </div>

          {/* Task ID */}
          <div className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Task ID
            </p>

            <p className="mt-1 max-w-[180px] truncate font-mono text-xs text-slate-600">
              {taskData._id}
            </p>
          </div>
        </div>

        {/* -------------------------------- */}
        {/* Error Banner */}
        {/* -------------------------------- */}
        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3.5">
            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {/* -------------------------------- */}
        {/* Main Card */}
        {/* -------------------------------- */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
          {/* Card Header */}
          <div className="border-b border-slate-100 px-5 py-5 sm:px-8 sm:py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
                <Clock3 className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                  Task Information
                </h2>

                <p className="text-xs text-slate-500 sm:text-sm">
                  Review and update the task details below.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-7 p-5 sm:p-8">
              {/* -------------------------------- */}
              {/* Task */}
              {/* -------------------------------- */}
              <div>
                <label
                  htmlFor="task"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Task
                </label>

                <input
                  type="text"
                  id="task"
                  name="task"
                  value={taskData.task}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 outline-none"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Task description cannot be modified.
                </p>
              </div>

              {/* -------------------------------- */}
              {/* Deadline */}
              {/* -------------------------------- */}
              <div>
                <label
                  htmlFor="deadline"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
                >
                  <CalendarDays className="h-4 w-4 text-slate-400" />
                  Deadline
                </label>

                <input
                  type="text"
                  id="deadline"
                  name="deadline"
                  value={taskData.deadline}
                  onChange={handleChange}
                  disabled
                  placeholder="Enter deadline"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-900 focus:ring-4 focus:ring-slate-100 cursor-not-allowed"
                />
              </div>

              {/* -------------------------------- */}
              {/* Status */}
              {/* -------------------------------- */}
              <div>
                <div className="mb-3">
                  <label className="block text-sm font-semibold text-slate-700">
                    Task Status
                  </label>

                  <p className="mt-1 text-xs text-slate-400">
                    Select the current status of this task.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {/* On Going */}
                  <label
                    className={`group cursor-pointer rounded-2xl border p-4 transition ${
                      taskData.status === "On-going"
                        ? "border-blue-300 bg-blue-50 ring-2 ring-blue-100"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="On-going"
                      checked={taskData.status === "On-going"}
                      onChange={handleChange}
                      className="sr-only"
                    />

                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          taskData.status === "On-going"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        <Clock3 className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          On-going
                        </p>

                        <p className="text-xs text-slate-400">In progress</p>
                      </div>
                    </div>
                  </label>

                  {/* Declined */}
                  <label
                    className={`group cursor-pointer rounded-2xl border p-4 transition ${
                      taskData.status === "Declined"
                        ? "border-red-300 bg-red-50 ring-2 ring-red-100"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="Declined"
                      checked={taskData.status === "Declined"}
                      onChange={handleChange}
                      className="sr-only"
                    />

                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          taskData.status === "Declined"
                            ? "bg-red-100 text-red-600"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        <XCircle className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Declined
                        </p>

                        <p className="text-xs text-slate-400">Task rejected</p>
                      </div>
                    </div>
                  </label>

                  {/* Completed */}
                  <label
                    className={`group cursor-pointer rounded-2xl border p-4 transition ${
                      taskData.status === "Completed"
                        ? "border-emerald-300 bg-emerald-50 ring-2 ring-emerald-100"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="Completed"
                      checked={taskData.status === "Completed"}
                      onChange={handleChange}
                      className="sr-only"
                    />

                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          taskData.status === "Completed"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        <CheckCircle2 className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Completed
                        </p>

                        <p className="text-xs text-slate-400">Task finished</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* -------------------------------- */}
            {/* Footer */}
            {/* -------------------------------- */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-end sm:px-8">
              <button
                type="button"
                onClick={() => router.back()}
                disabled={updating}
                className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={updating}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {updating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* -------------------------------- */}
        {/* Bottom Note */}
        {/* -------------------------------- */}
        <p className="mt-5 text-center text-xs text-slate-400">
          Make sure the task status and deadline are accurate before saving.
        </p>
      </div>
    </main>
  );
}
