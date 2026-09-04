"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import {
  FileText,
  ExternalLink,
  CalendarDays,
  Clock3,
  CheckCircle2,
  AlertCircle,
  FileDown,
} from "lucide-react";

interface DocsProp {
  _id?: string;
  attachment: string;
  deadline: string;
  status: string;
}

export default function Documents() {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [documents, setDocuments] = useState<DocsProp[]>([]);

  const getDocuments = async () => {
    try {
      setError(false);

      const response = await axios.get("/api/employee/documents");

      setDocuments(response.data.data || []);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  const formatDate = (date: string) => {
    if (!date) return "No deadline";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = (status: string) => {
    const normalizedStatus = status?.toLowerCase();

    if (
      normalizedStatus === "completed" ||
      normalizedStatus === "approved" ||
      normalizedStatus === "done"
    ) {
      return {
        wrapper: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: <CheckCircle2 size={14} />,
      };
    }

    if (normalizedStatus === "pending" || normalizedStatus === "in progress") {
      return {
        wrapper: "bg-amber-50 text-amber-700 border-amber-200",
        icon: <Clock3 size={14} />,
      };
    }

    if (normalizedStatus === "rejected" || normalizedStatus === "overdue") {
      return {
        wrapper: "bg-red-50 text-red-700 border-red-200",
        icon: <AlertCircle size={14} />,
      };
    }

    return {
      wrapper: "bg-slate-50 text-slate-600 border-slate-200",
      icon: <FileText size={14} />,
    };
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      {/* Error Alert */}
      {error && (
        <div className="fixed right-4 top-5 z-50 w-[calc(100%-2rem)] max-w-md shadow-lg sm:right-6">
          <Alert
            severity="error"
            onClose={() => setError(false)}
            sx={{
              borderRadius: "12px",
              alignItems: "center",
            }}
          >
            Unable to fetch documents. Please try again.
          </Alert>
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
                  <FileText size={18} />
                </div>

                <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Employee Portal
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Documents
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Access your assigned documents, review deadlines, and manage
                important attachments from one place.
              </p>
            </div>

            {!loading && (
              <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                <FileText size={17} className="text-slate-500" />

                <span className="text-sm font-medium text-slate-700">
                  {documents.length}{" "}
                  {documents.length === 1 ? "Document" : "Documents"}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Main Collection */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          {/* Section Header */}
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Document Collection
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your recently assigned documents and files.
              </p>
            </div>

            <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500 sm:flex">
              <FileDown size={18} />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="h-11 w-11 rounded-xl bg-slate-200" />
                    <div className="h-6 w-20 rounded-full bg-slate-200" />
                  </div>

                  <div className="mb-3 h-5 w-3/4 rounded bg-slate-200" />

                  <div className="mb-6 h-4 w-1/2 rounded bg-slate-200" />

                  <div className="h-10 w-full rounded-xl bg-slate-200" />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && documents.length === 0 && !error && (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm ring-1 ring-slate-200">
                <FileText size={25} />
              </div>

              <h3 className="text-base font-semibold text-slate-800">
                No documents available
              </h3>

              <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
                You currently don't have any documents assigned to you.
              </p>
            </div>
          )}

          {/* Documents Grid */}
          {!loading && documents.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {documents.map((docs) => {
                const statusStyle = getStatusStyle(docs.status);

                return (
                  <article
                    key={docs._id}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60"
                  >
                    {/* Top */}
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
                        <FileText size={20} />
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle.wrapper}`}
                      >
                        {statusStyle.icon}
                        {docs.status || "Unknown"}
                      </span>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="truncate text-base font-semibold text-slate-900">
                        Employee Document
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Important document attachment
                      </p>
                    </div>

                    {/* Deadline */}
                    <div className="mt-5 rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={16} className="text-slate-500" />

                        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Deadline
                        </span>
                      </div>

                      <p className="mt-1.5 text-sm font-semibold text-slate-800">
                        {formatDate(docs.deadline)}
                      </p>
                    </div>

                    {/* Attachment Button */}
                    <a
                      href={docs.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-slate-800 active:scale-[0.98]"
                    >
                      <ExternalLink size={16} />
                      View Attachment
                    </a>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
