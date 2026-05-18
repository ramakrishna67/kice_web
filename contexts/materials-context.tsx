"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

export interface Material {
  _id: string;
  name: string;
  fileName: string;
  fileType: string;
  fileData: string; // base64 data URL
  uploadDate: string;
  size: number; // bytes
}

interface MaterialsContextType {
  materials: Material[];
  addMaterial: (m: Omit<Material, "_id" | "uploadDate">) => void;
  updateMaterial: (id: string, data: Partial<Pick<Material, "name">>) => void;
  deleteMaterial: (id: string) => void;
}

const MaterialsContext = createContext<MaterialsContextType | undefined>(
  undefined,
);

export function MaterialsProvider({ children }: { children: ReactNode }) {
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      const res = await fetch("/api/materials");
      const data = await res.json();
      setMaterials(data);
    };
    fetchMaterials();
  }, []);

  const addMaterial = useCallback(
    async (m: Omit<Material, "_id" | "uploadDate">) => {
      const res = await fetch("/api/materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(m),
      });

      if (res.ok) {
        const updated = await fetch("/api/materials");
        const data = await updated.json();
        setMaterials(data);
      }
    },
    [],
  );

  const updateMaterial = useCallback(
    async (id: string, data: Partial<Pick<Material, "name">>) => {
      const res = await fetch(`/api/materials/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const updated = await fetch("/api/materials");
        const materialData = await updated.json();
        setMaterials(materialData);
      }
    },
    [],
  );

  const deleteMaterial = useCallback(async (id: string) => {
    const res = await fetch(`/api/materials/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const updated = await fetch("/api/materials");
      const materialData = await updated.json();
      setMaterials(materialData);
    }
  }, []);

  return (
    <MaterialsContext.Provider
      value={{ materials, addMaterial, updateMaterial, deleteMaterial }}
    >
      {children}
    </MaterialsContext.Provider>
  );
}

export function useMaterials() {
  const ctx = useContext(MaterialsContext);
  if (!ctx)
    throw new Error("useMaterials must be used within MaterialsProvider");
  return ctx;
}
