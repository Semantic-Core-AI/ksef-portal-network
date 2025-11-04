"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface RevenueOption {
  value: number
  label: string
  description: string
}

interface Question1RevenueProps {
  selectedRevenue: RevenueOption | null
  onNext: (revenue: RevenueOption) => void
  onBack: () => void
}

const revenueOptions: RevenueOption[] = [
  {
    value: 500000,
    label: "< 500k PLN",
    description: "Mikrofirma",
  },
  {
    value: 2000000,
    label: "500k - 2M PLN",
    description: "Mała firma",
  },
  {
    value: 10000000,
    label: "2M - 10M PLN",
    description: "Średnia firma",
  },
  {
    value: 50000000,
    label: "10M - 50M PLN",
    description: "Duża firma",
  },
  {
    value: 100000000,
    label: "50M - 100M PLN",
    description: "Bardzo duża firma",
  },
  {
    value: 200000000,
    label: "> 100M PLN",
    description: "Korporacja",
  },
]

const getColorForIndex = (index: number) => {
  const colors = [
    "from-success to-success/80", // Green for smallest
    "from-primary to-primary/80", // Navy for small
    "from-accent to-accent/80", // Gold for medium
    "from-warning to-warning/80", // Orange for large
    "from-destructive/70 to-destructive", // Red-orange for very large
    "from-destructive to-destructive/90", // Red for largest
  ]
  return colors[index] || colors[0]
}

export function Question1Revenue({ selectedRevenue, onNext, onBack }: Question1RevenueProps) {
  const [sliderValue, setSliderValue] = useState([2]) // Default to middle option (index 2)
  const currentIndex = sliderValue[0]
  const currentOption = revenueOptions[currentIndex]

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value)
  }

  const handleConfirm = () => {
    onNext(currentOption)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Progress */}
          <div className="mb-12">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Powrót do strony głównej
            </button>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-primary">KROK 1/2</span>
              <span className="text-sm text-muted-foreground">Twoja firma</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "50%" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#1E2A5E] to-[#C7A83B]"
              />
            </div>
          </div>

          {/* Question */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-black mb-4">Jakie są Twoje roczne przychody?</h2>
            <p className="text-xl text-muted-foreground">Przesuń suwak aby wybrać przedział</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-card rounded-3xl p-12 border-2 border-border shadow-xl">
              {/* Current selection display */}
              <motion.div
                key={currentIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.4 }}
                className={`bg-gradient-to-r ${getColorForIndex(currentIndex)} text-white rounded-2xl p-8 mb-8 text-center`}
              >
                <div className="text-sm font-semibold mb-2 opacity-90">{currentOption.description}</div>
                <div className="text-5xl font-black mb-2">{currentOption.label}</div>
                <div className="text-lg opacity-90">Roczne przychody</div>
              </motion.div>

              {/* Visual slider */}
              <div className="px-4 mb-8">
                <Slider
                  value={sliderValue}
                  onValueChange={handleSliderChange}
                  min={0}
                  max={revenueOptions.length - 1}
                  step={1}
                  className="w-full"
                />

                {/* Tier labels */}
                <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                  <span>Mikro</span>
                  <span>Mała</span>
                  <span>Średnia</span>
                  <span>Duża</span>
                  <span>B. duża</span>
                  <span>Korporacja</span>
                </div>
              </div>

              {/* Color gradient visualization */}
              <div className="h-4 rounded-full overflow-hidden mb-8 relative">
                <div className="absolute inset-0 flex">
                  {revenueOptions.map((_, index) => (
                    <div
                      key={index}
                      className={`flex-1 bg-gradient-to-r ${getColorForIndex(index)} transition-opacity ${
                        currentIndex === index ? "opacity-100" : "opacity-30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Confirm button */}
              <Button
                onClick={handleConfirm}
                size="lg"
                className="w-full bg-[#C7A83B] hover:bg-[#C7A83B]/90 text-[#1E2A5E] font-bold text-lg py-6 shimmer"
              >
                <span className="flex items-center justify-center gap-3">
                  Dalej
                  <ArrowRight className="w-6 h-6" />
                </span>
              </Button>
            </div>
          </motion.div>

          {/* Alternative: Quick select cards */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-8">
            <p className="text-center text-sm text-muted-foreground mb-4">Lub wybierz szybko:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {revenueOptions.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSliderValue([index])
                    setTimeout(() => onNext(option), 300)
                  }}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    currentIndex === index
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="text-sm font-bold mb-1">{option.label}</div>
                  <div className="text-xs text-muted-foreground">{option.description}</div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" />
              Twoje dane są bezpieczne i nie są nigdzie zapisywane
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
