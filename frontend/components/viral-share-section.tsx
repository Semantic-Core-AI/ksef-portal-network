"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Share2,
  Trophy,
  Users,
  TrendingUp,
  Gift,
  Timer,
  Copy,
  Check,
  Smartphone,
  Linkedin,
  Facebook,
  Twitter,
  Mail,
  MessageCircle,
  QrCode,
  Unlock,
  Zap,
  Target,
  Award,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/calculator-logic"
import type { CalculatorResults } from "@/lib/calculator-logic"

interface ViralShareSectionProps {
  results: CalculatorResults
  revenue: { value: number; label: string }
}

export function ViralShareSection({ results, revenue }: ViralShareSectionProps) {
  const [liveCounter, setLiveCounter] = useState(1247)
  const [copied, setCopied] = useState(false)
  const [sharesCount, setSharesCount] = useState(0)
  const [showReward, setShowReward] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ hours: 47, minutes: 59, seconds: 59 })

  // Live counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCounter((prev) => prev + Math.floor(Math.random() * 3))
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Calculate percentile
  const calculatePercentile = (loss: number) => {
    if (loss < 50000) return 85
    if (loss < 100000) return 65
    if (loss < 200000) return 35
    return 15
  }

  const percentile = calculatePercentile(results.totalLosses)

  // Viral share texts
  const shockingText = `😱 SZOK! Moja firma traci ${formatCurrency(results.totalLosses)} PLN rocznie bez KSeF!\n\n💰 To ${Math.round(results.totalLosses / 12).toLocaleString("pl-PL")} PLN miesięcznie!\n\n🔥 Sprawdź ile tracisz:`

  const competitiveText = `🏆 Sprawdziłem kalkulator KSeF i jestem w top ${percentile}% firm!\n\n💸 Potencjalne straty: ${formatCurrency(results.totalLosses)}/rok\n\n🎯 A Ty? Sprawdź swoje ryzyko:`

  const handleShare = (platform: string) => {
    setSharesCount((prev) => prev + 1)
    if (sharesCount + 1 >= 3) {
      setShowReward(true)
    }

    const url = typeof window !== "undefined" ? window.location.href : ""
    const text = encodeURIComponent(shockingText)

    switch (platform) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${text}%20${encodeURIComponent(url)}`, "_blank")
        break
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${text}`,
          "_blank",
        )
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
        break
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, "_blank")
        break
      case "email":
        window.open(`mailto:?subject=Sprawdź kalkulator KSeF&body=${text}%20${url}`)
        break
    }
  }

  const copyToClipboard = () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    navigator.clipboard.writeText(`${shockingText}\n${url}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* FOMO Timer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-2xl p-6 border-2 border-red-500/30"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Timer className="w-6 h-6 text-red-500 animate-pulse" />
            <div>
              <div className="text-sm font-semibold text-red-600">⚠️ WYNIKI DOSTĘPNE PRZEZ OGRANICZONY CZAS</div>
              <div className="text-xs text-muted-foreground">Po tym czasie link wygaśnie - udostępnij teraz!</div>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-2xl font-bold text-red-600">
            <span className="bg-red-100 px-3 py-2 rounded-lg">{String(timeLeft.hours).padStart(2, "0")}</span>
            <span>:</span>
            <span className="bg-red-100 px-3 py-2 rounded-lg">{String(timeLeft.minutes).padStart(2, "0")}</span>
            <span>:</span>
            <span className="bg-red-100 px-3 py-2 rounded-lg">{String(timeLeft.seconds).padStart(2, "0")}</span>
          </div>
        </div>
      </motion.div>

      {/* Viral Shock Card - Main shareable visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E2A5E] via-[#1E2A5E]/90 to-[#C7A83B]/20 p-12 shadow-2xl border-2 border-[#C7A83B]/30"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20px 20px, white 2px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 text-center text-white">
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
            <div className="inline-flex items-center gap-2 bg-red-500/20 border-2 border-red-500 px-6 py-3 rounded-full mb-8">
              <Zap className="w-5 h-5 text-yellow-300 animate-pulse" />
              <span className="text-xl font-bold">UWAGA! SZOKUJĄCE DANE</span>
            </div>
          </motion.div>

          <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-black mb-4">
            {formatCurrency(results.totalLosses)}
          </h2>
          <p className="text-2xl md:text-3xl mb-2 opacity-90">PLN rocznie</p>
          <p className="text-xl opacity-75 mb-8">
            To <span className="text-[#C7A83B] font-bold">{Math.round(results.totalLosses / 12).toLocaleString("pl-PL")} PLN</span> miesięcznie!
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 inline-block border border-white/20">
            <p className="text-lg mb-2">🎯 Twoja firma jest w top</p>
            <p className="text-6xl font-black text-[#C7A83B] mb-2">{percentile}%</p>
            <p className="text-sm opacity-75">firm z największym ryzykiem strat</p>
          </div>
        </div>
      </motion.div>

      {/* Live Social Proof Counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border-2 border-green-500/30"
      >
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Users className="w-8 h-8 text-green-600" />
          <div className="text-center">
            <motion.div
              key={liveCounter}
              initial={{ scale: 1.2, color: "#16a34a" }}
              animate={{ scale: 1, color: "#000000" }}
              className="text-4xl font-black text-green-600 font-mono"
            >
              {liveCounter.toLocaleString("pl-PL")}
            </motion.div>
            <div className="text-sm text-muted-foreground">firm sprawdziło już dzisiaj</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-600 font-semibold">LIVE</span>
          </div>
        </div>
      </motion.div>

      {/* One-Click Viral Sharing */}
      <div className="bg-card rounded-3xl p-8 border-2 border-[#C7A83B]/30 shadow-xl">
        <div className="text-center mb-6">
          <Sparkles className="w-12 h-12 text-[#C7A83B] mx-auto mb-4" />
          <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-2">Podziel się wynikiem</h3>
          <p className="text-muted-foreground">Pomóż znajomym uniknąć strat finansowych</p>
        </div>

        {/* Main sharing buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <Button
            onClick={() => handleShare("whatsapp")}
            className="h-auto py-6 bg-[#25D366] hover:bg-[#20BD5A] text-white flex-col gap-2"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm font-semibold">WhatsApp</span>
            <span className="text-xs opacity-75">Najszybszy</span>
          </Button>

          <Button
            onClick={() => handleShare("linkedin")}
            className="h-auto py-6 bg-[#0A66C2] hover:bg-[#004182] text-white flex-col gap-2"
          >
            <Linkedin className="w-6 h-6" />
            <span className="text-sm font-semibold">LinkedIn</span>
            <span className="text-xs opacity-75">Professional</span>
          </Button>

          <Button
            onClick={() => handleShare("facebook")}
            className="h-auto py-6 bg-[#1877F2] hover:bg-[#0C5ECF] text-white flex-col gap-2"
          >
            <Facebook className="w-6 h-6" />
            <span className="text-sm font-semibold">Facebook</span>
            <span className="text-xs opacity-75">Szeroki zasięg</span>
          </Button>

          <Button
            onClick={() => handleShare("twitter")}
            className="h-auto py-6 bg-black hover:bg-gray-800 text-white flex-col gap-2"
          >
            <Twitter className="w-6 h-6" />
            <span className="text-sm font-semibold">Twitter/X</span>
            <span className="text-xs opacity-75">Viral potential</span>
          </Button>

          <Button
            onClick={() => handleShare("email")}
            className="h-auto py-6 bg-gray-600 hover:bg-gray-700 text-white flex-col gap-2"
          >
            <Mail className="w-6 h-6" />
            <span className="text-sm font-semibold">Email</span>
            <span className="text-xs opacity-75">Formalne</span>
          </Button>

          <Button onClick={copyToClipboard} className="h-auto py-6 bg-[#C7A83B] hover:bg-[#C7A83B]/90 text-[#1E2A5E] flex-col gap-2">
            {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
            <span className="text-sm font-semibold">{copied ? "Skopiowano!" : "Kopiuj link"}</span>
            <span className="text-xs opacity-75">+ tekst</span>
          </Button>
        </div>

        {/* Copy box */}
        <div className="bg-muted rounded-xl p-4 text-sm font-mono text-muted-foreground mb-6">
          <div className="whitespace-pre-wrap break-words">{shockingText.slice(0, 150)}...</div>
        </div>
      </div>

      {/* Referral Rewards System */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-8 border-2 border-purple-500/30"
      >
        <div className="text-center mb-6">
          <Gift className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-2">
            🎁 Program Poleceń
          </h3>
          <p className="text-lg text-muted-foreground">Udostępnij i odbierz nagrody!</p>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold">Twój postęp: {sharesCount}/3</span>
            <span className="text-sm text-muted-foreground">Jeszcze {3 - sharesCount} udostępnień</span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(sharesCount / 3) * 100}%` }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Rewards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div
            className={`p-4 rounded-xl border-2 text-center transition-all ${
              sharesCount >= 1
                ? "bg-green-50 border-green-500"
                : "bg-white border-gray-200 opacity-50"
            }`}
          >
            <Award className={`w-8 h-8 mx-auto mb-2 ${sharesCount >= 1 ? "text-green-600" : "text-gray-400"}`} />
            <div className="text-sm font-semibold">1 udostępnienie</div>
            <div className="text-xs text-muted-foreground">Webinar premium</div>
          </div>

          <div
            className={`p-4 rounded-xl border-2 text-center transition-all ${
              sharesCount >= 2
                ? "bg-green-50 border-green-500"
                : "bg-white border-gray-200 opacity-50"
            }`}
          >
            <Award className={`w-8 h-8 mx-auto mb-2 ${sharesCount >= 2 ? "text-green-600" : "text-gray-400"}`} />
            <div className="text-sm font-semibold">2 udostępnienia</div>
            <div className="text-xs text-muted-foreground">Raport rozszerzony</div>
          </div>

          <div
            className={`p-4 rounded-xl border-2 text-center transition-all ${
              sharesCount >= 3
                ? "bg-green-50 border-green-500"
                : "bg-white border-gray-200 opacity-50"
            }`}
          >
            <Award className={`w-8 h-8 mx-auto mb-2 ${sharesCount >= 3 ? "text-green-600" : "text-gray-400"}`} />
            <div className="text-sm font-semibold">3 udostępnienia</div>
            <div className="text-xs text-muted-foreground">60 min konsultacji 🎉</div>
          </div>
        </div>

        <AnimatePresence>
          {showReward && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mt-6 p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl text-white text-center"
            >
              <Unlock className="w-12 h-12 mx-auto mb-3 animate-bounce" />
              <h4 className="text-2xl font-bold mb-2">🎉 GRATULACJE!</h4>
              <p className="text-lg mb-4">Odblokowałeś 60 minut darmowej konsultacji!</p>
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Umów się teraz
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Challenge Friends */}
      <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-3xl p-8 border-2 border-orange-500/30">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div className="flex items-center gap-4">
            <Target className="w-12 h-12 text-orange-600" />
            <div>
              <h4 className="font-bold text-xl mb-1">🏆 Wyzwij znajomych!</h4>
              <p className="text-sm text-muted-foreground">Zobacz kto traci więcej - friendly competition</p>
            </div>
          </div>
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white" onClick={() => handleShare("whatsapp")}>
            <Trophy className="w-5 h-5 mr-2" />
            Wyślij wyzwanie
          </Button>
        </div>
      </div>
    </div>
  )
}
