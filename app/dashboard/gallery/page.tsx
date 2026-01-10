'use client'

import { useState } from 'react'
import { Upload, X, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react'
import Image from 'next/image'

export default function GalleryPage() {
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=500&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=500&fit=crop&q=80',
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=500&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=500&fit=crop&q=80',
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=500&fit=crop&q=80',
  ])

  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setUploadStatus('error')
        setTimeout(() => setUploadStatus('idle'), 3000)
        return
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setUploadStatus('error')
        setTimeout(() => setUploadStatus('idle'), 3000)
        return
      }

      setUploadStatus('uploading')
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          setGalleryPhotos(prev => [...prev, reader.result as string])
          setUploadStatus('success')
          setTimeout(() => setUploadStatus('idle'), 2000)
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
        if (file.size > 5 * 1024 * 1024) {
          setUploadStatus('error')
          setTimeout(() => setUploadStatus('idle'), 3000)
          return
        }
        setUploadStatus('uploading')
        const reader = new FileReader()
        reader.onloadend = () => {
          if (reader.result) {
            setGalleryPhotos(prev => [...prev, reader.result as string])
            setUploadStatus('success')
            setTimeout(() => setUploadStatus('idle'), 2000)
          }
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const removePhoto = (index: number) => {
    setGalleryPhotos(prev => prev.filter((_, i) => i !== index))
    if (selectedPhoto === index) {
      setSelectedPhoto(null)
    } else if (selectedPhoto !== null && selectedPhoto > index) {
      setSelectedPhoto(selectedPhoto - 1)
    }
  }

  const setAsPrimary = (index: number) => {
    // Move photo to first position
    const photo = galleryPhotos[index]
    setGalleryPhotos(prev => {
      const newPhotos = prev.filter((_, i) => i !== index)
      return [photo, ...newPhotos]
    })
    setSelectedPhoto(null)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Gallery
          </h1>
          <p className="text-slate-600">
            Manage your business photos. High-quality images help attract more customers.
          </p>
        </div>

        {/* Upload Status Messages */}
        {uploadStatus === 'uploading' && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
            <p className="text-sm font-medium text-blue-900">Uploading image...</p>
          </div>
        )}

        {uploadStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-sm font-medium text-green-900">Image uploaded successfully!</p>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm font-medium text-red-900">Upload failed. Please ensure the file is an image under 5MB.</p>
          </div>
        )}

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`mb-8 border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            uploadStatus === 'uploading' 
              ? 'border-blue-300 bg-blue-50' 
              : uploadStatus === 'success'
              ? 'border-green-300 bg-green-50'
              : uploadStatus === 'error'
              ? 'border-red-300 bg-red-50'
              : 'border-slate-300 hover:border-[#FF6700] bg-slate-50'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="gallery-upload"
            disabled={uploadStatus === 'uploading'}
          />
          <label htmlFor="gallery-upload" className="cursor-pointer">
            <Upload className={`w-12 h-12 mx-auto mb-4 ${
              uploadStatus === 'uploading' ? 'text-blue-600' :
              uploadStatus === 'success' ? 'text-green-600' :
              uploadStatus === 'error' ? 'text-red-600' :
              'text-slate-400'
            }`} />
            <p className="text-slate-700 font-medium mb-2">
              Drag and drop images here, or{' '}
              <span className="text-[#FF6700] hover:underline">browse</span>
            </p>
            <p className="text-sm text-slate-500">
              High-quality images recommended. Max file size: 5MB (JPG, PNG, WebP)
            </p>
          </label>
        </div>

        {/* Gallery Stats */}
        <div className="mb-6 flex items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            <span>{galleryPhotos.length} {galleryPhotos.length === 1 ? 'photo' : 'photos'}</span>
          </div>
          {galleryPhotos.length > 0 && (
            <span className="text-slate-400">•</span>
          )}
          {galleryPhotos.length > 0 && (
            <span>The first image will be used as your primary photo</span>
          )}
        </div>

        {/* Gallery Grid */}
        {galleryPhotos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryPhotos.map((photo, index) => (
              <div
                key={index}
                className={`relative group aspect-[4/5] rounded-lg overflow-hidden border-2 transition-all ${
                  index === 0 
                    ? 'border-[#FF6700] ring-2 ring-[#FF6700]/20' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Image
                  src={photo}
                  alt={`Gallery photo ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
                
                {/* Primary Badge */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-[#FF6700] text-white text-xs font-semibold rounded">
                    Primary
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => setSelectedPhoto(index)}
                    className="px-3 py-2 bg-white text-slate-900 rounded-md text-sm font-medium hover:bg-slate-100 transition-colors"
                  >
                    View
                  </button>
                  {index !== 0 && (
                    <button
                      onClick={() => setAsPrimary(index)}
                      className="px-3 py-2 bg-[#FF6700] text-white rounded-md text-sm font-medium hover:bg-[#e55a00] transition-colors"
                    >
                      Set Primary
                    </button>
                  )}
                  <button
                    onClick={() => removePhoto(index)}
                    className="px-3 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>

                {/* Quick Remove Button */}
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                  aria-label={`Remove photo ${index + 1}`}
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-lg border border-slate-200">
            <ImageIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No photos yet</h3>
            <p className="text-slate-600 mb-4">Upload your first image to get started</p>
          </div>
        )}

        {/* Photo Modal */}
        {selectedPhoto !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 text-white hover:text-slate-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <Image
                src={galleryPhotos[selectedPhoto]}
                alt={`Gallery photo ${selectedPhoto + 1}`}
                width={800}
                height={1000}
                className="rounded-lg object-contain max-h-[90vh]"
                unoptimized
              />
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Photo Tips</h2>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <span>Use high-resolution images (at least 1200px wide) for best quality</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <span>Show your business space, products, or services clearly</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <span>Use natural lighting when possible</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <span>Your primary photo should be your best image - it's shown first</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
