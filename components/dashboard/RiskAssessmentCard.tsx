"use client";

import { AlertCircle, AlertTriangle, Eye, Shield, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { RiskAssessment, RiskLevel } from "@/types/risk-assessment";
import { RiskAlertItem } from "./RiskAlertItem";

interface RiskAssessmentCardProps {
  assessment: RiskAssessment;
}

export function RiskAssessmentCard({ assessment }: RiskAssessmentCardProps) {
  const config = getRiskConfig(assessment.overallRisk);
  const TrendIcon = getTrendIcon(assessment.trendDirection);

  return (
    <div className="space-y-4">
      {/* Main Risk Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "rounded-2xl border-2 overflow-hidden shadow-lg",
          config.borderColor
        )}
      >
        {/* Header with gradient background */}
        <div className={cn("px-6 py-5", config.bgGradient)}>
          <div className="flex items-start gap-4">
            {/* Risk Icon */}
            <div
              className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-md",
                config.iconBg
              )}
            >
              <config.Icon className={cn("w-7 h-7", config.iconColor)} strokeWidth={2.5} />
            </div>

            {/* Status and description */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={cn("text-xl font-black", config.titleColor)}>
                  {config.title}
                </h3>
                <span
                  className={cn(
                    "text-xs font-bold px-2 py-0.5 rounded-full",
                    config.badgeBg,
                    config.badgeText
                  )}
                >
                  {assessment.overallConfidence}% confidence
                </span>
              </div>
              <p className={cn("text-sm font-medium", config.descColor)}>
                {assessment.aiReasoning}
              </p>
            </div>

            {/* Trend indicator */}
            <div className="flex flex-col items-center gap-1">
              <TrendIcon className={cn("w-5 h-5", getTrendColor(assessment.trendDirection))} />
              <span className="text-[10px] font-semibold text-slate-600 capitalize">
                {assessment.trendDirection}
              </span>
            </div>
          </div>

          {/* Assessment factors summary */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <FactorPill
                label="Recovery"
                value={assessment.assessmentFactors.recoveryDayContext}
                color={config.pillColor}
              />
              <FactorPill
                label="Medications"
                value={`${Math.round(assessment.assessmentFactors.medicationAdherence)}%`}
                color={config.pillColor}
              />
              <FactorPill
                label="Symptoms"
                value={`${assessment.assessmentFactors.symptomCount} tracked`}
                color={config.pillColor}
              />
              <FactorPill
                label="Next Check"
                value={formatNextCheck(assessment.nextAssessmentRecommended)}
                color={config.pillColor}
              />
            </div>
          </div>
        </div>

        {/* Detailed alerts section */}
        {assessment.alerts.length > 0 && (
          <div className="bg-white px-6 py-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-slate-600" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">
                Risk Breakdown ({assessment.alerts.length})
              </h4>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="space-y-3">
              {assessment.alerts.map((alert) => (
                <RiskAlertItem key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Last assessed timestamp */}
      <div className="flex items-center gap-2 text-xs text-slate-400 px-1">
        <Shield className="w-3.5 h-3.5" />
        <span>
          Last assessed:{" "}
          {new Date(assessment.lastAssessedAt).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}

function FactorPill({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className={cn("rounded-lg px-3 py-2 border border-white/30", color)}>
      <p className="text-[10px] font-semibold text-white/80 uppercase tracking-wide mb-0.5">
        {label}
      </p>
      <p className="text-xs font-bold text-white truncate">{value}</p>
    </div>
  );
}

function getRiskConfig(level: RiskLevel) {
  switch (level) {
    case "urgent":
      return {
        Icon: AlertCircle,
        title: "Urgent Attention Needed",
        titleColor: "text-red-900",
        descColor: "text-red-800",
        bgGradient: "bg-gradient-to-br from-red-100 via-red-50 to-rose-50",
        iconBg: "bg-red-600",
        iconColor: "text-white",
        borderColor: "border-red-300",
        badgeBg: "bg-red-200",
        badgeText: "text-red-900",
        pillColor: "bg-red-600/90",
      };
    case "caution":
      return {
        Icon: AlertTriangle,
        title: "Caution Recommended",
        titleColor: "text-amber-900",
        descColor: "text-amber-800",
        bgGradient: "bg-gradient-to-br from-amber-100 via-amber-50 to-yellow-50",
        iconBg: "bg-amber-500",
        iconColor: "text-white",
        borderColor: "border-amber-300",
        badgeBg: "bg-amber-200",
        badgeText: "text-amber-900",
        pillColor: "bg-amber-500/90",
      };
    case "monitor":
      return {
        Icon: Eye,
        title: "Continue Monitoring",
        titleColor: "text-sky-900",
        descColor: "text-sky-800",
        bgGradient: "bg-gradient-to-br from-sky-100 via-sky-50 to-cyan-50",
        iconBg: "bg-sky-500",
        iconColor: "text-white",
        borderColor: "border-sky-300",
        badgeBg: "bg-sky-200",
        badgeText: "text-sky-900",
        pillColor: "bg-sky-500/90",
      };
    case "all_clear":
      return {
        Icon: Shield,
        title: "All Clear",
        titleColor: "text-emerald-900",
        descColor: "text-emerald-800",
        bgGradient: "bg-gradient-to-br from-emerald-100 via-emerald-50 to-green-50",
        iconBg: "bg-emerald-500",
        iconColor: "text-white",
        borderColor: "border-emerald-300",
        badgeBg: "bg-emerald-200",
        badgeText: "text-emerald-900",
        pillColor: "bg-emerald-500/90",
      };
  }
}

function getTrendIcon(trend: "improving" | "stable" | "worsening") {
  switch (trend) {
    case "improving":
      return TrendingDown;
    case "worsening":
      return TrendingUp;
    case "stable":
      return Minus;
  }
}

function getTrendColor(trend: "improving" | "stable" | "worsening"): string {
  switch (trend) {
    case "improving":
      return "text-emerald-600";
    case "worsening":
      return "text-red-600";
    case "stable":
      return "text-slate-500";
  }
}

function formatNextCheck(nextCheck: string): string {
  // Simplify long strings
  if (nextCheck.includes("scheduled")) return "48 hours";
  if (nextCheck.includes("12 hours")) return "12 hours";
  if (nextCheck.includes("24 hours")) return "24 hours";
  if (nextCheck.includes("After")) return "After care";
  return nextCheck;
}
