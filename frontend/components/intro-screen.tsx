"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, AlertTriangle, TrendingUp, Shield, DollarSign, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CountdownTimer } from "@/components/countdown-timer"
import { SocialProofBanner } from "@/components/social-proof-banner"

interface IntroScreenProps {
  onStart: () => void
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  const [companyGroup, setCompanyGroup] = useState<"large" | "other">("large")

  // Two different KSeF mandatory dates
  const largeFirmsDeadline = new Date("2026-02-01T00:00:00") // Companies > 200M revenue
  const otherFirmsDeadline = new Date("2026-07-01T00:00:00") // All other companies

  const currentDeadline = companyGroup === "large" ? largeFirmsDeadline : otherFirmsDeadline

  return (
    <div className="min-h-screen hero-gradient overflow-hidden diagonal-stripes">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none z-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.03) 0px,
            rgba(255, 255, 255, 0.03) 10px,
            transparent 10px,
            transparent 20px
          )`,
        }}
      />

      {/* Radial gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(
            circle at 50% 50%,
            transparent 0%,
            rgba(10, 22, 40, 0.3) 100%
          )`,
        }}
      />

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-destructive/20 border-2 border-destructive rounded-full text-destructive-foreground font-bold mb-8">
              <AlertTriangle className="w-5 h-5" />
              {companyGroup === "large" ? "OBOWIĄZKOWE OD 1 LUTEGO 2026" : "OBOWIĄZKOWE OD 1 LIPCA 2026"}
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-black text-white mb-6">
              Kalkulator Kosztów
              <br />
              <span className="text-[#C7A83B]">Braku Wdrożenia KSeF</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Sprawdź ile stracisz jeśli nie wdrożysz Krajowego Systemu e-Faktur na czas
            </p>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-12 border border-white/20"
          >
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-xl rounded-full p-1 border border-white/20">
                <button
                  onClick={() => setCompanyGroup("large")}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    companyGroup === "large"
                      ? "bg-destructive text-destructive-foreground shadow-lg"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Firmy &gt; 200M
                </button>
                <button
                  onClick={() => setCompanyGroup("other")}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    companyGroup === "other"
                      ? "bg-destructive text-destructive-foreground shadow-lg"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Pozostałe firmy
                </button>
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Czas do obowiązkowego wdrożenia:</h2>
            </div>
            <div className="flex justify-center">
              <CountdownTimer targetDate={currentDeadline} key={companyGroup} />
            </div>
          </motion.div>

          {/* Key stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="flex items-center justify-center mb-3">
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-destructive" />
                </div>
              </div>
              <div className="text-3xl font-black text-destructive mb-2">50k - 500k PLN</div>
              <div className="text-sm text-muted-foreground">Średnie roczne straty firm bez wdrożenia</div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="flex items-center justify-center mb-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-black text-primary mb-2">6-8 tygodni</div>
              <div className="text-sm text-muted-foreground">Czas potrzebny na profesjonalne wdrożenie</div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="flex items-center justify-center mb-3">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-success" />
                </div>
              </div>
              <div className="text-3xl font-black text-[#C7A83B] mb-2">ROI 800%+</div>
              <div className="text-sm text-muted-foreground">Średni zwrot z inwestycji w pierwszy rok</div>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-3xl p-8 mb-12 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-center mb-8">Co dowiesz się z kalkulatora?</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Potencjalne straty</h4>
                  <p className="text-sm text-muted-foreground">
                    Kary, sankcje, stracony czas i utracone możliwości biznesowe
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Koszt wdrożenia</h4>
                  <p className="text-sm text-muted-foreground">
                    Dokładny szacunek inwestycji potrzebnej dla Twojej firmy
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-success" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-2">ROI i oszczędności</h4>
                  <p className="text-sm text-muted-foreground">
                    Ile zaoszczędzisz w pierwszym roku i w perspektywie 3 lat
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Plan działania</h4>
                  <p className="text-sm text-muted-foreground">Konkretne kroki do bezpiecznego wdrożenia KSeF</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Proof Banner */}
          <SocialProofBanner />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center"
          >
            <Button
              onClick={onStart}
              size="lg"
              className="group relative px-12 py-8 text-xl font-bold bg-[#C7A83B] hover:bg-[#C7A83B]/90 text-[#1E2A5E] shadow-2xl"
            >
              <span className="flex items-center gap-3">
                Rozpocznij kalkulację (2 minuty)
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>

            <p className="text-white/75 text-sm mt-4">
              Bezpłatnie • Bez rejestracji • Natychmiastowe wyniki
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
