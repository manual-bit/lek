"use client"

import { useEffect } from "react"

export function SoundManager() {
  useEffect(() => {
    // Função para tocar sons de feedback
    const playSound = (type: string) => {
      // Em uma implementação real, você carregaria arquivos de áudio
      // Por agora, usamos a Web Audio API para criar sons sintéticos
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      const createBeep = (frequency: number, duration: number) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = frequency
        oscillator.type = "sine"

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration)
      }

      // Sons para diferentes ações
      window.playSuccessSound = () => createBeep(800, 0.2)
      window.playClickSound = () => createBeep(400, 0.1)
      window.playLevelUpSound = () => {
        createBeep(523, 0.2)
        setTimeout(() => createBeep(659, 0.2), 100)
        setTimeout(() => createBeep(784, 0.3), 200)
      }
      window.playRewardSound = () => {
        for (let i = 0; i < 5; i++) {
          setTimeout(() => createBeep(400 + i * 100, 0.1), i * 50)
        }
      }
    }

    // Adicionar event listeners para sons
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement
      if (target.tagName === "BUTTON" && window.playClickSound) {
        window.playClickSound()
      }
    })

    return () => {
      // Cleanup
      document.removeEventListener("click", () => {})
    }
  }, [])

  return null
}

// Declarações de tipos para TypeScript
declare global {
  interface Window {
    playSuccessSound?: () => void
    playClickSound?: () => void
    playLevelUpSound?: () => void
    playRewardSound?: () => void
  }
}
