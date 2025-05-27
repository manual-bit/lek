import { Badge } from "@/components/ui/badge"
import { Coins, Trophy } from "lucide-react"

interface HeaderProps {
  currentStep: number
  pataCoins: number
  level: string
}

export function Header({ currentStep, pataCoins, level }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🐾</span>
            </div>
            <span className="text-xl font-bold text-gray-800">PataLimpa</span>
          </div>

          {currentStep > 0 && (
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                <Coins className="w-4 h-4 mr-1" />
                {pataCoins} PataCoins
              </Badge>

              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                <Trophy className="w-4 h-4 mr-1" />
                {level}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
