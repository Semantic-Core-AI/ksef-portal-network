"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Anna Kowalska",
    role: "Dyrektor Finansowy",
    company: "TechCorp Sp. z o.o.",
    content:
      "Kalkulator pokazał nam, że zwlekanie z wdrożeniem KSeF mogłoby kosztować nas ponad 200k PLN rocznie. Dzięki temu raportowi przekonaliśmy zarząd do natychmiastowego działania.",
    avatar: "AK",
  },
  {
    name: "Piotr Nowak",
    role: "Właściciel",
    company: "Nowak Trading",
    content:
      "Myślałem, że KSeF to tylko kolejny obowiązek. Kalkulator uświadomił mi, ile tracę przez nieefektywne procesy. ROI wdrożenia to ponad 800%!",
    avatar: "PN",
  },
  {
    name: "Magdalena Wiśniewska",
    role: "Główna Księgowa",
    company: "ProService Group",
    content:
      "Szczegółowy raport PDF pomógł nam zaplanować wdrożenie krok po kroku. Teraz jesteśmy gotowi na obowiązkowe KSeF i oszczędzamy czas całego zespołu.",
    avatar: "MW",
  },
]

export function TestimonialsSection() {
  return (
    <div className="mb-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <h3 className="text-2xl font-bold text-center mb-8">Co mówią inni przedsiębiorcy</h3>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-card rounded-2xl p-6 border-2 border-border shadow-lg relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-accent/20" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground italic">&ldquo;{testimonial.content}&rdquo;</p>

              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent">
                    ★
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
