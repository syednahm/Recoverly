"use client";

import { motion } from "framer-motion";
import { Activity, Pill, CheckCircle2, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub: string;
  color: string;
  bg: string;
  delay?: number;
}

function StatCard({ icon: Icon, label, value, sub, color, bg, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">{label}</p>
              <p className="text-2xl font-black text-slate-800 leading-none">{value}</p>
              <p className="text-xs text-slate-400 mt-1">{sub}</p>
            </div>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${bg}`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface StatsRowProps {
  daysSince: number;
  totalDays: number;
  medicationAdherence: number;
  tasksCompleted: number;
  totalTasks: number;
  nextAppointment: string;
}

export function StatsRow({
  daysSince,
  totalDays,
  medicationAdherence,
  tasksCompleted,
  totalTasks,
  nextAppointment,
}: StatsRowProps) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        icon={Activity}
        label="Recovery Day"
        value={`Day ${daysSince}`}
        sub={`of ${totalDays} total`}
        color="text-sky-600"
        bg="bg-sky-50"
        delay={0}
      />
      <StatCard
        icon={Pill}
        label="Med Adherence"
        value={`${medicationAdherence}%`}
        sub="Last 7 days"
        color="text-emerald-600"
        bg="bg-emerald-50"
        delay={0.08}
      />
      <StatCard
        icon={CheckCircle2}
        label="Tasks Today"
        value={`${tasksCompleted}/${totalTasks}`}
        sub="Completed"
        color="text-violet-600"
        bg="bg-violet-50"
        delay={0.16}
      />
      <StatCard
        icon={Calendar}
        label="Follow-up"
        value={nextAppointment}
        sub="Dr. Chen · 7 days"
        color="text-amber-600"
        bg="bg-amber-50"
        delay={0.24}
      />
    </div>
  );
}
