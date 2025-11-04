"use client"

import { AlertTriangle, Clock, DollarSign, GitMerge, Lightbulb, Zap, Shield, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ChallengesSolutions() {
  const challenges = [
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Skomplikowane przepisy",
      description: "Setki stron dokumentacji MF, niejasne interpretacje i ciągłe zmiany w regulacjach prawnych.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Napięty harmonogram",
      description: "Do wdrożenia KSeF zostało niewiele czasu, a proces integracji może zająć wiele miesięcy.",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Wysokie koszty błędów",
      description: "Nieprawidłowe wdrożenie może skutkować karami finansowymi i problemami z kontrolami skarbowymi.",
    },
    {
      icon: <GitMerge className="w-6 h-6" />,
      title: "Integracja systemów",
      description: "Konieczność dostosowania oprogramowania księgowego, ERP i innych systemów firmowych.",
    },
  ]

  const solutions = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Przejrzysty przewodnik",
      description: "Krok po kroku przeprowadzimy Cię przez cały proces wdrożenia KSeF - od podstaw do zaawansowanych zagadnień.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Gotowe narzędzia",
      description: "Quiz gotowości, walidatory faktur, kalkulatory terminów i szablony dokumentów - wszystko w jednym miejscu.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Wsparcie ekspertów",
      description: "Bezpośredni dostęp do certyfikowanych księgowych, doradców podatkowych i specjalistów SKwP.",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Aktualne informacje",
      description: "Baza wiedzy aktualizowana codziennie o nowe interpretacje, orzeczenia i zmiany w przepisach.",
    },
  ]

  return (
    <section className="bg-white py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E2A5E] mb-6">
            Co Cię czeka w 2026 roku?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Wdrożenie KSeF to ogromne wyzwanie dla każdej firmy. Poznaj typowe problemy i nasze rozwiązania.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT: Challenges */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="text-sm font-bold text-red-900 uppercase tracking-wide">Wyzwania</span>
              </div>
            </div>

            <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-[#1E2A5E] mb-6">
              Główne problemy firm
            </h3>
            <p className="text-base text-gray-600 mb-8">
              Z czym mierzą się przedsiębiorcy przygotowując się do KSeF?
            </p>

            <div className="space-y-4">
              {challenges.map((challenge, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-red-200 rounded-xl p-6 hover:shadow-lg hover:border-red-300 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                      {challenge.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-lg text-[#1E2A5E] mb-2">{challenge.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{challenge.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Solutions */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-bold text-green-900 uppercase tracking-wide">Rozwiązania</span>
              </div>
            </div>

            <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-[#1E2A5E] mb-6">
              Twoje rozwiązanie
            </h3>
            <p className="text-base text-gray-600 mb-8">
              Jak pomożemy Ci wdrożyć KSeF sprawnie i bez stresu?
            </p>

            <div className="space-y-4 mb-8">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-green-200 rounded-xl p-6 hover:shadow-lg hover:border-green-300 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                      {solution.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-lg text-[#1E2A5E] mb-2">{solution.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{solution.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="bg-gradient-to-br from-[#C7A83B]/10 to-[#C7A83B]/5 border-2 border-[#C7A83B] rounded-xl p-6">
              <Button
                size="lg"
                className="w-full bg-[#C7A83B] text-[#1E2A5E] hover:bg-[#C7A83B]/90 text-base md:text-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Rozpocznij wdrożenie KSeF
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
