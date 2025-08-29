"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Logo } from "./logo"
import { Button } from "@/components/ui/button"

export function LandingPage({ onNavigateToNotes }: { onNavigateToNotes: () => void }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
// const [cursor, setCursor] = useState({ x: 0, y: 0 })  

  const [trailPoints, setTrailPoints] = useState<Array<{ x: number; y: number; id: number }>>([])
  const [sparks, setSparks] = useState<Array<{ x: number; y: number; id: number; vx: number; vy: number }>>([])
  const [movingStars, setMovingStars] = useState<
    Array<{ id: number; x: number; y: number; speed: number; size: number }>
  >([])
  const [asteroids, setAsteroids] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number }>>(
    [],
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setMousePosition(newPosition)

      setTrailPoints((prev) => {
        const newTrail = [...prev, { ...newPosition, id: Date.now() }]
        return newTrail.slice(-15) // More trail points for realistic flame effect
      })

      if (Math.random() < 0.4) {
        setSparks((prev) => [
          ...prev.slice(-20), // Keep more sparks for realistic debris field
          {
            x: newPosition.x + (Math.random() - 0.5) * 15,
            y: newPosition.y + (Math.random() - 0.5) * 15,
            id: Date.now() + Math.random(),
            vx: (Math.random() - 0.5) * 40,
            vy: (Math.random() - 0.5) * 40,
          },
        ])
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

//   useEffect(() => {
//   const interval = setInterval(() => {
//     setCursor((prev) => ({
//       x: prev.x + (mousePosition.x - prev.x) * 0.15, // lag factor
//       y: prev.y + (mousePosition.y - prev.y) * 0.15,
//     }))
//   }, 16) // ~60fps
//   return () => clearInterval(interval)
// }, [mousePosition])


  useEffect(() => {
    const newMovingStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 20 + 10,
      size: Math.random() * 2 + 1,
    }))
    setMovingStars(newMovingStars)
  }, [])

  useEffect(() => {
    const newAsteroids = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 15,
      speed: Math.random() * 40 + 30,
    }))
    setAsteroids(newAsteroids)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden meteor-cursor">
      <div
  className="fixed pointer-events-none z-50"
  style={{
    left: mousePosition.x - 2,
    top: mousePosition.y - 2,
  }}
>
  <div className="relative w-1 h-1">
    {/* Small white asteroid */}
    <div className="absolute inset-0 bg-white rounded-full shadow-lg"></div>
    {/* Subtle white glow */}
    <div className="absolute inset-0 rounded-full bg-white blur-sm opacity-60 scale-150"></div>
  </div>
</div>


      {/* {trailPoints.map((point, index) => (
        <div
          key={point.id}
          className="meteor-trail fixed pointer-events-none z-49"
          style={{
            left: point.x - 3,
            top: point.y - 3,
            animationDelay: `${index * 0.02}s`,
            opacity: Math.max(0.1, 1 - (index / trailPoints.length) * 0.9), // More gradual fade for flame effect
          }}
        />
      ))} */}

{trailPoints.map((point, index) => (
  <div
    key={`${point.id}-${index}`}
    className="fixed w-2 h-2 rounded-full pointer-events-none z-40"
    style={{
      left: point.x,
      top: point.y,
      background: "radial-gradient(circle, rgba(255,255,255,0.8), rgba(255,255,255,0))",
      opacity: 1 - index / trailPoints.length,
      transform: `scale(${1 - index / trailPoints.length})`,
    }}
  />
))}



      {sparks.map((spark, index) => (
        <div
          key={spark.id}
          className="meteor-spark fixed pointer-events-none z-48"
          style={
            {
              left: spark.x,
              top: spark.y,
              animationDelay: `${index * 0.01}s`,
              "--spark-x": `${spark.vx}px`,
              "--spark-y": `${spark.vy}px`,
            } as React.CSSProperties
          }
        />
      ))}

      <div className="absolute inset-0 overflow-hidden">
        {movingStars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-space-drift"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.speed}s`,
              animationDelay: `${star.id * 0.1}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 animate-continuous-flow"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "100px 100px",
          }}
        ></div>
      </div>

      {asteroids.map((asteroid) => (
        <div
          key={asteroid.id}
          className="absolute rounded-full bg-gradient-to-br from-white/10 to-gray-400/10 animate-continuous-float"
          style={{
            left: `${asteroid.x}%`,
            top: `${asteroid.y}%`,
            width: `${asteroid.size}px`,
            height: `${asteroid.size}px`,
            animationDuration: `${asteroid.speed}s`,
            animationDelay: `${asteroid.id * 2}s`,
          }}
        >
          <div className="w-full h-full rounded-full border border-white/5"></div>
        </div>
      ))}

      <nav className="relative z-20 p-6">
        <div className="flex justify-between items-center">
          <Logo size="md" />
          <div className="flex gap-4">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-black hover:bg-white"
              onClick={() => scrollToSection("about")}
            >
              About
            </Button>
            <Button
              variant="ghost"
              className="text-white/70 hover:text-black hover:bg-white"
              onClick={() => scrollToSection("features")}
            >
              Features
            </Button>
            <Button
              onClick={onNavigateToNotes}
              className="bg-white text-black hover:bg-gray-200 transition-all duration-300"
            >
              Launch App
            </Button>
          </div>
        </div>
      </nav>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="relative mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight animate-gentle-fade-in">
              ASTEROID AI
            </h1>
            <h2
              className="text-2xl md:text-3xl font-light text-gray-400 animate-gentle-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              Save Knowledge. Connect the Cosmos.
            </h2>
          </div>

          <p
            className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed animate-gentle-fade-in max-w-2xl mx-auto"
            style={{ animationDelay: "0.6s" }}
          >
            Harness the power of AI to organize, connect, and explore your ideas like never before
          </p>

          <div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-gentle-fade-in"
            style={{ animationDelay: "0.9s" }}
          >
            <Button
              onClick={onNavigateToNotes}
              size="lg"
              className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Start Exploring
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm transition-all duration-300 bg-transparent"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      <section id="features" className="relative z-20 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Powerful Features</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover the tools that make Asteroid AI your ultimate knowledge companion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Organization",
                description: "Automatically categorize and connect your notes using advanced AI algorithms",
                icon: "🧠",
              },
              {
                title: "Smart Search",
                description: "Find any information instantly with intelligent semantic search capabilities",
                icon: "🔍",
              },
              {
                title: "Visual Knowledge Graph",
                description: "See connections between your ideas in beautiful, interactive visualizations",
                icon: "🌐",
              },
              {
                title: "Real-time Collaboration",
                description: "Work together with your team in real-time across the cosmos of knowledge",
                icon: "👥",
              },
              {
                title: "Cross-Platform Sync",
                description: "Access your knowledge from anywhere, on any device, always in sync",
                icon: "🔄",
              },
              {
                title: "Privacy First",
                description: "Your data stays secure with end-to-end encryption and privacy controls",
                icon: "🔒",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4 filter grayscale">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative z-20 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About Asteroid AI</h2>
            <p className="text-xl text-gray-400">
              Born from the cosmos of human curiosity and powered by artificial intelligence
            </p>
          </div>

          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                We believe that knowledge should flow freely through the universe of human understanding. Asteroid AI
                transforms the way you capture, organize, and discover insights by creating intelligent connections
                between your thoughts and ideas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Our Vision</h3>
                <p className="text-gray-300 leading-relaxed">
                  To create a universe where every piece of knowledge finds its perfect orbit, where ideas collide and
                  create new understanding, and where artificial intelligence serves as the gravitational force that
                  keeps your intellectual cosmos in perfect harmony.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Our Technology</h3>
                <p className="text-gray-300 leading-relaxed">
                  Built on cutting-edge AI and machine learning technologies, Asteroid AI uses natural language
                  processing, semantic analysis, and graph neural networks to understand and organize your knowledge in
                  ways that feel natural and intuitive.
                </p>
              </div>
            </div>

            <div className="text-center pt-8">
              <Button
                onClick={onNavigateToNotes}
                size="lg"
                className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                Begin Your Journey
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
