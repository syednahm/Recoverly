"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ConfidenceBreakdown } from "@/lib/confidence-score";

interface ConfidenceBadgeProps {
  breakdown: ConfidenceBreakdown;
  variant?: "default" | "compact";
}

export function ConfidenceBadge({ breakdown, variant = "default" }: ConfidenceBadgeProps) {
  const { overall, trending } = breakdown;

  const scoreColor = overall >= 80 ? "bg-emerald-500" : overall >= 60 ? "bg-amber-500" : "bg-red-500";
  const scoreBg = overall >= 80 ? "bg-emerald-50" : overall >= 60 ? "bg-amber-50" : "bg-red-50";
  const scoreText = overall >= 80 ? "text-emerald-700" : overall >= 60 ? "text-amber-700" : "text-red-700";
  const scoreBorder =
    overall >= 80 ? "border-emerald-200" : overall >= 60 ? "border-amber-200" : "border-red-200";

  const TrendIcon =
    trending === "up" ? TrendingUp : trending === "down" ? TrendingDown : Minus;

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${scoreBg} border ${scoreBorder}`}
      >
        <Sparkles className="w-3.5 h-3.5 text-sky-500" />
        <span className={`text-sm font-bold ${scoreText}`}>{overall}%</span>
        <TrendIcon className={`w-3.5 h-3.5 ${scoreText}`} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-xl ${scoreBg} border-2 ${scoreBorder}`}
    >
      <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${scoreColor}`}>
        <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`text-lg font-black ${scoreText} leading-none`}>{overall}%</span>
          <TrendIcon className={`w-4 h-4 ${scoreText}`} strokeWidth={2.5} />
        </div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Confidence
        </p>
      </div>
    </motion.div>
  );
}
