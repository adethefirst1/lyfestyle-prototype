'use client'

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className={`${className} bg-gradient-to-br from-primary-900/50 to-brand-blue/50 flex items-center justify-center`}>
        <div className="text-slate-400 text-center text-sm">Image unavailable</div>
      </div>
    )
  }

  return (
    <div className={`relative ${className} ${isLoading ? 'animate-pulse bg-slate-800' : ''}`}>
      <Image
        src={src}
        alt={alt}
        width={width || 400}
        height={height || 400}
        className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => setError(true)}
        priority={priority}
        quality={75}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  )
}

