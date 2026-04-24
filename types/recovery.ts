export type RecoveryStatus = "on_track" | "needs_attention" | "at_risk" | "completed";
export type SymptomSeverity = "none" | "mild" | "moderate" | "severe";
export type MedicationFrequency = "once_daily" | "twice_daily" | "three_times_daily" | "as_needed" | "weekly";

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  dischargeDate: string;
  condition: string;
  surgeon?: string;
  primaryCare?: string;
  followUpDate?: string;
  avatarUrl?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: MedicationFrequency;
  instructions: string;
  purpose: string;
  startDate: string;
  endDate?: string;
  taken: boolean;
  nextDose?: string;
  color?: string;
}

export interface RecoveryTask {
  id: string;
  title: string;
  description: string;
  category: "exercise" | "wound_care" | "diet" | "rest" | "monitoring" | "appointment";
  dueDate: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

export interface Symptom {
  id: string;
  name: string;
  severity: SymptomSeverity;
  reportedAt: string;
  notes?: string;
}

export interface SymptomLog {
  date: string;
  pain: number;
  energy: number;
  mobility: number;
  sleep: number;
  overall: number;
}

export interface WarningSigns {
  id: string;
  title: string;
  description: string;
  severity: "warning" | "critical";
  actionRequired: string;
}

export interface RecoveryMilestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  achieved: boolean;
  achievedDate?: string;
  icon: string;
}

export interface RecoveryPlan {
  id: string;
  patientId: string;
  status: RecoveryStatus;
  confidenceScore: number;
  daysSinceDischarge: number;
  totalRecoveryDays: number;
  medications: Medication[];
  tasks: RecoveryTask[];
  warningSigns: WarningSigns[];
  milestones: RecoveryMilestone[];
  symptoms: Symptom[];
  symptomHistory: SymptomLog[];
  aiInsights: string[];
  lastUpdated: string;
}

export interface DischargeInstructions {
  rawText?: string;
  extractedAt?: string;
  condition?: string;
  medications?: Partial<Medication>[];
  restrictions?: string[];
  followUpInstructions?: string[];
  warningSigns?: string[];
  dietaryGuidelines?: string[];
}
