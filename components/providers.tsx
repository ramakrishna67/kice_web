"use client";

import { AuthProvider } from "@/contexts/auth-context";
import { NotificationsProvider } from "@/contexts/notifications-context";
import { StudentsProvider } from "@/contexts/students-context";
import { MaterialsProvider } from "@/contexts/materials-context";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <NotificationsProvider>
        <StudentsProvider>
          <MaterialsProvider>{children}</MaterialsProvider>
        </StudentsProvider>
      </NotificationsProvider>
    </AuthProvider>
  );
}
