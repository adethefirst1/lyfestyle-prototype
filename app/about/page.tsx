'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Heart, Shield, Users, TrendingUp } from 'lucide-react'

export default function AboutPage() {
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

  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-gradient">Lyfestyle</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Connecting Nigerians with trusted businesses across all categories.
              We're building a verified economy where everyone can discover, trust,
              and engage with local businesses confidently.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-2xl p-8"
          >
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-600 to-accent-purple flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-slate-300 leading-relaxed">
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
            className="glass-strong rounded-2xl p-8"
          >
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-purple to-accent-neon flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-slate-300 leading-relaxed">
              A verified economy for everyone. We envision a Nigeria where every business
              transaction begins with trust, where quality service providers are easily
              discoverable, and where local economies thrive through digital innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-strong rounded-2xl p-8 hover:scale-105 transition-transform"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-slate-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-3xl p-12"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Our Impact <span className="text-gradient">So Far</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Powered By */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center glass rounded-2xl p-12"
          >
            <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">
              Built with care for Nigeria
            </h2>
            <p className="text-slate-400 mb-2">
              Lyfestyle is proudly developed and maintained by passionate technologists
              committed to transforming how Nigerians discover and trust local businesses.
            </p>
            <p className="text-slate-500 text-sm">
              Powered by <span className="text-primary-400 font-semibold">Odysia</span>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

