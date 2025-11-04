"use client"

import { motion } from "framer-motion"
import { Lightbulb, Shield, Zap, Target } from "lucide-react"

const tips = [
  {
    icon: Lightbulb,
    title: "Dlaczego KSeF jest obowiązkowy?",
    content:
      "Od 1 lipca 2026 wszystkie firmy w Polsce muszą wystawiać faktury przez Krajowy System e-Faktur. To część cyfryzacji administracji i walki z luką VAT.",
  },
  {
    icon: Shield,
    title: "Jakie są kary za brak wdrożenia?",
    content:
      "Kary mogą wynosić od 500 do 10,000 PLN za każdą nieprawidłową fakturę. Dodatkowo ryzykujesz kontrole skarbowe i problemy z rozliczeniem VAT.",
  },
  {
    icon: Zap,
    title: "Ile czasu zajmuje wdrożenie?",
    content:
      "Profesjonalne wdrożenie KSeF zajmuje 6-8 tygodni. Obejmuje integrację z systemem księgowym, szkolenia i testy. Im wcześniej zaczniesz, tym bezpieczniej.",
  },
  {
    icon: Target,
    title: "Jakie korzyści daje KSeF?",
    content:
      "Szybsze zwroty VAT, automatyzacja procesów, mniej błędów, lepsza kontrola nad fakturami i zgodność z przepisami. To inwestycja która się zwraca.",
  },
]

export function EducationalTips() {
  return (
    <div className="mb-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <h3 className="text-2xl font-bold text-center mb-8">Najczęściej zadawane pytania</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {tips.map((tip, index) => {
            const Icon = tip.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-card rounded-2xl p-6 border-2 border-border shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground">{tip.content}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
