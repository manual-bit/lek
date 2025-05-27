"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight } from "lucide-react"

interface QuizSectionProps {
  onComplete: (data: any) => void
  isCompleted: boolean
}

export function QuizSection({ onComplete, isCompleted }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const questions = [
    {
      question: "Há quanto tempo seu cão faz xixi em casa?",
      options: ["Menos de 1 mês", "1-3 meses", "3-6 meses", "Mais de 6 meses"],
    },
    {
      question: "Qual é o porte do seu cão?",
      options: ["Pequeno (até 10kg)", "Médio (10-25kg)", "Grande (25-40kg)", "Gigante (mais de 40kg)"],
    },
    {
      question: "Quantas vezes por dia ele faz xixi em casa?",
      options: ["1-2 vezes", "3-5 vezes", "6-10 vezes", "Mais de 10 vezes"],
    },
    {
      question: "Você já tentou algum método de treinamento?",
      options: ["Nunca tentei", "Tentei por conta própria", "Já paguei adestrador", "Tentei vários métodos"],
    },
  ]

  const handleAnswer = (answer: string) => {
    // Tocar som de clique
    if (window.playClickSound) {
      window.playClickSound()
    }

    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      // Avançar para próxima pergunta
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Última pergunta - mostrar resultados
      setShowResults(true)
      setTimeout(() => {
        onComplete(newAnswers)
      }, 2000)
    }
  }

  if (isCompleted) {
    return (
      <section data-section="quiz" className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-green-200">
            <CardContent className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Diagnóstico Concluído! 🎉</h3>
              <p className="text-gray-600">
                Você ganhou <span className="font-bold text-green-600">200 pontos</span> e{" "}
                <span className="font-bold text-yellow-600">50 PataCoins</span>!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  if (showResults) {
    return (
      <section data-section="quiz" className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-8">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">🧠</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Analisando seu perfil...</h3>
                <p className="text-gray-600">Criando estratégia personalizada para seu pet</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section data-section="quiz" className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Badge className="bg-blue-100 text-blue-800 mb-4">Etapa 1: Diagnóstico Personalizado</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Vamos Conhecer Seu Pet 🐕</h2>
          <p className="text-gray-600 mb-6">Responda 4 perguntas rápidas para receber um plano personalizado</p>

          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${index <= currentQuestion ? "bg-green-500" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">
              Pergunta {currentQuestion + 1} de {questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold text-center mb-6">{questions[currentQuestion].question}</h3>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full p-4 text-left justify-start hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                  onClick={() => handleAnswer(option)}
                >
                  <span className="mr-3 w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
