"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Droplets,
  Thermometer,
  Waves,
  AlertCircle,
  Battery,
} from "lucide-react";

interface SymptomSelectorProps {
  selected: string[];
  onChange: (symptoms: string[]) => void;
}

const SYMPTOMS = [
  {
    id: "swelling",
    label: "Swelling",
    description: "Puffiness or enlargement around surgical site",
    icon: Droplets,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    id: "fever",
    label: "Fever",
    description: "Body temperature above 100.4°F (38°C)",
    icon: Thermometer,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  {
    id: "nausea",
    label: "Nausea",
    description: "Feeling of sickness or discomfort in stomach",
    icon: Waves,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  {
    id: "redness",
    label: "Redness",
    description: "Unusual redness or warmth around incision",
    icon: AlertCircle,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  {
    id: "fatigue",
    label: "Fatigue",
    description: "Unusual tiredness or lack of energy",
    icon: Battery,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
];

export function SymptomSelector({ selected, onChange }: SymptomSelectorProps) {
  const toggleSymptom = (symptomId: string) => {
    if (selected.includes(symptomId)) {
      onChange(selected.filter((id) => id !== symptomId));
    } else {
      onChange([...selected, symptomId]);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="text-base font-semibold text-slate-900">
          Symptoms You're Experiencing
        </label>
        <p className="text-sm text-slate-500 mt-1">
          Select all that apply. It's okay if you're not experiencing any symptoms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SYMPTOMS.map((symptom) => {
          const isSelected = selected.includes(symptom.id);
          const Icon = symptom.icon;

          return (
            <div
              key={symptom.id}
              onClick={() => toggleSymptom(symptom.id)}
              className={cn(
                "relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                isSelected
                  ? cn(symptom.border, symptom.bg, "shadow-sm")
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
              )}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleSymptom(symptom.id)}
                  className="mt-0.5"
                />

                {/* Icon */}
                <div
                  className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-lg shrink-0",
                    isSelected ? symptom.bg : "bg-slate-50"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4",
                      isSelected ? symptom.color : "text-slate-400"
                    )}
                    strokeWidth={2.5}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <Label
                    htmlFor={symptom.id}
                    className={cn(
                      "text-sm font-semibold cursor-pointer",
                      isSelected ? symptom.color : "text-slate-900"
                    )}
                  >
                    {symptom.label}
                  </Label>
                  <p
                    className={cn(
                      "text-xs mt-0.5",
                      isSelected ? "text-slate-700" : "text-slate-500"
                    )}
                  >
                    {symptom.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {selected.length > 0 && (
        <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
          <p className="text-sm text-amber-900">
            <span className="font-semibold">{selected.length} symptom{selected.length > 1 ? "s" : ""} selected</span>
            {" "}— Your responses will be analyzed to assess your recovery status.
          </p>
        </div>
      )}
    </div>
  );
}
