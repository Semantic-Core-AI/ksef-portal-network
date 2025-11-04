"use client"

import { useState } from "react"
import { IntroScreen } from "@/components/intro-screen"
import { Question1Revenue } from "@/components/question-1-revenue"
import { Question2InvoiceVolume } from "@/components/question-2-invoice-volume"
import { LoadingAnimation } from "@/components/loading-animation"
import { Phase2Disaster } from "@/components/phase-2-disaster"
import { Phase3Solution } from "@/components/phase-3-solution"
import { ResultsPage } from "@/components/results-page"
import { calculateKSEFImpact, type CalculatorInputs } from "@/lib/calculator-logic"

type Step = "intro" | "q1" | "q2" | "loading" | "disaster" | "solution" | "results"

interface RevenueOption {
  value: number
  label: string
  description: string
}

interface VolumeOption {
  value: number
  label: string
  description: string
}

export default function CalculatorPage() {
  const [currentStep, setCurrentStep] = useState<Step>("intro")
  const [selectedRevenue, setSelectedRevenue] = useState<RevenueOption | null>(null)
  const [selectedVolume, setSelectedVolume] = useState<VolumeOption | null>(null)
  const [calculationResults, setCalculationResults] = useState<ReturnType<typeof calculateKSEFImpact> | null>(null)

  const handleStartCalculator = () => {
    setCurrentStep("q1")
  }

  const handleQ1Next = (revenue: RevenueOption) => {
    setSelectedRevenue(revenue)
    setCurrentStep("q2")
  }

  const handleCalculate = (volume: VolumeOption) => {
    setSelectedVolume(volume)

    if (selectedRevenue) {
      const inputs: CalculatorInputs = {
        revenue: selectedRevenue.value,
        invoiceVolume: volume.value,
      }

      const results = calculateKSEFImpact(inputs)
      setCalculationResults(results)
      setCurrentStep("loading")
    }
  }

  const handleLoadingComplete = () => {
    setCurrentStep("disaster")
  }

  const handleDisasterNext = () => {
    setCurrentStep("solution")
  }

  const handleSolutionFinish = () => {
    setCurrentStep("results")
  }

  const handleRestart = () => {
    setCurrentStep("intro")
    setSelectedRevenue(null)
    setSelectedVolume(null)
    setCalculationResults(null)
  }

  const handleBackToIntro = () => {
    setCurrentStep("intro")
  }

  const handleBackToQ1 = () => {
    setCurrentStep("q1")
  }

  const handleBackToQ2 = () => {
    setCurrentStep("q2")
  }

  const handleBackToDisaster = () => {
    setCurrentStep("disaster")
  }

  const handleBackToSolution = () => {
    setCurrentStep("solution")
  }

  return (
    <div className="min-h-screen hero-gradient">
      {currentStep === "intro" && <IntroScreen onStart={handleStartCalculator} />}

      {currentStep === "q1" && (
        <Question1Revenue selectedRevenue={selectedRevenue} onNext={handleQ1Next} onBack={handleBackToIntro} />
      )}

      {currentStep === "q2" && (
        <Question2InvoiceVolume selectedVolume={selectedVolume} onCalculate={handleCalculate} onBack={handleBackToQ1} />
      )}

      {currentStep === "loading" && <LoadingAnimation onComplete={handleLoadingComplete} />}

      {currentStep === "disaster" && calculationResults && selectedRevenue && selectedVolume && (
        <Phase2Disaster
          revenue={selectedRevenue}
          volume={selectedVolume}
          results={calculationResults}
          onNext={handleDisasterNext}
          onBack={handleBackToQ2}
        />
      )}

      {currentStep === "solution" && calculationResults && selectedRevenue && selectedVolume && (
        <Phase3Solution
          revenue={selectedRevenue}
          volume={selectedVolume}
          results={calculationResults}
          onFinish={handleSolutionFinish}
          onBack={handleBackToDisaster}
        />
      )}

      {currentStep === "results" && calculationResults && selectedRevenue && selectedVolume && (
        <ResultsPage
          revenue={selectedRevenue}
          volume={selectedVolume}
          results={calculationResults}
          onRestart={handleRestart}
          onBack={handleBackToSolution}
        />
      )}
    </div>
  )
}
