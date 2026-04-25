"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface RecoveryProgressRingProps {
  daysSince: number;
  totalDays: number;
}

export function RecoveryProgressRing({ daysSince, totalDays }: RecoveryProgressRingProps) {
  const pct = Math.round((daysSince / totalDays) * 100);
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center">
        <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3 sm:mb-4">
          Recovery Progress
        </p>

        <div className="relative">
          <svg width="120" height="120" viewBox="0 0 140 140" className="-rotate-90 sm:w-[140px] sm:h-[140px]">
            <circle
              cx="70" cy="70" r={radius}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="10"
            />
            <motion.circle
              cx="70" cy="70" r={radius}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="text-4xl font-black text-slate-800 leading-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {pct}%
            </motion.span>
            <span className="text-sm text-slate-400 mt-1 font-medium">complete</span>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-blue-50 w-full">
          <p className="text-xl sm:text-2xl font-black text-blue-700">
            Day {daysSince} of {totalDays}
          </p>
          <p className="text-xs sm:text-sm text-blue-500 mt-0.5 font-medium">
            {totalDays - daysSince} days remaining
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

interface RecoveryConfidenceCardProps {
  score: number;
  aiInsight?: string;
}

export function RecoveryConfidenceCard({ score, aiInsight }: RecoveryConfidenceCardProps) {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const scoreColor = score >= 80 ? "#10B981" : score >= 60 ? "#F59E0B" : "#EF4444";
  const scoreLabel = score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Work";
  const scoreBg = score >= 80 ? "bg-emerald-50" : score >= 60 ? "bg-amber-50" : "bg-red-50";
  const scoreText = score >= 80 ? "text-emerald-700" : score >= 60 ? "text-amber-700" : "text-red-700";
  const scoreSubText = score >= 80 ? "text-emerald-500" : score >= 60 ? "text-amber-500" : "text-red-500";

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">
          Recovery Confidence
        </p>

        <div className="relative">
          <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
            <circle
              cx="70" cy="70" r={radius}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="10"
            />
            <motion.circle
              cx="70" cy="70" r={radius}
              fill="none"
              stroke={scoreColor}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="text-4xl font-black text-slate-800 leading-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {score}%
            </motion.span>
            <span className="text-sm text-slate-400 mt-1 font-medium">score</span>
          </div>
        </div>

        <div className={`mt-4 px-4 py-3 rounded-xl w-full ${scoreBg}`}>
          <p className={`text-2xl font-black ${scoreText}`}>{scoreLabel}</p>
          <p className={`text-sm mt-0.5 font-medium ${scoreSubText}`}>
            AI-powered assessment
          </p>
        </div>

        {aiInsight && (
          <div className="mt-3 flex items-start gap-2 text-left w-full px-1">
            <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-500 leading-snug">{aiInsight}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Keep backward-compat export for anything that might import the old name
interface RecoveryScoreCardProps {
  score: number;
  status: string;
  daysSince: number;
  totalDays: number;
}

export function RecoveryScoreCard({ score, daysSince, totalDays }: RecoveryScoreCardProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <RecoveryProgressRing daysSince={daysSince} totalDays={totalDays} />
      <RecoveryConfidenceCard score={score} />
    </div>
  );
}
