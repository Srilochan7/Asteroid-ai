"use client"
import { CosmicBackground } from "@/components/cosmic-background"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { FloatingChatButton } from "@/components/floating-chat-button"

interface FeaturesPageProps {
  onNavigateToNotes: () => void
  onNavigateToLanding: () => void
  onNavigateToAbout: () => void
}

export function FeaturesPage({ onNavigateToNotes, onNavigateToLanding, onNavigateToAbout }: FeaturesPageProps) {
  const features = [
    {
      title: "Smart Note Organization",
      description: "AI-powered tagging and categorization keeps your knowledge structured and easily searchable.",
      icon: "🗂️",
    },
    {
      title: "Cosmic Search",
      description: "Find any piece of information instantly with our advanced search algorithms.",
      icon: "🔍",
    },
    {
      title: "AI Chat Assistant",
      description: "Get insights and answers from your saved knowledge through our intelligent chat interface.",
      icon: "🤖",
    },
    {
      title: "Visual Knowledge Map",
      description: "See connections between your notes in an interactive graph visualization.",
      icon: "🌐",
    },
    {
      title: "Real-time Sync",
      description: "Access your knowledge constellation from anywhere with instant synchronization.",
      icon: "⚡",
    },
    {
      title: "Privacy First",
      description: "Your knowledge remains secure with end-to-end encryption and local storage options.",
      icon: "🔒",
    },
  ]

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
              onClick={onNavigateToAbout}
              className="text-white/70 hover:text-black hover:bg-white"
            >
              About
            </Button>
            <Button onClick={onNavigateToNotes} className="bg-white text-black hover:bg-white/90">
              Launch App
            </Button>
          </div>
        </div>
      </nav>

      {/* Features Content */}
      <div className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Features
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Discover the powerful capabilities that make Asteroid AI your ultimate knowledge companion
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-105"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Explore the Cosmos?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of knowledge explorers who have transformed how they save and connect information.
            </p>
            <Button
              onClick={onNavigateToNotes}
              className="bg-white text-black hover:bg-white/90 text-lg px-8 py-3 rounded-full"
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>

      <FloatingChatButton />
    </main>
  )
}
