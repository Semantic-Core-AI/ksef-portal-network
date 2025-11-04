"use client"

import {
  FolderOpen,
  BarChart3,
  FileText,
  Tag,
  Calendar,
  ArrowUpDown,
  RotateCcw,
  Mail,
  X,
  ChevronDown,
  BookMarked,
  Target,
  DollarSign,
  Settings,
  Scale,
  Laptop,
  Rocket,
  Newspaper,
  FileCheck,
  GraduationCap,
  BarChart,
  Video,
  ClipboardList,
  HelpCircle,
} from "lucide-react"
import type { StrapiArticle } from "@/lib/strapi"
import { useMemo } from "react"

interface SidebarFiltersProps {
  articles: StrapiArticle[]
  selectedCategories: string[]
  selectedDifficulty: string[]
  selectedTypes: string[]
  selectedTags: string[]
  dateRange: string
  sortBy: string
  onCategoryChange: (categories: string[]) => void
  onDifficultyChange: (difficulty: string[]) => void
  onTypeChange: (types: string[]) => void
  onTagChange: (tags: string[]) => void
  onDateRangeChange: (range: string) => void
  onSortChange: (sort: string) => void
  onReset: () => void
}

export function SidebarFilters({
  articles,
  selectedCategories,
  selectedDifficulty,
  selectedTypes,
  selectedTags,
  dateRange,
  sortBy,
  onCategoryChange,
  onDifficultyChange,
  onTypeChange,
  onTagChange,
  onDateRangeChange,
  onSortChange,
  onReset,
}: SidebarFiltersProps) {
  const activeFilters = [...selectedCategories, ...selectedDifficulty, ...selectedTypes, ...selectedTags]

  // Dynamically calculate categories from real articles
  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>()

    articles.forEach(article => {
      if (article.category) {
        categoryMap.set(article.category, (categoryMap.get(article.category) || 0) + 1)
      }
    })

    const iconMap: Record<string, any> = {
      "Podstawy": Target,
      "Koszty": DollarSign,
      "Wdrożenie": Settings,
      "Prawo": Scale,
      "Techniczne": Laptop,
      "Studia": Rocket,
      "Aktualności": Newspaper,
    }

    return Array.from(categoryMap.entries())
      .map(([name, count]) => ({
        name,
        count,
        icon: iconMap[name] || BookMarked
      }))
      .sort((a, b) => b.count - a.count)
  }, [articles])

  // Dynamically calculate content types from real articles
  const types = useMemo(() => {
    const typeMap = new Map<string, number>()

    articles.forEach(article => {
      if (article.contentType) {
        typeMap.set(article.contentType, (typeMap.get(article.contentType) || 0) + 1)
      }
    })

    const iconMap: Record<string, any> = {
      "Artykuł": FileCheck,
      "Przewodnik": GraduationCap,
      "Infografika": BarChart,
      "Video": Video,
      "Checklist": ClipboardList,
      "FAQ": HelpCircle,
    }

    return Array.from(typeMap.entries())
      .map(([type, count]) => ({
        type,
        count,
        icon: iconMap[type] || FileText
      }))
      .sort((a, b) => b.count - a.count)
  }, [articles])

  // Dynamically calculate popular tags from real articles
  const popularTags = useMemo(() => {
    const tagMap = new Map<string, number>()

    articles.forEach(article => {
      if (article.tags && Array.isArray(article.tags)) {
        article.tags.forEach(tag => {
          tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
        })
      }
    })

    return Array.from(tagMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag)
  }, [articles])

  // Calculate difficulty levels
  const difficultyLevels = useMemo(() => {
    const diffMap = new Map<string, number>()

    articles.forEach(article => {
      if (article.difficulty) {
        diffMap.set(article.difficulty, (diffMap.get(article.difficulty) || 0) + 1)
      }
    })

    return [
      { level: "Podstawowy", color: "bg-green-100 text-green-700", count: diffMap.get("Podstawowy") || 0 },
      { level: "Średni", color: "bg-yellow-100 text-yellow-700", count: diffMap.get("Średni") || 0 },
      { level: "Zaawansowany", color: "bg-red-100 text-red-700", count: diffMap.get("Zaawansowany") || 0 },
    ].filter(d => d.count > 0)
  }, [articles])

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      onCategoryChange(selectedCategories.filter((c) => c !== cat))
    } else {
      onCategoryChange([...selectedCategories, cat])
    }
  }

  const toggleDifficulty = (diff: string) => {
    if (selectedDifficulty.includes(diff)) {
      onDifficultyChange(selectedDifficulty.filter((d) => d !== diff))
    } else {
      onDifficultyChange([...selectedDifficulty, diff])
    }
  }

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter((t) => t !== type))
    } else {
      onTypeChange([...selectedTypes, type])
    }
  }

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagChange(selectedTags.filter((t) => t !== tag))
    } else {
      onTagChange([...selectedTags, tag])
    }
  }


  const removeFilter = (filter: string) => {
    if (selectedCategories.includes(filter)) {
      onCategoryChange(selectedCategories.filter((c) => c !== filter))
    } else if (selectedDifficulty.includes(filter)) {
      onDifficultyChange(selectedDifficulty.filter((d) => d !== filter))
    } else if (selectedTypes.includes(filter)) {
      onTypeChange(selectedTypes.filter((t) => t !== filter))
    } else if (selectedTags.includes(filter)) {
      onTagChange(selectedTags.filter((t) => t !== filter))
    }
  }

  return (
    <aside className="hidden lg:block w-[280px] sticky top-24 h-fit max-h-[calc(100vh-12rem)]">
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 space-y-8 overflow-y-auto shadow-soft max-h-[calc(100vh-14rem)]" suppressHydrationWarning>
        {/* Active Filters Summary */}
        {activeFilters.length > 0 && (
          <div className="pb-6 border-b border-[#E5E7EB]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-[#374151]">Aktywne filtry ({activeFilters.length})</span>
              <button onClick={onReset} className="text-xs text-[#2C6AA8] hover:text-[#235587] hover:underline">
                Wyczyść wszystko
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <span
                  key={filter}
                  className="inline-flex items-center gap-1 px-3 py-1 
                                             bg-[#2C6AA8]/10 text-[#2C6AA8] text-xs 
                                             font-medium rounded-full"
                >
                  {filter}
                  <X className="h-3 w-3 cursor-pointer hover:text-[#235587]" onClick={() => removeFilter(filter)} />
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div>
          <h3 className="text-sm font-serif font-bold text-[#111827] mb-4 flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            KATEGORIE
          </h3>
          <div className="space-y-2">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <label
                  key={category.name}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#FAFAFA] 
                               cursor-pointer group transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => toggleCategory(category.name)}
                    className="w-4 h-4 rounded border-[#D1D5DB] text-[#2C6AA8] 
                            focus:ring-[#2C6AA8] focus:ring-offset-0"
                  />
                  <IconComponent className="h-4 w-4 text-[#2C6AA8]" />
                  <span className="text-sm text-[#374151] group-hover:text-[#111827] flex-1">{category.name}</span>
                  <span className="text-xs text-[#9CA3AF] font-medium">{category.count}</span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Difficulty Level */}
        <div className="pt-6 border-t border-[#E5E7EB]">
          <h3 className="text-sm font-serif font-bold text-[#111827] mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            POZIOM TRUDNOŚCI
          </h3>
          <div className="space-y-2">
            {difficultyLevels.map(({ level, color, count }) => (
              <label
                key={level}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#FAFAFA]
                               cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedDifficulty.includes(level)}
                  onChange={() => toggleDifficulty(level)}
                  className="w-4 h-4 rounded border-[#D1D5DB] text-[#2C6AA8]"
                />
                <span className={`px-2 py-1 rounded text-xs font-medium ${color} flex-1`}>{level}</span>
                <span className="text-xs text-[#9CA3AF] font-medium">{count}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Content Type */}
        <div className="pt-6 border-t border-[#E5E7EB]">
          <h3 className="text-sm font-serif font-bold text-[#111827] mb-4 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            TYP TREŚCI
          </h3>
          <div className="space-y-2">
            {types.map(({ type, count, icon }) => {
              const IconComponent = icon
              return (
                <label
                  key={type}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#FAFAFA] 
                               cursor-pointer group transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                    className="w-4 h-4 rounded border-[#D1D5DB] text-[#2C6AA8]"
                  />
                  <IconComponent className="h-4 w-4 text-[#2C6AA8]" />
                  <span className="text-sm text-[#374151] group-hover:text-[#111827] flex-1">{type}</span>
                  <span className="text-xs text-[#9CA3AF] font-medium">{count}</span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Popular Tags */}
        <div className="pt-6 border-t border-[#E5E7EB]">
          <h3 className="text-sm font-serif font-bold text-[#111827] mb-4 flex items-center gap-2">
            <Tag className="h-4 w-4" />
            POPULARNE TAGI
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors
                  ${
                    selectedTags.includes(tag)
                      ? "bg-[#2C6AA8] text-white"
                      : "bg-[#F5F5F5] hover:bg-[#2C6AA8] hover:text-white text-[#374151]"
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {popularTags.length === 0 && (
            <p className="text-sm text-[#9CA3AF] italic">Brak tagów w artykułach</p>
          )}
        </div>

        {/* Date Range */}
        <div className="pt-6 border-t border-[#E5E7EB]">
          <h3 className="text-sm font-serif font-bold text-[#111827] mb-4 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            DATA PUBLIKACJI
          </h3>
          <div className="space-y-2">
            {["week", "month", "quarter", "year", "all"].map((range) => (
              <label
                key={range}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#FAFAFA] 
                               cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="dateRange"
                  checked={dateRange === range}
                  onChange={() => onDateRangeChange(range)}
                  className="w-4 h-4 border-[#D1D5DB] text-[#2C6AA8]"
                />
                <span className="text-sm text-[#374151]">
                  {range === "week" && "Ostatnie 7 dni"}
                  {range === "month" && "Ostatni miesiąc"}
                  {range === "quarter" && "Ostatnie 3 miesiące"}
                  {range === "year" && "Ostatni rok"}
                  {range === "all" && "Dowolna data"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="pt-6 border-t border-[#E5E7EB]">
          <h3 className="text-sm font-serif font-bold text-[#111827] mb-4 flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            SORTUJ WEDŁUG
          </h3>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-[#E5E7EB] rounded-lg 
                      focus:border-[#2C6AA8] focus:ring-2 focus:ring-[#2C6AA8]/20 outline-none"
          >
            <option value="newest">Najnowsze</option>
            <option value="popular">Najpopularniejsze</option>
            <option value="rating">Najwyżej oceniane</option>
            <option value="longest">Najdłuższe</option>
            <option value="shortest">Najkrótsze</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>

        {/* Quick Actions */}
        <div className="pt-6 border-t border-[#E5E7EB] space-y-3">
          <button
            onClick={onReset}
            className="w-full px-4 py-2 text-sm font-medium text-[#374151] 
                      bg-[#F5F5F5] hover:bg-[#E5E7EB] rounded-lg transition-colors 
                      flex items-center justify-center gap-2 shadow-soft hover:shadow-medium"
          >
            <RotateCcw className="h-4 w-4" />
            Resetuj filtry
          </button>
          <button
            className="w-full px-4 py-2 text-sm font-medium text-white 
                          bg-[#2C6AA8] hover:bg-[#235587] rounded-lg 
                          transition-colors flex items-center justify-center gap-2
                          shadow-soft hover:shadow-medium"
          >
            <Mail className="h-4 w-4" />
            Zapisz się na newsletter
          </button>
        </div>
      </div>
    </aside>
  )
}
