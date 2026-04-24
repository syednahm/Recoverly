import type {
  RiskAssessment,
  RiskAssessmentInput,
  RiskAlert,
  RiskLevel,
} from "@/types/risk-assessment";

/**
 * AI-powered risk assessment engine
 * Analyzes patient data to determine personalized risk level
 * 
 * TODO: Integrate with OpenAI API for real AI analysis
 * Currently uses rule-based logic that simulates AI decision-making
 */

const CRITICAL_SYMPTOMS = [
  "chest pain",
  "shortness of breath",
  "severe bleeding",
  "fever",
  "confusion",
  "redness",
  "pus",
  "warmth",
];

const CONCERNING_SYMPTOMS = [
  "swelling",
  "nausea",
  "dizziness",
  "fatigue",
  "weakness",
];

export function assessRisk(input: RiskAssessmentInput): RiskAssessment {
  const alerts: RiskAlert[] = [];
  let overallRisk: RiskLevel = "all_clear";
  let overallConfidence = 95;
  
  // Factor 1: Pain level analysis
  const painTrend = analyzePainTrend(input.recentSymptomHistory);
  const currentPain = input.currentPainLevel;
  
  if (currentPain >= 8) {
    alerts.push({
      id: `alert-pain-${Date.now()}`,
      level: "urgent",
      title: "High Pain Level Detected",
      description: `Pain level of ${currentPain}/10 is concerning for post-operative recovery at Day ${input.daysSinceDischarge}.`,
      escalationSuggestion: "Contact your healthcare provider immediately. If pain is accompanied by fever or redness, go to the emergency room.",
      detectedAt: new Date().toISOString(),
      category: "symptom",
      confidence: 92,
      actionable: true,
      timeframe: "within 2 hours",
    });
    overallRisk = "urgent";
  } else if (currentPain >= 6 && painTrend === "worsening") {
    alerts.push({
      id: `alert-pain-trend-${Date.now()}`,
      level: "caution",
      title: "Pain Increasing Over Time",
      description: "Your pain levels have been increasing over the past few days, which is unusual for this stage of recovery.",
      escalationSuggestion: "Contact your care team within 24 hours to discuss pain management adjustments.",
      detectedAt: new Date().toISOString(),
      category: "trend",
      confidence: 85,
      actionable: true,
      timeframe: "within 24 hours",
    });
    overallRisk = updateOverallRisk(overallRisk, "caution");
  } else if (currentPain <= 3 && painTrend === "improving") {
    alerts.push({
      id: `alert-pain-good-${Date.now()}`,
      level: "all_clear",
      title: "Pain Well-Controlled",
      description: "Your pain levels are trending downward and within normal range for your recovery stage.",
      escalationSuggestion: "Continue current pain management plan. No action needed.",
      detectedAt: new Date().toISOString(),
      category: "symptom",
      confidence: 94,
      actionable: false,
    });
  }
  
  // Factor 2: Symptom analysis
  const hasCriticalSymptom = input.recentSymptoms.some((symptom) =>
    CRITICAL_SYMPTOMS.some((critical) =>
      symptom.toLowerCase().includes(critical)
    )
  );
  
  if (hasCriticalSymptom) {
    const criticalSymptom = input.recentSymptoms.find((symptom) =>
      CRITICAL_SYMPTOMS.some((critical) =>
        symptom.toLowerCase().includes(critical)
      )
    );
    
    alerts.push({
      id: `alert-critical-${Date.now()}`,
      level: "urgent",
      title: "Critical Symptom Detected",
      description: `You reported "${criticalSymptom}" which may indicate infection or serious complications.`,
      escalationSuggestion: "Call your surgeon's office immediately. If you have fever above 101.5°F with redness or pus, go to the emergency room.",
      detectedAt: new Date().toISOString(),
      category: "symptom",
      confidence: 96,
      actionable: true,
      timeframe: "immediately",
    });
    overallRisk = "urgent";
    overallConfidence = 96;
  } else if (input.recentSymptoms.length >= 3) {
    alerts.push({
      id: `alert-multi-symptom-${Date.now()}`,
      level: "monitor",
      title: "Multiple Symptoms Present",
      description: `You're experiencing ${input.recentSymptoms.length} symptoms. While each is mild, the combination warrants monitoring.`,
      escalationSuggestion: "Monitor symptoms over the next 12-24 hours. Log another check-in if symptoms persist or worsen.",
      detectedAt: new Date().toISOString(),
      category: "symptom",
      confidence: 82,
      actionable: false,
      timeframe: "within 24 hours",
    });
    overallRisk = updateOverallRisk(overallRisk, "monitor");
  }
  
  // Factor 3: Medication adherence
  if (input.medicationAdherence < 70) {
    alerts.push({
      id: `alert-med-adherence-${Date.now()}`,
      level: "caution",
      title: "Low Medication Adherence",
      description: `Your medication adherence is ${Math.round(input.medicationAdherence)}%, which may affect recovery and increase risk of complications.`,
      escalationSuggestion: "Review your medication schedule with your care team. Set reminders to improve adherence.",
      detectedAt: new Date().toISOString(),
      category: "medication",
      confidence: 88,
      actionable: true,
      timeframe: "within 48 hours",
    });
    overallRisk = updateOverallRisk(overallRisk, "caution");
  } else if (input.medicationAdherence >= 85) {
    alerts.push({
      id: `alert-med-good-${Date.now()}`,
      level: "all_clear",
      title: "Excellent Medication Adherence",
      description: `You're maintaining ${Math.round(input.medicationAdherence)}% adherence to your medication schedule.`,
      escalationSuggestion: "Keep up the great work. Consistent medication use supports optimal recovery.",
      detectedAt: new Date().toISOString(),
      category: "medication",
      confidence: 92,
      actionable: false,
    });
  }
  
  // Factor 4: Recovery timeline context
  const recoveryPhase = getRecoveryPhase(input.daysSinceDischarge);
  if (currentPain > 5 && input.daysSinceDischarge > 14) {
    alerts.push({
      id: `alert-delayed-recovery-${Date.now()}`,
      level: "caution",
      title: "Pain Higher Than Expected",
      description: `At ${input.daysSinceDischarge} days post-op, pain levels above 5/10 are uncommon and may indicate delayed healing.`,
      escalationSuggestion: "Discuss with your healthcare team at your next appointment. They may recommend physical therapy adjustments or imaging.",
      detectedAt: new Date().toISOString(),
      category: "trend",
      confidence: 79,
      actionable: true,
      timeframe: "within 1 week",
    });
    overallRisk = updateOverallRisk(overallRisk, "caution");
  }
  
  // If no concerns, add all-clear message
  if (alerts.length === 0 || alerts.every((a) => a.level === "all_clear")) {
    overallRisk = "all_clear";
    if (alerts.length === 0) {
      alerts.push({
        id: `alert-all-clear-${Date.now()}`,
        level: "all_clear",
        title: "Recovery On Track",
        description: "All indicators show normal post-operative recovery progress. No concerning symptoms detected.",
        escalationSuggestion: "Continue following your recovery plan. No action needed at this time.",
        detectedAt: new Date().toISOString(),
        category: "symptom",
        confidence: 91,
        actionable: false,
      });
    }
  }
  
  // Generate AI reasoning
  const aiReasoning = generateAIReasoning(
    overallRisk,
    painTrend,
    input.medicationAdherence,
    input.recentSymptoms.length,
    hasCriticalSymptom
  );
  
  // Determine next assessment timing
  const nextAssessment = getNextAssessmentTime(overallRisk);
  
  return {
    overallRisk,
    overallConfidence,
    alerts: alerts.sort((a, b) => riskLevelPriority(b.level) - riskLevelPriority(a.level)),
    aiReasoning,
    lastAssessedAt: new Date().toISOString(),
    nextAssessmentRecommended: nextAssessment,
    trendDirection: painTrend,
    assessmentFactors: {
      painTrend,
      medicationAdherence: input.medicationAdherence,
      recoveryDayContext: `Day ${input.daysSinceDischarge}: ${recoveryPhase}`,
      symptomCount: input.recentSymptoms.length,
      criticalSymptomPresent: hasCriticalSymptom,
    },
  };
}

function analyzePainTrend(
  history: Array<{ date: string; pain: number }>
): "improving" | "stable" | "worsening" {
  if (history.length < 3) return "stable";
  
  const recent = history.slice(-3);
  const trend = recent[2].pain - recent[0].pain;
  
  if (trend <= -2) return "improving";
  if (trend >= 2) return "worsening";
  return "stable";
}

function getRecoveryPhase(daysSince: number): string {
  if (daysSince <= 7) return "Early recovery phase";
  if (daysSince <= 21) return "Active healing phase";
  if (daysSince <= 42) return "Progressive recovery phase";
  return "Late recovery phase";
}

function updateOverallRisk(current: RiskLevel, newRisk: RiskLevel): RiskLevel {
  const priority = {
    urgent: 4,
    caution: 3,
    monitor: 2,
    all_clear: 1,
  };
  
  return priority[newRisk] > priority[current] ? newRisk : current;
}

function riskLevelPriority(level: RiskLevel): number {
  const priority = {
    urgent: 4,
    caution: 3,
    monitor: 2,
    all_clear: 1,
  };
  return priority[level];
}

function generateAIReasoning(
  overallRisk: RiskLevel,
  painTrend: string,
  medAdherence: number,
  symptomCount: number,
  criticalSymptom: boolean
): string {
  if (criticalSymptom) {
    return "Critical symptoms detected that may indicate infection or serious complications. Immediate medical evaluation recommended.";
  }
  
  if (overallRisk === "urgent") {
    return "Multiple concerning indicators suggest heightened risk. Your care team should evaluate these symptoms promptly.";
  }
  
  if (overallRisk === "caution") {
    return `Recovery showing some concerning patterns. Pain is ${painTrend}, medication adherence at ${Math.round(medAdherence)}%. Medical follow-up recommended.`;
  }
  
  if (overallRisk === "monitor") {
    return `Recovery progressing but requires monitoring. ${symptomCount} symptoms present. Continue tracking and log another check-in within 24 hours.`;
  }
  
  return `Recovery is on track. Pain trend ${painTrend}, strong medication adherence (${Math.round(medAdherence)}%), and no concerning symptoms.`;
}

function getNextAssessmentTime(risk: RiskLevel): string {
  switch (risk) {
    case "urgent":
      return "After contacting healthcare provider";
    case "caution":
      return "Within 12 hours";
    case "monitor":
      return "Within 24 hours";
    case "all_clear":
      return "Next scheduled check-in (48 hours)";
  }
}
