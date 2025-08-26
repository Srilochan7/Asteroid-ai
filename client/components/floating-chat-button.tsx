"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChatPanel } from "./chat-panel"
import { MessageCircle } from "lucide-react"

export function FloatingChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsChatOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent hover:from-primary/80 hover:to-accent/80 shadow-lg animate-pulse-glow z-40 transition-all duration-300 ${
          isChatOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full" />
        </div>
      </Button>

      {/* Floating particles around button */}
      <div className={`fixed bottom-6 right-6 w-14 h-14 pointer-events-none z-30 ${isChatOpen ? "hidden" : "block"}`}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full animate-float opacity-60"
            style={{
              top: `${20 + Math.sin((i * 60 * Math.PI) / 180) * 25}px`,
              left: `${20 + Math.cos((i * 60 * Math.PI) / 180) * 25}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Overlay */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-background/20 backdrop-blur-sm z-40" onClick={() => setIsChatOpen(false)} />
      )}
    </>
  )
}
