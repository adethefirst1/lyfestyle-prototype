'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, MapPin, Search, Star, TrendingUp, Users, Shield, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import businesses from '@/data/businesses.json'
import categories from '@/data/categories.json'

// Lazy load components below the fold
const BusinessCard = dynamic(() => import('@/components/BusinessCard'), {
  loading: () => <div className="bg-slate-50 rounded-2xl h-64 animate-pulse" />,
})
const CategoryCard = dynamic(() => import('@/components/CategoryCard'), {
  loading: () => <div className="bg-slate-50 rounded-full w-32 h-32 animate-pulse" />,
})
const ProCard = dynamic(() => import('@/components/ProCard'), {
  loading: () => <div className="bg-slate-50 rounded-2xl w-48 h-96 animate-pulse" />,
})

export default function Home() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  // Use CSS-based mobile detection instead of JS resize listener
  // This prevents hydration issues and improves performance

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.append('search', searchQuery)
    if (location) params.append('location', location)
    router.push(`/businesses?${params.toString()}`)
  }

  // Get top picks - show fewer on mobile via CSS
  const topPicksNearYou = [
    {
      id: 'tp-1',
      name: 'Master Barber Studio',
      verified: true,
      distanceKm: 1.2,
      tag: '#SharpCuts',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1517832606294-0b1f6d9f2b3d?w=520&h=390&fit=crop&q=80',
      alt: 'Master Barber Studio - Professional barber shop with modern styling chairs and mirrors',
    },
    {
      id: 'tp-2',
      name: 'Co-working Café Spot',
      verified: true,
      distanceKm: 0.9,
      tag: '#QuietVibe',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=520&h=390&fit=crop&q=80',
      alt: 'Co-working Café Spot - Modern workspace café with natural lighting and comfortable seating',
    },
    {
      id: 'tp-3',
      name: 'Wellness Spa Lounge',
      verified: true,
      distanceKm: 2.4,
      tag: '#SoftLife',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=520&h=390&fit=crop&q=80',
      alt: 'Wellness Spa Lounge - Relaxing spa environment with massage therapy services',
    },
    {
      id: 'tp-4',
      name: 'Street Bites & Grill',
      verified: true,
      distanceKm: 1.8,
      tag: '#ChopLife',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=520&h=390&fit=crop&q=80',
      alt: 'Street Bites & Grill - Modern restaurant interior with warm lighting and contemporary design',
    },
    {
      id: 'tp-5',
      name: 'QuickFix Auto Garage',
      verified: true,
      distanceKm: 3.1,
      tag: '#ReliableHands',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=520&h=390&fit=crop&q=80',
      alt: 'QuickFix Auto Garage - Professional auto repair shop with modern equipment',
    },
  ]

  // Get verified businesses for "Meet the Pros" section
  const verifiedBusinesses = useMemo(
    () => businesses.filter((b) => b.recentlyVerified).slice(0, 4),
    []
  )

  // Trust metrics - these would come from API in production
  const trustMetrics = {
    totalBusinesses: 1856,
    verifiedBusinesses: 1243,
    totalReviews: 12450,
    averageRating: 4.7,
  }

  const valueProps = [
    {
      title: 'Human Verification',
      description: 'Every business is personally verified by our team. Real people, real places, real trust.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=240&h=240&fit=crop&q=80',
      alt: 'Team verification process - ensuring business authenticity and trust',
    },
    {
      title: 'Lifestyle Alignment',
      description: 'Discover spaces and services that resonate with how you live, not just what you need.',
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=240&h=240&fit=crop&q=80',
      alt: 'Lifestyle-focused business discovery - connecting people with services that match their style',
    },
    {
      title: 'Seamless Connection',
      description: 'From discovery to connection, a flow that feels natural and effortless.',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=240&h=240&fit=crop&q=80',
      alt: 'Seamless user experience - easy connection between customers and businesses',
    },
  ]

  const handleImageError = (key: string) => {
    setImageErrors((prev) => ({ ...prev, [key]: true }))
  }

  return (
    <div className="relative">
      {/* Hero Section - Reduced Height with Search Above Fold */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white">
        {/* Hero Image - Reduced Height */}
        <div className="relative h-[280px] sm:h-[350px] md:h-[420px] lg:h-[480px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1920&h=960&fit=crop&q=80"
            alt="Lyfestylz platform - Discover trusted local businesses and professionals in Nigeria"
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
            onError={() => handleImageError('hero')}
          />

          {/* Gradient Overlay - Lighter for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

          {/* Hero Content - Above Fold */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 z-10">
            <div className="w-full max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight">
                Lyfestylz
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 font-light max-w-2xl mx-auto drop-shadow-md leading-relaxed">
                Find the people and places that fit your flow
              </p>

              {/* Trust Signals - Above Fold */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 sm:pt-4">
                <div className="flex items-center gap-2 text-white/90 text-sm sm:text-base">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium">{trustMetrics.totalBusinesses.toLocaleString()}+ Businesses</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm sm:text-base">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium">{trustMetrics.verifiedBusinesses.toLocaleString()} Verified</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm sm:text-base">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                  <span className="font-medium">{trustMetrics.averageRating} Avg Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar - Prominent Above Fold Placement */}
        <div className="relative -mt-8 sm:-mt-12 md:-mt-16 z-20 px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2 border border-slate-200 focus-within:ring-2 focus-within:ring-[#FF6700]/20 focus-within:border-[#FF6700] transition-all"
              role="search"
              aria-label="Search for businesses"
            >
              {/* Search Input */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 sm:py-4">
                <Search className="w-5 h-5 text-slate-400 flex-shrink-0" aria-hidden="true" />
                <label htmlFor="search-query" className="sr-only">
                  What are you searching for
                </label>
                <input
                  id="search-query"
                  type="text"
                  placeholder="What are you searching for"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 outline-none text-sm sm:text-base min-w-0"
                  aria-label="Search query"
                />
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px bg-slate-200 my-2" aria-hidden="true" />

              {/* Location Input */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 sm:py-4 sm:border-l-0 border-t sm:border-t-0 border-slate-200">
                <div className="w-8 h-8 rounded-full bg-[#FF6700] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <label htmlFor="search-location" className="sr-only">
                  Location
                </label>
                <input
                  id="search-location"
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 outline-none text-sm sm:text-base min-w-0"
                  aria-label="Location"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-[#FF6700] text-white font-bold text-sm sm:text-base rounded-lg hover:bg-[#e55a00] focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2 transition-colors whitespace-nowrap shadow-lg min-h-[48px]"
                aria-label="Search businesses"
              >
                SEARCH
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Categories Section - Better Typography and Discoverability */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Explore by Category
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Browse verified businesses by service type
            </p>
          </div>

          {/* Horizontal Scrollable Categories with Scroll Indicator */}
          <div 
            className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
            role="region"
            aria-label="Business categories"
            tabIndex={0}
          >
            <div className="flex items-center gap-4 sm:gap-6 pb-4 min-w-max sm:min-w-0 sm:grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 sm:justify-items-center">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-500 text-center mt-2 sm:hidden" aria-hidden="true">
            ← Swipe to see more categories
          </p>
        </div>
      </section>

      {/* Top Picks Section - Fixed Location Label */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                Top Picks
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Popular verified businesses
              </p>
            </div>
            <Link
              href="/businesses"
              className="hidden sm:flex items-center gap-2 text-[#FF6700] hover:text-[#e55a00] font-semibold text-sm transition-colors"
              aria-label="View all businesses"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Horizontal Scrollable Cards with Better Mobile Sizing */}
          <div 
            className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
            role="region"
            aria-label="Top picks businesses"
            tabIndex={0}
          >
            <div className="flex items-start gap-4 sm:gap-5 pb-4 min-w-max sm:min-w-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {topPicksNearYou.map((biz) => (
                <Link
                  key={biz.id}
                  href="/businesses"
                  className="group flex-shrink-0 w-[280px] sm:w-full focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2 rounded-2xl"
                  aria-label={`View ${biz.name} profile`}
                >
                  {/* Image Card */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    {!imageErrors[`top-pick-${biz.id}`] ? (
                      <Image
                        src={biz.image}
                        alt={biz.alt}
                        fill
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] group-focus:scale-[1.03]"
                        sizes="(max-width: 640px) 280px, (max-width: 1024px) 33vw, 20vw"
                        quality={85}
                        onError={() => handleImageError(`top-pick-${biz.id}`)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <span className="text-slate-500 text-sm">Image unavailable</span>
                      </div>
                    )}

                    {/* Bottom Gradient Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                    {/* Title + Verified Badge */}
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="flex items-center gap-2">
                        <p className="text-white font-semibold text-sm sm:text-base leading-snug line-clamp-1 flex-1">
                          {biz.name}
                        </p>
                        {biz.verified && (
                          <CheckCircle 
                            className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6700] shrink-0" 
                            aria-label="Verified business"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-xs sm:text-sm text-slate-600 leading-tight">
                      {biz.distanceKm.toFixed(1)}km • {biz.tag} • {biz.rating.toFixed(1)}
                      <Star className="w-3 h-3 inline ml-0.5 fill-[#FF6700] text-[#FF6700]" aria-hidden="true" />
                    </p>
                    <span className="text-xs sm:text-sm text-slate-700 font-semibold opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
                      View
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-500 text-center mt-2 sm:hidden" aria-hidden="true">
            ← Swipe to see more businesses
          </p>
          
          {/* Mobile View All Link */}
          <div className="mt-6 sm:hidden text-center">
            <Link
              href="/businesses"
              className="inline-flex items-center gap-2 text-[#FF6700] hover:text-[#e55a00] font-semibold text-sm transition-colors"
            >
              View All Businesses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Meet the Pros Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
              Meet the <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#005BEC] to-[#005B84]">Pros</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Verified professionals ready to serve you
            </p>
          </div>

          {/* Horizontal Scroller */}
          <div 
            className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
            role="region"
            aria-label="Featured professionals"
            tabIndex={0}
          >
            <div className="flex gap-6 pb-4 min-w-max sm:min-w-0 sm:grid sm:grid-cols-2 md:grid-cols-4">
              {verifiedBusinesses.map((business) => (
                <ProCard 
                  key={business.id} 
                  pro={{
                    id: business.id,
                    name: business.name,
                    businessName: business.name,
                    category: business.category,
                    location: business.location,
                    rating: business.rating,
                    verified: business.verified,
                    banner: business.banner,
                    vibeTag: business.vibeTag,
                  }}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-500 text-center mt-2 sm:hidden" aria-hidden="true">
            ← Swipe to see more professionals
          </p>
        </div>
      </section>

      {/* Founding Member Invitation */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left: Visual Elements */}
            <div className="flex flex-col items-center lg:items-start space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-full shadow-sm border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center" aria-hidden="true">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-slate-900">Verified</span>
              </div>

              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <span className="px-4 py-2 text-sm text-slate-700 font-medium bg-white rounded-full border border-slate-200">
                  #SoftLife
                </span>
                <span className="px-4 py-2 text-sm text-slate-700 font-medium bg-white rounded-full border border-slate-200">
                  #ExecutiveGrooming
                </span>
                <span className="px-4 py-2 text-sm text-slate-700 font-medium bg-white rounded-full border border-slate-200">
                  #QuietVibe
                </span>
              </div>
            </div>

            {/* Right: Content and CTA */}
            <div className="text-center lg:text-left space-y-6 order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight">
                Connect with Verified Nigerian Businesses
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Join our verified network of trusted businesses. Create your listing and start connecting with customers today.
              </p>
              <div className="pt-4">
                <Link
                  href="/add-business"
                  className="inline-block px-8 py-4 bg-brand-orange text-white font-medium text-base sm:text-lg rounded-lg hover:bg-[#e55a00] focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:ring-offset-2 transition-colors shadow-md hover:shadow-lg min-h-[48px]"
                  aria-label="Create your business profile"
                >
                  Create Your Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-slate-900 mb-4 sm:mb-6 tracking-tight">
              Why Choose <span className="italic">Lyfestylz</span>
            </h2>
            <div className="w-16 sm:w-24 h-px bg-slate-300 mx-auto" aria-hidden="true" />
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mt-4 sm:mt-6">
              Your local ecosystem, verified and ready
            </p>
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            {valueProps.map((prop, index) => (
              <div
                key={prop.title}
                className="group text-center"
              >
                {/* Circular Image */}
                <div className="mb-6 flex justify-center">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-slate-100 group-hover:ring-[#FF6700]/20 transition-all">
                    {!imageErrors[`value-${index}`] ? (
                      <Image
                        src={prop.image}
                        alt={prop.alt}
                        width={128}
                        height={128}
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 w-full h-full"
                        quality={85}
                        onError={() => handleImageError(`value-${index}`)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <Shield className="w-8 h-8 text-slate-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Heading */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-normal text-slate-900 mb-3 tracking-tight">
                  {prop.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light max-w-sm mx-auto">
                  {prop.description}
                </p>

                {/* Number Indicator */}
                <div className="mt-6 text-xs text-slate-400 font-light tracking-widest">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
