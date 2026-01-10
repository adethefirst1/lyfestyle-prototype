'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function ConditionalFooter() {
  const pathname = usePathname()
  const isDashboardRoute = pathname?.startsWith('/dashboard')

  // Hide footer on dashboard pages
  if (isDashboardRoute) {
    return null
  }

  return <Footer />
}

