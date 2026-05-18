"use client";

import { useState } from "react";
import { Student } from "@/contexts/students-context";
import { Material } from "@/contexts/materials-context";
import {
  X,
  Trash2,
  Pencil,
  Check,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

interface ManageStudentsModalProps {
  open: boolean;
  onClose: () => void;
  students: Student[];
  onUpdate: (id: string, data: Partial<Omit<Student, "id">>) => void;
  onDelete: (id: string) => void;
}

export function ManageStudentsModal({
  open,
  onClose,
  students,
  onUpdate,
  onDelete,
}: ManageStudentsModalProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editPassword, setEditPassword] = useState("");

  if (!open) return null;

  const startEdit = (s: Student) => {
    setEditingId(s._id);
    setEditName(s.name);
    setEditEmail(s.email);
    setEditPhone(s.phone);
    setEditPassword(s.password);
  };

  const saveEdit = () => {
    if (editingId) {
      onUpdate(editingId, {
        name: editName,
        email: editEmail,
        phone: editPhone,
        password: editPassword,
      });
      setEditingId(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">
            Manage Students ({students.length})
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-5 space-y-3">
          {students.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No students yet.
            </p>
          ) : (
            students.map((s) => (
              <div
                key={s._id}
                className="p-4 rounded-xl bg-gray-50 border border-border"
              >
                {editingId === s._id ? (
                  <div className="space-y-2">
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full border border-border py-1.5 px-3 rounded-lg text-sm"
                      placeholder="Name"
                    />
                    <input
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full border border-border py-1.5 px-3 rounded-lg text-sm"
                      placeholder="Email"
                    />
                    <div className="flex gap-2">
                      <input
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="flex-1 border border-border py-1.5 px-3 rounded-lg text-sm"
                        placeholder="Phone"
                      />
                      <input
                        value={editPassword}
                        onChange={(e) => setEditPassword(e.target.value)}
                        className="flex-1 border border-border py-1.5 px-3 rounded-lg text-sm"
                        placeholder="Password"
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 text-xs border border-border rounded-lg hover:bg-gray-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveEdit}
                        className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-lg hover:opacity-90 cursor-pointer flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        {s.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {s.email} · {s.phone}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Password: {s.password} · Joined: {s.joinDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => startEdit(s)}
                        className="p-1.5 hover:bg-blue-50 text-blue-500 rounded-lg cursor-pointer"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(s._id)}
                        className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

interface ManageMaterialsModalProps {
  open: boolean;
  onClose: () => void;
  materials: Material[];
  onUpdate: (id: string, data: Partial<Pick<Material, "name">>) => void;
  onDelete: (id: string) => void;
}

export function ManageMaterialsModal({
  open,
  onClose,
  materials,
  onUpdate,
  onDelete,
}: ManageMaterialsModalProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  if (!open) return null;

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getIcon = (fileType: string) => {
    if (fileType.startsWith("image/"))
      return <ImageIcon className="w-5 h-5 text-green-500" />;
    return <FileText className="w-5 h-5 text-blue-500" />;
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">
            Manage Materials ({materials.length})
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-5 space-y-3">
          {materials.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No materials yet.
            </p>
          ) : (
            materials.map((m) => (
              <div
                key={m._id}
                className="p-4 rounded-xl bg-gray-50 border border-border flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center shrink-0">
                  {getIcon(m.fileType)}
                </div>
                <div className="flex-1 min-w-0">
                  {editingId === m._id ? (
                    <div className="flex items-center gap-2">
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 border border-border py-1 px-2 rounded-lg text-sm"
                      />
                      <button
                        onClick={() => {
                          onUpdate(m._id, { name: editName });
                          setEditingId(null);
                        }}
                        className="p-1 bg-primary text-primary-foreground rounded-lg cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1 border border-border rounded-lg hover:bg-gray-100 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="font-medium text-sm text-foreground truncate">
                        {m.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {m.fileName} · {formatSize(m.size)} · {m.uploadDate}
                      </p>
                    </>
                  )}
                </div>
                {editingId !== m._id && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => {
                        setEditingId(m._id);
                        setEditName(m.name);
                      }}
                      className="p-1.5 hover:bg-blue-50 text-blue-500 rounded-lg cursor-pointer"
                      title="Rename"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(m._id)}
                      className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
