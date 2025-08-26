"use client"

import Image from "next/image"

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  // Increased the logo container sizes
  const sizeClasses = {
    sm: "w-10 h-10", // was w-8 h-8
    md: "w-14 h-14", // was w-12 h-12
    lg: "w-24 h-24", // was w-20 h-20
  }

  // Increased the primary text sizes to match
  const textSizes = {
    sm: "text-xl", // was text-lg
    md: "text-2xl", // was text-xl
    lg: "text-4xl", // was text-3xl
  }

  // Updated image dimensions to match the new Tailwind classes in pixels
  const imageDimensions = {
    sm: { width: 40, height: 40 }, // w-10 = 2.5rem = 40px
    md: { width: 56, height: 56 }, // w-14 = 3.5rem = 56px
    lg: { width: 96, height: 96 }, // w-24 = 6rem = 96px
  }

  return (
    <div className="flex items-center gap-1"> {/* Increased gap for the larger logo */}
      <div className={`${sizeClasses[size]} relative flex-shrink-0`}>
        <Image
          src="/logo.jpg"
          alt="Asteroid AI Logo"
          width={imageDimensions[size].width}
          height={imageDimensions[size].height}
          className="rounded-full object-cover"
          priority
        />
      </div>

      {/* MODIFIED PART: Text is now on a single line */}
      <div className="flex items-baseline gap-2">
        <span className={`${textSizes[size]} font-bold text-white tracking-wider`}>
          ASTEROID AI
        </span>
        {/* <span
          className={`${
            size === "sm" ? "text-sm" : size === "md" ? "text-base" : "text-lg"
          } text-gray-400 tracking-widest font-mono`}
        >
          AI
        </span> */}
      </div>
    </div>
  )
}