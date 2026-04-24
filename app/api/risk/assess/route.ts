import { NextRequest, NextResponse } from "next/server";
import { assessRisk } from "@/lib/risk-assessment";
import type { RiskAssessmentInput } from "@/types/risk-assessment";

/**
 * POST /api/risk/assess
 * Performs AI-powered risk assessment based on patient data
 * 
 * This endpoint analyzes:
 * - Current pain levels and trends
 * - Recent symptoms
 * - Medication adherence
 * - Recovery timeline context
 * - Critical symptom presence
 * 
 * Returns personalized risk level with actionable recommendations
 * 
 * TODO: Add authentication/authorization
 * TODO: Store assessment results in Supabase
 * TODO: Trigger notifications to healthcare team if urgent
 * TODO: Integrate with OpenAI API for real AI analysis
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "patientId",
      "currentPainLevel",
      "recentSymptoms",
      "daysSinceDischarge",
      "medicationAdherence",
      "recentSymptomHistory",
      "condition",
    ];

    for (const field of requiredFields) {
      if (!(field in body)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate data types
    if (
      typeof body.currentPainLevel !== "number" ||
      body.currentPainLevel < 0 ||
      body.currentPainLevel > 10
    ) {
      return NextResponse.json(
        { error: "currentPainLevel must be a number between 0 and 10" },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.recentSymptoms)) {
      return NextResponse.json(
        { error: "recentSymptoms must be an array" },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.recentSymptomHistory)) {
      return NextResponse.json(
        { error: "recentSymptomHistory must be an array" },
        { status: 400 }
      );
    }

    // Create assessment input
    const input: RiskAssessmentInput = {
      patientId: body.patientId,
      currentPainLevel: body.currentPainLevel,
      recentSymptoms: body.recentSymptoms,
      daysSinceDischarge: body.daysSinceDischarge,
      medicationAdherence: body.medicationAdherence,
      recentSymptomHistory: body.recentSymptomHistory,
      condition: body.condition,
    };

    // Perform risk assessment
    const assessment = assessRisk(input);

    // TODO: Store in Supabase
    // await supabase.from('risk_assessments').insert({
    //   patient_id: assessment.patientId,
    //   overall_risk: assessment.overallRisk,
    //   overall_confidence: assessment.overallConfidence,
    //   ai_reasoning: assessment.aiReasoning,
    //   alerts: JSON.stringify(assessment.alerts),
    //   assessment_factors: JSON.stringify(assessment.assessmentFactors),
    //   assessed_at: assessment.lastAssessedAt,
    // });

    // TODO: Send notification to healthcare team if urgent
    // if (assessment.overallRisk === 'urgent') {
    //   await notifyHealthcareTeam(body.patientId, assessment);
    // }

    return NextResponse.json(assessment);
  } catch (error) {
    console.error("Error performing risk assessment:", error);
    return NextResponse.json(
      { error: "Failed to assess risk. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/risk/assess?patientId=xxx
 * Retrieves the most recent risk assessment for a patient
 * 
 * TODO: Implement after Supabase integration
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const patientId = searchParams.get("patientId");

  if (!patientId) {
    return NextResponse.json(
      { error: "Missing patientId parameter" },
      { status: 400 }
    );
  }

  // TODO: Retrieve from Supabase
  // const { data, error } = await supabase
  //   .from('risk_assessments')
  //   .select('*')
  //   .eq('patient_id', patientId)
  //   .order('assessed_at', { ascending: false })
  //   .limit(1)
  //   .single();

  return NextResponse.json(
    { error: "GET endpoint not yet implemented. Use POST to generate assessment." },
    { status: 501 }
  );
}
