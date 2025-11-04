"use client"

import { motion } from "framer-motion"
import { AlertTriangle, ArrowRight, ArrowLeft, Clock, TrendingDown, AlertCircle, Info, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/calculator-logic"
import type { CalculatorResults } from "@/lib/calculator-logic"
import { UrgencyBanner } from "@/components/urgency-banner"
import CountUp from "react-countup"

interface Phase2DisasterProps {
  revenue: { value: number; label: string }
  volume: { value: number; label: string }
  results: CalculatorResults
  onNext: () => void
  onBack: () => void
}

export function Phase2Disaster({ revenue, volume, results, onNext, onBack }: Phase2DisasterProps) {
  const dailyLoss = Math.round(results.totalLosses / 365)

  const finesBreakdown = {
    invoiceFines: Math.round(results.fines * 0.6),
    vatFines: Math.round(results.fines * 0.3),
    auditRisk: Math.round(results.fines * 0.1),
  }

  const timeBreakdown = {
    manualInvoicing: Math.round(results.timeWasted * 0.5),
    archiving: Math.round(results.timeWasted * 0.25),
    errorCorrection: Math.round(results.timeWasted * 0.25),
    hoursWasted: Math.round((results.timeWasted / 50) * 12), // Assuming 50 PLN/hour
  }

  const vatComparison = {
    withoutKSeF: 60, // days
    withKSeF: 40, // days
    savingsDays: 20,
  }

  const opportunityBreakdown = {
    slowProcesses: Math.round(results.opportunityCost * 0.6),
    noAutomation: Math.round(results.opportunityCost * 0.4),
    efficiencyLoss: 35, // percentage
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-destructive/10 via-background to-destructive/5 relative overflow-hidden">
      <div className="relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Powrót do kroku 2 (Wolumen faktur)
            </button>
          </div>

          {/* Warning header */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground rounded-3xl p-12 mb-8 shadow-2xl text-center relative overflow-hidden diagonal-stripes"
          >
            <div className="relative z-10">
              <div className="text-7xl mb-6">
                <AlertTriangle className="w-20 h-20 text-destructive-foreground mx-auto" />
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-5xl font-black mb-6">SCENARIUSZ KATASTROFY</h2>
              <p className="text-2xl opacity-90 mb-8">Jeśli nie wdrożysz KSeF na czas, Twoja firma może stracić:</p>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="bg-white/20 backdrop-blur rounded-2xl p-8 inline-block"
              >
                <div className="font-mono text-7xl font-black">
                  <CountUp end={results.totalLosses} duration={2} separator=" " suffix=" PLN" />
                </div>
                <div className="text-lg mt-2 opacity-90">rocznie</div>
              </motion.div>
            </div>
          </motion.div>

          <UrgencyBanner dailyLoss={dailyLoss} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold text-center mb-8">Szczegółowa analiza strat</h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Card 1: Fines and Penalties */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-card rounded-2xl p-6 border-2 border-destructive/30 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">Kary i sankcje</h4>
                    <p className="text-sm text-muted-foreground">Mandaty za brak zgodności</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center p-3 bg-destructive/5 rounded-lg">
                    <span className="text-sm">Kary za faktury</span>
                    <span className="font-bold text-destructive">
                      <CountUp end={finesBreakdown.invoiceFines} duration={1.5} separator=" " suffix=" PLN" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-destructive/5 rounded-lg">
                    <span className="text-sm">Kary VAT</span>
                    <span className="font-bold text-destructive">
                      <CountUp end={finesBreakdown.vatFines} duration={1.5} separator=" " suffix=" PLN" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-destructive/5 rounded-lg">
                    <span className="text-sm">Ryzyko audytu</span>
                    <span className="font-bold text-destructive">
                      <CountUp end={finesBreakdown.auditRisk} duration={1.5} separator=" " suffix=" PLN" />
                    </span>
                  </div>
                </div>

                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <strong>UWAGA:</strong> Kary mogą wynosić do 500 PLN za każdą nieprawidłową fakturę!
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-destructive/20 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">RAZEM:</span>
                    <span className="text-2xl font-black text-destructive">
                      <CountUp end={results.fines} duration={2} separator=" " suffix=" PLN" />
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Wasted Time */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
                className="bg-card rounded-2xl p-6 border-2 border-warning/30 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">Stracony czas</h4>
                    <p className="text-sm text-muted-foreground">Manualne procesy</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center p-3 bg-warning/5 rounded-lg">
                    <span className="text-sm">Ręczne fakturowanie</span>
                    <span className="font-bold text-warning">
                      <CountUp end={timeBreakdown.manualInvoicing} duration={1.5} separator=" " suffix=" PLN" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-warning/5 rounded-lg">
                    <span className="text-sm">Archiwizacja</span>
                    <span className="font-bold text-warning">
                      <CountUp end={timeBreakdown.archiving} duration={1.5} separator=" " suffix=" PLN" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-warning/5 rounded-lg">
                    <span className="text-sm">Poprawianie błędów</span>
                    <span className="font-bold text-warning">
                      <CountUp end={timeBreakdown.errorCorrection} duration={1.5} separator=" " suffix=" PLN" />
                    </span>
                  </div>
                </div>

                <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      To równowartość <strong className="text-warning">{timeBreakdown.hoursWasted} godzin</strong> pracy
                      rocznie!
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-warning/20 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">RAZEM:</span>
                    <span className="text-2xl font-black text-warning">
                      <CountUp end={results.timeWasted} duration={2} separator=" " suffix=" PLN" />
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: VAT Delays */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 }}
                className="bg-card rounded-2xl p-6 border-2 border-primary/30 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">Wolniejszy VAT</h4>
                    <p className="text-sm text-muted-foreground">Opóźnione zwroty</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Bez KSeF</span>
                    <span className="font-bold text-destructive">{vatComparison.withoutKSeF} dni</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-destructive" style={{ width: "100%" }} />
                  </div>

                  <div className="flex justify-between text-sm mb-2">
                    <span>Z KSeF</span>
                    <span className="font-bold text-success">{vatComparison.withKSeF} dni</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-success" style={{ width: "67%" }} />
                  </div>

                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <span className="text-sm">Oszczędzasz </span>
                    <span className="font-bold text-primary text-lg">{vatComparison.savingsDays} dni</span>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Szybszy zwrot VAT = lepsza płynność finansowa</div>
                  </div>
                </div>

                <div className="border-t-2 border-primary/20 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">KOSZT OPÓŹNIEŃ:</span>
                    <span className="text-2xl font-black text-primary">
                      <CountUp end={results.vatDelays} duration={2} separator=" " suffix=" PLN" />
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Card 4: Lost Opportunities */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 }}
                className="bg-card rounded-2xl p-6 border-2 border-muted-foreground/30 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-muted-foreground/10 flex items-center justify-center flex-shrink-0">
                    <TrendingDown className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">Utracone szanse</h4>
                    <p className="text-sm text-muted-foreground">Stracona konkurencyjność</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm">Wolne procesy</span>
                    <span className="font-bold">
                      <CountUp end={opportunityBreakdown.slowProcesses} duration={1.5} separator=" " suffix=" PLN" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm">Brak automatyzacji</span>
                    <span className="font-bold">
                      <CountUp end={opportunityBreakdown.noAutomation} duration={1.5} separator=" " suffix=" PLN" />
                    </span>
                  </div>
                </div>

                <div className="bg-muted border border-border rounded-lg p-4 mb-4">
                  <div className="text-center mb-2">
                    <div className="text-3xl font-black text-destructive">{opportunityBreakdown.efficiencyLoss}%</div>
                    <div className="text-sm text-muted-foreground">spadek efektywności</div>
                  </div>
                  <div className="text-xs text-center text-muted-foreground">vs firmy z wdrożonym KSeF</div>
                </div>

                <div className="border-t-2 border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">RAZEM:</span>
                    <span className="text-2xl font-black">
                      <CountUp end={results.opportunityCost} duration={2} separator=" " suffix=" PLN" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Total summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-8 bg-gradient-to-r from-destructive/10 to-destructive/5 rounded-2xl p-8 border-2 border-destructive/30"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">ŁĄCZNE STRATY ROCZNE</div>
                  <div className="text-5xl font-black text-destructive">
                    <CountUp end={results.totalLosses} duration={2.5} separator=" " suffix=" PLN" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">DZIENNA STRATA</div>
                  <div className="text-3xl font-black text-destructive">
                    <CountUp end={dailyLoss} duration={2} separator=" " suffix=" PLN" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Daily loss callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.7 }}
            className="bg-destructive/10 border-2 border-destructive rounded-2xl p-8 text-center mb-8"
          >
            <p className="text-xl mb-2">
              To oznacza stratę <strong className="text-destructive">{formatCurrency(dailyLoss)}</strong> każdego dnia!
            </p>
            <p className="text-muted-foreground">Każdy dzień zwłoki kosztuje Twoją firmę realnie pieniądze</p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
            className="text-center"
          >
            <Button
              onClick={onNext}
              size="lg"
              className="px-12 py-8 text-xl font-bold bg-white hover:bg-white/90 text-destructive border-2 border-destructive shadow-xl"
            >
              <span className="flex items-center gap-3">
                Zobacz rozwiązanie
                <ArrowRight className="w-6 h-6" />
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
