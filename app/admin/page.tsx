"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useNotifications } from "@/contexts/notifications-context";
import { useStudents } from "@/contexts/students-context";
import { useMaterials } from "@/contexts/materials-context";
import { useSchedule } from "@/contexts/schedules-context";
import Image from "next/image";
import {
  Users,
  Bell,
  LogOut,
  User,
  BookOpen,
  Send,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Info,
  UserPlus,
  FilePlus,
  Calendar,
} from "lucide-react";
import {
  AddStudentModal,
  AddMaterialModal,
  ScheduleModal,
} from "@/components/admin-modals";
import {
  ManageStudentsModal,
  ManageMaterialsModal,
} from "@/components/manage-modals";

const typeOptions = [
  {
    value: "important" as const,
    label: "Important",
    icon: AlertCircle,
    color: "text-red-500",
  },
  { value: "info" as const, label: "Info", icon: Info, color: "text-blue-500" },
  {
    value: "success" as const,
    label: "Success",
    icon: CheckCircle2,
    color: "text-green-500",
  },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { notifications, addNotification, deleteNotification } =
    useNotifications();
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();
  const { materials, addMaterial, updateMaterial, deleteMaterial } =
    useMaterials();
  const { addSchedule } = useSchedule();
  const { schedules } = useSchedule();

  // Notification form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"important" | "info" | "success">("info");
  const [isPosting, setIsPosting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Modal states
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [showManageStudents, setShowManageStudents] = useState(false);
  const [showManageMaterials, setShowManageMaterials] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(1);
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

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    setIsPosting(true);
    await new Promise((r) => setTimeout(r, 400));
    addNotification({
      title: title.trim(),
      description: description.trim(),
      type,
    });
    setTitle("");
    setDescription("");
    setType("info");
    setIsPosting(false);
    setSuccessMsg("Notification posted successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

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
                  Admin Panel
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
        {/* Welcome Banner with action buttons */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-primary via-primary/90 to-accent/80 text-white p-5 sm:p-8 mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-white/70 text-sm mb-1">Admin Dashboard</p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-1">
                Welcome, {user?.name}
              </h2>
              <p className="text-white/80 text-sm">
                Manage students, materials, and notifications.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 lg:w-auto">
              <button
                onClick={() => setShowAddStudent(true)}
                className="flex items-center gap-2 p-4 bg-white/15 hover:bg-white/25 rounded-xl text-sm font-medium transition-colors cursor-pointer backdrop-blur-sm"
              >
                <UserPlus className="w-4 h-4" /> Add Student
              </button>
              <button
                onClick={() => setShowAddMaterial(true)}
                className="flex items-center gap-2 p-4 bg-white/15 hover:bg-white/25 rounded-xl text-sm font-medium transition-colors cursor-pointer backdrop-blur-sm"
              >
                <FilePlus className="w-4 h-4" /> Add Material
              </button>
              <button
                onClick={() => setShowSchedule(true)}
                className="flex items-center gap-2 p-3 bg-white/15 hover:bg-white/25 rounded-xl text-sm font-medium transition-colors cursor-pointer backdrop-blur-sm"
              >
                <Calendar className="w-4 h-4" /> Weekly Schedule
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Post Notification Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-border shadow-sm w-full overflow-hidden">
            <div className="p-5 pb-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Send className="w-5 h-5 text-primary" /> Post Notification
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                This will appear in every student&apos;s announcements feed.
              </p>
            </div>
            <form onSubmit={handlePost} className="px-5 pb-5 space-y-4">
              {successMsg && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}
              <div>
                <label
                  htmlFor="notif-title"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="notif-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Mock Test Schedule Released"
                  disabled={isPosting}
                  required
                  className="w-full border border-border bg-gray-50/50 py-2.5 px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="notif-desc"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Description
                </label>
                <textarea
                  id="notif-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write the notification content here..."
                  rows={3}
                  disabled={isPosting}
                  required
                  className="w-full border border-border bg-gray-50/50 py-2.5 px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Type
                </label>
                <div className="flex flex-wrap gap-3">
                  {typeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setType(opt.value)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${type === opt.value ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border bg-gray-50/50 hover:bg-gray-100"}`}
                    >
                      <opt.icon className={`w-3.5 h-3.5 ${opt.color}`} />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={isPosting || !title.trim() || !description.trim()}
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-semibold py-2.5 px-4 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
              >
                {isPosting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Posting...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Post Notification
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Posted Notifications */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm w-full overflow-hidden">
            <div className="p-5 pb-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Bell className="w-5 h-5 text-accent" /> Posted Notifications
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {notifications.length} total
              </p>
            </div>
            <div className="px-5 pb-5 space-y-3 max-h-105 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No notifications yet.
                </p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n._id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition-colors group"
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${n.type === "important" ? "bg-red-50 text-red-500" : n.type === "success" ? "bg-green-50 text-green-500" : "bg-blue-50 text-blue-500"}`}
                    >
                      {n.type === "important" ? (
                        <AlertCircle className="w-3.5 h-3.5" />
                      ) : n.type === "success" ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Info className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-foreground">
                        {n.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">
                        {n.description}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {n.date}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteNotification(n._id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-all cursor-pointer shrink-0"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="w-full mt-6">
          <div className="bg-white rounded-2xl border border-border shadow-sm">
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
            <div className="overflow-x-auto px-5 pb-5 hidden md:block">
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
                              <span className="text-xs md:text-sm font-medium">
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
                              <span className="text-xs font-medium">
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
            {/* Mobile Schedule */}
            <div className="space-y-5 md:hidden px-4 pb-4">
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
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <button
            onClick={() => setShowManageStudents(true)}
            className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-border shadow-sm bg-primary/10 text-primary hover:bg-primary/15 transition-colors cursor-pointer"
          >
            <Users className="w-6 h-6" />
            <span className="text-xs font-medium">Manage Students</span>
          </button>
          <button
            onClick={() => setShowManageMaterials(true)}
            className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-border shadow-sm bg-accent/10 text-accent hover:bg-accent/15 transition-colors cursor-pointer"
          >
            <BookOpen className="w-6 h-6" />
            <span className="text-xs font-medium">Manage Material</span>
          </button>
        </div>
      </main>

      {/* Modals */}
      <AddStudentModal
        open={showAddStudent}
        onClose={() => setShowAddStudent(false)}
        onAdd={addStudent}
      />
      <AddMaterialModal
        open={showAddMaterial}
        onClose={() => setShowAddMaterial(false)}
        onAdd={addMaterial}
      />
      <ManageStudentsModal
        open={showManageStudents}
        onClose={() => setShowManageStudents(false)}
        students={students}
        onUpdate={updateStudent}
        onDelete={deleteStudent}
      />
      <ManageMaterialsModal
        open={showManageMaterials}
        onClose={() => setShowManageMaterials(false)}
        materials={materials}
        onUpdate={updateMaterial}
        onDelete={deleteMaterial}
      />
      <ScheduleModal
        open={showSchedule}
        onClose={() => setShowSchedule(false)}
        onAdd={addSchedule}
      />
    </div>
  );
}
