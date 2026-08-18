export default function TaskPage() {
  const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-5 sm:px-6">
        <h2 className="text-lg font-semibold tracking-tight text-[#030A24]">
          My Tasks
        </h2>

        <p className="text-sm text-slate-500">
          View and manage the tasks assigned to you.
        </p>
      </div>

      {/* Responsive Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70">
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Task
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Assigned Date
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50/60">
              <td className="px-5 py-5">
                <div>
                  <p className="font-medium text-[#030A24]">Fix Login API</p>

                  <p className="mt-1 text-sm text-slate-500">
                    Resolve authentication and token issues.
                  </p>
                </div>
              </td>

              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-600">
                17 Aug 2026
              </td>

              <td className="px-5 py-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  In Process
                </span>
              </td>

              <td className="px-5 py-5">
                <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                  Update
                </button>
              </td>
            </tr>

            <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50/60">
              <td className="px-5 py-5">
                <div>
                  <p className="font-medium text-[#030A24]">
                    Update Dashboard UI
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Improve dashboard layout and responsiveness.
                  </p>
                </div>
              </td>

              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-600">
                16 Aug 2026
              </td>

              <td className="px-5 py-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Pending
                </span>
              </td>

              <td className="px-5 py-5">
                <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                  Update
                </button>
              </td>
            </tr>

            <tr className="transition-colors hover:bg-slate-50/60">
              <td className="px-5 py-5">
                <div>
                  <p className="font-medium text-[#030A24]">
                    Create Employee Report
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Prepare the monthly employee activity report.
                  </p>
                </div>
              </td>

              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-600">
                15 Aug 2026
              </td>

              <td className="px-5 py-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Completed
                </span>
              </td>

              <td className="px-5 py-5">
                <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-slate-500">
          Showing <span className="font-medium text-slate-700">3</span> tasks
        </p>

        <button className="text-sm font-medium text-blue-600 transition hover:text-blue-700">
          View all tasks →
        </button>
      </div>
    </div>
  );
}
