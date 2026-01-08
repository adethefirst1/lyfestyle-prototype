'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <Link href="/add-business">
        <button className="w-16 h-16 rounded-full bg-gradient-to-r from-brand-blue to-primary-500 flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity">
          <Plus className="w-8 h-8 text-white" />
        </button>
      </Link>
    </div>
  )
}

