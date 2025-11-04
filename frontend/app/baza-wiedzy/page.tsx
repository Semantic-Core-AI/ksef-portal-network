"use client"

import { useState, useMemo, useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { FeaturedContent } from "@/components/featured-content"
import { SidebarFilters } from "@/components/sidebar-filters"
import { MasonryGrid } from "@/components/masonry-grid"
import { MobileFilterDrawer } from "@/components/mobile-filter-drawer"
import { ViralDashboard } from "@/components/viral-dashboard"
import type { StrapiArticle } from "@/lib/strapi"
import { Filter } from "lucide-react"

export default function BazaWiedzyPage() {
  const [articles, setArticles] = useState<StrapiArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const [displayCount, setDisplayCount] = useState(12)

  useEffect(() => {
    async function fetchArticles() {
      try {
        setIsLoading(true)
        const response = await fetch('/api/articles')
        const data = await response.json()
        setArticles(data)
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const activeFiltersCount = useMemo(() => {
    return selectedCategories.length + selectedDifficulty.length + selectedTypes.length + selectedTags.length
  }, [selectedCategories, selectedDifficulty, selectedTypes, selectedTags])

  const filteredArticles = useMemo(() => {
    let result = articles

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.excerpt.toLowerCase().includes(query) ||
          (a.tags && a.tags.some((t) => t.toLowerCase().includes(query))),
      )
    }

    if (selectedCategories.length > 0 && !selectedCategories.includes("Wszystkie")) {
      result = result.filter((a) => a.category && selectedCategories.includes(a.category))
    }

    if (selectedDifficulty.length > 0) {
      result = result.filter((a) => a.difficulty && selectedDifficulty.includes(a.difficulty))
    }

    if (selectedTypes.length > 0) {
      result = result.filter((a) => a.contentType && selectedTypes.includes(a.contentType))
    }

    if (selectedTags.length > 0) {
      result = result.filter((a) => a.tags && a.tags.some((t) => selectedTags.includes(t)))
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
          return (b.viewCount || 0) - (a.viewCount || 0)
        case "rating":
          return (b.ratingAverage || 0) - (a.ratingAverage || 0)
        case "longest":
          return (b.readingTime || 0) - (a.readingTime || 0)
        case "shortest":
          return (a.readingTime || 0) - (b.readingTime || 0)
        case "alphabetical":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return result
  }, [articles, selectedCategories, selectedDifficulty, selectedTypes, selectedTags, dateRange, sortBy, searchQuery])

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
    <div className="min-h-screen bg-[#FAFAFA]" suppressHydrationWarning>
      <HeroSection
        onCategorySelect={handleCategorySelect}
        selectedCategories={selectedCategories}
        onSearch={setSearchQuery}
      />

      <FeaturedContent articles={articles} />

      <div className="container max-w-[1280px] mx-auto px-4 py-12 pb-32">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-[280px] flex-shrink-0">
            <div className="sticky top-24">
              <SidebarFilters
                articles={articles}
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
        articles={articles}
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
