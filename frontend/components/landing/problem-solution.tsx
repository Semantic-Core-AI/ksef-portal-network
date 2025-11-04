"use client"

import type React from "react"

import {
  AlertTriangle,
  Clock,
  FileQuestion,
  Scale,
  CheckCircle2,
  Lightbulb,
  Shield,
  Zap,
  ArrowRight,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PainPoint {
  icon: React.ReactNode
  title: string
  description: string
}

interface SolutionPoint {
  icon: React.ReactNode
  title: string
  description: string
}

export function ProblemSolution() {
  const problems: PainPoint[] = [
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Niejasne przepisy i częste zmiany",
      description: "Ustawa o KSeF zmienia się co miesiąc. Trudno nadążyć za interpretacjami Ministerstwa Finansów.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Brak czasu na analizę wymogów",
      description:
        "Właściciele firm i księgowi mają pełne ręce roboty. Nie ma czasu na czytanie 200+ stron dokumentacji.",
    },
    {
      icon: <FileQuestion className="w-6 h-6" />,
      title: "Niepewność czy firma jest gotowa",
      description: "Nie wiesz czy Twoja firma spełnia wszystkie wymogi techniczne i prawne do wdrożenia KSeF.",
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Ryzyko kar finansowych",
      description:
        "Brak wdrożenia do 1 lutego 2026 oznacza kary do 500 PLN za każdą fakturę. To może być milionowe straty.",
    },
  ]

  const solutions: SolutionPoint[] = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Wszystko w jednym miejscu",
      description: "Zebrane 500+ interpretacji, przepisy, FAQ i praktyczne poradniki w przejrzystej formie.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Sprawdź gotowość w 5 minut",
      description: "Interaktywny quiz ocenia Twoją firmę i pokazuje dokładnie co musisz zrobić przed deadline.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Weryfikowane przez ekspertów",
      description:
        "50 ekspertów SKwP i doradców podatkowych sprawdza każdą informację. Możesz być pewny, że to aktualne.",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Aktualizacje w czasie rzeczywistym",
      description: "Śledzimy zmiany legislacyjne i automatycznie aktualizujemy treści. Zawsze masz najnowsze info.",
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-ksef-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-ksef-navy mb-4">
            Wdrożenie KSeF nie musi być <span className="text-red-600">koszmarem</span>
          </h2>
          <p className="text-lg text-ksef-muted max-w-3xl mx-auto">
            Rozumiemy wyzwania, przed którymi stają polskie firmy. Dlatego stworzyliśmy kompleksowe rozwiązanie, które
            eliminuje wszystkie bóle głowy.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* LEFT: PROBLEMS */}
          <div>
            {/* Problem Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-4">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-red-700 uppercase tracking-wide">Typowe problemy</span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold text-ksef-navy mb-3">Czy to Cię frustruje?</h3>
              <p className="text-ksef-muted">Większość firm zmaga się z tymi samymi wyzwaniami</p>
            </div>

            {/* Problem Cards */}
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <Card key={index} className="border-l-4 border-red-500 hover:border-red-600 transition-colors p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                      {problem.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ksef-navy mb-2">{problem.title}</h4>
                      <p className="text-sm text-ksef-muted leading-relaxed">{problem.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Problem Summary */}
            <div className="mt-8 p-6 bg-red-50 border-2 border-red-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-900 mb-1">Bez działania ryzykujesz:</p>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Kary finansowe do 500 PLN za fakturę</li>
                    <li>• Problemy z płynnością finansową</li>
                    <li>• Utratę wiarygodności u kontrahentów</li>
                    <li>• Chaos operacyjny w księgowości</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: SOLUTIONS */}
          <div>
            {/* Solution Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full mb-4">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">Nasze rozwiązanie</span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold text-ksef-navy mb-3">KSEF.EXPERT pomaga!</h3>
              <p className="text-ksef-muted">Kompleksowa platforma eliminująca wszystkie przeszkody</p>
            </div>

            {/* Solution Cards */}
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <Card key={index} className="border-l-4 border-green-500 hover:border-ksef-gold transition-colors p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                      {solution.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ksef-navy mb-2">{solution.title}</h4>
                      <p className="text-sm text-ksef-muted leading-relaxed">{solution.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Solution Summary / CTA */}
            <div className="mt-8 p-6 bg-gradient-to-br from-ksef-gold/10 to-green-50 border-2 border-ksef-gold rounded-xl">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-ksef-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-ksef-navy mb-1">Z KSEF.EXPERT zyskujesz:</p>
                  <ul className="text-sm text-ksef-navy/80 space-y-1">
                    <li>• Pewność, że wszystko robisz dobrze</li>
                    <li>• Oszczędność dziesiątek godzin researchu</li>
                    <li>• Uniknięcie kar i problemów prawnych</li>
                    <li>• Wsparcie 50 ekspertów SKwP</li>
                  </ul>
                </div>
              </div>

              <Button variant="default" className="w-full" size="lg">
                Sprawdź gotowość mojej firmy
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl font-bold text-ksef-gold mb-2 font-mono">97</div>
            <div className="text-sm text-ksef-muted">Dni do wdrożenia</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl font-bold text-green-600 mb-2 font-mono">5min</div>
            <div className="text-sm text-ksef-muted">Czas na quiz</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl font-bold text-ksef-blue mb-2 font-mono">0zł</div>
            <div className="text-sm text-ksef-muted">Koszt oceny gotowości</div>
          </div>
        </div>
      </div>
    </section>
  )
}
