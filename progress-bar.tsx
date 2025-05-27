import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Star, Zap } from "lucide-react"

interface ProgressBarProps {
  points: number
  level: string
}

export function ProgressBar({ points, level }: ProgressBarProps) {
  const maxPoints = 1000
  const progress = (points / maxPoints) * 100

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Bronze":
        return "bg-orange-500"
      case "Prata":
        return "bg-gray-400"
      case "Ouro":
        return "bg-yellow-500"
      case "Especialista":
        return "bg-purple-500"
      default:
        return "bg-green-500"
    }
  }

  return (
    <div className="bg-white border-b border-green-100 py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Progresso da Transformação</span>
          </div>

          <Badge className={`${getLevelColor(level)} text-white`}>
            <Star className="w-3 h-3 mr-1" />
            {level}
          </Badge>
        </div>

        <div className="flex items-center space-x-3">
          <Progress value={progress} className="flex-1 h-3" />
          <span className="text-sm font-bold text-gray-700">
            {points}/{maxPoints}
          </span>
        </div>

        <div className="mt-1 text-xs text-gray-500">
          {progress < 20 && "Você está começando sua jornada! 🌱"}
          {progress >= 20 && progress < 50 && "Ótimo progresso! Continue assim! 🚀"}
          {progress >= 50 && progress < 80 && "Você está entre os 20% mais dedicados! ⭐"}
          {progress >= 80 && "Quase um especialista! Incrível! 🏆"}
        </div>
      </div>
    </div>
  )
}
