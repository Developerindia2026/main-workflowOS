import {
  Users,
  Megaphone,
  ClipboardCheck,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

import Link from "next/link";

export default function Admin() {
  return (
    <div className="min-h-screen w-full bg-slate-100 px-4 py-8 sm:px-6 lg:px-10">
      {/* Dashboard Header */}
      <div className="mx-auto mb-8 w-full max-w-6xl">
        <p className="mb-1 text-sm font-medium text-slate-500">
          ADMIN DASHBOARD
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Manager Workspace
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Manage employees, announcements, tasks and leave requests.
        </p>
      </div>

      {/* Workflow Cards */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Present Employee */}
        <Link href="/admin/present-employee">
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110">
                <Users size={24} strokeWidth={1.8} />
              </div>

              <ArrowUpRight
                size={20}
                className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-slate-700"
              />
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Present Employee
              </h2>

              <p className="mt-2 text-sm leading-5 text-slate-500">
                View employees currently present in the workplace.
              </p>
            </div>

            <button className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-900 hover:text-white">
              View Employees
            </button>
          </div>
        </Link>

        {/* New Announcement */}
        <Link href="/admin/announcement">
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition-all duration-300 group-hover:scale-110">
                <Megaphone size={24} strokeWidth={1.8} />
              </div>

              <ArrowUpRight
                size={20}
                className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-slate-700"
              />
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-slate-900">
                New Announcement
              </h2>

              <p className="mt-2 text-sm leading-5 text-slate-500">
                Share important updates and announcements with employees.
              </p>
            </div>

            <button className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-900 hover:text-white">
              Create Announcement
            </button>
          </div>
        </Link>

        {/* Assign Task */}
        <Link href="/admin/assign-task">
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:scale-110">
                <ClipboardCheck size={24} strokeWidth={1.8} />
              </div>

              <ArrowUpRight
                size={20}
                className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-slate-700"
              />
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Assign Task
              </h2>

              <p className="mt-2 text-sm leading-5 text-slate-500">
                Assign tasks to employees and track their progress.
              </p>
            </div>

            <button className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-900 hover:text-white">
              Assign New Task
            </button>
          </div>
        </Link>

        {/* Assign Leave */}
        <Link href="/admin/assign-leave">
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-all duration-300 group-hover:scale-110">
                <CalendarDays size={24} strokeWidth={1.8} />
              </div>

              <ArrowUpRight
                size={20}
                className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-slate-700"
              />
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Assign Leave
              </h2>

              <p className="mt-2 text-sm leading-5 text-slate-500">
                Manage employee leave and time-off assignments.
              </p>
            </div>

            <button className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-900 hover:text-white">
              Manage Leave
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
