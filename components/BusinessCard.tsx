'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, CheckCircle, Eye } from 'lucide-react'
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
  views?: number
}

interface BusinessCardProps {
  business: Business
}

function BusinessCard({ business }: BusinessCardProps) {
  return (
    <div className="group relative">
      <Link href={`/business/${business.id}`}>
        <div className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
          {/* Logo Section */}
          <div className="relative h-48 bg-slate-50 flex items-center justify-center overflow-hidden">
            <div className="relative z-10">
              <Image
                src={business.logo}
                alt={business.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-xl object-cover border-2 border-white shadow-md"
                loading="lazy"
                quality={75}
              />
            </div>
            
            {/* Verified Badge */}
            {business.verified && (
              <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-green-600 px-2.5 py-1 rounded-lg shadow-sm">
                <CheckCircle className="w-3.5 h-3.5 text-white" />
                <span className="text-xs font-semibold text-white">Verified</span>
              </div>
            )}

            {/* Featured Badge */}
            {business.featured && (
              <div className="absolute top-3 right-3 z-10">
                <div className="px-2.5 py-1 rounded-lg bg-amber-500 text-white text-xs font-semibold shadow-sm">
                  Featured
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 line-clamp-1">
              {business.name}
            </h3>
            
            <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">
              {business.description}
            </p>

            {/* Location */}
            <div className="flex items-center space-x-2 text-slate-600 text-sm mb-4">
              <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0" />
              <span className="line-clamp-1">{business.location}</span>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-slate-900 font-semibold text-sm">{business.rating}</span>
                </div>
                <span className="text-slate-500 text-xs">({business.reviewCount})</span>
              </div>

              {/* Views */}
              {business.views && (
                <div className="flex items-center space-x-1 text-slate-500 text-xs">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{business.views.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default memo(BusinessCard)

