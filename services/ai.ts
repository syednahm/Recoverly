import type { DischargeInstructions, RecoveryPlan } from "@/types";
import type { ApiResponse } from "@/types";

export async function extractDischargeInstructions(
  text: string
): Promise<ApiResponse<DischargeInstructions>> {
  try {
    const response = await fetch("/api/ai/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null, success: true };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
      success: false,
    };
  }
}

export async function classifySymptoms(
  symptoms: string[]
): Promise<ApiResponse<{ severity: string; recommendation: string }>> {
  try {
    const response = await fetch("/api/ai/symptoms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null, success: true };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
      success: false,
    };
  }
}

export async function generateRecoveryGuidance(
  plan: Partial<RecoveryPlan>
): Promise<ApiResponse<{ insights: string[]; recommendations: string[] }>> {
  try {
    const response = await fetch("/api/ai/guidance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null, success: true };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
      success: false,
    };
  }
}
