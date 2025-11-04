"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Calendar,
  Download,
  Lightbulb,
  Rocket,
  AlertCircle,
  Target,
  Star,
  Zap,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatPercentage } from "@/lib/calculator-logic"
import type { CalculatorResults } from "@/lib/calculator-logic"

interface Phase3SolutionProps {
  revenue: { value: number; label: string }
  volume: { value: number; label: string }
  results: CalculatorResults
  onFinish: () => void
  onBack: () => void
}

export function Phase3Solution({ revenue, volume, results, onFinish, onBack }: Phase3SolutionProps) {
  const paybackMonths = Math.round((results.implementationCost / results.totalLosses) * 12)

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/10 via-background to-success/5 relative overflow-hidden">
      <div className="relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Progress */}
          <div className="mb-12">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Powrót do scenariusza katastrofy
            </button>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-success">KROK 3/3</span>
              <span className="text-sm text-muted-foreground">Twoje rozwiązanie</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "66%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-success to-[#C7A83B]"
              />
            </div>
          </div>

          {/* Relief header */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="bg-gradient-to-r from-success to-success/80 text-success-foreground rounded-3xl p-12 mb-8 shadow-2xl text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <CheckCircle2 className="w-24 h-24 text-success-foreground mx-auto mb-6" />
              <h2 className="font-[family-name:var(--font-display)] text-5xl font-black mb-6">MAMY ROZWIĄZANIE!</h2>
              <p className="text-2xl opacity-90 mb-8">Profesjonalne wdrożenie KSeF zwraca się w:</p>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="bg-white/20 backdrop-blur rounded-2xl p-8 inline-block"
              >
                <div className="font-mono text-7xl font-black">{paybackMonths} MIESIĘCY</div>
                <div className="text-lg mt-2 opacity-90">(często krócej!)</div>
              </motion.div>
            </div>
          </motion.div>

          {/* The big comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <div className="bg-card rounded-3xl p-8 border-2 border-border shadow-xl">
              <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold text-center mb-8">Porównanie: Działać vs Nie Działać</h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Option A: Doing nothing */}
                <div className="bg-destructive/5 rounded-2xl p-8 border-4 border-destructive relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-destructive text-destructive-foreground px-6 py-2 text-sm font-bold rounded-bl-xl flex items-center gap-2">
                    <span className="text-lg">✕</span> NIE WDRAŻAM
                  </div>

                  <div className="mt-8 mb-6">
                    <AlertCircle className="w-20 h-20 text-destructive mx-auto mb-4" />
                    <h4 className="font-[family-name:var(--font-display)] text-2xl font-bold text-center mb-4">Scenariusz katastrofy</h4>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-destructive font-bold text-sm">✕</span>
                      </div>
                      <span className="text-sm flex-1">Kary i sankcje</span>
                      <span className="font-bold text-destructive text-sm">{formatCurrency(results.fines)}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-destructive font-bold text-sm">✕</span>
                      </div>
                      <span className="text-sm flex-1">Stracony czas</span>
                      <span className="font-bold text-destructive text-sm">{formatCurrency(results.timeWasted)}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-destructive font-bold text-sm">✕</span>
                      </div>
                      <span className="text-sm flex-1">Wolniejszy VAT</span>
                      <span className="font-bold text-destructive text-sm">{formatCurrency(results.vatDelays)}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-destructive font-bold text-sm">✕</span>
                      </div>
                      <span className="text-sm flex-1">Utracone szanse</span>
                      <span className="font-bold text-destructive text-sm">
                        {formatCurrency(results.opportunityCost)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t-2 border-destructive/30 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">RAZEM STRAT:</span>
                      <div className="text-right">
                        <div className="text-3xl font-black text-destructive">
                          {formatCurrency(results.totalLosses)}
                        </div>
                        <div className="text-xs text-muted-foreground">PLN / rok</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Option B: Implementing KSeF */}
                <div className="bg-success/5 rounded-2xl p-8 border-4 border-success relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-success text-success-foreground px-6 py-2 text-sm font-bold rounded-bl-xl flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> WDRAŻAM TERAZ
                  </div>

                  <div className="mt-8 mb-6">
                    <Rocket className="w-20 h-20 text-success mx-auto mb-4" />
                    <h4 className="font-[family-name:var(--font-display)] text-2xl font-bold text-center mb-4">Profesjonalne wdrożenie</h4>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
                      <span className="text-sm flex-1">Wdrożenie techniczne</span>
                      <span className="font-bold text-sm">
                        {formatCurrency(Math.round(results.implementationCost * 0.5))}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
                      <span className="text-sm flex-1">Szkolenia zespołu</span>
                      <span className="font-bold text-sm">
                        {formatCurrency(Math.round(results.implementationCost * 0.2))}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
                      <span className="text-sm flex-1">Konsultacje</span>
                      <span className="font-bold text-sm">
                        {formatCurrency(Math.round(results.implementationCost * 0.15))}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
                      <span className="text-sm flex-1">90 dni wsparcia</span>
                      <span className="font-bold text-sm">
                        {formatCurrency(Math.round(results.implementationCost * 0.15))}
                      </span>
                    </div>
                  </div>

                  <div className="border-t-2 border-success/30 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">INWESTYCJA:</span>
                      <div className="text-right">
                        <div className="text-3xl font-black text-success">
                          {formatCurrency(results.implementationCost)}
                        </div>
                        <div className="text-xs text-muted-foreground">PLN (jednorazowo)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual comparison bar */}
              <div className="relative h-32 bg-muted rounded-2xl overflow-hidden mb-6">
                <div className="absolute inset-0 flex">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(results.implementationCost / (results.implementationCost + results.totalLosses)) * 100}%`,
                    }}
                    transition={{ duration: 1, delay: 1 }}
                    className="bg-gradient-to-r from-success to-success/80 flex items-center justify-center text-success-foreground font-bold text-sm px-6 min-w-[180px]"
                  >
                    <div className="text-center w-full">
                      <div className="text-base">INWESTYCJA</div>
                      <div className="text-xs mt-1">{formatCurrency(results.implementationCost)}</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(results.totalLosses / (results.implementationCost + results.totalLosses)) * 100}%`,
                    }}
                    transition={{ duration: 1, delay: 1.3 }}
                    className="bg-gradient-to-r from-destructive to-destructive/80 flex items-center justify-center text-destructive-foreground font-bold text-sm px-6"
                  >
                    <div className="text-center w-full">
                      <div className="text-base">STRATY BEZ WDROŻENIA</div>
                      <div className="text-xs mt-1">{formatCurrency(results.totalLosses)}</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* The kicker */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="bg-gradient-to-r from-[#C7A83B]/20 to-[#C7A83B]/10 border-2 border-[#C7A83B] rounded-2xl p-8 text-center"
              >
                <Lightbulb className="w-20 h-20 text-[#C7A83B] mx-auto mb-4" />
                <h4 className="font-[family-name:var(--font-display)] text-3xl font-black mb-4">
                  Oszczędzasz <span className="text-success">{formatCurrency(results.savings)}</span>
                </h4>
                <p className="text-xl mb-2">
                  Czyli <strong>{Math.round(results.roi)}x</strong> więcej niż wydajesz!
                </p>
                <p className="text-lg text-muted-foreground">
                  ROI: <strong className="text-success">{formatPercentage(results.roiPercentage)}</strong>
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* ROI breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
            className="mb-8"
          >
            <div className="bg-card rounded-3xl p-8 border-2 border-border shadow-xl">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-6 text-center">Zwrot z inwestycji (ROI)</h3>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-primary/5 rounded-xl border border-primary/20">
                  <div className="text-sm text-primary font-semibold mb-2">INWESTYCJA</div>
                  <div className="text-4xl font-black text-primary">{formatCurrency(results.implementationCost)}</div>
                  <div className="text-sm text-muted-foreground mt-1">PLN</div>
                </div>

                <div className="text-center p-6 bg-success/5 rounded-xl border border-success/20">
                  <div className="text-sm text-success font-semibold mb-2">OSZCZĘDNOŚCI (ROK 1)</div>
                  <div className="text-4xl font-black text-success">{formatCurrency(results.totalLosses)}</div>
                  <div className="text-sm text-muted-foreground mt-1">PLN</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-[#C7A83B]/10 to-[#C7A83B]/5 rounded-xl border-2 border-[#C7A83B]">
                  <div className="text-sm text-[#C7A83B] font-semibold mb-2">ROI</div>
                  <div className="text-4xl font-black">{formatPercentage(results.roiPercentage)}</div>
                  <div className="text-sm text-muted-foreground mt-1">zwrotu</div>
                </div>
              </div>

              {/* Timeline ROI */}
              <div className="bg-gradient-to-r from-muted/50 to-primary/5 rounded-xl p-6">
                <h4 className="font-[family-name:var(--font-display)] font-bold mb-4 text-center">Ile zarobisz w czasie:</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">6 miesięcy</div>
                    <div className="text-2xl font-bold text-success">{formatCurrency(results.savings6Months)}</div>
                    <div className="text-xs text-muted-foreground">PLN</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">1 rok</div>
                    <div className="text-2xl font-bold text-success">{formatCurrency(results.savings1Year)}</div>
                    <div className="text-xs text-muted-foreground">PLN</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">3 lata</div>
                    <div className="text-2xl font-bold text-success">{formatCurrency(results.savings3Years)}</div>
                    <div className="text-xs text-muted-foreground">PLN</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* What's included */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }} className="mb-12">
            <div className="bg-card rounded-3xl p-8 border-2 border-border shadow-xl">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-6 text-center">
                Co zawiera wdrożenie za {formatCurrency(results.implementationCost)}?
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">Pełna integracja z Twoim systemem księgowym</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">Testy w środowisku demo MF</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">Konfiguracja procesów i procedur</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">Szkolenia dla całego zespołu</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">Dokumentacja i instrukcje</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">90 dni wsparcia technicznego</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">Hotline priorytetowy</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">Audyt pierwszych 100 faktur</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">Setup RODO i compliance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">5 sesji konsultacyjnych</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-border">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <Zap className="w-12 h-12 text-primary mx-auto mb-2" />
                    <div className="font-semibold text-sm mb-1">Czas wdrożenia</div>
                    <div className="text-3xl font-bold">6-8 tyg</div>
                  </div>
                  <div>
                    <Target className="w-12 h-12 text-success mx-auto mb-2" />
                    <div className="font-semibold text-sm mb-1">Sukces wdrożenia</div>
                    <div className="text-3xl font-bold text-success">98%</div>
                  </div>
                  <div>
                    <Star className="w-12 h-12 text-[#C7A83B] mx-auto mb-2 fill-[#C7A83B]" />
                    <div className="font-semibold text-sm mb-1">Ocena klientów</div>
                    <div className="text-3xl font-bold text-[#C7A83B]">4.9/5</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mega CTA section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 4 }}
          >
            <div className="bg-gradient-to-br from-[#1E2A5E] to-[#1E2A5E]/80 text-white rounded-3xl p-12 shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="font-[family-name:var(--font-display)] text-4xl font-black mb-4">Gotowy na wdrożenie?</h3>
                <p className="text-xl opacity-90">
                  Uratuj swoją firmę przed stratami {formatCurrency(results.totalLosses)}
                </p>
              </div>

              {/* Primary CTA */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/20">
                  <div className="text-center mb-6">
                    <Phone className="w-16 h-16 text-primary-foreground mx-auto mb-3" />
                    <h4 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-2">Bezpłatna konsultacja (30 min)</h4>
                    <p className="opacity-90">Omówimy Twoją sytuację i przygotujemy szczegółową ofertę</p>
                  </div>

                  <ul className="space-y-3 mb-6 text-left max-w-md mx-auto">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <span>Analiza Twojego systemu księgowego</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <span>Plan wdrożenia dopasowany do Ciebie</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <span>Odpowiedzi na wszystkie pytania</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <span>Dokładna wycena (nie szacunek)</span>
                    </li>
                  </ul>

                  <div className="bg-[#C7A83B]/20 border border-[#C7A83B] rounded-lg p-4 mb-6 text-center">
                    <span className="font-bold text-[#C7A83B] flex items-center justify-center gap-2">
                      <span className="text-xl">🎁</span> BONUS: Audit 20 Twoich faktur gratis
                    </span>
                  </div>

                  <Button
                    onClick={onFinish}
                    size="lg"
                    className="w-full px-12 py-8 text-xl font-bold bg-[#C7A83B] hover:bg-[#C7A83B]/90 text-[#1E2A5E] shadow-xl"
                  >
                    <span className="flex items-center gap-3">
                      Umów konsultację TERAZ
                      <ArrowRight className="w-6 h-6" />
                    </span>
                  </Button>
                </div>

                <p className="text-center text-sm opacity-75">
                  <Zap className="w-4 h-4 inline mr-1" />
                  Oddzwaniamy w ciągu 2h (pn-pt 9-19) • Bez zobowiązań
                </p>
              </div>

              {/* Alternative CTAs */}
              <div className="grid md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2 bg-white/10 border-white/30 text-white hover:bg-white hover:text-[#1E2A5E]"
                >
                  <Download className="w-5 h-5" />
                  <span>Wyślij mi PDF</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2 bg-white/10 border-white/30 text-white hover:bg-white hover:text-[#1E2A5E]"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Darmowy webinar</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2 bg-white/10 border-white/30 text-white hover:bg-white hover:text-[#1E2A5E]"
                >
                  <Phone className="w-5 h-5" />
                  <span>Zadzwoń teraz</span>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Urgency footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5 }}
            className="mt-8 text-center"
          >
            <div className="inline-block bg-destructive/10 border-2 border-destructive rounded-xl px-8 py-4">
              <p className="text-destructive font-semibold flex items-center gap-2 justify-center">
                <Clock className="w-5 h-5" />
                Każdy dzień opóźnienia ={" "}
                <strong>{formatCurrency(Math.round(results.totalLosses / 365))} PLN strat</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
