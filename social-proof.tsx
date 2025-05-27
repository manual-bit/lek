"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Users, MessageCircle } from "lucide-react"

export function SocialProof() {
  const [activeUsers, setActiveUsers] = useState(47)
  const [recentActivity, setRecentActivity] = useState("")

  const activities = [
    "Maria acabou de completar o diagnóstico",
    "João desbloqueou o nível Bronze",
    "Ana economizou R$ 240 este ano",
    "Pedro completou o desafio do Dia 1",
    "Carla criou o perfil do seu pet",
    "Lucas finalizou sua rotina personalizada",
  ]

  useEffect(() => {
    // Simular usuários ativos
    const userTimer = setInterval(() => {
      setActiveUsers((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1
        return Math.max(30, Math.min(80, prev + change))
      })
    }, 3000)

    // Simular atividades recentes
    const activityTimer = setInterval(() => {
      const randomActivity = activities[Math.floor(Math.random() * activities.length)]
      setRecentActivity(randomActivity)
    }, 5000)

    // Definir atividade inicial
    setRecentActivity(activities[0])

    return () => {
      clearInterval(userTimer)
      clearInterval(activityTimer)
    }
  }, [])

  return (
    <div className="fixed bottom-4 left-4 z-30 space-y-2 max-w-xs">
      <Badge className="bg-green-100 text-green-800 shadow-lg text-xs px-2 py-1">
        <Users className="w-3 h-3 mr-1" />
        {activeUsers} pessoas fazendo diagnóstico
      </Badge>

      {recentActivity && (
        <Badge className="bg-blue-100 text-blue-800 shadow-lg animate-pulse text-xs px-2 py-1 block">
          <MessageCircle className="w-3 h-3 mr-1 inline" />
          <span className="break-words">{recentActivity}</span>
        </Badge>
      )}
    </div>
  )
}
