/**
 * Centralized animation configurations for consistent motion design
 */

export const TRANSITIONS = {
  fast: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  default: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  smooth: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  slow: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
  spring: { type: "spring", stiffness: 300, damping: 30 },
  bounce: { type: "spring", stiffness: 400, damping: 20 },
} as const;

export const FADE_IN = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const FADE_IN_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const FADE_IN_DOWN = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const SCALE_IN = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const SLIDE_IN_LEFT = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const SLIDE_IN_RIGHT = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

export const STAGGER_CHILDREN = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const HOVER_SCALE = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.98 },
};

export const HOVER_LIFT = {
  whileHover: { y: -4, transition: TRANSITIONS.fast },
  whileTap: { y: 0 },
};
