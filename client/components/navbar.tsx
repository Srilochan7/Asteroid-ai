"use client"

import type React from "react"

import { useState } from "react"
import { Search, Plus, Tag } from "lucide-react"

interface NavbarProps {
  onSearch?: (query: string) => void
  onAddNote?: () => void
  onFilterByTag?: (tag: string) => void
  availableTags?: string[]
}

export function Navbar({ onSearch, onAddNote, onFilterByTag, availableTags = [] }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showTagFilter, setShowTagFilter] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch?.(query)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/10 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">AI</span>
            </div>
            <h1 className="text-xl font-bold text-white">Asteroid AI</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search your knowledge..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Tag Filter */}
            <div className="relative">
              <button
                onClick={() => setShowTagFilter(!showTagFilter)}
                className="p-2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-white/5 rounded-lg"
              >
                <Tag className="w-5 h-5" />
              </button>

              {showTagFilter && availableTags.length > 0 && (
                <div className="absolute right-0 top-12 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-2 min-w-48 shadow-xl">
                  <div className="text-xs text-gray-400 mb-2 px-2">Filter by tag:</div>
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        onFilterByTag?.(tag)
                        setShowTagFilter(false)
                      }}
                      className="block w-full text-left px-2 py-1 text-sm text-white hover:bg-white/10 rounded transition-colors duration-200"
                    >
                      #{tag}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      onFilterByTag?.("")
                      setShowTagFilter(false)
                    }}
                    className="block w-full text-left px-2 py-1 text-sm text-gray-400 hover:bg-white/10 rounded transition-colors duration-200 border-t border-white/10 mt-1 pt-2"
                  >
                    Clear filter
                  </button>
                </div>
              )}
            </div>

            {/* Add Note Button */}
            <button
              onClick={onAddNote}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-200 hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add Note</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
