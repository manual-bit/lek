"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { HeroSection } from "@/components/hero-section"
import { QuizSection } from "@/components/quiz-section"
import { CalculatorSection } from "@/components/calculator-section"
import { ChallengeSection } from "@/components/challenge-section"
import { PetProfileSection } from "@/components/pet-profile-section"
import { RoutinePlannerSection } from "@/components/routine-planner-section"
import { PlansSection } from "@/components/plans-section"
import { SpecialOfferModal } from "@/components/special-offer-modal"
import { SoundManager } from "@/components/sound-manager"
import { ParticleSystem } from "@/components/particle-system"
import { SocialProof } from "@/components/social-proof"

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0)
  const [points, setPoints] = useState(0)
  const [level, setLevel] = useState("Iniciante")
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [pataCoins, setPataCoins] = useState(0)
  const [showSpecialOffer, setShowSpecialOffer] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    // Track page view quando a página carrega
    if (typeof window !== "undefined" && window.pixelId) {
      try {
        // @ts-ignore
        if (window.utmify_pixel) {
          // @ts-ignore
          window.utmify_pixel("track", "PageView", {
            content_name: "PataLimpa Funil",
            content_category: "Landing Page",
          })
        }
      } catch (error) {
        console.log("Erro no tracking:", error)
      }
    }
  }, [])

  const getLevelFromPoints = (points: number): string => {
    if (points >= 800) return "Especialista"
    if (points >= 600) return "Ouro"
    if (points >= 400) return "Prata"
    if (points >= 200) return "Bronze"
    return "Iniciante"
  }

  const handleStartJourney = () => {
    setCurrentStep(1)
    setTimeout(() => {
      const quizSection = document.querySelector('[data-section="quiz"]')
      if (quizSection) {
        quizSection.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  const handleStepComplete = (stepName: string, stepPoints: number, coins: number) => {
    if (completedSteps.includes(stepName)) return

    const newPoints = points + stepPoints
    const newLevel = getLevelFromPoints(newPoints)

    setPoints(newPoints)
    setLevel(newLevel)
    setPataCoins((prev) => prev + coins)
    setCompletedSteps((prev) => [...prev, stepName])
    setCurrentStep((prev) => prev + 1)

    // Trigger particle animation
    const newParticles = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 2000)

    // Auto scroll para próxima seção após 2 segundos
    setTimeout(() => {
      const sections = ["quiz", "calculator", "challenge", "profile", "routine", "plans"]
      const nextSection = sections[currentStep]
      if (nextSection) {
        const element = document.querySelector(`[data-section="${nextSection}"]`)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }, 2000)
  }

  const handleBasicPlanClick = () => {
    setShowSpecialOffer(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <SoundManager />
      <ParticleSystem particles={particles} />

      <Header currentStep={currentStep} pataCoins={pataCoins} level={level} />

      {currentStep > 0 && <ProgressBar points={points} level={level} />}

      <main className="relative">
        {/* HERO: só aparece se currentStep === 0 */}
        <HeroSection onStartJourney={handleStartJourney} currentStep={currentStep} />

        {/* SOCIAL PROOF: só aparece se currentStep === 0 */}
        {currentStep === 0 && <SocialProof />}

        {/* ETAPA 1: Quiz - só aparece se step === 1 E não foi completado */}
        {currentStep === 1 && !completedSteps.includes("quiz") && (
          <QuizSection onComplete={(data) => handleStepComplete("quiz", 200, 50)} isCompleted={false} />
        )}

        {/* ETAPA 2: Calculadora - só aparece se step === 2 E não foi completado */}
        {currentStep === 2 && !completedSteps.includes("calculator") && (
          <CalculatorSection onComplete={(data) => handleStepComplete("calculator", 150, 30)} isCompleted={false} />
        )}

        {/* ETAPA 3: Desafio - só aparece se step === 3 E não foi completado */}
        {currentStep === 3 && !completedSteps.includes("challenge") && (
          <ChallengeSection onComplete={() => handleStepComplete("challenge", 250, 75)} isCompleted={false} />
        )}

        {/* ETAPA 4: Perfil - só aparece se step === 4 E não foi completado */}
        {currentStep === 4 && !completedSteps.includes("profile") && (
          <PetProfileSection onComplete={(data) => handleStepComplete("profile", 100, 25)} isCompleted={false} />
        )}

        {/* ETAPA 5: Rotina - só aparece se step === 5 E não foi completado */}
        {currentStep === 5 && !completedSteps.includes("routine") && (
          <RoutinePlannerSection onComplete={(data) => handleStepComplete("routine", 300, 100)} isCompleted={false} />
        )}

        {/* PLANOS: só aparece quando completou todas as 5 etapas */}
        {currentStep >= 6 && <PlansSection onBasicPlanClick={handleBasicPlanClick} pataCoins={pataCoins} />}
      </main>

      <SpecialOfferModal isOpen={showSpecialOffer} onClose={() => setShowSpecialOffer(false)} />
    </div>
  )
}
