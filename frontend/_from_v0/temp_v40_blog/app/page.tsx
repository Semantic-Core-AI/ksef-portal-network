"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturedContent } from "@/components/featured-content"
import { SidebarFilters } from "@/components/sidebar-filters"
import { MasonryGrid } from "@/components/masonry-grid"
import { MobileFilterDrawer } from "@/components/mobile-filter-drawer"
import { ViralDashboard } from "@/components/viral-dashboard"
import { mockArticles } from "@/lib/data"
import { Filter } from "lucide-react"

export default function HomePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const [displayCount, setDisplayCount] = useState(12)

  const activeFiltersCount = useMemo(() => {
    return selectedCategories.length + selectedDifficulty.length + selectedTypes.length + selectedTags.length
  }, [selectedCategories, selectedDifficulty, selectedTypes, selectedTags])

  const filteredArticles = useMemo(() => {
    let result = mockArticles

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.excerpt.toLowerCase().includes(query) ||
          a.tags.some((t) => t.toLowerCase().includes(query)),
      )
    }

    if (selectedCategories.length > 0 && !selectedCategories.includes("Wszystkie")) {
      result = result.filter((a) => selectedCategories.includes(a.category))
    }

    if (selectedDifficulty.length > 0) {
      result = result.filter((a) => selectedDifficulty.includes(a.difficulty))
    }

    if (selectedTypes.length > 0) {
      result = result.filter((a) => selectedTypes.includes(a.contentType))
    }

    if (selectedTags.length > 0) {
      result = result.filter((a) => a.tags.some((t) => selectedTags.includes(t)))
    }

    if (dateRange !== "all") {
      const now = new Date()
      const ranges: Record<string, number> = {
        week: 7,
        month: 30,
        quarter: 90,
        year: 365,
      }
      const days = ranges[dateRange]
      result = result.filter((a) => {
        const publishDate = new Date(a.publishedAt)
        const diffDays = (now.getTime() - publishDate.getTime()) / (1000 * 3600 * 24)
        return diffDays <= days
      })
    }

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        case "popular":
          return b.views - a.views
        case "rating":
          return b.rating.average - a.rating.average
        case "longest":
          return b.readingTime - a.readingTime
        case "shortest":
          return a.readingTime - b.readingTime
        case "alphabetical":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return result
  }, [selectedCategories, selectedDifficulty, selectedTypes, selectedTags, dateRange, sortBy, searchQuery])

  const displayedArticles = useMemo(() => {
    return filteredArticles.slice(0, displayCount)
  }, [filteredArticles, displayCount])

  const handleReset = () => {
    setSelectedCategories([])
    setSelectedDifficulty([])
    setSelectedTypes([])
    setSelectedTags([])
    setDateRange("all")
    setSortBy("newest")
    setSearchQuery("")
  }

  const handleCategorySelect = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 12)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      <HeroSection
        onCategorySelect={handleCategorySelect}
        selectedCategories={selectedCategories}
        onSearch={setSearchQuery}
      />

      <FeaturedContent articles={mockArticles} />

      <div className="container max-w-[1280px] mx-auto px-4 py-12">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-[280px] flex-shrink-0">
            <div className="sticky top-24">
              <SidebarFilters
                selectedCategories={selectedCategories}
                selectedDifficulty={selectedDifficulty}
                selectedTypes={selectedTypes}
                selectedTags={selectedTags}
                dateRange={dateRange}
                sortBy={sortBy}
                onCategoryChange={setSelectedCategories}
                onDifficultyChange={setSelectedDifficulty}
                onTypeChange={setSelectedTypes}
                onTagChange={setSelectedTags}
                onDateRangeChange={setDateRange}
                onSortChange={setSortBy}
                onReset={handleReset}
              />
            </div>
          </aside>

          <MasonryGrid
            articles={displayedArticles}
            activeFiltersCount={activeFiltersCount}
            totalCount={filteredArticles.length}
            onLoadMore={handleLoadMore}
            hasMore={displayCount < filteredArticles.length}
          />
        </div>
      </div>

      <ViralDashboard />

      <button
        onClick={() => setIsMobileDrawerOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 
                       w-14 h-14 rounded-full bg-[#1E2A5E] text-white 
                       shadow-strong hover:shadow-strong hover:scale-110 
                       transition-all duration-200 flex items-center justify-center"
      >
        <Filter className="h-6 w-6" />
        {activeFiltersCount > 0 && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 bg-[#DC2626] 
                        text-white text-xs font-bold rounded-full flex items-center justify-center"
          >
            {activeFiltersCount}
          </span>
        )}
      </button>

      <MobileFilterDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        selectedCategories={selectedCategories}
        selectedDifficulty={selectedDifficulty}
        selectedTypes={selectedTypes}
        selectedTags={selectedTags}
        dateRange={dateRange}
        sortBy={sortBy}
        onCategoryChange={setSelectedCategories}
        onDifficultyChange={setSelectedDifficulty}
        onTypeChange={setSelectedTypes}
        onTagChange={setSelectedTags}
        onDateRangeChange={setDateRange}
        onSortChange={setSortBy}
        onReset={handleReset}
      />
    </div>
  )
}
