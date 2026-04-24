"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { UploadZone } from "@/components/upload/UploadZone";
import { ProcessingState } from "@/components/upload/ProcessingState";
import { ExtractionPreview } from "@/components/upload/ExtractionPreview";
import { Upload, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { DischargeInstructions } from "@/types";

type UploadStep = "upload" | "processing" | "preview";

export default function UploadPage() {
  const [step, setStep] = useState<UploadStep>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<DischargeInstructions | null>(null);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setStep("processing");

    // Call API to process the file
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/discharge/extract", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Extraction failed");

      const data = await response.json();
      setExtractedData(data);
      
      // Wait a bit for effect, then show preview
      setTimeout(() => {
        setStep("preview");
      }, 1500);
    } catch (error) {
      console.error("Error processing discharge:", error);
      alert("Failed to process discharge instructions. Please try again.");
      setStep("upload");
      setFile(null);
    }
  };

  const handleReset = () => {
    setStep("upload");
    setFile(null);
    setExtractedData(null);
  };

  return (
    <DashboardShell>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-md">
            <Upload className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Upload Discharge Instructions
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Transform your hospital paperwork into a personalized recovery plan
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-slate-400 mt-3">
          <Link
            href="/"
            className="hover:text-slate-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 rounded-sm"
          >
            Dashboard
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600 font-medium">Upload</span>
        </nav>
      </div>

      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-3">
          {[
            { id: "upload", label: "Upload PDF", stepNum: 1 },
            { id: "processing", label: "AI Processing", stepNum: 2 },
            { id: "preview", label: "Review & Confirm", stepNum: 3 },
          ].map((s, i) => (
            <div key={s.id} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step === s.id
                      ? "bg-sky-500 text-white shadow-lg"
                      : getStepIndex(step) > i
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  {s.stepNum}
                </div>
                <span
                  className={`text-sm font-medium transition-colors ${
                    step === s.id ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < 2 && (
                <div
                  className={`w-12 h-0.5 transition-colors ${
                    getStepIndex(step) > i ? "bg-emerald-500" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {step === "upload" && <UploadZone onFileSelect={handleFileSelect} />}
        {step === "processing" && <ProcessingState fileName={file?.name} />}
        {step === "preview" && extractedData && (
          <ExtractionPreview data={extractedData} onReset={handleReset} />
        )}
      </div>
    </DashboardShell>
  );
}

function getStepIndex(step: UploadStep): number {
  return { upload: 0, processing: 1, preview: 2 }[step];
}
