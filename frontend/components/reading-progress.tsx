"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

interface ReadingProgressProps {
  readingTime: number // in minutes
}

export function ReadingProgress({ readingTime }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(readingTime)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const scrollProgress = (scrolled / documentHeight) * 100

      setProgress(Math.min(scrollProgress, 100))

      // Calculate time remaining based on scroll progress
      const remaining = Math.ceil(readingTime * (1 - scrollProgress / 100))
      setTimeRemaining(Math.max(remaining, 0))
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll)
  }, [readingTime])

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#E5E7EB] z-50">
        <div
          className="h-full bg-gradient-to-r from-[#1E2A5E] via-[#2C6AA8] to-[#C7A83B] transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Time Remaining Indicator */}
      {progress > 5 && progress < 95 && (
        <div
          className="fixed bottom-6 left-6 px-4 py-2 bg-white border border-[#E5E7EB] 
                      rounded-full shadow-strong flex items-center gap-2 z-40
                      animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <Clock className="h-4 w-4 text-[#2C6AA8]" />
          <span className="text-sm font-medium text-[#111827]">{timeRemaining} min pozostało</span>
        </div>
      )}
    </>
  )
}
