'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
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
  MessageCircle,
  Navigation,
  Share2,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'
import businesses from '@/data/businesses.json'

interface PageProps {
  params: { id: string }
}

function BusinessProfile({ businessId }: { businessId: string }) {
  const router = useRouter()
  const business = businesses.find((b) => String(b.id) === String(businessId))
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [error, setError] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Business Not Found</h1>
          <p className="text-slate-600 mb-6">The business you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.push('/businesses')}
            className="px-6 py-3 rounded-lg bg-brand-orange text-white font-medium hover:bg-[#e55a00] transition-colors"
          >
            Back to Businesses
          </button>
        </div>
      </div>
    )
  }

  // Mock gallery images (in production, this would come from business data)
  const galleryImages = [
    business.banner || '',
    business.logo || '',
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop',
  ].filter(Boolean)

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate review
    if (rating === 0) {
      setError('Please select a rating')
      return
    }
    
    if (!review.trim()) {
      setError('Please write a review')
      return
    }
    
    // Sanitize review text
    const sanitizedReview = review
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/[<>]/g, '')
      .trim()
    
    if (!sanitizedReview) {
      setError('Review cannot be empty')
      return
    }
    
    // In production, send to API endpoint
    // For now, show success message
    setSuccessMessage('Thank you! Your review has been submitted.')
    setShowReviewForm(false)
    setRating(0)
    setReview('')
    setError('')
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage('')
    }, 5000)
  }

  // Sanitize phone number - remove all non-digit characters except +
  const sanitizePhoneNumber = (phone: string): string => {
    return phone.replace(/[^\d+]/g, '').replace(/^\+/, '')
  }

  // Sanitize address - remove potentially dangerous characters
  const sanitizeAddress = (address: string): string => {
    // Remove script tags and dangerous characters, but keep address format
    return address
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/[<>]/g, '')
      .trim()
  }

  // Validate URL to prevent open redirect attacks
  const isValidUrl = (url: string): boolean => {
    try {
      const parsed = new URL(url)
      // Only allow https://wa.me, https://www.google.com/maps
      const allowedDomains = ['wa.me', 'www.google.com', 'maps.google.com']
      return parsed.protocol === 'https:' && allowedDomains.includes(parsed.hostname)
    } catch {
      return false
    }
  }

  // WhatsApp messaging helper function
  const openWhatsApp = () => {
    if (!business.phone) return
    
    // Sanitize phone number
    const sanitizedPhone = sanitizePhoneNumber(business.phone)
    
    // Validate phone number format (Nigerian numbers: starts with 234 or 0, followed by 7-9, then 9 digits)
    if (!/^(\+?234|0)?[789]\d{9}$/.test(sanitizedPhone)) {
      setError('Invalid phone number format')
      return
    }
    
    // Sanitize business name for message
    const safeBusinessName = business.name.replace(/[<>]/g, '')
    const message = encodeURIComponent(
      `Hello ${safeBusinessName},\n\nI found your business on Lyfestylz and I'm interested in learning more about your services.\n\nCould you please provide more information?`
    )
    
    const whatsappUrl = `https://wa.me/${sanitizedPhone}?text=${message}`
    
    // Validate URL before opening
    if (isValidUrl(whatsappUrl)) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    }
  }

  // Google Maps navigation helper function
  const openGoogleMaps = () => {
    if (!business.address) return
    
    // Sanitize address
    const sanitizedAddress = sanitizeAddress(business.address)
    if (!sanitizedAddress) {
      setError('Invalid address')
      return
    }
    
    const encodedAddress = encodeURIComponent(sanitizedAddress)
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
    
    // Validate URL before opening
    if (isValidUrl(mapsUrl)) {
      window.open(mapsUrl, '_blank', 'noopener,noreferrer')
    }
  }

  // Get directions with turn-by-turn navigation
  const getDirections = () => {
    if (!business.address) return
    
    // Sanitize address
    const sanitizedAddress = sanitizeAddress(business.address)
    if (!sanitizedAddress) {
      setError('Invalid address')
      return
    }
    
    const encodedAddress = encodeURIComponent(sanitizedAddress)
    
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          
          // Validate coordinates are numbers
          if (isNaN(lat) || isNaN(lng)) {
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
            if (isValidUrl(mapsUrl)) {
              window.open(mapsUrl, '_blank', 'noopener,noreferrer')
            }
            return
          }
          
          const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${encodedAddress}&travelmode=driving`
          
          // Validate URL before opening
          if (isValidUrl(mapsUrl)) {
            window.open(mapsUrl, '_blank', 'noopener,noreferrer')
          }
        },
        (error) => {
          // Handle geolocation errors gracefully
          console.error('Geolocation error:', error.message)
          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
          if (isValidUrl(mapsUrl)) {
            window.open(mapsUrl, '_blank', 'noopener,noreferrer')
          }
        },
        {
          timeout: 5000,
          maximumAge: 60000,
          enableHighAccuracy: false
        }
      )
    } else {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
      if (isValidUrl(mapsUrl)) {
        window.open(mapsUrl, '_blank', 'noopener,noreferrer')
      }
    }
  }

  const shareBusiness = async () => {
    if (typeof navigator === 'undefined') return
    
    const shareUrl = window.location.href
    const safeBusinessName = business.name.replace(/[<>]/g, '')
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: safeBusinessName,
          text: `Check out ${safeBusinessName} on Lyfestylz`,
          url: shareUrl,
        })
      } catch (error) {
        // User cancelled or share failed, fallback to clipboard
        if (navigator.clipboard && error instanceof Error && error.name !== 'AbortError') {
          try {
            await navigator.clipboard.writeText(shareUrl)
            setSuccessMessage('Link copied to clipboard!')
            setTimeout(() => setSuccessMessage(''), 3000)
          } catch (clipboardError) {
            setError('Unable to copy link. Please copy manually.')
            setTimeout(() => setError(''), 3000)
          }
        }
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl)
        setSuccessMessage('Link copied to clipboard!')
        setTimeout(() => setSuccessMessage(''), 3000)
      } catch (error) {
        setError('Unable to copy link. Please copy manually.')
        setTimeout(() => setError(''), 3000)
      }
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  // Check if business is currently open (mock logic)
  const isOpenNow = () => {
    const now = new Date()
    const hour = now.getHours()
    // Simple check - in production, parse hours properly
    return hour >= 8 && hour < 18
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-50 border border-green-200 text-green-800 px-6 py-3 rounded-lg shadow-lg max-w-md mx-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}
      {error && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-red-50 border border-red-200 text-red-800 px-6 py-3 rounded-lg shadow-lg max-w-md mx-4">
          <div className="flex items-center space-x-2">
            <X className="w-5 h-5 text-red-600" />
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Header with Back Button */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Hero Banner with Gallery */}
      <div className="relative h-[400px] sm:h-[500px] overflow-hidden bg-slate-100">
        {galleryImages.length > 0 && (
          <>
            <Image
              src={galleryImages[currentImageIndex]}
              alt={`${business.name} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority
              quality={90}
            />
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-slate-900" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-slate-900" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Business Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 mb-6"
            >
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Logo */}
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg shrink-0">
                  <Image
                    src={business.logo}
                    alt={business.name}
                    fill
                    className="object-cover"
                    quality={90}
                  />
                </div>

                {/* Business Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-3">
                        {business.name}
                      </h1>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        {business.verified && (
                          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-semibold text-green-700">Verified</span>
                          </div>
                        )}
                        {business.featured && (
                          <div className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200">
                            <span className="text-sm font-semibold text-amber-700">Featured</span>
                          </div>
                        )}
                        {business.cacVerified && (
                          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200">
                            <Shield className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-semibold text-blue-700">CAC Verified</span>
                          </div>
                        )}
                        {business.idVerified && (
                          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200">
                            <Award className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-semibold text-purple-700">ID Verified</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={shareBusiness}
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        aria-label="Share business"
                      >
                        <Share2 className="w-5 h-5 text-slate-600" />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        aria-label="Report business"
                      >
                        <Flag className="w-5 h-5 text-slate-600" />
                      </button>
                    </div>
                  </div>

                  {/* Rating and Stats */}
                  <div className="flex flex-wrap items-center gap-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(business.rating)
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xl font-bold text-slate-900">{business.rating}</span>
                      <span className="text-slate-600">({business.reviewCount} reviews)</span>
                    </div>
                    {business.views && (
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">{business.views.toLocaleString()} views</span>
                      </div>
                    )}
                  </div>

                  {/* Location and Hours */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <MapPin className="w-4 h-4 text-brand-orange" />
                      <span>{business.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Clock className={`w-4 h-4 ${isOpenNow() ? 'text-green-600' : 'text-slate-400'}`} />
                      <span className={isOpenNow() ? 'text-green-700 font-medium' : ''}>
                        {business.hours}
                        {isOpenNow() && <span className="ml-2">• Open Now</span>}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-6"
            >
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">About</h2>
              <p className="text-slate-600 leading-relaxed text-lg">{business.description}</p>
            </motion.div>

            {/* Services Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-6"
            >
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">Services Offered</h2>
              {business.services && business.services.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {business.services.map((service) => (
                    <div
                      key={service}
                      className="px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-100 transition-colors"
                    >
                      {service}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-600">No services listed.</p>
              )}
            </motion.div>

            {/* Reviews Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-bold text-slate-900">Reviews</h2>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-4 py-2 rounded-lg bg-brand-orange text-white font-medium hover:bg-[#e55a00] transition-colors"
                >
                  {showReviewForm ? 'Cancel' : 'Write a Review'}
                </button>
              </div>

              {showReviewForm && (
                <form onSubmit={handleSubmitReview} className="mb-8 p-6 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="mb-4">
                    <label className="text-sm font-semibold text-slate-900 mb-2 block">Your Rating</label>
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
                              star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-semibold text-slate-900 mb-2 block">Your Review</label>
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      rows={4}
                      placeholder="Share your experience with this business..."
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-brand-orange text-white font-medium hover:bg-[#e55a00] transition-colors"
                  >
                    Submit Review
                  </button>
                </form>
              )}

              <div className="text-center py-12">
                <Star className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 mb-2">No reviews yet</p>
                <p className="text-slate-500 text-sm">Be the first to review this business!</p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Contact & Actions */}
          <div className="lg:w-96 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="sticky top-32 space-y-6"
            >
              {/* Contact Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Contact & Location</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-brand-orange mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Address</p>
                      {business.address ? (
                        <p className="text-slate-900 font-medium">{business.address}</p>
                      ) : (
                        <p className="text-slate-600 text-sm">Not available</p>
                      )}
                    </div>
                  </div>

                  {business.phone && (
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-brand-orange mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Phone</p>
                      <a href={`tel:${business.phone.replace(/\s+/g, '')}`} className="text-slate-900 font-medium hover:text-brand-orange transition-colors">
                        {business.phone}
                      </a>
                    </div>
                  </div>
                  )}

                  {business.email && (
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-brand-orange mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Email</p>
                      <a href={`mailto:${business.email}`} className="text-slate-900 font-medium hover:text-brand-orange transition-colors break-all">
                        {business.email}
                      </a>
                    </div>
                  </div>
                  )}

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-brand-orange mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Business Hours</p>
                      <p className="text-slate-900 font-medium">{business.hours}</p>
                      {isOpenNow() && (
                        <span className="text-sm text-green-600 font-medium ml-2">• Open Now</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {business.phone && (
                  <button
                    onClick={openWhatsApp}
                    className="w-full px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Message on WhatsApp</span>
                  </button>
                  )}

                  {business.phone && (
                  <a
                    href={`tel:${business.phone.replace(/\s+/g, '')}`}
                    className="w-full px-6 py-4 rounded-xl bg-brand-orange hover:bg-[#e55a00] text-white font-semibold transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call Now</span>
                  </a>
                  )}

                  {business.address && (
                  <button
                    onClick={getDirections}
                    className="w-full px-6 py-4 rounded-xl bg-white border-2 border-slate-200 hover:border-brand-orange text-slate-900 font-semibold transition-all flex items-center justify-center space-x-2"
                  >
                    <Navigation className="w-5 h-5" />
                    <span>Get Directions</span>
                  </button>
                  )}

                  {business.address && (
                  <button
                    onClick={openGoogleMaps}
                    className="w-full px-6 py-4 rounded-xl bg-white border-2 border-slate-200 hover:border-brand-orange text-slate-900 font-semibold transition-all flex items-center justify-center space-x-2"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>View on Map</span>
                  </button>
                  )}
                </div>
              </div>

              {/* Map Card */}
              {business.address && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Location</h4>
                <div className="rounded-xl overflow-hidden border border-slate-200 relative group" style={{ height: '300px' }}>
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(business.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    title={`Location of ${business.name}`}
                    className="absolute inset-0"
                  />
                  <button
                    onClick={openGoogleMaps}
                    className="absolute inset-0 bg-transparent hover:bg-slate-900/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
                    aria-label="Click to open location in Google Maps"
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
                      <MapPin className="w-5 h-5 text-slate-900" />
                      <span className="text-slate-900 text-sm font-medium">Open in Maps</span>
                    </div>
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-3 text-center">
                  Click "Get Directions" for turn-by-turn navigation
                </p>
              </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BusinessProfilePage({ params }: PageProps) {
  return <BusinessProfile businessId={params.id} />
}
