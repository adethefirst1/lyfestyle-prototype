'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Mock auth function for demo environment
  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    console.log('Attempting sign in for:', email)
    
    // Demo mode: Accept any email and password
    // In production, this would call your auth API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock validation - accept any email/password for demo
        if (email && password) {
          console.log('Auth response: Success - Demo mode active')
          resolve({ success: true })
        } else {
          console.log('Auth response: Failed - Missing credentials')
          resolve({ success: false, error: 'Invalid email or password' })
        }
      }, 1000)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    console.log('Form submitted - handleSubmit called', { email, password, hasEmail: !!email, hasPassword: !!password })
    
    // Validate fields
    if (!email || !password) {
      console.log('Validation failed - missing fields')
      setError('Please enter both email and password')
      return
    }
    
    console.log('Validation passed, starting sign in process')
    setError('')
    setIsLoading(true)

    try {
      // Call sign-in function
      const response = await signIn(email, password)
      console.log('Auth response:', response)

      if (response.success) {
        // Store auth state (in production, use proper auth system)
        if (typeof window !== 'undefined') {
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('userEmail', email)
          localStorage.setItem('userRole', 'business') // Demo: set as business user
          console.log('Auth state stored in localStorage')
        }
        
        console.log('Auth successful, redirecting to dashboard')
        // Redirect to dashboard
        router.push('/dashboard')
        // Fallback redirect
        setTimeout(() => {
          if (window.location.pathname !== '/dashboard') {
            window.location.href = '/dashboard'
          }
        }, 100)
      } else {
        console.log('Auth failed:', response.error)
        setError(response.error || 'Invalid email or password')
        setIsLoading(false)
      }
    } catch (err) {
      console.error('Sign in error:', err)
      setError('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-20 relative z-10">
      <div className="max-w-md w-full relative z-10">
        {/* Logo */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-4">
            <Logo showText={true} textSize="lg" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-serif font-normal text-slate-900 mb-2">
            Welcome back
          </h1>
          <p className="text-slate-600">Sign in to access your business dashboard</p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white border border-slate-200 rounded-lg p-8 relative z-10">
          <form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            noValidate
          >
            {error && (
              <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2" role="alert">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-900 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 z-20"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#FF6700] border-slate-300 rounded focus:ring-[#FF6700] focus:ring-2"
                />
                <span className="ml-2 text-sm text-slate-600">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-[#FF6700] hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={() => {
                console.log('Button clicked directly', { email, password, isLoading })
              }}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-[#FF6700] text-white font-bold rounded-lg hover:bg-[#e55a00] active:bg-[#d14f00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer relative z-20"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Dashboard Link */}
          <div className="mt-4 text-center">
            <Link
              href="/dashboard"
              className="text-xs text-slate-500 hover:text-[#FF6700] transition-colors"
            >
              dashboard
            </Link>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <Link
                href="/add-business"
                className="text-[#FF6700] hover:underline font-semibold"
              >
                List your business for free
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            Demo: Enter any email and password to sign in
          </p>
        </div>
      </div>
    </div>
  )
}
