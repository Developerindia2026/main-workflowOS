"use client";

import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  BriefcaseBusiness,
  Building2,
  ShieldCheck,
  Edit3,
  Camera,
  BadgeCheck,
  Clock3,
  FileText,
  KeyRound,
  ChevronRight,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#f6f8fc] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#030A24]">
                <UserRound size={16} className="text-white" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Employee
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#030A24] sm:text-3xl lg:text-4xl">
              My Profile
            </h1>

            <p className="mt-1 max-w-xl text-sm text-slate-500 sm:text-base">
              Manage your personal information, employment details and account
              settings.
            </p>
          </div>

          <button
            type="button"
            className="flex w-fit items-center gap-2 rounded-xl bg-[#030A24] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[#07123d]"
          >
            <Edit3 size={16} />
            Edit Profile
          </button>
        </div>

        {/* =====================================================
            PROFILE HERO
        ===================================================== */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
          {/* Cover */}
          <div className="relative h-32 overflow-hidden bg-[#030A24] sm:h-40">
            <div className="absolute -right-10 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-2xl" />
            <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-indigo-500/10 blur-2xl" />

            <div className="absolute inset-0 opacity-20">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
            </div>
          </div>

          {/* Profile Content */}
          <div className="relative px-5 pb-6 sm:px-7">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end">
              {/* Avatar */}
              <div className="relative w-fit">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-blue-600 to-indigo-700 text-3xl font-bold text-white shadow-xl sm:h-28 sm:w-28 sm:text-4xl">
                  DS
                </div>

                <button
                  type="button"
                  aria-label="Change profile photo"
                  className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-white bg-[#030A24] text-white shadow-md transition hover:scale-105"
                >
                  <Camera size={15} />
                </button>
              </div>

              {/* Employee Name */}
              <div className="flex-1 sm:pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold tracking-tight text-[#030A24]">
                    Deepanshu Sharma
                  </h2>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Frontend Developer
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Building2 size={14} />
                    Engineering
                  </span>

                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    Delhi, India
                  </span>

                  <span className="flex items-center gap-1.5">
                    <BadgeCheck size={14} />
                    Employee ID: WF-1024
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            QUICK STATS
        ===================================================== */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <ProfileStat
            icon={<CalendarDays size={18} />}
            label="Joined"
            value="04 Sep 2025"
            iconClass="bg-blue-50 text-blue-600"
          />

          <ProfileStat
            icon={<Clock3 size={18} />}
            label="Attendance"
            value="96.4%"
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <ProfileStat
            icon={<BriefcaseBusiness size={18} />}
            label="Experience"
            value="11 Months"
            iconClass="bg-violet-50 text-violet-600"
          />

          <ProfileStat
            icon={<BadgeCheck size={18} />}
            label="Status"
            value="Active"
            iconClass="bg-amber-50 text-amber-600"
          />
        </div>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ===================================================
              LEFT CONTENT
          =================================================== */}
          <div className="space-y-6 lg:col-span-2">
            {/* Personal Information */}
            <ProfileSection
              title="Personal Information"
              description="Basic information associated with your employee profile."
              icon={<UserRound size={18} />}
              action
            >
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <InfoItem label="Full Name" value="Deepanshu Sharma" />

                <InfoItem label="Date of Birth" value="12 March 2003" />

                <InfoItem label="Gender" value="Male" />

                <InfoItem label="Employee ID" value="WF-1024" />
              </div>
            </ProfileSection>

            {/* Contact Information */}
            <ProfileSection
              title="Contact Information"
              description="Your primary contact details and current location."
              icon={<Phone size={18} />}
              action
            >
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <InfoItem
                  label="Email Address"
                  value="deepanshu@example.com"
                  icon={<Mail size={15} />}
                />

                <InfoItem
                  label="Phone Number"
                  value="+91 98765 43210"
                  icon={<Phone size={15} />}
                />

                <InfoItem
                  label="Location"
                  value="Delhi, India"
                  icon={<MapPin size={15} />}
                />

                <InfoItem
                  label="Address"
                  value="New Delhi, Delhi"
                  icon={<MapPin size={15} />}
                />
              </div>
            </ProfileSection>

            {/* Employment Information */}
            <ProfileSection
              title="Employment Details"
              description="Your role, department and organizational information."
              icon={<BriefcaseBusiness size={18} />}
              action
            >
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <InfoItem label="Job Title" value="Frontend Developer" />

                <InfoItem label="Department" value="Engineering" />

                <InfoItem label="Employment Type" value="Full-Time" />

                <InfoItem label="Reporting Manager" value="Amit Verma" />

                <InfoItem label="Joining Date" value="04 September 2025" />

                <InfoItem label="Work Location" value="Hybrid" />
              </div>
            </ProfileSection>
          </div>

          {/* ===================================================
              RIGHT SIDEBAR
          =================================================== */}
          <div className="space-y-6">
            {/* Account Status */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <h3 className="font-bold text-[#030A24]">Account Status</h3>

                  <p className="text-xs text-slate-400">
                    Your account is secure
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />

                  <span className="text-sm font-semibold text-emerald-700">
                    Account Active
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-emerald-700/70">
                  Your WorkFlowOS account is active and available.
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <AccountRow
                  icon={<Mail size={16} />}
                  title="Email Verified"
                  status="Verified"
                />

                <AccountRow
                  icon={<Phone size={16} />}
                  title="Phone Verified"
                  status="Verified"
                />

                <AccountRow
                  icon={<ShieldCheck size={16} />}
                  title="Two-Factor Authentication"
                  status="Enabled"
                />
              </div>
            </div>

            {/* Work Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Building2 size={19} />
                </div>

                <div>
                  <h3 className="font-bold text-[#030A24]">Work Information</h3>

                  <p className="text-xs text-slate-400">
                    Organizational details
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <SideInfo label="Department" value="Engineering" />

                <SideInfo label="Team" value="Frontend Team" />

                <SideInfo label="Manager" value="Amit Verma" />

                <SideInfo label="Work Mode" value="Hybrid" />
              </div>
            </div>

            {/* Account Actions */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
              <div className="border-b border-slate-100 p-5">
                <h3 className="font-bold text-[#030A24]">Account Settings</h3>

                <p className="mt-1 text-xs text-slate-400">
                  Manage your account preferences
                </p>
              </div>

              <div className="p-2">
                <SettingsRow
                  icon={<KeyRound size={17} />}
                  title="Change Password"
                  description="Update your account password"
                />

                <SettingsRow
                  icon={<ShieldCheck size={17} />}
                  title="Security Settings"
                  description="Manage account security"
                />

                <SettingsRow
                  icon={<FileText size={17} />}
                  title="My Documents"
                  description="View employee documents"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 py-7 text-center text-xs text-slate-400">
          <ShieldCheck size={13} />
          Your profile information is securely managed by WorkFlowOS
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   COMPONENTS
============================================================ */

function ProfileStat({
  icon,
  label,
  value,
  iconClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-base font-bold text-[#030A24] sm:text-lg">
        {value}
      </p>
    </div>
  );
}

function ProfileSection({
  title,
  description,
  icon,
  action = false,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5 sm:p-6">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            {icon}
          </div>

          <div>
            <h2 className="text-base font-bold text-[#030A24] sm:text-lg">
              {title}
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
              {description}
            </p>
          </div>
        </div>

        {action && (
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-[#030A24]"
            aria-label={`Edit ${title}`}
          >
            <Edit3 size={15} />
          </button>
        )}
      </div>

      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

function InfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="flex items-center gap-2">
        {icon && <span className="text-slate-400">{icon}</span>}

        <p className="text-sm font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}

function AccountRow({
  icon,
  title,
  status,
}: {
  icon: React.ReactNode;
  title: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="text-slate-400">{icon}</div>

        <p className="truncate text-xs font-semibold text-slate-600">{title}</p>
      </div>

      <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-emerald-600">
        {status}
      </span>
    </div>
  );
}

function SideInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <span className="text-xs font-medium text-slate-400">{label}</span>

      <span className="text-right text-xs font-bold text-slate-700">
        {value}
      </span>
    </div>
  );
}

function SettingsRow({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition group-hover:bg-[#030A24] group-hover:text-white">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-slate-700">{title}</p>

        <p className="mt-0.5 truncate text-[11px] text-slate-400">
          {description}
        </p>
      </div>

      <ChevronRight
        size={15}
        className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500"
      />
    </button>
  );
}
