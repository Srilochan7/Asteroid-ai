"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, User } from "lucide-react"

interface ChatBubbleProps {
  message: string
  isUser: boolean
  timestamp: Date
}

export function ChatBubble({ message, isUser, timestamp }: ChatBubbleProps) {
  return (
    <div className={`flex gap-3 mb-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <Avatar className={`w-8 h-8 ${isUser ? "bg-accent/20" : "bg-primary/20"} border border-border/50`}>
        <AvatarFallback className="bg-transparent">
          {isUser ? <User className="w-4 h-4 text-accent" /> : <Bot className="w-4 h-4 text-primary" />}
        </AvatarFallback>
      </Avatar>

      <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`glass-card p-3 rounded-lg relative overflow-hidden ${
            isUser
              ? "bg-gradient-to-br from-accent/20 to-accent/10 border-accent/30"
              : "bg-gradient-to-br from-primary/20 to-primary/10 border-primary/30"
          }`}
        >
          {/* Glow effect */}
          <div
            className={`absolute inset-0 opacity-50 ${
              isUser
                ? "bg-gradient-to-br from-accent/10 to-transparent"
                : "bg-gradient-to-br from-primary/10 to-transparent"
            }`}
          />

          <p className="text-foreground text-sm leading-relaxed relative z-10">{message}</p>

          {/* Animated border for AI messages */}
          {!isUser && <div className="absolute inset-0 rounded-lg border border-primary/40 animate-constellation" />}
        </div>

        <span className="text-xs text-muted-foreground mt-1 px-1">
          {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  )
}
