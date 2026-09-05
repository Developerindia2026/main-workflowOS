"use client";

interface AnnoucmentDataProp {
  title: string;
  categtory: string;
  priority: string;
  details: string;
}

interface getAnnocuementProp {
  title: string;
  categtory: string;
  priority: string;
  details: string;
  _id: string;
}

import {
  Megaphone,
  CalendarDays,
  Clock3,
  UserRound,
  ArrowUpRight,
  Pin,
  Sparkles,
  ChevronRight,
  Send,
  ImagePlus,
  Tag,
  FileText,
  ChevronDown,
  Users,
  Trash,
} from "lucide-react";

import axios from "axios";
import React, { useState, useEffect } from "react";
import attendence from "@/models/attendence";

export default function Announcement() {
  const [formData, setFormData] = useState<AnnoucmentDataProp>({
    title: "",
    categtory: "",
    priority: "",
    details: "",
  });

  const [annoucement, setAnnoucement] = useState<getAnnocuementProp[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteNotification = async (id: string) => {
    try {
      const response = await axios.delete(`/api/annoucement/delete/${id}`);
      GetAnnoucement();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createAnnoucement = async (
    event: React.SubmitEvent<HTMLFormElement | HTMLTextAreaElement>,
  ) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/api/annoucement", formData);
      console.log(response.data.data);
      GetAnnoucement();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const GetAnnoucement = async () => {
    try {
      const response = await axios.get("/api/annoucement/render");
      setAnnoucement(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAnnoucement();
  }, []);

  return (
    <main className="min-h-screen bg-[#f6f7f9] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* ================= PAGE HEADER ================= */}
        <section className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
            <Megaphone size={14} />
            Company Communication
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Company Announcements
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Create announcements, share important updates, and keep your entire
            team informed.
          </p>
        </section>

        {/* ================= CREATE ANNOUNCEMENT ================= */}
        <section className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Form Header */}
          <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-5 sm:px-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg shadow-slate-900/10">
                <Megaphone size={20} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Publish New Announcement
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Share an important update with your employees.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              {/* Form Header */}
              <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-5 sm:px-7 sm:py-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                      Create Announcement
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                      Share an important update with your entire team.
                    </p>
                  </div>

                  <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:flex">
                    <Send size={18} />
                  </div>
                </div>
              </div>

              {/* Form Body */}
              <div className="p-5 sm:p-7 lg:p-8">
                <form
                  className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2"
                  onSubmit={createAnnoucement}
                >
                  {/* Title */}
                  <div className="lg:col-span-2">
                    <label className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <FileText size={14} />
                      </span>
                      Announcement Title
                    </label>

                    <input
                      type="text"
                      placeholder="Enter announcement title..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      name="title"
                      value={formData.title}
                      onChange={handleInput}
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                        <Tag size={14} />
                      </span>
                      Category
                    </label>

                    <div className="relative">
                      <select
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 pr-11 text-sm font-medium text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                        defaultValue=""
                        name="category"
                        onChange={handleInput}
                      >
                        <option value="" disabled>
                          Select category
                        </option>
                        <option value="company">Company</option>
                        <option value="event">Event</option>
                        <option value="product">Product</option>
                        <option value="hr">HR & People</option>
                      </select>

                      <ChevronDown
                        size={17}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                        <Sparkles size={14} />
                      </span>
                      Priority
                    </label>

                    <div className="relative">
                      <select
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 pr-11 text-sm font-medium text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                        defaultValue="normal"
                        name="priority"
                        onChange={handleInput}
                      >
                        <option value="normal">Normal</option>
                        <option value="important">Important</option>
                        <option value="urgent">Urgent</option>
                      </select>

                      <ChevronDown
                        size={17}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-2">
                    <div className="mb-2.5 flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                          <FileText size={14} />
                        </span>
                        Announcement Details
                      </label>

                      <span className="hidden text-xs text-slate-400 sm:block">
                        Keep it clear and concise
                      </span>
                    </div>

                    <textarea
                      rows={6}
                      placeholder="Write your announcement here..."
                      className="min-h-[150px] w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm leading-6 text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 sm:min-h-[170px]"
                      onChange={handleInput}
                      value={formData.details}
                      name="details"
                    />
                  </div>

                  {/* Form Bottom */}
                  <div className="mt-7 border-t border-slate-100 pt-6">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      {/* Helper text */}
                      <div className="flex items-start gap-3 justify-between">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                          <Users size={15} />
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-slate-600 sm:text-sm">
                            Visible to all employees
                          </p>

                          <p className="mt-0.5 text-[11px] leading-4 text-slate-400 sm:text-xs">
                            Your announcement will be shared across the company.
                          </p>
                        </div>
                      </div>

                      {/* Publish Button */}
                      <button
                        type="submit"
                        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/15 active:translate-y-0 active:scale-[0.98] sm:w-auto"
                      >
                        <Send
                          size={16}
                          className="transition-transform duration-200 group-hover:-rotate-6"
                        />

                        <span>
                          {isLoading ? "Publishing.." : "Publish Announcement"}
                        </span>

                        <ArrowUpRight
                          size={15}
                          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ================= RECENT + SIDEBAR ================= */}
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* ================= RECENT UPDATES ================= */}
          <section>
            <div className="mb-5 flex items-end justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Recent Updates
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Latest announcements published by the company
                </p>
              </div>

              <span className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500 sm:block">
                12 Announcements
              </span>
            </div>

            <div className="space-y-4">
              <div className="annocement-history space-y-3">
                {annoucement.map((items) => {
                  return (
                    <div
                      key={items._id}
                      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md dark:border-gray-400 dark:bg-gray-800 sm:p-5"
                    >
                      {/* Left Accent */}
                      <div
                        className={`absolute left-0 top-0 h-full w-1 ${
                          items.priority === "High"
                            ? "bg-red-500"
                            : items.priority === "Medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      />

                      <div className="flex items-start justify-between gap-3 pl-2">
                        {/* Announcement Content */}
                        <div className="min-w-0 flex-1">
                          {/* Header */}
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="truncate text-base font-semibold tracking-tight text-gray-900 dark:text-white sm:text-lg">
                              {items.title}
                            </h3>

                            {/* Priority Badge */}
                            <span
                              className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                items.priority === "High"
                                  ? "bg-red-50 text-red-600 ring-1 ring-inset ring-red-200 dark:bg-red-950/30 dark:text-red-400 dark:ring-red-900"
                                  : items.priority === "Medium"
                                    ? "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-400 dark:ring-yellow-900"
                                    : "bg-green-50 text-green-600 ring-1 ring-inset ring-green-200 dark:bg-green-950/30 dark:text-green-400 dark:ring-green-900"
                              }`}
                            >
                              {items.priority}
                            </span>
                          </div>

                          {/* Details */}
                          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-400 sm:text-[15px]">
                            {items.details}
                          </p>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            if (items._id) {
                              deleteNotification(items._id);
                            }
                          }}
                          type="button"
                          aria-label={`Delete announcement ${items.title}`}
                          className="shrink-0 rounded-lg p-2 text-gray-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                        >
                          <Trash className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ================= SIDEBAR ================= */}
          <aside className="space-y-5">
            {/* Categories */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900">
                Announcement Categories
              </h3>

              <div className="mt-4 space-y-2">
                <button className="flex w-full items-center justify-between rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600">
                  <span className="flex items-center gap-2">
                    <Megaphone size={16} />
                    All Announcements
                  </span>

                  <span className="text-xs">12</span>
                </button>

                <button className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-50">
                  <span>Company</span>
                  <span className="text-xs text-slate-400">5</span>
                </button>

                <button className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-50">
                  <span>Events</span>
                  <span className="text-xs text-slate-400">3</span>
                </button>

                <button className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-50">
                  <span>Product</span>
                  <span className="text-xs text-slate-400">2</span>
                </button>

                <button className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-50">
                  <span>HR & People</span>
                  <span className="text-xs text-slate-400">2</span>
                </button>
              </div>
            </div>

            {/* Notice */}
            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm">
                  <Pin size={17} />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-amber-900">
                    Stay Updated
                  </h4>

                  <p className="mt-1 text-xs leading-5 text-amber-800/80">
                    Publish important information here so every employee can
                    stay informed.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900">
                Announcement Overview
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">Total</p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">12</p>
                </div>

                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-xs text-blue-500">This Month</p>

                  <p className="mt-1 text-2xl font-bold text-blue-700">07</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
