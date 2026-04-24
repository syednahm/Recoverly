"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Home, MoveUp, Activity, Sparkles, Trophy, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { RecoveryMilestone } from "@/types";

const ICONS: Record<string, React.ElementType> = {
  Home,
  PersonStanding: Activity,
  MoveUp,
  Footprints: Activity,
  Activity,
  Sparkles,
  Trophy,
  Star,
};

interface MilestoneTimelineProps {
  milestones: RecoveryMilestone[];
}

export function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  const achieved = milestones.filter((m) => m.achieved).length;
  // Show only 4 milestones max to keep it uncluttered
  const visible = milestones.slice(0, 4);

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-black text-slate-800">Milestones</CardTitle>
          <span className="text-base font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            {achieved}/{milestones.length}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-100" />

          <div className="space-y-5">
            {visible.map((ms, i) => {
              const Icon = ICONS[ms.icon] ?? Activity;
              const isNext = !ms.achieved && milestones[i - 1]?.achieved !== false;

              return (
                <motion.div
                  key={ms.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 relative"
                >
                  {/* Node */}
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 border-2 transition-all",
                    ms.achieved
                      ? "bg-emerald-500 border-emerald-500 shadow-md shadow-emerald-100"
                      : isNext
                        ? "bg-sky-50 border-sky-300"
                        : "bg-white border-slate-200"
                  )}>
                    {ms.achieved ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <Icon className={cn(
                        "w-5 h-5",
                        isNext ? "text-sky-500" : "text-slate-300"
                      )} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1 pb-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={cn(
                        "text-base font-bold leading-tight",
                        ms.achieved ? "text-slate-700" : isNext ? "text-slate-800" : "text-slate-400"
                      )}>
                        {ms.title}
                      </p>
                      <span className={cn(
                        "text-xs font-semibold shrink-0 px-2 py-0.5 rounded-full",
                        ms.achieved
                          ? "bg-emerald-100 text-emerald-700"
                          : isNext
                            ? "bg-sky-100 text-sky-700"
                            : "bg-slate-100 text-slate-400"
                      )}>
                        {ms.achieved && ms.achievedDate
                          ? new Date(ms.achievedDate).toLocaleDateString("en", { month: "short", day: "numeric" })
                          : isNext
                            ? "Up next"
                            : new Date(ms.targetDate).toLocaleDateString("en", { month: "short", day: "numeric" })
                        }
                      </span>
                    </div>
                    <p className={cn(
                      "text-sm mt-0.5 leading-snug",
                      ms.achieved ? "text-slate-400" : "text-slate-500"
                    )}>
                      {ms.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
