"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

export interface Schedule {
  _id: string;
  week: number;
  date: string;
  day: string;
  subject: string;
  topic: string;
  time: string;
}

interface ScheduleContextType {
  schedules: Schedule[];

  addSchedule: (s: Schedule) => Promise<void>;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined,
);

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      const res = await fetch("/api/schedules");

      const data = await res.json();

      setSchedules(data);
    };

    fetchSchedules();
  }, []);

  const addSchedule = useCallback(async (schedule: Schedule) => {
    const res = await fetch("/api/schedules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(schedule),
    });

    if (res.ok) {
      setSchedules((prev) => [schedule, ...prev]);
    }
  }, []);

  return (
    <ScheduleContext.Provider
      value={{
        schedules,
        addSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context = useContext(ScheduleContext);

  if (!context) {
    throw new Error("useSchedules must be used within ScheduleProvider");
  }

  return context;
}
