"use client"

import { Button } from "@/components/ui/button"
import { Network } from "lucide-react"
import Link from "next/link"

export function KeyFeatures() {
  return (
    <section className="relative bg-gradient-to-br from-[#0A1628] via-[#0F1B3A] to-[#1E2A5E] py-20 md:py-32 px-6 overflow-hidden">
      {/* Background Pattern - Diagonal Stripes */}
      <div className="absolute inset-0 opacity-[0.15]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 15px,
              rgba(255,255,255,0.08) 15px,
              rgba(255,255,255,0.08) 30px
            )`,
          }}
        />
      </div>

      {/* Gradient Overlay (top fade) */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Witaj w KSEF.EXPERT
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Twój kompleksowy przewodnik wdrożenia Krajowego Systemu e-Faktur
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="text-base md:text-lg bg-[#C7A83B] text-[#1E2A5E] hover:bg-[#C7A83B]/90 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl transition-all font-bold px-8 py-6"
          >
            Rozpocznij quiz gotowości
          </Button>

          <Link href="/mapa-wiedzy">
            <Button
              variant="outline"
              size="lg"
              className="text-base md:text-lg border-2 border-blue-400/40 bg-blue-500/20 text-blue-100 hover:bg-blue-500 hover:text-white hover:border-blue-400 shadow-lg backdrop-blur-sm transition-all px-8 py-6"
            >
              <Network className="w-5 h-5" />
              Odkryj Mapę Wiedzy
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            className="text-base md:text-lg border-2 border-white/30 text-white hover:bg-white hover:text-[#1E2A5E] shadow-lg bg-white/10 backdrop-blur-sm transition-all px-8 py-6"
          >
            Przeglądaj bazę wiedzy
          </Button>
        </div>
      </div>
    </section>
  )
}
