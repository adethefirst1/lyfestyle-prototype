'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Star } from 'lucide-react'
import { memo } from 'react'

interface Pro {
  id: string
  name: string
  proName?: string
  proTitle?: string
  businessName: string
  category: string
  location: string
  rating: number
  verified: boolean
  banner?: string
  vibeTag?: string
}

interface ProCardProps {
  pro: Pro
}

function ProCard({ pro }: ProCardProps) {
  // Portrait-oriented professional images (3/4 aspect ratio)
  const proImages: Record<string, string> = {
    auto: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=533&fit=crop&q=80',
    beauty: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=533&fit=crop&q=80',
    tech: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=533&fit=crop&q=80',
    food: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=533&fit=crop&q=80',
    health: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=533&fit=crop&q=80',
    home: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=533&fit=crop&q=80',
  }

  const vibeTags: Record<string, string> = {
    auto: '#ReliableHands',
    beauty: '#ExecutiveGrooming',
    tech: '#Minimalist',
    food: '#ChopLife',
    health: '#WellnessFlow',
    home: '#HomeVibes',
  }

  const proNames: Record<string, { name: string; title: string }> = {
    auto: { name: 'Jamal', title: 'Master Mechanic' },
    beauty: { name: 'Amina', title: 'Master Barber' },
    tech: { name: 'David', title: 'Tech Specialist' },
    food: { name: 'Chioma', title: 'Head Chef' },
    health: { name: 'Dr. Kemi', title: 'Wellness Expert' },
    home: { name: 'Emeka', title: 'Home Specialist' },
  }

  const imageUrl = pro.banner || proImages[pro.category] || 'https://images.unsplash.com/photo-1552568031-326ec03fe763?w=400&h=533&fit=crop&q=80'
  const vibeTag = pro.vibeTag || vibeTags[pro.category] || '#LocalVibe'
  const proInfo = pro.proName && pro.proTitle 
    ? { name: pro.proName, title: pro.proTitle }
    : proNames[pro.category] || { name: 'Professional', title: 'Expert' }

  return (
    <Link href={`/business/${pro.id}`} className="block group flex-shrink-0 w-48 md:w-56">
      <div className="w-full">
        {/* Compact Portrait Image (4/5 aspect ratio) */}
        <div className="relative w-full aspect-[4/5] overflow-hidden mb-3">
          <Image
            src={imageUrl}
            alt={proInfo.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            unoptimized
          />

          {/* Verified Badge Overlay - Top Right */}
          {pro.verified && (
            <div className="absolute top-3 right-3 z-10">
              <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                <CheckCircle className="w-5 h-5 text-[#FF6700]" />
              </div>
            </div>
          )}

          {/* Dark-to-Transparent Gradient Overlay at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

          {/* Pro Name and Title Overlay - White Text */}
          <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
            <h3 className="text-lg font-bold text-white mb-0.5">
              {proInfo.name}
            </h3>
            <p className="text-xs text-white/90 font-medium">
              {proInfo.title}
            </p>
          </div>

          {/* Ghost Button - Appears on Hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-20">
            <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/50 px-6 py-2 rounded-full backdrop-blur-sm">
              View Profile
            </span>
          </div>
        </div>

        {/* Information Below Image - No Card Container */}
        <div className="space-y-2">
          {/* Minimalist Metadata Row */}
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span className="font-semibold">{pro.businessName}</span>
            <span className="text-slate-400">•</span>
            <span>{pro.location}</span>
            <span className="text-slate-400">•</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-slate-600 text-slate-600" />
              <span className="font-semibold">{pro.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Vibe Tag Pill - Muted Gray, No Background */}
          <div className="text-xs text-slate-400 font-light">
            {vibeTag}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default memo(ProCard)

