'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { 
  Target, 
  Eye, 
  Heart, 
  Shield, 
  Users, 
  TrendingUp,
  MessageCircle,
  User,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Coffee,
  Briefcase,
  Home,
  Dumbbell,
  UtensilsCrossed,
  Palette,
  Wrench
} from 'lucide-react'

export default function AboutPage() {
  const { scrollYProgress } = useScroll()
  const sectionRef = useRef<HTMLDivElement>(null)

  // Floating icons for hero background
  const lifestyleIcons = [
    { icon: Coffee, delay: 0 },
    { icon: Briefcase, delay: 0.5 },
    { icon: Home, delay: 1 },
    { icon: Dumbbell, delay: 1.5 },
    { icon: UtensilsCrossed, delay: 2 },
    { icon: Palette, delay: 2.5 },
    { icon: Wrench, delay: 3 },
  ]

  const values = [
    {
      icon: Shield,
      title: 'Trust & Verification',
      description: 'Every business goes through rigorous verification to ensure credibility and safety for our users.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We build strong connections between businesses and customers, fostering local economic growth.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      title: 'Growth & Innovation',
      description: 'Empowering businesses with tools and visibility to thrive in the digital economy.',
      color: 'from-purple-500 to-pink-500',
    },
  ]

  const stats = [
    { value: '1,758+', label: 'Verified Businesses' },
    { value: '50+', label: 'Categories' },
    { value: '25+', label: 'Cities' },
    { value: '12,000+', label: 'Reviews' },
  ]

  const vibeTags = ['#SoftLife', '#QuietWorkspace', '#ExecutiveGrooming', '#ChopLife', '#UninterruptedPower']

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-32 sm:py-40 overflow-hidden">
        {/* Floating Icons Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {lifestyleIcons.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  left: `${15 + index * 12}%`,
                  top: `${20 + (index % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 15, 0],
                  opacity: [0.1, 0.2, 0.1],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: 'easeInOut',
                }}
              >
                <Icon className="w-16 h-16 sm:w-20 sm:h-20 text-slate-300" />
              </motion.div>
            )
          })}
        </div>

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-slate-900 mb-8 leading-tight">
              Your Vibe Deserves
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-orange to-[#e55a00]">
                To Be Discovered
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Connecting Nigerians with trusted, verified businesses that align with how you live, not just what you need.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision - Premium Spacing */}
      <section className="px-4 sm:px-6 lg:px-8 py-25" ref={sectionRef}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-4">
              Our Purpose
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Building a trusted ecosystem where businesses and communities connect authentically
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-blue to-primary-500 flex items-center justify-center">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-slate-900">Mission</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                To create Nigeria's most trusted business discovery platform, connecting millions
                of users with verified local businesses. We're making it easier for Nigerians to
                find reliable services and for businesses to reach their ideal customers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-blue to-brand-orange flex items-center justify-center">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-slate-900">Vision</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                A verified economy for everyone. We envision a Nigeria where every business
                transaction begins with trust, where quality service providers are easily
                discoverable, and where local economies thrive through digital innovation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How to Join - Scroll-Driven Animation Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-25">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-4">
              Getting Started
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              A straightforward process to join our verified network
            </p>
          </motion.div>

          {/* Step 1: Identity */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <div className="bg-white rounded-2xl p-10 border border-slate-200">
              <div className="flex items-start gap-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-blue to-primary-500 flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-white">01</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">Identity</h3>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    Provide your business information and contact details to establish your presence on the platform.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-3 px-5 py-3 bg-slate-50 rounded-lg border border-slate-200">
                      <MessageCircle className="w-5 h-5 text-brand-orange" />
                      <span className="text-slate-900 font-medium">WhatsApp Number</span>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-3 bg-slate-50 rounded-lg border border-slate-200">
                      <User className="w-5 h-5 text-brand-orange" />
                      <span className="text-slate-900 font-medium">Business Name</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 2: The Vibe */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <div className="bg-white rounded-2xl p-10 border border-slate-200">
              <div className="flex items-start gap-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-orange to-[#e55a00] flex items-center justify-center shrink-0">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">The Vibe</h3>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    Define your brand identity through lifestyle tags that resonate with your target audience.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {vibeTags.map((tag, index) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ 
                          opacity: 1, 
                          scale: 1,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: 0.2 + index * 0.1,
                        }}
                        className="px-5 py-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 font-medium text-sm"
                      >
                        {tag}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 3: Verification */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <div className="bg-white rounded-2xl p-10 border border-slate-200">
              <div className="flex items-start gap-8">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    delay: 0.3,
                  }}
                  className="w-14 h-14 rounded-xl bg-brand-orange flex items-center justify-center shrink-0"
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">Verification</h3>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    Complete our verification process to build trust and credibility with potential customers.
                  </p>
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <ul className="space-y-3 text-slate-700">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-brand-orange shrink-0" />
                        <span>Document verification</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-brand-orange shrink-0" />
                        <span>Identity confirmation</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-brand-orange shrink-0" />
                        <span>Business legitimacy check</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-25">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-5"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center`}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">{value.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-25">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Building trust, one verified business at a time
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-orange to-[#e55a00] mb-3">
                  {stat.value}
                </div>
                <div className="text-slate-600 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-25">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900">
                Join Our Network
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Lyfestylz is built by passionate technologists committed to transforming how Nigerians discover and trust local businesses.
              </p>
            </div>
            
            <Link
              href="/add-business"
              className="inline-flex items-center gap-3 px-10 py-5 bg-brand-orange text-white font-semibold text-lg rounded-xl hover:bg-[#e55a00] transition-colors shadow-md hover:shadow-lg"
            >
              <span>List Your Business</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
