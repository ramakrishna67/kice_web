"use client";

import { useState } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import { Student } from "@/contexts/students-context";

interface AddStudentModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (s: Omit<Student, "_id" | "joinDate">) => void;
}

export function AddStudentModal({
  open,
  onClose,
  onAdd,
}: AddStudentModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password: password.trim(),
    });
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-foreground">Add Student</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-border bg-gray-50/50 py-2.5 px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="e.g. Rahul Sharma"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-border bg-gray-50/50 py-2.5 px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="student@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Password
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-border bg-gray-50/50 py-2.5 px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="e.g. 2026-A"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border border-border bg-gray-50/50 py-2.5 px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="9876543210"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-xl hover:opacity-90 cursor-pointer text-sm"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
}

interface AddMaterialModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (m: {
    name: string;
    fileName: string;
    fileType: string;
    fileData: string;
    size: number;
  }) => void;
}

export function AddMaterialModal({
  open,
  onClose,
  onAdd,
}: AddMaterialModalProps) {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      if (f.size > 4 * 1024 * 1024) {
        setError("File must be under 4MB (localStorage limit)");
        return;
      }
      setFile(f);
      setError("");
      if (!name) setName(f.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    try {
      const reader = new FileReader();
      const dataUrl = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      onAdd({
        name: name.trim(),
        fileName: file.name,
        fileType: file.type,
        fileData: dataUrl,
        size: file.size,
      });
      setName("");
      setFile(null);
      onClose();
    } catch {
      setError("Failed to read file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-foreground">Add Material</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">
              {error}
            </p>
          )}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Material Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-border bg-gray-50/50 py-2.5 px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="e.g. Chapter 5 - Calculus"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Upload File
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl bg-gray-50/50 hover:bg-gray-100/50 cursor-pointer transition-colors">
              <Upload className="w-6 h-6 text-muted-foreground mb-2" />
              <span className="text-xs text-muted-foreground">
                {file
                  ? file.name
                  : "Click to select a file (PDF, images, etc.)"}
              </span>
              <span className="text-[10px] text-muted-foreground mt-1">
                Max 4MB
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.png,.jpg,.jpeg,.gif,.webp,.svg"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={!file || !name.trim() || uploading}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-2.5 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
              </>
            ) : (
              "Upload Material"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
