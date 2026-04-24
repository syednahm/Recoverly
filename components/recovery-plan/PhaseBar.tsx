"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { RECOVERY_PHASES } from "@/lib/timeline-data";

const CURRENT_DAY = 7;

export function PhaseBar() {
  const currentPhase = RECOVERY_PHASES.find(
    (p) => CURRENT_DAY >= p.startDay && CURRENT_DAY <= p.endDay
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-700">Recovery Roadmap</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            84-day full recovery · 5 phases
          </p>
        </div>
        {currentPhase && (
          <div
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-bold border",
              currentPhase.bgLight,
              currentPhase.textColor,
              currentPhase.border
            )}
          >
            Now: {currentPhase.name}
          </div>
        )}
      </div>

      {/* Segmented bar */}
      <div className="flex gap-1 mb-3">
        {RECOVERY_PHASES.map((phase) => {
          const days = phase.endDay - phase.startDay + 1;
          const isPast = CURRENT_DAY > phase.endDay;
          const isCurrent =
            CURRENT_DAY >= phase.startDay && CURRENT_DAY <= phase.endDay;
          const progressPct = isCurrent
            ? ((CURRENT_DAY - phase.startDay + 1) / days) * 100
            : 0;

          return (
            <div
              key={phase.name}
              className="relative h-5 rounded-lg overflow-hidden"
              style={{ flex: Math.max(days, 7) }}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-slate-100" />

              {/* Filled (past phase) */}
              {isPast && (
                <div
                  className={cn("absolute inset-0 opacity-70", phase.colorClass)}
                />
              )}

              {/* Animated fill (current phase) */}
              {isCurrent && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                  className={cn("absolute inset-y-0 left-0", phase.colorClass)}
                />
              )}

              {/* Pulse shimmer for current */}
              {isCurrent && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              )}
            </div>
          );
        })}
      </div>

      {/* Phase labels */}
      <div className="flex gap-1">
        {RECOVERY_PHASES.map((phase) => {
          const days = phase.endDay - phase.startDay + 1;
          const isPast = CURRENT_DAY > phase.endDay;
          const isCurrent =
            CURRENT_DAY >= phase.startDay && CURRENT_DAY <= phase.endDay;

          return (
            <div
              key={phase.name}
              className="text-center overflow-hidden"
              style={{ flex: Math.max(days, 7) }}
            >
              <p
                className={cn(
                  "text-[9px] font-bold truncate leading-tight",
                  isCurrent
                    ? phase.textColor
                    : isPast
                    ? "text-slate-400"
                    : "text-slate-300"
                )}
              >
                {phase.name}
              </p>
              <p
                className={cn(
                  "text-[8px] leading-tight",
                  isCurrent
                    ? "text-slate-500"
                    : isPast
                    ? "text-slate-300"
                    : "text-slate-200"
                )}
              >
                Days {phase.startDay}–{phase.endDay}
              </p>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-50">
        <LegendDot color="bg-slate-200" label="Upcoming" />
        <LegendDot color="bg-amber-300 opacity-70" label="Past phases" />
        <LegendDot color="bg-amber-400" label="Active (Day 7)" pulse />
        <div className="ml-auto text-xs text-slate-400 font-medium">
          Day 7 of 84
        </div>
      </div>
    </div>
  );
}

function LegendDot({
  color,
  label,
  pulse,
}: {
  color: string;
  label: string;
  pulse?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={cn("w-2.5 h-2.5 rounded-full", color, pulse && "animate-pulse")} />
      <span className="text-[10px] text-slate-400">{label}</span>
    </div>
  );
}
