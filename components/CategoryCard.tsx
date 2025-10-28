'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

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
  index?: number
}

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  // @ts-ignore - Dynamic icon loading
  const Icon = Icons[category.icon] || Icons.Briefcase

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="group"
    >
      <Link href={`/businesses?category=${category.id}`}>
        <div className="glass rounded-2xl p-6 hover:glass-strong transition-all duration-300 neon-glow-hover relative overflow-hidden">
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
          
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all">
              {category.name}
            </h3>
            
            <p className="text-slate-400 text-sm mb-4">
              {category.description}
            </p>

            {/* Count Badge */}
            <div className="flex items-center justify-between">
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="text-primary-300 text-sm font-semibold">
                  {category.count}+ businesses
                </span>
              </div>
              
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                className="text-primary-400"
              >
                <Icons.ArrowRight className="w-5 h-5" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

