import {
  Users,
  Megaphone,
  ClipboardCheck,
  CalendarDays,
  ArrowUpRight,
  Activity,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import Link from "next/link";

const dashboardItems = [
  {
    title: "Present Employees",
    description:
      "Monitor employees currently present and view workplace attendance.",
    href: "/admin/present-employee",
    icon: Users,
    label: "View Employees",
    accent: "blue",
  },
  {
    title: "Announcements",
    description: "Create and share important updates with your entire team.",
    href: "/admin/announcement",
    icon: Megaphone,
    label: "Create Announcement",
    accent: "violet",
  },
  {
    title: "Assign Tasks",
    description:
      "Delegate work to employees and keep your team's workload organized.",
    href: "/admin/assign-task",
    icon: ClipboardCheck,
    label: "Assign New Task",
    accent: "emerald",
  },
  {
    title: "Manage Leave",
    description:
      "Review employee leave requests and manage time-off activities.",
    href: "/admin/assign-leave",
    icon: CalendarDays,
    label: "Manage Leave",
    accent: "amber",
  },
];

const accentStyles = {
  blue: {
    icon: "bg-blue-50 text-blue-600 ring-blue-100",
    glow: "group-hover:bg-blue-50/60",
    button:
      "group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600",
  },
  violet: {
    icon: "bg-violet-50 text-violet-600 ring-violet-100",
    glow: "group-hover:bg-violet-50/60",
    button:
      "group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    glow: "group-hover:bg-emerald-50/60",
    button:
      "group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600",
  },
  amber: {
    icon: "bg-amber-50 text-amber-600 ring-amber-100",
    glow: "group-hover:bg-amber-50/60",
    button:
      "group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500",
  },
};

export default function Admin() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />

        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="mb-8 sm:mb-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            {/* Heading */}

            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 shadow-sm">
                <Sparkles size={13} className="text-indigo-600" />

                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600">
                  Admin Workspace
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Manager
                <span className="text-indigo-600"> Dashboard</span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Everything you need to manage your team, organize daily
                operations, and keep work moving forward.
              </p>
            </div>

            {/* Status */}

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                <Activity size={17} className="text-emerald-600" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  System Status
                </p>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  <span className="text-xs font-semibold text-slate-700">
                    All systems operational
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* =====================================================
            QUICK STATS
        ===================================================== */}

        {/* =====================================================
            SECTION HEADING
        ===================================================== */}

        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
              Quick Actions
            </p>

            <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Manage your workspace
            </h2>
          </div>

          <span className="hidden text-xs text-slate-400 sm:block">
            4 management tools
          </span>
        </div>

        {/* =====================================================
            MANAGEMENT CARDS
        ===================================================== */}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardItems.map((item) => {
            const Icon = item.icon;
            const style =
              accentStyles[item.accent as keyof typeof accentStyles];

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group block h-full"
              >
                <article
                  className={`relative flex h-full min-h-[285px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl sm:p-6 ${style.glow}`}
                >
                  {/* Decorative glow */}

                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-slate-50 transition-all duration-500 group-hover:scale-150" />

                  {/* Top */}

                  <div className="relative flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ring-4 transition-all duration-300 group-hover:scale-105 ${style.icon}`}
                    >
                      <Icon size={22} strokeWidth={1.8} />
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-300 shadow-sm transition-all duration-300 group-hover:border-slate-200 group-hover:text-slate-700">
                      <ArrowUpRight
                        size={17}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>

                  {/* Content */}

                  <div className="relative mt-6 flex-1">
                    <h3 className="text-lg font-bold tracking-tight text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </div>

                  {/* Action */}

                  <div className="relative mt-6">
                    <div
                      className={`flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 ${style.button}`}
                    >
                      <span>{item.label}</span>

                      <ChevronRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </section>

        {/* =====================================================
            BOTTOM INFORMATION BAR
        ===================================================== */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <Sparkles size={15} className="text-white" />
                </div>

                <p className="text-sm font-bold text-white">
                  Keep your team moving
                </p>
              </div>

              <p className="mt-2 max-w-xl text-xs leading-5 text-slate-400">
                Use the management tools above to stay on top of attendance,
                tasks, announcements and leave requests.
              </p>
            </div>

            <Link
              href="/admin/assign-task"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100 sm:w-auto"
            >
              Assign a Task
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
