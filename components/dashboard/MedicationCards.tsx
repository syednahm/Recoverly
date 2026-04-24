"use client";

import { motion } from "framer-motion";
import { Pill, Clock, CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Medication } from "@/types";

interface MedicationCardsProps {
  medications: Medication[];
}

export function MedicationCards({ medications }: MedicationCardsProps) {
  const takenCount = medications.filter((m) => m.taken).length;
  const totalCount = medications.length;

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-black text-slate-800">
            Today's Medications
          </CardTitle>
          <div className="text-right">
            <p className="text-2xl font-black text-slate-800 leading-none">
              {takenCount}/{totalCount}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">completed</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {medications.map((med, i) => (
          <motion.div
            key={med.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
          >
            <Card
              className={cn(
                "border-2 transition-all hover:shadow-md",
                med.taken
                  ? "bg-slate-50/50 border-slate-200"
                  : "bg-white border-blue-100 shadow-sm"
              )}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors",
                      med.taken ? "bg-slate-100" : "bg-blue-50"
                    )}
                  >
                    <Pill
                      className={cn(
                        "w-6 h-6",
                        med.taken ? "text-slate-400" : "text-blue-500"
                      )}
                      style={!med.taken ? { color: med.color } : undefined}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h3
                          className={cn(
                            "text-lg font-bold leading-tight",
                            med.taken ? "text-slate-400" : "text-slate-900"
                          )}
                        >
                          {med.name}
                        </h3>
                        <p
                          className={cn(
                            "text-sm font-medium mt-0.5",
                            med.taken ? "text-slate-300" : "text-slate-500"
                          )}
                        >
                          {med.dosage}
                        </p>
                      </div>

                      {med.taken ? (
                        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-xs font-bold">Taken</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-400 border-2 border-slate-200 px-3 py-1.5 rounded-full">
                          <Circle className="w-4 h-4" />
                          <span className="text-xs font-semibold">Pending</span>
                        </div>
                      )}
                    </div>

                    {med.nextDose && !med.taken && (
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-bold text-blue-600">
                          Take at {med.nextDose}
                        </span>
                      </div>
                    )}

                    <p
                      className={cn(
                        "text-sm leading-relaxed",
                        med.taken ? "text-slate-400" : "text-slate-600"
                      )}
                    >
                      {med.purpose}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
