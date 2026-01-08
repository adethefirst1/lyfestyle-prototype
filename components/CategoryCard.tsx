'use client'

import Link from 'next/link'
import Image from 'next/image'
import { memo } from 'react'

interface Category {
  id: string
  name: string
  icon: string
  description: string
  color: string
  count: number
}

interface CategoryCardProps {
  category: Category
}

// High-quality lifestyle images for categories - no generic icons
const categoryImages: Record<string, string> = {
  auto: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop',
  beauty: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop',
  tech: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=400&fit=crop',
  food: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=400&fit=crop',
  health: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
  home: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop',
  fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
}

function CategoryCard({ category }: CategoryCardProps) {
  const imageUrl = categoryImages[category.id] || 'https://images.unsplash.com/photo-1552568031-326ec03fe763?w=400&h=400&fit=crop'

  return (
    <Link href={`/businesses?category=${category.id}`} className="flex-shrink-0 group">
      <div className="flex flex-col items-center">
        {/* Circular Lifestyle Image - No borders, no background casing */}
        <div className="w-32 h-32 rounded-full overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-300">
          <Image
            src={imageUrl}
            alt={category.name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
        
        {/* Caption - Clean, minimal */}
        <p className="text-xs text-center text-slate-900 font-medium">
          {category.name}
        </p>
      </div>
    </Link>
  )
}

export default memo(CategoryCard)

