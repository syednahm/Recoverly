"use client";

import Link from "next/link";
import { Upload, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function UploadPrompt() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 via-blue-600 to-purple-600 p-8 shadow-xl">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
            <Upload className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-black text-white">
                Upload Your Discharge Instructions
              </h3>
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <p className="text-sm text-blue-50 mb-6 max-w-2xl">
              Transform your hospital paperwork into a personalized recovery plan. 
              Our AI will extract medications, tasks, warning signs, and milestones to power your dashboard.
            </p>

            {/* CTA Button */}
            <Link
              href="/upload"
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-xl",
                "bg-white text-sky-700 font-bold text-sm",
                "hover:bg-blue-50 hover:shadow-lg",
                "transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sky-600"
              )}
            >
              <Upload className="w-4 h-4" />
              <span>Upload Discharge PDF</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Feature text="AI extracts all medications & schedules" />
          <Feature text="Identifies warning signs & restrictions" />
          <Feature text="Generates personalized recovery plan" />
        </div>
      </div>
    </div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 mt-0.5">
        <svg
          className="w-3 h-3 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-xs text-blue-50 font-medium leading-relaxed">{text}</p>
    </div>
  );
}
