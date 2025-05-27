"use client"

import { useState } from "react"

interface GameState {
  currentStep: number
  points: number
  level: string
  completedSteps: string[]
  pataCoins: number
  showPlans: boolean
}

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    currentStep: 0,
    points: 0,
    level: "Iniciante",
    completedSteps: [],
    pataCoins: 0,
    showPlans: false,
  })

  const getLevelFromPoints = (points: number): string => {
    if (points >= 800) return "Especialista"
    if (points >= 600) return "Ouro"
    if (points >= 400) return "Prata"
    if (points >= 200) return "Bronze"
    return "Iniciante"
  }

  const nextStep = () => {
    setGameState((prev) => {
      const newStep = prev.currentStep + 1
      console.log("NextStep chamado - Step anterior:", prev.currentStep, "Novo step:", newStep)
      return {
        ...prev,
        currentStep: newStep,
      }
    })
  }

  const addPoints = (points: number) => {
    setGameState((prev) => {
      const newPoints = prev.points + points
      const newLevel = getLevelFromPoints(newPoints)

      if (newLevel !== prev.level && window.playLevelUpSound) {
        window.playLevelUpSound()
      } else if (window.playSuccessSound) {
        window.playSuccessSound()
      }

      return {
        ...prev,
        points: newPoints,
        level: newLevel,
      }
    })
  }

  const addPataCoins = (coins: number) => {
    setGameState((prev) => ({
      ...prev,
      pataCoins: prev.pataCoins + coins,
    }))

    if (window.playRewardSound) {
      window.playRewardSound()
    }
  }

  const completeStep = (stepName: string) => {
    setGameState((prev) => {
      if (prev.completedSteps.includes(stepName)) {
        return prev // Não fazer nada se já completou
      }

      const newCompletedSteps = [...prev.completedSteps, stepName]
      const showPlans = newCompletedSteps.length >= 5

      return {
        ...prev,
        completedSteps: newCompletedSteps,
        showPlans,
      }
    })
  }

  return {
    ...gameState,
    nextStep,
    addPoints,
    addPataCoins,
    completeStep,
  }
}
