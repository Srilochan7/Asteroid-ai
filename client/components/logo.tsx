"use client"

import { useState, useEffect } from "react"

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const [glowIntensity, setGlowIntensity] = useState(0.3)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(Math.random() * 0.5 + 0.3)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  }

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  }

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Asteroid shape with glow */}
        <div
          className="w-full h-full rounded-full bg-gradient-to-br from-white to-gray-400 relative overflow-hidden"
          style={{
            boxShadow: `0 0 20px rgba(255, 255, 255, ${glowIntensity})`,
          }}
        >
          {/* Crater effects */}
          <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-gray-600 opacity-60"></div>
          <div className="absolute bottom-3 right-2 w-1 h-1 rounded-full bg-gray-700 opacity-40"></div>
          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-gray-500 opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>

          {/* Orbital ring */}
          <div
            className="absolute inset-0 rounded-full border border-white/20 animate-spin"
            style={{ animationDuration: "8s" }}
          ></div>
        </div>

        {/* Floating particles */}
        <div className="absolute -top-1 -right-1 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div
          className="absolute -bottom-1 -left-1 w-0.5 h-0.5 bg-gray-300 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="flex flex-col">
        <span className={`${textSizes[size]} font-bold text-white tracking-wider`}>ASTEROID</span>
        <span
          className={`${size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"} text-gray-400 tracking-widest font-mono`}
        >
          AI
        </span>
      </div>
    </div>
  )
}
