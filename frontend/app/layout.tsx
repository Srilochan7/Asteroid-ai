// // 
// import type { Metadata } from "next";
// import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono";
// import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider"


// export const metadata: Metadata = {
//   title: "Asteroid-ai",
//   icons: {
//     icon: [{ url: "/logo.jpg", sizes: "32x32", type: "image/jpg" }],
//     shortcut: "/favicon.ico",
//     apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="font-sans">
//         <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
//           {children}
//         </ThemeProvider>
//         {/* <Analytics /> */}
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: "Asteroid-ai",
  icons: {
    icon: [{ url: "/logo.jpg", sizes: "32x32", type: "image/jpg" }],
  },
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>

    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`} suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>

  );
}
