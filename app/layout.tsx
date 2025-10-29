import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lyfestyle - Discover Trusted Businesses Near You',
  description: 'A Nigerian-based business discovery and verification platform. Find verified mechanics, salons, tech experts, caterers, and more.',
  keywords: 'business directory, Nigeria, verified businesses, local services',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#4F46E5',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="animated-bg min-h-screen">
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <FloatingCTA />
        </div>
      </body>
    </html>
  )
}

