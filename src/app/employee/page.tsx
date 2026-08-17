import { headers } from "next/headers";
import { CircleCheckBig } from "lucide-react";
import { FileText } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { ThermometerSnowflake } from "lucide-react";

export default async function EmployeeDashbord() {
  const head = await headers();
  const name = head.get("username");

  return (
    <div className="min-h-screen w-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      {/* HEADER */}
      <div className="mb-8">
        <p className="mb-1 text-sm font-medium text-slate-500">
          Employee Dashboard
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-[#030A24] sm:text-3xl lg:text-4xl">
          Good Morning, <span className="text-blue-600">{name} 🧑‍💼</span>
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Here’s a quick overview of your workday.
        </p>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* CHECK IN */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Attendance</p>

              <h3 className="mt-2 text-xl font-bold text-slate-800">
                Check In
              </h3>

              <p className="mt-1 text-xs text-slate-400">Start your workday</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-100">
              <CircleCheckBig size={24} strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* DOCUMENT */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Documents</p>

              <h3 className="mt-2 text-xl font-bold text-slate-800">
                Generate
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Create your documents
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
              <FileText size={24} strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* ACTIVE TASK */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Productivity</p>

              <h3 className="mt-2 text-xl font-bold text-slate-800">
                Active Task
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                View your current tasks
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition group-hover:bg-violet-100">
              <CalendarCheck size={24} strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* LEAVE */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Time Off</p>

              <h3 className="mt-2 text-xl font-bold text-slate-800">Leave</h3>

              <p className="mt-1 text-xs text-slate-400">Manage your leave</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition group-hover:bg-orange-100">
              <ThermometerSnowflake size={24} strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
