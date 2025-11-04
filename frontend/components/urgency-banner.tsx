"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Clock } from "lucide-react"
import { CountdownTimer } from "@/components/countdown-timer"

interface UrgencyBannerProps {
  dailyLoss: number
}

export function UrgencyBanner({ dailyLoss }: UrgencyBannerProps) {
  const ksefDeadline = new Date("2026-07-01T00:00:00")

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-r from-destructive/10 via-warning/10 to-destructive/10 border-2 border-destructive/30 rounded-2xl p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <div>
            <div className="font-bold text-lg mb-1">Każdy dzień zwłoki kosztuje Twoją firmę</div>
            <div className="text-2xl font-black text-destructive">
              {new Intl.NumberFormat("pl-PL", {
                style: "currency",
                currency: "PLN",
                minimumFractionDigits: 0,
              }).format(dailyLoss)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-2">Czas do obowiązkowego KSeF:</div>
            <div className="flex gap-2">
              <CountdownTimer targetDate={ksefDeadline} className="scale-75 origin-left" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
