'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Settings, 
  BarChart3,
  FileText,
  Bell,
  LogOut
} from 'lucide-react'
import Logo from '@/components/Logo'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Gallery', href: '/dashboard/gallery', icon: ImageIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Check authentication on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuthenticated = localStorage.getItem('isAuthenticated')
      if (!isAuthenticated) {
        router.push('/account')
      }
    }
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userRole')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 hidden lg:block">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-20 px-6 border-b border-slate-200">
            <Link href="/dashboard">
              <Logo showText={true} textSize="md" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-50 text-[#FF6700]'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-[#FF6700]' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="px-4 py-6 border-t border-slate-200 space-y-2">
            <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 w-full text-left transition-colors">
              <Bell className="w-5 h-5 text-slate-400" />
              <span>Notifications</span>
            </button>
            <button 
              onClick={handleSignOut}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 w-full text-left transition-colors"
            >
              <LogOut className="w-5 h-5 text-slate-400" />
              <span>Sign Out</span>
            </button>
            <button 
              onClick={handleSignOut}
              className="text-xs text-slate-500 hover:text-[#FF6700] transition-colors underline w-full text-left px-4 py-2"
            >
              out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-20 px-6 border-b border-slate-200">
            <Link href="/dashboard" onClick={() => setSidebarOpen(false)}>
              <Logo showText={true} textSize="md" />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-50 text-[#FF6700]'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-[#FF6700]' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="px-4 py-6 border-t border-slate-200 space-y-2">
            <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 w-full text-left transition-colors">
              <Bell className="w-5 h-5 text-slate-400" />
              <span>Notifications</span>
            </button>
            <button 
              onClick={handleSignOut}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 w-full text-left transition-colors"
            >
              <LogOut className="w-5 h-5 text-slate-400" />
              <span>Sign Out</span>
            </button>
            <button 
              onClick={handleSignOut}
              className="text-xs text-slate-500 hover:text-[#FF6700] transition-colors underline w-full text-left px-4 py-2"
            >
              out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-200">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/dashboard">
              <Logo showText={true} textSize="sm" />
            </Link>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}

