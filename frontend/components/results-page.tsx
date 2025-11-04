"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  CheckCircle2,
  Download,
  Send,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  FileText,
  Gift,
  Lock,
  Shield,
  PartyPopper,
  Mail,
  Phone,
  GraduationCap,
  Users,
  DollarSign,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { formatCurrency } from "@/lib/calculator-logic"
import type { CalculatorResults } from "@/lib/calculator-logic"
import { Toaster, toast } from "sonner"
import { SocialShareButtons } from "@/components/social-share-buttons"
import { SendToFriendDialog } from "@/components/send-to-friend-dialog"
import { TestimonialsSection } from "@/components/testimonials-section"
import { EducationalTips } from "@/components/educational-tips"
import { ViralShareSection } from "@/components/viral-share-section"

interface ResultsPageProps {
  revenue: { value: number; label: string }
  volume: { value: number; label: string }
  results: CalculatorResults
  onRestart: () => void
  onBack: () => void
}

export function ResultsPage({ revenue, volume, results, onRestart, onBack }: ResultsPageProps) {
  console.log("🔥🔥🔥 RESULTS PAGE RENDERUJE SIĘ! 🔥🔥🔥")
  console.log("Results:", results)
  console.log("Revenue:", revenue)

  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [company, setCompany] = useState("")
  const [consent, setConsent] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [showSendDialog, setShowSendDialog] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) {
      toast.error("Musisz zaakceptować politykę prywatności")
      return
    }

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          email,
          company,
          revenue: revenue.value,
          invoiceVolume: volume.value,
          totalLosses: results.totalLosses,
          implementationCost: results.implementationCost,
          savings: results.savings,
          consent,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit lead")
      }

      const data = await response.json()
      console.log("[v0] Lead submitted successfully:", data)

      toast.success("Dziękujemy! Raport został wysłany na Twój email.")
      setIsSubmitted(true)
    } catch (error) {
      console.error("[v0] Error submitting lead:", error)
      toast.error("Wystąpił błąd. Spróbuj ponownie.")
    }
  }

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          revenue,
          volume,
          results,
          companyName: company || undefined,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate PDF")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `raport-ksef-${Date.now()}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success("PDF został pobrany!")
    } catch (error) {
      console.error("Error downloading PDF:", error)
      toast.error("Wystąpił błąd podczas generowania PDF. Spróbuj ponownie.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const shareText = `Sprawdziłem kalkulator KSeF - moja firma może stracić ${formatCurrency(results.totalLosses)} rocznie bez wdrożenia! Sprawdź swoje ryzyko:`
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      <Toaster position="top-center" />
      <SendToFriendDialog open={showSendDialog} onOpenChange={setShowSendDialog} calculatorUrl={shareUrl} />

      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Powrót do fazy rozwiązania
            </button>
          </div>

          {/* Summary header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-success/10 border-2 border-success rounded-full text-success font-bold mb-6">
              <CheckCircle2 className="w-5 h-5" />
              Kalkulacja ukończona!
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-5xl font-black mb-6">Twoje Podsumowanie</h1>

            <p className="text-xl text-muted-foreground">Zobacz pełny raport i pobierz PDF z planem działania</p>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-card rounded-2xl p-6 border-2 border-destructive/20 text-center shadow-lg">
              <div className="text-sm text-destructive font-semibold mb-2">POTENCJALNE STRATY</div>
              <div className="text-4xl font-black text-destructive mb-1">{formatCurrency(results.totalLosses)}</div>
              <div className="text-sm text-muted-foreground">PLN / rok</div>
            </div>

            <div className="bg-card rounded-2xl p-6 border-2 border-primary/20 text-center shadow-lg">
              <div className="text-sm text-primary font-semibold mb-2">KOSZT WDROŻENIA</div>
              <div className="text-4xl font-black text-primary mb-1">{formatCurrency(results.implementationCost)}</div>
              <div className="text-sm text-muted-foreground">PLN (jednorazowo)</div>
            </div>

            <div className="bg-gradient-to-br from-[#C7A83B]/10 to-[#C7A83B]/5 rounded-2xl p-6 border-2 border-[#C7A83B] text-center shadow-lg">
              <div className="text-sm text-[#C7A83B] font-semibold mb-2">TWOJE OSZCZĘDNOŚCI</div>
              <div className="text-4xl font-black text-[#C7A83B] mb-1">{formatCurrency(results.savings)}</div>
              <div className="text-sm text-muted-foreground">PLN / rok</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-[#1E2A5E] to-[#1E2A5E]/80 text-white rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C7A83B]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1E2A5E]/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                {!isSubmitted ? (
                  <>
                    {/* Header */}
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.5 }}
                        className="text-6xl mb-4"
                      >
                        <FileText className="w-16 h-16 text-[#C7A83B] mx-auto" />
                      </motion.div>
                      <h3 className="font-[family-name:var(--font-display)] text-4xl font-black mb-4">Pobierz pełny raport PDF</h3>
                      <p className="text-xl opacity-90 mb-2">45-stronicowy raport spersonalizowany dla Twojej firmy</p>
                      <p className="text-lg opacity-75">
                        Wartość: <span className="line-through">997 PLN</span>{" "}
                        <span className="text-[#C7A83B] font-bold">DZIŚ: 0 PLN</span>
                      </p>
                    </div>

                    {/* What's included - 2 columns */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      {/* Left column - What's included */}
                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#C7A83B]" />
                          Co zawiera raport:
                        </h4>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-[#C7A83B] mt-0.5">✓</span>
                            <span>Szczegółowa analiza gotowości Twojej firmy</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#C7A83B] mt-0.5">✓</span>
                            <span>Plan wdrożenia krok po kroku (timeline 8 tygodni)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#C7A83B] mt-0.5">✓</span>
                            <span>Checklista 127 punktów kontrolnych</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#C7A83B] mt-0.5">✓</span>
                            <span>5 case studies firm jak Twoja</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#C7A83B] mt-0.5">✓</span>
                            <span>Dokładny szacunek kosztów i ROI (3 scenariusze)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#C7A83B] mt-0.5">✓</span>
                            <span>20+ szablonów dokumentów gotowych do użycia</span>
                          </li>
                        </ul>
                      </div>

                      {/* Right column - Bonuses */}
                      <div className="bg-gradient-to-br from-[#C7A83B]/20 to-[#C7A83B]/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-[#C7A83B]/50">
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                          <Gift className="w-5 h-5 text-[#C7A83B]" />
                          BONUSY (wartość 2,500 PLN):
                        </h4>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start gap-2">
                            <Gift className="w-6 h-6 text-[#C7A83B] flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="font-semibold">Webinar "KSeF Masterclass"</div>
                              <div className="text-xs opacity-75">2h live training (nagranie dostępne)</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <Gift className="w-6 h-6 text-[#C7A83B] flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="font-semibold">Dostęp do ekskluzywnej społeczności</div>
                              <div className="text-xs opacity-75">600+ firm wdrażających KSeF</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <Gift className="w-6 h-6 text-[#C7A83B] flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="font-semibold">Newsletter z daily tips</div>
                              <div className="text-xs opacity-75">98 dni do deadline = 98 porad</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <Gift className="w-6 h-6 text-[#C7A83B] flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="font-semibold">30 min konsultacji z ekspertem</div>
                              <div className="text-xs opacity-75">Bez zobowiązań (wartość 500 PLN)</div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Email form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="Imię"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="w-full px-6 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-500 border-2 border-transparent focus:border-[#C7A83B]"
                          />
                        </div>
                        <div className="relative">
                          <Input
                            type="email"
                            placeholder="Email służbowy"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-6 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-500 border-2 border-transparent focus:border-[#C7A83B]"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Nazwa firmy (opcjonalnie)"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full px-6 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-500 border-2 border-transparent focus:border-accent"
                        />
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                        <Checkbox
                          id="consent"
                          checked={consent}
                          onCheckedChange={(checked) => setConsent(checked as boolean)}
                          required
                          className="mt-1"
                        />
                        <label htmlFor="consent" className="text-sm opacity-90 leading-relaxed cursor-pointer">
                          Zgadzam się na otrzymanie <strong>darmowego raportu PDF</strong> oraz newsletter z poradami
                          KSeF (możesz się wypisać w każdej chwili).{" "}
                          <a href="#" className="text-[#C7A83B] hover:underline ml-1">
                            Polityka prywatności
                          </a>
                        </label>
                      </div>

                      {/* Trust signals */}
                      <div className="flex items-center justify-center gap-6 text-sm opacity-75 mb-4">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          <span>Dane szyfrowane</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          <span>RODO compliant</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Zero spamu</span>
                        </div>
                      </div>

                      {/* Submit button with shimmer */}
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative w-full inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-[#1E2A5E] bg-gradient-to-r from-[#C7A83B] via-[#C7A83B]/90 to-[#C7A83B] rounded-xl shadow-xl transition-all duration-300 overflow-hidden"
                      >
                        {/* Shine effect */}
                        <div className="absolute inset-0 rounded-xl overflow-hidden">
                          <motion.div
                            animate={{ x: ["-200%", "200%"] }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatDelay: 1,
                              ease: "linear",
                            }}
                            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                          />
                        </div>

                        <span className="relative z-10 flex items-center gap-3">
                          <Download className="w-6 h-6" />
                          Wyślij mi darmowy raport PDF
                          <ArrowRight className="w-6 h-6" />
                        </span>
                      </motion.button>

                      {/* Urgency */}
                      <p className="text-center text-sm opacity-75">
                        <AlertTriangle className="w-4 h-4 inline mr-1" />
                        Raport wysyłamy w ciągu 60 sekund na Twój email
                      </p>
                    </form>
                  </>
                ) : (
                  /* Success state */
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ duration: 0.6 }}
                      className="text-8xl mb-6"
                    >
                      <PartyPopper className="w-24 h-24 text-[#C7A83B] mx-auto" />
                    </motion.div>
                    <h3 className="font-[family-name:var(--font-display)] text-4xl font-black mb-4">Sukces! Sprawdź email</h3>
                    <p className="text-xl mb-6">
                      Raport PDF został wysłany na:
                      <br />
                      <strong className="text-[#C7A83B]">{email}</strong>
                    </p>
                    <div className="bg-white/10 rounded-xl p-6 inline-block">
                      <p className="opacity-90 mb-4">
                        <Mail className="w-5 h-5 inline mr-2" />
                        Sprawdź swoją skrzynkę (także spam/promotional)
                      </p>
                      <p className="text-sm opacity-75">
                        💡 Dodaj nasz email do kontaktów aby nie przegapić future updates
                      </p>
                    </div>

                    {/* Next steps */}
                    <div className="mt-8 pt-8 border-t border-white/20">
                      <p className="text-lg mb-6">Co dalej?</p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all flex items-center gap-2 justify-center">
                          <Phone className="w-5 h-5" />
                          Umów konsultację
                        </button>
                        <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all flex items-center gap-2 justify-center">
                          <GraduationCap className="w-5 h-5" />
                          Zapisz na webinar
                        </button>
                        <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all flex items-center gap-2 justify-center">
                          <Users className="w-5 h-5" />
                          Dołącz do community
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* VIRAL SHARE SECTION - INLINE */}
          <div className="mb-12 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border-2 border-orange-200">
            {/* FOMO Timer */}
            <div className="bg-white rounded-2xl p-6 border-2 border-red-500 mb-6">
              <div className="text-center">
                <div className="text-red-600 font-black text-2xl mb-2">⏰ OFERTA WYGASA ZA:</div>
                <div className="text-5xl font-black text-red-600 mb-2">47:59:00</div>
                <div className="text-sm text-gray-600">Darmowy raport + bonusy o wartości 2,500 PLN</div>
              </div>
            </div>

            {/* Shock Value Card */}
            <div className="bg-gradient-to-br from-red-500 to-orange-600 text-white rounded-3xl p-8 mb-6 text-center">
              <div className="text-6xl mb-4">😱</div>
              <div className="text-3xl font-black mb-4">TRACISZ {formatCurrency(results.totalLosses)} PLN ROCZNIE!</div>
              <div className="text-xl mb-4">To {formatCurrency(Math.round(results.totalLosses / 12))} PLN każdego miesiąca!</div>
              <div className="text-lg opacity-90">Jesteś w dolnych 35% firm - większość już wdraża KSeF</div>
            </div>

            {/* Social Proof Counter */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 mb-6 text-center">
              <div className="text-4xl font-black mb-2">1,247 firm</div>
              <div className="text-lg">pobrało ten raport w ostatnich 24h</div>
              <div className="text-sm opacity-75 mt-2">🔴 LIVE - aktualizacja co 8 sekund</div>
            </div>

            {/* Share Buttons */}
            <div className="bg-white rounded-2xl p-6 mb-6">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-gray-900 mb-2">📤 Udostępnij swoim kolegom</div>
                <div className="text-sm text-gray-600">Oni też tracą pieniądze - ostrzeż ich!</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-semibold transition-all">
                  WhatsApp
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all">
                  LinkedIn
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold transition-all">
                  Facebook
                </button>
                <button className="bg-sky-500 hover:bg-sky-600 text-white py-3 px-4 rounded-xl font-semibold transition-all">
                  Twitter
                </button>
                <button className="bg-gray-700 hover:bg-gray-800 text-white py-3 px-4 rounded-xl font-semibold transition-all">
                  Email
                </button>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-900 py-3 px-4 rounded-xl font-semibold transition-all">
                  Kopiuj link
                </button>
              </div>
            </div>

            {/* Referral Rewards */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-6">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold mb-2">🎁 BONUS za udostępnienie</div>
                <div className="text-sm opacity-90">Udostępnij 3 razy i odblokuj ekskluzywne bonusy</div>
              </div>
              <div className="space-y-3">
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">🔒</div>
                    <div className="flex-1">
                      <div className="font-bold">1 udostępnienie</div>
                      <div className="text-sm opacity-75">Checklista 50 punktów kontrolnych</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">🔒</div>
                    <div className="flex-1">
                      <div className="font-bold">2 udostępnienia</div>
                      <div className="text-sm opacity-75">Webinar "KSeF w 30 dni" (nagranie)</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">🔒</div>
                    <div className="flex-1">
                      <div className="font-bold">3 udostępnienia</div>
                      <div className="text-sm opacity-75">Darmowa konsultacja 30 min z ekspertem (wart. 500 PLN)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Educational content */}
          <EducationalTips />

          {/* Testimonials */}
          <TestimonialsSection />

          {/* Multi-CTA panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 border-2 border-primary/20">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-center mb-8">Następne kroki</h3>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card rounded-2xl p-6 text-center shadow-lg">
                  <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-bold mb-2">Bezpłatna konsultacja</h4>
                  <p className="text-sm text-muted-foreground mb-4">30 min rozmowy z ekspertem + audit Twoich faktur</p>
                  <Button className="w-full bg-[#C7A83B] hover:bg-[#C7A83B]/90 text-[#1E2A5E]">Umów się</Button>
                </div>

                <div className="bg-card rounded-2xl p-6 text-center shadow-lg">
                  <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-bold mb-2">Darmowy webinar</h4>
                  <p className="text-sm text-muted-foreground mb-4">"KSeF w 30 dni" - praktyczny przewodnik</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Zapisz się
                  </Button>
                </div>

                <div className="bg-card rounded-2xl p-6 text-center shadow-lg">
                  <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-bold mb-2">Kalkulator kosztów</h4>
                  <p className="text-sm text-muted-foreground mb-4">Dokładna wycena wdrożenia dla Twojej firmy</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Oblicz
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Retake */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <Button onClick={onRestart} variant="ghost" size="lg" className="font-semibold">
              <RefreshCw className="w-5 h-5 mr-2" />
              Przelicz ponownie
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
