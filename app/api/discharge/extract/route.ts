import { NextRequest, NextResponse } from "next/server";
import type { DischargeInstructions } from "@/types";

// Mock OpenAI extraction - returns structured JSON
// In production, this would call OpenAI API to extract from actual PDF
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock extracted data - structured JSON format
    const extractedData: DischargeInstructions = {
      rawText: "Mocked PDF content",
      extractedAt: new Date().toISOString(),
      condition: "Knee Replacement Surgery (Right)",
      medications: [
        {
          name: "Oxycodone",
          dosage: "5mg",
          frequency: "twice_daily",
          instructions: "Take with food. Do not drive or operate heavy machinery.",
          purpose: "Pain management",
          startDate: new Date().toISOString(),
        },
        {
          name: "Ibuprofen",
          dosage: "600mg",
          frequency: "three_times_daily",
          instructions: "Take with food or milk to reduce stomach irritation.",
          purpose: "Reduce pain and inflammation",
          startDate: new Date().toISOString(),
        },
        {
          name: "Aspirin",
          dosage: "81mg",
          frequency: "once_daily",
          instructions: "Take in the morning with water.",
          purpose: "Prevent blood clots",
          startDate: new Date().toISOString(),
        },
        {
          name: "Pantoprazole",
          dosage: "40mg",
          frequency: "once_daily",
          instructions: "Take 30 minutes before breakfast.",
          purpose: "Protect stomach from medication irritation",
          startDate: new Date().toISOString(),
        },
      ],
      restrictions: [
        "No driving for 2 weeks or while taking pain medication",
        "Avoid stairs when possible during first week",
        "No heavy lifting (over 10 lbs) for 6 weeks",
        "Do not submerge incision in water (bath, pool, hot tub) until cleared",
        "No running, jumping, or high-impact activities for 12 weeks",
      ],
      warningSigns: [
        "Fever above 101.5°F or chills",
        "Increased redness, warmth, or pus from incision",
        "Sudden severe pain not relieved by medication",
        "Calf pain, swelling, or warmth (possible blood clot)",
        "Chest pain or shortness of breath",
        "Unusual bleeding or drainage from surgical site",
      ],
      followUpInstructions: [
        "First post-op appointment with Dr. Chen in 2 weeks",
        "Physical therapy sessions 3x per week starting Day 3",
        "Daily wound checks and dressing changes for first week",
        "Begin gentle range-of-motion exercises immediately",
        "Ice knee 20 minutes every 2-3 hours to reduce swelling",
        "Elevate leg above heart level when resting",
      ],
      dietaryGuidelines: [
        "Stay well-hydrated - drink 8-10 glasses of water daily",
        "High-protein diet to support healing",
        "Increase fiber to prevent constipation from pain medication",
        "Avoid alcohol while taking pain medication",
      ],
    };

    return NextResponse.json(extractedData);
  } catch (error) {
    console.error("Error processing discharge:", error);
    return NextResponse.json(
      { error: "Failed to process discharge instructions" },
      { status: 500 }
    );
  }
}
