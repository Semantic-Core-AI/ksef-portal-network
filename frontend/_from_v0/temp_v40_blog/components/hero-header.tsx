"use client"

import { Search, CheckCircle2, RefreshCw, Shield, BookOpen } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

const categories = ["Podstawy", "Wdrożenie", "Koszty", "Prawo", "Techniczne", "FAQ"]

interface HeroHeaderProps {
  onCategorySelect: (category: string) => void
  selectedCategories: string[]
  onSearch: (query: string) => void
}

export function HeroHeader({ onCategorySelect, selectedCategories, onSearch }: HeroHeaderProps) {
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
    <header className="sticky top-0 z-50 bg-gradient-to-br from-[#1E2A5E] via-[#2C6AA8] to-[#1E2A5E]">
      <div className="container max-w-[1280px] mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center gap-3 mb-4">
          <Image
            src="/ksef-expert-logo-white.svg"
            alt="KSEF.EXPERT"
            width={500}
            height={113}
            className="h-[113px] w-auto"
            priority
          />
        </div>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white mb-3 leading-tight flex items-center gap-3">
          <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-[#C7A83B]" />
          Baza Prawdziwej Wiedzy
        </h1>

        <p className="text-base md:text-lg text-white/90 mb-6 max-w-2xl leading-relaxed">
          Kompleksowa wiedza o KSeF oparta na danych i faktach.
          <span className="font-semibold text-[#C7A83B]"> Zaufane przez 50,000+ firm w Polsce.</span>
        </p>

        {/* Search Bar */}
        <div className="relative max-w-3xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9CA3AF]" />
            <input
              type="search"
              placeholder="Szukaj artykułu... (naciśnij Ctrl+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-base rounded-xl border-2 border-white/20
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
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategorySelect(cat)}
              className={`px-3 py-1.5 rounded-full backdrop-blur-sm 
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

        <div className="flex flex-wrap items-center gap-4 mt-4 text-xs md:text-sm text-white/80">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#C7A83B]" />
            <span className="font-medium">50,000+ firm</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-[#C7A83B]" />
            <span className="font-medium">Aktualizowane codziennie</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#C7A83B]" />
            <span className="font-medium">Weryfikowane przez ekspertów</span>
          </div>
        </div>
      </div>
    </header>
  )
}
