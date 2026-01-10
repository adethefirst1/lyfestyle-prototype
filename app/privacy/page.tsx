'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  Users, 
  Cookie, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp,
  Mail,
  Phone,
  AlertCircle,
  Fingerprint,
  Database,
  Globe
} from 'lucide-react'

interface Section {
  id: string
  title: string
  icon: any
  content: JSX.Element
}

export default function PrivacyPolicyPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['introduction']))
  const [lastUpdated] = useState('January 2024')
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
      id: 'introduction',
      title: 'Introduction',
      icon: FileText,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            Welcome to <span className="font-semibold text-slate-900">Lyfestylz</span>. We are committed to protecting your privacy and ensuring you have a positive experience when using our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          <p>
            This policy is designed to comply with the <span className="font-semibold text-primary-600">Nigeria Data Protection Regulation (NDPR) 2019</span> and other applicable Nigerian data protection laws. By using our services, you consent to the data practices described in this policy.
          </p>
          <div className="bg-blue-50 border-l-4 border-primary-500 p-4 rounded-r-lg mt-4">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Last Updated:</span> {lastUpdated}
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'data-collection',
      title: 'Information We Collect',
      icon: Database,
      content: (
        <div className="space-y-6 text-slate-600">
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Personal Information</h4>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Name, email address, phone number, and physical address</li>
              <li>Business registration details (CAC number, business name, etc.)</li>
              <li>Government-issued identification documents for verification</li>
              <li>Payment information (processed securely through third-party payment processors)</li>
              <li>Profile information and preferences</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Automatically Collected Information</h4>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Device information (IP address, browser type, device type)</li>
              <li>Usage data (pages visited, time spent, interactions)</li>
              <li>Location data (with your permission, for location-based services)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Business Information</h4>
            <p className="mb-2">For businesses listing on our platform:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Business profile information (description, services, hours of operation)</li>
              <li>Business photos and media</li>
              <li>Verification documents and certifications</li>
              <li>Customer reviews and ratings</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'data-use',
      title: 'How We Use Your Information',
      icon: Eye,
      content: (
        <div className="space-y-4 text-slate-600">
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Service Delivery</h4>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Provide, maintain, and improve our platform and services</li>
              <li>Process business listings and verifications</li>
              <li>Facilitate communication between users and businesses</li>
              <li>Process payments and transactions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Business Operations</h4>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Verify business legitimacy and compliance with Nigerian regulations</li>
              <li>Respond to customer service requests and support inquiries</li>
              <li>Send important updates about your account or our services</li>
              <li>Analyze usage patterns to improve user experience</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Legal Compliance</h4>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Comply with NDPR and other Nigerian laws and regulations</li>
              <li>Respond to legal requests and prevent fraudulent activities</li>
              <li>Protect the rights, property, or safety of Lyfestylz, our users, or others</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'data-sharing',
      title: 'Information Sharing and Disclosure',
      icon: Users,
      content: (
        <div className="space-y-4 text-slate-600">
          <p className="font-semibold text-slate-900">We do not sell your personal information. We may share your information only in the following circumstances:</p>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Public Business Profiles</h4>
            <p>Business information you choose to make public on your business profile (name, location, services, photos) will be visible to all platform users.</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Service Providers</h4>
            <p>We may share information with trusted third-party service providers who assist us in operating our platform, such as:</p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
              <li>Payment processors (Paystack, Flutterwave, etc.)</li>
              <li>Cloud hosting services</li>
              <li>Email service providers</li>
              <li>Analytics services</li>
            </ul>
            <p className="mt-3">All service providers are contractually bound to protect your information and use it only for specified purposes.</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Legal Requirements</h4>
            <p>We may disclose information if required by Nigerian law, court order, or government regulation, including requests from law enforcement agencies.</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Business Transfers</h4>
            <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity, subject to the same privacy protections.</p>
          </div>
        </div>
      )
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-primary-600" />
                <h4 className="font-semibold text-slate-900">Encryption</h4>
              </div>
              <p className="text-sm">SSL/TLS encryption for data transmission</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-5 h-5 text-primary-600" />
                <h4 className="font-semibold text-slate-900">Secure Storage</h4>
              </div>
              <p className="text-sm">Secure servers with access controls</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Fingerprint className="w-5 h-5 text-primary-600" />
                <h4 className="font-semibold text-slate-900">Access Controls</h4>
              </div>
              <p className="text-sm">Limited access to authorized personnel only</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-primary-600" />
                <h4 className="font-semibold text-slate-900">Monitoring</h4>
              </div>
              <p className="text-sm">Regular security audits and monitoring</p>
            </div>
          </div>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-4">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Note:</span> While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'your-rights',
      title: 'Your Rights Under NDPR',
      icon: CheckCircle,
      content: (
        <div className="space-y-4 text-slate-600">
          <p className="font-semibold text-slate-900 mb-4">As a Nigerian data subject, you have the following rights:</p>
          <div className="space-y-3">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Right of Access</h4>
              <p className="text-sm">Request copies of your personal data we hold</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Right to Rectification</h4>
              <p className="text-sm">Request correction of inaccurate or incomplete data</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Right to Erasure</h4>
              <p className="text-sm">Request deletion of your personal data (subject to legal obligations)</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Right to Object</h4>
              <p className="text-sm">Object to processing of your data for certain purposes</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Right to Data Portability</h4>
              <p className="text-sm">Receive your data in a structured, commonly used format</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Right to Withdraw Consent</h4>
              <p className="text-sm">Withdraw consent at any time where processing is based on consent</p>
            </div>
          </div>
          <div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded-r-lg mt-4">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">To exercise these rights,</span> contact us at{' '}
              <a href="mailto:privacy@lyfestylz.com" className="text-primary-600 hover:underline font-semibold">
                privacy@lyfestylz.com
              </a>
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking Technologies',
      icon: Cookie,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies are small text files stored on your device when you visit our website.
          </p>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Types of Cookies We Use</h4>
            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h5 className="font-semibold text-slate-900 mb-1">Essential Cookies</h5>
                <p className="text-sm">Required for the platform to function properly (e.g., authentication, security)</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h5 className="font-semibold text-slate-900 mb-1">Performance Cookies</h5>
                <p className="text-sm">Help us understand how visitors interact with our platform to improve performance</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h5 className="font-semibold text-slate-900 mb-1">Functional Cookies</h5>
                <p className="text-sm">Remember your preferences and settings for a personalized experience</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h5 className="font-semibold text-slate-900 mb-1">Marketing Cookies</h5>
                <p className="text-sm">Used to deliver relevant advertisements (with your consent)</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-4">
            <p className="text-sm text-slate-700">
              You can control cookies through your browser settings. However, disabling certain cookies may limit functionality of our platform.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      icon: Database,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by Nigerian law.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-3">Retention Periods:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm ml-2">
              <li><span className="font-semibold">Active Accounts:</span> For the duration of your account plus 2 years</li>
              <li><span className="font-semibold">Inactive Accounts:</span> 3 years after last activity</li>
              <li><span className="font-semibold">Business Listings:</span> While published, plus 5 years for legal compliance</li>
              <li><span className="font-semibold">Financial Records:</span> 7 years as required by Nigerian tax laws</li>
              <li><span className="font-semibold">Verification Documents:</span> 5 years after account closure</li>
            </ul>
          </div>
          <p className="text-sm">
            After the retention period, we will securely delete or anonymize your personal information in accordance with NDPR requirements.
          </p>
        </div>
      )
    },
    {
      id: 'children',
      title: "Children's Privacy",
      icon: Shield,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            Our platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from children without parental consent.
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">If you are a parent or guardian</span> and believe your child has provided us with personal information, please contact us immediately. We will take steps to delete such information from our systems.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'international',
      title: 'International Data Transfers',
      icon: Globe,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            Your information is primarily stored and processed within Nigeria. However, some of our service providers may be located outside Nigeria.
          </p>
          <p>
            When we transfer data outside Nigeria, we ensure appropriate safeguards are in place, including:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Standard contractual clauses approved by Nigerian data protection authorities</li>
            <li>Data processing agreements with service providers</li>
            <li>Compliance with NDPR requirements for international transfers</li>
          </ul>
          <div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded-r-lg mt-4">
            <p className="text-sm text-slate-700">
              By using our services, you consent to the transfer of your information as described in this policy.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'updates',
      title: 'Changes to This Policy',
      icon: FileText,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Posting the updated policy on this page with a new "Last Updated" date</li>
            <li>Sending an email notification to registered users</li>
            <li>Displaying a prominent notice on our platform</li>
          </ul>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-4">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">We encourage you to review this policy periodically</span> to stay informed about how we protect your information. Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'contact',
      title: 'Contact Us',
      icon: Mail,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                <a href="mailto:privacy@lyfestylz.com" className="text-primary-600 hover:underline">
                  privacy@lyfestylz.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Phone</h4>
                <a href="tel:+2348000000000" className="text-primary-600 hover:underline">
                  +234 800 000 0000
                </a>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Data Protection Officer</h4>
              <p className="text-sm">
                For NDPR-related inquiries, please contact our Data Protection Officer at{' '}
                <a href="mailto:dpo@lyfestylz.com" className="text-primary-600 hover:underline">
                  dpo@lyfestylz.com
                </a>
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Address</h4>
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
          className="h-full bg-gradient-to-r from-primary-500 to-brand-blue"
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
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-brand-blue flex items-center justify-center"
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-6">
              Your privacy matters to us. Learn how we protect and handle your personal information in compliance with Nigeria Data Protection Regulation (NDPR).
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-slate-700 font-medium">NDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                <Lock className="w-4 h-4 text-primary-600" />
                <span className="text-slate-700 font-medium">Secure & Encrypted</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                <Eye className="w-4 h-4 text-primary-600" />
                <span className="text-slate-700 font-medium">Transparent Practices</span>
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
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-brand-blue flex items-center justify-center shrink-0">
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
            className="mt-12 bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8 border border-primary-200"
          >
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-primary-600 shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Your Privacy is Our Priority
                </h3>
                <p className="text-slate-600 mb-4">
                  We are committed to protecting your personal information and being transparent about our data practices. If you have any questions or concerns, please don't hesitate to contact us.
                </p>
                <p className="text-sm text-slate-500">
                  This policy complies with the Nigeria Data Protection Regulation (NDPR) 2019 and other applicable Nigerian laws.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
