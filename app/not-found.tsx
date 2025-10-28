'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <motion.h1
            animate={{
              textShadow: [
                '0 0 20px rgba(99, 102, 241, 0.5)',
                '0 0 40px rgba(139, 92, 246, 0.8)',
                '0 0 20px rgba(99, 102, 241, 0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-9xl md:text-[200px] font-bold text-gradient leading-none"
          >
            404
          </motion.h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off.
            Let's get you back on track.
          </p>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="inline-block glass-strong rounded-3xl p-12">
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Search className="w-24 h-24 text-slate-400 mx-auto" />
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="flex items-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-accent-purple text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all neon-glow-hover"
          >
            <Home className="w-5 h-5" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/businesses"
            className="flex items-center space-x-2 px-8 py-4 rounded-xl glass hover:glass-strong text-white font-semibold transition-all"
          >
            <Search className="w-5 h-5" />
            <span>Browse Businesses</span>
          </Link>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <p className="text-slate-500 text-sm">
            Need help?{' '}
            <a href="/about" className="text-primary-400 hover:text-primary-300 transition-colors">
              Contact Support
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

