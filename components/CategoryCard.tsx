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
    <Link 
      href={`/businesses?category=${category.id}`} 
      className="flex-shrink-0 group focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2 rounded-full p-1 transition-all"
      aria-label={`Browse ${category.name} businesses`}
    >
      <div className="flex flex-col items-center">
        {/* Circular Lifestyle Image - Improved touch target */}
        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden mb-3 group-hover:scale-105 group-focus:scale-105 transition-transform duration-300 ring-2 ring-slate-100 group-hover:ring-[#FF6700]/20">
          <Image
            src={imageUrl}
            alt={`${category.name} - Browse verified ${category.name.toLowerCase()} businesses`}
            width={144}
            height={144}
            className="w-full h-full object-cover"
            quality={85}
            sizes="(max-width: 640px) 128px, 144px"
          />
        </div>
        
        {/* Caption - Improved typography */}
        <p className="text-sm text-center text-slate-900 font-medium">
          {category.name}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">
          {category.count} businesses
        </p>
      </div>
    </Link>
  )
}

export default memo(CategoryCard)

