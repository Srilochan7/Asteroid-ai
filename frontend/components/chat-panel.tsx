"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatBubble } from "./chat-bubble"
import { X, Send, Sparkles, Zap, Brain } from "lucide-react"

interface ChatMessage {
  id: string
  message: string
  isUser: boolean
  timestamp: Date
}

interface ChatPanelProps {
  isOpen: boolean
  onClose: () => void
}

const aiResponses = [
  "I'm analyzing the cosmic patterns in your knowledge base. What specific insights are you looking for?",
  "Your notes show interesting connections between quantum computing and AI ethics. Would you like me to explore these relationships?",
  "I've detected several research themes in your constellation. Let me help you organize them into meaningful clusters.",
  "The neural pathways in your knowledge graph suggest some fascinating interdisciplinary opportunities.",
  "I can help you connect disparate ideas across your notes. What topic would you like to explore deeper?",
  "Your space data analysis notes could benefit from the AI frameworks you've documented. Shall I suggest some connections?",
]

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      message:
        "Welcome to Asteroid AI! I'm here to help you navigate and connect your knowledge constellation. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div
      className={`fixed right-0 top-0 h-full w-96 glass-card border-l border-border/50 transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-glow">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Asteroid AI</h3>
            <p className="text-xs text-muted-foreground">Knowledge Navigator</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Graph visualization header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Sparkles className="w-4 h-4 text-accent animate-pulse" />
          <span>Neural Network Active</span>
        </div>
        <div className="flex gap-1">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`h-1 w-1 rounded-full ${
                i % 3 === 0 ? "bg-primary" : i % 3 === 1 ? "bg-accent" : "bg-secondary"
              } animate-pulse`}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-200px)]">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message.message}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-border/50 flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary" />
            </div>
            <div className="glass-card p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border-primary/30">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your knowledge..."
            className="glass border-border/50 focus:border-primary bg-transparent"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 px-3"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <Zap className="w-3 h-3 text-accent" />
          <span>Powered by cosmic intelligence</span>
        </div>
      </div>
    </div>
  )
}
