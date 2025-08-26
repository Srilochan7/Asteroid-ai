"use client"

import { CosmicBackground } from "@/components/cosmic-background"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { FloatingChatButton } from "@/components/floating-chat-button"

interface AboutPageProps {
  onNavigateToNotes: () => void
  onNavigateToLanding: () => void
  onNavigateToFeatures: () => void
}

export function AboutPage({ onNavigateToNotes, onNavigateToLanding, onNavigateToFeatures }: AboutPageProps) {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <CosmicBackground />

      {/* Navigation */}
      <nav className="relative z-20 p-4 glass backdrop-blur-md border-b border-white/10">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Logo size="sm" />
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onNavigateToLanding}
              className="text-white/70 hover:text-black hover:bg-white"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={onNavigateToFeatures}
              className="text-white/70 hover:text-black hover:bg-white"
            >
              Features
            </Button>
            <Button onClick={onNavigateToNotes} className="bg-white text-black hover:bg-white/90">
              Launch App
            </Button>
          </div>
        </div>
      </nav>

      {/* About Content */}
      <div className="relative z-10 pt-20 pb-32">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              About Asteroid AI
            </h1>
            <p className="text-xl text-white/70">Revolutionizing how humanity saves and connects knowledge</p>
          </div>

          {/* Mission Section */}
          <div className="glass p-12 rounded-3xl border border-white/10 mb-12">
            <h2 className="text-4xl font-bold mb-8 text-white text-center">Our Mission</h2>
            <p className="text-lg text-white/80 leading-relaxed text-center max-w-3xl mx-auto">
              In the vast cosmos of information, knowledge often drifts apart like distant asteroids. Asteroid AI brings
              these fragments together, creating connections that illuminate new possibilities and insights. We believe
              that every piece of knowledge has the potential to spark innovation when properly connected.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="glass p-8 rounded-2xl border border-white/10">
              <h3 className="text-3xl font-bold mb-6 text-white">The Vision</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Born from the frustration of scattered notes and forgotten insights, Asteroid AI represents a new
                paradigm in knowledge management. We envision a world where information doesn't just exist in isolation
                but forms meaningful constellations of understanding.
              </p>
              <p className="text-white/70 leading-relaxed">
                Our platform transforms the way you capture, organize, and rediscover your thoughts, making every note a
                potential catalyst for breakthrough moments.
              </p>
            </div>

            <div className="glass p-8 rounded-2xl border border-white/10">
              <h3 className="text-3xl font-bold mb-6 text-white">The Technology</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Powered by advanced AI algorithms and intuitive design, Asteroid AI doesn't just store your knowledge—it
                understands it. Our intelligent tagging system, semantic search capabilities, and connection mapping
                create a living ecosystem of information.
              </p>
              <p className="text-white/70 leading-relaxed">
                Every interaction teaches the system more about your thinking patterns, making it an increasingly
                powerful extension of your mind.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="glass p-12 rounded-3xl border border-white/10 mb-12">
            <h2 className="text-4xl font-bold mb-8 text-white text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h4 className="text-xl font-semibold mb-3 text-white">Privacy First</h4>
                <p className="text-white/70">
                  Your knowledge belongs to you. We prioritize security and give you full control over your data.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h4 className="text-xl font-semibold mb-3 text-white">Innovation</h4>
                <p className="text-white/70">
                  We constantly push boundaries to create tools that enhance human creativity and understanding.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌟</div>
                <h4 className="text-xl font-semibold mb-3 text-white">Simplicity</h4>
                <p className="text-white/70">
                  Complex technology should feel effortless. We design for intuitive, delightful experiences.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">Join the Knowledge Revolution</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Be part of a community that's redefining how we interact with information. Your journey through the cosmos
              of knowledge starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onNavigateToNotes}
                className="bg-white text-black hover:bg-white/90 text-lg px-8 py-3 rounded-full"
              >
                Start Exploring
              </Button>
              <Button
                onClick={onNavigateToFeatures}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-3 rounded-full bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      <FloatingChatButton />
    </main>
  )
}
