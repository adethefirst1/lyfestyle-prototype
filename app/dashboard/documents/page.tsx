'use client'

import { useState } from 'react'
import { Upload, FileText, CheckCircle, X, Download, AlertCircle, Image as ImageIcon } from 'lucide-react'

interface Document {
  id: string
  name: string
  type: 'business-license' | 'tax-id' | 'identity' | 'other'
  uploadedAt: string
  status: 'verified' | 'pending' | 'rejected'
  fileSize: string
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Business License.pdf',
      type: 'business-license',
      uploadedAt: '2024-01-15',
      status: 'verified',
      fileSize: '2.4 MB',
    },
    {
      id: '2',
      name: 'Tax Identification Number.pdf',
      type: 'tax-id',
      uploadedAt: '2024-01-15',
      status: 'verified',
      fileSize: '1.8 MB',
    },
    {
      id: '3',
      name: 'Identity Card.jpg',
      type: 'identity',
      uploadedAt: '2024-01-20',
      status: 'pending',
      fileSize: '456 KB',
    },
  ])

  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [selectedDocumentType, setSelectedDocumentType] = useState<Document['type']>('business-license')

  const documentTypes = {
    'business-license': {
      label: 'Business License',
      description: 'Official business registration document',
      required: true,
    },
    'tax-id': {
      label: 'Tax Identification Number',
      description: 'TIN certificate or tax registration document',
      required: true,
    },
    'identity': {
      label: 'Identity Document',
      description: 'Government-issued ID (Driver\'s License, National ID, etc.)',
      required: true,
    },
    'other': {
      label: 'Other Document',
      description: 'Additional supporting documents',
      required: false,
    },
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      
      // Validate file size (10MB max for documents)
      if (file.size > 10 * 1024 * 1024) {
        setUploadStatus('error')
        setTimeout(() => setUploadStatus('idle'), 3000)
        return
      }

      setUploadStatus('uploading')
      
      // Simulate upload
      setTimeout(() => {
        const newDocument: Document = {
          id: Date.now().toString(),
          name: file.name,
          type: selectedDocumentType,
          uploadedAt: new Date().toISOString().split('T')[0],
          status: 'pending',
          fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        }
        setDocuments(prev => [...prev, newDocument])
        setUploadStatus('success')
        setTimeout(() => setUploadStatus('idle'), 2000)
      }, 1500)
    }
  }

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id))
  }

  const getStatusBadge = (status: Document['status']) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
            <CheckCircle className="w-3.5 h-3.5" />
            Verified
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
            <AlertCircle className="w-3.5 h-3.5" />
            Pending
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
            <X className="w-3.5 h-3.5" />
            Rejected
          </span>
        )
    }
  }

  const requiredDocuments = Object.entries(documentTypes).filter(([_, info]) => info.required)
  const uploadedRequiredDocs = requiredDocuments.filter(([type]) =>
    documents.some(doc => doc.type === type && doc.status === 'verified')
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Documents
          </h1>
          <p className="text-slate-600">
            Upload and manage your business verification documents
          </p>
        </div>

        {/* Verification Progress */}
        <div className="mb-8 bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Verification Progress</h2>
            <span className="text-sm font-semibold text-slate-700">
              {uploadedRequiredDocs.length} of {requiredDocuments.length} required documents verified
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className="bg-[#FF6700] h-3 rounded-full transition-all"
              style={{ width: `${(uploadedRequiredDocs.length / requiredDocuments.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-slate-600 mt-3">
            {uploadedRequiredDocs.length === requiredDocuments.length
              ? 'All required documents have been verified. Your business is fully verified!'
              : `Upload and verify ${requiredDocuments.length - uploadedRequiredDocs.length} more document${requiredDocuments.length - uploadedRequiredDocs.length === 1 ? '' : 's'} to complete verification.`}
          </p>
        </div>

        {/* Upload Status Messages */}
        {uploadStatus === 'uploading' && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
            <p className="text-sm font-medium text-blue-900">Uploading document...</p>
          </div>
        )}

        {uploadStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-sm font-medium text-green-900">Document uploaded successfully! It will be reviewed shortly.</p>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm font-medium text-red-900">Upload failed. Please ensure the file is under 10MB.</p>
          </div>
        )}

        {/* Upload Section */}
        <div className="mb-8 bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Upload Document</h2>
          
          {/* Document Type Selection */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Document Type
            </label>
            <select
              value={selectedDocumentType}
              onChange={(e) => setSelectedDocumentType(e.target.value as Document['type'])}
              className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#FF6700] focus:ring-2 focus:ring-[#FF6700]/20 transition-colors"
            >
              {Object.entries(documentTypes).map(([value, info]) => (
                <option key={value} value={value}>
                  {info.label} {info.required && '(Required)'}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-2">
              {documentTypes[selectedDocumentType].description}
            </p>
          </div>

          {/* File Upload */}
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-[#FF6700] transition-colors bg-slate-50">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
              id="document-upload"
              disabled={uploadStatus === 'uploading'}
            />
            <label htmlFor="document-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-700 font-medium mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-slate-500">
                PDF, JPG, or PNG (Max file size: 10MB)
              </p>
            </label>
          </div>
        </div>

        {/* Documents List */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Uploaded Documents</h2>
          
          {documents.length > 0 ? (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="p-3 bg-slate-100 rounded-lg shrink-0">
                        <FileText className="w-6 h-6 text-slate-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 truncate">{doc.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-sm text-slate-500">
                            {documentTypes[doc.type].label}
                          </p>
                          <span className="text-slate-400">•</span>
                          <p className="text-sm text-slate-500">{doc.fileSize}</p>
                          <span className="text-slate-400">•</span>
                          <p className="text-sm text-slate-500">
                            Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {getStatusBadge(doc.status)}
                        <button
                          onClick={() => removeDocument(doc.id)}
                          className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                          aria-label="Remove document"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-lg border border-slate-200">
              <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No documents uploaded</h3>
              <p className="text-slate-600">Upload your verification documents to get started</p>
            </div>
          )}
        </div>

        {/* Requirements Section */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Document Requirements</h2>
          <ul className="space-y-3">
            {Object.entries(documentTypes).map(([type, info]) => {
              const isUploaded = documents.some(doc => doc.type === type && doc.status === 'verified')
              return (
                <li key={type} className="flex items-start gap-3">
                  {isUploaded ? (
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className={`text-sm font-medium ${isUploaded ? 'text-green-700' : 'text-slate-900'}`}>
                      {info.label} {info.required && <span className="text-red-600">*</span>}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">{info.description}</p>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-600">
              <span className="text-red-600">*</span> Required documents must be verified for business verification
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
