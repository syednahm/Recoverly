"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { RecoveryTask } from "@/types";

const CATEGORY_COLORS: Record<string, string> = {
  exercise: "bg-blue-100 text-blue-700",
  wound_care: "bg-rose-100 text-rose-700",
  diet: "bg-green-100 text-green-700",
  rest: "bg-purple-100 text-purple-700",
  monitoring: "bg-amber-100 text-amber-700",
  appointment: "bg-cyan-100 text-cyan-700",
};

const CATEGORY_LABELS: Record<string, string> = {
  exercise: "Exercise",
  wound_care: "Wound Care",
  diet: "Diet",
  rest: "Rest",
  monitoring: "Monitoring",
  appointment: "Appointment",
};

interface TodayChecklistProps {
  tasks: RecoveryTask[];
}

export function TodayChecklist({ tasks }: TodayChecklistProps) {
  const [items, setItems] = useState(tasks);

  const completedCount = items.filter((t) => t.completed).length;
  const totalCount = items.length;
  const pct = Math.round((completedCount / totalCount) * 100);

  function toggleTask(id: string) {
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-black text-slate-800">
            Today&apos;s Tasks
          </CardTitle>
          <div className="flex items-center gap-2">
            {completedCount === totalCount && (
              <div className="flex items-center gap-1 text-amber-500">
                <Flame className="w-4 h-4" />
                <span className="text-sm font-bold">All done!</span>
              </div>
            )}
            <span className="text-base font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              {completedCount}/{totalCount}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex justify-between text-sm text-slate-500 mb-2">
            <span>Daily Progress</span>
            <span className="font-bold text-slate-700">{pct}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400"
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <AnimatePresence>
          {items.map((task) => (
            <motion.button
              key={task.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "w-full flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200",
                task.completed
                  ? "bg-slate-50 border-slate-100"
                  : "bg-white border-slate-200 hover:border-sky-300 hover:bg-sky-50/30 active:bg-sky-50"
              )}
              onClick={() => toggleTask(task.id)}
            >
              <div className="mt-0.5 shrink-0">
                {task.completed ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                ) : (
                  <Circle className={cn(
                    "w-7 h-7",
                    task.priority === "high" ? "text-red-400" : "text-slate-300"
                  )} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-base font-bold leading-snug",
                  task.completed ? "text-slate-400 line-through" : "text-slate-800"
                )}>
                  {task.title}
                </p>
                <p className={cn(
                  "text-sm mt-1 leading-snug",
                  task.completed ? "text-slate-300" : "text-slate-500"
                )}>
                  {task.description}
                </p>
              </div>

              <div className="shrink-0 flex flex-col items-end gap-1.5">
                <span className={cn(
                  "text-xs font-bold px-2.5 py-1 rounded-lg",
                  CATEGORY_COLORS[task.category]
                )}>
                  {CATEGORY_LABELS[task.category]}
                </span>
                {task.priority === "high" && !task.completed && (
                  <span className="text-xs font-semibold text-red-500">Priority</span>
                )}
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
