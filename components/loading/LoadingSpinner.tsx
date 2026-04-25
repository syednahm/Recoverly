"use client";

import { motion } from "framer-motion";
import { Loader2, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "branded";
  text?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = "md", 
  variant = "default",
  text,
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  if (variant === "branded") {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
        <motion.div
          className="relative"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg">
            <Heart className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-sky-200 border-t-sky-500"
            animate={{
              rotate: -360
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-medium text-slate-600"
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Loader2 className={cn("animate-spin text-sky-500", sizeClasses[size])} />
      {text && <span className="text-sm text-slate-600">{text}</span>}
    </div>
  );
}
