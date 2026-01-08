'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, ArrowLeft, Upload, CheckCircle, X } from 'lucide-react'
import Link from 'next/link'

export default function VibePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const businessName = searchParams.get('businessName') || ''
  const category = searchParams.get('category') || ''
  const whatsappNumber = searchParams.get('whatsappNumber') || ''

  const [vibeTags, setVibeTags] = useState<string[]>([])
  const [interiorPhoto, setInteriorPhoto] = useState<File | null>(null)
  const [exteriorPhoto, setExteriorPhoto] = useState<File | null>(null)
  const [professionalPhoto, setProfessionalPhoto] = useState<File | null>(null)

  const vibeOptions = [
    '#SoftLife',
    '#ExecutiveGrooming',
    '#QuietWorkspace',
    '#UninterruptedPower',
    '#HighEnergy',
    '#ChopLife',
    '#Minimalist',
  ]

  const toggleVibeTag = (tag: string) => {
    setVibeTags(
      vibeTags.includes(tag)
        ? vibeTags.filter(t => t !== tag)
        : [...vibeTags, tag]
    )
  }

  const handleFileUpload = (field: 'interior' | 'exterior' | 'professional', file: File | null) => {
    if (field === 'interior') setInteriorPhoto(file)
    if (field === 'exterior') setExteriorPhoto(file)
    if (field === 'professional') setProfessionalPhoto(file)
  }

  const handleContinue = () => {
    // Build query params with all data
    const params = new URLSearchParams()
    if (businessName) params.append('businessName', businessName)
    if (category) params.append('category', category)
    if (whatsappNumber) params.append('whatsappNumber', whatsappNumber)
    vibeTags.forEach(tag => params.append('vibeTags', tag))
    if (interiorPhoto) params.append('hasInteriorPhoto', 'true')
    if (exteriorPhoto) params.append('hasExteriorPhoto', 'true')
    if (professionalPhoto) params.append('hasProfessionalPhoto', 'true')

    router.push(`/add-business/verification?${params.toString()}`)
  }

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-normal text-slate-900 mb-2">
              What's your vibe?
            </h1>
            <p className="text-slate-600">Help clients find you by your atmosphere and style</p>
          </div>

          {/* Vibe Tags */}
          <div className="mb-8">
            <fieldset>
              <legend className="block text-sm font-semibold text-slate-900 mb-4">
                Select Vibe Tags (choose all that apply)
              </legend>
              <div className="flex flex-wrap gap-3" role="group" aria-label="Vibe tags selection">
                {vibeOptions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleVibeTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2 ${
                      vibeTags.includes(tag)
                        ? 'bg-[#FF6700] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    aria-pressed={vibeTags.includes(tag)}
                    aria-label={`Select ${tag} vibe tag`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          {/* Atmosphere Photos */}
          <div className="mb-8">
            <fieldset>
              <legend className="block text-sm font-semibold text-slate-900 mb-4">
                Atmosphere Photos
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Interior Photo */}
                <div>
                  <label className="block text-xs text-slate-600 mb-2">Interior</label>
                  <FileUploadField
                    file={interiorPhoto}
                    onChange={(file) => handleFileUpload('interior', file)}
                    label="Interior"
                    id="interior-photo"
                  />
                </div>

                {/* Exterior Photo */}
                <div>
                  <label className="block text-xs text-slate-600 mb-2">Exterior</label>
                  <FileUploadField
                    file={exteriorPhoto}
                    onChange={(file) => handleFileUpload('exterior', file)}
                    label="Exterior"
                    id="exterior-photo"
                  />
                </div>

                {/* Professional Photo */}
                <div>
                  <label className="block text-xs text-slate-600 mb-2">Professional in Action</label>
                  <FileUploadField
                    file={professionalPhoto}
                    onChange={(file) => handleFileUpload('professional', file)}
                    label="Professional"
                    id="professional-photo"
                  />
                </div>
              </div>
            </fieldset>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-slate-200">
            <Link
              href="/add-business"
              className="flex items-center space-x-2 px-6 py-3 text-slate-700 font-semibold hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              <span>Back</span>
            </Link>

            <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleContinue}
                className="flex items-center space-x-2 px-6 sm:px-8 py-3 bg-[#FF6700] text-white font-bold rounded-lg hover:bg-[#e55a00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2 w-full sm:w-auto justify-center"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
              <Link
                href={`/add-business/verification?businessName=${encodeURIComponent(businessName)}&category=${encodeURIComponent(category)}&whatsappNumber=${encodeURIComponent(whatsappNumber)}${vibeTags.map(tag => `&vibeTags=${encodeURIComponent(tag)}`).join('')}`}
                className="text-sm text-slate-500 hover:text-[#FF6700] transition-colors underline"
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// File Upload Component
function FileUploadField({
  file,
  onChange,
  label,
  id,
}: {
  file: File | null
  onChange: (file: File | null) => void
  label: string
  id: string
}) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      onChange(droppedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      onChange(selectedFile)
    }
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer focus-within:ring-2 focus-within:ring-[#FF6700] focus-within:ring-offset-2 ${
        isDragging
          ? 'border-[#FF6700] bg-orange-50'
          : file
          ? 'border-green-300 bg-green-50'
          : 'border-slate-300 hover:border-slate-400'
      }`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="sr-only"
        id={id}
        aria-label={`Upload ${label} photo`}
      />
      <label htmlFor={id} className="cursor-pointer">
        {file ? (
          <div className="space-y-2">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6 text-green-600" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-slate-900 truncate">{file.name}</p>
            <p className="text-xs text-slate-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onChange(null)
              }}
              className="text-xs text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#FF6700] rounded"
              aria-label={`Remove ${label} photo`}
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="w-8 h-8 text-slate-400 mx-auto" aria-hidden="true" />
            <p className="text-sm text-slate-600">Drag & drop or click to upload</p>
            <p className="text-xs text-slate-400">High-quality image recommended</p>
          </div>
        )}
      </label>
    </div>
  )
}

