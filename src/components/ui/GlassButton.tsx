'use client';

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { ButtonHTMLAttributes } from "react";

const glassButtonVariants = cva(
  "group relative inline-flex items-center justify-center font-medium rounded-2xl cursor-pointer select-none backdrop-blur-xl border shadow-lg transition-all duration-300 overflow-hidden",
  {
    variants: {
      variant: {
        default: [
          "bg-white/10 text-white border-white/20 text-shadow-sm",
          "hover:bg-white/15 hover:border-white/30 hover:shadow-white/5",
          "active:bg-white/5",
        ],
        dark: [
          "bg-black/20 text-white border-white/10",
          "hover:bg-black/30 hover:border-white/15",
          "active:bg-black/40",
        ],
        glow: [
          "bg-gradient-to-b from-white/15 to-white/5 text-white border-white/25 shadow-white/10",
          "hover:from-white/25 hover:to-white/10 hover:border-white/40 hover:shadow-white/20",
          "after:absolute after:inset-0 after:bg-white/20 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500",
        ],
        purple: [
          "bg-fuchsia-500/15 text-white border-fuchsia-300/30 shadow-fuchsia-500/10",
          "hover:bg-fuchsia-500/25 hover:border-fuchsia-300/50 hover:shadow-fuchsia-500/20",
        ],
        amber: [
          "bg-amber-500/15 text-white border-amber-300/30 shadow-amber-500/10",
          "hover:bg-amber-500/25 hover:border-amber-300/50 hover:shadow-amber-500/20",
        ],
      },
      size: {
        sm: "px-4 py-1.5 text-xs font-semibold tracking-wide gap-1.5",
        md: "px-6 py-2.5 text-sm font-semibold tracking-wide gap-2",
        lg: "px-8 py-3.5 text-base font-bold tracking-wide gap-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface GlassButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'>,
    VariantProps<typeof glassButtonVariants> {
  children?: React.ReactNode;
}

export default function GlassButton({ variant, size, className, children, ...props }: GlassButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(glassButtonVariants({ variant, size }), className)}
      {...(props as any)}
    >
      {/* Edge Reflection Light */}
      <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Inner Hover Glow */}
      <span className="absolute -inset-1 top-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </motion.button>
  );
}
