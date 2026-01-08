'use client'

import { useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, ArrowLeft, Upload, CheckCircle, Info } from 'lucide-react'
import Link from 'next/link'

export default function VerificationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get all previous data from query params
  const businessName = searchParams.get('businessName') || ''
  const category = searchParams.get('category') || ''
  const whatsappNumber = searchParams.get('whatsappNumber') || ''
  const vibeTags = searchParams.getAll('vibeTags')

  const [cacNumber, setCacNumber] = useState('')
  const [idDocument, setIdDocument] = useState<File | null>(null)
  const [idDocumentType, setIdDocumentType] = useState('')

  const idDocumentTypes = [
    'NIN (National Identification Number)',
    "Driver's License",
    "Voter's Card",
  ]

  const handleContinue = () => {
    // Build query params with all data
    const params = new URLSearchParams()
    params.append('businessName', businessName)
    params.append('category', category)
    params.append('whatsappNumber', whatsappNumber)
    vibeTags.forEach(tag => params.append('vibeTags', tag))
    if (cacNumber) params.append('cacNumber', cacNumber)
    if (idDocument) params.append('hasIdDocument', 'true')
    if (idDocumentType) params.append('idDocumentType', idDocumentType)

    router.push(`/add-business/complete?${params.toString()}`)
  }

  const handleSkip = () => {
    // Skip verification and go to complete page
    const params = new URLSearchParams()
    params.append('businessName', businessName)
    params.append('category', category)
    params.append('whatsappNumber', whatsappNumber)
    vibeTags.forEach(tag => params.append('vibeTags', tag))
    params.append('verificationSkipped', 'true')

    router.push(`/add-business/complete?${params.toString()}`)
  }

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-normal text-slate-900 mb-2">
              Build trust with verification
            </h1>
            <p className="text-slate-600">Verified profiles get priority placement in Top Picks</p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="cacNumber" className="block text-sm font-semibold text-slate-900 mb-2">
                CAC Registration Number
              </label>
              <input
                id="cacNumber"
                type="text"
                value={cacNumber}
                onChange={(e) => setCacNumber(e.target.value)}
                placeholder="Enter your CAC registration number"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="idDocumentType" className="block text-sm font-semibold text-slate-900 mb-2">
                Identity Document Type
              </label>
              <select
                id="idDocumentType"
                value={idDocumentType}
                onChange={(e) => setIdDocumentType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 mb-3 focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:border-transparent transition-all"
              >
                <option value="">Select document type</option>
                {idDocumentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <FileUploadField
                file={idDocument}
                onChange={setIdDocument}
                label="Upload ID Document"
                id="id-document"
              />
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200" role="alert">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-[#FF6700] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-1">
                    Why verify?
                  </p>
                  <p className="text-sm text-slate-600">
                    Verified profiles receive priority placement in Top Picks and get 5x more visibility.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-slate-200">
            <Link
              href={`/add-business/vibe?businessName=${encodeURIComponent(businessName)}&category=${encodeURIComponent(category)}&whatsappNumber=${encodeURIComponent(whatsappNumber)}`}
              className="flex items-center space-x-2 px-6 py-3 text-slate-700 font-semibold hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              <span>Back</span>
            </Link>

            <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="px-6 py-3 text-slate-600 font-semibold hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2 rounded-lg w-full sm:w-auto"
                >
                  Skip for Now
                </button>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="flex items-center space-x-2 px-6 sm:px-8 py-3 bg-[#FF6700] text-white font-bold rounded-lg hover:bg-[#e55a00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2 w-full sm:w-auto justify-center"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <Link
                href={`/add-business/complete?businessName=${encodeURIComponent(businessName)}&category=${encodeURIComponent(category)}&whatsappNumber=${encodeURIComponent(whatsappNumber)}${vibeTags.map(tag => `&vibeTags=${encodeURIComponent(tag)}`).join('')}&verificationSkipped=true`}
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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
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
    if (selectedFile) {
      onChange(selectedFile)
    }
  }

  const handleRemoveFile = () => {
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        isDragging
          ? 'border-[#FF6700] bg-slate-100'
          : file
          ? 'border-green-300 bg-green-50'
          : 'border-slate-200 bg-slate-50'
      }`}
    >
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileSelect}
        className="hidden"
        id={id}
        ref={fileInputRef}
        aria-label={`Upload ${label}`}
      />
      <label htmlFor={id} className="cursor-pointer">
        {file ? (
          <div className="flex flex-col items-center space-y-3">
            <CheckCircle className="w-8 h-8 text-green-500" aria-hidden="true" />
            <p className="text-sm font-medium text-slate-900">{file.name}</p>
            <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(2)} KB</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleRemoveFile()
              }}
              className="text-red-500 text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
              aria-label={`Remove ${file.name}`}
            >
              Remove File
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <Upload className="w-8 h-8 text-slate-400" aria-hidden="true" />
            <p className="text-sm font-medium text-slate-900">
              Drag & drop your file here, or{' '}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[#FF6700] hover:underline focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2 rounded"
              >
                browse
              </button>
            </p>
            <p className="text-xs text-slate-500">Max file size: 5MB</p>
          </div>
        )}
      </label>
    </div>
  )
}

