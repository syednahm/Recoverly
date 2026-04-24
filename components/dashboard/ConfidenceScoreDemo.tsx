"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfidenceScoreCard } from "./ConfidenceScoreCard";
import { getConfidenceBreakdown } from "@/lib/confidence-score";
import {
  simulateTaskCompletion,
  simulateMedicationTaken,
} from "@/lib/confidence-examples";
import type { RecoveryPlan } from "@/types";

interface ConfidenceScoreDemoProps {
  initialPlan: RecoveryPlan;
}

type DemoAction = {
  id: string;
  label: string;
  description: string;
  action: (plan: RecoveryPlan) => RecoveryPlan;
};

export function ConfidenceScoreDemo({ initialPlan }: ConfidenceScoreDemoProps) {
  const [currentPlan, setCurrentPlan] = useState<RecoveryPlan>(initialPlan);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);

  const breakdown = getConfidenceBreakdown(currentPlan);

  const actions: DemoAction[] = [
    {
      id: "med-morning",
      label: "Take morning meds",
      description: "Aspirin + Pantoprazole",
      action: (plan) => {
        let updated = simulateMedicationTaken(plan, "med-3");
        updated = simulateMedicationTaken(updated, "med-4");
        return updated;
      },
    },
    {
      id: "task-pt",
      label: "Complete morning PT",
      description: "15-minute PT routine",
      action: (plan) => simulateTaskCompletion(plan, "task-1"),
    },
    {
      id: "task-ice",
      label: "Ice knee",
      description: "20 minutes with ice pack",
      action: (plan) => simulateTaskCompletion(plan, "task-2"),
    },
    {
      id: "med-afternoon",
      label: "Take afternoon meds",
      description: "Oxycodone + Ibuprofen",
      action: (plan) => {
        let updated = simulateMedicationTaken(plan, "med-1");
        updated = simulateMedicationTaken(updated, "med-2");
        return updated;
      },
    },
    {
      id: "task-walk",
      label: "Evening walk",
      description: "5-10 minute walk",
      action: (plan) => simulateTaskCompletion(plan, "task-3"),
    },
    {
      id: "task-wound",
      label: "Check wound",
      description: "Inspect surgical site",
      action: (plan) => simulateTaskCompletion(plan, "task-4"),
    },
    {
      id: "task-log",
      label: "Log symptoms",
      description: "Record daily symptoms",
      action: (plan) => simulateTaskCompletion(plan, "task-5"),
    },
  ];

  const handleAction = (action: DemoAction) => {
    if (completedActions.has(action.id)) return;

    setIsAnimating(true);
    const updatedPlan = action.action(currentPlan);
    setCurrentPlan(updatedPlan);
    setCompletedActions((prev) => new Set([...prev, action.id]));

    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleReset = () => {
    setCurrentPlan(initialPlan);
    setCompletedActions(new Set());
    setIsAnimating(false);
  };

  const runAllActions = async () => {
    let plan = currentPlan;
    const remainingActions = actions.filter((a) => !completedActions.has(a.id));

    for (const action of remainingActions) {
      setIsAnimating(true);
      plan = action.action(plan);
      setCurrentPlan(plan);
      setCompletedActions((prev) => new Set([...prev, action.id]));
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
    setIsAnimating(false);
  };

  return (
    <div className="space-y-6">
      {/* Score Display */}
      <motion.div
        key={breakdown.overall}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ConfidenceScoreCard breakdown={breakdown} />
      </motion.div>

      {/* Actions Panel */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-black">Daily Actions Demo</CardTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={runAllActions}
                disabled={completedActions.size === actions.length || isAnimating}
              >
                <Play className="w-4 h-4 mr-1.5" />
                Run All
              </Button>
              <Button size="sm" variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-1.5" />
                Reset
              </Button>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Click actions to see how they affect the confidence score
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {actions.map((action) => {
              const isCompleted = completedActions.has(action.id);
              return (
                <motion.button
                  key={action.id}
                  onClick={() => handleAction(action)}
                  disabled={isCompleted}
                  whileHover={!isCompleted ? { scale: 1.02 } : {}}
                  whileTap={!isCompleted ? { scale: 0.98 } : {}}
                  className={`
                    relative p-4 rounded-xl border-2 text-left transition-all
                    ${
                      isCompleted
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-white border-slate-200 hover:border-sky-300 hover:bg-sky-50/50"
                    }
                    ${isCompleted ? "cursor-default" : "cursor-pointer"}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`
                      flex items-center justify-center w-8 h-8 rounded-lg shrink-0
                      ${isCompleted ? "bg-emerald-500" : "bg-slate-100"}
                    `}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2.5} />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-sm font-bold ${
                          isCompleted ? "text-emerald-700" : "text-slate-800"
                        }`}
                      >
                        {action.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{action.description}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Progress Info */}
      <AnimatePresence>
        {completedActions.size === actions.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500">
                <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-base font-black text-emerald-700">All tasks completed!</p>
                <p className="text-sm text-emerald-600 font-medium">
                  Final score: {breakdown.overall}% ({breakdown.label})
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
