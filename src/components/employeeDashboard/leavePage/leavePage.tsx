import TextField from "@mui/material/TextField";

export default function LeavePage() {
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

          <form className="space-y-5 p-5 sm:p-6">
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
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full rounded-xl bg-[#030A24] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#07113d] hover:shadow-md sm:w-auto"
              >
                Submit Request
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
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-6">
                    Leave Request
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-6">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="transition-colors hover:bg-slate-50/60">
                  <td className="px-5 py-5 sm:px-6">
                    <p className="max-w-3xl text-sm leading-6 text-slate-700">
                      Due to a wedding in my hometown, I would like to request
                      four days of leave.
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Submitted on 17 Aug 2026
                    </p>
                  </td>

                  <td className="px-5 py-5 sm:px-6">
                    <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
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
