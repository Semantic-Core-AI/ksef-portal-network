"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { SidebarFilters } from "./sidebar-filters"

interface MobileFilterDrawerProps {
  isOpen: boolean
  onClose: () => void
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

export function MobileFilterDrawer({
  isOpen,
  onClose,
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
}: MobileFilterDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-full sm:w-[400px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl text-[#1E2A5E]">Filtry</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <SidebarFilters
            selectedCategories={selectedCategories}
            selectedDifficulty={selectedDifficulty}
            selectedTypes={selectedTypes}
            selectedTags={selectedTags}
            dateRange={dateRange}
            sortBy={sortBy}
            onCategoryChange={onCategoryChange}
            onDifficultyChange={onDifficultyChange}
            onTypeChange={onTypeChange}
            onTagChange={onTagChange}
            onDateRangeChange={onDateRangeChange}
            onSortChange={onSortChange}
            onReset={onReset}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
