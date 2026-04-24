"use client";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface PainLevelSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const PAIN_LEVELS = [
  { value: 1, label: "Minimal", color: "text-emerald-600", bg: "bg-emerald-100" },
  { value: 2, label: "Mild", color: "text-emerald-600", bg: "bg-emerald-100" },
  { value: 3, label: "Mild", color: "text-emerald-600", bg: "bg-emerald-100" },
  { value: 4, label: "Moderate", color: "text-amber-600", bg: "bg-amber-100" },
  { value: 5, label: "Moderate", color: "text-amber-600", bg: "bg-amber-100" },
  { value: 6, label: "Moderate", color: "text-amber-600", bg: "bg-amber-100" },
  { value: 7, label: "Severe", color: "text-orange-600", bg: "bg-orange-100" },
  { value: 8, label: "Severe", color: "text-red-600", bg: "bg-red-100" },
  { value: 9, label: "Very Severe", color: "text-red-600", bg: "bg-red-100" },
  { value: 10, label: "Worst Possible", color: "text-red-700", bg: "bg-red-100" },
];

export function PainLevelSlider({ value, onChange }: PainLevelSliderProps) {
  const currentLevel = PAIN_LEVELS[value - 1];

  return (
    <div className="select-none">
      <div className="flex items-center justify-between mb-3">
        <label className="text-base font-semibold text-slate-900">
          Current Pain Level
        </label>
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold",
            currentLevel.bg,
            currentLevel.color
          )}
        >
          <span className="text-lg">{value}</span>
          <span className="text-xs opacity-90">/ 10</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Slider — thick track, large hit area, grab cursor; select-none on section prevents text highlight while dragging */}
        <div className="px-1 py-0.5 -mx-1">
          <Slider
            value={[value]}
            onValueChange={(values) => {
              const val = Array.isArray(values) ? values[0] : values;
              onChange(val);
            }}
            min={1}
            max={10}
            step={1}
            className="w-full cursor-grab touch-none active:cursor-grabbing"
          />
        </div>

        {/* Visual Scale */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex flex-col items-start">
            <span className="font-semibold text-emerald-600">1-3</span>
            <span className="text-slate-500">Minimal</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-amber-600">4-6</span>
            <span className="text-slate-500">Moderate</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-semibold text-red-600">7-10</span>
            <span className="text-slate-500">Severe</span>
          </div>
        </div>

        {/* Current Description */}
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
          <p className={cn("text-sm font-medium", currentLevel.color)}>
            {currentLevel.label} pain: {getPainDescription(value)}
          </p>
        </div>
      </div>
    </div>
  );
}

function getPainDescription(level: number): string {
  if (level <= 3) return "Noticeable but doesn't interfere with daily activities.";
  if (level <= 6) return "Interferes with some activities, manageable with medication.";
  if (level <= 8) return "Significantly limits your activities, difficult to ignore.";
  return "Severe pain that prevents most activities.";
}
