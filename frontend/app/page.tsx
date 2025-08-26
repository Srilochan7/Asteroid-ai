"use client"

import { useState } from "react"
import { LandingPage } from "@/components/landing-page"
import { FeaturesPage } from "@/components/features-page"
import { AboutPage } from "@/components/about-page"
import { NotesGrid } from "@/components/notes-grid"
import { FloatingChatButton } from "@/components/floating-chat-button"
import { CosmicBackground } from "@/components/cosmic-background"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState<"landing" | "features" | "about" | "notes">("landing")

  if (currentPage === "landing") {
    return (
      <LandingPage
        onNavigateToNotes={() => setCurrentPage("notes")}
        // onNavigateToFeatures={() => setCurrentPage("features")}
        // onNavigateToAbout={() => setCurrentPage("about")}
      />
    )
  }

  if (currentPage === "features") {
    return (
      <FeaturesPage
        onNavigateToNotes={() => setCurrentPage("notes")}
        onNavigateToLanding={() => setCurrentPage("landing")}
        onNavigateToAbout={() => setCurrentPage("about")}
      />
    )
  }

  if (currentPage === "about") {
    return (
      <AboutPage
        onNavigateToNotes={() => setCurrentPage("notes")}
        onNavigateToLanding={() => setCurrentPage("landing")}
        onNavigateToFeatures={() => setCurrentPage("features")}
      />
    )
  }

  return (
    <main className="min-h-screen bg-background relative">
      <CosmicBackground />

      <nav className="relative z-20 p-4 glass backdrop-blur-md border-b border-white/10">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Logo size="sm" />
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setCurrentPage("landing")}
              className="text-white/70 hover:text-black hover:bg-white"
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      </nav>

      <div className="relative z-10">
        <NotesGrid />
      </div>
      <FloatingChatButton />
    </main>
  )
}
