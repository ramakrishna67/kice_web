"use client";

import { useState } from "react";
import { useMaterials, Material } from "@/contexts/materials-context";
import { X, FileText, Image as ImageIcon, ArrowLeft } from "lucide-react";

interface MaterialsViewProps {
  open: boolean;
  onClose: () => void;
}

export function MaterialsView({ open, onClose }: MaterialsViewProps) {
  const { materials } = useMaterials();
  const [viewing, setViewing] = useState<Material | null>(null);

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

  // File viewer modal
  if (viewing) {
    return (
      <div
        className="fixed inset-0 z-100 flex flex-col bg-gray-900/95 backdrop-blur-sm"
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 bg-black/50">
          <button
            onClick={() => setViewing(null)}
            className="flex items-center gap-2 text-white/80 hover:text-white text-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Materials
          </button>
          <span className="text-white font-medium text-sm truncate max-w-xs">
            {viewing.name}
          </span>
          <button
            onClick={() => {
              setViewing(null);
              onClose();
            }}
            className="p-1 hover:bg-white/10 rounded-lg cursor-pointer text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* File content */}
        <div
          className="flex-1 flex items-center justify-center p-4 overflow-auto select-none"
          style={{ userSelect: "none", WebkitUserSelect: "none" }}
          onDragStart={(e) => e.preventDefault()}
        >
          {viewing.fileType === "application/pdf" ? (
            <iframe
              src={`${viewing.fileData}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full rounded-lg pointer-events-auto"
              style={{ maxWidth: "900px" }}
              title={viewing.name}
            />
          ) : viewing.fileType.startsWith("image/") ? (
            <img
              src={viewing.fileData}
              alt={viewing.name}
              className="max-w-full max-h-full object-contain rounded-lg"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          ) : (
            <div className="text-center text-white/60">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Preview not available for this file type.</p>
              <p className="text-xs mt-1">{viewing.fileType}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Materials list
  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Study Materials
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {materials.length} file{materials.length !== 1 ? "s" : ""}{" "}
              available
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-5 space-y-3">
          {materials.length === 0 ? (
            <div className="text-center py-12">
              <BookOpenIcon className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">
                No materials uploaded yet.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Check back later!
              </p>
            </div>
          ) : (
            materials.map((m) => (
              <button
                key={m._id}
                onClick={() => setViewing(m)}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-border hover:bg-gray-100 hover:border-primary/20 transition-all cursor-pointer text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center shrink-0 group-hover:border-primary/30 transition-colors">
                  {getIcon(m.fileType)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate group-hover:text-primary transition-colors">
                    {m.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {formatSize(m.size)} · Uploaded {m.uploadDate}
                  </p>
                </div>
                <span className="text-[10px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  View →
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function BookOpenIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
