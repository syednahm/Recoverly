"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare } from "lucide-react";

interface NotesFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function NotesField({ value, onChange }: NotesFieldProps) {
  const charCount = value.length;
  const maxChars = 500;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-slate-500" />
        <Label htmlFor="notes" className="text-base font-semibold text-slate-900">
          Additional Notes
          <span className="text-slate-400 font-normal ml-1">(Optional)</span>
        </Label>
      </div>

      <Textarea
        id="notes"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe how you're feeling, any changes you've noticed, or concerns you have..."
        maxLength={maxChars}
        rows={4}
        className="resize-none text-sm"
      />

      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-slate-500">
          Help us understand your recovery better by sharing more details.
        </p>
        <span className="text-xs text-slate-400">
          {charCount} / {maxChars}
        </span>
      </div>
    </div>
  );
}
