"use client"

import { useState, useEffect } from "react"
import { Clock, AlertCircle } from "lucide-react"

interface TimeLeft {
  days: number
  weeks: number
  months: number
  hours: number
  percentElapsed: number
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    weeks: 0,
    months: 0,
    hours: 0,
    percentElapsed: 0,
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const calculateTimeLeft = () => {
      // KSeF deadline: February 1, 2026, 00:00:01 CET
      const deadline = new Date("2026-02-01T00:00:01+01:00")
      const now = new Date()
      const diff = deadline.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          weeks: 0,
          months: 0,
          hours: 0,
          percentElapsed: 100,
        })
        return
      }

      // Calculate time components
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const weeks = Math.floor(days / 7)
      const months = Math.floor(days / 30.44) // Average month length

      // Calculate percentage elapsed
      // Start date: October 26, 2024 (when project starts)
      const start = new Date("2024-10-26T00:00:00+02:00")
      const total = deadline.getTime() - start.getTime()
      const elapsed = now.getTime() - start.getTime()
      const percentElapsed = Math.min(100, Math.max(0, (elapsed / total) * 100))

      setTimeLeft({
        days,
        weeks,
        months,
        hours,
        percentElapsed,
      })
    }

    // Calculate immediately
    calculateTimeLeft()

    // Update every second
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="bg-white rounded-xl p-10 shadow-2xl max-w-md animate-pulse">
        <div className="h-96" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-8 md:p-10 shadow-2xl max-w-md w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center">
          <Clock className="w-5 h-5 text-navy" />
        </div>
        <div>
          <p className="text-sm font-semibold text-navy">Pozostało do wdrożenia KSeF</p>
        </div>
      </div>

      {/* Main Countdown Number */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <div className="text-7xl md:text-8xl font-bold text-gold font-mono tabular-nums leading-none">
            {timeLeft.days}
          </div>
          <div className="absolute -right-2 -top-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        </div>
        <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground mt-3 font-semibold">DNI</div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-200">
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-navy font-mono tabular-nums">{timeLeft.weeks}</div>
          <div className="text-xs uppercase text-muted-foreground mt-1 tracking-wide">tygodni</div>
        </div>

        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-navy font-mono tabular-nums">{timeLeft.months}</div>
          <div className="text-xs uppercase text-muted-foreground mt-1 tracking-wide">miesięcy</div>
        </div>

        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-navy font-mono tabular-nums">
            {timeLeft.hours.toLocaleString("pl-PL")}
          </div>
          <div className="text-xs uppercase text-muted-foreground mt-1 tracking-wide">godzin</div>
        </div>
      </div>

      {/* Progress Ring */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-32 h-32">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90">
            <circle cx="64" cy="64" r="56" stroke="#E5E7EB" strokeWidth="8" fill="none" />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#C7A83B"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - timeLeft.percentElapsed / 100)}`}
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl font-bold text-navy font-mono">{Math.round(timeLeft.percentElapsed)}%</div>
              <div className="text-xs text-muted-foreground">czasu</div>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-3">{Math.round(100 - timeLeft.percentElapsed)}% pozostało</p>
      </div>

      {/* Status Badge */}
      <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5 text-orange-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-orange-900 mb-1">Wymaga natychmiastowej akcji</p>
            <p className="text-xs text-orange-700 leading-relaxed">
              Tylko <span className="font-bold">{timeLeft.days} dni</span> do obowiązkowego wdrożenia. Sprawdź gotowość
              swojej firmy już teraz.
            </p>
          </div>
        </div>
      </div>

      {/* Deadline Date */}
      <div className="mt-6 pt-6 border-t border-gray-200 text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Data wdrożenia</p>
        <p className="text-sm font-bold text-navy">1 lutego 2026, 00:00:01 CET</p>
      </div>
    </div>
  )
}
