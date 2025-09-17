import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { ConditionalNavigation } from "@/components/conditional-navigation"

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ConditionalNavigation />
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
