"use client"

import { useState } from "react"
import { NoteCard } from "./note-card"
import { NoteModal } from "./note-modal"

import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  color: string
  starred: boolean
  createdAt: Date
  tags: string[]
}

const sampleNotes: Note[] = [
  {
    id: "1",
    title: "Quantum Computing Research",
    content:
      "Exploring the potential of quantum algorithms for machine learning applications. Key findings include improved optimization for neural networks and faster matrix operations.",
    color: "bg-gradient-to-br from-primary/10 to-primary/5",
    starred: true,
    createdAt: new Date("2024-01-15"),
    tags: ["quantum", "ml", "research"],
  },
  {
    id: "2",
    title: "AI Ethics Framework",
    content:
      "Developing guidelines for responsible AI development. Focus on transparency, fairness, and accountability in algorithmic decision-making.",
    color: "bg-gradient-to-br from-secondary/10 to-secondary/5",
    starred: false,
    createdAt: new Date("2024-01-14"),
    tags: ["ai", "ethics", "framework"],
  },
  {
    id: "3",
    title: "Space Data Analysis",
    content:
      "Processing astronomical data from the James Webb telescope. Identifying patterns in stellar formation and galaxy evolution.",
    color: "bg-gradient-to-br from-accent/10 to-accent/5",
    starred: true,
    createdAt: new Date("2024-01-13"),
    tags: ["space", "data", "astronomy"],
  },
  {
    id: "4",
    title: "Neural Network Architecture",
    content:
      "Designing a new transformer model for natural language understanding. Improvements in attention mechanisms and computational efficiency.",
    color: "bg-gradient-to-br from-primary/10 to-accent/5",
    starred: false,
    createdAt: new Date("2024-01-12"),
    tags: ["neural", "transformer", "nlp"],
  },
  {
    id: "5",
    title: "Cosmic Ray Detection",
    content:
      "Building sensors for detecting high-energy particles from deep space. Applications in understanding dark matter and cosmic phenomena.",
    color: "bg-gradient-to-br from-secondary/10 to-primary/5",
    starred: false,
    createdAt: new Date("2024-01-11"),
    tags: ["cosmic", "sensors", "physics"],
  },
  {
    id: "6",
    title: "Knowledge Graph Construction",
    content:
      "Creating interconnected knowledge representations for scientific literature. Enabling better discovery and connection of research insights.",
    color: "bg-gradient-to-br from-accent/10 to-secondary/5",
    starred: true,
    createdAt: new Date("2024-01-10"),
    tags: ["knowledge", "graph", "research"],
  },
]

export function NotesGrid() {
  const [notes, setNotes] = useState<Note[]>(sampleNotes)
  const [searchTerm, setSearchTerm] = useState("")
  const [showStarredOnly, setShowStarredOnly] = useState(false)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tagFilter, setTagFilter] = useState("")

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFilter = !showStarredOnly || note.starred
    const matchesTag = !tagFilter || note.tags.includes(tagFilter)
    return matchesSearch && matchesFilter && matchesTag
  })

  const allTags = Array.from(new Set(notes.flatMap((note) => note.tags))).sort()

  const handleUpdateNote = (id: string, updates: Partial<Note>) => {
    setNotes((prev) => prev.map((note) => (note.id === id ? { ...note, ...updates } : note)))
  }

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id))
  }

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "",
      content: "",
      color: "bg-gradient-to-br from-primary/10 to-accent/5",
      starred: false,
      createdAt: new Date(),
      tags: [],
    }
    setNotes((prev) => [newNote, ...prev])
    setSelectedNote(newNote)
    setIsModalOpen(true)
  }

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedNote(null)
  }

  return (
    <>
      

      <section className="py-20 px-6 pt-32">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Knowledge Constellation
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your thoughts, organized and interconnected like stars in the cosmos
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
            <div className="flex gap-4 items-center flex-wrap">
              <Button
                variant={showStarredOnly ? "default" : "outline"}
                onClick={() => setShowStarredOnly(!showStarredOnly)}
                className="glass border-border/50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Starred
              </Button>
              {tagFilter && (
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm">
                  <span>#{tagFilter}</span>
                  <button onClick={() => setTagFilter("")} className="text-gray-400 hover:text-white">
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNotes.map((note) => (
              <div key={note.id} className="animate-float" style={{ animationDelay: `${Math.random() * 2}s` }}>
                <NoteCard
                  note={note}
                  onUpdate={handleUpdateNote}
                  onDelete={handleDeleteNote}
                  onClick={handleNoteClick}
                />
              </div>
            ))}
          </div>

          {filteredNotes.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🌌</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No notes found</h3>
              <p className="text-muted-foreground">
                {searchTerm || showStarredOnly || tagFilter
                  ? "Try adjusting your search or filters"
                  : "Create your first note to start building your knowledge constellation"}
              </p>
            </div>
          )}
        </div>

        {/* Note Modal */}
        <NoteModal
          note={selectedNote}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handleUpdateNote}
          onDelete={handleDeleteNote}
        />
      </section>
    </>
  )
}
