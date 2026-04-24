"use client";

import { useEffect, useState } from "react";
import { Loader2, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessingStateProps {
  fileName?: string;
}

const PROCESSING_STEPS = [
  { id: 1, label: "Reading PDF document", duration: 800 },
  { id: 2, label: "Extracting medical text", duration: 1000 },
  { id: 3, label: "Identifying medications", duration: 900 },
  { id: 4, label: "Analyzing restrictions", duration: 700 },
  { id: 5, label: "Generating recovery plan", duration: 1100 },
  { id: 6, label: "Building your dashboard", duration: 500 },
];

export function ProcessingState({ fileName }: ProcessingStateProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (currentStep < PROCESSING_STEPS.length) {
      timeoutId = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, PROCESSING_STEPS[currentStep].duration);
    }

    return () => clearTimeout(timeoutId);
  }, [currentStep]);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
        {/* Icon with animated gradient */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-50 animate-pulse" />
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-10 h-10 text-white animate-pulse" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Status Text */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            AI Processing Your Discharge
          </h2>
          <p className="text-sm text-slate-500">
            Transforming paperwork into your personalized recovery system
          </p>
        </div>

        {/* File Name */}
        {fileName && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 mb-6">
            <div className="w-10 h-10 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-sky-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {fileName}
              </p>
              <p className="text-xs text-slate-500">Processing with AI</p>
            </div>
            <Loader2 className="w-5 h-5 text-sky-500 animate-spin shrink-0" />
          </div>
        )}

        {/* Progress Steps */}
        <div className="space-y-3">
          {PROCESSING_STEPS.map((step, index) => {
            const isComplete = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
                  isCurrent && "bg-sky-50 border border-sky-200",
                  isComplete && "opacity-60"
                )}
              >
                {/* Status Icon */}
                <div className="shrink-0">
                  {isComplete && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  )}
                  {isCurrent && (
                    <Loader2 className="w-5 h-5 text-sky-500 animate-spin" />
                  )}
                  {isPending && (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                  )}
                </div>

                {/* Step Label */}
                <p
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isCurrent && "text-sky-700 font-semibold",
                    isComplete && "text-slate-500",
                    isPending && "text-slate-400"
                  )}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Progress</span>
            <span className="font-semibold">
              {Math.round((currentStep / PROCESSING_STEPS.length) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${(currentStep / PROCESSING_STEPS.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Info Note */}
      <div className="mt-6 p-4 rounded-xl bg-sky-50 border border-sky-100 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-sky-900">
            AI-Powered Intelligence
          </p>
          <p className="text-xs text-sky-700 mt-0.5">
            Our AI analyzes your discharge instructions to create a structured recovery plan with medications, daily tasks, warning signs, and milestones tailored to your condition.
          </p>
        </div>
      </div>
    </div>
  );
}
