"use client";

import { motion } from "framer-motion";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Medication } from "@/types";

const FREQUENCY_LABELS: Record<string, string> = {
  once_daily: "Once daily",
  twice_daily: "Twice daily",
  three_times_daily: "3× daily",
  as_needed: "As needed",
  weekly: "Weekly",
};

interface MedicationCardsProps {
  medications: Medication[];
}

export function MedicationCards({ medications }: MedicationCardsProps) {
  const takenCount = medications.filter((m) => m.taken).length;
  const adherencePct = Math.round((takenCount / medications.length) * 100);

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-black text-slate-800">Medications</CardTitle>
          <div className="text-right">
            <p className="text-2xl font-black text-slate-800 leading-none">
              {takenCount}/{medications.length}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">taken today</p>
          </div>
        </div>

        {/* Adherence bar */}
        <div className="mt-3">
          <div className="flex justify-between text-sm text-slate-500 mb-2">
            <span>Adherence this week</span>
            <span className="font-bold text-emerald-600">{adherencePct}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
              initial={{ width: 0 }}
              animate={{ width: `${adherencePct}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {medications.map((med, i) => (
          <motion.div
            key={med.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className={cn(
              "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all",
              med.taken
                ? "bg-slate-50 border-slate-100"
                : "bg-white border-slate-200 hover:border-amber-200"
            )}
          >
            {/* Color swatch */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${med.color}20` }}
            >
              <div
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: med.color }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className={cn(
                "text-base font-bold leading-tight",
                med.taken ? "text-slate-400" : "text-slate-800"
              )}>
                {med.name}
                <span className="text-sm font-normal ml-1.5 text-slate-400">{med.dosage}</span>
              </p>
              <p className="text-sm text-slate-400 mt-0.5">
                {FREQUENCY_LABELS[med.frequency]}
                {!med.taken && med.nextDose && (
                  <span className="ml-1 font-semibold text-amber-600">· Due {med.nextDose}</span>
                )}
              </p>
            </div>

            {/* Status */}
            <div className="shrink-0">
              {med.taken ? (
                <div className="flex flex-col items-center gap-1">
                  <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                  <span className="text-xs font-semibold text-emerald-600">Taken</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <AlertCircle className="w-7 h-7 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-600">Due</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
