'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Upload, ArrowRight, ArrowLeft, Building2, Shield } from 'lucide-react'

export default function AddBusinessPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1
    businessName: '',
    category: '',
    description: '',
    // Step 2
    phone: '',
    email: '',
    address: '',
    city: '',
    hours: '',
    // Step 3
    cacDocument: null as File | null,
    // Step 4
    verificationCode: '',
  })

  const steps = [
    { number: 1, title: 'Business Details', description: 'Tell us about your business' },
    { number: 2, title: 'Contact Info', description: 'How can customers reach you' },
    { number: 3, title: 'Verification', description: 'Upload CAC certificate' },
    { number: 4, title: 'Confirm', description: 'Review and submit' },
  ]

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Show confirmation modal
    alert('Your business has been submitted for verification! We\'ll review it within 24-48 hours.')
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Add Your <span className="text-gradient">Business</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Join thousands of verified businesses on Lyfestyle. It's free!
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-2 ${
                      currentStep >= step.number
                        ? 'bg-gradient-to-r from-primary-600 to-accent-purple text-white neon-glow'
                        : 'glass text-slate-400'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step.number
                    )}
                  </motion.div>
                  <div className="text-center hidden md:block">
                    <p className={`text-sm font-semibold ${
                      currentStep >= step.number ? 'text-white' : 'text-slate-400'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-slate-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`absolute top-6 left-1/2 w-full h-0.5 -z-10 ${
                    currentStep > step.number
                      ? 'bg-gradient-to-r from-primary-600 to-accent-purple'
                      : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="glass-strong rounded-2xl p-8"
        >
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Business Details</h2>
                
                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-2 block">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="Enter your business name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-primary-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-2 block">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-primary-500 transition-colors"
                  >
                    <option value="">Select a category</option>
                    <option value="auto">Auto Services</option>
                    <option value="beauty">Beauty & Wellness</option>
                    <option value="tech">Tech & Services</option>
                    <option value="food">Food & Catering</option>
                    <option value="health">Health & Medical</option>
                    <option value="home">Home Services</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-2 block">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your business and services"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-primary-500 transition-colors"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-slate-300 mb-2 block">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234 800 000 0000"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-300 mb-2 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="business@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-2 block">
                    Business Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street address"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-primary-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-2 block">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Lagos, Abuja, etc."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-primary-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-2 block">
                    Business Hours *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.hours}
                    onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                    placeholder="Mon-Fri: 9AM-5PM"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-primary-500 transition-colors"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Verification Documents</h2>

                <div className="glass rounded-xl p-6 border-2 border-dashed border-white/20 text-center">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Upload CAC Certificate</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Upload your Corporate Affairs Commission registration document
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFormData({ ...formData, cacDocument: e.target.files?.[0] || null })}
                    className="hidden"
                    id="cac-upload"
                  />
                  <label
                    htmlFor="cac-upload"
                    className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-purple text-white font-semibold cursor-pointer hover:shadow-lg transition-all"
                  >
                    Choose File
                  </label>
                  {formData.cacDocument && (
                    <p className="text-green-400 text-sm mt-3">
                      ✓ {formData.cacDocument.name}
                    </p>
                  )}
                </div>

                <div className="glass rounded-xl p-6">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-primary-400 mt-1 shrink-0" />
                    <div>
                      <h3 className="text-white font-semibold mb-2">Why verification?</h3>
                      <p className="text-slate-400 text-sm">
                        Verification builds trust with customers and helps you stand out. Verified businesses get 3x more inquiries on average. Your documents are securely stored and never shared publicly.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Review & Submit</h2>

                <div className="space-y-4">
                  <div className="glass rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">Business Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Business Name:</span>
                        <span className="text-white font-medium">{formData.businessName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Category:</span>
                        <span className="text-white font-medium">{formData.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">City:</span>
                        <span className="text-white font-medium">{formData.city}</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">Contact Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Phone:</span>
                        <span className="text-white font-medium">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Email:</span>
                        <span className="text-white font-medium">{formData.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-xl p-6 bg-primary-500/10 border border-primary-500/30">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-400 mt-1 shrink-0" />
                      <div>
                        <h3 className="text-white font-semibold mb-2">What happens next?</h3>
                        <ul className="text-slate-300 text-sm space-y-1">
                          <li>• We'll review your submission within 24-48 hours</li>
                          <li>• You'll receive verification updates via email</li>
                          <li>• Once approved, your business goes live immediately</li>
                          <li>• Start receiving customer inquiries right away</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl glass hover:glass-strong text-white font-semibold transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>
            )}
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-purple text-white font-semibold hover:shadow-lg transition-all"
              >
                <span>Next</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-lg transition-all neon-glow"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Submit for Verification</span>
              </button>
            )}
          </div>
        </motion.form>
      </div>
    </div>
  )
}

