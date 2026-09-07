import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** vertical offset to slide from (px). 0 = fade only */
  y?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Fades + slides children into view on scroll.
 * Respects prefers-reduced-motion (renders plain children, no transform).
 */
export function SectionReveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: SectionRevealProps) {
  const reduce = useReducedMotion();

  // Reduced-motion users: render content immediately, fully visible (no fade/slide).
  // This also guards against IntersectionObserver edge cases for those users.
  if (reduce) {
    const Tag = as as "div";
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
