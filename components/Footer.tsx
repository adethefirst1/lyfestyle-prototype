'use client'

import Link from 'next/link'
import { Building2, Mail, Phone, MapPin, Shield, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'

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
      { name: 'Add Your Business', href: '/add-business' },
      { name: 'Get Verified', href: '/verification' },
      { name: 'Pricing', href: '/pricing' },
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
    <footer className="relative mt-20 glass-strong border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gradient">Lyfestyle</h2>
                <p className="text-xs text-slate-400">Trusted Business Directory</p>
              </div>
            </Link>
            <p className="text-slate-400 text-sm mb-4 max-w-sm">
              Connecting Nigerians with trusted, verified businesses across all categories.
              Building a verified economy for everyone.
            </p>
            <div className="flex items-center space-x-2 text-sm text-slate-400 mb-2">
              <Shield className="w-4 h-4 text-primary-400" />
              <span className="text-primary-400 font-semibold">Verified by Lyfestyle</span>
            </div>
            <p className="text-xs text-slate-500">NDPR Compliant • Secure • Trusted</p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-primary-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-primary-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-primary-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center space-x-3 text-slate-400 text-sm">
              <Mail className="w-5 h-5 text-primary-400" />
              <span>support@lyfestyle.ng</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-400 text-sm">
              <Phone className="w-5 h-5 text-primary-400" />
              <span>+234 800 LYFESTYLE</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-400 text-sm">
              <MapPin className="w-5 h-5 text-primary-400" />
              <span>Lagos, Nigeria</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg glass hover:glass-strong flex items-center justify-center text-slate-400 hover:text-primary-400 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            <p className="text-slate-500 text-sm">
              © {currentYear} Lyfestyle. All rights reserved. 
              <span className="text-slate-600 ml-2">Powered by Odysia</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

