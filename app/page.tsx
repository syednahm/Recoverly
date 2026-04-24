import { DashboardShell } from "@/components/layout/DashboardShell";
import { StatusBanner } from "@/components/dashboard/StatusBanner";
import { RecoveryProgressRing, RecoveryConfidenceCard } from "@/components/dashboard/RecoveryScoreCard";
import { TodayChecklist } from "@/components/dashboard/TodayChecklist";
import { MedicationCards } from "@/components/dashboard/MedicationCards";
import { MilestoneTimeline } from "@/components/dashboard/MilestoneTimeline";
import { WarningBanner } from "@/components/dashboard/WarningBanner";
import { MOCK_RECOVERY_PLAN, MOCK_PATIENT } from "@/lib/mock-data";

export default function DashboardPage() {
  const plan = MOCK_RECOVERY_PLAN;
  const patient = MOCK_PATIENT;

  return (
    <DashboardShell>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Good afternoon, {patient.name.split(" ")[0]}
        </h1>
        <p className="text-base text-slate-500 mt-1">
          {patient.condition} &middot; Discharged{" "}
          {new Date(patient.dischargeDate).toLocaleDateString("en", {
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Status Banner — most prominent element */}
      <div className="mb-6">
        <StatusBanner
          status={plan.status}
          daysSince={plan.daysSinceDischarge}
          totalDays={plan.totalRecoveryDays}
        />
      </div>

      {/* Recovery Ring + Confidence Score — side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <RecoveryProgressRing
          daysSince={plan.daysSinceDischarge}
          totalDays={plan.totalRecoveryDays}
        />
        <RecoveryConfidenceCard
          score={plan.confidenceScore}
          aiInsight={plan.aiInsights[0]}
        />
      </div>

      {/* Main content — 2 columns on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left: Today's Tasks */}
        <TodayChecklist tasks={plan.tasks} />

        {/* Right: Medications */}
        <MedicationCards medications={plan.medications} />
      </div>

      {/* Milestones — full width */}
      <div className="mb-6">
        <MilestoneTimeline milestones={plan.milestones} />
      </div>

      {/* Warning Signs — at the bottom, always visible */}
      <WarningBanner warnings={plan.warningSigns} />
    </DashboardShell>
  );
}
