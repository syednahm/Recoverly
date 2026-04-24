"use client";

import { useCallback, useState } from "react";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
}

export function UploadZone({ onFileSelect }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    setError(null);

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      onFileSelect(file);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [onFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Entire box is clickable — label associates with file input */}
      <label
        htmlFor="file-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative block border-2 border-dashed rounded-2xl p-12 transition-all",
          "flex flex-col items-center justify-center text-center",
          "min-h-[400px] cursor-pointer",
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-400 focus-within:ring-offset-2 focus-within:rounded-2xl",
          isDragging
            ? "border-sky-500 bg-sky-50/50 scale-[1.02]"
            : "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50/50"
        )}
      >
        <input
          type="file"
          id="file-upload"
          accept=".pdf"
          onChange={handleFileInput}
          className="sr-only"
        />

        {/* Icon */}
        <div className="mb-6">
          <div
            className={cn(
              "w-20 h-20 rounded-2xl flex items-center justify-center transition-all",
              "bg-gradient-to-br shadow-lg",
              isDragging
                ? "from-sky-400 to-blue-600 scale-110"
                : "from-sky-400 to-blue-500"
            )}
          >
            <Upload className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Text */}
        <div className="mb-6 max-w-md">
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            {isDragging ? "Drop your file here" : "Upload Discharge Instructions"}
          </h2>
          <p className="text-sm text-slate-500">
            Drag and drop your hospital discharge PDF, or click anywhere in this box
          </p>
        </div>

        {/* Visual affordance — whole label is still the hit target */}
        <span
          className={cn(
            "inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-sm",
            "bg-sky-500 text-white shadow-md"
          )}
        >
          Choose PDF
        </span>

        {/* File specs */}
        <p className="text-xs text-slate-400 mt-6">
          PDF only · Maximum 10MB
        </p>
      </label>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 border border-rose-200">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-rose-900">Upload Error</p>
            <p className="text-sm text-rose-700 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Info Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoCard
          icon={FileText}
          title="Supported Formats"
          description="PDF discharge instructions from any hospital or medical facility"
        />
        <InfoCard
          icon={Upload}
          title="AI-Powered"
          description="Advanced AI extracts medications, tasks, warnings, and recovery milestones"
        />
        <InfoCard
          icon={AlertCircle}
          title="Secure & Private"
          description="Your medical documents are processed securely and never stored"
        />
      </div>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
      <div className="w-8 h-8 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center mb-3">
        <Icon className="w-4 h-4 text-sky-600" />
      </div>
      <h3 className="text-sm font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}
