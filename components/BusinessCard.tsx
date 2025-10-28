'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Star, CheckCircle, Eye, Phone, Mail } from 'lucide-react'

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
  index?: number
}

export default function BusinessCard({ business, index = 0 }: BusinessCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <Link href={`/business/${business.id}`}>
        <div className="glass rounded-2xl overflow-hidden hover:glass-strong transition-all duration-300 neon-glow-hover">
          {/* Featured Badge */}
          {business.featured && (
            <div className="absolute top-4 right-4 z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold"
              >
                Featured
              </motion.div>
            </div>
          )}

          {/* Logo Section */}
          <div className="relative h-48 bg-gradient-to-br from-primary-900/50 to-accent-purple/50 flex items-center justify-center overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <img
                src={business.logo}
                alt={business.name}
                className="w-24 h-24 rounded-xl object-cover border-4 border-white/20"
              />
            </motion.div>
            
            {/* Verified Badge */}
            {business.verified && (
              <div className="absolute top-4 left-4 flex items-center space-x-1 bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded-full">
                <CheckCircle className="w-4 h-4 text-white" />
                <span className="text-xs font-semibold text-white">Verified</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all">
              {business.name}
            </h3>
            
            <p className="text-slate-400 text-sm mb-4 line-clamp-2">
              {business.description}
            </p>

            {/* Location */}
            <div className="flex items-center space-x-2 text-slate-400 text-sm mb-4">
              <MapPin className="w-4 h-4 text-primary-400" />
              <span>{business.location}</span>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between">
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-white font-semibold">{business.rating}</span>
                </div>
                <span className="text-slate-400 text-sm">({business.reviewCount})</span>
              </div>

              {/* Views */}
              {business.views && (
                <div className="flex items-center space-x-1 text-slate-400 text-sm">
                  <Eye className="w-4 h-4" />
                  <span>{business.views.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="mt-4 pt-4 border-t border-white/10"
            >
              <div className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-600/20 to-accent-purple/20 border border-primary-500/50 text-primary-300 font-semibold text-sm hover:from-primary-600 hover:to-accent-purple hover:text-white transition-all">
                <span>View Profile</span>
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

