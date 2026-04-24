import type { RecoveryPlan, Medication, RecoveryTask, Symptom, WarningSigns } from "@/types";

export interface ConfidenceFactors {
  symptomScore: number;
  medicationScore: number;
  taskCompletionScore: number;
  warningScore: number;
  overall: number;
}

export interface ConfidenceBreakdown extends ConfidenceFactors {
  label: string;
  description: string;
  trending: "up" | "down" | "stable";
  recommendations: string[];
}

/**
 * Calculate symptom severity score (0-100)
 * Higher is better (fewer/milder symptoms)
 */
function calculateSymptomScore(symptoms: Symptom[]): number {
  if (symptoms.length === 0) return 100;

  const severityWeights = {
    none: 0,
    mild: 10,
    moderate: 25,
    severe: 50,
  };

  const totalPenalty = symptoms.reduce((sum, symptom) => {
    return sum + severityWeights[symptom.severity];
  }, 0);

  const maxPossiblePenalty = symptoms.length * 50;
  const score = Math.max(0, 100 - (totalPenalty / maxPossiblePenalty) * 100);

  return Math.round(score);
}

/**
 * Calculate medication adherence score (0-100)
 * Higher is better (fewer missed medications)
 */
function calculateMedicationScore(medications: Medication[]): number {
  if (medications.length === 0) return 100;

  const activeMeds = medications.filter((med) => {
    const now = new Date();
    const endDate = med.endDate ? new Date(med.endDate) : null;
    return !endDate || endDate > now;
  });

  if (activeMeds.length === 0) return 100;

  const takenCount = activeMeds.filter((med) => med.taken).length;
  const adherenceRate = (takenCount / activeMeds.length) * 100;

  return Math.round(adherenceRate);
}

/**
 * Calculate task completion score (0-100)
 * Higher is better (more tasks completed)
 */
function calculateTaskCompletionScore(tasks: RecoveryTask[]): number {
  if (tasks.length === 0) return 100;

  const highPriorityTasks = tasks.filter((t) => t.priority === "high");
  const completedHighPriority = highPriorityTasks.filter((t) => t.completed).length;

  const allCompleted = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;

  // Weight high priority tasks more heavily
  const highPriorityWeight = 0.6;
  const allTasksWeight = 0.4;

  const highPriorityScore =
    highPriorityTasks.length > 0
      ? (completedHighPriority / highPriorityTasks.length) * 100
      : 100;

  const allTasksScore = (allCompleted / totalTasks) * 100;

  const finalScore = highPriorityScore * highPriorityWeight + allTasksScore * allTasksWeight;

  return Math.round(finalScore);
}

/**
 * Calculate warning sign score (0-100)
 * Lower score if critical warnings are present
 */
function calculateWarningScore(warnings: WarningSigns[], symptoms: Symptom[]): number {
  const criticalWarnings = warnings.filter((w) => w.severity === "critical").length;
  const standardWarnings = warnings.filter((w) => w.severity === "warning").length;

  const severeSymptoms = symptoms.filter((s) => s.severity === "severe").length;

  // Penalties
  const criticalPenalty = criticalWarnings * 15;
  const warningPenalty = standardWarnings * 5;
  const severeSymptomPenalty = severeSymptoms * 20;

  const totalPenalty = criticalPenalty + warningPenalty + severeSymptomPenalty;

  const score = Math.max(0, 100 - totalPenalty);

  return Math.round(score);
}

/**
 * Calculate overall confidence score with weighted factors
 */
export function calculateConfidenceScore(plan: RecoveryPlan): ConfidenceFactors {
  const symptomScore = calculateSymptomScore(plan.symptoms);
  const medicationScore = calculateMedicationScore(plan.medications);
  const taskCompletionScore = calculateTaskCompletionScore(plan.tasks);
  const warningScore = calculateWarningScore(plan.warningSigns, plan.symptoms);

  // Weights for each factor
  const weights = {
    symptoms: 0.35,
    medications: 0.25,
    tasks: 0.20,
    warnings: 0.20,
  };

  const overall = Math.round(
    symptomScore * weights.symptoms +
      medicationScore * weights.medications +
      taskCompletionScore * weights.tasks +
      warningScore * weights.warnings
  );

  return {
    symptomScore,
    medicationScore,
    taskCompletionScore,
    warningScore,
    overall,
  };
}

/**
 * Generate confidence breakdown with recommendations
 */
export function getConfidenceBreakdown(plan: RecoveryPlan): ConfidenceBreakdown {
  const factors = calculateConfidenceScore(plan);
  const recommendations: string[] = [];

  // Generate recommendations based on scores
  if (factors.medicationScore < 80) {
    const missedCount = plan.medications.filter((m) => !m.taken).length;
    recommendations.push(`${missedCount} medication${missedCount > 1 ? "s" : ""} pending today`);
  }

  if (factors.taskCompletionScore < 70) {
    const pendingHigh = plan.tasks.filter((t) => !t.completed && t.priority === "high").length;
    if (pendingHigh > 0) {
      recommendations.push(`${pendingHigh} high-priority task${pendingHigh > 1 ? "s" : ""} remaining`);
    }
  }

  if (factors.symptomScore < 70) {
    const moderateOrWorse = plan.symptoms.filter(
      (s) => s.severity === "moderate" || s.severity === "severe"
    ).length;
    if (moderateOrWorse > 0) {
      recommendations.push(`Monitor ${moderateOrWorse} active symptom${moderateOrWorse > 1 ? "s" : ""}`);
    }
  }

  if (factors.warningScore < 90) {
    const criticalWarnings = plan.warningSigns.filter((w) => w.severity === "critical").length;
    if (criticalWarnings > 0) {
      recommendations.push("Review critical warning signs");
    }
  }

  // Determine overall status
  let label: string;
  let description: string;
  let trending: "up" | "down" | "stable" = "stable";

  if (factors.overall >= 85) {
    label = "Excellent";
    description = "Recovery is progressing ahead of schedule";
    trending = "up";
  } else if (factors.overall >= 70) {
    label = "Good";
    description = "Recovery is on track with normal progress";
    trending = "stable";
  } else if (factors.overall >= 50) {
    label = "Fair";
    description = "Some areas need attention";
    trending = "stable";
  } else {
    label = "Needs Attention";
    description = "Multiple recovery factors require focus";
    trending = "down";
  }

  if (recommendations.length === 0) {
    recommendations.push("Keep up the excellent work!");
  }

  return {
    ...factors,
    label,
    description,
    trending,
    recommendations,
  };
}
