'use client'

import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react'

export default function AdminDashboardPage() {
  const pendingBusinesses = [
    { id: 1, name: 'New Auto Repair Shop', category: 'Auto', submittedDate: '2 hours ago', status: 'pending' },
    { id: 2, name: 'Fresh Beauty Salon', category: 'Beauty', submittedDate: '5 hours ago', status: 'pending' },
    { id: 3, name: 'Tech Solutions Hub', category: 'Tech', submittedDate: '1 day ago', status: 'pending' },
  ]

  const stats = [
    { label: 'Pending Reviews', value: '12', icon: Clock, color: 'from-amber-500 to-orange-500' },
    { label: 'Approved Today', value: '8', icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
    { label: 'Rejected', value: '3', icon: XCircle, color: 'from-red-500 to-rose-500' },
    { label: 'Flagged', value: '2', icon: AlertTriangle, color: 'from-purple-500 to-pink-500' },
  ]

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 bg-white py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Admin <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-slate-600 text-lg">Manage business verifications and platform oversight</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-slate-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Pending Verifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-50 rounded-2xl p-8 border border-slate-200"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Pending Verifications</h2>
          
          <div className="space-y-4">
            {pendingBusinesses.map((business, index) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-slate-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-slate-900 font-semibold text-lg mb-1">{business.name}</h3>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-primary-500">{business.category}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600">Submitted {business.submittedDate}</span>
                    </div>
                  </div>
                  
                  <div className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
                    <span className="text-amber-600 text-sm font-semibold">Pending</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  
                  <button className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                  
                  <button className="px-4 py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold transition-all">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

