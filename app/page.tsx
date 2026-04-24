"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageTransition, FadeInUp } from "@/components/layout/PageTransition";
import { StatusBanner } from "@/components/dashboard/StatusBanner";
import { RecoveryProgressRing } from "@/components/dashboard/RecoveryScoreCard";
import { ConfidenceScoreCard } from "@/components/dashboard/ConfidenceScoreCard";
import { TodayChecklist } from "@/components/dashboard/TodayChecklist";
import { MedicationCards } from "@/components/dashboard/MedicationCards";
import { MilestoneTimeline } from "@/components/dashboard/MilestoneTimeline";
import { WarningBanner } from "@/components/dashboard/WarningBanner";
import { RiskAssessmentCard } from "@/components/dashboard/RiskAssessmentCard";
import { MOCK_RECOVERY_PLAN, MOCK_PATIENT, MOCK_RISK_ASSESSMENT } from "@/lib/mock-data";
import { getConfidenceBreakdown } from "@/lib/confidence-score";

export default function DashboardPage() {
  const plan = MOCK_RECOVERY_PLAN;
  const patient = MOCK_PATIENT;
  const confidenceBreakdown = getConfidenceBreakdown(plan);

  return (
    <DashboardShell>
      <PageTransition>
        {/* Page Header */}
        <FadeInUp className="mb-6">
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
        </FadeInUp>

        {/* Status Banner — most prominent element */}
        <FadeInUp delay={0.1} className="mb-6">
          <StatusBanner
            status={plan.status}
            daysSince={plan.daysSinceDischarge}
            totalDays={plan.totalRecoveryDays}
          />
        </FadeInUp>

        {/* Recovery Ring + Confidence Score — side by side */}
        <FadeInUp delay={0.2} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RecoveryProgressRing
            daysSince={plan.daysSinceDischarge}
            totalDays={plan.totalRecoveryDays}
          />
          <ConfidenceScoreCard breakdown={confidenceBreakdown} />
        </FadeInUp>

        {/* Main content — 2 columns on large screens */}
        <FadeInUp delay={0.3} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TodayChecklist tasks={plan.tasks} />
          <MedicationCards medications={plan.medications} />
        </FadeInUp>

        {/* Milestones — full width */}
        <FadeInUp delay={0.4} className="mb-6">
          <MilestoneTimeline milestones={plan.milestones} />
        </FadeInUp>

        {/* AI-Powered Risk Assessment — personalized risk intelligence */}
        <FadeInUp delay={0.5} className="mb-6">
          <RiskAssessmentCard assessment={MOCK_RISK_ASSESSMENT} />
        </FadeInUp>

        {/* Static Warning Signs — at the bottom, always visible */}
        <FadeInUp delay={0.6}>
          <WarningBanner warnings={plan.warningSigns} />
        </FadeInUp>
      </PageTransition>
    </DashboardShell>
  );
}
