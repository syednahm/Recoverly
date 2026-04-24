/**
 * Symptom Check-In Types
 * Types used for the symptom check-in feature
 */

export type CheckInStatus = "on_track" | "monitor" | "concern";

export interface SymptomCheckInData {
  painLevel: number;
  symptoms: string[];
  notes: string;
  imageFile?: File | null;
}

export interface CheckInResultData {
  status: CheckInStatus;
  explanation: string;
  recommendedAction: string;
  timestamp: string;
}

export interface SymptomCheckInSubmission {
  patientId: string;
  painLevel: number;
  symptoms: string[];
  notes?: string;
  imageUrl?: string;
  timestamp: string;
}

export interface SymptomCheckInHistory {
  id: string;
  patientId: string;
  painLevel: number;
  symptoms: string[];
  notes?: string;
  imageUrl?: string;
  status: CheckInStatus;
  aiExplanation: string;
  recommendedAction: string;
  timestamp: string;
  createdAt: string;
}

export const AVAILABLE_SYMPTOMS = [
  "swelling",
  "fever",
  "nausea",
  "redness",
  "fatigue",
] as const;

export type AvailableSymptom = typeof AVAILABLE_SYMPTOMS[number];
