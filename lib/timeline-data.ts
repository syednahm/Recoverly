export type DayStatus = "completed" | "current" | "upcoming";
export type SymptomSeverity = "mild" | "moderate" | "severe";
export type PhaseColor = "red" | "amber" | "sky" | "violet" | "emerald";

export interface SymptomExpectation {
  name: string;
  severity: SymptomSeverity;
}

export interface DayCheckpoint {
  title: string;
  description: string;
  type: "followup" | "assessment" | "milestone";
}

export interface DayPlan {
  day: number;
  date: string;
  shortDate: string;
  phase: string;
  phaseColor: PhaseColor;
  title: string;
  status: DayStatus;
  painRange: [number, number];
  symptoms: SymptomExpectation[];
  milestones: string[];
  safeActivities: string[];
  restrictions: string[];
  checkpoint?: DayCheckpoint;
  aiNote?: string;
}

export interface RecoveryPhase {
  name: string;
  startDay: number;
  endDay: number;
  colorClass: string;
  bgLight: string;
  textColor: string;
  border: string;
}

export const RECOVERY_PHASES: RecoveryPhase[] = [
  {
    name: "Acute Recovery",
    startDay: 1,
    endDay: 3,
    colorClass: "bg-rose-400",
    bgLight: "bg-rose-50",
    textColor: "text-rose-600",
    border: "border-rose-200",
  },
  {
    name: "Early Healing",
    startDay: 4,
    endDay: 7,
    colorClass: "bg-amber-400",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
    border: "border-amber-200",
  },
  {
    name: "Active Recovery",
    startDay: 8,
    endDay: 21,
    colorClass: "bg-sky-400",
    bgLight: "bg-sky-50",
    textColor: "text-sky-600",
    border: "border-sky-200",
  },
  {
    name: "Functional Rehab",
    startDay: 22,
    endDay: 56,
    colorClass: "bg-violet-400",
    bgLight: "bg-violet-50",
    textColor: "text-violet-600",
    border: "border-violet-200",
  },
  {
    name: "Return to Normal",
    startDay: 57,
    endDay: 84,
    colorClass: "bg-emerald-400",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
    border: "border-emerald-200",
  },
];

export const DAY_PLANS: DayPlan[] = [
  {
    day: 1,
    date: "April 17, 2026",
    shortDate: "Apr 17",
    phase: "Acute Recovery",
    phaseColor: "red",
    title: "Discharge & Rest",
    status: "completed",
    painRange: [7, 8],
    symptoms: [
      { name: "Significant pain", severity: "severe" },
      { name: "Heavy swelling", severity: "severe" },
      { name: "Anesthesia drowsiness", severity: "moderate" },
      { name: "Possible nausea", severity: "mild" },
    ],
    milestones: [
      "Arrived home safely",
      "First medication dose taken",
      "Walker use initiated",
    ],
    safeActivities: [
      "Bed rest with leg elevated",
      "Ankle pumps (10 reps/hr)",
      "Deep breathing exercises",
    ],
    restrictions: [
      "No weight-bearing without walker",
      "No driving",
      "No alcohol with medications",
      "No stairs alone",
    ],
    aiNote:
      "First 24 hours are critical for pain management. Keep leg elevated above heart level.",
  },
  {
    day: 2,
    date: "April 18, 2026",
    shortDate: "Apr 18",
    phase: "Acute Recovery",
    phaseColor: "red",
    title: "Pain Management",
    status: "completed",
    painRange: [6, 7],
    symptoms: [
      { name: "Moderate-severe pain", severity: "moderate" },
      { name: "Persistent swelling", severity: "moderate" },
      { name: "Morning stiffness", severity: "moderate" },
      { name: "Bruising appears", severity: "mild" },
    ],
    milestones: [
      "First assisted walk completed",
      "Appetite beginning to return",
    ],
    safeActivities: [
      "5-min assisted walks (2x/day)",
      "Ice therapy (20 min every 2 hrs)",
      "Ankle pumps & foot rotations",
    ],
    restrictions: [
      "No full shower (sponge bath only)",
      "No prolonged standing",
      "No stairs alone",
    ],
    aiNote:
      "Bruising appearing on Day 2 is completely normal — it often spreads before it improves.",
  },
  {
    day: 3,
    date: "April 19, 2026",
    shortDate: "Apr 19",
    phase: "Acute Recovery",
    phaseColor: "red",
    title: "Swelling Peak",
    status: "completed",
    painRange: [5, 6],
    symptoms: [
      { name: "Swelling peaks (expected)", severity: "severe" },
      { name: "Moderate pain", severity: "moderate" },
      { name: "Visible bruising", severity: "mild" },
      { name: "Minor wound drainage", severity: "mild" },
    ],
    milestones: [
      "Walking with walker independently",
      "Pain trending below Day 1",
    ],
    safeActivities: [
      "Short walks 2–3x daily",
      "Quad sets & heel slides",
      "Chair sitting, leg elevated",
    ],
    restrictions: [
      "No kneeling",
      "No knee bend beyond 90°",
      "No skipping PT exercises",
    ],
    aiNote:
      "Swelling peaks around Day 3. Aggressive icing and elevation today will speed long-term recovery.",
  },
  {
    day: 4,
    date: "April 20, 2026",
    shortDate: "Apr 20",
    phase: "Early Healing",
    phaseColor: "amber",
    title: "Early Progress",
    status: "completed",
    painRange: [4, 5],
    symptoms: [
      { name: "Moderate pain (reducing)", severity: "moderate" },
      { name: "Swelling improving slowly", severity: "moderate" },
      { name: "General fatigue", severity: "mild" },
      { name: "Bruising spreading", severity: "mild" },
    ],
    milestones: [
      "Pain below 6/10 for first time",
      "Improved sleep quality",
      "Reduced nausea",
    ],
    safeActivities: [
      "Walks 3x/day (10 min each)",
      "Quad sets (3 sets of 10)",
      "Heel slides",
    ],
    restrictions: [
      "No forceful knee bending",
      "No prolonged bent-knee sitting",
      "No shower (sponge bath only)",
    ],
    aiNote:
      "You're entering the healing phase. Consistent PT exercise is now the most important factor.",
  },
  {
    day: 5,
    date: "April 21, 2026",
    shortDate: "Apr 21",
    phase: "Early Healing",
    phaseColor: "amber",
    title: "Turning Point",
    status: "completed",
    painRange: [3, 4],
    symptoms: [
      { name: "Pain decreasing trend", severity: "mild" },
      { name: "Morning stiffness", severity: "mild" },
      { name: "Swelling reducing", severity: "mild" },
      { name: "Improved energy", severity: "mild" },
    ],
    milestones: [
      "Pain below 5/10 for first time",
      "Reduced medication possible",
      "Improved range of motion",
    ],
    safeActivities: [
      "Walking 15 min, 3x/day",
      "Full PT exercise routine",
      "Steps with handrail",
    ],
    restrictions: [
      "No standing > 20 min",
      "No high-impact activities",
      "No unsupported stairs",
    ],
    aiNote:
      "By Day 5, pain should clearly be on a downward trend. If not, contact your care team.",
  },
  {
    day: 6,
    date: "April 22, 2026",
    shortDate: "Apr 22",
    phase: "Early Healing",
    phaseColor: "amber",
    title: "Gaining Momentum",
    status: "completed",
    painRange: [2, 3],
    symptoms: [
      { name: "Mild pain", severity: "mild" },
      { name: "Reduced swelling", severity: "mild" },
      { name: "Improved energy", severity: "mild" },
      { name: "Better sleep quality", severity: "mild" },
    ],
    milestones: [
      "Medication reduction possible",
      "Increased mobility range",
      "Independent short walks",
    ],
    safeActivities: [
      "Walking 20 min, 3x/day",
      "Full PT routine",
      "Light household tasks (seated)",
    ],
    restrictions: [
      "No twisting motion at knee",
      "No stairs without railing",
      "No heavy lifting",
    ],
    aiNote:
      "Day 6 often sees the clearest improvement. Your mobility is tracking above the post-op average.",
  },
  {
    day: 7,
    date: "April 24, 2026",
    shortDate: "Apr 24",
    phase: "Early Healing",
    phaseColor: "amber",
    title: "Week 1 Checkpoint",
    status: "current",
    painRange: [2, 3],
    symptoms: [
      { name: "Mild pain (2–3/10)", severity: "mild" },
      { name: "Manageable swelling", severity: "mild" },
      { name: "Good energy levels", severity: "mild" },
      { name: "Improving range of motion", severity: "mild" },
    ],
    milestones: [
      "Week 1 recovery goals on track",
      "Ready for follow-up assessment",
      "PT routine well-established",
    ],
    safeActivities: [
      "Walking 20–30 min, 3x/day",
      "Full PT routine",
      "Short trips outside home",
    ],
    restrictions: [
      "No driving",
      "No prolonged standing",
      "No knee flexion beyond 90°",
    ],
    checkpoint: {
      title: "Week 1 Follow-Up Readiness",
      description:
        "Evaluate pain level, swelling, ROM, and wound healing with Dr. Chen. Follow-up appointment scheduled for May 1.",
      type: "followup",
    },
    aiNote:
      "Excellent Week 1 progress — pain has decreased 62% from discharge. You're ahead of the average recovery curve.",
  },
];
