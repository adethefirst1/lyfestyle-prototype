'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { Filter, X } from 'lucide-react'
import BusinessCard from '@/components/BusinessCard'
import businesses from '@/data/businesses.json'
import categories from '@/data/categories.json'

function BusinessListingContent() {
  const searchParams = useSearchParams()
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [minRating, setMinRating] = useState(0)
  const [showFilters, setShowFilters] = useState(false)

  const cities = [...new Set(businesses.map((b) => b.city))].sort()

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const locationParam = searchParams.get('location')
    const searchParam = searchParams.get('search')

    let filtered = businesses

    if (categoryParam) {
      filtered = filtered.filter((b) => b.category === categoryParam)
      setSelectedCategory(categoryParam)
    }

    if (locationParam) {
      filtered = filtered.filter((b) =>
        b.location.toLowerCase().includes(locationParam.toLowerCase())
      )
      setSelectedCity(locationParam)
    }

    if (searchParam) {
      filtered = filtered.filter(
        (b) =>
          b.name.toLowerCase().includes(searchParam.toLowerCase()) ||
          b.description.toLowerCase().includes(searchParam.toLowerCase())
      )
    }

    if (selectedCategory && !categoryParam) {
      filtered = filtered.filter((b) => b.category === selectedCategory)
    }

    if (selectedCity) {
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
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover <span className="text-gradient">Businesses</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Found {filteredBusinesses.length} verified businesses
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-80 shrink-0"
          >
            <div className="glass-strong rounded-2xl p-6 sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-slate-400 hover:text-white"
                >
                  {showFilters ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-3 block">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-primary-500 transition-colors"
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
                  <label className="text-sm font-semibold text-slate-300 mb-3 block">
                    City
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-primary-500 transition-colors"
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
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={showVerifiedOnly}
                      onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-slate-300 group-hover:text-white transition-colors">
                      Show verified only
                    </span>
                  </label>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-3 block">
                    Minimum Rating
                  </label>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 0].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="w-4 h-4 border-white/20 bg-white/5 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer"
                        />
                        <span className="text-slate-300 group-hover:text-white transition-colors">
                          {rating === 0 ? 'All Ratings' : `${rating}+ stars`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold transition-all border border-white/10"
                >
                  Clear All Filters
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
                className="glass rounded-2xl p-12 text-center"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">No businesses found</h3>
                <p className="text-slate-400 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-purple text-white font-semibold hover:shadow-lg transition-all"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBusinesses.map((business, index) => (
                  <BusinessCard key={business.id} business={business} index={index} />
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
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <BusinessListingContent />
    </Suspense>
  )
}

