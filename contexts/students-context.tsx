"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { User } from "@/types/user";

export type Student = User & {
  role: "student";
  phone: string;
  joinDate: string;
};

interface StudentsContextType {
  students: Student[];
  addStudent: (s: Omit<Student, "_id" | "joinDate">) => void;
  updateStudent: (id: string, s: Partial<Omit<Student, "id">>) => void;
  deleteStudent: (id: string) => void;
}

const StudentsContext = createContext<StudentsContextType | undefined>(
  undefined,
);
// const STORAGE_KEY = "kice_students";

export function StudentsProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await fetch("/api/students");
      const data = await res.json();
      setStudents(data);
    };

    fetchStudents();
  }, []);

  const addStudent = useCallback(
    async (s: Omit<Student, "_id" | "joinDate">) => {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(s),
      });

      if (res.ok) {
        const updated = await fetch("/api/students");
        const data = await updated.json();
        setStudents(data);
      }
    },
    [],
  );

  const updateStudent = useCallback(
    async (id: string, data: Partial<Omit<Student, "id">>) => {
      const res = await fetch(`/api/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const updated = await fetch("/api/students");
        const studentsData = await updated.json();
        setStudents(studentsData);
      }
    },
    [],
  );

  const deleteStudent = useCallback(async (id: string) => {
    const res = await fetch(`/api/students/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setStudents((prev) => prev.filter((s) => s._id !== id));
    }
  }, []);

  return (
    <StudentsContext.Provider
      value={{ students, addStudent, updateStudent, deleteStudent }}
    >
      {children}
    </StudentsContext.Provider>
  );
}

export function useStudents() {
  const ctx = useContext(StudentsContext);
  if (!ctx) throw new Error("useStudents must be used within StudentsProvider");
  return ctx;
}
