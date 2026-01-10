'use client'

import { useState, useEffect } from 'react'
import { Save, CheckCircle, AlertCircle, Building2, Mail, Phone, MapPin, Globe, Linkedin, Instagram, Twitter, X, Eye, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [showNameChangeModal, setShowNameChangeModal] = useState(false)
  const [originalBusinessName, setOriginalBusinessName] = useState<string>('Master Barber Studio')
  const [lastSaveWasNameChange, setLastSaveWasNameChange] = useState(false)
  const [businessId, setBusinessId] = useState<string>('1')

  // Business Profile State
  const [businessProfile, setBusinessProfile] = useState({
    businessName: 'Master Barber Studio',
    category: 'Beauty & Grooming',
    description: 'Premium barbering services for the modern professional. Expert cuts, grooming, and styling.',
    location: 'Victoria Island, Lagos',
    city: 'Lagos',
    email: 'contact@masterbarber.ng',
    phone: '+234 801 234 5678',
    website: 'https://masterbarber.ng',
    linkedin: '',
    instagram: '@masterbarber_ng',
    twitter: '@masterbarber_ng',
  })

  // Load original business name and business ID from localStorage or use current
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('originalBusinessName')
      const storedBusinessId = localStorage.getItem('businessId')
      const currentVerified = localStorage.getItem('verificationStatus')
      
      if (storedBusinessId) {
        setBusinessId(storedBusinessId)
      }
      
      if (stored) {
        setOriginalBusinessName(stored)
        setBusinessProfile(prev => ({ ...prev, businessName: stored }))
      } else {
        // Initialize with current name
        localStorage.setItem('originalBusinessName', businessProfile.businessName)
      }
    }
  }, [])

  // Account Settings State
  const [accountSettings, setAccountSettings] = useState({
    email: 'admin@masterbarber.ng',
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    marketing: false,
  })

  // Password Change State
  const [passwordChange, setPasswordChange] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleBusinessProfileChange = (field: string, value: string) => {
    setBusinessProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (type: keyof typeof accountSettings.notifications) => {
    setAccountSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }))
  }

  const hasBusinessNameChanged = () => {
    return businessProfile.businessName.trim() !== originalBusinessName.trim()
  }

  const handleSave = async () => {
    // Check if business name has changed
    if (hasBusinessNameChanged()) {
      // Show warning modal instead of saving
      setShowNameChangeModal(true)
      return
    }

    // Proceed with normal save
    await performSave(false)
  }

  const handleConfirmNameChange = async () => {
    setShowNameChangeModal(false)
    await performSave(true)
  }

  const performSave = async (nameChanged: boolean) => {
    setSaveStatus('saving')
    setLastSaveWasNameChange(nameChanged)
    
    // Simulate API call
    setTimeout(() => {
      if (nameChanged) {
        // Update verification status
        if (typeof window !== 'undefined') {
          localStorage.setItem('verificationStatus', 're-verification_required')
          localStorage.setItem('isVerified', 'false')
          localStorage.setItem('nameChangeNotification', 'true')
          // Update original business name to new name
          localStorage.setItem('originalBusinessName', businessProfile.businessName)
          setOriginalBusinessName(businessProfile.businessName)
        }
      }
      
      setSaveStatus('success')
      setTimeout(() => {
        setSaveStatus('idle')
        setLastSaveWasNameChange(false)
      }, 3000)
    }, 1500)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordChange.newPassword !== passwordChange.confirmPassword) {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
      return
    }
    // Handle password change
    setPasswordChange({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    setSaveStatus('success')
    setTimeout(() => setSaveStatus('idle'), 3000)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Settings
          </h1>
          <p className="text-slate-600">
            Manage your business profile and account preferences
          </p>
        </div>

        {/* Save Status */}
        {saveStatus === 'saving' && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
            <p className="text-sm font-medium text-blue-900">Saving changes...</p>
          </div>
        )}

        {saveStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-sm font-medium text-green-900">
              {lastSaveWasNameChange 
                ? 'Settings saved. Your name change is under review.' 
                : 'Settings saved successfully!'}
            </p>
          </div>
        )}

        {saveStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm font-medium text-red-900">Error saving settings. Please try again.</p>
          </div>
        )}

        {/* Business Name Change Warning Modal */}
        {showNameChangeModal && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                </div>
                <button
                  onClick={() => setShowNameChangeModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Warning: Business Name Change
              </h3>
              
              <p className="text-slate-600 mb-6">
                Changing your business name requires a new CAC and ID review to maintain your Verified status. 
                Your verification status will be set to "Pending" until the review is complete.
              </p>
              
              <p className="text-sm text-slate-700 font-medium mb-6">
                <strong>Current name:</strong> {originalBusinessName}
                <br />
                <strong>New name:</strong> {businessProfile.businessName}
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowNameChangeModal(false)}
                  className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmNameChange}
                  className="flex-1 px-4 py-3 bg-[#FF6700] text-white font-semibold rounded-lg hover:bg-[#e55a00] transition-colors"
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Business Profile Section */}
        <div className="mb-8 bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-[#FF6700]" />
              <h2 className="text-xl font-bold text-slate-900">Business Profile</h2>
            </div>
            <Link
              href={`/business/${businessId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium text-sm transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>View Public Profile</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-6">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                value={businessProfile.businessName}
                onChange={(e) => handleBusinessProfileChange('businessName', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#FF6700] focus:ring-2 focus:ring-[#FF6700]/20 transition-colors"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Category *
              </label>
              <select
                value={businessProfile.category}
                onChange={(e) => handleBusinessProfileChange('category', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#FF6700] focus:ring-2 focus:ring-[#FF6700]/20 transition-colors"
              >
                <option>Beauty & Grooming</option>
                <option>Food & Dining</option>
                <option>Health & Wellness</option>
                <option>Professional Services</option>
                <option>Retail</option>
                <option>Entertainment</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Description *
              </label>
              <textarea
                value={businessProfile.description}
                onChange={(e) => handleBusinessProfileChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#FF6700] focus:ring-2 focus:ring-[#FF6700]/20 transition-colors resize-none"
                required
              />
              <p className="text-xs text-slate-500 mt-2">Describe what makes your business unique</p>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location *
                </label>
                <input
                  type="text"
                  value={businessProfile.location}
                  onChange={(e) => handleBusinessProfileChange('location', e.target.value)}
                  placeholder="Street address, area"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#FF6700] focus:ring-2 focus:ring-[#FF6700]/20 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  City *
                </label>
                <select
                  value={businessProfile.city}
                  onChange={(e) => handleBusinessProfileChange('city', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#FF6700] focus:ring-2 focus:ring-[#FF6700]/20 transition-colors"
                >
                  <option>Lagos</option>
                  <option>Abuja</option>
                  <option>Port Harcourt</option>
                  <option>Kano</option>
                  <option>Ibadan</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email *
                </label>
                <input
                  type="email"
                  value={businessProfile.email}
                  onChange={(e) => handleBusinessProfileChange('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#FF6700] focus:ring-2 focus:ring-[#FF6700]/20 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone *
                </label>
                <input
                  type="tel"
                  value={businessProfile.phone}
                  onChange={(e) => handleBusinessProfileChange('phone', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#FF6700] focus:ring-2 focus:ring-[#FF6700]/20 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Website & Social Media */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                <Globe className="w-4 h-4 inline mr-1" />
                Website
              </label>
              <input
                type="url"
                value={businessProfile.website}
                onChange={(e) => handleBusinessProfileChange('website', e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#FF6700] focus:ring-2 focus:ring-[#FF6700]/20 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  <Linkedin className="w-4 h-4 inline mr-1" />
                  LinkedIn
                </label>
                <input
                  type="text"
                  value={businessProfile.linkedin}
                  onChange={(e) => handleBusinessProfileChange('linkedin', e.target.value)}
                  placeholder="@company"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#FF6700] focus:ring-2 focus:ring-[#FF6700]/20 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  <Instagram className="w-4 h-4 inline mr-1" />
                  Instagram
                </label>
                <input
                  type="text"
                  value={businessProfile.instagram}
                  onChange={(e) => handleBusinessProfileChange('instagram', e.target.value)}
                  placeholder="@username"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#FF6700] focus:ring-2 focus:ring-[#FF6700]/20 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  <Twitter className="w-4 h-4 inline mr-1" />
                  Twitter
                </label>
                <input
                  type="text"
                  value={businessProfile.twitter}
                  onChange={(e) => handleBusinessProfileChange('twitter', e.target.value)}
                  placeholder="@username"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#FF6700] focus:ring-2 focus:ring-[#FF6700]/20 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="mb-8 bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-6 h-6 text-[#FF6700]" />
            <h2 className="text-xl font-bold text-slate-900">Account Settings</h2>
          </div>

          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Account Email
              </label>
              <input
                type="email"
                value={accountSettings.email}
                disabled
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 cursor-not-allowed"
              />
              <p className="text-xs text-slate-500 mt-2">Contact support to change your account email</p>
            </div>

            {/* Notifications */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-4">
                Notifications
              </label>
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-slate-700">Email notifications</span>
                  <input
                    type="checkbox"
                    checked={accountSettings.notifications.email}
                    onChange={() => handleNotificationChange('email')}
                    className="w-5 h-5 rounded border-slate-300 bg-white text-[#FF6700] focus:ring-[#FF6700] focus:ring-offset-0 cursor-pointer"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-slate-700">SMS notifications</span>
                  <input
                    type="checkbox"
                    checked={accountSettings.notifications.sms}
                    onChange={() => handleNotificationChange('sms')}
                    className="w-5 h-5 rounded border-slate-300 bg-white text-[#FF6700] focus:ring-[#FF6700] focus:ring-offset-0 cursor-pointer"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-slate-700">Push notifications</span>
                  <input
                    type="checkbox"
                    checked={accountSettings.notifications.push}
                    onChange={() => handleNotificationChange('push')}
                    className="w-5 h-5 rounded border-slate-300 bg-white text-[#FF6700] focus:ring-[#FF6700] focus:ring-offset-0 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Marketing */}
            <div>
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="block text-sm font-semibold text-slate-900">Marketing emails</span>
                  <span className="text-xs text-slate-500">Receive updates about new features and promotions</span>
                </div>
                <input
                  type="checkbox"
                  checked={accountSettings.marketing}
                  onChange={() => setAccountSettings(prev => ({ ...prev, marketing: !prev.marketing }))}
                  className="w-5 h-5 rounded border-slate-300 bg-white text-[#FF6700] focus:ring-[#FF6700] focus:ring-offset-0 cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Password Change Section */}
        <div className="mb-8 bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Change Password</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={passwordChange.currentPassword}
                onChange={(e) => setPasswordChange(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#FF6700] focus:ring-2 focus:ring-[#FF6700]/20 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={passwordChange.newPassword}
                onChange={(e) => setPasswordChange(prev => ({ ...prev, newPassword: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#FF6700] focus:ring-2 focus:ring-[#FF6700]/20 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordChange.confirmPassword}
                onChange={(e) => setPasswordChange(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#FF6700] focus:ring-2 focus:ring-[#FF6700]/20 transition-colors"
                required
              />
              {passwordChange.newPassword && passwordChange.confirmPassword && passwordChange.newPassword !== passwordChange.confirmPassword && (
                <p className="text-xs text-red-600 mt-2">Passwords do not match</p>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#FF6700] text-white font-semibold rounded-lg hover:bg-[#e55a00] transition-colors"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="px-8 py-3 bg-[#FF6700] text-white font-bold rounded-lg hover:bg-[#e55a00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  )
}
