'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Settings, LogOut, HelpCircle } from 'lucide-react'
import Logo from './Logo'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [userInitial, setUserInitial] = useState<string>('B')
  const profileDropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  const isDashboardRoute = pathname?.startsWith('/dashboard')

  const navLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  // Get user initial from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('userEmail')
      if (email) {
        setUserInitial(email.charAt(0).toUpperCase())
      } else {
        setUserInitial('B')
      }
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false)
      }
    }

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isProfileDropdownOpen])

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userRole')
    localStorage.removeItem('businessId')
    setIsProfileDropdownOpen(false)
    router.push('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo */}
          <div className="flex-1">
            <Link href={isDashboardRoute ? '/dashboard' : '/'}>
              <Logo showText={true} textSize="md" />
            </Link>
          </div>

          {/* Navigation and Actions */}
          <div className="flex-1 flex justify-end items-center">
            {isDashboardRoute ? (
              // Dashboard State
              <>
                {/* Desktop Dashboard Actions */}
                <div className="hidden md:flex items-center space-x-4">
                  <Link
                    href="/support"
                    className="text-sm text-slate-700 hover:text-slate-900 transition-colors font-medium flex items-center gap-2"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Support</span>
                  </Link>
                  
                  {/* Profile Avatar Dropdown */}
                  <div className="relative" ref={profileDropdownRef}>
                    <button
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                      className="w-10 h-10 rounded-full bg-[#FF6700] text-white font-semibold flex items-center justify-center hover:bg-[#e55a00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6700]/20"
                    >
                      {userInitial}
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                        <Link
                          href="/dashboard/settings"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Account Settings</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Menu Button for Dashboard */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-900 transition-colors"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </>
            ) : (
              // Regular State
              <>
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-5 mr-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-slate-900 hover:text-slate-700 transition-colors font-medium whitespace-nowrap"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="hidden md:flex items-center space-x-3">
                  <Link
                    href="/account"
                    className="px-5 py-2.5 text-sm text-slate-700 hover:text-slate-900 font-medium transition-colors whitespace-nowrap"
                  >
                    Account
                  </Link>
                  <Link
                    href="/add-business"
                    className="px-6 py-2.5 bg-brand-orange text-white font-medium hover:bg-[#e55a00] transition-colors whitespace-nowrap rounded-lg shadow-sm"
                  >
                    List Your Business
                  </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg glass text-slate-900"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-4 py-6 space-y-4">
            {isDashboardRoute ? (
              // Mobile Dashboard Menu
              <>
                <Link
                  href="/support"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-900 transition-all"
                >
                  <HelpCircle className="w-5 h-5" />
                  <span>Support</span>
                </Link>
                <Link
                  href="/dashboard/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-900 transition-all"
                >
                  <Settings className="w-5 h-5" />
                  <span>Account Settings</span>
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    handleLogout()
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-900 transition-all text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              // Mobile Regular Menu
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg glass hover:glass-strong text-slate-900 transition-all"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-slate-700 hover:bg-slate-50 text-center rounded-lg transition-colors"
                  style={{ minHeight: '44px' }}
                >
                  Account
                </Link>
                <Link
                  href="/add-business"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3.5 bg-brand-orange text-white font-medium text-center rounded-lg hover:bg-[#e55a00] transition-colors shadow-sm"
                  style={{ minHeight: '44px' }}
                >
                  List Your Business
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

