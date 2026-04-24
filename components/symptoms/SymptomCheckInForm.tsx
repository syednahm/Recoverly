"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PainLevelSlider } from "./PainLevelSlider";
import { SymptomSelector } from "./SymptomSelector";
import { NotesField } from "./NotesField";
import { ImageUploadPlaceholder } from "./ImageUploadPlaceholder";
import { CheckInResult } from "./CheckInResult";
import { ArrowRight, Loader2 } from "lucide-react";

export interface SymptomCheckInData {
  painLevel: number;
  symptoms: string[];
  notes: string;
  imageFile: File | null;
}

export interface CheckInResultData {
  status: "on_track" | "monitor" | "concern";
  explanation: string;
  recommendedAction: string;
  timestamp: string;
}

export function SymptomCheckInForm() {
  const [formData, setFormData] = useState<SymptomCheckInData>({
    painLevel: 3,
    symptoms: [],
    notes: "",
    imageFile: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<CheckInResultData | null>(null);

  const handlePainLevelChange = (value: number) => {
    setFormData((prev) => ({ ...prev, painLevel: value }));
  };

  const handleSymptomsChange = (symptoms: string[]) => {
    setFormData((prev) => ({ ...prev, symptoms }));
  };

  const handleNotesChange = (notes: string) => {
    setFormData((prev) => ({ ...prev, notes }));
  };

  const handleImageChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, imageFile: file }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call for now
    // TODO: Replace with actual API call to /api/symptoms/check-in
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock AI response based on input
    const mockResult = generateMockResult(formData);
    setResult(mockResult);
    setIsSubmitting(false);
  };

  const handleNewCheckIn = () => {
    setResult(null);
    setFormData({
      painLevel: 3,
      symptoms: [],
      notes: "",
      imageFile: null,
    });
  };

  if (result) {
    return <CheckInResult result={result} onNewCheckIn={handleNewCheckIn} />;
  }

  return (
    <div className="max-w-3xl">
      <Card className="p-8 border-slate-200 shadow-lg">
        <div className="space-y-8">
          {/* Pain Level */}
          <PainLevelSlider
            value={formData.painLevel}
            onChange={handlePainLevelChange}
          />

          {/* Symptom Selection */}
          <SymptomSelector
            selected={formData.symptoms}
            onChange={handleSymptomsChange}
          />

          {/* Notes */}
          <NotesField value={formData.notes} onChange={handleNotesChange} />

          {/* Image Upload */}
          <ImageUploadPlaceholder
            file={formData.imageFile}
            onChange={handleImageChange}
          />

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-200">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-md transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Submit Check-In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Helper Text */}
      <div className="mt-4 p-4 rounded-lg bg-sky-50 border border-sky-200">
        <p className="text-sm text-sky-900">
          <span className="font-semibold">Privacy note:</span> Your symptom data
          is encrypted and only used to monitor your recovery. Contact your
          healthcare provider immediately if you experience severe symptoms.
        </p>
      </div>
    </div>
  );
}

// Mock AI result generator
function generateMockResult(data: SymptomCheckInData): CheckInResultData {
  const { painLevel, symptoms } = data;
  const criticalSymptoms = ["fever", "redness"];
  const hasCriticalSymptoms = symptoms.some((s) =>
    criticalSymptoms.includes(s)
  );

  if (painLevel >= 8 || hasCriticalSymptoms) {
    return {
      status: "concern",
      explanation:
        "Your reported symptoms indicate a potential concern that requires medical attention. High pain levels combined with fever or redness may signal infection or complications.",
      recommendedAction:
        "Contact your healthcare provider within the next 4 hours. If symptoms worsen, go to the emergency room.",
      timestamp: new Date().toISOString(),
    };
  }

  if (painLevel >= 6 || symptoms.length >= 3) {
    return {
      status: "monitor",
      explanation:
        "You're experiencing moderate symptoms that should be monitored closely. This is not uncommon during recovery, but we want to ensure it doesn't worsen.",
      recommendedAction:
        "Continue monitoring symptoms. Record another check-in within 12 hours. Rest and follow your medication schedule.",
      timestamp: new Date().toISOString(),
    };
  }

  return {
    status: "on_track",
    explanation:
      "Your symptoms are within the expected range for your stage of recovery. Mild discomfort and fatigue are normal as your body heals.",
    recommendedAction:
      "Continue following your recovery plan. Keep up with medications, rest, and light activities as recommended.",
    timestamp: new Date().toISOString(),
  };
}
