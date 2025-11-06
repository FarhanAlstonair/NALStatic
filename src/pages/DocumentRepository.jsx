import { useState, useEffect } from 'react'
import { Upload, FileText, Download, Eye, Trash2, Shield, Lock, CheckCircle, AlertCircle, Plus, Search, Filter } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const DocumentRepository = () => {
  const { user } = useAuth()
  const [documents, setDocuments] = useState([])
  const [showUpload, setShowUpload] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [uploadForm, setUploadForm] = useState({
    name: '',
    type: 'property_deed',
    category: 'legal',
    description: '',
    file: null
  })

  const documentTypes = [
    { value: 'property_deed', label: 'Property Deed', category: 'legal' },
    { value: 'sale_agreement', label: 'Sale Agreement', category: 'legal' },
    { value: 'title_certificate', label: 'Title Certificate', category: 'legal' },
    { value: 'tax_receipt', label: 'Tax Receipt', category: 'financial' },
    { value: 'noc', label: 'NOC Certificate', category: 'compliance' },
    { value: 'building_plan', label: 'Building Plan', category: 'technical' },
    { value: 'occupancy_certificate', label: 'Occupancy Certificate', category: 'compliance' },
    { value: 'identity_proof', label: 'Identity Proof', category: 'personal' },
    { value: 'bank_statement', label: 'Bank Statement', category: 'financial' },
    { value: 'loan_documents', label: 'Loan Documents', category: 'financial' }
  ]

  useEffect(() => {
    // Load user's documents from localStorage
    const userDocs = JSON.parse(localStorage.getItem(`documents_${user?.id}`) || '[]')
    if (userDocs.length === 0) {
      // Add mock documents
      const mockDocs = [
        {
          id: 1,
          name: 'Property Deed - Koramangala Apartment',
          type: 'property_deed',
          category: 'legal',
          description: 'Original property deed for 3BHK apartment',
          uploadDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          size: '2.4 MB',
          status: 'verified',
          verificationDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
          securityLevel: 'high',
          accessCount: 5
        },
        {
          id: 2,
          name: 'Sale Agreement - HSR Layout Villa',
          type: 'sale_agreement',
          category: 'legal',
          description: 'Registered sale agreement document',
          uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          size: '1.8 MB',
          status: 'pending',
          securityLevel: 'high',
          accessCount: 2
        },
        {
          id: 3,
          name: 'Tax Receipt 2024',
          type: 'tax_receipt',
          category: 'financial',
          description: 'Property tax payment receipt',
          uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          size: '0.5 MB',
          status: 'verified',
          verificationDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          securityLevel: 'medium',
          accessCount: 1
        }
      ]
      setDocuments(mockDocs)
      localStorage.setItem(`documents_${user?.id}`, JSON.stringify(mockDocs))
    } else {
      setDocuments(userDocs)
    }
  }, [user])

  const handleUpload = (e) => {
    e.preventDefault()
    const newDoc = {
      id: Date.now(),
      ...uploadForm,
      uploadDate: new Date().toISOString(),
      size: uploadForm.file ? `${(uploadForm.file.size / (1024 * 1024)).toFixed(1)} MB` : '0 MB',
      status: 'pending',
      securityLevel: uploadForm.category === 'legal' ? 'high' : uploadForm.category === 'financial' ? 'medium' : 'low',
      accessCount: 0
    }
    
    const updatedDocs = [...documents, newDoc]
    setDocuments(updatedDocs)
    localStorage.setItem(`documents_${user?.id}`, JSON.stringify(updatedDocs))
    
    setShowUpload(false)
    setUploadForm({
      name: '',
      type: 'property_deed',
      category: 'legal',
      description: '',
      file: null
    })
  }

  const handleDelete = (docId) => {
    const updatedDocs = documents.filter(doc => doc.id !== docId)
    setDocuments(updatedDocs)
    localStorage.setItem(`documents_${user?.id}`, JSON.stringify(updatedDocs))
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'verified': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSecurityColor = (level) => {
    switch(level) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'legal': return <Shield className="w-4 h-4" />
      case 'financial': return <FileText className="w-4 h-4" />
      case 'compliance': return <CheckCircle className="w-4 h-4" />
      case 'technical': return <AlertCircle className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || doc.category === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Document Repository</h1>
              <p className="text-gray-600">Securely store and manage your property documents</p>
            </div>
            <button
              onClick={() => setShowUpload(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-sm"
            >
              <Upload className="w-5 h-5" />
              Upload Document
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900">Secure Document Storage</h3>
              <p className="text-sm text-blue-700 mt-1">
                All documents are encrypted and stored securely. Access is logged and monitored for your security.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-gray-900">{documents.filter(d => d.status === 'verified').length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{documents.filter(d => d.status === 'pending').length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Storage Used</p>
                <p className="text-2xl font-bold text-gray-900">
                  {documents.reduce((sum, doc) => sum + parseFloat(doc.size.replace(' MB', '')), 0).toFixed(1)} MB
                </p>
              </div>
              <Lock className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="legal">Legal Documents</option>
                <option value="financial">Financial Documents</option>
                <option value="compliance">Compliance Documents</option>
                <option value="technical">Technical Documents</option>
                <option value="personal">Personal Documents</option>
              </select>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Documents</h2>
          </div>
          
          {filteredDocuments.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterType !== 'all' ? 'Try adjusting your search or filter' : 'Upload your first document to get started'}
              </p>
              {!searchTerm && filterType === 'all' && (
                <button
                  onClick={() => setShowUpload(true)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload First Document
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Security</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                          <div className="text-sm text-gray-500">{doc.description}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(doc.category)}
                          <span className="text-sm text-gray-900 capitalize">{doc.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{doc.size}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                        {doc.verificationDate && (
                          <div className="text-xs text-gray-400 mt-1">
                            Verified: {new Date(doc.verificationDate).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Lock className={`w-4 h-4 ${getSecurityColor(doc.securityLevel)}`} />
                          <span className={`text-sm capitalize ${getSecurityColor(doc.securityLevel)}`}>
                            {doc.securityLevel}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Accessed: {doc.accessCount} times
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-700">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-700">
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(doc.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Upload Document</h3>
              </div>
              
              <form onSubmit={handleUpload} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Document Name</label>
                  <input
                    type="text"
                    value={uploadForm.name}
                    onChange={(e) => setUploadForm({...uploadForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter document name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                    <select
                      value={uploadForm.type}
                      onChange={(e) => {
                        const selectedType = documentTypes.find(t => t.value === e.target.value)
                        setUploadForm({
                          ...uploadForm, 
                          type: e.target.value,
                          category: selectedType?.category || 'legal'
                        })
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {documentTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input
                      type="text"
                      value={uploadForm.category}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 capitalize"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Brief description of the document"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Drag and drop your file here, or click to browse</p>
                    <input
                      type="file"
                      onChange={(e) => setUploadForm({...uploadForm, file: e.target.files[0]})}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor="file-upload"
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg cursor-pointer inline-block"
                    >
                      Choose File
                    </label>
                    {uploadForm.file && (
                      <p className="text-sm text-gray-600 mt-2">Selected: {uploadForm.file.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowUpload(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                  >
                    Upload Document
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentRepository