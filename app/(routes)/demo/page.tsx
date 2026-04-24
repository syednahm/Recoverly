"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { ConfidenceScoreDemo } from "@/components/dashboard/ConfidenceScoreDemo";
import { Sparkles } from "lucide-react";
import { MOCK_RECOVERY_PLAN } from "@/lib/mock-data";

export default function DemoPage() {
  return (
    <DashboardShell>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-600 shadow-md">
            <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Confidence Score Demo
          </h1>
        </div>
        <p className="text-base text-slate-500">
          Interactive demonstration of the AI-powered Recovery Confidence Score system.
          Complete actions to see the score update in real-time.
        </p>
      </div>

      {/* Demo Component */}
      <ConfidenceScoreDemo initialPlan={MOCK_RECOVERY_PLAN} />

      {/* Info Panel */}
      <div className="mt-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
        <h2 className="text-lg font-black text-slate-900 mb-3">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-bold text-slate-700 mb-1.5">Score Factors</h3>
            <ul className="space-y-1 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Symptoms</strong> (35%) - Severity of reported symptoms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span><strong>Medications</strong> (25%) - Adherence to medication schedule</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span><strong>Tasks</strong> (20%) - Completion of recovery tasks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>Safety</strong> (20%) - Absence of warning signs</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-slate-700 mb-1.5">Score Ranges</h3>
            <ul className="space-y-1 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span><strong>85-100:</strong> Excellent - Ahead of schedule</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>70-84:</strong> Good - On track</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>50-69:</strong> Fair - Needs attention</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span><strong>0-49:</strong> At risk - Multiple concerns</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
