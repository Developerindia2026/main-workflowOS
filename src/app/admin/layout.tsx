"use client";

import { BellDot, UserShield } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}
import { LogOut } from "lucide-react";

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.post(`/api/authentication/logout`);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full border-b border-gray-200 bg-white/80 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex min-h-[76px] w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="w-[90px] sm:w-[140px] lg:w-[110px]">
            <Link href="/admin">
              <img
                src="/dark-logo.png"
                alt="Logo"
                className="h-auto w-full object-contain"
              />
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notification */}
            <Link href="/admin/announcement">
              <button
                type="button"
                className="
                group flex items-center justify-center gap-2
                rounded-xl border border-gray-200
                bg-white px-3 py-2.5
                text-sm font-medium text-gray-700
                shadow-sm
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-gray-300
                hover:bg-gray-50
                hover:shadow-md
                active:scale-95
                sm:px-4
              "
              >
                <BellDot
                  size={19}
                  className="transition-transform duration-300 group-hover:rotate-[-8deg]"
                />

                <span className="hidden sm:inline">Notification</span>
              </button>
            </Link>

            {/* Profile */}
            <button
              type="button"
              className="
                group flex items-center justify-center gap-2
                rounded-xl border border-gray-500
                bg-gray-900 px-3 py-2.5
                text-sm font-medium text-white
                shadow-sm
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-gray-800
                hover:shadow-lg
                active:scale-95
                sm:px-4
              "
              onClick={handleLogout}
            >
              <LogOut
                size={19}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Admin Pages */}
      {children}
    </>
  );
}
