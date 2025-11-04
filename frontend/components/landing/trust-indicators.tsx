"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Building2, FileText, Users, Award, CheckCircle2, Shield } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Stat {
  icon: React.ReactNode
  value: string
  label: string
  sublabel: string
  color: "navy" | "blue" | "gold" | "green"
}

export function TrustIndicators() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const stats: Stat[] = [
    {
      icon: <Building2 className="w-8 h-8" />,
      value: "3.1M",
      label: "Polskich firm",
      sublabel: "musi wdrożyć KSeF",
      color: "navy",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      value: "500+",
      label: "Interpretacji prawnych",
      sublabel: "dostępnych w bazie",
      color: "blue",
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: "50",
      label: "Ekspertów SKwP",
      sublabel: "wspiera portal",
      color: "gold",
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "24/7",
      label: "Wsparcie online",
      sublabel: "dla wszystkich użytkowników",
      color: "green",
    },
  ]

  // Partners - nazwy pozostają po polsku (specyficzne dla Polski)
  const partners = [
    {
      name: "Ministerstwo Finansów",
      role: "Partner merytoryczny",
      verified: true,
    },
    {
      name: "SKwP",
      role: "Stowarzyszenie Księgowych",
      verified: true,
    },
    {
      name: "PIBR",
      role: "Polska Izba Biegłych Rewidentów",
      verified: true,
    },
  ]

  const getColorClasses = (color: Stat["color"]) => {
    const colors = {
      navy: "bg-[#1E2A5E]/10 text-[#1E2A5E]",
      blue: "bg-[#3B82F6]/10 text-[#3B82F6]",
      gold: "bg-[#C7A83B]/10 text-[#C7A83B]",
      green: "bg-green-50 text-green-700",
    }
    return colors[color]
  }

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1E2A5E]/5 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4 text-[#1E2A5E]" />
            <span className="text-sm font-semibold text-[#1E2A5E] uppercase tracking-wide">
              Zaufani przez tysiące firm
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-[#1E2A5E] mb-4">Liczby mówią same za siebie</h2>

          <p className="text-lg text-[#64748B] max-w-3xl mx-auto">
            Jesteśmy największym niezależnym źródłem wiedzy o KSeF w Polsce, wspieranym przez czołowych ekspertów branżowych.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`text-center transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${getColorClasses(stat.color)}`}
              >
                {stat.icon}
              </div>

              {/* Value */}
              <div className="mb-2">
                <span className="text-4xl md:text-5xl font-bold text-[#1E2A5E] font-mono">{stat.value}</span>
              </div>

              {/* Label */}
              <p className="text-sm font-semibold text-[#1E2A5E] leading-snug mb-1">{stat.label}</p>
              <p className="text-xs text-[#64748B]">{stat.sublabel}</p>
            </Card>
          ))}
        </div>

        {/* Partners Section - nazwy firm pozostają po polsku */}
        <div className="bg-[#F8FAFC] rounded-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-[#1E2A5E] mb-3">Nasi partnerzy merytoryczni</h3>
            <p className="text-[#64748B]">Współpracujemy z wiodącymi instytucjami branżowymi w Polsce</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center border-2 border-transparent hover:border-[#C7A83B] transition-all duration-300"
              >
                {/* Partner Badge */}
                <div className="w-16 h-16 bg-[#1E2A5E] rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{partner.name.substring(0, 2)}</span>
                </div>

                {/* Partner Name */}
                <div className="mb-2">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h4 className="text-lg font-bold text-[#1E2A5E]">{partner.name}</h4>
                    {partner.verified && <CheckCircle2 className="w-5 h-5 text-[#C7A83B]" />}
                  </div>
                  <p className="text-sm text-[#64748B]">{partner.role}</p>
                </div>

                {/* Verified Badge */}
                {partner.verified && (
                  <div className="inline-flex items-center gap-1 bg-[#C7A83B]/10 px-3 py-1 rounded-full mt-3">
                    <span className="text-xs font-semibold text-[#C7A83B]">Zweryfikowany partner</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
