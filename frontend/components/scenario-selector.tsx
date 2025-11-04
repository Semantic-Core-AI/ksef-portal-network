"use client"

import { motion } from "framer-motion"
import { CheckCircle2, TrendingDown, TrendingUp, Target } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Scenario } from "@/lib/calculator-logic"
import { getScenarioInfo } from "@/lib/calculator-logic"

interface ScenarioSelectorProps {
  selectedScenario: Scenario
  onSelect: (scenario: Scenario) => void
  className?: string
}

const scenarioIcons = {
  conservative: TrendingDown,
  realistic: Target,
  optimistic: TrendingUp,
}

const scenarioColors = {
  conservative: {
    bg: "from-blue-500/10 to-blue-600/10",
    border: "border-blue-500/30 hover:border-blue-500/50",
    selectedBorder: "border-blue-500",
    icon: "text-blue-500",
    badge: "bg-blue-500/20 text-blue-700",
  },
  realistic: {
    bg: "from-primary/10 to-primary/20",
    border: "border-primary/30 hover:border-primary/50",
    selectedBorder: "border-primary",
    icon: "text-primary",
    badge: "bg-primary/20 text-primary",
  },
  optimistic: {
    bg: "from-success/10 to-success/20",
    border: "border-success/30 hover:border-success/50",
    selectedBorder: "border-success",
    icon: "text-success",
    badge: "bg-success/20 text-success",
  },
}

export function ScenarioSelector({ selectedScenario, onSelect, className }: ScenarioSelectorProps) {
  const scenarios: Scenario[] = ['conservative', 'realistic', 'optimistic']

  return (
    <div className={cn("space-y-4", className)}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Wybierz scenariusz kalkulacji</h3>
        <p className="text-sm text-muted-foreground">
          Dostosuj założenia do swojego podejścia biznesowego
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {scenarios.map((scenario) => {
          const info = getScenarioInfo(scenario)
          const Icon = scenarioIcons[scenario]
          const colors = scenarioColors[scenario]
          const isSelected = selectedScenario === scenario

          return (
            <motion.button
              key={scenario}
              onClick={() => onSelect(scenario)}
              className={cn(
                "relative p-6 rounded-2xl border-2 transition-all duration-300",
                "bg-gradient-to-br",
                colors.bg,
                isSelected ? colors.selectedBorder : colors.border,
                "hover:shadow-lg hover:scale-[1.02]",
                "text-left"
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Selected indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                </motion.div>
              )}

              {/* Icon */}
              <div className={cn("mb-4 flex items-center gap-3")}>
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", colors.badge)}>
                  <Icon className={cn("w-6 h-6", colors.icon)} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{info.name}</h4>
                  <span
                    className={cn(
                      "inline-block px-2 py-0.5 rounded-full text-xs font-semibold mt-1",
                      scenario === 'realistic' ? 'bg-accent/20 text-accent-foreground' : 'opacity-70'
                    )}
                  >
                    {scenario === 'realistic' ? 'Zalecany' : ''}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4">{info.description}</p>

              {/* Key metrics preview */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Czas/fakturę:</span>
                  <span className="font-semibold">{Math.round(info.hoursPerInvoice * 60)} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stawka h:</span>
                  <span className="font-semibold">{info.hourlyRate} PLN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ryzyko kar:</span>
                  <span className="font-semibold">{Math.round(info.fineFrequency * 100)}%</span>
                </div>
              </div>

              {/* Selection indicator */}
              <div
                className={cn(
                  "mt-4 pt-4 border-t transition-opacity",
                  isSelected ? "opacity-100 border-current" : "opacity-30 border-muted"
                )}
              >
                <span className="text-xs font-semibold">
                  {isSelected ? '✓ Wybrany' : 'Kliknij aby wybrać'}
                </span>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Info box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-4 bg-muted/50 rounded-xl border border-muted-foreground/20"
      >
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg">ℹ️</span>
            </div>
          </div>
          <div className="text-sm">
            <p className="font-semibold mb-1">Jak wybrać scenariusz?</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <strong>Konserwatywny:</strong> dla prezentacji zarządowi lub inwestorom
              </li>
              <li>
                <strong>Realistyczny:</strong> średnie wartości z rynku (zalecany)
              </li>
              <li>
                <strong>Optymistyczny:</strong> dla firm z dużymi problemami księgowymi
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Compact version dla inline selection
export function ScenarioSelectorCompact({ selectedScenario, onSelect }: ScenarioSelectorProps) {
  const scenarios: Scenario[] = ['conservative', 'realistic', 'optimistic']

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-semibold text-muted-foreground mr-2">Scenariusz:</span>
      {scenarios.map((scenario) => {
        const info = getScenarioInfo(scenario)
        const isSelected = selectedScenario === scenario

        return (
          <button
            key={scenario}
            onClick={() => onSelect(scenario)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold transition-all",
              isSelected
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {info.name}
          </button>
        )
      })}
    </div>
  )
}
