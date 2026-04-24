"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2, Pill, AlertTriangle, ClipboardList, Target, ArrowRight, RotateCcw } from "lucide-react";
import type { DischargeInstructions } from "@/types";
import { cn } from "@/lib/utils";

interface ExtractionPreviewProps {
  data: DischargeInstructions;
  onReset: () => void;
}

export function ExtractionPreview({ data, onReset }: ExtractionPreviewProps) {
  const router = useRouter();

  const handleConfirm = () => {
    // In a real app, save this data to the database or state management
    // For now, just route to dashboard
    router.push("/");
  };

  const medicationCount = data.medications?.length || 0;
  const warningCount = data.warningSigns?.length || 0;
  const restrictionCount = data.restrictions?.length || 0;
  const milestoneCount = data.followUpInstructions?.length || 0;

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black mb-2">
              Extraction Complete!
            </h2>
            <p className="text-sm text-emerald-50">
              AI has successfully analyzed your discharge instructions and created a structured recovery plan.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <StatBadge icon={Pill} label="Medications" value={medicationCount} />
          <StatBadge icon={AlertTriangle} label="Warning Signs" value={warningCount} />
          <StatBadge icon={ClipboardList} label="Restrictions" value={restrictionCount} />
          <StatBadge icon={Target} label="Milestones" value={milestoneCount} />
        </div>
      </div>

      {/* Preview Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medications */}
        {data.medications && data.medications.length > 0 && (
          <PreviewCard
            title="Medications Identified"
            icon={Pill}
            color="blue"
            items={data.medications.map((med) => ({
              title: med.name || "Unknown",
              subtitle: `${med.dosage || ""} · ${med.frequency || ""}`.trim(),
            }))}
          />
        )}

        {/* Warning Signs */}
        {data.warningSigns && data.warningSigns.length > 0 && (
          <PreviewCard
            title="Warning Signs"
            icon={AlertTriangle}
            color="red"
            items={data.warningSigns.map((sign) => ({
              title: sign,
            }))}
          />
        )}

        {/* Restrictions */}
        {data.restrictions && data.restrictions.length > 0 && (
          <PreviewCard
            title="Activity Restrictions"
            icon={ClipboardList}
            color="amber"
            items={data.restrictions.map((restriction) => ({
              title: restriction,
            }))}
          />
        )}

        {/* Follow-up Instructions */}
        {data.followUpInstructions && data.followUpInstructions.length > 0 && (
          <PreviewCard
            title="Follow-up Instructions"
            icon={Target}
            color="purple"
            items={data.followUpInstructions.map((instruction) => ({
              title: instruction,
            }))}
          />
        )}
      </div>

      {/* Condition Summary */}
      {data.condition && (
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-2">
            Identified Condition
          </h3>
          <p className="text-base font-semibold text-sky-700">
            {data.condition}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Extracted on {new Date(data.extractedAt || new Date()).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-4 pt-4">
        <button
          onClick={handleConfirm}
          className={cn(
            "flex-1 flex items-center justify-center gap-2",
            "px-6 py-4 rounded-xl font-bold text-base",
            "bg-gradient-to-r from-sky-500 to-blue-600 text-white",
            "hover:from-sky-600 hover:to-blue-700",
            "shadow-lg hover:shadow-xl transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
          )}
        >
          <span>View My Dashboard</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={onReset}
          className={cn(
            "px-6 py-4 rounded-xl font-bold text-base",
            "bg-white border-2 border-slate-300 text-slate-700",
            "hover:bg-slate-50 hover:border-slate-400",
            "transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
          )}
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Info Note */}
      <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 text-center">
        <p className="text-xs text-sky-700">
          This is a demo using mock data. In production, the AI would extract real data from your PDF.
        </p>
      </div>
    </div>
  );
}

function StatBadge({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
      <Icon className="w-5 h-5 text-white shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-black text-white leading-none">{value}</p>
        <p className="text-xs text-emerald-100 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function PreviewCard({
  title,
  icon: Icon,
  color,
  items,
}: {
  title: string;
  icon: React.ElementType;
  color: "blue" | "red" | "amber" | "purple";
  items: { title: string; subtitle?: string }[];
}) {
  const colorStyles = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      text: "text-blue-900",
    },
    red: {
      bg: "bg-rose-50",
      border: "border-rose-200",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
      text: "text-rose-900",
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      text: "text-amber-900",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      text: "text-purple-900",
    },
  };

  const styles = colorStyles[color];

  return (
    <div className={cn("rounded-xl border p-6", styles.bg, styles.border)}>
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", styles.iconBg)}>
          <Icon className={cn("w-4 h-4", styles.iconColor)} />
        </div>
        <h3 className={cn("text-sm font-bold", styles.text)}>{title}</h3>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-white border border-slate-200"
          >
            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
            {item.subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
