import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { ConditionalNavigation } from "@/components/conditional-navigation"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Howard University IEEE Student Branch",
  description: "Innovating. Learning. Leading. - Howard University IEEE Student Branch",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <ConditionalNavigation />
            {children}
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
