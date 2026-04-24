"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Calendar,
  ArrowLeft,
  Sparkles,
  Phone,
  Clock,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckInResultProps {
  result: {
    status: "on_track" | "monitor" | "concern";
    explanation: string;
    recommendedAction: string;
    timestamp: string;
  };
  onNewCheckIn: () => void;
}

const STATUS_CONFIG = {
  on_track: {
    label: "On Track",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    cardBg: "bg-gradient-to-br from-emerald-50 to-green-50",
    iconBg: "bg-emerald-100",
    badgeBg: "bg-emerald-500",
  },
  monitor: {
    label: "Monitor Closely",
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    cardBg: "bg-gradient-to-br from-amber-50 to-orange-50",
    iconBg: "bg-amber-100",
    badgeBg: "bg-amber-500",
  },
  concern: {
    label: "Needs Attention",
    icon: AlertOctagon,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    cardBg: "bg-gradient-to-br from-red-50 to-orange-50",
    iconBg: "bg-red-100",
    badgeBg: "bg-red-500",
  },
};

export function CheckInResult({ result, onNewCheckIn }: CheckInResultProps) {
  const config = STATUS_CONFIG[result.status];
  const Icon = config.icon;
  const timestamp = new Date(result.timestamp);

  return (
    <div className="max-w-3xl space-y-4">
      {/* Status Header Card */}
      <Card
        className={cn(
          "p-8 border-2 shadow-xl",
          config.border,
          config.cardBg
        )}
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className={cn(
              "flex items-center justify-center w-14 h-14 rounded-2xl shrink-0",
              config.iconBg
            )}
          >
            <Icon className={cn("w-7 h-7", config.color)} strokeWidth={2.5} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className={cn("text-2xl font-black", config.color)}>
                {config.label}
              </h2>
              <Badge
                className={cn(
                  "text-white border-0 font-semibold",
                  config.badgeBg
                )}
              >
                AI-Analyzed
              </Badge>
            </div>
            <p className="text-sm text-slate-600 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              {timestamp.toLocaleDateString("en", {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </Card>

      {/* Explanation Card */}
      <Card className="p-6 border-slate-200 shadow-md">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 shrink-0">
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              AI Assessment
            </h3>
            <p className="text-xs text-slate-500">
              Based on your reported symptoms and recovery stage
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed pl-11">
          {result.explanation}
        </p>
      </Card>

      {/* Recommended Action Card */}
      <Card className="p-6 border-sky-200 bg-sky-50 shadow-md">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-100 shrink-0">
            <FileText className="w-4 h-4 text-sky-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Recommended Next Steps
            </h3>
            <p className="text-xs text-slate-600">
              What you should do based on this check-in
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed pl-11">
          {result.recommendedAction}
        </p>
      </Card>

      {/* Quick Actions */}
      {result.status === "concern" && (
        <Card className="p-6 border-red-200 bg-red-50 shadow-md">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 shrink-0">
              <Phone className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-red-900 mb-2">
                Contact Your Healthcare Team
              </h3>
              <div className="space-y-2">
                <Button
                  className="w-full justify-start h-auto py-3 bg-white hover:bg-red-50 text-red-700 border-2 border-red-200 font-semibold"
                  variant="outline"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Primary Care: (555) 123-4567
                </Button>
                <Button
                  className="w-full justify-start h-auto py-3 bg-white hover:bg-red-50 text-red-700 border-2 border-red-200 font-semibold"
                  variant="outline"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  After-Hours Nurse Line: (555) 987-6543
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button
          onClick={onNewCheckIn}
          variant="outline"
          className="flex-1 h-11 font-semibold border-slate-300 hover:bg-slate-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          New Check-In
        </Button>
        <Button
          variant="outline"
          className="flex-1 h-11 font-semibold border-sky-300 text-sky-700 hover:bg-sky-50"
        >
          <Calendar className="w-4 h-4 mr-2" />
          View History
        </Button>
      </div>

      {/* Footer Note */}
      <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
        <p className="text-xs text-slate-600 leading-relaxed">
          <span className="font-semibold">Note:</span> This assessment is based on
          AI analysis and should not replace professional medical advice. Always
          consult your healthcare provider for medical concerns.
        </p>
      </div>
    </div>
  );
}
