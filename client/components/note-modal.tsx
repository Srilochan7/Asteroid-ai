"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TagInput } from "./tag-input"
import { X, Star, Trash2, Save, Palette } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  color: string
  starred: boolean
  createdAt: Date
  tags: string[]
}

interface NoteModalProps {
  note: Note | null
  isOpen: boolean
  onClose: () => void
  onUpdate: (id: string, updates: Partial<Note>) => void
  onDelete: (id: string) => void
}

const colorOptions = [
  "bg-gradient-to-br from-primary/10 to-primary/5",
  "bg-gradient-to-br from-secondary/10 to-secondary/5",
  "bg-gradient-to-br from-accent/10 to-accent/5",
  "bg-gradient-to-br from-primary/10 to-accent/5",
  "bg-gradient-to-br from-secondary/10 to-primary/5",
  "bg-gradient-to-br from-accent/10 to-secondary/5",
]

export function NoteModal({ note, isOpen, onClose, onUpdate, onDelete }: NoteModalProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
      setSelectedColor(note.color)
      setTags(note.tags || [])
    }
  }, [note])

  const handleSave = () => {
    if (note) {
      onUpdate(note.id, {
        title: title.trim() || "Untitled",
        content: content.trim(),
        color: selectedColor,
        tags: tags,
      })
      onClose()
    }
  }

  const handleDelete = () => {
    if (note) {
      onDelete(note.id)
      onClose()
    }
  }

  const toggleStar = () => {
    if (note) {
      onUpdate(note.id, { starred: !note.starred })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
    }
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSave()
    }
  }

  if (!isOpen || !note) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] glass-card border border-border/50 rounded-xl overflow-hidden ${selectedColor}`}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        {/* Animated background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary animate-constellation" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">
              {note.createdAt.toLocaleDateString()} • {content.length} characters
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleStar} className="h-8 w-8 p-0 hover:bg-accent/20">
              <Star className={`w-4 h-4 ${note.starred ? "fill-accent text-accent" : "text-muted-foreground"}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="h-8 w-8 p-0 hover:bg-primary/20"
            >
              <Palette className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDelete} className="h-8 w-8 p-0 hover:bg-destructive/20">
              <Trash2 className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Color picker */}
        {showColorPicker && (
          <div className="relative z-10 p-4 border-b border-border/50 bg-background/50">
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map((color, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedColor(color)
                    setShowColorPicker(false)
                  }}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${color} ${
                    selectedColor === color ? "border-primary scale-110" : "border-border/50 hover:scale-105"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            className="text-2xl font-bold bg-transparent border-none focus:ring-0 p-0 text-foreground placeholder:text-muted-foreground"
          />

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your thoughts..."
            className="min-h-[200px] bg-transparent border-border/50 focus:border-primary resize-none text-foreground placeholder:text-muted-foreground leading-relaxed"
          />

          {/* Tags input section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Tags</label>
            <TagInput tags={tags} onTagsChange={setTags} placeholder="Add tags to organize your thoughts..." />
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between p-6 border-t border-border/50 bg-background/50">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Auto-saved to constellation</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="glass border-border/50 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Note
            </Button>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent/30 rounded-full animate-float"
              style={{
                top: `${10 + i * 12}%`,
                left: `${5 + i * 11}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: "4s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
