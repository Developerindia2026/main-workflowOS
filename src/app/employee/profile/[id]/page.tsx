"use client";

import TextField from "@mui/material/TextField";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface EditDataProp {
  username: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  designation: string;
  joiningDate: Date;
  profileImage: string;
}

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
  Save, // 👈 add this
} from "lucide-react";

export default function ProfileEdit() {
  const params = useParams();
  const id = params.id;

  const [editData, setEditData] = useState<EditDataProp>({});

  // GET EDIT DATA
  const getEditData = async () => {
    try {
      const response = await axios.get(`/api/profile/${id}`);
      setEditData(response.data.user);
      console.log(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEditData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#f6f8fc] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Account
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-[#030A24] sm:text-3xl">
              Edit Profile
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Update your personal information and account details.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#030A24] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-[#07123d]"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>

        {/* Profile Preview */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
          {/* Cover */}
          <div className="relative h-32 overflow-hidden bg-[#030A24] sm:h-40">
            <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

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

          {/* Profile */}
          <div className="relative px-5 pb-6 sm:px-7">
            <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end">
              {/* Avatar */}
              <div className="relative w-fit">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-blue-600 to-indigo-700 text-3xl font-bold text-white shadow-xl sm:h-28 sm:w-28 sm:text-4xl">
                  {editData.username?.slice(0, 2).toUpperCase()}
                </div>

                <button
                  type="button"
                  className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-white bg-[#030A24] text-white shadow-md transition hover:scale-105"
                >
                  <Camera size={15} />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 sm:pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold tracking-tight text-[white] mb-3">
                    {editData.username}
                  </h2>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  {editData.designation}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Building2 size={14} />
                    {editData.department}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <BadgeCheck size={14} />
                    {editData.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left */}
          <div className="space-y-6 lg:col-span-2">
            {/* Personal Information */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
              <div className="border-b border-slate-100 p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <UserRound size={18} />
                  </div>

                  <div>
                    <h2 className="font-bold text-[#030A24]">
                      Personal Information
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Update your basic personal information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
                {/* Username */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Username
                  </label>

                  <div className="relative">
                    <UserRound
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={editData.username}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-[#030A24] focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      value={editData.email}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-[#030A24] focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={editData.phone}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-[#030A24] focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Role
                  </label>

                  <div className="relative">
                    <ShieldCheck
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={editData.role}
                      disabled
                      className="h-12 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 pl-10 pr-4 text-sm font-medium capitalize text-slate-400 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Employment Details */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
              <div className="border-b border-slate-100 p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <BriefcaseBusiness size={18} />
                  </div>

                  <div>
                    <h2 className="font-bold text-[#030A24]">
                      Employment Details
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Your organizational information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
                {/* Department */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Department
                  </label>

                  <div className="relative">
                    <Building2
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={editData.department}
                      disabled
                      className="h-12 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 pl-10 pr-4 text-sm font-medium text-slate-400 outline-none"
                    />
                  </div>
                </div>

                {/* Designation */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Designation
                  </label>

                  <div className="relative">
                    <BadgeCheck
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={editData.designation}
                      disabled
                      className="h-12 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 pl-10 pr-4 text-sm font-medium text-slate-400 outline-none"
                    />
                  </div>
                </div>

                {/* Joining Date */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Joining Date
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={new Date(editData.joiningDate).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                      disabled
                      className="h-12 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 pl-10 pr-4 text-sm font-medium text-slate-400 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
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
                    Your account is active
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
                  Your account is currently active and available.
                </p>
              </div>
            </div>

            {/* Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <h3 className="font-bold text-[#030A24]">Profile Security</h3>

                  <p className="text-xs text-slate-400">
                    Keep your account secure
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                  <span className="text-xs font-semibold text-slate-600">
                    Email
                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                    Verified
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                  <span className="text-xs font-semibold text-slate-600">
                    Phone
                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="mt-6 flex flex-col gap-3 pb-8 sm:hidden">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#030A24] px-5 py-3 text-sm font-semibold text-white shadow-lg"
          >
            <Save size={16} />
            Save Changes
          </button>

          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
