"use client"

import { Button } from "@/components/ui/button"
import { ParticleNetwork } from "./particle-network"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleNetwork />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80" />

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-float">
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            Asteroid AI
          </h1>
        </div>

        <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Save Knowledge. Connect the Cosmos.
        </p>

        <p className="text-lg mb-12 text-foreground/80 max-w-3xl mx-auto leading-relaxed">
          Harness the power of artificial intelligence to organize, connect, and explore your knowledge like never
          before. Transform scattered thoughts into a constellation of insights.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="animate-pulse-glow bg-gradient-to-r from-white to-gray-200 hover:from-gray-100 hover:to-gray-300 text-black px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Launch Into Space
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="glass border-white/30 text-foreground hover:bg-white/10 px-8 py-4 text-lg rounded-lg transition-all duration-300 bg-transparent"
          >
            Explore the Universe
          </Button>
        </div>

        <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-gray-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 -right-40 w-32 h-32 bg-gray-500/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
