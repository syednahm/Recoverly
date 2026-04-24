"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import type { RecoveryStatus } from "@/types";

interface StatusBannerProps {
  status: RecoveryStatus;
  daysSince: number;
  totalDays: number;
}

const STATUS_CONFIG = {
  on_track: {
    icon: CheckCircle2,
    bg: "bg-emerald-50 border-emerald-200",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    textColor: "text-emerald-800",
    subColor: "text-emerald-600",
    headline: "You Are On Track",
    sub: "Keep following your plan — you're recovering well.",
    dot: "bg-emerald-400",
  },
  needs_attention: {
    icon: AlertTriangle,
    bg: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    textColor: "text-amber-800",
    subColor: "text-amber-600",
    headline: "Needs Attention",
    sub: "Some tasks or symptoms may need your focus today.",
    dot: "bg-amber-400",
  },
  at_risk: {
    icon: AlertCircle,
    bg: "bg-red-50 border-red-200",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    textColor: "text-red-800",
    subColor: "text-red-600",
    headline: "Needs Attention",
    sub: "Please contact your care team or check your warning signs.",
    dot: "bg-red-400",
  },
  completed: {
    icon: CheckCircle2,
    bg: "bg-emerald-50 border-emerald-200",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    textColor: "text-emerald-800",
    subColor: "text-emerald-600",
    headline: "Recovery Complete",
    sub: "You have successfully completed your recovery plan.",
    dot: "bg-emerald-400",
  },
};

export function StatusBanner({ status, daysSince, totalDays }: StatusBannerProps) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.on_track;
  const Icon = cfg.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center gap-5 p-5 rounded-2xl border-2 ${cfg.bg}`}
    >
      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${cfg.iconBg}`}>
        <Icon className={`w-7 h-7 ${cfg.iconColor}`} />
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className={`text-2xl font-black leading-tight ${cfg.textColor}`}>
          {cfg.headline}
        </p>
        <p className={`text-base mt-1 ${cfg.subColor}`}>{cfg.sub}</p>
      </div>

      {/* Day counter */}
      <div className="hidden sm:flex flex-col items-center justify-center px-5 py-3 rounded-xl bg-white/70 border border-white shrink-0">
        <p className={`text-3xl font-black tabular-nums leading-none ${cfg.textColor}`}>
          Day {daysSince}
        </p>
        <p className={`text-sm font-semibold mt-1 tabular-nums ${cfg.subColor}`}>
          of {totalDays}
        </p>
      </div>
    </motion.div>
  );
}
