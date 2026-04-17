/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useRef, useEffect } from "react";
import { useNotificationStore } from "@/lib/zustandStore/notification";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const { unreadCount, notifications, markAllRead } = useNotificationStore();

  // ✅ latest first
  const latestNotifications = [...notifications]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  // ✅ close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ close on ESC
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);
  // ✅ close on without click esc & route change & outside click 
 useEffect(() => {
   if (!open) return;

   const timer = setTimeout(() => {
     setOpen(false);
   }, 3000); // 3 sec (adjust as needed)

   return () => clearTimeout(timer); // cleanup
 }, [open]);

  // ✅ close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Bell */}
      <button
        onClick={handleToggle}
        className="relative text-xl cursor-pointer"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg border z-50">
          {/* Header */}
          <div className="p-3 border-b font-semibold flex justify-between items-center">
            Notifications
            {notifications.length > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-blue-500 hover:underline"
              >
                Mark all
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-60 overflow-y-auto">
            {latestNotifications.length === 0 ? (
              <div className="p-4 text-sm text-gray-500 text-center">
                🔕 No notifications yet
              </div>
            ) : (
              latestNotifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 border-b text-sm hover:bg-gray-50 transition ${
                    !n.read ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  <div>{n.message}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <Link
            href="/dashboard/notify"
            onClick={() => setOpen(false)} // ✅ instant close
            className="block p-2 text-center text-sm text-blue-500 hover:underline"
          >
            View all
          </Link>
        </div>
      )}
    </div>
  );
}
