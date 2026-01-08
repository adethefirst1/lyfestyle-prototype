'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Shield, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
    ],
    services: [
      { name: 'Browse Businesses', href: '/businesses' },
      { name: 'For Businesses', href: '/list-your-business' },
      { name: 'Get Verified', href: '/verification' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'NDPR Compliance', href: '/ndpr' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="relative mt-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Logo showText={true} textSize="lg" />
            </Link>
            <p className="text-xs text-slate-600 mb-2">Discover the local ecosystem built around your lifestyle.</p>
            <p className="text-slate-600 text-sm mb-4 max-w-sm">
              Connecting Nigerians with trusted, verified businesses across all categories.
              Building a verified economy for everyone.
            </p>
            <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
              <Shield className="w-4 h-4 text-primary-600" />
              <span className="text-primary-600 font-semibold">Verified by Lyfestylz</span>
            </div>
            <p className="text-xs text-slate-500">NDPR Compliant • Secure • Trusted</p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-slate-900 font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-primary-600 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-slate-900 font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-primary-600 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-slate-900 font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-primary-600 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center space-x-3 text-slate-600 text-sm">
              <Mail className="w-5 h-5 text-primary-600" />
              <span>support@lyfestyle.ng</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-600 text-sm">
              <Phone className="w-5 h-5 text-primary-600" />
              <span>+234 800 LYFESTYLE</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-600 text-sm">
              <MapPin className="w-5 h-5 text-primary-600" />
              <span>Lagos, Nigeria</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg glass hover:glass-strong flex items-center justify-center text-slate-600 hover:text-primary-600 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <p className="text-slate-500 text-sm">
              © {currentYear} Lyfestylz. All rights reserved. 
              <span className="text-slate-600 ml-2">Powered by Odysia</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

