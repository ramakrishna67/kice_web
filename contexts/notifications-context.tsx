"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

export interface Notification {
  _id: string;
  title: string;
  description: string;
  type: "important" | "info" | "success";
  date: string;
  timestamp: number;
}

interface NotificationsContextType {
  notifications: Notification[];
  addNotification: (
    n: Omit<Notification, "_id" | "date" | "timestamp">,
  ) => void;
  deleteNotification: (id: string) => void;
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setNotifications(
        data
          .sort((a: Notification, b: Notification) => b.timestamp - a.timestamp)
          .map((n: Notification) => ({
            ...n,
            date: formatRelativeTime(n.timestamp),
          })),
      );
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, date: formatRelativeTime(n.timestamp) })),
      );
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const addNotification = useCallback(
    async (n: Omit<Notification, "_id" | "date" | "timestamp">) => {
      const newNotification: Notification = {
        ...n,
        _id: crypto.randomUUID(),
        timestamp: Date.now(),
        date: "Just now",
      };
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotification),
      });
      if (res.ok) {
        setNotifications((prev) => [newNotification, ...prev]);
      }
    },
    [],
  );

  const deleteNotification = useCallback(async (id: string) => {
    const res = await fetch(`/api/notifications/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    }
  }, []);

  // Refresh relative dates on each render of the list
  const displayNotifications = notifications.map((n) => ({
    ...n,
    date: formatRelativeTime(n.timestamp),
  }));

  return (
    <NotificationsContext.Provider
      value={{
        notifications: displayNotifications,
        addNotification,
        deleteNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider",
    );
  }
  return context;
}
