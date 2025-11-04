"use client"

import { Card } from "@/components/ui/card"

export function KeyFunctions() {
  const functions = [
    {
      title: "Prawdziwa baza wiedzy",
      description: "500+ interpretacji prawnych",
      href: "/baza-wiedzy",
      badge: null,
    },
    {
      title: "Mapa wiedzy",
      description: "Interaktywna wizualizacja powiązań",
      href: "#",
      badge: "WKRÓTCE",
    },
    {
      title: "Centrum pytań",
      description: "Odpowiedzi na najczęstsze pytania",
      href: "#pytania",
      badge: "WKRÓTCE",
    },
    {
      title: "Quiz gotowości",
      description: "Sprawdź swoją gotowość",
      href: "#quiz",
      badge: "WKRÓTCE",
    },
    {
      title: "Kalkulator NIE wdrożenia",
      description: "Policz ile tracisz PLN każdego dnia",
      href: "/kalkulator",
      badge: null,
    },
  ]

  return (
    <section className="bg-white py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-ksef-navy mb-12 text-center">
          Kluczowe funkcje
        </h2>

        {/* Functions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {functions.map((func, index) => {
            const CardContent = (
              <Card className={`p-8 border-2 border-gray-200 rounded-xl hover:shadow-xl hover:border-ksef-gold transition-all duration-300 bg-white h-full relative overflow-hidden ${func.badge ? 'cursor-default opacity-75' : 'cursor-pointer'}`}>
                {/* Gold Badge */}
                {func.badge && (
                  <span className="absolute top-3 right-3 px-2 py-1 bg-[#C7A83B] text-white text-xs font-bold rounded-full shadow-md">
                    {func.badge}
                  </span>
                )}

                {/* Title */}
                <h3 className={`font-[family-name:var(--font-display)] text-xl md:text-2xl font-semibold text-ksef-navy mb-3 transition-colors pr-20 ${!func.badge && 'group-hover:text-ksef-gold'}`}>
                  {func.title}
                </h3>

                {/* Description */}
                <p className="text-ksef-muted text-base leading-relaxed">{func.description}</p>
              </Card>
            )

            return func.badge ? (
              <div key={index} className="block">
                {CardContent}
              </div>
            ) : (
              <a key={index} href={func.href} className="block group">
                {CardContent}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
