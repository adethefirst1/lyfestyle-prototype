'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Eye, Star, Users, MessageSquare, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d')

  // Mock data - in a real app, this would come from an API
  const metrics = {
    views: { current: 3891, previous: 3421, change: 13.7, trend: 'up' },
    saves: { current: 1247, previous: 1089, change: 14.5, trend: 'up' },
    rating: { current: 4.8, previous: 4.7, change: 2.1, trend: 'up' },
    reviews: { current: 156, previous: 142, change: 9.9, trend: 'up' },
    visitors: { current: 2843, previous: 2654, change: 7.1, trend: 'up' },
    engagement: { current: 68.2, previous: 64.8, change: 5.2, trend: 'up' },
  }

  const recentActivity = [
    { id: 1, type: 'view', description: 'Profile viewed by @sarah_k', time: '2 minutes ago' },
    { id: 2, type: 'save', description: 'Profile saved by @mike_tech', time: '15 minutes ago' },
    { id: 3, type: 'review', description: 'New 5-star review from @david_l', time: '1 hour ago' },
    { id: 4, type: 'view', description: 'Profile viewed by @lisa_m', time: '2 hours ago' },
    { id: 5, type: 'save', description: 'Profile saved by @john_d', time: '3 hours ago' },
  ]

  const topReferrers = [
    { source: 'Google Search', visits: 1247, percentage: 32.1 },
    { source: 'Direct', visits: 891, percentage: 22.9 },
    { source: 'Social Media', visits: 654, percentage: 16.8 },
    { source: 'Category Browse', visits: 543, percentage: 14.0 },
    { source: 'Other', visits: 556, percentage: 14.2 },
  ]

  const timeRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'all', label: 'All time' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Analytics
            </h1>
            <p className="text-slate-600">
              Track your business performance and engagement
            </p>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1 border border-slate-200">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value as typeof timeRange)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  timeRange === range.value
                    ? 'bg-white text-[#FF6700] shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Views */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              {metrics.views.trend === 'up' ? (
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">{metrics.views.change}%</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <ArrowDownRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">{metrics.views.change}%</span>
                </div>
              )}
            </div>
            <h3 className="text-sm text-slate-600 mb-1">Profile Views</h3>
            <p className="text-3xl font-bold text-slate-900">{metrics.views.current.toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-2">vs {metrics.views.previous.toLocaleString()} previous period</p>
          </div>

          {/* Profile Saves */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              {metrics.saves.trend === 'up' ? (
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">{metrics.saves.change}%</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <ArrowDownRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">{metrics.saves.change}%</span>
                </div>
              )}
            </div>
            <h3 className="text-sm text-slate-600 mb-1">Profile Saves</h3>
            <p className="text-3xl font-bold text-slate-900">{metrics.saves.current.toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-2">vs {metrics.saves.previous.toLocaleString()} previous period</p>
          </div>

          {/* Average Rating */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Star className="w-6 h-6 text-amber-600" />
              </div>
              {metrics.rating.trend === 'up' ? (
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">{metrics.rating.change}%</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <ArrowDownRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">{metrics.rating.change}%</span>
                </div>
              )}
            </div>
            <h3 className="text-sm text-slate-600 mb-1">Average Rating</h3>
            <p className="text-3xl font-bold text-slate-900">{metrics.rating.current}</p>
            <p className="text-xs text-slate-500 mt-2">vs {metrics.rating.previous} previous period</p>
          </div>

          {/* Total Reviews */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              {metrics.reviews.trend === 'up' ? (
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">{metrics.reviews.change}%</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <ArrowDownRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">{metrics.reviews.change}%</span>
                </div>
              )}
            </div>
            <h3 className="text-sm text-slate-600 mb-1">Total Reviews</h3>
            <p className="text-3xl font-bold text-slate-900">{metrics.reviews.current}</p>
            <p className="text-xs text-slate-500 mt-2">vs {metrics.reviews.previous} previous period</p>
          </div>

          {/* Unique Visitors */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
              {metrics.visitors.trend === 'up' ? (
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">{metrics.visitors.change}%</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <ArrowDownRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">{metrics.visitors.change}%</span>
                </div>
              )}
            </div>
            <h3 className="text-sm text-slate-600 mb-1">Unique Visitors</h3>
            <p className="text-3xl font-bold text-slate-900">{metrics.visitors.current.toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-2">vs {metrics.visitors.previous.toLocaleString()} previous period</p>
          </div>

          {/* Engagement Rate */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-pink-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-pink-600" />
              </div>
              {metrics.engagement.trend === 'up' ? (
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">{metrics.engagement.change}%</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <ArrowDownRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">{metrics.engagement.change}%</span>
                </div>
              )}
            </div>
            <h3 className="text-sm text-slate-600 mb-1">Engagement Rate</h3>
            <p className="text-3xl font-bold text-slate-900">{metrics.engagement.current}%</p>
            <p className="text-xs text-slate-500 mt-2">vs {metrics.engagement.previous}% previous period</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'view' ? 'bg-blue-100' :
                    activity.type === 'save' ? 'bg-purple-100' :
                    'bg-green-100'
                  }`}>
                    {activity.type === 'view' ? (
                      <Eye className="w-4 h-4 text-blue-600" />
                    ) : activity.type === 'save' ? (
                      <Users className="w-4 h-4 text-purple-600" />
                    ) : (
                      <Star className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.description}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Referrers */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Traffic Sources</h2>
            <div className="space-y-4">
              {topReferrers.map((referrer, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-900">{referrer.source}</span>
                    <span className="text-sm text-slate-600">{referrer.visits.toLocaleString()} visits</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-[#FF6700] h-2 rounded-full transition-all"
                      style={{ width: `${referrer.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{referrer.percentage}% of total traffic</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Performance Overview</h2>
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600 font-medium">Chart visualization coming soon</p>
              <p className="text-sm text-slate-500 mt-1">View trends and patterns over time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
