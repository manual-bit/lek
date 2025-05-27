"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, Calendar, Clock } from "lucide-react"

interface RoutinePlannerSectionProps {
  onComplete: (data: any) => void
  isCompleted: boolean
}

export function RoutinePlannerSection({ onComplete, isCompleted }: RoutinePlannerSectionProps) {
  const [selectedTimes, setSelectedTimes] = useState<string[]>([])
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])

  const timeSlots = [
    "06:00 - Primeira saída",
    "08:00 - Após café da manhã",
    "12:00 - Meio-dia",
    "15:00 - Tarde",
    "18:00 - Final da tarde",
    "21:00 - Antes de dormir",
  ]

  const activities = [
    "Passeio de 15 minutos",
    "Brincadeira no quintal",
    "Treinamento com petiscos",
    "Momento de carinho",
    "Hidratação supervisionada",
  ]

  const handleTimeToggle = (time: string) => {
    setSelectedTimes((prev) => (prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]))
  }

  const handleActivityToggle = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity],
    )
  }

  const handleComplete = () => {
    onComplete({
      times: selectedTimes,
      activities: selectedActivities,
    })
  }

  if (isCompleted) {
    return (
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-indigo-200">
            <CardContent className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Rotina Personalizada Criada! 📅</h3>
              <p className="text-gray-600">
                Você ganhou <span className="font-bold text-indigo-600">300 pontos</span> e{" "}
                <span className="font-bold text-yellow-600">100 PataCoins</span>!
              </p>
              <div className="mt-4">
                <Badge className="bg-purple-100 text-purple-800">🏆 Nível Bronze Desbloqueado!</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Badge className="bg-indigo-100 text-indigo-800 mb-4">Etapa 5: Planejador de Rotina</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Crie a Rotina Perfeita 📅</h2>
          <p className="text-gray-600">Monte um cronograma personalizado para o sucesso do treinamento</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-indigo-600" />
                Horários de Saída
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {timeSlots.map((time) => (
                  <div key={time} className="flex items-center space-x-2">
                    <Checkbox
                      id={time}
                      checked={selectedTimes.includes(time)}
                      onCheckedChange={() => handleTimeToggle(time)}
                    />
                    <label htmlFor={time} className="text-sm font-medium">
                      {time}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
                Atividades Complementares
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div key={activity} className="flex items-center space-x-2">
                    <Checkbox
                      id={activity}
                      checked={selectedActivities.includes(activity)}
                      onCheckedChange={() => handleActivityToggle(activity)}
                    />
                    <label htmlFor={activity} className="text-sm font-medium">
                      {activity}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Button
            onClick={handleComplete}
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 text-lg"
            disabled={selectedTimes.length === 0}
          >
            Finalizar Rotina (+300 pontos)
          </Button>
          <p className="text-sm text-gray-600 mt-2">Selecione pelo menos um horário para continuar</p>
        </div>
      </div>
    </section>
  )
}
