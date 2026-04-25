"use client";

import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Pill,
  Clock,
  CheckCircle2,
  Circle,
  Calendar,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_RECOVERY_PLAN, MOCK_PATIENT } from "@/lib/mock-data";
import { motion } from "framer-motion";

const FREQUENCY_LABELS: Record<string, string> = {
  once_daily: "Once daily",
  twice_daily: "Twice daily",
  three_times_daily: "3× daily",
  as_needed: "As needed",
  weekly: "Weekly",
};

export default function MedicationsPage() {
  const plan = MOCK_RECOVERY_PLAN;
  const patient = MOCK_PATIENT;
  
  const activeMeds = plan.medications;
  const takenCount = activeMeds.filter((m) => m.taken).length;
  const pendingCount = activeMeds.length - takenCount;
  const adherenceRate = Math.round((takenCount / activeMeds.length) * 100);

  return (
    <DashboardShell>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-100 border border-blue-200 shrink-0">
            <Pill className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
              Medications
            </h1>
            <p className="text-sm text-slate-500">
              {patient.condition} &middot; Day {plan.daysSinceDischarge}
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-slate-400 mt-3 mb-4">
          <Link
            href="/"
            className="hover:text-slate-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 rounded-sm"
          >
            Dashboard
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600 font-medium">Medications</span>
        </nav>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            label="Active Medications"
            value={activeMeds.length.toString()}
            sub="prescribed"
            color="blue"
            icon={Pill}
          />
          <StatCard
            label="Taken Today"
            value={takenCount.toString()}
            sub={`${pendingCount} pending`}
            color="emerald"
            icon={CheckCircle2}
          />
          <StatCard
            label="Adherence Rate"
            value={`${adherenceRate}%`}
            sub="this week"
            color="sky"
            icon={TrendingUp}
          />
          <StatCard
            label="Next Dose"
            value={activeMeds.find((m) => !m.taken)?.nextDose?.split(" ")[0] ?? "—"}
            sub="scheduled"
            color="amber"
            icon={Clock}
          />
        </div>
      </div>

      {/* Active Medications Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-black text-slate-800">Today's Schedule</h2>
            <p className="text-xs text-slate-400">
              {takenCount} of {activeMeds.length} medications taken
            </p>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-semibold px-3 py-1",
              pendingCount > 0
                ? "bg-amber-50 border-amber-200 text-amber-700"
                : "bg-emerald-50 border-emerald-200 text-emerald-700"
            )}
          >
            {pendingCount > 0 ? `${pendingCount} Due` : "All Taken"}
          </Badge>
        </div>

        <div className="space-y-4">
          {activeMeds.map((med, index) => (
            <MedicationCard key={med.id} medication={med} index={index} />
          ))}
        </div>
      </div>

      {/* Medication Guidelines */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-sky-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-800 mb-2">
                Important Medication Guidelines
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <span>
                    Take medications at the same time each day to maintain consistent levels
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <span>
                    Never mix pain medications without consulting your care team
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <span>
                    Contact Dr. {patient.surgeon?.split(" ").pop() ?? "Chen"} if you experience unusual side effects
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <span>
                    Keep all medications in their original containers and check expiration dates
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Note */}
      <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0">
          <Pill className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-700">
            AI-Extracted Medication Schedule
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            This medication plan was extracted from your discharge instructions. Always follow the prescription labels and consult your pharmacist or care team with questions.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}

function MedicationCard({
  medication,
  index,
}: {
  medication: (typeof MOCK_RECOVERY_PLAN.medications)[0];
  index: number;
}) {
  const startDate = new Date(medication.startDate);
  const endDate = medication.endDate ? new Date(medication.endDate) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card
        className={cn(
          "border-2 transition-all hover:shadow-md",
          medication.taken
            ? "bg-slate-50/50 border-slate-200"
            : "bg-white border-blue-100 shadow-sm"
        )}
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-5">
            {/* Icon */}
            <div
              className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors",
                medication.taken ? "bg-slate-100" : "bg-blue-50"
              )}
            >
              <Pill
                className={cn(
                  "w-7 h-7",
                  medication.taken ? "text-slate-400" : "text-blue-500"
                )}
                style={!medication.taken ? { color: medication.color } : undefined}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Header with status */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3
                    className={cn(
                      "text-xl font-black leading-tight",
                      medication.taken ? "text-slate-400" : "text-slate-900"
                    )}
                  >
                    {medication.name}
                  </h3>
                  <p
                    className={cn(
                      "text-base font-semibold mt-0.5",
                      medication.taken ? "text-slate-300" : "text-slate-500"
                    )}
                  >
                    {medication.dosage} · {FREQUENCY_LABELS[medication.frequency]}
                  </p>
                </div>

                {medication.taken ? (
                  <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white border-0 px-4 py-1.5 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Taken
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-2 border-slate-300 text-slate-600 px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Circle className="w-3.5 h-3.5" />
                    Pending
                  </Badge>
                )}
              </div>

              {/* Next dose timing */}
              {medication.nextDose && !medication.taken && (
                <div className="flex items-center gap-2 mb-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-bold text-blue-700">
                    Next dose: {medication.nextDose}
                  </span>
                </div>
              )}

              {/* Purpose */}
              <div className="mb-4">
                <p
                  className={cn(
                    "text-sm leading-relaxed",
                    medication.taken ? "text-slate-400" : "text-slate-600"
                  )}
                >
                  {medication.purpose}
                </p>
              </div>

              <Separator className="my-4" />

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem
                  icon={Calendar}
                  label="Duration"
                  value={
                    endDate
                      ? `${startDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })} – ${endDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}`
                      : "Ongoing"
                  }
                  muted={medication.taken}
                />
                <DetailItem
                  icon={AlertCircle}
                  label="Instructions"
                  value={medication.instructions}
                  muted={medication.taken}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
  muted,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  muted: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
          muted ? "bg-slate-100" : "bg-slate-100"
        )}
      >
        <Icon className={cn("w-4 h-4", muted ? "text-slate-400" : "text-slate-500")} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn("text-xs font-semibold", muted ? "text-slate-400" : "text-slate-500")}>
          {label}
        </p>
        <p
          className={cn(
            "text-sm font-medium leading-tight mt-0.5",
            muted ? "text-slate-400" : "text-slate-700"
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

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
  color: "blue" | "emerald" | "sky" | "amber";
  icon: React.ElementType;
}) {
  const iconColors = {
    blue: "bg-blue-50 border-blue-200 text-blue-600",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-600",
    sky: "bg-sky-50 border-sky-200 text-sky-600",
    amber: "bg-amber-50 border-amber-200 text-amber-600",
  };
  const valueColors = {
    blue: "text-blue-700",
    emerald: "text-emerald-700",
    sky: "text-sky-700",
    amber: "text-amber-700",
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
