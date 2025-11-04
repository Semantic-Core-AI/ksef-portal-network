import { Hero } from "@/components/landing/Hero"
import { KeyFeatures } from "@/components/landing/key-features"
import { KeyFunctions } from "@/components/landing/key-functions"
import { CTASection } from "@/components/landing/cta-section"
import { ProblemSolution } from "@/components/landing/problem-solution"
import { TrustIndicatorsNew } from "@/components/landing/trust-indicators-new"
import { ChallengesSolutions } from "@/components/landing/challenges-solutions"
import { KnowledgeGraphStats } from "@/components/landing/knowledge-graph-stats"

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <KeyFeatures />
      <KnowledgeGraphStats />
      <KeyFunctions />
      <CTASection />
      <TrustIndicatorsNew />
      <ChallengesSolutions />
    </>
  )
}
