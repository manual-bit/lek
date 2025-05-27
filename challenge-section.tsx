"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Play, Gift } from "lucide-react"

interface ChallengeSectionProps {
  onComplete: () => void
  isCompleted: boolean
}

export function ChallengeSection({ onComplete, isCompleted }: ChallengeSectionProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showReward, setShowReward] = useState(false)

  const steps = [
    {
      title: "Prepare o Ambiente",
      description: "Remova todos os tapetes higiênicos da área onde seu cão costuma fazer xixi",
      action: "Ambiente Preparado",
    },
    {
      title: "Técnica do Redirecionamento",
      description: "Quando perceber que seu cão vai fazer xixi, diga 'NÃO' firmemente e leve-o para o local correto",
      action: "Técnica Aplicada",
    },
    {
      title: "Recompensa Imediata",
      description: "Assim que ele fizer xixi no local correto, elogie muito e dê um petisco",
      action: "Recompensa Dada",
    },
  ]

  const handleStepComplete = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowReward(true)
      setTimeout(() => {
        onComplete()
      }, 3000)
    }
  }

  if (isCompleted) {
    return (
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-yellow-200">
            <CardContent className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Desafio do Dia 1 Concluído! 🏆</h3>
              <p className="text-gray-600">
                Você ganhou <span className="font-bold text-yellow-600">250 pontos</span> e{" "}
                <span className="font-bold text-yellow-600">75 PataCoins</span>!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  if (showReward) {
    return (
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-8">
              <div className="animate-bounce">
                <Gift className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🎉 Parabéns! Você Desbloqueou:</h3>
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg mb-4">
                <h4 className="text-xl font-bold text-gray-900 mb-2">📚 E-book: "5 Erros Fatais no Treinamento"</h4>
                <p className="text-gray-600">
                  Guia exclusivo com os principais erros que impedem o sucesso no treinamento
                </p>
              </div>
              <p className="text-sm text-gray-500">Processando recompensa... Preparando próxima etapa...</p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Badge className="bg-orange-100 text-orange-800 mb-4">Etapa 3: Mini-Desafio do Dia 1</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Técnica Gratuita para Resultado Rápido ⚡</h2>
          <p className="text-gray-600">Aplique esta técnica HOJE e veja a diferença em 24 horas</p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <Play className="w-6 h-6 mr-2 text-orange-600" />
              Desafio do Dia 1
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-center mb-6">
                <div className="flex space-x-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${index <= currentStep ? "bg-orange-500" : "bg-gray-300"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Passo {currentStep + 1}: {steps[currentStep].title}
                </h3>
                <p className="text-gray-700 mb-4">{steps[currentStep].description}</p>

                <Button onClick={handleStepComplete} className="w-full bg-orange-600 hover:bg-orange-700">
                  ✅ {steps[currentStep].action}
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Passo {currentStep + 1} de {steps.length} •
                  <span className="font-bold text-orange-600"> +250 pontos</span> ao completar
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
