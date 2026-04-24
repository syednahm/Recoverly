export const APP_NAME = "RecoveryPath";
export const APP_DESCRIPTION = "AI-guided post-discharge recovery companion";

export const NAV_ITEMS = [
  { title: "Dashboard", href: "/", icon: "LayoutDashboard" },
  { title: "Recovery Plan", href: "/recovery-plan", icon: "ClipboardList" },
  { title: "Medications", href: "/medications", icon: "Pill" },
  { title: "Symptoms", href: "/symptoms", icon: "Activity" },
  { title: "Milestones", href: "/milestones", icon: "Trophy" },
  { title: "Documents", href: "/documents", icon: "FileText" },
  { title: "Settings", href: "/settings", icon: "Settings" },
] as const;

export const RECOVERY_STATUS_CONFIG = {
  on_track: {
    label: "On Track",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  needs_attention: {
    label: "Needs Attention",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  at_risk: {
    label: "At Risk",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-red-500",
  },
  completed: {
    label: "Completed",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-200",
    dot: "bg-sky-500",
  },
} as const;

export const SYMPTOM_SEVERITY_CONFIG = {
  none: { label: "None", color: "text-slate-500" },
  mild: { label: "Mild", color: "text-emerald-600" },
  moderate: { label: "Moderate", color: "text-amber-600" },
  severe: { label: "Severe", color: "text-red-600" },
} as const;
