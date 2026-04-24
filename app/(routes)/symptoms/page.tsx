"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { SymptomCheckInForm } from "@/components/symptoms/SymptomCheckInForm";
import { Activity } from "lucide-react";

export default function SymptomsPage() {
  return (
    <DashboardShell>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-md">
            <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Symptom Check-In
          </h1>
        </div>
        <p className="text-base text-slate-500">
          Track how you're feeling today. Your responses help us monitor your recovery progress.
        </p>
      </div>

      {/* Check-In Form */}
      <SymptomCheckInForm />
    </DashboardShell>
  );
}
