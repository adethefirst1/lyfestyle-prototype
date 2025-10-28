'use client'

import { motion } from 'framer-motion'
import { Eye, Star, TrendingUp, Users, Edit, FileText, Settings, CheckCircle } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    { label: 'Total Views', value: '1,245', icon: Eye, color: 'from-blue-500 to-cyan-500' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: 'from-amber-500 to-orange-500' },
    { label: 'Reviews', value: '127', icon: Users, color: 'from-green-500 to-emerald-500' },
    { label: 'Growth', value: '+23%', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
  ]

  const recentReviews = [
    { name: 'John Doe', rating: 5, comment: 'Excellent service! Highly recommended.', date: '2 days ago' },
    { name: 'Jane Smith', rating: 4, comment: 'Good experience overall.', date: '5 days ago' },
  ]

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, <span className="text-gradient">Business Owner</span>
          </h1>
          <p className="text-slate-400 text-lg">Here's how your business is performing this week</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-strong rounded-2xl p-6 hover:scale-105 transition-transform"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-strong rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Recent Reviews</h2>
              <div className="space-y-4">
                {recentReviews.map((review, index) => (
                  <div key={index} className="glass rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-semibold">{review.name}</h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm mb-2">{review.comment}</p>
                    <p className="text-slate-500 text-xs">{review.date}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-strong rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="glass rounded-xl p-4 hover:glass-strong transition-all text-left group">
                  <Edit className="w-6 h-6 text-primary-400 mb-2" />
                  <h3 className="text-white font-semibold mb-1 group-hover:text-gradient transition-all">
                    Edit Profile
                  </h3>
                  <p className="text-slate-400 text-sm">Update business information</p>
                </button>
                
                <button className="glass rounded-xl p-4 hover:glass-strong transition-all text-left group">
                  <FileText className="w-6 h-6 text-green-400 mb-2" />
                  <h3 className="text-white font-semibold mb-1 group-hover:text-gradient transition-all">
                    Upload Documents
                  </h3>
                  <p className="text-slate-400 text-sm">Add verification documents</p>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Verification Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-strong rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Verification Status</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">Business Verified</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">CAC Verified</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">ID Verified</span>
                </div>
              </div>
            </motion.div>

            {/* Settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-strong rounded-2xl p-6"
            >
              <button className="w-full flex items-center justify-between text-white hover:text-primary-400 transition-colors group">
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5" />
                  <span className="font-semibold">Account Settings</span>
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

