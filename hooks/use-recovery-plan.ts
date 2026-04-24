"use client";

import { useState, useEffect } from "react";
import type { RecoveryPlan, Patient } from "@/types";
import { MOCK_RECOVERY_PLAN, MOCK_PATIENT } from "@/lib/mock-data";

interface UseRecoveryPlanReturn {
  plan: RecoveryPlan | null;
  patient: Patient | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useRecoveryPlan(patientId?: string): UseRecoveryPlanReturn {
  const [plan, setPlan] = useState<RecoveryPlan | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function fetchData() {
    setIsLoading(true);
    setError(null);
    // Simulated async load — replace with Supabase query
    setTimeout(() => {
      setPlan(MOCK_RECOVERY_PLAN);
      setPatient(MOCK_PATIENT);
      setIsLoading(false);
    }, 600);
  }

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId]);

  return { plan, patient, isLoading, error, refetch: fetchData };
}
