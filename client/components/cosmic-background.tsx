"use client"

import { useEffect, useRef } from "react"

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const stars: Array<{
      x: number
      y: number
      size: number
      opacity: number
      twinkleSpeed: number
    }> = []

    const createStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 8000)
      stars.length = 0

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
        })
      }
    }

    const drawStars = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star, index) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + index) * 0.3 + 0.7
        const opacity = star.opacity * twinkle

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fill()

        if (star.size > 1.5) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.1})`
          ctx.fill()
        }
      })
    }

    let animationId: number
    const animate = (time: number) => {
      drawStars(time * 0.001)
      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createStars()
    animate(0)

    const handleResize = () => {
      resizeCanvas()
      createStars()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "radial-gradient(ellipse at center, rgba(40, 40, 40, 0.3) 0%, rgba(0, 0, 0, 1) 70%)" }}
    />
  )
}
