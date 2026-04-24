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
      className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl border-2 ${cfg.bg}`}
    >
      <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
        {/* Icon */}
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 ${cfg.iconBg}`}>
          <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${cfg.iconColor}`} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className={`text-xl sm:text-2xl font-black leading-tight ${cfg.textColor}`}>
            {cfg.headline}
          </p>
          <p className={`text-sm sm:text-base mt-1 ${cfg.subColor}`}>{cfg.sub}</p>
        </div>
      </div>

      {/* Day counter */}
      <div className="flex sm:hidden w-full justify-center">
        <div className="flex items-center gap-4 px-4 py-2 rounded-xl bg-white/70 border border-white w-full justify-center">
          <div className="text-center">
            <p className={`text-2xl font-black tabular-nums leading-none ${cfg.textColor}`}>
              Day {daysSince}
            </p>
            <p className={`text-xs font-semibold mt-0.5 tabular-nums ${cfg.subColor}`}>
              of {totalDays}
            </p>
          </div>
        </div>
      </div>
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
