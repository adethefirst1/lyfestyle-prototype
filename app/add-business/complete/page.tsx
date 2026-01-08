'use client'

import { useSearchParams } from 'next/navigation'
import { CheckCircle, Share2, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CompletePage() {
  const searchParams = useSearchParams()
  
  const businessName = searchParams.get('businessName') || 'Your Business'
  const category = searchParams.get('category') || 'Category'
  const whatsappNumber = searchParams.get('whatsappNumber') || 'Contact'
  const vibeTags = searchParams.getAll('vibeTags')
  const verificationSkipped = searchParams.get('verificationSkipped') === 'true'

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm text-center">
          {/* Success Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full mb-6 shadow-lg">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                className="w-2 h-2 bg-white rounded-full"
                aria-hidden="true"
              ></motion.div>
              <span className="font-bold">
                {verificationSkipped ? 'Profile Created' : 'Verification Pending'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-normal text-slate-900 mb-4">
              Welcome to Lyfestylz!
            </h1>
            <p className="text-slate-600 text-lg">
              {verificationSkipped
                ? "Your profile has been created. You can add verification later to get priority placement."
                : "Your profile is being reviewed. We'll notify you once verification is complete."}
            </p>
          </div>

          {/* Profile Snapshot Preview */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-left mb-8">
            <p className="text-sm font-semibold text-slate-900 mb-4">Your Profile Snapshot</p>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="aspect-[4/5] bg-slate-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-slate-400 text-sm">Profile Image</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900">{businessName}</h3>
                <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {vibeTags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs text-slate-500">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-xs text-slate-600">
                {category} • {whatsappNumber}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-[#FF6700] text-white font-bold rounded-lg hover:bg-[#e55a00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2"
            >
              <span>Go to Dashboard</span>
              <ExternalLink className="w-5 h-5" aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 font-semibold rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2"
            >
              <Share2 className="w-5 h-5" aria-hidden="true" />
              <span>Share Profile to WhatsApp Status</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

