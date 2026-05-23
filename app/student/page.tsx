"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useNotifications } from "@/contexts/notifications-context";
import { useSchedule } from "@/contexts/schedules-context";
import { MaterialsView } from "@/components/materials-view";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
  Bell,
  LogOut,
  Home,
  User,
  FileText,
  TrendingUp,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const { notifications } = useNotifications();
  const { schedules } = useSchedule();
  const [showMaterials, setShowMaterials] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const weeklySchedules =
    selectedWeek != null
      ? schedules
          .filter((s) => s.week === selectedWeek)
          .sort((a, b) => daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day))
      : [];

  useEffect(() => {
    if (schedules.length === 0) return;

    const today = new Date();

    const todayString = today.toISOString().split("T")[0];

    const currentSchedule = schedules.find((s) => s.date === todayString);

    if (currentSchedule) {
      setSelectedWeek(currentSchedule.week);
    } else {
      // fallback → first available week
      const weeks = [...new Set(schedules.map((s) => s.week))].sort(
        (a, b) => a - b,
      );

      setSelectedWeek(weeks[0]);
    }
  }, [schedules]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="KICE Logo"
                width={40}
                height={35}
                className="h-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-primary leading-tight">
                  KICE
                </h1>
                <p className="text-[15px] text-muted-foreground leading-tight">
                  Student Portal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </button> */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground hidden sm:block">
                  {user?.name}
                </span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-primary to-primary/80 text-primary-foreground p-6 sm:p-8 mb-8 flex items-center gap-6 justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <p className="text-primary-foreground/70 text-sm mb-1">
              Welcome back,
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              {user?.name} 👋
            </h2>
          </div>
          {/* Quick Actions */}
          <div className=" grid gap-4">
            <button
              onClick={() => setShowMaterials(true)}
              className="flex flex-col items-center gap-2 p-5 relative rounded-2xl border border-border shadow-sm bg-primary/10 text-primary-foreground hover:bg-primary/15 transition-colors cursor-pointer"
            >
              <BookOpen className="w-6 h-6" />
              <span className="text-xs font-medium">Study Materials</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-10 gap-6 items-start">
          {/* Weekly Schedules */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-border shadow-sm min-h-150 flex flex-col overflow-hidden">
            <div className="p-5 pb-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" /> Weekly Schedules
              </h3>
            </div>
            {/* Week Selector */}
            <div className="px-5 flex gap-3 flex-wrap mb-5">
              {[...new Set(schedules.map((s) => s.week))]
                .sort((a, b) => a - b)
                .map((week) => (
                  <button
                    key={week}
                    onClick={() => setSelectedWeek(week)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      selectedWeek === week
                        ? "bg-primary text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Week {week}
                  </button>
                ))}
            </div>

            {/* Schedule Table */}
            <div className="flex-1 overflow-y-scroll scrollbar-hide overflow-x-auto px-5 pb-5 hidden xl:block">
              <table className="w-full border-collapse overflow-hidden rounded-xl">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="p-3 text-left text-sm font-semibold">Day</th>

                    <th className="p-3 text-left text-sm font-semibold">
                      Subject
                    </th>

                    <th className="p-3 text-left text-sm font-semibold">
                      Topic
                    </th>

                    <th className="p-3 text-left text-sm font-semibold">
                      Time
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => {
                    const schedule = weeklySchedules.find((s) => s.day === day);

                    return (
                      <tr
                        key={day}
                        className="border-b border-border hover:bg-gray-50"
                      >
                        <td className="p-3 font-medium text-sm">{day}</td>

                        <td className="p-3 text-sm">
                          {schedule?.sessions.map((session, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 mb-2"
                            >
                              <span className="text-sm font-medium">
                                {session.subject || "-"}
                              </span>
                            </div>
                          ))}
                        </td>

                        <td className="p-3 text-sm">
                          {schedule?.sessions.map((session, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 mb-2"
                            >
                              <span className="text-sm font-medium">
                                {session.topic || "-"}
                              </span>
                            </div>
                          ))}
                        </td>

                        <td className="p-3 text-sm">
                          {schedule?.sessions.map((session, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 mb-2"
                            >
                              <span className="text-sm font-medium">
                                {session.time || "-"}
                              </span>
                            </div>
                          ))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Mobile Schedule View */}
            <div className="space-y-5 xl:hidden m-4 overflow-y-scroll flex-1 scrollbar-hide ">
              {weeklySchedules.map((schedule) => (
                <div
                  key={schedule._id}
                  className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
                >
                  {/* Day Header */}
                  <div className="bg-primary text-white px-4 py-3">
                    <h3 className="font-semibold text-lg">{schedule.day}</h3>
                  </div>

                  {/* Sessions */}
                  <div className="p-4 space-y-4">
                    {schedule.sessions.map((session, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-border p-4 bg-gray-50"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                            Session {index + 1}
                          </span>

                          <span className="text-sm font-semibold text-primary">
                            {session.time}
                          </span>
                        </div>

                        <h4 className="font-semibold text-base text-foreground">
                          {session.subject}
                        </h4>

                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          {session.topic}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Announcements */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-border shadow-sm min-h-150 flex flex-col overflow-hidden">
            <div className="p-5 pb-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Bell className="w-5 h-5 text-accent" /> Announcements
              </h3>
            </div>
            <div className="px-5 pb-5 space-y-3 overflow-y-scroll flex-1 scrollbar-hide">
              {notifications.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">
                  No announcements yet.
                </p>
              ) : (
                notifications.map((a) => (
                  <div
                    key={a._id}
                    className="p-4 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${a.type === "important" ? "bg-red-50 text-red-500" : a.type === "success" ? "bg-green-50 text-green-500" : "bg-blue-50 text-blue-500"}`}
                      >
                        {a.type === "important" ? (
                          <AlertCircle className="w-4 h-4" />
                        ) : a.type === "success" ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Bell className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground text-sm">
                          {a.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 wrap-break-word whitespace-pre-wrap leading-relaxed">
                          {a.description}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-1.5">
                          {a.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <MaterialsView
        open={showMaterials}
        onClose={() => setShowMaterials(false)}
      />
    </div>
  );
}
