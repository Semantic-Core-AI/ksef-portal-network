"use client"

import { motion } from "framer-motion"
import { Users, TrendingUp, Award, Star, Shield, CheckCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function SocialProofBanner() {
  const recentUsers = [
    { initials: "JK", name: "Jan Kowalski" },
    { initials: "AM", name: "Anna Malinowska" },
    { initials: "PW", name: "Piotr Wiśniewski" },
    { initials: "MN", name: "Maria Nowak" },
    { initials: "KZ", name: "Krzysztof Zieliński" },
  ]

  return (
    <div className="space-y-6 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-8 shadow-xl"
      >
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mb-3">
              <Users className="w-7 h-7 text-success" />
            </div>
            <div className="text-4xl font-black mb-1">2,847</div>
            <div className="text-sm text-muted-foreground">firm już sprawdziło</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <TrendingUp className="w-7 h-7 text-primary" />
            </div>
            <div className="text-4xl font-black mb-1">156M PLN</div>
            <div className="text-sm text-muted-foreground">potencjalnych strat wykrytych</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-3">
              <Award className="w-7 h-7 text-accent" />
            </div>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-4xl font-black">4.9</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${star <= 4 ? "fill-accent text-accent" : "fill-accent/30 text-accent/30"}`}
                  />
                ))}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">średnia ocena (847 opinii)</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {recentUsers.map((user, index) => (
                <Avatar key={index} className="w-10 h-10 border-2 border-white">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs font-bold">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="text-sm">
              <div className="font-semibold">127 osób</div>
              <div className="text-muted-foreground">sprawdziło w ostatnich 24h</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-success">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Ostatnia kalkulacja: 3 minuty temu</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-2xl p-6 border border-border shadow-lg"
      >
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-success" />
            <span className="font-semibold text-foreground">100% bezpieczne</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-border" />
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Zgodne z RODO</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-border" />
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-accent" />
            <span className="font-semibold text-foreground">Rekomendowane przez ekspertów</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-border" />
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-warning fill-warning" />
            <span className="font-semibold text-foreground">Najwyżej oceniane</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
