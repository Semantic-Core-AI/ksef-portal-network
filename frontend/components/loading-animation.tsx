"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Loader2, Lightbulb } from "lucide-react"
import { useEffect, useState } from "react"

interface LoadingAnimationProps {
  onComplete: () => void
}

const steps = [
  { id: 1, label: "Analizuję sytuację Twojej firmy", duration: 700 },
  { id: 2, label: "Obliczam potencjalne kary i sankcje", duration: 800 },
  { id: 3, label: "Szacuję stracony czas i zasoby", duration: 700 },
  { id: 4, label: "Porównuję koszty z rynkiem", duration: 800 },
]

export function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let stepTimer: NodeJS.Timeout
    let progressTimer: NodeJS.Timeout

    const totalDuration = steps.reduce((acc, step) => acc + step.duration, 0)
    const progressIncrement = 100 / totalDuration

    // Progress bar animation
    progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prev + progressIncrement * 50
      })
    }, 50)

    // Step progression
    const runSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i)
        await new Promise((resolve) => {
          stepTimer = setTimeout(resolve, steps[i].duration)
        })
      }
      setCurrentStep(steps.length)
      setTimeout(onComplete, 300)
    }

    runSteps()

    return () => {
      clearTimeout(stepTimer)
      clearInterval(progressTimer)
    }
  }, [onComplete])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E2A5E] via-[#1E2A5E]/90 to-[#1E2A5E]/80 diagonal-stripes flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C7A83B]/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C7A83B]/30 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl"
        >
          {/* Spinner */}
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Loader2 className="w-16 h-16 text-[#C7A83B]" />
            </motion.div>
          </div>

          {/* Title */}
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white text-center mb-8">
            Analizuję Twoje dane...
          </h2>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-white/80">Postęp</span>
              <span className="text-sm font-mono font-bold text-[#C7A83B]">{Math.round(progress)}%</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-[#C7A83B] to-[#C7A83B]/80"
              />
            </div>
          </div>

          {/* Steps checklist */}
          <div className="space-y-4 mb-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                  index < currentStep
                    ? "bg-success/20 border border-success/30"
                    : index === currentStep
                      ? "bg-[#C7A83B]/20 border border-[#C7A83B]/30"
                      : "bg-white/5 border border-white/10"
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
                ) : index === currentStep ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <Loader2 className="w-6 h-6 text-[#C7A83B] flex-shrink-0" />
                  </motion.div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-white/30 flex-shrink-0" />
                )}
                <span
                  className={`text-sm ${
                    index <= currentStep ? "text-white font-semibold" : "text-white/50"
                  }`}
                >
                  {step.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Fun fact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center p-4 bg-white/5 rounded-xl border border-white/10"
          >
            <p className="text-sm text-white/80 flex items-center justify-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#C7A83B] flex-shrink-0" />
              <span>
                <strong>Czy wiesz, że</strong> przeciętna firma traci{" "}
                <strong className="text-[#C7A83B]">32 000 PLN miesięcznie</strong> na nieefektywnym fakturowaniu?
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
