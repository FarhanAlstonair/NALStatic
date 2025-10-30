import { useState } from 'react'
import { Upload, FileCheck, AlertCircle, CheckCircle, Clock } from 'lucide-react'

const DocumentVerification = () => {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [verificationResults, setVerificationResults] = useState([])
  const [isVerifying, setIsVerifying] = useState(false)

  const documentTypes = [
    'Property Title Deed',
    'Sale Agreement',
    'Property Tax Receipt',
    'Encumbrance Certificate',
    'Building Approval',
    'Occupancy Certificate',
    'NOC from Society',
    'Power of Attorney'
  ]

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploaded'
    }))
    setUploadedFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
    setVerificationResults(prev => prev.filter(result => result.fileId !== fileId))
  }

  const verifyDocuments = async () => {
    setIsVerifying(true)
    
    // Simulate verification process
    const results = uploadedFiles.map(file => ({
      fileId: file.id,
      fileName: file.name,
      status: Math.random() > 0.3 ? 'verified' : 'issues_found',
      score: Math.floor(Math.random() * 40) + 60,
      issues: Math.random() > 0.3 ? [] : [
        'Document quality needs improvement',
        'Some text is unclear',
        'Signature verification required'
      ],
      verifiedAt: new Date().toISOString()
    }))

    // Simulate API delay
    setTimeout(() => {
      setVerificationResults(results)
      setIsVerifying(false)
    }, 3000)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=600&fit=crop&crop=center" 
            alt="Document verification and legal papers" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/90 to-emerald-600/80"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Document Verification
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Upload your property documents for instant AI-powered verification and authenticity check
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Area */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Upload Documents
            </h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Drop files here or click to upload
              </h3>
              <p className="text-gray-600 mb-4">
                Supports PDF, JPG, PNG files up to 10MB each
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="btn-primary cursor-pointer inline-block"
              >
                Choose Files
              </label>
            </div>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Uploaded Files ({uploadedFiles.length})
                </h2>
                {uploadedFiles.length > 0 && !isVerifying && (
                  <button
                    onClick={verifyDocuments}
                    className="btn-primary"
                  >
                    <FileCheck className="w-4 h-4 mr-2" />
                    Verify All Documents
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {uploadedFiles.map(file => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileCheck className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1 text-gray-400 hover:text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification Results */}
          {(isVerifying || verificationResults.length > 0) && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Verification Results
              </h2>

              {isVerifying ? (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-primary-500 mx-auto mb-4 animate-spin" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Verifying Documents...
                  </h3>
                  <p className="text-gray-600">
                    This may take a few moments. Please wait.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {verificationResults.map(result => (
                    <div key={result.fileId} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {result.status === 'verified' ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : (
                            <AlertCircle className="w-6 h-6 text-yellow-500" />
                          )}
                          <div>
                            <h3 className="font-medium text-gray-900">{result.fileName}</h3>
                            <p className="text-sm text-gray-600">
                              Verification Score: {result.score}/100
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          result.status === 'verified' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {result.status === 'verified' ? 'Verified' : 'Issues Found'}
                        </span>
                      </div>

                      {result.issues.length > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                          <h4 className="text-sm font-medium text-yellow-800 mb-2">
                            Issues Found:
                          </h4>
                          <ul className="text-sm text-yellow-700 space-y-1">
                            {result.issues.map((issue, index) => (
                              <li key={index}>• {issue}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Document Types */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Supported Documents
            </h3>
            <ul className="space-y-2">
              {documentTypes.map((type, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{type}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Verification Process */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              How It Works
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Upload</h4>
                  <p className="text-sm text-gray-600">Upload your property documents</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Analyze</h4>
                  <p className="text-sm text-gray-600">AI analyzes document authenticity</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Results</h4>
                  <p className="text-sm text-gray-600">Get instant verification results</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl shadow-lg p-6 border border-blue-200">
            <div className="flex items-start space-x-3">
              <FileCheck className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium text-blue-900 mb-2">
                  Secure & Confidential
                </h3>
                <p className="text-sm text-blue-800">
                  Your documents are processed securely and deleted after verification. 
                  We never store your sensitive information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default DocumentVerification