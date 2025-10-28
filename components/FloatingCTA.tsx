'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <motion.div
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(99, 102, 241, 0.4)',
                '0 0 40px rgba(139, 92, 246, 0.6)',
                '0 0 20px rgba(99, 102, 241, 0.4)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-16 top-1/2 -translate-y-1/2 glass-strong rounded-lg px-4 py-2 whitespace-nowrap"
              >
                <p className="text-white font-semibold text-sm">Add Your Business</p>
                <p className="text-slate-400 text-xs">It's free and verified!</p>
              </motion.div>
            )}

            <Link href="/add-business">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => setIsExpanded(true)}
                onHoverEnd={() => setIsExpanded(false)}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-600 to-accent-purple flex items-center justify-center shadow-2xl hover:shadow-primary-500/50 transition-shadow"
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Plus className="w-8 h-8 text-white" />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

