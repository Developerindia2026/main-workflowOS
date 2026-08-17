"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Menu,
  X,
  Bell,
  LogOut,
  UserRoundArrowLeft,
  LayoutDashboard,
  ClockCheck,
  IndianRupee,
  FileText,
  Hourglass,
  PackageCheck,
  CircleUser,
  ChevronRight,
} from "lucide-react";

/* =========================================================
   NAVIGATION ITEMS
========================================================= */

const navItems = [
  {
    label: "Dashboard",
    href: "/employee",
    icon: LayoutDashboard,
  },
  {
    label: "Check-In",
    href: "/employee/check-in",
    icon: ClockCheck,
  },
  {
    label: "Payslip",
    href: "/employee/payslip",
    icon: IndianRupee,
  },
  {
    label: "Documents",
    href: "/employee/documents",
    icon: FileText,
  },
  {
    label: "Leave",
    href: "/employee/leave",
    icon: Hourglass,
  },
  {
    label: "Tasks",
    href: "/employee/task",
    icon: PackageCheck,
  },
  {
    label: "Notifications",
    href: "/employee/notification",
    icon: Bell,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function TopBarNav() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  // HANDLE LOGOUT
  const handleLogout = async () => {
    try {
      setIsloading(true);
      const response = await axios.post(`/api/authentication/logout`);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  /* Toggle sidebar */
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  /* Close sidebar */
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* =====================================================
          TOP NAVBAR
      ===================================================== */}

      <nav className="w-full px-3 sm:px-5 lg:px-8">
        <div
          className="
            mx-auto
            flex
            h-20
            w-full
            max-w-[1600px]
            items-center
            justify-between
            border-b
            border-slate-200/80
            bg-white/80
            px-2
            backdrop-blur-xl
            sm:px-4
          "
        >
          {/* =================================================
              LEFT SECTION
          ================================================= */}

          <div className="flex items-center gap-3">
            {/* Hamburger Button */}

            <button
              type="button"
              onClick={toggleMenu}
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isOpen}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-700
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-indigo-200
                hover:bg-indigo-50
                hover:text-indigo-600
                hover:shadow-md
                active:scale-95
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500/30
              "
            >
              {isOpen ? (
                <X size={21} strokeWidth={2} />
              ) : (
                <Menu size={21} strokeWidth={2} />
              )}
            </button>

            {/* Brand */}

            <Link href="/employee">
              <div className="hidden flex-col sm:flex">
                <span
                  className="
                  text-sm
                  font-semibold
                  tracking-tight
                  text-slate-900
                "
                >
                  WorkFlowOS
                </span>

                <span className="text-xs text-slate-500">
                  Employee Operations
                </span>
              </div>
            </Link>
          </div>

          {/* =================================================
              RIGHT SECTION
          ================================================= */}

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notification Button */}

            <Link
              href="/employee/notification"
              aria-label="Notifications"
              className="
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-600
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-indigo-200
                hover:bg-indigo-50
                hover:text-indigo-600
                hover:shadow-md
                active:scale-95
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500/30
              "
            >
              <Bell size={20} strokeWidth={2} />

              {/* Notification Dot */}

              <span
                className="
                  absolute
                  right-2
                  top-2
                  h-2
                  w-2
                  rounded-full
                  bg-indigo-500
                  ring-2
                  ring-white
                "
              />
            </Link>

            {/* Logout */}

            <button
              type="button"
              className="
                flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
                text-sm
                font-medium
                text-slate-600
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-red-200
                hover:bg-red-50
                hover:text-red-600
                hover:shadow-md
                active:scale-95
                focus:outline-none
                focus:ring-2
                focus:ring-red-500/30
                sm:px-4
              "
              onClick={handleLogout}
            >
              <LogOut size={18} strokeWidth={2} />

              <span className="hidden sm:inline">
                {isLoading ? "Approving.." : "Logout"}
              </span>
            </button>

            {/* Profile */}

            <Link
              href="/employee/profile"
              aria-label="Profile"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-slate-900
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-indigo-600
                hover:shadow-lg
                active:scale-95
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500/30
              "
            >
              <UserRoundArrowLeft size={20} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </nav>

      {/* =====================================================
          SIDEBAR OVERLAY
      ===================================================== */}

      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`
          fixed
          inset-0
          z-40
          bg-slate-950/40
          backdrop-blur-[2px]
          transition-opacity
          duration-300
          ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        aria-label="Employee navigation"
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-[85%]
          max-w-[320px]
          flex-col
          overflow-hidden
          border-r
          border-white/10
          bg-[#030A24]
          text-white
          shadow-2xl
          transition-transform
          duration-300
          ease-out
          sm:w-[280px]
          p-3
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* =================================================
            SIDEBAR HEADER / LOGO
        ================================================= */}

        <div
          className="
            flex
            h-[88px]
            shrink-0
            items-center
            justify-between
            border-b
            border-white/10
            px-5
            sm:px-6
          "
        >
          {/* Logo */}

          <Link
            href="/employee"
            onClick={closeMenu}
            className="
              flex
              items-center
              transition-opacity
              duration-200
              hover:opacity-90
            "
          >
            <Image
              src="/light-logo.png"
              alt="WorkFlowOS Logo"
              width={150}
              height={80}
              priority
              className="
                h-auto
                w-[130px]
                object-contain
                sm:w-[145px]
              "
            />
          </Link>

          {/* Close Button */}

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition-all
              duration-200
              hover:bg-white/[0.07]
              hover:text-white
              active:scale-95
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500/30
            "
          >
            <X size={19} strokeWidth={2} />
          </button>
        </div>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav
          className="
            flex-1
            overflow-y-auto
            px-3
            py-6
            [scrollbar-width:none]
            [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
            sm:px-4
          "
        >
          {/* Section Heading */}

          <p
            className="
              mb-3
              px-3
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-slate-500
            "
          >
            Workspace
          </p>

          {/* Navigation List */}

          <ul className="space-y-1.5">
            {navItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`
                      group
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                      text-sm
                      font-medium
                      transition-all
                      duration-200

                      ${
                        index === 0
                          ? `
                            bg-indigo-500
                            text-white
                            shadow-lg
                            shadow-indigo-500/20
                          `
                          : `
                            text-slate-300
                            hover:bg-white/[0.07]
                            hover:text-white
                          `
                      }
                    `}
                  >
                    {/* Icon */}

                    <span
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        transition-all
                        duration-200

                        ${
                          index === 0
                            ? `
                              bg-white/15
                              text-white
                            `
                            : `
                              bg-white/[0.04]
                              text-slate-400
                              group-hover:bg-white/10
                              group-hover:text-indigo-400
                            `
                        }
                      `}
                    >
                      <Icon size={19} strokeWidth={2} />
                    </span>

                    {/* Label */}

                    <span className="min-w-0 flex-1 truncate">
                      {item.label}
                    </span>

                    {/* Arrow */}

                    <ChevronRight
                      size={16}
                      className={`
                        shrink-0
                        transition-all
                        duration-200

                        ${
                          index === 0
                            ? "text-white/70"
                            : `
                              text-slate-600
                              group-hover:translate-x-0.5
                              group-hover:text-slate-400
                            `
                        }
                      `}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* =================================================
            PROFILE SECTION
        ================================================= */}

        <div
          className="
            shrink-0
            border-t
            border-white/10
            p-3
            sm:p-4
          "
        >
          <Link
            href="/employee/profile"
            onClick={closeMenu}
            className="
              group
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              p-3
              transition-all
              duration-200
              hover:border-white/15
              hover:bg-white/[0.07]
            "
          >
            {/* Avatar */}

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-indigo-500/15
                text-indigo-400
                ring-1
                ring-indigo-400/20
              "
            >
              <CircleUser size={22} strokeWidth={1.8} />
            </div>

            {/* User Information */}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                User Profile
              </p>

              <p className="truncate text-xs text-slate-500">
                Employee Account
              </p>
            </div>

            {/* Arrow */}

            <ChevronRight
              size={16}
              className="
                shrink-0
                text-slate-600
                transition-transform
                duration-200
                group-hover:translate-x-0.5
                group-hover:text-slate-400
              "
            />
          </Link>
        </div>
      </aside>
    </>
  );
}
