"use client"

import { motion } from "framer-motion"
import { TrendingDown, Target, TrendingUp, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { compareScenarios, formatCurrency, type Scenario } from "@/lib/calculator-logic"
import { cn } from "@/lib/utils"

interface ScenarioComparisonProps {
  revenue: number
  invoiceVolume: number
  currentScenario: Scenario
  onScenarioChange?: (scenario: Scenario) => void
}

const scenarioConfig = {
  conservative: {
    icon: TrendingDown,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    label: "Konserwatywny",
  },
  realistic: {
    icon: Target,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    label: "Realistyczny",
  },
  optimistic: {
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
    label: "Optymistyczny",
  },
}

export function ScenarioComparison({
  revenue,
  invoiceVolume,
  currentScenario,
  onScenarioChange,
}: ScenarioComparisonProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const scenarios = compareScenarios(revenue, invoiceVolume)

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Porównanie scenariuszy</CardTitle>
            <CardDescription>Zobacz jak różne założenia wpływają na wyniki</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span className="ml-2">{isExpanded ? "Zwiń" : "Rozwiń"}</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Quick comparison */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {(Object.keys(scenarios) as Scenario[]).map((scenario) => {
            const result = scenarios[scenario]
            const config = scenarioConfig[scenario]
            const Icon = config.icon
            const isCurrent = scenario === currentScenario

            return (
              <motion.button
                key={scenario}
                onClick={() => onScenarioChange?.(scenario)}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all text-left",
                  config.borderColor,
                  config.bgColor,
                  isCurrent && "ring-2 ring-offset-2 ring-primary"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={cn("w-5 h-5", config.color)} />
                  <span className="font-semibold text-sm">{config.label}</span>
                  {isCurrent && (
                    <span className="ml-auto text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      Aktywny
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold">{formatCurrency(result.totalLosses)}</div>
                  <div className="text-xs text-muted-foreground">Straty roczne</div>
                </div>
                <div className="mt-2 pt-2 border-t border-current/20">
                  <div className="text-sm font-semibold text-success">
                    ROI: {Math.round(result.roiPercentage)}%
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Detailed comparison - expandable */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Metryka</th>
                    <th className="text-right p-3 font-semibold">Konserwatywny</th>
                    <th className="text-right p-3 font-semibold">Realistyczny</th>
                    <th className="text-right p-3 font-semibold">Optymistyczny</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <ComparisonRow
                    label="Kary i sankcje"
                    values={[scenarios.conservative.fines, scenarios.realistic.fines, scenarios.optimistic.fines]}
                  />
                  <ComparisonRow
                    label="Stracony czas"
                    values={[
                      scenarios.conservative.timeWasted,
                      scenarios.realistic.timeWasted,
                      scenarios.optimistic.timeWasted,
                    ]}
                  />
                  <ComparisonRow
                    label="Opóźnienia VAT"
                    values={[
                      scenarios.conservative.vatDelays,
                      scenarios.realistic.vatDelays,
                      scenarios.optimistic.vatDelays,
                    ]}
                  />
                  <ComparisonRow
                    label="Koszt alternatywny"
                    values={[
                      scenarios.conservative.opportunityCost,
                      scenarios.realistic.opportunityCost,
                      scenarios.optimistic.opportunityCost,
                    ]}
                  />
                  <ComparisonRow
                    label="Koszty księgowe"
                    values={[
                      scenarios.conservative.accountingCost,
                      scenarios.realistic.accountingCost,
                      scenarios.optimistic.accountingCost,
                    ]}
                  />
                  <ComparisonRow
                    label="CAŁKOWITE STRATY"
                    values={[
                      scenarios.conservative.totalLosses,
                      scenarios.realistic.totalLosses,
                      scenarios.optimistic.totalLosses,
                    ]}
                    highlight
                  />
                  <ComparisonRow
                    label="Koszt wdrożenia"
                    values={[
                      scenarios.conservative.implementationCost,
                      scenarios.realistic.implementationCost,
                      scenarios.optimistic.implementationCost,
                    ]}
                  />
                  <ComparisonRow
                    label="Oszczędności roczne"
                    values={[
                      scenarios.conservative.savings,
                      scenarios.realistic.savings,
                      scenarios.optimistic.savings,
                    ]}
                    highlight
                    positive
                  />
                  <ComparisonRow
                    label="ROI"
                    values={[
                      scenarios.conservative.roiPercentage,
                      scenarios.realistic.roiPercentage,
                      scenarios.optimistic.roiPercentage,
                    ]}
                    isPercentage
                    positive
                  />
                </tbody>
              </table>
            </div>

            {/* Methodology note */}
            <div className="mt-4 p-4 bg-muted/30 rounded-lg text-xs text-muted-foreground">
              <p className="font-semibold mb-2">Różnice w scenariuszach:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>
                  <strong>Konserwatywny:</strong> 6 min/fakturę, 100 PLN/h, 30% ryzyko kar
                </li>
                <li>
                  <strong>Realistyczny:</strong> 9 min/fakturę, 120 PLN/h, 50% ryzyko kar (zalecany)
                </li>
                <li>
                  <strong>Optymistyczny:</strong> 12 min/fakturę, 140 PLN/h, 70% ryzyko kar
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

interface ComparisonRowProps {
  label: string
  values: [number, number, number]
  highlight?: boolean
  positive?: boolean
  isPercentage?: boolean
}

function ComparisonRow({ label, values, highlight, positive, isPercentage }: ComparisonRowProps) {
  const formatValue = (value: number) => {
    if (isPercentage) {
      return `${Math.round(value)}%`
    }
    return formatCurrency(value)
  }

  return (
    <tr className={highlight ? "bg-muted/30 font-semibold" : ""}>
      <td className="p-3">{label}</td>
      {values.map((value, index) => (
        <td
          key={index}
          className={cn(
            "p-3 text-right tabular-nums",
            positive && "text-success",
            highlight && "font-bold"
          )}
        >
          {formatValue(value)}
        </td>
      ))}
    </tr>
  )
}
