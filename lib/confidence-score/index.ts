/**
 * Recovery Confidence Score System
 * 
 * Exports all confidence score calculation functions and components
 * for easy importing throughout the application.
 */

// Core calculation logic
export {
  calculateConfidenceScore,
  getConfidenceBreakdown,
  type ConfidenceFactors,
  type ConfidenceBreakdown,
} from "../confidence-score";

// Testing and simulation utilities
export {
  getExcellentScenario,
  getNeedsAttentionScenario,
  getAtRiskScenario,
  testConfidenceScenarios,
  simulateTaskCompletion,
  simulateMedicationTaken,
  simulateDailyProgress,
} from "../confidence-examples";

// Re-export main component
export { ConfidenceScoreCard } from "../../components/dashboard/ConfidenceScoreCard";
export { ConfidenceBadge } from "../../components/dashboard/ConfidenceBadge";
export { ConfidenceScoreDemo } from "../../components/dashboard/ConfidenceScoreDemo";
