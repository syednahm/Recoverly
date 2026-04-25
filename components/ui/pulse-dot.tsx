import { cn } from "@/lib/utils";

interface PulseDotProps {
  color?: "sky" | "emerald" | "amber" | "red";
  size?: "sm" | "md" | "lg";
}

const COLOR_CLASSES = {
  sky: "bg-sky-400",
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
  red: "bg-red-400",
};

const SIZE_CLASSES = {
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2",
  lg: "w-2.5 h-2.5",
};

export function PulseDot({ color = "sky", size = "md" }: PulseDotProps) {
  return (
    <span className="relative inline-flex">
      <span
        className={cn(
          "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
          COLOR_CLASSES[color]
        )}
      />
      <span
        className={cn(
          "relative inline-flex rounded-full",
          COLOR_CLASSES[color],
          SIZE_CLASSES[size]
        )}
      />
    </span>
  );
}
