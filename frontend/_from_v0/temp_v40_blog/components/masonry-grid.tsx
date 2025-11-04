"use client"

import type { Article } from "@/lib/types"
import { ArticleCard } from "./article-card"
import { getCardVariant } from "@/lib/helpers"
import { Grid3x3, List, Search, Loader2 } from "lucide-react"
import { useState } from "react"

interface MasonryGridProps {
  articles: Article[]
  activeFiltersCount: number
  totalCount: number
  onLoadMore: () => void
  hasMore: boolean
}

export function MasonryGrid({ articles, activeFiltersCount, totalCount, onLoadMore, hasMore }: MasonryGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadMore = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    onLoadMore()
    setIsLoading(false)
  }

  if (articles.length === 0) {
    return (
      <div className="flex-1">
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F5F5F5] rounded-full mb-4">
            <Search className="h-8 w-8 text-[#9CA3AF]" />
          </div>
          <h3 className="text-xl font-bold text-[#111827] mb-2">Nie znaleziono artykułów</h3>
          <p className="text-[#6B7280] mb-6">Spróbuj zmienić filtry lub wyszukać inne frazy</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 min-w-0">
      {/* Results Count + View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-[#6B7280]">
          Wyświetlono <span className="font-bold text-[#111827]">{articles.length}</span> z{" "}
          <span className="font-bold text-[#111827]">{totalCount}</span> artykułów
          {activeFiltersCount > 0 && (
            <span>
              {" "}
              • <span className="font-medium">{activeFiltersCount} filtr(ów)</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "grid" ? "bg-[#2C6AA8] text-white" : "hover:bg-[#F5F5F5] text-[#6B7280]"
            }`}
            title="Widok siatki"
          >
            <Grid3x3 className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "list" ? "bg-[#2C6AA8] text-white" : "hover:bg-[#F5F5F5] text-[#6B7280]"
            }`}
            title="Widok listy"
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {articles.map((article, index) => {
            const variant = getCardVariant(index)
            return <ArticleCard key={article.id} article={article} variant={variant} />
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="short" listView />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="px-8 py-3 bg-white border-2 border-[#E5E7EB] 
                        text-[#374151] font-semibold rounded-xl 
                        hover:border-[#2C6AA8] hover:text-[#2C6AA8] 
                        transition-colors flex items-center gap-2
                        disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Ładowanie...
              </>
            ) : (
              <>Załaduj więcej artykułów</>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
