"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Building2, FileText, Users, Award, CheckCircle2, Shield } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Stat {
  icon: React.ReactNode
  value: string
  label: string
  suffix?: string
  color: "navy" | "blue" | "gold" | "green"
}

export function TrustIndicatorsNew() {
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
      label: "Polskich firm objętych obowiązkiem KSeF",
      color: "navy",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      value: "500+",
      label: "Interpretacji prawnych i przepisów",
      color: "blue",
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: "50",
      label: "Ekspertów SKwP i doradców podatkowych",
      color: "gold",
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "100%",
      label: "Aktualności - codzienne aktualizacje",
      color: "green",
    },
  ]

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
      navy: "bg-ksef-navy/10 text-ksef-navy",
      blue: "bg-ksef-blue/10 text-ksef-blue",
      gold: "bg-ksef-gold/10 text-ksef-gold",
      green: "bg-green-50 text-green-700",
    }
    return colors[color]
  }

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-ksef-navy/5 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4 text-ksef-navy" />
            <span className="text-sm font-semibold text-ksef-navy uppercase tracking-wide">
              Zaufali nam eksperci i instytucje
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-ksef-navy mb-4">Największa baza wiedzy o KSeF w Polsce</h2>

          <p className="text-lg text-ksef-muted max-w-3xl mx-auto">
            Współpracujemy z wiodącymi instytucjami i ekspertami, aby dostarczyć najbardziej kompleksowe i aktualne
            informacje o Krajowym Systemie e-Faktur
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
                <span className="text-4xl md:text-5xl font-bold text-ksef-navy font-mono">{stat.value}</span>
                {stat.suffix && <span className="text-2xl text-ksef-muted ml-1">{stat.suffix}</span>}
              </div>

              {/* Label */}
              <p className="text-sm text-ksef-muted leading-snug">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Partners Section */}
        <div className="bg-ksef-bg rounded-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-ksef-navy mb-3">Partnerzy merytoryczni</h3>
            <p className="text-ksef-muted">Współpracujemy z kluczowymi instytucjami w Polsce</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center border-2 border-transparent hover:border-ksef-gold transition-all duration-300"
              >
                {/* Partner Badge */}
                <div className="w-16 h-16 bg-ksef-navy rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{partner.name.substring(0, 2)}</span>
                </div>

                {/* Partner Name */}
                <div className="mb-2">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-ksef-navy">{partner.name}</h4>
                    {partner.verified && <CheckCircle2 className="w-5 h-5 text-ksef-gold" />}
                  </div>
                  <p className="text-sm text-ksef-muted">{partner.role}</p>
                </div>

                {/* Verified Badge */}
                {partner.verified && (
                  <div className="inline-flex items-center gap-1 bg-ksef-gold/10 px-3 py-1 rounded-full mt-3">
                    <span className="text-xs font-semibold text-ksef-gold">Zweryfikowany partner</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Trust Statement */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-ksef-muted">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Dane aktualizowane codziennie</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Weryfikowane przez ekspertów</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Zgodne z aktualnymi przepisami</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
