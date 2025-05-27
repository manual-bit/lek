"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
}

interface ParticleSystemProps {
  particles: Particle[]
}

export function ParticleSystem({ particles }: ParticleSystemProps) {
  const [animatedParticles, setAnimatedParticles] = useState<
    Array<
      Particle & {
        opacity: number
        scale: number
        color: string
      }
    >
  >([])

  useEffect(() => {
    if (particles.length === 0) {
      setAnimatedParticles([])
      return
    }

    const colors = ["#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#06B6D4"]

    const newParticles = particles.map((particle) => ({
      ...particle,
      opacity: 1,
      scale: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    setAnimatedParticles(newParticles)

    // Animar partículas
    const timer = setTimeout(() => {
      setAnimatedParticles((prev) =>
        prev.map((p) => ({
          ...p,
          opacity: 0,
          scale: 2,
          y: p.y - 100,
        })),
      )
    }, 100)

    return () => clearTimeout(timer)
  }, [particles])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {animatedParticles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-4 h-4 rounded-full transition-all duration-1000 ease-out"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: `scale(${particle.scale}) translateY(${particle.y}px)`,
          }}
        />
      ))}
    </div>
  )
}
