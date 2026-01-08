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
        <div className="glass rounded-2xl overflow-hidden hover:glass-strong transition-all">
          {/* Featured Badge */}
          {business.featured && (
            <div className="absolute top-4 right-4 z-10">
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold">
                Featured
              </div>
            </div>
          )}

          {/* Logo Section */}
          <div className="relative h-48 bg-gradient-to-br from-primary-100 to-blue-100 flex items-center justify-center overflow-hidden">
            <div className="relative z-10">
              <Image
                src={business.logo}
                alt={business.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-xl object-cover border-4 border-white"
                loading="lazy"
                quality={75}
              />
            </div>
            
            {/* Verified Badge */}
            {business.verified && (
              <div className="absolute top-4 left-4 flex items-center space-x-1 bg-green-600 px-2 py-1 rounded-full">
                <CheckCircle className="w-4 h-4 text-white" />
                <span className="text-xs font-semibold text-white">Verified</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {business.name}
            </h3>
            
            <p className="text-slate-600 text-sm mb-4 line-clamp-2">
              {business.description}
            </p>

            {/* Location */}
            <div className="flex items-center space-x-2 text-slate-600 text-sm mb-4">
              <MapPin className="w-4 h-4 text-primary-600" />
              <span>{business.location}</span>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between">
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-slate-900 font-semibold">{business.rating}</span>
                </div>
                <span className="text-slate-600 text-sm">({business.reviewCount})</span>
              </div>

              {/* Views */}
              {business.views && (
                <div className="flex items-center space-x-1 text-slate-600 text-sm">
                  <Eye className="w-4 h-4" />
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

