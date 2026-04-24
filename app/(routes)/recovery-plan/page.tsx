import { DashboardShell } from "@/components/layout/DashboardShell";
import { DayCard } from "@/components/recovery-plan/DayCard";
import { PhaseBar } from "@/components/recovery-plan/PhaseBar";
import {
  ClipboardList,
  Calendar,
  TrendingDown,
  CheckCircle2,
  Activity,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DAY_PLANS, RECOVERY_PHASES } from "@/lib/timeline-data";
import { MOCK_PATIENT } from "@/lib/mock-data";

export default function RecoveryPlanPage() {
  const patient = MOCK_PATIENT;
  const currentDayPlan = DAY_PLANS.find((d) => d.status === "current");
  const completedCount = DAY_PLANS.filter((d) => d.status === "completed").length;
  const currentDay = currentDayPlan?.day ?? 7;
  const currentPhase = RECOVERY_PHASES.find(
    (p) => currentDay >= p.startDay && currentDay <= p.endDay
  );

  return (
    <DashboardShell>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-sky-100 border border-sky-200 shrink-0">
            <ClipboardList className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
              Recovery Timeline
            </h1>
            <p className="text-sm text-slate-500">
              {patient.condition} &middot; Discharged{" "}
              {new Date(patient.dischargeDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-slate-400 mt-3 mb-4">
          <span>Dashboard</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600 font-medium">Recovery Plan</span>
        </nav>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            label="Current Day"
            value={`Day ${currentDay}`}
            sub="of 84 total days"
            color="sky"
            icon={Activity}
          />
          <StatCard
            label="Active Phase"
            value={currentPhase?.name ?? "—"}
            sub={`Days ${currentPhase?.startDay}–${currentPhase?.endDay}`}
            color="amber"
            icon={TrendingDown}
          />
          <StatCard
            label="Week Progress"
            value={`${completedCount} / 7`}
            sub="days completed"
            color="emerald"
            icon={CheckCircle2}
          />
          <StatCard
            label="Next Appointment"
            value="May 1"
            sub={`Dr. ${patient.surgeon?.split(" ").pop() ?? "Chen"}`}
            color="violet"
            icon={Calendar}
          />
        </div>
      </div>

      {/* Phase Progress Bar */}
      <div className="mb-6">
        <PhaseBar />
      </div>

      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div>
          <h2 className="text-base font-bold text-slate-800">
            Week 1 · Day-by-Day Roadmap
          </h2>
          <p className="text-xs text-slate-400">
            Expected symptoms, milestones, safe activities &amp; restrictions
          </p>
        </div>
        <div className="flex-1 h-px bg-slate-200 hidden sm:block" />
        <div className="hidden sm:flex items-center gap-4">
          <Legend dot="bg-emerald-400" label="Completed" />
          <Legend dot="bg-sky-400 animate-pulse" label="Today" />
          <Legend dot="bg-slate-200" label="Upcoming" />
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative">
        {/* Connecting line */}
        <div
          className="absolute left-[19px] top-6 bottom-6 w-0.5 rounded-full z-0"
          style={{
            background:
              "linear-gradient(to bottom, #34d399 0%, #34d399 75%, #38bdf8 100%)",
          }}
        />

        <div className="space-y-4">
          {DAY_PLANS.map((day, index) => (
            <div key={day.day} className="relative flex gap-4 items-start">
              {/* Day node */}
              <div className="shrink-0 z-10 pt-4">
                <DayNode status={day.status} dayNumber={day.day} />
              </div>

              {/* Card */}
              <div className="flex-1 min-w-0">
                <DayCard day={day} index={index} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center shrink-0">
          <ClipboardList className="w-4 h-4 text-sky-600" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-700">
            AI-Generated Recovery Plan
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            This timeline was generated from your discharge instructions using
            AI. Always follow the specific guidance from Dr.{" "}
            {patient.surgeon ?? "your surgeon"} and contact your care team if
            symptoms deviate from expectations.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}

/* ─── Inline helper components (no client hooks needed) ─── */

function StatCard({
  label,
  value,
  sub,
  color,
  icon: Icon,
}: {
  label: string;
  value: string;
  sub: string;
  color: "sky" | "amber" | "emerald" | "violet";
  icon: React.ElementType;
}) {
  const iconColors = {
    sky: "bg-sky-50 border-sky-200 text-sky-600",
    amber: "bg-amber-50 border-amber-200 text-amber-600",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-600",
    violet: "bg-violet-50 border-violet-200 text-violet-600",
  };
  const valueColors = {
    sky: "text-sky-700",
    amber: "text-amber-700",
    emerald: "text-emerald-700",
    violet: "text-violet-700",
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "w-7 h-7 rounded-lg border flex items-center justify-center shrink-0",
            iconColors[color]
          )}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>
        <span className="text-[11px] font-medium text-slate-500 leading-tight">
          {label}
        </span>
      </div>
      <div>
        <p className={cn("text-lg font-black leading-tight", valueColors[color])}>
          {value}
        </p>
        <p className="text-[11px] text-slate-400">{sub}</p>
      </div>
    </div>
  );
}

function DayNode({
  status,
  dayNumber,
}: {
  status: "completed" | "current" | "upcoming";
  dayNumber: number;
}) {
  if (status === "completed") {
    return (
      <div className="w-10 h-10 rounded-full bg-emerald-500 border-[3px] border-white shadow-md flex items-center justify-center">
        <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
      </div>
    );
  }

  if (status === "current") {
    return (
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-25" />
        <div className="relative w-10 h-10 rounded-full bg-sky-500 border-[3px] border-white shadow-lg flex items-center justify-center">
          <span className="text-xs font-black text-white">{dayNumber}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm">
      <span className="text-xs font-bold text-slate-400">{dayNumber}</span>
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn("w-2.5 h-2.5 rounded-full inline-block", dot)} />
      <span className="text-[11px] text-slate-400">{label}</span>
    </div>
  );
}
