"use client"

import { useState, useEffect } from "react"
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs"
import { LandingPage } from "@/components/landing-page"
import { FeaturesPage } from "@/components/features-page"
import { AboutPage } from "@/components/about-page"
import { NotesGrid } from "@/components/notes-grid"
import { FloatingChatButton } from "@/components/floating-chat-button"
import { CosmicBackground } from "@/components/cosmic-background"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import UnauthPage from "@/components/unauth"

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState<
    "landing" | "features" | "about" | "notes"
  >("landing")

  const { signOut } = useClerk()

  // Optional: Auto-redirect signed-in users to "notes"
  // useEffect(() => {
  //   setCurrentPage("notes")
  // }, [])

  return (
    <>
      {/* If user is NOT signed in */}
      <SignedOut>
        <UnauthPage />
      </SignedOut>

      {/* If user IS signed in */}
      <SignedIn>
        {currentPage === "landing" && (
          <LandingPage onNavigateToNotes={() => setCurrentPage("notes")} />
        )}

        {currentPage === "features" && (
          <FeaturesPage
            onNavigateToNotes={() => setCurrentPage("notes")}
            onNavigateToLanding={() => setCurrentPage("landing")}
            onNavigateToAbout={() => setCurrentPage("about")}
          />
        )}

        {currentPage === "about" && (
          <AboutPage
            onNavigateToNotes={() => setCurrentPage("notes")}
            onNavigateToLanding={() => setCurrentPage("landing")}
            onNavigateToFeatures={() => setCurrentPage("features")}
          />
        )}

        {currentPage === "notes" && (
          <main className="min-h-screen bg-background relative">
            <CosmicBackground />

            {/* Top Navigation */}
            <nav className="relative z-20 p-4 glass backdrop-blur-md border-b border-white/10">
              <div className="flex justify-between items-center max-w-7xl mx-auto">
                <Logo size="sm" />
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentPage("landing")}
                    className="text-white/70 hover:text-black hover:bg-white"
                  >
                    ← Back to Home
                  </Button>

                  {/* Signout button */}
                  {/* <Button
                    variant="outline"
                    onClick={() => signOut({ redirectUrl: "/" })}
                    className="flex items-center gap-2 rounded-2xl border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                      />
                    </svg>
                    Sign Out
                  </Button> */}
                </div>
              </div>
            </nav>

            {/* Notes Grid */}
            <div className="relative z-10">
              <NotesGrid />
            </div>

            {/* Floating Chat */}
            <FloatingChatButton />
          </main>
        )}
      </SignedIn>
    </>
  )
}

// "use client"

// import { useState } from "react"
// import { SignedIn, SignedOut } from "@clerk/nextjs"
// import { LandingPage } from "@/components/landing-page"
// import { FeaturesPage } from "@/components/features-page"
// import { AboutPage } from "@/components/about-page"
// import { NotesGrid } from "@/components/notes-grid"
// import { FloatingChatButton } from "@/components/floating-chat-button"
// import { CosmicBackground } from "@/components/cosmic-background"
// import { Logo } from "@/components/logo"
// import { Button } from "@/components/ui/button"
// import UnauthPage from "@/components/unauth"
// import { useClerk } from "@clerk/nextjs"
// import { auth } from "@clerk/nextjs"

// export default function HomePage() {
//   const [currentPage, setCurrentPage] = useState<"landing" | "features" | "about" | "notes">("landing")
//   const { signOut } = useClerk()

//   return (
//     <>
//       {/* If user is NOT signed in */}
//       <SignedOut>
//         <UnauthPage />
//       </SignedOut>

//       {/* If user IS signed in */}
//       <SignedIn>
//         {currentPage === "landing" && (
//           <LandingPage onNavigateToNotes={() => setCurrentPage("notes")} />
//         )}

//         {currentPage === "features" && (
//           <FeaturesPage
//             onNavigateToNotes={() => setCurrentPage("notes")}
//             onNavigateToLanding={() => setCurrentPage("landing")}
//             onNavigateToAbout={() => setCurrentPage("about")}
//           />
//         )}

//         {currentPage === "about" && (
//           <AboutPage
//             onNavigateToNotes={() => setCurrentPage("notes")}
//             onNavigateToLanding={() => setCurrentPage("landing")}
//             onNavigateToFeatures={() => setCurrentPage("features")}
//           />
//         )}

//         {currentPage === "notes" && (
//           <main className="min-h-screen bg-background relative">
//             <CosmicBackground />

//             <nav className="relative z-20 p-4 glass backdrop-blur-md border-b border-white/10">
//               <div className="flex justify-between items-center max-w-7xl mx-auto">
//                 <Logo size="sm" />
//                 <div className="flex items-center gap-4">
//                   <Button
//                     variant="ghost"
//                     onClick={() => setCurrentPage("landing")}
//                     className="text-white/70 hover:text-black hover:bg-white"
//                   >
//                     ← Back to Home
//                   </Button>
//                   <Button
//   variant="outline"
//   onClick={() => signOut({redirectUrl:'/'})}
//   className="flex items-center gap-2 rounded-2xl border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2"
// >
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
//   </svg>
//   Signout
// </Button>

//                 </div>
//               </div>
//             </nav>

//             <div className="relative z-10">
//               <NotesGrid />
//             </div>
//             <FloatingChatButton />
//           </main>
//         )}
//       </SignedIn>
//     </>
//   )
// }
