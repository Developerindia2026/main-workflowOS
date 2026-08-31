"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

interface EmployeeProp {
  username: string;
  department: string;
  email: string;
  _id: string;
}

interface FormDataType {
  task: string;
  employee: string;
  deadline: string;
  department: string;
}

interface TaskProp {
  _id: string;
  task: string;
  employee:
    | string
    | {
        _id: string;
        username: string;
        email?: string;
      };
  department: string;
  deadline?: string;
  attachment?: string | null;
  createdAt?: string;
}

export default function AssignTask() {
  const [tasks, setTasks] = useState<TaskProp[]>([]);
  const [employees, setEmployees] = useState<EmployeeProp[]>([]);

  const [loading, setLoading] = useState(false);
  const [taskLoading, setTaskLoading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<FormDataType>({
    task: "",
    employee: "",
    deadline: "",
    department: "",
  });

  // --------------------------------------------------
  // GET EMPLOYEES
  // --------------------------------------------------

  const getEmployee = async () => {
    try {
      const response = await axios.get("/api/task/employee");

      setEmployees(response.data.user || []);
    } catch (error) {
      console.error("Employee fetch error:", error);
      setError("Unable to load employees.");
    }
  };

  // --------------------------------------------------
  // GET TASKS
  // --------------------------------------------------

  const getTask = async () => {
    try {
      setTaskLoading(true);

      const response = await axios.get("/api/task/render");
      console.log(response.data.data);

      setTasks(response.data.data);
    } catch (error) {
      console.error("Task fetch error:", error);
      setError("Unable to load tasks.");
    } finally {
      setTaskLoading(false);
    }
  };

  // --------------------------------------------------
  // FORM CHANGE
  // --------------------------------------------------

  const handleForm = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --------------------------------------------------
  // FILE CHANGE
  // --------------------------------------------------

  const fileHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;

    setFile(selectedFile);
  };

  // --------------------------------------------------
  // REMOVE SELECTED FILE
  // --------------------------------------------------

  const removeFile = () => {
    setFile(null);
  };

  // --------------------------------------------------
  // SUBMIT TASK
  // --------------------------------------------------

  const handleBackend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.task.trim()) {
      setError("Please enter a task.");
      return;
    }

    if (!formData.employee) {
      setError("Please select an employee.");
      return;
    }

    if (!formData.department) {
      setError("Please select a department.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("task", formData.task);
      data.append("department", formData.department);
      data.append("employee", formData.employee);
      data.append("deadline", formData.deadline);

      if (file) {
        data.append("attachment", file);
      }

      await axios.post("/api/task/new", data);

      setSuccess("Task assigned successfully.");

      // Reset form
      setFormData({
        task: "",
        employee: "",
        deadline: "",
        department: "",
      });

      setFile(null);

      // Refresh tasks
      await getTask();
    } catch (error) {
      console.error("Task creation error:", error);

      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Unable to create task.");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // UNIQUE DEPARTMENTS
  // --------------------------------------------------

  const departments = useMemo(() => {
    return [...new Set(employees.map((item) => item.department))]
      .filter(Boolean)
      .sort();
  }, [employees]);

  // --------------------------------------------------
  // EMPLOYEE NAME
  // --------------------------------------------------

  const getEmployeeName = (employee: TaskProp["employee"]) => {
    if (typeof employee === "string") {
      return employee;
    }

    return employee?.username || "Unknown employee";
  };

  // --------------------------------------------------
  // FORMAT DATE
  // --------------------------------------------------

  const formatDate = (date?: string) => {
    if (!date) return "No deadline";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // --------------------------------------------------
  // GET FILE NAME
  // --------------------------------------------------

  const getFileName = (url?: string | null) => {
    if (!url) return "";

    try {
      const pathname = new URL(url).pathname;

      return decodeURIComponent(pathname.split("/").pop() || "Attachment");
    } catch {
      return "Attachment";
    }
  };

  // --------------------------------------------------
  // INITIAL DATA
  // --------------------------------------------------

  useEffect(() => {
    getEmployee();
    getTask();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-indigo-600" />

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                Administration
              </p>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Task Management
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Assign tasks to your team, attach relevant files, and keep track
              of everything from one place.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <span className="text-sm font-semibold text-slate-700">
              {tasks.length}
            </span>

            <span className="text-sm text-slate-500">
              {tasks.length === 1 ? "Task" : "Tasks"}
            </span>
          </div>
        </div>

        {/* ==================================================
            ALERTS
        ================================================== */}

        {success && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <span>{success}</span>

            <button
              type="button"
              onClick={() => setSuccess("")}
              className="font-bold text-emerald-700 hover:text-emerald-900"
            >
              ×
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="font-bold text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        )}

        {/* ==================================================
            MAIN GRID
        ================================================== */}

        <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
          {/* ==================================================
              CREATE TASK CARD
          ================================================== */}

          <section className="h-fit rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Card Header */}

            <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                  +
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">Assign New Task</h2>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Create and assign work to an employee.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}

            <form onSubmit={handleBackend} className="space-y-5 p-5 sm:p-6">
              {/* Task */}

              <div>
                <label
                  htmlFor="task"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Task Description
                </label>

                <textarea
                  id="task"
                  name="task"
                  rows={5}
                  value={formData.task}
                  onChange={handleForm}
                  placeholder="Describe the task clearly..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

              {/* Employee */}

              <div>
                <label
                  htmlFor="employee"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Assign Employee
                </label>

                <select
                  id="employee"
                  name="employee"
                  value={formData.employee}
                  onChange={handleForm}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                >
                  <option value="">Select employee</option>

                  {employees.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.username}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department */}

              <div>
                <label
                  htmlFor="department"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Department
                </label>

                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleForm}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                >
                  <option value="">Select department</option>

                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>

              {/* Deadline */}

              <div>
                <label
                  htmlFor="deadline"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Deadline
                  <span className="ml-1 font-normal text-slate-400">
                    (optional)
                  </span>
                </label>

                <input
                  id="deadline"
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleForm}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

              {/* Attachment */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Attachment
                  <span className="ml-1 font-normal text-slate-400">
                    (optional)
                  </span>
                </label>

                <label
                  htmlFor="attachment"
                  className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40"
                >
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl shadow-sm">
                    ↑
                  </div>

                  <p className="text-sm font-semibold text-slate-700">
                    Click to upload
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Images, PDF or documents
                  </p>

                  <input
                    id="attachment"
                    type="file"
                    name="attachment"
                    onChange={fileHandle}
                    className="hidden"
                  />
                </label>

                {/* Selected File */}

                {file && (
                  <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 px-3 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-sm shadow-sm">
                        📎
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-slate-700">
                          {file.name}
                        </p>

                        <p className="text-[11px] text-slate-400">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={removeFile}
                      className="shrink-0 rounded-lg px-2 py-1 text-xs font-bold text-slate-400 transition hover:bg-white hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Assigning Task...
                  </>
                ) : (
                  <>
                    Assign Task
                    <span>→</span>
                  </>
                )}
              </button>
            </form>
          </section>

          {/* ==================================================
              TASK LIST
          ================================================== */}

          <section className="min-w-0">
            {/* List Header */}

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Assigned Tasks
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  View and manage tasks assigned to your team.
                </p>
              </div>

              <button
                type="button"
                onClick={getTask}
                disabled={taskLoading}
                className="w-fit rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 disabled:opacity-50"
              >
                {taskLoading ? "Refreshing..." : "↻ Refresh"}
              </button>
            </div>

            {/* Loading */}

            {taskLoading && tasks.length === 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
                  >
                    <div className="h-4 w-2/3 rounded bg-slate-200" />

                    <div className="mt-4 h-3 w-full rounded bg-slate-100" />

                    <div className="mt-2 h-3 w-4/5 rounded bg-slate-100" />

                    <div className="mt-6 h-10 rounded-xl bg-slate-100" />
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}

            {!taskLoading && tasks.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                  ✓
                </div>

                <h3 className="font-bold text-slate-800">No tasks yet</h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Create your first task using the form and it will appear here.
                </p>
              </div>
            )}

            {/* Task Cards */}

            {tasks.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {tasks.map((item) => (
                  <article
                    key={item._id}
                    className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                  >
                    {/* Top */}

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600">
                          {getEmployeeName(item.employee)
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-800">
                            {getEmployeeName(item.employee)}
                          </p>

                          <p className="truncate text-xs text-slate-400">
                            {item.department}
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                        Assigned
                      </span>
                    </div>

                    {/* Task */}

                    <div className="mt-5">
                      <h3 className="text-base font-bold leading-6 text-slate-900">
                        {item.task}
                      </h3>
                    </div>

                    {/* Meta */}

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-slate-50 px-3 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Deadline
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-700">
                          {formatDate(item.deadline)}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 px-3 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Department
                        </p>

                        <p className="mt-1 truncate text-xs font-semibold text-slate-700">
                          {item.department}
                        </p>
                      </div>
                    </div>

                    {/* Attachment */}

                    {item.attachment && (
                      <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3">
                        <div className="flex min-w-0 items-center gap-2">
                          <span className="text-sm">📎</span>

                          <p className="truncate text-xs font-medium text-slate-600">
                            {getFileName(item.attachment)}
                          </p>
                        </div>

                        <a
                          href={item.attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-[11px] font-bold text-indigo-600 shadow-sm transition hover:bg-indigo-600 hover:text-white"
                        >
                          View
                        </a>
                      </div>
                    )}

                    {/* Bottom */}

                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <p className="text-[11px] text-slate-400">Task ID</p>

                      <p className="mt-1 truncate font-mono text-[10px] text-slate-500">
                        {item._id}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
