'use client'

import { useState } from 'react'
import { CheckCircle, Clock, X, Upload, XCircle } from 'lucide-react'
import Image from 'next/image'

export default function DashboardOverview() {
  const [vibeTags, setVibeTags] = useState<string[]>([
    '#SoftLife',
    '#ExecutiveGrooming',
    '#QuietWorkspace',
  ])

  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=500&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=500&fit=crop&q=80',
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=500&fit=crop&q=80',
  ])

  const availableVibeTags = [
    '#SoftLife',
    '#ExecutiveGrooming',
    '#QuietWorkspace',
    '#UninterruptedPower',
    '#HighEnergy',
    '#ChopLife',
    '#Minimalist',
  ]

  const verificationStatus = 'pending' // 'verified' | 'pending' | 'rejected'

  const toggleVibeTag = (tag: string) => {
    setVibeTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          setGalleryPhotos(prev => [...prev, reader.result as string])
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          if (reader.result) {
            setGalleryPhotos(prev => [...prev, reader.result as string])
          }
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const removePhoto = (index: number) => {
    setGalleryPhotos(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Trust Card */}
        <div className="mb-12 md:mb-16">
          <div className="border border-slate-200 rounded-lg p-6 md:p-8 bg-white">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-serif font-normal text-slate-900 mb-2">
                  Verification Status
                </h2>
                <div className="flex items-center space-x-3 mb-4">
                  {verificationStatus === 'verified' ? (
                    <>
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <span className="text-base md:text-lg font-semibold text-green-600">Verified</span>
                    </>
                  ) : verificationStatus === 'pending' ? (
                    <>
                      <Clock className="w-6 h-6 text-[#FF6700]" />
                      <span className="text-base md:text-lg font-semibold text-[#FF6700]">Verification Pending</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-red-500" />
                      <span className="text-base md:text-lg font-semibold text-red-600">Verification Rejected</span>
                    </>
                  )}
                </div>
                <p className="text-slate-600 text-sm max-w-2xl">
                  {verificationStatus === 'verified'
                    ? 'Your business profile has been verified. You receive priority placement in Top Picks and 5x more visibility.'
                    : verificationStatus === 'pending'
                    ? 'Your verification request is under review. We typically process verifications within 24-48 hours.'
                    : 'Your verification was rejected. Please review the requirements and resubmit your documents.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Section */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-normal text-slate-900 mb-8 md:mb-12">
            Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wider mb-2">
                Total Profile Saves
              </p>
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900">
                1,247
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wider mb-2">
                Unique Visitors
              </p>
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900">
                3,891
              </p>
            </div>
          </div>
        </div>

        {/* Vibe Management Section */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-normal text-slate-900 mb-6 md:mb-8">
            Vibe Management
          </h2>
          <p className="text-slate-600 mb-6 text-sm">
            Select lifestyle tags that represent your business atmosphere. These help clients find you.
          </p>
          <div className="flex flex-wrap gap-3">
            {availableVibeTags.map((tag) => {
              const isSelected = vibeTags.includes(tag)
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleVibeTag(tag)}
                  className={`px-4 md:px-6 py-2.5 md:py-3 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2 touch-manipulation ${
                    isSelected
                      ? 'bg-[#FF6700] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  style={{ minHeight: '44px' }}
                  aria-pressed={isSelected}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-normal text-slate-900 mb-6 md:mb-8">
            Gallery
          </h2>
          <p className="text-slate-600 mb-6 text-sm">
            Upload photos to showcase your business. Drag and drop images or click to browse.
          </p>

          {/* Existing Photos Grid */}
          {galleryPhotos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {galleryPhotos.map((photo, index) => (
                <div key={index} className="relative group aspect-[4/5] rounded-lg overflow-hidden">
                  <Image
                    src={photo}
                    alt={`Gallery photo ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 p-2 md:p-2.5 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-opacity hover:bg-black/70 touch-manipulation"
                    aria-label={`Remove photo ${index + 1}`}
                    style={{ minWidth: '44px', minHeight: '44px' }}
                  >
                    <X className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:border-[#FF6700] transition-colors"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="gallery-upload"
            />
            <label htmlFor="gallery-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-700 font-medium mb-2">
                Drag and drop images here, or{' '}
                <span className="text-[#FF6700] hover:underline">browse</span>
              </p>
              <p className="text-sm text-slate-500">
                High-quality images recommended. Max file size: 5MB
              </p>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
