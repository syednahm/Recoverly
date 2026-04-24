/**
 * Example scenarios showing how confidence score changes
 * Use these for testing and demonstrations
 */

import type { RecoveryPlan } from "@/types";
import { calculateConfidenceScore, getConfidenceBreakdown } from "./confidence-score";

/**
 * Excellent recovery scenario (85-95%)
 * - All medications taken
 * - Most tasks completed
 * - Mild symptoms only
 * - No critical warnings
 */
export function getExcellentScenario(basePlan: RecoveryPlan): RecoveryPlan {
  return {
    ...basePlan,
    medications: basePlan.medications.map((med) => ({ ...med, taken: true })),
    tasks: basePlan.tasks.map((task, idx) => ({
      ...task,
      completed: idx < basePlan.tasks.length - 1, // All but one completed
    })),
    symptoms: basePlan.symptoms.map((symptom) => ({
      ...symptom,
      severity: "mild",
    })),
    warningSigns: basePlan.warningSigns.filter((w) => w.severity === "warning"),
  };
}

/**
 * Needs attention scenario (50-70%)
 * - Some medications missed
 * - Several tasks incomplete
 * - Moderate symptoms present
 * - Some warnings
 */
export function getNeedsAttentionScenario(basePlan: RecoveryPlan): RecoveryPlan {
  return {
    ...basePlan,
    medications: basePlan.medications.map((med, idx) => ({
      ...med,
      taken: idx % 2 === 0, // 50% adherence
    })),
    tasks: basePlan.tasks.map((task, idx) => ({
      ...task,
      completed: idx < 2, // Only first 2 completed
    })),
    symptoms: [
      ...basePlan.symptoms.map((symptom) => ({
        ...symptom,
        severity: "moderate" as const,
      })),
      {
        id: "s-new",
        name: "Increased swelling",
        severity: "moderate" as const,
        reportedAt: new Date().toISOString(),
      },
    ],
  };
}

/**
 * At risk scenario (30-50%)
 * - Multiple medications missed
 * - Most tasks incomplete
 * - Severe symptoms
 * - Critical warnings present
 */
export function getAtRiskScenario(basePlan: RecoveryPlan): RecoveryPlan {
  return {
    ...basePlan,
    medications: basePlan.medications.map((med) => ({ ...med, taken: false })),
    tasks: basePlan.tasks.map((task) => ({
      ...task,
      completed: false,
    })),
    symptoms: [
      ...basePlan.symptoms.map((symptom) => ({
        ...symptom,
        severity: "severe" as const,
      })),
      {
        id: "s-fever",
        name: "Fever",
        severity: "severe" as const,
        reportedAt: new Date().toISOString(),
        notes: "Temperature 102°F",
      },
    ],
  };
}

/**
 * Test all scenarios and print results
 */
export function testConfidenceScenarios(basePlan: RecoveryPlan) {
  console.log("=== Confidence Score Scenarios ===\n");

  const scenarios = [
    { name: "Current", plan: basePlan },
    { name: "Excellent Recovery", plan: getExcellentScenario(basePlan) },
    { name: "Needs Attention", plan: getNeedsAttentionScenario(basePlan) },
    { name: "At Risk", plan: getAtRiskScenario(basePlan) },
  ];

  scenarios.forEach(({ name, plan }) => {
    const breakdown = getConfidenceBreakdown(plan);
    console.log(`${name}:`);
    console.log(`  Overall: ${breakdown.overall}% (${breakdown.label})`);
    console.log(`  Symptoms: ${breakdown.symptomScore}%`);
    console.log(`  Medications: ${breakdown.medicationScore}%`);
    console.log(`  Tasks: ${breakdown.taskCompletionScore}%`);
    console.log(`  Safety: ${breakdown.warningScore}%`);
    console.log(`  Trending: ${breakdown.trending}`);
    console.log(`  Recommendations: ${breakdown.recommendations.join(", ")}`);
    console.log("");
  });
}

/**
 * Simulate completing a task and see score change
 */
export function simulateTaskCompletion(plan: RecoveryPlan, taskId: string): RecoveryPlan {
  const updatedTasks = plan.tasks.map((task) =>
    task.id === taskId ? { ...task, completed: true } : task
  );

  return { ...plan, tasks: updatedTasks };
}

/**
 * Simulate taking medication and see score change
 */
export function simulateMedicationTaken(plan: RecoveryPlan, medId: string): RecoveryPlan {
  const updatedMeds = plan.medications.map((med) =>
    med.id === medId ? { ...med, taken: true } : med
  );

  return { ...plan, medications: updatedMeds };
}

/**
 * Show how confidence score changes as patient progresses through day
 */
export function simulateDailyProgress(plan: RecoveryPlan) {
  console.log("=== Daily Progress Simulation ===\n");

  let currentPlan = plan;
  let step = 1;

  console.log(`Step ${step}: Morning (before any tasks)`);
  console.log(`Score: ${getConfidenceBreakdown(currentPlan).overall}%\n`);

  // Take morning medications
  step++;
  currentPlan = simulateMedicationTaken(currentPlan, "med-3");
  currentPlan = simulateMedicationTaken(currentPlan, "med-4");
  console.log(`Step ${step}: Took morning medications`);
  console.log(`Score: ${getConfidenceBreakdown(currentPlan).overall}%\n`);

  // Complete morning PT
  step++;
  currentPlan = simulateTaskCompletion(currentPlan, "task-1");
  console.log(`Step ${step}: Completed morning PT`);
  console.log(`Score: ${getConfidenceBreakdown(currentPlan).overall}%\n`);

  // Complete wound care
  step++;
  currentPlan = simulateTaskCompletion(currentPlan, "task-4");
  console.log(`Step ${step}: Completed wound check`);
  console.log(`Score: ${getConfidenceBreakdown(currentPlan).overall}%\n`);

  // Take afternoon medications
  step++;
  currentPlan = simulateMedicationTaken(currentPlan, "med-1");
  currentPlan = simulateMedicationTaken(currentPlan, "med-2");
  console.log(`Step ${step}: Took afternoon medications`);
  console.log(`Score: ${getConfidenceBreakdown(currentPlan).overall}%\n`);

  // Complete remaining tasks
  step++;
  currentPlan = simulateTaskCompletion(currentPlan, "task-3");
  currentPlan = simulateTaskCompletion(currentPlan, "task-5");
  console.log(`Step ${step}: Completed all remaining tasks`);
  console.log(`Score: ${getConfidenceBreakdown(currentPlan).overall}%\n`);

  const finalBreakdown = getConfidenceBreakdown(currentPlan);
  console.log("Final Status:");
  console.log(`  Overall Score: ${finalBreakdown.overall}%`);
  console.log(`  Status: ${finalBreakdown.label}`);
  console.log(`  Trending: ${finalBreakdown.trending}`);
}
