"use client"

import { usePathname } from "next/navigation"
import { Navigation } from "./navigation"

export function ConditionalNavigation() {
  const pathname = usePathname()
  
  // Don't show global navigation for admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }
  
  return <Navigation />
}
