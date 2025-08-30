"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Logo } from "./logo"
import { useClerk } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import { darkClerkTheme  } from "@/app/utils/clerk"

export default function UnauthPage() {
  const { user } = useUser();
  const { openSignIn, openSignUp } = useClerk();
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trailPoints, setTrailPoints] = useState<Array<{ x: number; y: number; id: number }>>([])
  const [sparks, setSparks] = useState<Array<{ x: number; y: number; id: number; vx: number; vy: number }>>([])
  const [movingStars, setMovingStars] = useState<
    Array<{ id: number; x: number; y: number; speed: number; size: number }>
  >([])
  const [asteroids, setAsteroids] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number }>>(
    [],
  )

  const handleSignIn = () => {
    openSignIn({})
    
  }

  const handleSignUp = () => {
    openSignUp()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setMousePosition(newPosition)

      setTrailPoints((prev) => {
        const newTrail = [...prev, { ...newPosition, id: Date.now() }]
        return newTrail.slice(-15)
      })

      if (Math.random() < 0.4) {
        setSparks((prev) => [
          ...prev.slice(-20),
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

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <style jsx global>{`
        @keyframes space-drift {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(10px, -10px);
          }
          50% {
            transform: translate(-5px, -20px);
          }
          75% {
            transform: translate(-10px, -10px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes continuous-float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(20px, -20px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        @keyframes gentle-fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spark-fly {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--spark-x, 0), var(--spark-y, 0)) scale(0);
            opacity: 0;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.6);
          }
        }

        .animate-space-drift {
          animation: space-drift linear infinite;
        }

        .animate-continuous-float {
          animation: continuous-float linear infinite;
        }

        .animate-gentle-fade-in {
          animation: gentle-fade-in 1s ease-out forwards;
          opacity: 0;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .meteor-spark {
          width: 3px;
          height: 3px;
          background: radial-gradient(circle, white 0%, rgba(255,255,255,0.8) 30%, transparent 70%);
          border-radius: 50%;
          animation: spark-fly 1.5s ease-out forwards;
        }

        .glass {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
      `}</style>

      {/* Custom cursor and visual effects */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: mousePosition.x - 2,
          top: mousePosition.y - 2,
        }}
      >
        <div className="relative w-1 h-1">
          <div className="absolute inset-0 bg-white rounded-full shadow-lg"></div>
          <div className="absolute inset-0 rounded-full bg-white blur-sm opacity-60 scale-150"></div>
        </div>
      </div>

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

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8 animate-gentle-fade-in">
            <Logo/>
          </div>

          <div className="relative mb-8">
            <h1 className="text-6xl md:text-6xl font-bold text-white mb-6 tracking-tight animate-gentle-fade-in" style={{ animationDelay: "0.2s" }}>
              Welcome to the Cosmos
            </h1>
            <h2
              className="text-2xl md:text-2xl font-light text-gray-400 animate-gentle-fade-in mb-8"
              style={{ animationDelay: "0.4s" }}
            >
              Save Knowledge. Connect the Universe.
            </h2>
          </div>

          <p
            className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed animate-gentle-fade-in max-w-2xl mx-auto"
            style={{ animationDelay: "0.6s" }}
          >
            Harness the power of AI to organize, connect, and explore your ideas like never before. Transform scattered thoughts into a constellation of insights.
          </p>

          {/* Authentication buttons */}
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-gentle-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <Button
              size="lg"
              onClick={handleSignIn}
              className="animate-pulse-glow bg-white text-black hover:bg-gray-200 px-12 py-6 text-xl font-semibold transition-all duration-300 transform hover:scale-105 min-w-[200px]"
            >
              Sign In
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleSignUp}
              className="glass border-white/30 text-white hover:bg-white/10 px-12 py-6 text-xl backdrop-blur-sm transition-all duration-300 bg-transparent transform hover:scale-105 min-w-[200px]"
            >
              Sign Up
            </Button>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute -bottom-20 -right-20 w-60 h-60 bg-gray-300/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 -right-40 w-32 h-32 bg-gray-500/20 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/4 -left-32 w-48 h-48 bg-blue-300/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
        </div>
      </div>
    </div>
  )
}

// "use client"

// import React, { useState, useEffect, useCallback } from "react"
// import { Button } from "@/components/ui/button"
// import { Logo } from "./logo"
// import { SignInButton, SignUpButton, useClerk } from "@clerk/nextjs"
// import { useUser } from "@clerk/nextjs"

// export default function UnauthPage() {

//   const { user } = useUser();
// const { openSignIn } = useClerk();
    
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const [trailPoints, setTrailPoints] = useState<Array<{ x: number; y: number; id: number }>>([])
//   const [sparks, setSparks] = useState<Array<{ x: number; y: number; id: number; vx: number; vy: number }>>([])
//   const [movingStars, setMovingStars] = useState<
//     Array<{ id: number; x: number; y: number; speed: number; size: number }>
//   >([])
//   const [asteroids, setAsteroids] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number }>>(
//     [],
//   )

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       const newPosition = { x: e.clientX, y: e.clientY }
//       setMousePosition(newPosition)

//       setTrailPoints((prev) => {
//         const newTrail = [...prev, { ...newPosition, id: Date.now() }]
//         return newTrail.slice(-15)
//       })

//       if (Math.random() < 0.4) {
//         setSparks((prev) => [
//           ...prev.slice(-20),
//           {
//             x: newPosition.x + (Math.random() - 0.5) * 15,
//             y: newPosition.y + (Math.random() - 0.5) * 15,
//             id: Date.now() + Math.random(),
//             vx: (Math.random() - 0.5) * 40,
//             vy: (Math.random() - 0.5) * 40,
//           },
//         ])
//       }
//     }

//     window.addEventListener("mousemove", handleMouseMove)
//     return () => window.removeEventListener("mousemove", handleMouseMove)
//   }, [])

//   useEffect(() => {
//     const newMovingStars = Array.from({ length: 100 }, (_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       speed: Math.random() * 20 + 10,
//       size: Math.random() * 2 + 1,
//     }))
//     setMovingStars(newMovingStars)
//   }, [])

//   useEffect(() => {
//     const newAsteroids = Array.from({ length: 8 }, (_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       size: Math.random() * 30 + 15,
//       speed: Math.random() * 40 + 30,
//     }))
//     setAsteroids(newAsteroids)
//   }, [])

//   return (
//     <div className="min-h-screen bg-black relative overflow-hidden">
//       <style jsx global>{`
//         @keyframes space-drift {
//           0% {
//             transform: translate(0, 0);
//           }
//           25% {
//             transform: translate(10px, -10px);
//           }
//           50% {
//             transform: translate(-5px, -20px);
//           }
//           75% {
//             transform: translate(-10px, -10px);
//           }
//           100% {
//             transform: translate(0, 0);
//           }
//         }

//         @keyframes continuous-float {
//           0%, 100% {
//             transform: translate(0, 0) rotate(0deg);
//           }
//           33% {
//             transform: translate(20px, -20px) rotate(120deg);
//           }
//           66% {
//             transform: translate(-20px, 20px) rotate(240deg);
//           }
//         }

//         @keyframes gentle-fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes spark-fly {
//           0% {
//             transform: translate(0, 0) scale(1);
//             opacity: 1;
//           }
//           100% {
//             transform: translate(var(--spark-x, 0), var(--spark-y, 0)) scale(0);
//             opacity: 0;
//           }
//         }

//         @keyframes pulse-glow {
//           0%, 100% {
//             box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
//           }
//           50% {
//             box-shadow: 0 0 30px rgba(255, 255, 255, 0.6);
//           }
//         }

//         .animate-space-drift {
//           animation: space-drift linear infinite;
//         }

//         .animate-continuous-float {
//           animation: continuous-float linear infinite;
//         }

//         .animate-gentle-fade-in {
//           animation: gentle-fade-in 1s ease-out forwards;
//           opacity: 0;
//         }

//         .animate-pulse-glow {
//           animation: pulse-glow 2s ease-in-out infinite;
//         }

//         .meteor-spark {
//           width: 3px;
//           height: 3px;
//           background: radial-gradient(circle, white 0%, rgba(255,255,255,0.8) 30%, transparent 70%);
//           border-radius: 50%;
//           animation: spark-fly 1.5s ease-out forwards;
//         }

//         .glass {
//           backdrop-filter: blur(10px);
//           -webkit-backdrop-filter: blur(10px);
//         }
//       `}</style>

//       {/* Custom cursor */}
//       <div
//         className="fixed pointer-events-none z-50"
//         style={{
//           left: mousePosition.x - 2,
//           top: mousePosition.y - 2,
//         }}
//       >
//         <div className="relative w-1 h-1">
//           <div className="absolute inset-0 bg-white rounded-full shadow-lg"></div>
//           <div className="absolute inset-0 rounded-full bg-white blur-sm opacity-60 scale-150"></div>
//         </div>
//       </div>

//       {/* Cursor trail */}
//       {trailPoints.map((point, index) => (
//         <div
//           key={`${point.id}-${index}`}
//           className="fixed w-2 h-2 rounded-full pointer-events-none z-40"
//           style={{
//             left: point.x,
//             top: point.y,
//             background: "radial-gradient(circle, rgba(255,255,255,0.8), rgba(255,255,255,0))",
//             opacity: 1 - index / trailPoints.length,
//             transform: `scale(${1 - index / trailPoints.length})`,
//           }}
//         />
//       ))}

//       {/* Sparks */}
//       {sparks.map((spark, index) => (
//         <div
//           key={spark.id}
//           className="meteor-spark fixed pointer-events-none z-48"
//           style={
//             {
//               left: spark.x,
//               top: spark.y,
//               animationDelay: `${index * 0.01}s`,
//               "--spark-x": `${spark.vx}px`,
//               "--spark-y": `${spark.vy}px`,
//             } as React.CSSProperties
//           }
//         />
//       ))}

//       {/* Moving stars */}
//       <div className="absolute inset-0 overflow-hidden">
//         {movingStars.map((star) => (
//           <div
//             key={star.id}
//             className="absolute bg-white rounded-full animate-space-drift"
//             style={{
//               left: `${star.x}%`,
//               top: `${star.y}%`,
//               width: `${star.size}px`,
//               height: `${star.size}px`,
//               animationDuration: `${star.speed}s`,
//               animationDelay: `${star.id * 0.1}s`,
//             }}
//           ></div>
//         ))}
//       </div>

//       {/* Asteroids */}
//       {asteroids.map((asteroid) => (
//         <div
//           key={asteroid.id}
//           className="absolute rounded-full bg-gradient-to-br from-white/10 to-gray-400/10 animate-continuous-float"
//           style={{
//             left: `${asteroid.x}%`,
//             top: `${asteroid.y}%`,
//             width: `${asteroid.size}px`,
//             height: `${asteroid.size}px`,
//             animationDuration: `${asteroid.speed}s`,
//             animationDelay: `${asteroid.id * 2}s`,
//           }}
//         >
//           <div className="w-full h-full rounded-full border border-white/5"></div>
//         </div>
//       ))}

//       {/* Main content - Full screen centered */}
//       <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6">
//         <div className="text-center max-w-4xl mx-auto">
//           {/* Logo */}
//           <div className="flex items-center justify-center gap-3 mb-8 animate-gentle-fade-in">
//             <Logo/>
//           </div>

//           <div className="relative mb-8">
//             <h1 className="text-6xl md:text-6xl font-bold text-white mb-6 tracking-tight animate-gentle-fade-in" style={{ animationDelay: "0.2s" }}>
//               Welcome to the Cosmos
//             </h1>
//             <h2
//               className="text-2xl md:text-2xl font-light text-gray-400 animate-gentle-fade-in mb-8"
//               style={{ animationDelay: "0.4s" }}
//             >
//               Save Knowledge. Connect the Universe.
//             </h2>
//           </div>

//           <p
//             className="text-lg md:text-xl text-gray-300 mb-16 leading-relaxed animate-gentle-fade-in max-w-2xl mx-auto"
//             style={{ animationDelay: "0.6s" }}
//           >
//             Harness the power of AI to organize, connect, and explore your ideas like never before. Transform scattered thoughts into a constellation of insights.
//           </p>

//           {/* Authentication buttons */}
//           <div
//             className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-gentle-fade-in"
//             style={{ animationDelay: "0.8s" }}
//           >
//   <Button
//     size="lg"
//     className="animate-pulse-glow bg-white text-black hover:bg-gray-200 px-12 py-6 text-xl font-semibold transition-all duration-300 transform hover:scale-105 min-w-[200px]"
//   >
//     {
//       !user ? () : ()
//     }
//     Sign In
//   </Button>

//   <Button
//     variant="outline"
//     size="lg"
//     className="glass border-white/30 text-white hover:bg-white/10 px-12 py-6 text-xl backdrop-blur-sm transition-all duration-300 bg-transparent transform hover:scale-105 min-w-[200px]"
//   >
//     Sign Up
//   </Button>

//           </div>

//           {/* Decorative elements */}
//           <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse" />
//           <div
//             className="absolute -bottom-20 -right-20 w-60 h-60 bg-gray-300/20 rounded-full blur-3xl animate-pulse"
//             style={{ animationDelay: "1s" }}
//           />
//           <div
//             className="absolute top-1/2 -right-40 w-32 h-32 bg-gray-500/20 rounded-full blur-2xl animate-pulse"
//             style={{ animationDelay: "2s" }}
//           />
//           <div
//             className="absolute top-1/4 -left-32 w-48 h-48 bg-blue-300/10 rounded-full blur-3xl animate-pulse"
//             style={{ animationDelay: "1.5s" }}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }
