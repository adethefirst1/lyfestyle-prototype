'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, TrendingUp, Shield, Zap } from 'lucide-react'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import BusinessCard from '@/components/BusinessCard'
import CategoryCard from '@/components/CategoryCard'
import businesses from '@/data/businesses.json'
import categories from '@/data/categories.json'

export default function Home() {
  const verifiedBusinesses = businesses.filter((b) => b.recentlyVerified).slice(0, 4)
  const topBusinesses = businesses
    .sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount))
    .slice(0, 6)

  const features = [
    {
      icon: Shield,
      title: 'Verified Businesses',
      description: 'All businesses go through our rigorous CAC and ID verification process',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: TrendingUp,
      title: 'Trusted Reviews',
      description: 'Real reviews from real customers to help you make informed decisions',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: 'Fast Discovery',
      description: 'Find the perfect business near you in seconds with smart search',
      color: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary-600/20 to-accent-purple/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent-neon/20 to-primary-600/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-8"
          >
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-sm text-slate-300">
              Over <span className="font-bold text-white">1,758</span> Verified Businesses
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Discover{' '}
            <span className="text-gradient">Trusted Businesses</span>
            <br />
            Near You
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto"
          >
            Nigeria's premier business directory connecting you with verified mechanics, salons,
            tech experts, caterers, and more. All CAC and ID verified for your peace of mind.
          </motion.p>

          {/* Search Bar */}
          <SearchBar />

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: 'Businesses', value: '1,758+' },
              { label: 'Categories', value: '50+' },
              { label: 'Reviews', value: '12,000+' },
              { label: 'Cities', value: '25+' },
            ].map((stat, index) => (
              <div key={stat.label} className="glass rounded-xl p-4">
                <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Recently Verified Businesses */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Recently <span className="text-gradient">Verified</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Fresh additions to our trusted network of verified businesses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verifiedBusinesses.map((business, index) => (
              <BusinessCard key={business.id} business={business} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Explore Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Explore by <span className="text-gradient">Category</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Browse businesses across various industries and services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Verified Businesses */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Top <span className="text-gradient">Verified Businesses</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Highest rated businesses trusted by thousands of Nigerians
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topBusinesses.map((business, index) => (
              <BusinessCard key={business.id} business={business} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              href="/businesses"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-accent-purple text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all neon-glow-hover"
            >
              <span>View All Businesses</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-gradient">Lyfestyle</span>?
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Building trust through verification and transparency
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass rounded-2xl p-8 hover:glass-strong transition-all neon-glow-hover"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto glass-strong rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-accent-purple/20" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Grow Your Business?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Join thousands of verified businesses on Lyfestyle.
              <br />
              It's free and takes less than 5 minutes.
            </p>
            <Link
              href="/add-business"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-accent-purple text-white font-semibold text-lg hover:shadow-lg hover:shadow-primary-500/50 transition-all neon-glow"
            >
              <span>Add Your Business — It's Free!</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-slate-400 text-sm mt-4">
              Get verified and start receiving customer inquiries today
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

