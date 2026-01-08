'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Star } from 'lucide-react'
import { memo } from 'react'

interface Business {
  id: string
  name: string
  category: string
  description: string
  location: string
  rating: number
  reviewCount: number
  verified: boolean
  featured: boolean
  logo: string
  banner?: string
  vibeTag?: string
}

interface LifestyleBusinessCardProps {
  business: Business
}

function LifestyleBusinessCard({ business }: LifestyleBusinessCardProps) {
  // Use banner if available, otherwise use a lifestyle image based on category
  const lifestyleImages: Record<string, string> = {
    auto: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=750&fit=crop&q=80',
    beauty: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=750&fit=crop&q=80',
    tech: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=750&fit=crop&q=80',
    food: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=750&fit=crop&q=80',
    health: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=750&fit=crop&q=80',
    home: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=750&fit=crop&q=80',
  }

  const vibeTags: Record<string, string> = {
    auto: '#ReliableHands',
    beauty: '#SharpCuts',
    tech: '#QuietVibe',
    food: '#ChopLife',
    health: '#WellnessFlow',
    home: '#HomeVibes',
  }

  const imageUrl = business.banner || lifestyleImages[business.category] || 'https://images.unsplash.com/photo-1552568031-326ec03fe763?w=600&h=750&fit=crop&q=80'
  const vibeTag = business.vibeTag || vibeTags[business.category] || '#LocalVibe'

  return (
    <Link href={`/business/${business.id}`} className="block group">
      <div className="w-full">
        {/* Large Edge-to-Edge Image - Top Half */}
        <div className="relative w-full aspect-[4/5] overflow-hidden mb-4">
          <Image
            src={imageUrl}
            alt={business.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            unoptimized
          />
        </div>

        {/* Content - No Card Container */}
        <div className="space-y-2">
          {/* Business Name with Verified Tick */}
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900">
              {business.name}
            </h3>
            {business.verified && (
              <CheckCircle className="w-4 h-4 text-[#FF6700] shrink-0" />
            )}
          </div>

          {/* Description - Muted */}
          <p className="text-sm text-slate-600 font-light line-clamp-2 leading-relaxed">
            {business.description}
          </p>

          {/* Minimalist Metadata Row */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-light">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-slate-500 text-slate-500" />
              <span>{business.rating.toFixed(1)}</span>
            </div>
            <span>•</span>
            <span>{business.location}</span>
            <span>•</span>
            <span className="text-slate-400">{vibeTag}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default memo(LifestyleBusinessCard)

