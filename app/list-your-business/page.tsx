'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, MapPin, Shield, Users, TrendingUp } from 'lucide-react'

export default function ListYourBusinessPage() {
  const benefits = [
    {
      icon: Users,
      title: 'Get Discovered',
      description: 'Connect with people looking for what you offer, right in your neighborhood',
    },
    {
      icon: Shield,
      title: 'Build Trust',
      description: 'Get verified and show customers you\'re legitimate and reliable',
    },
    {
      icon: TrendingUp,
      title: 'Grow Locally',
      description: 'Be part of a community that values local businesses and authentic experiences',
    },
  ]

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            List Your Business on Lyfestylz
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Get discovered by the right people. Join a community that values local businesses and authentic experiences.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-primary-500 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="glass-strong rounded-3xl p-8 md:p-12 text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            It's Free to Get Started
          </h2>
          <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
            List your business for free and start connecting with customers in your area. 
            Verification takes just a few minutes.
          </p>
          <Link
            href="/add-business"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-[#FF6700] text-white font-semibold text-lg hover:bg-[#e55a00] transition-colors"
          >
            <span>List for Free</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* What You Get */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            What You Get
          </h2>
          <div className="space-y-4">
            {[
              'Verified business profile that builds trust',
              'Visibility to local customers searching for your services',
              'Easy-to-manage profile with photos and details',
              'Free listing with no hidden fees',
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3 glass rounded-xl p-4">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Note */}
        <div className="glass rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Shield className="w-5 h-5 text-primary-600" />
            <span className="text-primary-600 font-semibold">Verified by Lyfestylz</span>
          </div>
          <p className="text-sm text-slate-600">
            All businesses go through our verification process to ensure trust and transparency for everyone.
          </p>
        </div>
      </div>
    </div>
  )
}

