'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp,
  Shield,
  Users,
  Ban,
  Gavel,
  Scale,
  Mail
} from 'lucide-react'

interface Section {
  id: string
  title: string
  icon: any
  content: JSX.Element
}

export default function TermsOfServicePage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['acceptance']))
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
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            Welcome to <span className="font-semibold text-slate-900">Lyfestylz</span>. These Terms of Service ("Terms") govern your access to and use of our platform, services, and website (collectively, the "Service") operated by Lyfestylz ("we," "us," or "our").
          </p>
          <p>
            By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access or use our Service.
          </p>
          <div className="bg-brand-orange/10 border-l-4 border-brand-orange p-4 rounded-r-lg mt-4">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Last Updated:</span> {lastUpdated}
            </p>
            <p className="text-sm text-slate-700 mt-2">
              <span className="font-semibold">Effective Date:</span> January 1, 2024
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'description',
      title: 'Description of Service',
      icon: FileText,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            Lyfestylz is a Nigerian business discovery and verification platform that connects users with trusted, verified local businesses. Our Service includes:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Business directory and search functionality</li>
            <li>Business verification services</li>
            <li>User reviews and ratings system</li>
            <li>Business profile management tools</li>
            <li>Communication tools between users and businesses</li>
            <li>Payment processing services (where applicable)</li>
          </ul>
          <p className="mt-4">
            We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time, with or without notice.
          </p>
        </div>
      )
    },
    {
      id: 'eligibility',
      title: 'Eligibility and Registration',
      icon: Users,
      content: (
        <div className="space-y-4 text-slate-600">
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Age Requirement</h4>
            <p>You must be at least 18 years old to use our Service. By using the Service, you represent and warrant that you meet this age requirement.</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Account Registration</h4>
            <p>To access certain features, you may be required to register for an account. When registering, you agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information to keep it accurate</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Business Verification</h4>
            <p>Businesses listing on our platform must:</p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
              <li>Provide valid business registration documents (CAC certificate, etc.)</li>
              <li>Submit government-issued identification</li>
              <li>Comply with all applicable Nigerian business regulations</li>
              <li>Maintain accurate business information</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'user-conduct',
      title: 'User Conduct and Responsibilities',
      icon: Ban,
      content: (
        <div className="space-y-4 text-slate-600">
          <p className="font-semibold text-slate-900">You agree not to:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <h5 className="font-semibold text-slate-900 mb-2">Prohibited Activities</h5>
              <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                <li>Post false, misleading, or fraudulent information</li>
                <li>Impersonate any person or entity</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Upload malicious code or viruses</li>
                <li>Attempt to gain unauthorized access</li>
                <li>Spam or send unsolicited communications</li>
                <li>Engage in any fraudulent activity</li>
              </ul>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <h5 className="font-semibold text-slate-900 mb-2">Content Restrictions</h5>
              <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                <li>Obscene, pornographic, or offensive content</li>
                <li>Content that infringes intellectual property</li>
                <li>Defamatory or libelous statements</li>
                <li>Content promoting illegal activities</li>
                <li>Discriminatory or hate speech</li>
              </ul>
            </div>
          </div>
          <div className="bg-brand-orange/10 border-l-4 border-brand-orange p-4 rounded-r-lg mt-4">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">We reserve the right</span> to remove any content or suspend any account that violates these Terms, without prior notice.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'business-terms',
      title: 'Business Listing Terms',
      icon: Shield,
      content: (
        <div className="space-y-4 text-slate-600">
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Listing Requirements</h4>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Businesses must be legally registered in Nigeria or authorized to operate</li>
              <li>All information provided must be accurate and truthful</li>
              <li>Businesses must maintain active and responsive communication</li>
              <li>Businesses must honor commitments made through the platform</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Verification Process</h4>
            <p>Our verification process includes:</p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
              <li>Document verification (CAC, ID, business licenses)</li>
              <li>Physical location verification (where applicable)</li>
              <li>Background checks and compliance reviews</li>
              <li>Ongoing monitoring and re-verification</li>
            </ul>
            <p className="mt-3">Verification status may be revoked if a business violates these Terms or engages in fraudulent activity.</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Fees and Payments</h4>
            <p>Current listing fees (subject to change):</p>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-3">
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Standard Listing:</span>
                  <span className="font-semibold text-slate-900">Free</span>
                </li>
                <li className="flex justify-between">
                  <span>Premium/Featured Listing:</span>
                  <span className="font-semibold text-slate-900">As advertised</span>
                </li>
                <li className="flex justify-between">
                  <span>Verification Fee:</span>
                  <span className="font-semibold text-slate-900">As applicable</span>
                </li>
              </ul>
            </div>
            <p className="mt-3 text-sm">All fees are in Nigerian Naira (NGN). Payment terms and refund policies are detailed in our separate Payment Terms.</p>
          </div>
        </div>
      )
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Rights',
      icon: FileText,
      content: (
        <div className="space-y-4 text-slate-600">
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Our Content</h4>
            <p>
              All content, features, and functionality of the Service, including but not limited to text, graphics, logos, icons, images, software, and the compilation thereof, are the exclusive property of Lyfestylz or its licensors and are protected by Nigerian and international copyright, trademark, and other intellectual property laws.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Your Content</h4>
            <p>You retain ownership of content you post on the Service. By posting content, you grant us a worldwide, non-exclusive, royalty-free license to:</p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
              <li>Use, reproduce, modify, and display your content on the Service</li>
              <li>Distribute and promote your content through the Service</li>
              <li>Use your content for Service improvement and analytics</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Trademarks</h4>
            <p>
              "Lyfestylz," our logo, and other marks are trademarks of Lyfestylz. You may not use these marks without our prior written permission.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'reviews',
      title: 'Reviews and Ratings',
      icon: Users,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            Users may post reviews and ratings for businesses listed on our platform. You agree that:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Reviews must be based on genuine experiences</li>
            <li>Reviews must not contain false or defamatory statements</li>
            <li>You may not post reviews for businesses you own or are affiliated with</li>
            <li>Businesses may respond to reviews, but may not offer incentives for positive reviews</li>
            <li>We reserve the right to remove reviews that violate these Terms</li>
          </ul>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-4">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Note:</span> We do not verify the accuracy of individual reviews. Reviews represent the opinions of users and not Lyfestylz.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'limitation',
      title: 'Limitation of Liability',
      icon: AlertCircle,
      content: (
        <div className="space-y-4 text-slate-600">
          <p className="font-semibold text-slate-900">TO THE MAXIMUM EXTENT PERMITTED BY NIGERIAN LAW:</p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
            <ul className="list-disc list-inside space-y-2 text-sm ml-2">
              <li>The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind</li>
              <li>We do not guarantee the accuracy, completeness, or reliability of any business information</li>
              <li>We are not responsible for transactions between users and businesses</li>
              <li>We do not endorse or guarantee the quality of services provided by listed businesses</li>
              <li>Our liability is limited to the amount you paid us in the 12 months preceding the claim</li>
              <li>We are not liable for indirect, incidental, or consequential damages</li>
            </ul>
          </div>
          <p className="mt-4 text-sm">
            Nothing in these Terms excludes or limits our liability for death or personal injury, fraud, or any other liability that cannot be excluded under Nigerian law.
          </p>
        </div>
      )
    },
    {
      id: 'indemnification',
      title: 'Indemnification',
      icon: Shield,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            You agree to indemnify, defend, and hold harmless Lyfestylz, its officers, directors, employees, and agents from and against any claims, damages, obligations, losses, liabilities, costs, or expenses (including legal fees) arising from:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Your use of or access to the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any third-party rights</li>
            <li>Content you post or transmit through the Service</li>
            <li>Your business practices or interactions with other users</li>
          </ul>
        </div>
      )
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: Ban,
      content: (
        <div className="space-y-4 text-slate-600">
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Termination by You</h4>
            <p>You may terminate your account at any time by contacting us or using account deletion features (where available).</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Termination by Us</h4>
            <p>We may suspend or terminate your account immediately if you:</p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
              <li>Violate these Terms or our Privacy Policy</li>
              <li>Engage in fraudulent, illegal, or harmful activity</li>
              <li>Fail to pay required fees (where applicable)</li>
              <li>Abuse or harass other users</li>
              <li>Otherwise harm our business or reputation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Effect of Termination</h4>
            <p>Upon termination:</p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
              <li>Your right to access and use the Service immediately ceases</li>
              <li>Your account and content may be deleted</li>
              <li>We are not obligated to provide refunds for any unused portions</li>
              <li>Provisions that should survive termination (e.g., indemnification) will continue</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'governing-law',
      title: 'Governing Law and Dispute Resolution',
      icon: Gavel,
      content: (
        <div className="space-y-4 text-slate-600">
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Governing Law</h4>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to conflict of law principles.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Dispute Resolution</h4>
            <p>Any disputes arising from these Terms or the Service shall be resolved through:</p>
            <ol className="list-decimal list-inside space-y-2 ml-2 mt-2">
              <li><strong>Negotiation:</strong> Parties agree to attempt to resolve disputes through good faith negotiation</li>
              <li><strong>Mediation:</strong> If negotiation fails, disputes shall be referred to mediation under the rules of the Lagos Multi-Door Courthouse or similar institution</li>
              <li><strong>Arbitration:</strong> If mediation fails, disputes shall be resolved through binding arbitration under Nigerian Arbitration and Conciliation Act</li>
              <li><strong>Courts:</strong> Subject to the above, parties submit to the exclusive jurisdiction of Nigerian courts</li>
            </ol>
          </div>
          <div className="bg-brand-orange/10 border-l-4 border-brand-orange p-4 rounded-r-lg mt-4">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Class Action Waiver:</span> You agree to resolve disputes individually and waive the right to participate in class action lawsuits.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'changes',
      title: 'Changes to Terms',
      icon: FileText,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            We reserve the right to modify these Terms at any time. Material changes will be communicated through:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Email notification to registered users</li>
            <li>Prominent notice on our platform</li>
            <li>Updated "Last Updated" date on this page</li>
          </ul>
          <p className="mt-4">
            Continued use of the Service after changes constitutes acceptance of the modified Terms. If you do not agree, you must stop using the Service.
          </p>
        </div>
      )
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: Mail,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            For questions about these Terms, please contact us:
          </p>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
              <a href="mailto:legal@lyfestylz.com" className="text-brand-orange hover:underline">
                legal@lyfestylz.com
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
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-orange to-[#e55a00] flex items-center justify-center"
              >
                <Scale className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-6">
              The rules and guidelines that govern your use of Lyfestylz. Please read carefully.
            </p>
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
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-orange to-[#e55a00] flex items-center justify-center shrink-0">
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
            className="mt-12 bg-gradient-to-br from-brand-orange/10 to-orange-50 rounded-2xl p-8 border border-brand-orange/20"
          >
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-brand-orange shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Your Agreement with Us
                </h3>
                <p className="text-slate-600 mb-4">
                  By using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. We're committed to creating a trusted platform where everyone can thrive.
                </p>
                <p className="text-sm text-slate-500">
                  If you have questions or concerns, we're here to help. Reach out anytime.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
