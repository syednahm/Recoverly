"use client";

import { AlertTriangle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { WarningSigns } from "@/types";

interface WarningBannerProps {
  warnings: WarningSigns[];
}

export function WarningBanner({ warnings }: WarningBannerProps) {
  const [expanded, setExpanded] = useState(false);
  const criticals = warnings.filter((w) => w.severity === "critical");
  const cautions = warnings.filter((w) => w.severity === "warning");

  return (
    <div className="space-y-2">
      {criticals.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 overflow-hidden">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-left"
            onClick={() => setExpanded(!expanded)}
          >
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-red-800">
                {criticals.length} Critical Warning Sign{criticals.length > 1 ? "s" : ""}
              </p>
              <p className="text-xs text-red-600">Know when to seek immediate care</p>
            </div>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-red-400 shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-red-400 shrink-0" />
            )}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-3 space-y-2 border-t border-red-200">
                  {criticals.map((w) => (
                    <div key={w.id} className="pt-2">
                      <p className="text-xs font-bold text-red-800">{w.title}</p>
                      <p className="text-xs text-red-600 mt-0.5">{w.description}</p>
                      <p className="text-xs font-semibold text-red-700 mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                        {w.actionRequired}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {cautions.map((w) => (
        <div
          key={w.id}
          className={cn(
            "flex items-start gap-3 px-4 py-3 rounded-xl border",
            "border-amber-200 bg-amber-50"
          )}
        >
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-800">{w.title}</p>
            <p className="text-xs text-amber-600 mt-0.5">{w.description}</p>
            <p className="text-xs font-semibold text-amber-700 mt-1">{w.actionRequired}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
