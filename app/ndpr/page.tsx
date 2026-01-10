'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Shield, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp,
  FileCheck,
  Lock,
  Eye,
  Database,
  UserCheck,
  AlertTriangle,
  Mail,
  Scale
} from 'lucide-react'

interface Section {
  id: string
  title: string
  icon: any
  content: JSX.Element
}

export default function NDPRCompliancePage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['introduction']))
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
      title: 'NDPR Compliance Overview',
      icon: Shield,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            <span className="font-semibold text-slate-900">Lyfestylz</span> is fully committed to compliance with the <span className="font-semibold text-brand-orange">Nigeria Data Protection Regulation (NDPR) 2019</span>. This page outlines our compliance framework, data protection practices, and your rights as a data subject under Nigerian law.
          </p>
          <div className="bg-brand-orange/10 border-l-4 border-brand-orange p-4 rounded-r-lg mt-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-brand-orange" />
              <span className="font-semibold text-slate-900">NDPR Compliant</span>
            </div>
            <p className="text-sm text-slate-700">
              We have implemented comprehensive data protection measures in accordance with NDPR requirements and are registered with the Nigeria Data Protection Bureau (NDPB).
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'what-is-ndpr',
      title: 'What is NDPR?',
      icon: FileCheck,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            The Nigeria Data Protection Regulation (NDPR) is a legal framework that governs the collection, processing, storage, and protection of personal data in Nigeria. It was issued by the National Information Technology Development Agency (NITDA) in 2019.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
            <h4 className="font-semibold text-slate-900 mb-3">Key Principles of NDPR:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm ml-2">
              <li><strong>Lawfulness, Fairness, and Transparency:</strong> We process data lawfully, fairly, and transparently</li>
              <li><strong>Purpose Limitation:</strong> We collect data only for specified, explicit, and legitimate purposes</li>
              <li><strong>Data Minimization:</strong> We collect only data that is necessary for our purposes</li>
              <li><strong>Accuracy:</strong> We keep personal data accurate and up-to-date</li>
              <li><strong>Storage Limitation:</strong> We retain data only as long as necessary</li>
              <li><strong>Integrity and Confidentiality:</strong> We implement appropriate security measures</li>
              <li><strong>Accountability:</strong> We are responsible for demonstrating compliance</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'our-compliance',
      title: 'Our Compliance Framework',
      icon: CheckCircle,
      content: (
        <div className="space-y-4 text-slate-600">
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Organizational Measures</h4>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Appointed a designated Data Protection Officer (DPO)</li>
              <li>Implemented comprehensive data protection policies and procedures</li>
              <li>Conducted Data Protection Impact Assessments (DPIA)</li>
              <li>Regular staff training on data protection and privacy</li>
              <li>Documented data processing activities and compliance records</li>
            </ul>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold text-slate-900 mb-3">Technical Measures</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <Lock className="w-6 h-6 text-brand-orange mb-2" />
                <h5 className="font-semibold text-slate-900 mb-1">Encryption</h5>
                <p className="text-sm">SSL/TLS encryption for data in transit, encryption at rest for sensitive data</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <Shield className="w-6 h-6 text-brand-orange mb-2" />
                <h5 className="font-semibold text-slate-900 mb-1">Access Controls</h5>
                <p className="text-sm">Role-based access, multi-factor authentication, regular access reviews</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <Database className="w-6 h-6 text-brand-orange mb-2" />
                <h5 className="font-semibold text-slate-900 mb-1">Secure Storage</h5>
                <p className="text-sm">Data stored on secure servers with regular backups and disaster recovery</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <Eye className="w-6 h-6 text-brand-orange mb-2" />
                <h5 className="font-semibold text-slate-900 mb-1">Monitoring</h5>
                <p className="text-sm">Continuous security monitoring, intrusion detection, and incident response</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'legal-basis',
      title: 'Legal Basis for Processing',
      icon: Scale,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            Under NDPR, we process your personal data based on the following legal bases:
          </p>
          <div className="space-y-3 mt-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">1. Consent</h4>
              <p className="text-sm">You have given clear consent for us to process your data for specific purposes (e.g., marketing communications).</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">2. Contract Performance</h4>
              <p className="text-sm">Processing is necessary for the performance of a contract or to take steps at your request before entering into a contract (e.g., providing our services).</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">3. Legal Obligation</h4>
              <p className="text-sm">Processing is necessary for compliance with a legal obligation (e.g., tax records, regulatory requirements).</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">4. Legitimate Interests</h4>
              <p className="text-sm">Processing is necessary for our legitimate interests (e.g., fraud prevention, service improvement) where these do not override your rights.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'data-subject-rights',
      title: 'Your Rights Under NDPR',
      icon: UserCheck,
      content: (
        <div className="space-y-4 text-slate-600">
          <p className="font-semibold text-slate-900 mb-4">As a data subject, you have the following rights:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Right of Access', desc: 'Obtain confirmation and copies of your personal data' },
              { title: 'Right to Rectification', desc: 'Request correction of inaccurate or incomplete data' },
              { title: 'Right to Erasure', desc: 'Request deletion of your data (right to be forgotten)' },
              { title: 'Right to Restrict Processing', desc: 'Request limitation of how we process your data' },
              { title: 'Right to Data Portability', desc: 'Receive your data in a structured, machine-readable format' },
              { title: 'Right to Object', desc: 'Object to processing for direct marketing or legitimate interests' },
              { title: 'Right to Withdraw Consent', desc: 'Withdraw consent at any time where processing is based on consent' },
              { title: 'Right to Lodge Complaints', desc: 'File a complaint with the NDPB if you believe your rights have been violated' },
            ].map((right, index) => (
              <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 text-sm">{right.title}</h4>
                    <p className="text-sm text-slate-600">{right.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
              <div className="bg-brand-orange/10 border-l-4 border-brand-orange p-4 rounded-r-lg mt-4">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">To exercise these rights,</span> contact us at{' '}
              <a href="mailto:privacy@lyfestylz.com" className="text-brand-orange hover:underline font-semibold">
                privacy@lyfestylz.com
              </a>
              {' '}or our Data Protection Officer at{' '}
              <a href="mailto:dpo@lyfestylz.com" className="text-brand-orange hover:underline font-semibold">
                dpo@lyfestylz.com
              </a>
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'data-protection-officer',
      title: 'Data Protection Officer',
      icon: Shield,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            We have appointed a Data Protection Officer (DPO) who is responsible for overseeing our data protection strategy and implementation to ensure compliance with NDPR.
          </p>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mt-4">
            <h4 className="font-semibold text-slate-900 mb-4">Contact Our DPO</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-slate-900 mb-1">Email</h5>
                <a href="mailto:dpo@lyfestylz.com" className="text-brand-orange hover:underline">
                  dpo@lyfestylz.com
                </a>
              </div>
              <div>
                <h5 className="font-semibold text-slate-900 mb-1">Phone</h5>
                <a href="tel:+2348000000000" className="text-brand-orange hover:underline">
                  +234 800 000 0000
                </a>
              </div>
              <div>
                <h5 className="font-semibold text-slate-900 mb-1">Address</h5>
                <p className="text-sm">
                  Data Protection Officer<br />
                  Lyfestylz<br />
                  Nigeria
                </p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-4">
            <p className="text-sm text-slate-700">
              The DPO is available to address any questions or concerns regarding data protection, privacy practices, or your rights under NDPR.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'data-security',
      title: 'Data Security Measures',
      icon: Lock,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            We implement appropriate technical and organizational measures to protect personal data against unauthorized access, alteration, disclosure, or destruction, in compliance with NDPR requirements.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Technical Safeguards</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                <li>End-to-end encryption for sensitive data</li>
                <li>Secure socket layer (SSL) certificates</li>
                <li>Firewall and intrusion detection systems</li>
                <li>Regular security audits and penetration testing</li>
                <li>Automated backup and disaster recovery</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Organizational Safeguards</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                <li>Access controls and role-based permissions</li>
                <li>Staff training on data protection</li>
                <li>Confidentiality agreements with employees</li>
                <li>Incident response procedures</li>
                <li>Regular compliance assessments</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'data-breach',
      title: 'Data Breach Notification',
      icon: AlertTriangle,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            In the unlikely event of a data breach that may affect your rights and freedoms, we are committed to:
          </p>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mt-4">
            <h4 className="font-semibold text-red-900 mb-3">Breach Response Procedures</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm ml-2">
              <li><strong>Immediate Assessment:</strong> Assess the nature and scope of the breach within 72 hours</li>
              <li><strong>NDPB Notification:</strong> Report to the Nigeria Data Protection Bureau within 72 hours of becoming aware</li>
              <li><strong>Data Subject Notification:</strong> Notify affected individuals without undue delay if the breach poses a high risk</li>
              <li><strong>Remediation:</strong> Take immediate steps to contain and remediate the breach</li>
              <li><strong>Documentation:</strong> Maintain records of all data breaches for audit purposes</li>
            </ol>
          </div>
          <p className="text-sm mt-4">
            If you become aware of a potential data breach, please contact us immediately at{' '}
            <a href="mailto:security@lyfestylz.com" className="text-brand-orange hover:underline font-semibold">
              security@lyfestylz.com
            </a>
          </p>
        </div>
      )
    },
    {
      id: 'third-party',
      title: 'Third-Party Processors',
      icon: Database,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            We may engage third-party service providers (data processors) to assist with our operations. All processors are contractually bound to comply with NDPR requirements.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
            <h4 className="font-semibold text-slate-900 mb-3">Processor Categories:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm ml-2">
              <li><strong>Cloud Services:</strong> Secure hosting and infrastructure</li>
              <li><strong>Payment Processors:</strong> Secure payment handling (Paystack, Flutterwave)</li>
              <li><strong>Analytics Services:</strong> Usage analytics and performance monitoring</li>
              <li><strong>Email Services:</strong> Communication and notification services</li>
              <li><strong>Customer Support:</strong> Help desk and support services</li>
            </ul>
          </div>
          <p className="text-sm mt-4">
            All data processing agreements include provisions ensuring NDPR compliance, data security, and confidentiality requirements.
          </p>
        </div>
      )
    },
    {
      id: 'international-transfers',
      title: 'International Data Transfers',
      icon: Database,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            Your personal data is primarily stored and processed within Nigeria. Where we transfer data outside Nigeria, we ensure adequate safeguards are in place in accordance with NDPR.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
            <h4 className="font-semibold text-slate-900 mb-3">Safeguards for International Transfers:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm ml-2">
              <li>Standard contractual clauses approved by NDPB</li>
              <li>Processor agreements with NDPR-compliant provisions</li>
              <li>Certification schemes and codes of conduct</li>
              <li>Adequacy decisions by NDPB where applicable</li>
            </ul>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-4">
            <p className="text-sm text-slate-700">
              By using our Service, you consent to such transfers where necessary for service delivery. We will always prioritize keeping your data within Nigeria when possible.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'compliance-updates',
      title: 'Ongoing Compliance',
      icon: CheckCircle,
      content: (
        <div className="space-y-4 text-slate-600">
          <p>
            NDPR compliance is an ongoing commitment. We continuously:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-brand-orange/10 border-l-4 border-brand-orange p-4 rounded-r-lg">
              <h4 className="font-semibold text-slate-900 mb-2">Regular Activities</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-2 text-slate-700">
                <li>Conduct Data Protection Impact Assessments</li>
                <li>Review and update data protection policies</li>
                <li>Train staff on data protection best practices</li>
                <li>Monitor compliance with NDPR requirements</li>
                <li>Update security measures as needed</li>
              </ul>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Audit & Review</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-2 text-blue-800">
                <li>Annual compliance audits</li>
                <li>Regular security assessments</li>
                <li>Third-party compliance reviews</li>
                <li>NDPB registration and renewal</li>
                <li>Documentation of compliance efforts</li>
              </ul>
            </div>
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
            For questions about our NDPR compliance or data protection practices:
          </p>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Data Protection Officer</h4>
              <a href="mailto:dpo@lyfestylz.com" className="text-brand-orange hover:underline">
                dpo@lyfestylz.com
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Privacy Team</h4>
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
            <div className="pt-4 border-t border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Nigeria Data Protection Bureau</h4>
              <p className="text-sm mb-2">
                If you believe your data protection rights have been violated, you may file a complaint with the NDPB.
              </p>
              <p className="text-sm">
                <a href="https://ndpb.gov.ng" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">
                  www.ndpb.gov.ng
                </a>
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
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-orange to-[#e55a00] flex items-center justify-center"
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              NDPR Compliance
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-6">
              Our commitment to protecting your data in accordance with Nigeria Data Protection Regulation
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                <CheckCircle className="w-4 h-4 text-brand-orange" />
                <span className="text-slate-700 font-medium">NDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                <Shield className="w-4 h-4 text-brand-orange" />
                <span className="text-slate-700 font-medium">NDPB Registered</span>
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
              <CheckCircle className="w-8 h-8 text-brand-orange shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Committed to Your Privacy
                </h3>
                <p className="text-slate-600 mb-4">
                  We are committed to maintaining the highest standards of data protection and privacy. Our compliance with NDPR is an ongoing process, and we continuously work to improve our practices.
                </p>
                <p className="text-sm text-slate-500">
                  This compliance statement is reviewed and updated regularly to reflect changes in our practices and NDPR requirements.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
