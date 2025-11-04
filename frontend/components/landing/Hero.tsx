"use client"

import { AlertTriangle, ArrowRight, CheckCircle2, Calendar, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Countdown } from "@/components/landing/Countdown"
import Link from "next/link"

export function Hero() {
  const trustBadges = [
    "Zero błędów w rozliczeniach - gwarancja zgodności",
    "Odpowiedzi ekspertów w <24h",
    "Bezpieczeństwo prawne - wszystkie dokumenty zatwierdzone",
    "Nowe przepisy? Wiesz pierwszy - alert email",
  ]

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0A1628] via-[#0F1B3A] to-[#1E2A5E] overflow-hidden">
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

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 w-full">
        <div className="grid lg:grid-cols-[58%_42%] gap-12 lg:gap-16 items-center">
          {/* LEFT SIDE: Text Content */}
          <div className="space-y-8">
            {/* Eyebrow Badge */}
            <div className="inline-flex animate-fade-in-up [animation-delay:0ms]">
              <div className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 px-4 py-2 rounded-full">
                <AlertTriangle className="w-4 h-4 text-orange-300" />
                <span className="text-sm font-semibold text-orange-200 uppercase tracking-wide">
                  Obowiązkowe od 1 lutego 2026
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] animate-fade-in-up [animation-delay:150ms]">
              Wdróż KSeF bez <span className="text-[#C7A83B]">ryzyka i kar</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl animate-fade-in-up [animation-delay:300ms]">
              Kompleksowy przewodnik przygotowany przez{" "}
              <span className="font-semibold text-white">certyfikowanych ekspertów</span> dla{" "}
              <span className="font-semibold text-white">3,1 miliona polskich firm</span>, które muszą się dostosować do nowych przepisów.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up [animation-delay:450ms]">
              <Button
                size="lg"
                className="text-base md:text-lg bg-[#C7A83B] text-[#1E2A5E] hover:bg-[#C7A83B]/90 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl transition-all font-bold"
              >
                Sprawdź gotowość firmy
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Link href="/mapa-wiedzy">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base md:text-lg border-blue-400/40 bg-blue-500/10 text-blue-100 hover:bg-blue-500 hover:text-white hover:border-blue-500 shadow-lg transition-all w-full"
                >
                  <Network className="w-5 h-5" />
                  Mapa Wiedzy
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="text-base md:text-lg border-white/30 text-white hover:bg-white hover:text-[#1E2A5E] shadow-lg bg-transparent transition-all"
              >
                <Calendar className="w-5 h-5" />
                Umów konsultację
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 animate-fade-in-up [animation-delay:600ms]">
              <div className="grid sm:grid-cols-2 gap-4">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="flex items-start gap-3 text-white/90">
                    <div className="flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-[#C7A83B]" />
                    </div>
                    <span className="text-sm md:text-base leading-snug">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Countdown Widget */}
          <div className="flex justify-center lg:justify-end animate-fade-in-scale [animation-delay:750ms]">
            <Countdown />
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/10 to-transparent" />
    </section>
  )
}
