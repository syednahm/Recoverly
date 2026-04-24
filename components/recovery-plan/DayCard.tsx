"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Activity,
  Trophy,
  Brain,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DayPlan, PhaseColor, SymptomSeverity } from "@/lib/timeline-data";

const PHASE_COLORS: Record<
  PhaseColor,
  { border: string; badge: string }
> = {
  red: {
    border: "border-l-rose-400",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
  },
  amber: {
    border: "border-l-amber-400",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  sky: {
    border: "border-l-sky-400",
    badge: "bg-sky-50 text-sky-700 border-sky-200",
  },
  violet: {
    border: "border-l-violet-400",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
  },
  emerald: {
    border: "border-l-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

const SEVERITY_CONFIG: Record<
  SymptomSeverity,
  { cls: string; dot: string }
> = {
  mild: {
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-400",
  },
  moderate: {
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-400",
  },
  severe: {
    cls: "bg-rose-50 text-rose-700 border-rose-200",
    dot: "bg-rose-400",
  },
};

function PainBar({ range }: { range: [number, number] }) {
  return (
    <div className="flex flex-col items-end gap-1 shrink-0">
      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
        Pain
      </span>
      <div className="flex items-end gap-0.5">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((level) => {
          const inRange = level >= range[0] && level <= range[1];
          const barColor = inRange
            ? level <= 3
              ? "bg-emerald-400"
              : level <= 5
              ? "bg-amber-400"
              : level <= 7
              ? "bg-orange-400"
              : "bg-rose-500"
            : "bg-slate-150 border border-slate-200";
          return (
            <div
              key={level}
              className={cn(
                "w-2 rounded-sm transition-all",
                barColor,
                inRange ? "h-5" : "h-3 bg-slate-200"
              )}
            />
          );
        })}
      </div>
      <span className="text-[10px] text-slate-400">
        {range[0]}–{range[1]} / 10
      </span>
    </div>
  );
}

interface SectionProps {
  title: string;
  icon: React.ElementType;
  iconColor: string;
  children: React.ReactNode;
}

function Section({ title, icon: Icon, iconColor, children }: SectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 mb-0.5">
        <Icon className={cn("w-3.5 h-3.5 shrink-0", iconColor)} />
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          {title}
        </span>
      </div>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

interface DayCardProps {
  day: DayPlan;
  index: number;
}

export function DayCard({ day, index }: DayCardProps) {
  const colors = PHASE_COLORS[day.phaseColor];
  const isCurrent = day.status === "current";
  const isCompleted = day.status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "border-l-4 bg-white transition-shadow duration-200",
          colors.border,
          isCurrent
            ? "ring-2 ring-sky-200 shadow-lg shadow-sky-100/60"
            : isCompleted
            ? "shadow-sm hover:shadow-md opacity-90 hover:opacity-100"
            : "shadow-sm opacity-70"
        )}
      >
        <CardContent className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] font-bold h-5 px-2 rounded-full",
                    colors.badge
                  )}
                >
                  {day.phase}
                </Badge>
                {isCurrent && (
                  <Badge className="text-[10px] font-bold h-5 px-2 rounded-full bg-sky-500 text-white border-0">
                    TODAY
                  </Badge>
                )}
                {isCompleted && (
                  <Badge
                    variant="outline"
                    className="text-[10px] font-bold h-5 px-2 rounded-full bg-emerald-50 text-emerald-700 border-emerald-200"
                  >
                    Completed
                  </Badge>
                )}
                {day.checkpoint && (
                  <Badge
                    variant="outline"
                    className="text-[10px] font-bold h-5 px-2 rounded-full bg-blue-50 text-blue-700 border-blue-200"
                  >
                    ✦ Checkpoint
                  </Badge>
                )}
              </div>
              <h3 className="text-base font-black text-slate-900 leading-tight">
                {day.title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">{day.date}</p>
            </div>
            <PainBar range={day.painRange} />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {/* Expected Symptoms */}
            <Section
              title="Expected Symptoms"
              icon={Activity}
              iconColor="text-rose-400"
            >
              <div className="flex flex-wrap gap-1.5">
                {day.symptoms.map((s, i) => {
                  const sc = SEVERITY_CONFIG[s.severity];
                  return (
                    <span
                      key={i}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] rounded-full border font-medium",
                        sc.cls
                      )}
                    >
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full shrink-0",
                          sc.dot
                        )}
                      />
                      {s.name}
                    </span>
                  );
                })}
              </div>
            </Section>

            {/* Healing Milestones */}
            <Section
              title="Healing Milestones"
              icon={Trophy}
              iconColor="text-emerald-500"
            >
              <div className="flex flex-col gap-1.5">
                {day.milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-600 leading-snug">
                      {m}
                    </span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Safe Activities */}
            <Section
              title="Safe Activities"
              icon={CheckCircle2}
              iconColor="text-sky-500"
            >
              <div className="flex flex-col gap-1.5">
                {day.safeActivities.map((a, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-sky-100 border border-sky-300 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    </div>
                    <span className="text-xs text-slate-600 leading-snug">
                      {a}
                    </span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Restrictions */}
            <Section
              title="Restrictions"
              icon={XCircle}
              iconColor="text-amber-500"
            >
              <div className="flex flex-col gap-1.5">
                {day.restrictions.map((r, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <XCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-600 leading-snug">
                      {r}
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Follow-up Checkpoint */}
          {day.checkpoint && (
            <div className="mt-4 p-3.5 rounded-xl bg-blue-50 border border-blue-200">
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-blue-800">
                    {day.checkpoint.title}
                  </p>
                  <p className="text-xs text-blue-600 mt-0.5 leading-relaxed">
                    {day.checkpoint.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* AI Note */}
          {day.aiNote && (
            <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
              <Brain className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500 italic leading-relaxed">
                {day.aiNote}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
