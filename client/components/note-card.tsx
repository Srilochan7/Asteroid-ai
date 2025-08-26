"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Edit3, Star, Hash } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  color: string
  starred: boolean
  createdAt: Date
  tags: string[]
}

interface NoteCardProps {
  note: Note
  onUpdate: (id: string, updates: Partial<Note>) => void
  onDelete: (id: string) => void
  onClick: (note: Note) => void
}

export function NoteCard({ note, onUpdate, onDelete, onClick }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const handleSave = () => {
    onUpdate(note.id, { title, content })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTitle(note.title)
    setContent(note.content)
    setIsEditing(false)
  }

  const toggleStar = (e: React.MouseEvent) => {
    e.stopPropagation()
    onUpdate(note.id, { starred: !note.starred })
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(note.id)
  }

  return (
    <Card
      className={`glass-card p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg group relative overflow-hidden ${
        note.color
      }`}
      onClick={() => !isEditing && onClick(note)}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Star indicator */}
      {note.starred && (
        <div className="absolute top-2 right-2 text-accent animate-pulse">
          <Star className="w-4 h-4 fill-current" />
        </div>
      )}

      <div className="relative z-10">
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border-b border-border focus:border-primary outline-none text-lg font-semibold text-foreground"
              placeholder="Note title..."
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-transparent border border-border rounded-md p-2 focus:border-primary outline-none text-foreground resize-none"
              rows={4}
              placeholder="Write your thoughts..."
            />
            <div className="flex gap-2 justify-end">
              <Button size="sm" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{note.title || "Untitled"}</h3>
            <p className="text-muted-foreground text-sm line-clamp-4 leading-relaxed mb-3">
              {note.content || "No content"}
            </p>

            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {note.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white/80"
                  >
                    <Hash className="w-2 h-2" />
                    {tag}
                  </span>
                ))}
                {note.tags.length > 3 && (
                  <span className="text-xs text-muted-foreground px-2 py-1">+{note.tags.length - 3} more</span>
                )}
              </div>
            )}

            <div className="flex items-center justify-between mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-xs text-muted-foreground">{note.createdAt.toLocaleDateString()}</span>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={toggleStar} className="h-8 w-8 p-0 hover:bg-accent/20">
                  <Star className={`w-4 h-4 ${note.starred ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsEditing(true)
                  }}
                  className="h-8 w-8 p-0 hover:bg-primary/20"
                >
                  <Edit3 className="w-4 h-4 text-muted-foreground" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDelete}
                  className="h-8 w-8 p-0 hover:bg-destructive/20"
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animated border */}
      <div className="absolute inset-0 rounded-lg border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Card>
  )
}
