'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Upload, ArrowRight, ArrowLeft, X, Share2, ExternalLink, Info, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AddBusinessPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basics
    businessName: '',
    category: '',
    whatsappNumber: '',
    // Step 2: Vibe
    vibeTags: [] as string[],
    interiorPhoto: null as File | null,
    exteriorPhoto: null as File | null,
    professionalPhoto: null as File | null,
    // Step 3: Verification
    cacNumber: '',
    idDocument: null as File | null,
    idDocumentType: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const vibeOptions = [
    '#SoftLife',
    '#ExecutiveGrooming',
    '#QuietWorkspace',
    '#UninterruptedPower',
    '#HighEnergy',
    '#ChopLife',
    '#Minimalist',
  ]

  const categories = [
    'Auto Services',
    'Beauty & Wellness',
    'Tech & Services',
    'Food & Catering',
    'Health & Medical',
    'Home Services',
    'Fashion & Clothing',
  ]

  const idDocumentTypes = [
    'NIN (National Identification Number)',
    "Driver's License",
    "Voter's Card",
  ]

  const steps = [
    { number: 1, title: 'The Basics', subtitle: 'Identity', key: 'basics' },
    { number: 2, title: 'The Vibe', subtitle: 'Lifestyle', key: 'vibe' },
    { number: 3, title: 'Verification', subtitle: 'Trust', key: 'verification' },
    { number: 4, title: 'Complete', subtitle: 'Success', key: 'complete' },
  ]

  const handleNext = () => {
    console.log('Form Data:', formData)
    console.log('Current Step:', currentStep)
    
    // Validate current step before proceeding
    const isValid = validateStep(currentStep)
    console.log('Validation Result:', isValid)
    console.log('Errors:', errors)
    
    if (isValid) {
      if (currentStep < 4) {
        console.log('Moving to step:', currentStep + 1)
        setCurrentStep(currentStep + 1)
        setErrors({})
      }
    } else {
      console.log('Validation failed - errors:', errors)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
  }

  const handleStepClick = (stepNumber: number) => {
    // Allow going back to previous steps, but validate before going forward
    if (stepNumber < currentStep || stepNumber === currentStep) {
      setCurrentStep(stepNumber)
      setErrors({})
    } else {
      // If trying to skip ahead, validate current step first
      if (validateStep(currentStep)) {
        setCurrentStep(stepNumber)
        setErrors({})
      }
    }
  }

  const validateStep = (step: number): boolean => {
    console.log('Validating step:', step)
    console.log('Form data being validated:', {
      businessName: formData.businessName,
      category: formData.category,
      whatsappNumber: formData.whatsappNumber,
    })
    
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      // Business Name validation
      if (!formData.businessName || !formData.businessName.trim()) {
        newErrors.businessName = 'Business name is required'
        console.log('Error: Business name is missing')
      }
      
      // Category validation
      if (!formData.category || formData.category === '') {
        newErrors.category = 'Please select a category'
        console.log('Error: Category is missing')
      }
      
      // WhatsApp Number validation
      if (!formData.whatsappNumber || !formData.whatsappNumber.trim()) {
        newErrors.whatsappNumber = 'WhatsApp number is required'
        console.log('Error: WhatsApp number is missing')
      } else {
        // More lenient validation - accepts various Nigerian phone formats
        const cleaned = formData.whatsappNumber.replace(/\s|-|\(|\)/g, '')
        const phoneRegex = /^(\+?234|0)?[789]\d{9}$/
        if (!phoneRegex.test(cleaned)) {
          newErrors.whatsappNumber = 'Please enter a valid Nigerian phone number (e.g., +234 800 000 0000 or 0800 000 0000)'
          console.log('Error: WhatsApp number format is invalid')
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      console.log('Validation errors found:', newErrors)
      setErrors(newErrors)
      // Scroll to first error
      const firstErrorField = Object.keys(newErrors)[0]
      const errorElement = document.getElementById(firstErrorField)
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        errorElement.focus()
      }
      return false
    }

    console.log('Validation passed')
    setErrors({})
    return true
  }

  const toggleVibeTag = (tag: string) => {
    setFormData({
      ...formData,
      vibeTags: formData.vibeTags.includes(tag)
        ? formData.vibeTags.filter(t => t !== tag)
        : [...formData.vibeTags, tag],
    })
  }

  const handleFileUpload = (field: 'interiorPhoto' | 'exteriorPhoto' | 'professionalPhoto' | 'idDocument', file: File | null) => {
    setFormData({ ...formData, [field]: file })
    // Clear error for this field
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Form submitted:', formData)
    setIsSubmitting(false)
    // Navigate to success step
    setCurrentStep(4)
  }

  const handleSkipVerification = () => {
    setCurrentStep(4)
  }

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Vertical Progress Indicator - Left Side (Desktop) */}
          <aside className="lg:col-span-3 hidden lg:block" aria-label="Progress steps">
            <div className="sticky top-28">
              <nav aria-label="Form steps">
                <ol className="space-y-6">
                  {steps.map((step, index) => (
                    <li key={step.number}>
                      <button
                        type="button"
                        onClick={() => handleStepClick(step.number)}
                        className={`w-full flex items-start space-x-4 text-left hover:opacity-80 transition-opacity group focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2 rounded-lg p-2 -m-2 ${
                          currentStep === step.number ? 'opacity-100' : ''
                        }`}
                        aria-current={currentStep === step.number ? 'step' : undefined}
                        aria-label={`Step ${step.number}: ${step.title}`}
                      >
                        {/* Progress Line */}
                        {index > 0 && (
                          <div
                            className={`absolute left-3 w-0.5 h-8 -top-8 ${
                              currentStep > step.number ? 'bg-[#FF6700]' : 'bg-slate-200'
                            }`}
                            style={{ marginLeft: '11px' }}
                            aria-hidden="true"
                          ></div>
                        )}
                        <div className="relative">
                          {/* Step Circle */}
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                              currentStep > step.number
                                ? 'bg-green-500'
                                : currentStep === step.number
                                ? 'bg-[#FF6700]'
                                : 'bg-slate-200 group-hover:bg-slate-300'
                            }`}
                            aria-hidden="true"
                          >
                            {currentStep > step.number ? (
                              <CheckCircle className="w-4 h-4 text-white" aria-hidden="true" />
                            ) : (
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  currentStep === step.number ? 'bg-white' : 'bg-slate-400'
                                }`}
                                aria-hidden="true"
                              ></div>
                            )}
                          </div>
                        </div>
                        <div className="flex-1 pt-0.5">
                          <p
                            className={`text-sm font-semibold ${
                              currentStep >= step.number ? 'text-slate-900' : 'text-slate-400'
                            }`}
                          >
                            {step.title}
                          </p>
                          <p className="text-xs text-slate-500">{step.subtitle}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          {/* Main Form Content */}
          <main className="lg:col-span-9">
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm">
              {/* Mobile Progress Indicator */}
              <div className="lg:hidden mb-8" role="navigation" aria-label="Form progress">
                <div className="flex items-center justify-between mb-4">
                  {steps.map((step) => (
                    <button
                      key={step.number}
                      type="button"
                      onClick={() => handleStepClick(step.number)}
                      className="flex flex-col items-center flex-1 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#FF6700] rounded-lg p-2"
                      aria-label={`Go to step ${step.number}: ${step.title}`}
                      aria-current={currentStep === step.number ? 'step' : undefined}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all ${
                          currentStep > step.number
                            ? 'bg-green-500'
                            : currentStep === step.number
                            ? 'bg-[#FF6700]'
                            : 'bg-slate-200'
                        }`}
                        aria-hidden="true"
                      >
                        {currentStep > step.number ? (
                          <CheckCircle className="w-5 h-5 text-white" aria-hidden="true" />
                        ) : (
                          <span
                            className={`text-sm font-bold ${
                              currentStep === step.number ? 'text-white' : 'text-slate-400'
                            }`}
                            aria-hidden="true"
                          >
                            {step.number}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 text-center">{step.title}</p>
                    </button>
                  ))}
                </div>
                <div className="h-1 bg-slate-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={4}>
                  <div
                    className="h-full bg-[#FF6700] transition-all duration-300"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    aria-hidden="true"
                  ></div>
                </div>
              </div>

              {/* Step 1: The Basics */}
              {currentStep === 1 && (
                <div className="space-y-8" role="tabpanel" aria-labelledby="step-1-title">
                  {/* Founding Member Banner */}
                  <div className="bg-gradient-to-r from-[#FF6700] to-orange-600 text-white rounded-lg p-4 sm:p-6 text-center" role="banner">
                    <p className="font-bold text-base sm:text-lg">Founding Member: Free for a Limited Time</p>
                    <p className="text-sm opacity-90 mt-1">Join now and list your business at no cost</p>
                  </div>

                  <div>
                    <h2 id="step-1-title" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-normal text-slate-900 mb-2">
                      Tell us about your business
                    </h2>
                    <p className="text-slate-600">Let's start with the essentials</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-semibold text-slate-900 mb-2">
                        Business Name <span className="text-red-500" aria-label="required">*</span>
                      </label>
                      <input
                        id="businessName"
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={(e) => {
                          setFormData({ ...formData, businessName: e.target.value })
                          if (errors.businessName) {
                            setErrors({ ...errors, businessName: '' })
                          }
                        }}
                        placeholder="Enter your business name"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.businessName ? 'border-red-300' : 'border-slate-200'
                        } bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:border-transparent transition-all`}
                        aria-invalid={errors.businessName ? 'true' : 'false'}
                        aria-describedby={errors.businessName ? 'businessName-error' : undefined}
                      />
                      {errors.businessName && (
                        <p id="businessName-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-4 h-4" aria-hidden="true" />
                          {errors.businessName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-semibold text-slate-900 mb-2">
                        Category <span className="text-red-500" aria-label="required">*</span>
                      </label>
                      <select
                        id="category"
                        required
                        value={formData.category}
                        onChange={(e) => {
                          setFormData({ ...formData, category: e.target.value })
                          if (errors.category) {
                            setErrors({ ...errors, category: '' })
                          }
                        }}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.category ? 'border-red-300' : 'border-slate-200'
                        } bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:border-transparent transition-all`}
                        aria-invalid={errors.category ? 'true' : 'false'}
                        aria-describedby={errors.category ? 'category-error' : undefined}
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat.toLowerCase().replace(/\s+/g, '-')}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p id="category-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-4 h-4" aria-hidden="true" />
                          {errors.category}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="whatsappNumber" className="block text-sm font-semibold text-slate-900 mb-2">
                        WhatsApp for Business — how clients connect with you{' '}
                        <span className="text-red-500" aria-label="required">*</span>
                      </label>
                      <input
                        id="whatsappNumber"
                        type="tel"
                        required
                        value={formData.whatsappNumber}
                        onChange={(e) => {
                          setFormData({ ...formData, whatsappNumber: e.target.value })
                          if (errors.whatsappNumber) {
                            setErrors({ ...errors, whatsappNumber: '' })
                          }
                        }}
                        placeholder="+234 800 000 0000"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.whatsappNumber ? 'border-red-300' : 'border-slate-200'
                        } bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:border-transparent transition-all`}
                        aria-invalid={errors.whatsappNumber ? 'true' : 'false'}
                        aria-describedby={errors.whatsappNumber ? 'whatsappNumber-error' : undefined}
                      />
                      {errors.whatsappNumber && (
                        <p id="whatsappNumber-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-4 h-4" aria-hidden="true" />
                          {errors.whatsappNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: The Lifestyle Vibe */}
              {currentStep === 2 && (
                <div className="space-y-8" role="tabpanel" aria-labelledby="step-2-title">
                  <div>
                    <h2 id="step-2-title" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-normal text-slate-900 mb-2">
                      What's your vibe?
                    </h2>
                    <p className="text-slate-600">Help clients find you by your atmosphere and style</p>
                  </div>

                  <div>
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
                              formData.vibeTags.includes(tag)
                                ? 'bg-[#FF6700] text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                            aria-pressed={formData.vibeTags.includes(tag)}
                            aria-label={`Select ${tag} vibe tag`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  <div>
                    <fieldset>
                      <legend className="block text-sm font-semibold text-slate-900 mb-4">
                        Atmosphere Photos
                      </legend>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Interior Photo */}
                        <div>
                          <label className="block text-xs text-slate-600 mb-2">Interior</label>
                          <FileUploadField
                            file={formData.interiorPhoto}
                            onChange={(file) => handleFileUpload('interiorPhoto', file)}
                            label="Interior"
                            id="interior-photo"
                          />
                        </div>

                        {/* Exterior Photo */}
                        <div>
                          <label className="block text-xs text-slate-600 mb-2">Exterior</label>
                          <FileUploadField
                            file={formData.exteriorPhoto}
                            onChange={(file) => handleFileUpload('exteriorPhoto', file)}
                            label="Exterior"
                            id="exterior-photo"
                          />
                        </div>

                        {/* Professional Photo */}
                        <div>
                          <label className="block text-xs text-slate-600 mb-2">Professional in Action</label>
                          <FileUploadField
                            file={formData.professionalPhoto}
                            onChange={(file) => handleFileUpload('professionalPhoto', file)}
                            label="Professional"
                            id="professional-photo"
                          />
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              )}

              {/* Step 3: Verification */}
              {currentStep === 3 && (
                <div className="space-y-8" role="tabpanel" aria-labelledby="step-3-title">
                  <div>
                    <h2 id="step-3-title" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-normal text-slate-900 mb-2">
                      Build trust with verification
                    </h2>
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
                        value={formData.cacNumber}
                        onChange={(e) => setFormData({ ...formData, cacNumber: e.target.value })}
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
                        value={formData.idDocumentType}
                        onChange={(e) => setFormData({ ...formData, idDocumentType: e.target.value })}
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
                        file={formData.idDocument}
                        onChange={(file) => handleFileUpload('idDocument', file)}
                        label="Upload ID Document"
                        id="id-document"
                      />
                    </div>

                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200" role="region" aria-label="Verification benefits">
                      <div className="flex items-start space-x-3">
                        <Info className="w-5 h-5 text-[#FF6700] shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900 mb-1">Why verify?</p>
                          <p className="text-sm text-slate-600">
                            Verified profiles receive priority placement in Top Picks and get 5x more visibility.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Success/Status Screen */}
              {currentStep === 4 && (
                <div className="space-y-8 text-center" role="tabpanel" aria-labelledby="step-4-title">
                  <div>
                    <div
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full mb-6 shadow-lg"
                      role="status"
                      aria-live="polite"
                    >
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" aria-hidden="true"></div>
                      <span className="font-bold">Verification Pending</span>
                    </div>
                    <h2 id="step-4-title" className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-slate-900 mb-4">
                      Welcome to Lyfestylz!
                    </h2>
                    <p className="text-slate-600 text-base sm:text-lg">
                      Your profile is being reviewed. We'll notify you once verification is complete.
                    </p>
                  </div>

                  {/* Profile Snapshot Preview */}
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <p className="text-sm font-semibold text-slate-900 mb-4">Your Profile Snapshot</p>
                    <div className="bg-white rounded-lg p-4 shadow-sm max-w-sm mx-auto">
                      <div
                        className="aspect-[4/5] bg-slate-200 rounded-lg mb-4 flex items-center justify-center"
                        aria-label="Profile image placeholder"
                      >
                        <span className="text-slate-400 text-sm">Profile Image</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-slate-900">{formData.businessName || 'Your Business'}</h3>
                        <CheckCircle className="w-5 h-5 text-green-500" aria-label="Verified" />
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3" aria-label="Vibe tags">
                        {formData.vibeTags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs text-slate-500">
                            {tag}
                          </span>
                        ))}
                        {formData.vibeTags.length === 0 && (
                          <span className="text-xs text-slate-400">No tags selected</span>
                        )}
                      </div>
                      <div className="text-xs text-slate-600">
                        {formData.category || 'Category'} • {formData.whatsappNumber || 'Contact'}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#FF6700] text-white font-bold rounded-lg hover:bg-[#e55a00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2"
                    >
                      <span>Go to Dashboard</span>
                      <ExternalLink className="w-5 h-5" aria-hidden="true" />
                    </Link>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-slate-200 text-slate-900 font-semibold rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2"
                    >
                      <Share2 className="w-5 h-5" aria-hidden="true" />
                      <span>Share Profile to WhatsApp Status</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2 touch-manipulation ${
                      currentStep === 1
                        ? 'text-slate-300 cursor-not-allowed'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    style={{ minHeight: '44px' }}
                    aria-disabled={currentStep === 1}
                  >
                    <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                    <span>Back</span>
                  </button>

                  {currentStep === 3 ? (
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleSkipVerification}
                        className="px-6 py-3 text-slate-600 font-semibold hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2 rounded-lg"
                        aria-label="Skip verification step"
                      >
                        Skip for Now
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="flex items-center space-x-2 px-6 sm:px-8 py-3 bg-[#FF6700] text-white font-bold rounded-lg hover:bg-[#e55a00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
                        aria-busy={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin">⏳</span>
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Continue</span>
                            <ArrowRight className="w-5 h-5" aria-hidden="true" />
                          </>
                        )}
                      </button>
                    </div>
                  ) : currentStep === 1 ? (
                    <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center space-x-2 px-6 sm:px-8 py-3 bg-[#FF6700] text-white font-bold rounded-lg hover:bg-[#e55a00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2 w-full sm:w-auto justify-center touch-manipulation"
                      style={{ minHeight: '44px' }}
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-5 h-5" aria-hidden="true" />
                      </button>
                      <Link
                        href={`/add-business/vibe?businessName=${encodeURIComponent(formData.businessName)}&category=${encodeURIComponent(formData.category)}&whatsappNumber=${encodeURIComponent(formData.whatsappNumber)}`}
                        className="text-sm text-slate-500 hover:text-[#FF6700] transition-colors underline"
                      >
                        Next
                      </Link>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center space-x-2 px-6 sm:px-8 py-3 bg-[#FF6700] text-white font-bold rounded-lg hover:bg-[#e55a00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2 w-full sm:w-auto justify-center touch-manipulation"
                      style={{ minHeight: '44px' }}
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </main>
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
