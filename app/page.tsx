'use client'

import { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle, MapPin, Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import businesses from '@/data/businesses.json'
import categories from '@/data/categories.json'

// Lazy load components below the fold
const BusinessCard = dynamic(() => import('@/components/BusinessCard'), {
  loading: () => <div className="glass rounded-2xl h-64" />,
})
const CategoryCard = dynamic(() => import('@/components/CategoryCard'), {
  loading: () => <div className="glass rounded-2xl h-48" />,
})
const ProCard = dynamic(() => import('@/components/ProCard'), {
  loading: () => <div className="w-64 h-96" />,
})

export default function Home() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.append('search', searchQuery)
    if (location) params.append('location', location)
    router.push(`/businesses?${params.toString()}`)
  }


  const topPicksNearYou = [
    {
      id: 'tp-1',
      name: 'Master Barber Studio',
      verified: true,
      distanceKm: 1.2,
      tag: '#SharpCuts',
      rating: 4.8,
      image:
        'https://images.unsplash.com/photo-1517832606294-0b1f6d9f2b3d?w=1200&h=900&fit=crop',
    },
    {
      id: 'tp-2',
      name: 'Co-working Café Spot',
      verified: true,
      distanceKm: 0.9,
      tag: '#QuietVibe',
      rating: 4.7,
      image:
        'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1200&h=900&fit=crop',
    },
    {
      id: 'tp-3',
      name: 'Wellness Spa Lounge',
      verified: true,
      distanceKm: 2.4,
      tag: '#SoftLife',
      rating: 4.9,
      image:
        'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=900&fit=crop',
    },
    {
      id: 'tp-4',
      name: 'Street Bites & Grill',
      verified: true,
      distanceKm: 1.8,
      tag: '#ChopLife',
      rating: 4.6,
      image:
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=900&fit=crop',
    },
    {
      id: 'tp-5',
      name: 'QuickFix Auto Garage',
      verified: true,
      distanceKm: 3.1,
      tag: '#ReliableHands',
      rating: 4.5,
      image:
        'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=900&fit=crop',
    },
  ]

  // Memoize expensive computations
  const verifiedBusinesses = useMemo(
    () => businesses.filter((b) => b.recentlyVerified).slice(0, isMobile ? 2 : 4),
    [isMobile]
  )


  const valueProps = [
    {
      title: 'Human Verification',
      description: 'Every business is personally verified by our team. Real people, real places, real trust.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop&q=80',
    },
    {
      title: 'Lifestyle Alignment',
      description: 'Discover spaces and services that resonate with how you live, not just what you need.',
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&fit=crop&q=80',
    },
    {
      title: 'Seamless Connection',
      description: 'From discovery to connection, a flow that feels natural and effortless.',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop&q=80',
    },
  ]

  return (
    <div className="relative">
      {/* Hero Section with Full-Width Lifestyle Photography */}
      <section className="relative pt-20">
        {/* Full-Width Lifestyle Background Image */}
        <div className="relative h-[500px] md:h-[600px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1920&h=1080&fit=crop"
            alt="Lifestyle - People enjoying local experiences, cafes, and community spaces"
            fill
            className="object-cover"
            priority
            unoptimized
          />

          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50"></div>

          {/* Text Overlay - Lifestyle-Oriented */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg">
              Lyfestylz
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white font-light max-w-3xl drop-shadow-md px-4 leading-relaxed">
              Find the people and places that fit your flow
            </p>
          </div>
        </div>

        {/* Search Bar Below Collage - FONDAAR Style */}
        <div className="relative -mt-10 z-20 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-5xl mx-auto">
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-lg shadow-xl p-1.5 flex flex-col md:flex-row gap-2 border border-slate-100"
            >
              {/* Search Input */}
              <div className="flex-1 flex items-center space-x-3 px-4 py-3.5">
                <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="What are you searching"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 outline-none text-sm md:text-base"
                />
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px bg-slate-200 my-2"></div>

              {/* Location Input */}
              <div className="flex-1 flex items-center space-x-3 px-4 py-3.5 md:border-l-0 border-t md:border-t-0 border-slate-200">
                <div className="w-8 h-8 rounded-full bg-[#FF6700] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 outline-none text-sm md:text-base"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#FF6700] text-white font-bold text-sm md:text-base rounded-md hover:bg-[#e55a00] transition-colors whitespace-nowrap shadow-md"
              >
                SEARCH
              </button>
            </form>
          </div>
        </div>

        {/* Explore Categories - Right under search section */}
        <div className="px-4 sm:px-6 lg:px-8 pt-0 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-[15px] font-bold text-slate-900">
                EXPLORE BY CATEGORY
              </h2>
            </div>

            {/* Horizontal Scrollable Categories - Straight Line with Even Spacing */}
            <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
              <div className="flex items-center pb-4 gap-4 md:gap-6 lg:gap-8">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>

            {/* Top Picks Near You */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[15px] font-bold text-slate-900">TOP PICKS NEAR YOU</h3>
              </div>

              <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
                <div className="flex items-start gap-4 md:gap-5 pb-2 min-w-max">
                  {topPicksNearYou.map((biz) => (
                    <Link
                      key={biz.id}
                      href="/businesses"
                      className="group flex-shrink-0 w-[240px] md:w-[260px]"
                      aria-label={`View ${biz.name}`}
                    >
                      {/* Image-dominant card (no border, no background) */}
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                        <Image
                          src={biz.image}
                          alt={biz.name}
                          fill
                          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 70vw, 260px"
                          unoptimized
                        />

                        {/* Bottom gradient overlay */}
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />

                        {/* Title + verified */}
                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <div className="flex items-center gap-2">
                            <p className="text-white font-semibold leading-snug line-clamp-1">
                              {biz.name}
                            </p>
                            {biz.verified && (
                              <CheckCircle className="w-4 h-4 text-[#FF6700] shrink-0" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Metadata + Book (ghost) */}
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <p className="text-[12px] text-slate-500 leading-tight">
                          {biz.distanceKm.toFixed(1)}km away • {biz.tag} • {biz.rating.toFixed(1)}★
                        </p>

                        <span className="text-[12px] text-slate-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          Book
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Pros - Premium Horizontal Scroller */}
      <section className="py-[100px] px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
              Meet the <span className="text-gradient">Pros</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
              Verified professionals ready to serve you
            </p>
          </div>

          {/* Single-Line Horizontal Scroller - No Visible Scrollbar */}
          <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-6 pb-4 min-w-max">
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
        </div>
      </section>


              {/* Founding Member Invitation */}
              <section className="py-16 md:py-24 lg:py-[100px] px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Mock-up of Verified Badge and Vibe Tags */}
            <div className="flex flex-col items-center lg:items-start space-y-6">
              {/* Verified Badge Mock-up */}
              <div className="flex items-center space-x-3 px-4 py-3 bg-white rounded-full shadow-sm border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-slate-900">Verified</span>
              </div>

              {/* Vibe Tags Mock-up */}
              <div className="flex flex-wrap gap-2">
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
            <div className="text-center lg:text-left space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-normal text-slate-900 leading-tight">
                Your vibe deserves to be discovered
              </h2>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Join the vetted ecosystem of Nigerian pros. No hidden fees for founding members.
              </p>
              <div className="pt-4">
                <Link
                  href="/add-business"
                  className="inline-block px-8 py-4 bg-[#FF6700] text-white font-bold text-lg rounded-lg hover:bg-[#e55a00] transition-colors shadow-lg"
                >
                  Claim Your Free Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

              {/* Value Proposition - Magazine Style */}
              <section className="py-16 md:py-24 lg:py-[100px] px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Minimalist Header */}
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-normal text-slate-900 mb-4 md:mb-6 tracking-tight">
              Why Choose <span className="italic">Lyfestylz</span>
            </h2>
            <div className="w-16 md:w-24 h-px bg-slate-300 mx-auto"></div>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto mt-4 md:mt-6">
              Your local ecosystem, verified and ready
            </p>
          </div>

          {/* Three Column Layout - Magazine Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {valueProps.map((prop, index) => (
              <div
                key={prop.title}
                className="group"
              >
                {/* Circular Image Mask - 50% Size, 120px Diameter */}
                <div className="mb-6 flex justify-center">
                  <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden">
                    <Image
                      src={prop.image}
                      alt={prop.title}
                      width={120}
                      height={120}
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Serif Heading */}
                <h3 className="text-2xl md:text-3xl font-serif font-normal text-slate-900 mb-3 tracking-tight text-center">
                  {prop.title}
                </h3>

                {/* Elegant Body Copy */}
                <p className="text-slate-600 text-sm leading-relaxed font-light text-center">
                  {prop.description}
                </p>

                {/* Subtle Number Indicator */}
                <div className="mt-6 text-xs text-slate-400 font-light tracking-widest text-center">
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
