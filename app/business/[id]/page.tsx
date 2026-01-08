'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  CheckCircle,
  Shield,
  Flag,
  ExternalLink,
  Award,
  Eye,
  ArrowLeft,
} from 'lucide-react'
import businesses from '@/data/businesses.json'

interface PageProps {
  params: Promise<{ id: string }>
}

function BusinessProfile({ businessId }: { businessId: string }) {
  const router = useRouter()
  const business = businesses.find((b) => b.id === businessId)

  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [showReviewForm, setShowReviewForm] = useState(false)

  if (!business) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Business Not Found</h1>
          <button
            onClick={() => router.push('/businesses')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-primary-500 text-white font-semibold"
          >
            Back to Businesses
          </button>
        </div>
      </div>
    )
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle review submission
    alert('Review submitted! (Demo only)')
    setShowReviewForm(false)
    setRating(0)
    setReview('')
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-80 bg-gradient-to-br from-primary-900 to-brand-blue/50 overflow-hidden"
      >
        <img
          src={business.banner}
          alt={business.name}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Business Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-strong rounded-2xl p-8 mb-6"
            >
              <div className="flex items-start gap-6">
                <img
                  src={business.logo}
                  alt={business.name}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white/20 shrink-0"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-4xl font-bold text-white mb-2">{business.name}</h1>
                      <div className="flex items-center space-x-3">
                        {business.verified && (
                          <div className="flex items-center space-x-1 text-green-400">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-semibold">Verified</span>
                          </div>
                        )}
                        {business.featured && (
                          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold">
                            Featured
                          </div>
                        )}
                      </div>
                    </div>

                    <button className="p-3 rounded-xl glass hover:glass-strong transition-all">
                      <Flag className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(business.rating)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white font-semibold text-lg">{business.rating}</span>
                    <span className="text-slate-400">({business.reviewCount} reviews)</span>
                  </div>

                  {/* Verification Badges */}
                  <div className="flex items-center gap-3">
                    {business.cacVerified && (
                      <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30">
                        <Shield className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm font-semibold">CAC Verified</span>
                      </div>
                    )}
                    {business.idVerified && (
                      <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30">
                        <Award className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 text-sm font-semibold">ID Verified</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-slate-400 text-sm">
                      <Eye className="w-4 h-4" />
                      <span>{business.views?.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-strong rounded-2xl p-8 mb-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4">About</h2>
              <p className="text-slate-300 leading-relaxed">{business.description}</p>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-strong rounded-2xl p-8 mb-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Services</h2>
              <div className="flex flex-wrap gap-3">
                {business.services.map((service) => (
                  <div
                    key={service}
                    className="px-4 py-2 rounded-lg bg-primary-500/10 border border-primary-500/30 text-primary-300 font-medium"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-strong rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Reviews</h2>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-brand-blue to-primary-500 text-white font-semibold hover:shadow-lg transition-all"
                >
                  {showReviewForm ? 'Cancel' : 'Write a Review'}
                </button>
              </div>

              {showReviewForm && (
                <form onSubmit={handleSubmitReview} className="mb-8 p-6 rounded-xl glass">
                  <div className="mb-4">
                    <label className="text-sm font-semibold text-slate-300 mb-2 block">
                      Your Rating
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-semibold text-slate-300 mb-2 block">
                      Your Review
                    </label>
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      rows={4}
                      placeholder="Share your experience..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-primary-500 text-white font-semibold hover:shadow-lg transition-all"
                  >
                    Submit Review
                  </button>
                </form>
              )}

              <p className="text-slate-400 text-center py-8">
                No reviews yet. Be the first to review this business!
              </p>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-96 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-strong rounded-2xl p-6 sticky top-28"
            >
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary-400 mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Address</p>
                    <p className="text-white">{business.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-primary-400 mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Phone</p>
                    <a href={`tel:${business.phone}`} className="text-white hover:text-primary-400">
                      {business.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-primary-400 mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Email</p>
                    <a href={`mailto:${business.email}`} className="text-white hover:text-primary-400">
                      {business.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary-400 mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Hours</p>
                    <p className="text-white">{business.hours}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-primary-500 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </button>

                <button className="w-full px-6 py-3 rounded-xl glass hover:glass-strong text-white font-semibold transition-all flex items-center justify-center space-x-2">
                  <ExternalLink className="w-5 h-5" />
                  <span>Get Directions</span>
                </button>

                <button className="w-full px-6 py-3 rounded-xl glass hover:glass-strong text-white font-semibold transition-all">
                  Claim this Business
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BusinessProfilePage({ params }: PageProps) {
  const resolvedParams = use(params)
  return <BusinessProfile businessId={resolvedParams.id} />
}
