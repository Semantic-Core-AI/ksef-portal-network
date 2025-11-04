"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CountdownTimerProps {
  targetDate: Date
  className?: string
}

export function CountdownTimer({ targetDate, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className={`flex gap-4 ${className}`}>
      {Object.entries(timeLeft).map(([unit, value], index) => (
        <motion.div
          key={unit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="bg-primary text-primary-foreground rounded-lg px-4 py-3 min-w-[70px] text-center">
            <div className="text-3xl font-bold font-mono tabular-nums">{String(value).padStart(2, "0")}</div>
          </div>
          <div className="text-xs text-white mt-2 uppercase tracking-wider font-medium">
            {unit === "days" && "Dni"}
            {unit === "hours" && "Godz"}
            {unit === "minutes" && "Min"}
            {unit === "seconds" && "Sek"}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
