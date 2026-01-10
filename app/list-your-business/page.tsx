'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, MapPin, Shield, Users, TrendingUp } from 'lucide-react'

export default function ListYourBusinessPage() {
  const benefits = [
    {
      icon: Users,
      title: 'Increase Visibility',
      description: 'Connect with customers actively searching for your services in your local area',
    },
    {
      icon: Shield,
      title: 'Build Credibility',
      description: 'Get verified to demonstrate legitimacy and reliability to potential customers',
    },
    {
      icon: TrendingUp,
      title: 'Grow Your Business',
      description: 'Expand your reach within a community that values trusted local businesses',
    },
  ]

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            List Your Business
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Join our verified network and connect with customers in your area. Build trust, increase visibility, and grow your local presence.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white rounded-xl p-8 border border-slate-200 text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-blue to-primary-500 flex items-center justify-center mx-auto mb-5">
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="bg-slate-50 rounded-2xl p-10 md:p-14 text-center mb-16 border border-slate-200">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-5">
            Get Started Today
          </h2>
          <p className="text-slate-600 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Create your business listing at no cost. Our verification process typically takes just a few minutes to complete.
          </p>
          <Link
            href="/add-business"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-lg bg-brand-orange text-white font-medium text-lg hover:bg-[#e55a00] transition-colors shadow-sm hover:shadow-md"
          >
            <span>Create Your Listing</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* What You Get */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8 text-center">
            Included Features
          </h2>
          <div className="space-y-4">
            {[
              'Verified business profile to establish credibility',
              'Increased visibility to local customers searching for your services',
              'Comprehensive profile management with photos and business details',
              'No-cost listing with transparent pricing',
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4 bg-white rounded-lg p-5 border border-slate-200">
                <CheckCircle className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <p className="text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Note */}
        <div className="bg-white rounded-xl p-8 border border-slate-200 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-brand-orange" />
            <span className="text-brand-orange font-medium">Verified by Lyfestylz</span>
          </div>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            All businesses undergo our verification process to ensure trust and transparency for both business owners and customers.
          </p>
        </div>
      </div>
    </div>
  )
}

