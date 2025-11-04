"use client"

import { useState, useEffect } from "react"
import { highlightStorage, type Highlight } from "@/lib/university-features"
import { X, Highlighter, StickyNote } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HighlightsPanelProps {
  articleSlug: string
}

export function HighlightsPanel({ articleSlug }: HighlightsPanelProps) {
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setHighlights(highlightStorage.getByArticle(articleSlug))
  }, [articleSlug])

  const deleteHighlight = (id: string) => {
    highlightStorage.delete(id)
    setHighlights(highlightStorage.getByArticle(articleSlug))
  }

  const colorClasses = {
    yellow: "bg-[#FFF59D] border-[#F9A825]",
    green: "bg-[#C5E1A5] border-[#7CB342]",
    blue: "bg-[#90CAF9] border-[#1E88E5]",
    pink: "bg-[#F48FB1] border-[#E91E63]",
  }

  if (highlights.length === 0) return null

  return (
    <div className="fixed right-4 top-24 z-40">
      <Button onClick={() => setIsOpen(!isOpen)} className="bg-[#C7A83B] hover:bg-[#B8991A] text-[#1E2A5E] shadow-lg">
        <Highlighter className="w-4 h-4 mr-2" />
        Highlights ({highlights.length})
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-80 max-h-[600px] overflow-y-auto bg-white rounded-lg shadow-xl border-2 border-[#1E2A5E] p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-xl text-[#1E2A5E] flex items-center gap-2">
              <StickyNote className="w-5 h-5" />
              Twoje notatki
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {highlights.map((highlight) => (
              <div key={highlight.id} className={`p-3 rounded-lg border-l-4 ${colorClasses[highlight.color]}`}>
                <p className="text-sm text-gray-800 mb-2 italic">"{highlight.text}"</p>
                {highlight.note && <p className="text-xs text-gray-600 mb-2">📝 {highlight.note}</p>}
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {new Date(highlight.createdAt).toLocaleDateString("pl-PL")}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteHighlight(highlight.id)}
                    className="h-6 px-2 text-xs"
                  >
                    Usuń
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
