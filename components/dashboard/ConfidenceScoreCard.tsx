"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  Heart,
  Pill,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ConfidenceBreakdown } from "@/lib/confidence-score";

interface ConfidenceScoreCardProps {
  breakdown: ConfidenceBreakdown;
}

const TrendIcon = ({ trend }: { trend: "up" | "down" | "stable" }) => {
  if (trend === "up") return <TrendingUp className="w-4 h-4" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4" />;
  return <Minus className="w-4 h-4" />;
};

const FactorBar = ({
  icon: Icon,
  label,
  score,
  color,
  delay,
}: {
  icon: any;
  label: string;
  score: number;
  color: string;
  delay: number;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${color} shrink-0`}>
        <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-slate-600">{label}</span>
          <span className="text-xs font-bold text-slate-800">{score}%</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, ease: "easeOut", delay }}
          />
        </div>
      </div>
    </div>
  );
};

export function ConfidenceScoreCard({ breakdown }: ConfidenceScoreCardProps) {
  const { overall, symptomScore, medicationScore, taskCompletionScore, warningScore } = breakdown;

  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (overall / 100) * circumference;

  // Color logic based on score
  const scoreColor = overall >= 80 ? "#10B981" : overall >= 60 ? "#F59E0B" : "#EF4444";
  const scoreBg = overall >= 80 ? "bg-emerald-50" : overall >= 60 ? "bg-amber-50" : "bg-red-50";
  const scoreText = overall >= 80 ? "text-emerald-700" : overall >= 60 ? "text-amber-700" : "text-red-700";
  const scoreSubText = overall >= 80 ? "text-emerald-500" : overall >= 60 ? "text-amber-500" : "text-red-500";
  const scoreBorder =
    overall >= 80 ? "border-emerald-200" : overall >= 60 ? "border-amber-200" : "border-red-200";
  const trendColor =
    breakdown.trending === "up"
      ? "text-emerald-600 bg-emerald-50"
      : breakdown.trending === "down"
      ? "text-red-600 bg-red-50"
      : "text-slate-600 bg-slate-50";

  return (
    <Card className="border-0 shadow-lg bg-white overflow-hidden">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Recovery Confidence
              </p>
            </div>
            <p className="text-sm text-slate-400 font-medium">AI-powered assessment</p>
          </div>
          <Badge className={`${trendColor} border-0 px-2.5 py-1`}>
            <TrendIcon trend={breakdown.trending} />
          </Badge>
        </div>

        {/* Main Score Display */}
        <div className="flex items-center gap-6 mb-6">
          <div className="relative shrink-0">
            <svg width="150" height="150" viewBox="0 0 150 150" className="-rotate-90">
              <circle
                cx="75"
                cy="75"
                r={radius}
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="12"
              />
              <motion.circle
                cx="75"
                cy="75"
                r={radius}
                fill="none"
                stroke={scoreColor}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-5xl font-black text-slate-800 leading-none"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              >
                {overall}
              </motion.span>
              <span className="text-sm text-slate-400 mt-1 font-semibold">score</span>
            </div>
          </div>

          {/* Status Info */}
          <div className="flex-1">
            <div className={`px-4 py-3 rounded-xl ${scoreBg} border-2 ${scoreBorder} mb-3`}>
              <p className={`text-xl font-black ${scoreText} leading-tight`}>{breakdown.label}</p>
              <p className={`text-xs mt-1 font-semibold ${scoreSubText}`}>
                {breakdown.description}
              </p>
            </div>

            {/* Recommendations */}
            <div className="space-y-1.5">
              {breakdown.recommendations.slice(0, 2).map((rec, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + idx * 0.1 }}
                  className="flex items-start gap-2 text-xs text-slate-600 leading-snug"
                >
                  <div className="w-1 h-1 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                  <span className="font-medium">{rec}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Factor Breakdown */}
        <div className="pt-5 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
            Score Factors
          </p>
          <div className="space-y-3.5">
            <FactorBar
              icon={Heart}
              label="Symptoms"
              score={symptomScore}
              color="bg-rose-500"
              delay={0.6}
            />
            <FactorBar
              icon={Pill}
              label="Medications"
              score={medicationScore}
              color="bg-blue-500"
              delay={0.7}
            />
            <FactorBar
              icon={CheckCircle2}
              label="Tasks"
              score={taskCompletionScore}
              color="bg-emerald-500"
              delay={0.8}
            />
            <FactorBar
              icon={AlertTriangle}
              label="Safety"
              score={warningScore}
              color="bg-amber-500"
              delay={0.9}
            />
          </div>
        </div>

        {/* AI Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-5 pt-4 border-t border-slate-100"
        >
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-medium">Updates automatically as you complete tasks</span>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
