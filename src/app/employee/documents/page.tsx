"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import {
  AlignLeft,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  FileDown,
  FileInput,
  FileText,
  Loader2,
  Send,
  TableOfContents,
  UploadCloud,
  X,
} from "lucide-react";

interface InputProps {
  title: string;
  description: string;
}

interface DocsProp {
  _id?: string;
  title: string;
  createdAt?: string;
  description?: string;
  document?: string;
}

export default function Documents() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [documents, setDocuments] = useState<DocsProp[]>([]);

  const [input, setInput] = useState<InputProps>({
    title: "",
    description: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setError(false);
      setSuccess(false);
    }
  };

  const handleInput = (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
    >,
  ) => {
    const { name, value } = event.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError(false);
    setSuccess(false);
  };

  const resetForm = () => {
    setInput({
      title: "",
      description: "",
    });
    setFile(null);

    const fileInput = document.getElementById(
      "file",
    ) as HTMLInputElement | null;
    if (fileInput) fileInput.value = "";
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!input.title.trim()) {
      setError(true);
      return;
    }

    if (!file) {
      setError(true);
      return;
    }

    try {
      setSubmitting(true);
      setError(false);
      setSuccess(false);

      const data = new FormData();
      data.append("title", input.title.trim());
      data.append("description", input.description.trim());
      data.append("file", file);

      await axios.post("/api/employee/createDocument", data);

      await getDocuments();
      resetForm();
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const getDocuments = async () => {
    try {
      setError(false);

      const response = await axios.get("/api/employee/documents");
      setDocuments(response.data.data ?? []);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  const formatDate = (date?: string) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "Date unavailable";

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getFileType = (url?: string) => {
    if (!url) return "FILE";

    const cleanUrl = url.split("?")[0];
    const extension = cleanUrl.split(".").pop()?.toUpperCase();

    return extension && extension.length <= 5 ? extension : "FILE";
  };

  return (
    <main className="min-h-screen w-full bg-[#f7f8fc] text-slate-900">
      {/* Top alerts */}
      <div className="fixed right-4 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6">
        {error && (
          <Alert
            severity="error"
            onClose={() => setError(false)}
            sx={{
              borderRadius: "14px",
              alignItems: "center",
              boxShadow: "0 15px 40px rgba(15, 23, 42, 0.12)",
            }}
          >
            Please check the form and try again.
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            onClose={() => setSuccess(false)}
            sx={{
              borderRadius: "14px",
              alignItems: "center",
              boxShadow: "0 15px 40px rgba(15, 23, 42, 0.12)",
            }}
          >
            Document published successfully.
          </Alert>
        )}
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
        {/* Page header */}
        <section className="mb-7 sm:mb-9">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white shadow-lg shadow-slate-950/10">
                  <FileText size={17} strokeWidth={2.2} />
                </div>

                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Employee Portal
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-[42px]">
                Documents
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-[15px]">
                Create, publish, and access important employee documents from
                one secure workspace.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {documents.length}{" "}
              {documents.length === 1 ? "Document" : "Documents"}
            </div>
          </div>
        </section>

        {/* Create document */}
        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.05)]">
          <div className="border-b border-slate-100 bg-gradient-to-r from-white via-white to-slate-50/80 px-5 py-5 sm:px-7 sm:py-6">
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                <UploadCloud size={21} strokeWidth={2} />
              </div>

              <div className="min-w-0">
                <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
                  Publish New Document
                </h2>
                <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                  Add a title, optional description, and attachment to publish a
                  new document.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-7 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="mb-2 block text-[13px] font-bold text-slate-700"
                  >
                    Document Title
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <div className="group relative">
                    <TableOfContents
                      size={17}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500"
                    />

                    <input
                      id="title"
                      type="text"
                      name="title"
                      value={input.title}
                      onChange={handleInput}
                      placeholder="e.g. Employee Handbook 2026"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-[13px] font-bold text-slate-700"
                  >
                    Description
                    <span className="ml-1 font-medium text-slate-400">
                      (Optional)
                    </span>
                  </label>

                  <div className="group relative">
                    <AlignLeft
                      size={17}
                      className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400 transition-colors group-focus-within:text-blue-500"
                    />

                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={input.description}
                      onChange={handleInput}
                      placeholder="Briefly describe this document..."
                      className="min-h-[120px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-10 pr-4 text-sm font-medium leading-6 text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <p className="mt-1.5 text-[11px] text-slate-400">
                    Keep the description short and informative.
                  </p>
                </div>
              </div>

              {/* Upload */}
              <div>
                <label
                  htmlFor="file"
                  className="mb-2 block text-[13px] font-bold text-slate-700"
                >
                  Attachment
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <label
                  htmlFor="file"
                  className="group relative flex min-h-[175px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-5 py-8 text-center transition-all hover:border-blue-300 hover:bg-blue-50/30"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="mb-3.5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm ring-1 ring-slate-200 transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
                    {file ? (
                      <CheckCircle2 size={25} strokeWidth={2} />
                    ) : (
                      <FileInput size={24} strokeWidth={1.9} />
                    )}
                  </div>

                  {file ? (
                    <>
                      <p className="max-w-full truncate px-4 text-sm font-bold text-slate-800">
                        {file.name}
                      </p>
                      <p className="mt-1 text-xs font-medium text-emerald-600">
                        File selected successfully
                      </p>
                      <p className="mt-1 text-[11px] text-slate-400">
                        Click to replace the selected file
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-bold text-slate-700">
                        Click to upload a document
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        PDF, DOC, DOCX • Maximum size 10MB
                      </p>
                    </>
                  )}

                  <input
                    id="file"
                    type="file"
                    name="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFile}
                  />
                </label>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={submitting}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X size={16} />
                  Clear
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition-all hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-blue-600/20 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send size={16} strokeWidth={2.2} />
                      Publish Document
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Collection header */}
        <section className="mt-10 sm:mt-12">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
                Your Workspace
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Document Collection
              </h2>
              <p className="mt-1.5 text-sm text-slate-500">
                All published documents are available below.
              </p>
            </div>

            {documents.length > 0 && (
              <div className="hidden items-center gap-2 text-xs font-semibold text-slate-400 sm:flex">
                <CalendarDays size={14} />
                Recently published
              </div>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[235px] animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="h-10 w-10 rounded-xl bg-slate-100" />
                  <div className="mt-5 h-5 w-3/4 rounded bg-slate-100" />
                  <div className="mt-3 h-3 w-full rounded bg-slate-100" />
                  <div className="mt-2 h-3 w-5/6 rounded bg-slate-100" />
                  <div className="mt-8 h-9 w-full rounded-xl bg-slate-100" />
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && documents.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <FileText size={25} />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-800">
                No documents yet
              </h3>
              <p className="mx-auto mt-1.5 max-w-md text-sm leading-6 text-slate-500">
                Published documents will appear here. Use the form above to
                create your first document.
              </p>
            </div>
          )}

          {/* Cards */}
          {!loading && documents.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {documents.map((docs, index) => (
                <article
                  key={docs._id ?? `${docs.title}-${docs.createdAt}-${index}`}
                  className="group flex min-h-[235px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_45px_rgba(15,23,42,0.09)]"
                >
                  {/* Card top */}
                  <div className="flex items-start justify-between gap-4 p-5">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                        <FileText size={20} strokeWidth={2} />
                      </div>

                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Document
                        </span>
                        <h3
                          title={docs.title}
                          className="mt-0.5 truncate text-[15px] font-bold text-slate-900"
                        >
                          {docs.title}
                        </h3>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-lg bg-slate-100 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-slate-500">
                      {getFileType(docs.document)}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="flex-1 px-5">
                    <p className="line-clamp-3 text-sm leading-6 text-slate-500">
                      {docs.description?.trim() || "No description provided."}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-5 border-t border-slate-100 bg-slate-50/60 px-5 py-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                        <CalendarDays size={13} />
                        {formatDate(docs.createdAt)}
                      </div>

                      {docs.document && (
                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Available
                        </span>
                      )}
                    </div>

                    {docs.document ? (
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={docs.document}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <ExternalLink size={14} />
                          Open
                        </a>

                        <a
                          href={docs.document}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-slate-950 text-xs font-bold text-white transition-all hover:bg-blue-600"
                        >
                          <FileDown size={14} />
                          Download
                        </a>
                      </div>
                    ) : (
                      <div className="flex h-9 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-400">
                        Attachment unavailable
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
