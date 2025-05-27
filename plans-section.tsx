"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown, Users, Clock, BookOpen } from "lucide-react"
import Image from "next/image"

interface PlansSectionProps {
  onBasicPlanClick: () => void
  pataCoins: number
}

export function PlansSection({ onBasicPlanClick, pataCoins }: PlansSectionProps) {
  const discountAmount = Math.min(pataCoins * 0.1, 10) // 10 centavos por PataCoin, máximo R$10
  const originalPrice = 39.9
  const discountedPrice = originalPrice - discountAmount

  const handleBasicPlanClick = () => {
    // Track clique no plano básico
    if (typeof window !== "undefined" && window.pixelId) {
      try {
        // @ts-ignore
        if (window.utmify_pixel) {
          // @ts-ignore
          window.utmify_pixel("track", "InitiateCheckout", {
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

    onBasicPlanClick() // Mostra o popup primeiro
  }

  const handleCompletePlanClick = () => {
    // Track clique no pacote completo
    if (typeof window !== "undefined" && window.pixelId) {
      try {
        // @ts-ignore
        if (window.utmify_pixel) {
          // @ts-ignore
          window.utmify_pixel("track", "Purchase", {
            value: discountedPrice,
            currency: "BRL",
            content_name: "Pacote Completo",
            content_category: "Curso",
          })
        }
      } catch (error) {
        console.log("Erro no tracking:", error)
      }
    }

    // Abrir link diretamente
    window.open("https://pay.cakto.com.br/vhtf92e", "_blank")
  }

  return (
    <section data-section="plans" className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-purple-100 text-purple-800 mb-4">🎉 Parabéns! Você Desbloqueou o Acesso Completo</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Transforme Seu Pet Definitivamente</h2>
          <p className="text-xl text-gray-600 mb-6">
            Você completou a jornada de preparação! Agora escolha seu plano de transformação:
          </p>

          <div className="flex justify-center items-center space-x-2 mb-8">
            <span className="text-lg text-gray-600">Seus PataCoins:</span>
            <Badge className="bg-yellow-100 text-yellow-800 text-lg px-3 py-1">💰 {pataCoins} PataCoins</Badge>
            <span className="text-sm text-gray-600">= R$ {discountAmount.toFixed(2)} de desconto!</span>
          </div>

          {/* Informações importantes do método */}
          <div className="bg-white rounded-lg p-6 mb-8 max-w-4xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">O Que Você Vai Receber:</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <BookOpen className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900">Método PataLimpa Completo</h4>
                  <p className="text-sm text-gray-600">
                    Sistema passo a passo para ensinar seu cão a fazer xixi no lugar certo em até 7 dias
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900">Resultados em 7 Dias</h4>
                  <p className="text-sm text-gray-600">
                    Método cientificamente comprovado com mais de 10.000 casos de sucesso
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900">Suporte Especializado</h4>
                  <p className="text-sm text-gray-600">Acesso direto aos especialistas para tirar todas suas dúvidas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plano Básico */}
          <Card className="relative border-2 border-green-200 hover:border-green-300 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Plano Básico</CardTitle>
              <div className="text-center">
                <span className="text-4xl font-bold text-green-600">R$ 9,90</span>
                <p className="text-gray-600">Acesso por 30 dias</p>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Método PataLimpa completo</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Garantia de 7 dias</span>
                </li>
              </ul>

              <Button onClick={handleBasicPlanClick} className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                Começar Transformação
              </Button>
            </CardContent>
          </Card>

          {/* Pacote Completo */}
          <Card className="relative border-2 border-purple-300 hover:border-purple-400 transition-all duration-300 transform hover:scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-purple-600 text-white px-4 py-2">
                <Crown className="w-4 h-4 mr-1" />
                MAIS POPULAR
              </Badge>
            </div>

            <CardHeader className="text-center pt-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Pacote Completo</CardTitle>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl text-gray-400 line-through">R$ {originalPrice.toFixed(2)}</span>
                  <Badge className="bg-red-500 text-white">-R$ {discountAmount.toFixed(2)}</Badge>
                </div>
                <span className="text-4xl font-bold text-purple-600">R$ {discountedPrice.toFixed(2)}</span>
                <p className="text-gray-600">Acesso vitalício + bônus</p>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-purple-500 mr-2" />
                  <span className="font-medium">Tudo do Plano Básico +</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-purple-500 mr-2" />
                  <span>Acesso vitalício ao conteúdo</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-purple-500 mr-2" />
                  <span>Por Que Cães Fazem Xixi nos Lugares Errados</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-purple-500 mr-2" />
                  <span>A Rotina Perfeita de Banheiro</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-purple-500 mr-2" />
                  <span>Como os Cães Pensam</span>
                  <Badge className="ml-2 bg-yellow-500 text-white text-xs">EXCLUSIVO</Badge>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-purple-500 mr-2" />
                  <span>Suporte prioritário</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-purple-500 mr-2" />
                  <span>Atualizações gratuitas</span>
                </li>
              </ul>

              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3"
                onClick={handleCompletePlanClick}
              >
                Garantir Acesso Completo
              </Button>

              <p className="text-center text-sm text-gray-600 mt-3">
                💰 Desconto de R$ {discountAmount.toFixed(2)} aplicado com seus PataCoins!
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8 mb-12">
          <p className="text-gray-600 mb-4">✅ Garantia de 7 dias • 🔒 Pagamento 100% seguro • 📱 Acesso imediato</p>
          <Badge className="bg-green-100 text-green-800">Mais de 10.000 pets já foram transformados com sucesso!</Badge>
        </div>

        {/* Seção de Depoimentos */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Veja o Que Nossos Clientes Dizem</h3>
            <p className="text-gray-600">Resultados reais de pessoas que transformaram a vida dos seus pets</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Depoimento 1 - Ana Silva */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative flex-shrink-0">
                    <Image
                      src="/images/depoimento1.png"
                      alt="Ana Silva - Depoimento PataLimpa"
                      width={120}
                      height={120}
                      className="rounded-lg object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      ✓
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 italic mb-4">
                      "Meu Labrador de 8 meses estava tendo acidentes diariamente apesar de tentar de tudo. Em 4 dias
                      usando o PataLimpa, ele estava completamente treinado! É como um milagre."
                    </blockquote>
                    <div>
                      <p className="font-bold text-gray-900">Ana Silva</p>
                      <p className="text-sm text-gray-600">São Paulo, SP</p>
                      <p className="text-xs text-green-600 mt-1">
                        Raça do cão: Labrador | Idade: 8 meses | Tempo para resultados: 4 dias
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Depoimento 2 - Juliana Santos */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative flex-shrink-0">
                    <Image
                      src="/images/depoimento2.png"
                      alt="Juliana Santos - Depoimento PataLimpa"
                      width={120}
                      height={120}
                      className="rounded-lg object-cover"
                    />
                    <div className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                      Treinadora
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-2">
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">De Cética a Defensora</Badge>
                    </div>
                    <blockquote className="text-gray-700 italic mb-4">
                      "Inicialmente, eu estava muito cética sobre o método PataLimpa... Como treinadora profissional de
                      cães, eu estava cética. Mas depois de ver os resultados com os cães dos meus clientes, agora estou
                      recomendando o PataLimpa para todos. Funciona quando nada mais funciona."
                    </blockquote>
                    <div>
                      <p className="font-bold text-gray-900">Juliana Santos</p>
                      <p className="text-sm text-gray-600">Belo Horizonte, MG</p>
                      <p className="text-xs text-green-600 mt-1">Treinadora certificada há 8 anos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
