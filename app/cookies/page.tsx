'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Cookie, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp,
  Settings,
  Shield,
  BarChart,
  Target,
  AlertCircle,
  Info
} from 'lucide-react'

interface Section {
  id: string
  title: string
  icon: any
  content: JSX.Element
}

export default function CookiePolicyPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['what-are-cookies']))
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const sections: Section[] = [
    {
      id: 'what-are-cookies',
      title: 'What Are Cookies?',
      icon: Cookie,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you visit our website. They are widely used to make websites work more efficiently and provide information to website owners.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-4">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">How Cookies Work:</span> When you visit our site, cookies are sent to your browser and stored on your device. When you return to our site, your browser sends these cookies back to us, allowing us to recognize you and remember your preferences.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'types-of-cookies',
      title: 'Types of Cookies We Use',
      icon: Settings,
      content: (
        <div className="space-y-4 text-slate-600">
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">1. Essential Cookies</h4>
            <p className="mb-2">These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.</p>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-3">
              <p className="text-sm font-semibold text-slate-900 mb-2">Examples:</p>
              <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                <li>Authentication cookies (keep you logged in)</li>
                <li>Security cookies (protect against fraud)</li>
                <li>Load balancing cookies (distribute traffic)</li>
                <li>Session management cookies</li>
              </ul>
              <p className="text-xs text-slate-500 mt-3">
                <strong>Consent Required:</strong> No - These are essential for site operation
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold text-slate-900 mb-3">2. Performance Cookies</h4>
            <p className="mb-2">These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-3">
              <p className="text-sm font-semibold text-slate-900 mb-2">Examples:</p>
              <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                <li>Analytics cookies (page views, time spent)</li>
                <li>Performance monitoring (page load times)</li>
                <li>Error tracking cookies</li>
                <li>User behavior analysis</li>
              </ul>
              <p className="text-xs text-slate-500 mt-3">
                <strong>Consent Required:</strong> Yes - We request your consent before using these
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-slate-900 mb-3">3. Functionality Cookies</h4>
            <p className="mb-2">These cookies allow the website to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features.</p>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-3">
              <p className="text-sm font-semibold text-slate-900 mb-2">Examples:</p>
              <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                <li>Language preference cookies</li>
                <li>Location settings</li>
                <li>Display preferences (theme, font size)</li>
                <li>Form data storage</li>
              </ul>
              <p className="text-xs text-slate-500 mt-3">
                <strong>Consent Required:</strong> Yes - We request your consent before using these
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-slate-900 mb-3">4. Marketing/Targeting Cookies</h4>
            <p className="mb-2">These cookies are used to deliver advertisements relevant to you and your interests. They also limit the number of times you see an advertisement.</p>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-3">
              <p className="text-sm font-semibold text-slate-900 mb-2">Examples:</p>
              <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                <li>Advertising cookies</li>
                <li>Retargeting cookies</li>
                <li>Social media tracking cookies</li>
                <li>Conversion tracking</li>
              </ul>
              <p className="text-xs text-slate-500 mt-3">
                <strong>Consent Required:</strong> Yes - We request your explicit consent before using these
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'cookies-we-use',
      title: 'Specific Cookies We Use',
      icon: Cookie,
      content: (
        <div className="space-y-4 text-slate-600">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 p-3 text-left text-sm font-semibold text-slate-900">Cookie Name</th>
                  <th className="border border-slate-200 p-3 text-left text-sm font-semibold text-slate-900">Purpose</th>
                  <th className="border border-slate-200 p-3 text-left text-sm font-semibold text-slate-900">Duration</th>
                  <th className="border border-slate-200 p-3 text-left text-sm font-semibold text-slate-900">Type</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="border border-slate-200 p-3 font-mono text-xs">session_id</td>
                  <td className="border border-slate-200 p-3">Maintains user session</td>
                  <td className="border border-slate-200 p-3">Session</td>
                  <td className="border border-slate-200 p-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Essential</span></td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 p-3 font-mono text-xs">auth_token</td>
                  <td className="border border-slate-200 p-3">User authentication</td>
                  <td className="border border-slate-200 p-3">30 days</td>
                  <td className="border border-slate-200 p-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Essential</span></td>
                </tr>
                <tr>
                  <td className="border border-slate-200 p-3 font-mono text-xs">preferences</td>
                  <td className="border border-slate-200 p-3">Stores user preferences</td>
                  <td className="border border-slate-200 p-3">1 year</td>
                  <td className="border border-slate-200 p-3"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Functionality</span></td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 p-3 font-mono text-xs">_ga</td>
                  <td className="border border-slate-200 p-3">Google Analytics</td>
                  <td className="border border-slate-200 p-3">2 years</td>
                  <td className="border border-slate-200 p-3"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">Performance</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            This list is not exhaustive and may be updated. For a complete current list, please contact us.
          </p>
        </div>
      )
    },
    {
      id: 'third-party-cookies',
      title: 'Third-Party Cookies',
      icon: Target,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Service and deliver advertisements on and through the Service.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
            <h4 className="font-semibold text-slate-900 mb-3">Third-Party Services We Use:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm ml-2">
              <li><strong>Google Analytics:</strong> Helps us understand how visitors use our site</li>
              <li><strong>Payment Processors:</strong> Cookies from Paystack, Flutterwave for payment processing</li>
              <li><strong>Social Media:</strong> Cookies from social media platforms when you share content</li>
              <li><strong>Advertising Partners:</strong> Cookies for targeted advertising (with your consent)</li>
            </ul>
          </div>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-4">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Note:</span> Third-party cookies are subject to the privacy policies of those third parties. We recommend reviewing their cookie policies for more information.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'managing-cookies',
      title: 'Managing Your Cookie Preferences',
      icon: Settings,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
          </p>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Browser Settings</h4>
            <p className="mb-3">You can control cookies through your browser settings:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h5 className="font-semibold text-slate-900 mb-2 text-sm">Chrome</h5>
                <p className="text-sm">Settings → Privacy and Security → Cookies and other site data</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h5 className="font-semibold text-slate-900 mb-2 text-sm">Firefox</h5>
                <p className="text-sm">Options → Privacy & Security → Cookies and Site Data</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h5 className="font-semibold text-slate-900 mb-2 text-sm">Safari</h5>
                <p className="text-sm">Preferences → Privacy → Manage Website Data</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h5 className="font-semibold text-slate-900 mb-2 text-sm">Edge</h5>
                <p className="text-sm">Settings → Privacy, Search, and Services → Cookies</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-4">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Important:</span> If you disable cookies, some features of our website may not function properly, and your experience may be affected.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'cookie-consent',
      title: 'Cookie Consent',
      icon: CheckCircle,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            When you first visit our website, we will display a cookie consent banner asking for your permission to use cookies. You can choose to:
          </p>
          <div className="space-y-3 mt-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <h4 className="font-semibold text-green-900 mb-2">Accept All Cookies</h4>
              <p className="text-sm text-green-800">Allow all cookies including performance, functionality, and marketing cookies.</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Essential Only</h4>
              <p className="text-sm text-blue-800">Accept only essential cookies required for the website to function.</p>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <h4 className="font-semibold text-amber-900 mb-2">Customize Preferences</h4>
              <p className="text-sm text-amber-800">Choose which categories of cookies you want to accept or reject.</p>
            </div>
          </div>
          <p className="mt-4 text-sm">
            You can change your cookie preferences at any time by clicking the cookie settings link in our footer or contacting us.
          </p>
        </div>
      )
    },
    {
      id: 'duration',
      title: 'Cookie Duration',
      icon: Info,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            Cookies can be either "session" cookies or "persistent" cookies:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Session Cookies</h4>
              <p className="text-sm mb-2">Temporary cookies that expire when you close your browser.</p>
              <p className="text-xs text-slate-500">Used for: Authentication, session management, temporary preferences</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Persistent Cookies</h4>
              <p className="text-sm mb-2">Cookies that remain on your device for a set period or until you delete them.</p>
              <p className="text-xs text-slate-500">Used for: Remembering preferences, analytics, advertising</p>
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
            <h4 className="font-semibold text-slate-900 mb-2">Typical Duration Periods:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm ml-2">
              <li><strong>Session:</strong> Until browser is closed</li>
              <li><strong>Short-term:</strong> 24 hours to 7 days</li>
              <li><strong>Medium-term:</strong> 30 days to 90 days</li>
              <li><strong>Long-term:</strong> 1 year to 2 years</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'do-not-track',
      title: 'Do Not Track Signals',
      icon: Shield,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            Some browsers incorporate a "Do Not Track" (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
            <h4 className="font-semibold text-slate-900 mb-2">Our Response to DNT Signals:</h4>
            <p className="text-sm mb-2">
              Currently, there is no industry standard for responding to DNT signals. We are committed to respecting your privacy preferences and are working on implementing DNT support.
            </p>
            <p className="text-sm">
              In the meantime, you can control tracking through your browser settings and our cookie consent preferences.
            </p>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-4">
            <p className="text-sm text-slate-700">
              We continue to monitor developments in DNT technology and will update our practices accordingly.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'updates',
      title: 'Updates to This Policy',
      icon: AlertCircle,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
            <h4 className="font-semibold text-slate-900 mb-2">When We Update This Policy:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm ml-2">
              <li>We will update the "Last Updated" date at the top of this page</li>
              <li>We may notify you via email if changes are material</li>
              <li>We will display a notice on our website for significant changes</li>
              <li>Your continued use of our website after changes constitutes acceptance</li>
            </ul>
          </div>
          <p className="text-sm mt-4">
            We encourage you to review this Cookie Policy periodically to stay informed about our use of cookies.
          </p>
        </div>
      )
    },
    {
      id: 'contact',
      title: 'Questions About Cookies?',
      icon: Cookie,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            If you have any questions about our use of cookies or this Cookie Policy, please contact us:
          </p>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
              <a href="mailto:privacy@lyfestylz.com" className="text-brand-orange hover:underline">
                privacy@lyfestylz.com
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Phone</h4>
              <a href="tel:+2348000000000" className="text-brand-orange hover:underline">
                +234 800 000 0000
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Address</h4>
              <p className="text-sm">
                Lyfestylz<br />
                Nigeria
              </p>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="fixed top-20 left-0 right-0 h-1 bg-slate-100 z-40">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-orange to-[#e55a00]"
          style={{ width: progressWidth }}
        />
      </div>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center"
              >
                <Cookie className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Cookie Policy
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-6">
              Learn how we use cookies and similar technologies to enhance your experience on Lyfestylz
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                <Settings className="w-4 h-4 text-brand-orange" />
                <span className="text-slate-700 font-medium">Customizable</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                <Shield className="w-4 h-4 text-brand-orange" />
                <span className="text-slate-700 font-medium">Transparent</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Interactive Sections */}
          <div className="space-y-4">
            {sections.map((section, index) => {
              const Icon = section.icon
              const isExpanded = expandedSections.has(section.id)
              
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                        {section.title}
                      </h2>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-6 h-6 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-slate-400" />
                      )}
                    </motion.div>
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-slate-100">
                      {section.content}
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200"
          >
            <div className="flex items-start gap-4">
              <Cookie className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Control Your Cookie Preferences
                </h3>
                <p className="text-slate-600 mb-4">
                  You have full control over which cookies you accept. You can change your preferences at any time through your browser settings or by contacting us. Essential cookies are required for the site to function, but you can opt out of performance, functionality, and marketing cookies.
                </p>
                <p className="text-sm text-slate-500">
                  This Cookie Policy complies with NDPR and international best practices for cookie transparency.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
