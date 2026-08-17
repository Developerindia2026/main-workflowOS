export default function DashboardWidgets() {
  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Section Header */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-[#030A24] sm:text-2xl">
              Workspace Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Stay updated with your tasks, announcements, and employee
              activities.
            </p>
          </div>

          <button className="text-sm font-medium text-blue-600 transition hover:text-blue-700">
            View Dashboard →
          </button>
        </div>

        {/* Widgets */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {/* My Tasks */}
          <div className="group flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h3 className="text-sm font-semibold text-[#030A24]">
                  My Tasks
                </h3>
                <p className="mt-0.5 text-xs text-slate-400">
                  Your assigned work
                </p>
              </div>

              <button className="text-xs font-medium text-blue-600 transition hover:text-blue-700">
                View All
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                ✓
              </div>

              <p className="text-sm font-medium text-slate-600">No tasks yet</p>

              <p className="mt-1 max-w-[220px] text-xs leading-5 text-slate-400">
                Tasks assigned to you will appear here.
              </p>
            </div>
          </div>

          {/* Company Announcements */}
          <div className="group flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h3 className="text-sm font-semibold text-[#030A24]">
                  Company Announcements
                </h3>
                <p className="mt-0.5 text-xs text-slate-400">
                  Latest company updates
                </p>
              </div>

              <button className="text-xs font-medium text-blue-600 transition hover:text-blue-700">
                View All
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                !
              </div>

              <p className="text-sm font-medium text-slate-600">
                No announcements
              </p>

              <p className="mt-1 max-w-[220px] text-xs leading-5 text-slate-400">
                Important company announcements will appear here.
              </p>
            </div>
          </div>

          {/* Recent Documents */}
          <div className="group flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h3 className="text-sm font-semibold text-[#030A24]">
                  Recent Documents
                </h3>
                <p className="mt-0.5 text-xs text-slate-400">
                  Recently uploaded files
                </p>
              </div>

              <button className="text-xs font-medium text-blue-600 transition hover:text-blue-700">
                View All
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                📄
              </div>

              <p className="text-sm font-medium text-slate-600">
                No documents yet
              </p>

              <p className="mt-1 max-w-[220px] text-xs leading-5 text-slate-400">
                Your recent documents will appear here.
              </p>
            </div>
          </div>

          {/* Apply Leave */}
          <div className="group flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h3 className="text-sm font-semibold text-[#030A24]">
                  Apply for Leave
                </h3>
                <p className="mt-0.5 text-xs text-slate-400">
                  Manage your leave requests
                </p>
              </div>

              <button className="text-xs font-medium text-blue-600 transition hover:text-blue-700">
                History
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                +
              </div>

              <p className="text-sm font-medium text-slate-600">
                Need some time off?
              </p>

              <p className="mt-1 max-w-[220px] text-xs leading-5 text-slate-400">
                Submit a leave request and track its approval status.
              </p>

              <button className="mt-4 rounded-lg bg-[#030A24] px-4 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md">
                Apply for Leave
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
