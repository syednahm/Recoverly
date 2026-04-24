"use client";

import { AlertCircle, AlertTriangle, Eye, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { RiskAlert, RiskLevel } from "@/types/risk-assessment";

interface RiskAlertItemProps {
  alert: RiskAlert;
}

export function RiskAlertItem({ alert }: RiskAlertItemProps) {
  const config = getAlertConfig(alert.level);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "rounded-xl border-2 p-4 transition-all hover:shadow-md",
        config.borderColor,
        config.bgColor
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
            config.iconBg
          )}
        >
          <config.Icon className={cn("w-4.5 h-4.5", config.iconColor)} strokeWidth={2.5} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title and confidence */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h5 className={cn("text-sm font-bold leading-tight", config.titleColor)}>
              {alert.title}
            </h5>
            
            {/* Confidence indicator */}
            <div className="flex items-center gap-1 shrink-0">
              <Sparkles className={cn("w-3 h-3", config.accentColor)} />
              <span className={cn("text-[10px] font-bold", config.accentColor)}>
                {alert.confidence}%
              </span>
            </div>
          </div>

          {/* Description */}
          <p className={cn("text-xs leading-relaxed mb-2", config.descColor)}>
            {alert.description}
          </p>

          {/* Escalation suggestion */}
          <div className={cn("rounded-lg px-3 py-2 mb-3", config.suggestionBg)}>
            <p className={cn("text-xs font-semibold", config.suggestionColor)}>
              {config.actionLabel} {alert.escalationSuggestion}
            </p>
          </div>

          {/* Metadata row */}
          <div className="flex items-center gap-4 text-[10px]">
            {/* Category badge */}
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide",
                  config.badgeBg,
                  config.badgeText
                )}
              >
                {alert.category}
              </span>
            </div>

            {/* Timeframe if actionable */}
            {alert.actionable && alert.timeframe && (
              <div className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3 h-3" />
                <span className="font-medium">{alert.timeframe}</span>
              </div>
            )}

            {/* Not actionable indicator */}
            {!alert.actionable && (
              <div className="flex items-center gap-1 text-emerald-600">
                <CheckCircle2 className="w-3 h-3" />
                <span className="font-medium">No action required</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function getAlertConfig(level: RiskLevel) {
  switch (level) {
    case "urgent":
      return {
        Icon: AlertCircle,
        titleColor: "text-red-900",
        descColor: "text-red-700",
        bgColor: "bg-red-50",
        borderColor: "border-red-300",
        iconBg: "bg-red-600",
        iconColor: "text-white",
        suggestionBg: "bg-red-100/80",
        suggestionColor: "text-red-900",
        accentColor: "text-red-600",
        badgeBg: "bg-red-200",
        badgeText: "text-red-900",
        actionLabel: "🚨",
      };
    case "caution":
      return {
        Icon: AlertTriangle,
        titleColor: "text-amber-900",
        descColor: "text-amber-700",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-300",
        iconBg: "bg-amber-500",
        iconColor: "text-white",
        suggestionBg: "bg-amber-100/80",
        suggestionColor: "text-amber-900",
        accentColor: "text-amber-600",
        badgeBg: "bg-amber-200",
        badgeText: "text-amber-900",
        actionLabel: "⚠️",
      };
    case "monitor":
      return {
        Icon: Eye,
        titleColor: "text-sky-900",
        descColor: "text-sky-700",
        bgColor: "bg-sky-50",
        borderColor: "border-sky-300",
        iconBg: "bg-sky-500",
        iconColor: "text-white",
        suggestionBg: "bg-sky-100/80",
        suggestionColor: "text-sky-900",
        accentColor: "text-sky-600",
        badgeBg: "bg-sky-200",
        badgeText: "text-sky-900",
        actionLabel: "👁️",
      };
    case "all_clear":
      return {
        Icon: CheckCircle2,
        titleColor: "text-emerald-900",
        descColor: "text-emerald-700",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-300",
        iconBg: "bg-emerald-500",
        iconColor: "text-white",
        suggestionBg: "bg-emerald-100/80",
        suggestionColor: "text-emerald-900",
        accentColor: "text-emerald-600",
        badgeBg: "bg-emerald-200",
        badgeText: "text-emerald-900",
        actionLabel: "✓",
      };
  }
}
