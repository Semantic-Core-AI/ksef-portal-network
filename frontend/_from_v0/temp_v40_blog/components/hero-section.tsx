"use client"

import { Search, CheckCircle2, RefreshCw, Shield, BookOpen } from "lucide-react"
import { useState, useEffect } from "react"

const categories = ["Podstawy", "Wdrożenie", "Koszty", "Prawo", "Techniczne", "FAQ"]

interface HeroSectionProps {
  onCategorySelect: (category: string) => void
  selectedCategories: string[]
  onSearch: (query: string) => void
}

export function HeroSection({ onCategorySelect, selectedCategories, onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement
        searchInput?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch(searchQuery)
    }, 300)
    return () => clearTimeout(debounce)
  }, [searchQuery, onSearch])

  return (
    <section className="bg-gradient-to-br from-[#1E2A5E] via-[#2C6AA8] to-[#1E2A5E] py-12 md:py-16">
      <div className="container max-w-[1280px] mx-auto px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-4 leading-tight flex items-center gap-3">
          <BookOpen className="h-10 w-10 md:h-12 md:w-12 text-[#C7A83B]" />
          Baza Prawdziwej Wiedzy
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
          Kompleksowa wiedza o KSeF oparta na danych i faktach.
          <span className="font-semibold text-[#C7A83B]"> Zaufane przez 50,000+ firm w Polsce.</span>
        </p>

        {/* Search Bar */}
        <div className="relative max-w-3xl mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9CA3AF]" />
            <input
              type="search"
              placeholder="Szukaj artykułu... (naciśnij Ctrl+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-base rounded-xl border-2 border-white/20
                       focus:border-[#C7A83B] focus:ring-4 focus:ring-[#C7A83B]/20 
                       transition-all duration-200 outline-none shadow-medium
                       bg-white/95 backdrop-blur-sm"
            />
            <kbd
              className="absolute right-4 top-1/2 -translate-y-1/2 
                         px-2 py-1 text-xs font-medium text-[#6B7280] 
                         bg-[#F5F5F5] border border-[#D1D5DB] rounded"
            >
              Ctrl+K
            </kbd>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategorySelect(cat)}
              className={`px-4 py-2 rounded-full backdrop-blur-sm 
                       border-2 transition-all duration-200 text-sm font-semibold
                       shadow-soft hover:shadow-medium
                       ${
                         selectedCategories.includes(cat)
                           ? "bg-[#C7A83B] text-[#1E2A5E] border-[#C7A83B]"
                           : "bg-white/90 border-white/40 text-[#1E2A5E] hover:border-[#C7A83B] hover:bg-[#C7A83B] hover:text-[#1E2A5E]"
                       }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-[#C7A83B]" />
            <span className="font-medium">50,000+ firm</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-[#C7A83B]" />
            <span className="font-medium">Aktualizowane codziennie</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#C7A83B]" />
            <span className="font-medium">Weryfikowane przez ekspertów</span>
          </div>
        </div>
      </div>
    </section>
  )
}
