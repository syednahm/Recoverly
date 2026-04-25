import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "success" | "warning" | "danger";
}

const GRADIENT_VARIANTS = {
  primary: "bg-gradient-to-r from-sky-500 to-blue-600",
  success: "bg-gradient-to-r from-emerald-500 to-green-600",
  warning: "bg-gradient-to-r from-amber-500 to-orange-600",
  danger: "bg-gradient-to-r from-red-500 to-rose-600",
};

export function GradientText({ 
  children, 
  className, 
  variant = "primary" 
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent font-bold",
        GRADIENT_VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
