'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo - Takes up half the space */}
          <div className="flex-1">
            <Link href="/">
              <Logo showText={true} textSize="md" />
            </Link>
          </div>

          {/* Navigation and Buttons - Takes up other half, aligned to far right */}
          <div className="flex-1 flex justify-end items-center">
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
                className="px-4 py-2.5 md:py-2 text-xs bg-[#FF6700] text-white font-semibold hover:opacity-90 transition-opacity whitespace-nowrap rounded touch-manipulation"
                style={{ minHeight: '44px' }}
              >
                ACCOUNT
              </Link>
              <Link
                href="/add-business"
                className="px-4 py-2.5 md:py-2 text-xs bg-[#FF6700] text-white font-semibold hover:opacity-90 transition-opacity whitespace-nowrap rounded touch-manipulation"
                style={{ minHeight: '44px' }}
              >
                LIST FOR FREE
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg glass text-slate-900"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-4 py-6 space-y-4">
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
              className="block px-4 py-3.5 bg-[#FF6700] text-white font-semibold text-center rounded touch-manipulation"
              style={{ minHeight: '44px' }}
            >
              ACCOUNT
            </Link>
            <Link
              href="/add-business"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3.5 bg-[#FF6700] text-white font-semibold text-center rounded touch-manipulation"
              style={{ minHeight: '44px' }}
            >
              LIST FOR FREE
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

