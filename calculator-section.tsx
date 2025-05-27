"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingDown, CheckCircle } from "lucide-react"

interface CalculatorSectionProps {
  onComplete: (data: any) => void
  isCompleted: boolean
}

export function CalculatorSection({ onComplete, isCompleted }: CalculatorSectionProps) {
  const [monthlySpending, setMonthlySpending] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [savings, setSavings] = useState(0)

  const handleCalculate = () => {
    const monthly = Number.parseFloat(monthlySpending) || 0
    const yearlySpending = monthly * 12
    const yearlySavings = yearlySpending * 0.8 // 80% de economia
    setSavings(yearlySavings)
    setShowResults(true)
  }

  const handleComplete = () => {
    onComplete({ monthlySpending, savings })
    // Scroll para próxima seção
    setTimeout(() => {
      const nextSection = document.querySelector('[data-section="challenge"]')
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" })
      }
    }, 500)
  }

  if (isCompleted) {
    return (
      <section data-section="calculator" className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-blue-200">
            <CardContent className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Calculadora Concluída! 💰</h3>
              <p className="text-gray-600">
                Você ganhou <span className="font-bold text-blue-600">150 pontos</span> e{" "}
                <span className="font-bold text-yellow-600">30 PataCoins</span>!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section data-section="calculator" className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Badge className="bg-purple-100 text-purple-800 mb-4">Etapa 2: Calculadora de Economia</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Descubra Quanto Você Pode Economizar 💰</h2>
          <p className="text-gray-600">Veja o impacto financeiro da transformação do seu pet</p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <Calculator className="w-6 h-6 mr-2 text-purple-600" />
              Calculadora Personalizada
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showResults ? (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="spending">
                    Quanto você gasta por mês com produtos de limpeza, tapetes e desodorizantes?
                  </Label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                    <Input
                      id="spending"
                      type="number"
                      placeholder="0,00"
                      value={monthlySpending}
                      onChange={(e) => setMonthlySpending(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleCalculate}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={!monthlySpending}
                >
                  Calcular Minha Economia
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg">
                  <TrendingDown className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Sua Economia Anual</h3>
                  <p className="text-4xl font-bold text-green-600 mb-2">R$ {savings.toFixed(2)}</p>
                  <p className="text-gray-600">Com o método PataLimpa, você economizará até 80% dos gastos atuais!</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">Gasto Atual (ano)</p>
                    <p className="text-xl font-bold text-red-700">
                      R$ {(Number.parseFloat(monthlySpending) * 12).toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Novo Gasto (ano)</p>
                    <p className="text-xl font-bold text-green-700">
                      R$ {(Number.parseFloat(monthlySpending) * 12 - savings).toFixed(2)}
                    </p>
                  </div>
                </div>

                <Button onClick={handleComplete} className="w-full bg-green-600 hover:bg-green-700">
                  Continuar Jornada (+150 pontos)
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
