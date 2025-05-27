"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart } from "lucide-react"

interface PetProfileSectionProps {
  onComplete: (data: any) => void
  isCompleted: boolean
}

export function PetProfileSection({ onComplete, isCompleted }: PetProfileSectionProps) {
  const [petName, setPetName] = useState("")
  const [petAge, setPetAge] = useState("")
  const [petBreed, setPetBreed] = useState("")

  const handleComplete = () => {
    onComplete({
      name: petName,
      age: petAge,
      breed: petBreed,
    })
  }

  return (
    <section data-section="profile" className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Badge className="bg-pink-100 text-pink-800 mb-4">Etapa 4: Perfil Personalizado</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Vamos Conhecer Seu Melhor Amigo 🐾</h2>
          <p className="text-gray-600">Crie o perfil do seu pet para receber dicas personalizadas</p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <Heart className="w-6 h-6 mr-2 text-pink-600" />
              Perfil do Pet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="petName">Nome do Pet</Label>
                  <Input
                    id="petName"
                    placeholder="Ex: Rex, Luna, Bob..."
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="petAge">Idade</Label>
                  <Select value={petAge} onValueChange={setPetAge}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a idade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="puppy">Filhote (0-1 ano)</SelectItem>
                      <SelectItem value="young">Jovem (1-3 anos)</SelectItem>
                      <SelectItem value="adult">Adulto (3-7 anos)</SelectItem>
                      <SelectItem value="senior">Idoso (7+ anos)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="petBreed">Raça</Label>
                <Input
                  id="petBreed"
                  placeholder="Ex: Labrador, SRD, Golden Retriever..."
                  value={petBreed}
                  onChange={(e) => setPetBreed(e.target.value)}
                />
              </div>

              <Button
                onClick={handleComplete}
                className="w-full bg-pink-600 hover:bg-pink-700"
                disabled={!petName || !petAge || !petBreed}
              >
                Criar Perfil (+100 pontos)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
