'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams, useRouter } from 'next/navigation'
import { Filter, X, Search, MapPin } from 'lucide-react'
import BusinessCard from '@/components/BusinessCard'
import businesses from '@/data/businesses.json'
import categories from '@/data/categories.json'

function BusinessListingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [minRating, setMinRating] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')

  const cities = Array.from(new Set(businesses.map((b) => b.city))).sort()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.append('search', searchQuery)
    if (location) params.append('location', location)
    if (selectedCategory) params.append('category', selectedCategory)
    router.push(`/businesses?${params.toString()}`)
  }

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const locationParam = searchParams.get('location')
    const searchParam = searchParams.get('search')

    // Set state from URL params
    if (categoryParam) setSelectedCategory(categoryParam)
    if (locationParam) {
      setLocation(locationParam)
      setSelectedCity(locationParam)
    }
    if (searchParam) setSearchQuery(searchParam)

    let filtered = businesses

    if (categoryParam) {
      filtered = filtered.filter((b) => b.category === categoryParam)
    }

    if (locationParam) {
      filtered = filtered.filter((b) =>
        b.location.toLowerCase().includes(locationParam.toLowerCase()) ||
        b.city.toLowerCase().includes(locationParam.toLowerCase())
      )
    }

    if (searchParam) {
      filtered = filtered.filter(
        (b) =>
          b.name.toLowerCase().includes(searchParam.toLowerCase()) ||
          b.description.toLowerCase().includes(searchParam.toLowerCase()) ||
          b.category.toLowerCase().includes(searchParam.toLowerCase())
      )
    }

    if (selectedCategory && !categoryParam) {
      filtered = filtered.filter((b) => b.category === selectedCategory)
    }

    if (selectedCity && !locationParam) {
      filtered = filtered.filter((b) => b.city === selectedCity)
    }

    if (showVerifiedOnly) {
      filtered = filtered.filter((b) => b.verified)
    }

    if (minRating > 0) {
      filtered = filtered.filter((b) => b.rating >= minRating)
    }

    setFilteredBusinesses(filtered)
  }, [searchParams, selectedCategory, selectedCity, showVerifiedOnly, minRating])

  const clearFilters = () => {
    setSelectedCategory('')
    setSelectedCity('')
    setShowVerifiedOnly(false)
    setMinRating(0)
    setSearchQuery('')
    setLocation('')
    router.push('/businesses')
  }

  return (
    <div className="min-h-screen bg-white pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
            Browse Businesses
          </h1>
          <p className="text-slate-600 text-lg">
            {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'business' : 'businesses'} found
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-xl shadow-sm p-2 flex flex-col md:flex-row gap-2 border border-slate-200 max-w-5xl"
          >
            {/* Search Input */}
            <div className="flex-1 flex items-center space-x-3 px-4 py-3.5 border border-slate-200 rounded-lg focus-within:border-brand-orange focus-within:ring-2 focus-within:ring-brand-orange/20 transition-all">
              <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search for businesses, services, or categories"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 outline-none text-sm md:text-base"
              />
            </div>

            {/* Location Input */}
            <div className="flex-1 flex items-center space-x-3 px-4 py-3.5 border border-slate-200 rounded-lg focus-within:border-brand-orange focus-within:ring-2 focus-within:ring-brand-orange/20 transition-all">
              <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="City or location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 outline-none text-sm md:text-base"
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="px-8 py-3.5 bg-brand-orange text-white font-medium text-sm md:text-base rounded-lg hover:bg-[#e55a00] transition-colors whitespace-nowrap shadow-sm hover:shadow-md"
            >
              Search
            </button>
          </form>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-80 shrink-0"
          >
            <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-28 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-slate-600" />
                  <span>Filters</span>
                </h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-slate-600 hover:text-slate-900 transition-colors"
                  aria-label="Toggle filters"
                >
                  {showFilters ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium text-slate-900 mb-2 block">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-colors text-sm"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City Filter */}
                <div>
                  <label className="text-sm font-medium text-slate-900 mb-2 block">
                    City
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-colors text-sm"
                  >
                    <option value="">All Cities</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Verified Only */}
                <div>
                  <label className="flex items-center space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={showVerifiedOnly}
                      onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 bg-white text-brand-orange focus:ring-brand-orange/20 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-sm text-slate-700 group-hover:text-slate-900">
                      Verified businesses only
                    </span>
                  </label>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="text-sm font-medium text-slate-900 mb-3 block">
                    Minimum Rating
                  </label>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 0].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="w-4 h-4 border-slate-300 bg-white text-brand-orange focus:ring-brand-orange/20 focus:ring-offset-0 cursor-pointer"
                        />
                        <span className="text-sm text-slate-700 group-hover:text-slate-900">
                          {rating === 0 ? 'All Ratings' : `${rating}+ stars`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 font-medium transition-colors text-sm"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </motion.div>

          {/* Business Grid */}
          <div className="flex-1">
            {filteredBusinesses.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-200 rounded-xl p-16 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">No businesses found</h3>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  No businesses match your current search criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 rounded-lg bg-brand-orange text-white font-medium hover:bg-[#e55a00] transition-colors shadow-sm hover:shadow-md"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBusinesses.map((business, index) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BusinessesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-slate-900 text-xl">Loading...</div>
      </div>
    }>
      <BusinessListingContent />
    </Suspense>
  )
}

