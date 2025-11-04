"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, Zap } from "lucide-react"

interface VolumeOption {
  value: number
  label: string
  description: string
}

interface Question2InvoiceVolumeProps {
  selectedVolume: VolumeOption | null
  onCalculate: (volume: VolumeOption) => void
  onBack: () => void
}

const volumeOptions: VolumeOption[] = [
  {
    value: 50,
    label: "< 50 faktur/miesiąc",
    description: "Niska częstotliwość",
  },
  {
    value: 200,
    label: "50 - 200 faktur/miesiąc",
    description: "Średnia częstotliwość",
  },
  {
    value: 500,
    label: "200 - 500 faktur/miesiąc",
    description: "Wysoka częstotliwość",
  },
  {
    value: 1000,
    label: "500 - 1000 faktur/miesiąc",
    description: "Bardzo wysoka częstotliwość",
  },
  {
    value: 2000,
    label: "> 1000 faktur/miesiąc",
    description: "Ekstremalnie wysoka częstotliwość",
  },
]

export function Question2InvoiceVolume({ selectedVolume, onCalculate, onBack }: Question2InvoiceVolumeProps) {
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
              Powrót do kroku 1 (Przychody)
            </button>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-primary">KROK 2/2</span>
              <span className="text-sm text-muted-foreground">Wolumen faktur</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "50%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#1E2A5E] to-[#C7A83B]"
              />
            </div>
          </div>

          {/* Question */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-black mb-4">Ile faktur wystawiacie miesięcznie?</h2>
            <p className="text-xl text-muted-foreground">Uwzględnij faktury sprzedażowe i zakupowe</p>
          </motion.div>

          {/* Options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 mb-12"
          >
            {volumeOptions.map((option, index) => (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => onCalculate(option)}
                className={`w-full group relative p-6 rounded-2xl border-2 transition-all text-left ${
                  selectedVolume?.value === option.value
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-border bg-card hover:border-primary/50 hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold mb-1">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Loading indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              Kliknij aby obliczyć Twoje potencjalne straty
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
