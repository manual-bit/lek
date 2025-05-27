"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Clock, Gift, Star } from "lucide-react"

interface SpecialOfferModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SpecialOfferModal({ isOpen, onClose }: SpecialOfferModalProps) {
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutos em segundos

  useEffect(() => {
    if (!isOpen) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onClose()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen, onClose])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAcceptOffer = () => {
    // Track conversão da oferta especial
    if (typeof window !== "undefined" && window.pixelId) {
      try {
        // @ts-ignore
        if (window.utmify_pixel) {
          // @ts-ignore
          window.utmify_pixel("track", "Purchase", {
            value: 19.9,
            currency: "BRL",
            content_name: "Pacote Completo - Oferta Especial",
            content_category: "Curso",
          })
        }
      } catch (error) {
        console.log("Erro no tracking:", error)
      }
    }

    // Abrir link diretamente
    window.open("https://pay.cakto.com.br/frxp3n8", "_blank")
  }

  const handleRejectOffer = () => {
    // Track rejeição da oferta
    if (typeof window !== "undefined" && window.pixelId) {
      try {
        // @ts-ignore
        if (window.utmify_pixel) {
          // @ts-ignore
          window.utmify_pixel("track", "AddToCart", {
            value: 9.9,
            currency: "BRL",
            content_name: "Plano Básico",
            content_category: "Curso",
          })
        }
      } catch (error) {
        console.log("Erro no tracking:", error)
      }
    }

    // Fechar modal e abrir link
    onClose()
    window.open("https://pay.cakto.com.br/3g2mv2p", "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg md:text-2xl font-bold text-red-600">🚨 OFERTA ESPECIAL!</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4 md:space-y-6">
          <div className="text-center bg-gradient-to-r from-red-100 to-orange-100 p-4 md:p-6 rounded-lg">
            <Clock className="w-8 h-8 md:w-12 md:h-12 text-red-600 mx-auto mb-2 md:mb-4" />
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Tempo Limitado!</h3>
            <div className="text-2xl md:text-4xl font-bold text-red-600 mb-2">{formatTime(timeLeft)}</div>
            <p className="text-sm md:text-base text-gray-600">Esta oferta expira em breve!</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 md:p-6 rounded-lg">
            <div className="flex items-center mb-3 md:mb-4">
              <Gift className="w-6 h-6 md:w-8 md:h-8 text-yellow-600 mr-2 md:mr-3" />
              <h4 className="text-lg md:text-xl font-bold text-gray-900">Desconto de R$ 10,00</h4>
            </div>

            <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
              <div className="text-center">
                <p className="text-xs md:text-sm text-gray-600">Pacote Completo</p>
                <p className="text-lg md:text-2xl font-bold text-gray-400 line-through">R$ 29,90</p>
              </div>
              <div className="text-center">
                <p className="text-xs md:text-sm text-green-600 font-medium">Seu Preço Especial</p>
                <p className="text-xl md:text-3xl font-bold text-green-600">R$ 19,90</p>
              </div>
            </div>

            <div className="bg-white p-3 md:p-4 rounded-lg mb-3 md:mb-4">
              <h5 className="font-bold text-gray-900 mb-2 text-sm md:text-base">Você recebe:</h5>
              <ul className="space-y-1 text-xs md:text-sm">
                <li className="flex items-center">
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 mr-1 md:mr-2 flex-shrink-0" />
                  <span>Método PataLimpa completo</span>
                </li>
                <li className="flex items-center">
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 mr-1 md:mr-2 flex-shrink-0" />
                  <span>Acesso vitalício</span>
                </li>
                <li className="flex items-center">
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 mr-1 md:mr-2 flex-shrink-0" />
                  <span>Bônus exclusivos</span>
                </li>
                <li className="flex items-center">
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 mr-1 md:mr-2 flex-shrink-0" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:gap-4">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-sm md:text-base"
              onClick={handleAcceptOffer}
            >
              🎯 Aproveitar Desconto (R$ 19,90)
            </Button>

            <Button variant="outline" onClick={handleRejectOffer} className="text-gray-600 py-3 text-sm md:text-base">
              Continuar com Plano Básico (R$ 9,90)
            </Button>
          </div>

          <div className="text-center">
            <Badge className="bg-red-100 text-red-800 text-xs md:text-sm">
              ⚡ Apenas {Math.ceil(timeLeft / 60)} minutos restantes!
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
