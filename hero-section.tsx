"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Play } from "lucide-react"
import Image from "next/image"

interface HeroSectionProps {
  onStartJourney: () => void
  currentStep: number
}

export function HeroSection({ onStartJourney, currentStep }: HeroSectionProps) {
  // Só mostra o hero se ainda não iniciou a jornada
  if (currentStep > 0) {
    return null
  }

  return (
    <section className="py-8 md:py-16 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <Badge className="bg-green-100 text-green-800 mb-4">Método Cientificamente Comprovado</Badge>

          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Pare de Limpar Xixi de Cachorro <span className="text-green-600">Para Sempre</span>
          </h1>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 md:p-6 mb-6 md:mb-8 max-w-2xl mx-auto">
            <p className="text-red-800 font-medium mb-4">Você está cansado de:</p>
            <div className="space-y-2 text-left">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500 flex-shrink-0" />
                <span className="text-sm md:text-base text-red-700">Acordar com o cheiro de xixi todas as manhãs?</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500 flex-shrink-0" />
                <span className="text-sm md:text-base text-red-700">
                  Gastar fortunas com produtos de limpeza e tapetes?
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500 flex-shrink-0" />
                <span className="text-sm md:text-base text-red-700">
                  Sentir vergonha quando visitas percebem o cheiro em sua casa?
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
            <div className="relative">
              <Image
                src="/images/antes.png"
                alt="Antes - Casa bagunçada com xixi de cachorro"
                width={400}
                height={300}
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-red-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold">
                ANTES
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/depois.png"
                alt="Depois - Dona feliz com cachorro bem treinado"
                width={400}
                height={300}
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-green-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold">
                DEPOIS
              </div>
              <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-yellow-500 text-white p-1 md:p-2 rounded-full text-sm md:text-base">
                🏆
              </div>
            </div>
          </div>

          {/* Container com padding bottom para evitar sobreposição */}
          <div className="pb-20 md:pb-8">
            <Button
              onClick={onStartJourney}
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full md:w-auto relative z-40"
            >
              <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Iniciar Minha Jornada de Transformação
            </Button>

            <p className="text-xs md:text-sm text-gray-600 mt-4">
              ✨ Mais de 10.000 tutores já transformaram suas casas
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
