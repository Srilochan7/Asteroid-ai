"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "cosmic" | "stellar" | "quantum"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

export function EnhancedButton({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: EnhancedButtonProps) {
  const variants = {
    default: "bg-primary hover:bg-primary/80",
    cosmic: "bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 animate-aurora",
    stellar: "bg-gradient-to-r from-secondary to-primary hover:from-secondary/80 hover:to-primary/80 stellar-border",
    quantum: "bg-transparent border-2 border-accent hover:bg-accent/10 particle-trail",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <Button
      className={cn(
        "cosmic-hover transition-all duration-300 relative overflow-hidden",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
      {variant === "quantum" && <div className="absolute inset-0 animate-quantum-shimmer pointer-events-none" />}
    </Button>
  )
}
