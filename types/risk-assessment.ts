/**
 * Risk Assessment Types
 * Types for personalized, AI-driven risk evaluation system
 */

export type RiskLevel = "all_clear" | "monitor" | "caution" | "urgent";

export interface RiskAlert {
  id: string;
  level: RiskLevel;
  title: string;
  description: string;
  escalationSuggestion: string;
  detectedAt: string;
  category: "symptom" | "medication" | "wound" | "vital" | "behavior" | "trend";
  confidence: number; // 0-100, how confident AI is in this assessment
  actionable: boolean; // Does this require immediate action?
  timeframe?: string; // e.g., "within 4 hours", "within 24 hours"
}

export interface RiskAssessment {
  overallRisk: RiskLevel;
  overallConfidence: number; // 0-100
  alerts: RiskAlert[];
  aiReasoning: string; // Brief explanation of why this risk level
  lastAssessedAt: string;
  nextAssessmentRecommended: string; // When to check again
  trendDirection: "improving" | "stable" | "worsening";
  
  // Context for assessment
  assessmentFactors: {
    painTrend: "improving" | "stable" | "worsening";
    medicationAdherence: number; // percentage
    recoveryDayContext: string; // e.g., "Day 7: Early recovery phase"
    symptomCount: number;
    criticalSymptomPresent: boolean;
  };
}

export interface RiskAssessmentInput {
  patientId: string;
  currentPainLevel: number;
  recentSymptoms: string[];
  daysSinceDischarge: number;
  medicationAdherence: number;
  recentSymptomHistory: Array<{
    date: string;
    pain: number;
  }>;
  condition: string;
}
