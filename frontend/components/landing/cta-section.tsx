"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-[#0A1628] via-[#0F1B3A] to-[#1E2A5E] overflow-hidden">
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

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div className="inline-block mb-6">
          <span className="text-sm font-semibold text-white/80 uppercase tracking-[0.2em]">
            KRAJOWY SYSTEM E-FAKTUR
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Wszystko o KSeF<br />w jednym miejscu
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
          Kompleksowa baza wiedzy, interpretacji prawnych i narzędzi dla księgowych i przedsiębiorców przygotowujących się na obowiązkowy KSeF
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="text-base md:text-lg bg-[#C7A83B] text-[#1E2A5E] hover:bg-[#C7A83B]/90 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl transition-all font-bold px-8 py-6"
          >
            Rozpocznij za darmo
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="text-base md:text-lg border-2 border-white/30 text-white hover:bg-white hover:text-[#1E2A5E] shadow-lg bg-transparent transition-all px-8 py-6"
          >
            <Play className="w-5 h-5 mr-2" />
            Zobacz demo
          </Button>
        </div>
      </div>
    </section>
  )
}
