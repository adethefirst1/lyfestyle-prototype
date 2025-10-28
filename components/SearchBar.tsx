'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, MapPin } from 'lucide-react'

export default function SearchBar() {
  const router = useRouter()
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (category) params.append('search', category)
    if (location) params.append('location', location)
    router.push(`/businesses?${params.toString()}`)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onSubmit={handleSearch}
      className="glass-strong rounded-2xl p-2 flex flex-col md:flex-row gap-2 max-w-4xl mx-auto"
    >
      {/* Category Search */}
      <div className="flex-1 flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/5">
        <Search className="w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="What are you looking for?"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 bg-transparent text-white placeholder-slate-400 outline-none"
        />
      </div>

      {/* Location Search */}
      <div className="flex-1 flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/5">
        <MapPin className="w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Location (city, area)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 bg-transparent text-white placeholder-slate-400 outline-none"
        />
      </div>

      {/* Search Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-purple text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all neon-glow"
      >
        Search
      </motion.button>
    </motion.form>
  )
}

