"use client";

import { motion } from "framer-motion";
import { FileQuestion, Upload, Activity, Pill } from "lucide-react";
import { EmptyState } from "./EmptyState";

interface NoDataStateProps {
  type: "recovery" | "medications" | "symptoms" | "documents";
  onAction?: () => void;
}

const EMPTY_STATE_CONFIG = {
  recovery: {
    icon: Upload,
    title: "No Recovery Plan Yet",
    description: "Upload your discharge instructions to generate a personalized recovery plan with AI.",
    actionLabel: "Upload Instructions"
  },
  medications: {
    icon: Pill,
    title: "No Medications Found",
    description: "Your medication schedule will appear here once you upload your discharge instructions.",
    actionLabel: "Upload Instructions"
  },
  symptoms: {
    icon: Activity,
    title: "No Symptoms Recorded",
    description: "Start tracking your symptoms to help monitor your recovery progress.",
    actionLabel: "Check In Now"
  },
  documents: {
    icon: FileQuestion,
    title: "No Documents",
    description: "Upload your discharge instructions, test results, or other medical documents.",
    actionLabel: "Upload Document"
  }
};

export function NoDataState({ type, onAction }: NoDataStateProps) {
  const config = EMPTY_STATE_CONFIG[type];

  return (
    <EmptyState
      icon={config.icon}
      title={config.title}
      description={config.description}
      action={onAction ? {
        label: config.actionLabel,
        onClick: onAction
      } : undefined}
    />
  );
}
