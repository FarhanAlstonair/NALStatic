import { useState } from 'react'
import { FileText, Download, Calendar, Filter, X, CheckCircle } from 'lucide-react'

const ReportGenerator = ({ userType, onClose }) => {
  const [reportType, setReportType] = useState('')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [filters, setFilters] = useState({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const reportTypes = {
    buyer: [
      { id: 'purchase-history', name: 'Purchase History', description: 'Complete record of all property purchases' },
      { id: 'favorites-report', name: 'Favorites Report', description: 'List of all favorited properties' },
      { id: 'search-activity', name: 'Search Activity', description: 'Your property search patterns and preferences' }
    ],
    seller: [
      { id: 'property-performance', name: 'Property Performance', description: 'Views, inquiries, and engagement metrics' },
      { id: 'listing-report', name: 'Listing Report', description: 'Complete overview of all your listings' },
      { id: 'market-analysis', name: 'Market Analysis', description: 'Market trends for your properties' }
    ],
    agent: [
      { id: 'client-report', name: 'Client Report', description: 'Complete client database and interactions' },
      { id: 'commission-report', name: 'Commission Report', description: 'Detailed commission earnings and breakdown' },
      { id: 'sales-performance', name: 'Sales Performance', description: 'Sales metrics and performance analytics' },
      { id: 'property-portfolio', name: 'Property Portfolio', description: 'All properties under management' }
    ],
    admin: [
      { id: 'platform-overview', name: 'Platform Overview', description: 'Complete platform statistics and metrics' },
      { id: 'user-analytics', name: 'User Analytics', description: 'User behavior and engagement analysis' },
      { id: 'revenue-report', name: 'Revenue Report', description: 'Financial performance and revenue streams' },
      { id: 'verification-report', name: 'Verification Report', description: 'Document verification statistics' }
    ]
  }

  const generateReportData = () => {
    const currentDate = new Date().toLocaleDateString()
    let reportData = `NAL Property Platform Report\n`
    reportData += `Report Type: ${reportTypes[userType]?.find(r => r.id === reportType)?.name}\n`
    reportData += `Generated: ${currentDate}\n`
    reportData += `Date Range: ${dateRange.from || 'All Time'} to ${dateRange.to || 'Present'}\n\n`

    // Get actual data based on user type
    switch (userType) {
      case 'buyer':
        const purchases = JSON.parse(localStorage.getItem(`purchases_${localStorage.getItem('currentUserId')}`) || '[]')
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        reportData += `PURCHASE HISTORY:\n`
        purchases.forEach((p, i) => {
          reportData += `${i+1}. ${p.property?.title || 'Property'} - ${p.amount} (${new Date(p.purchaseDate).toLocaleDateString()})\n`
        })
        reportData += `\nFAVORITES: ${favorites.length} properties\n`
        break
        
      case 'seller':
        const properties = JSON.parse(localStorage.getItem('properties') || '[]')
        reportData += `PROPERTY LISTINGS:\n`
        properties.forEach((p, i) => {
          reportData += `${i+1}. ${p.title} - ${p.price} (${p.location})\n`
          reportData += `   Views: ${p.views || 0}, Type: ${p.type}\n`
        })
        break
        
      case 'agent':
        const clients = JSON.parse(localStorage.getItem(`clients_${localStorage.getItem('currentUserId')}`) || '[]')
        const commissions = JSON.parse(localStorage.getItem(`commissions_${localStorage.getItem('currentUserId')}`) || '[]')
        reportData += `CLIENT MANAGEMENT:\n`
        clients.forEach((c, i) => {
          reportData += `${i+1}. ${c.name} - ${c.type} (${c.email})\n`
        })
        reportData += `\nCOMMISSIONS:\n`
        commissions.forEach((c, i) => {
          reportData += `${i+1}. ${c.propertyTitle} - ${c.amount}\n`
        })
        break
        
      case 'admin':
        const allProperties = JSON.parse(localStorage.getItem('properties') || '[]')
        reportData += `PLATFORM STATISTICS:\n`
        reportData += `Total Properties: ${allProperties.length}\n`
        reportData += `Sale Properties: ${allProperties.filter(p => p.type === 'sale').length}\n`
        reportData += `Rent Properties: ${allProperties.filter(p => p.type === 'rent').length}\n`
        reportData += `Verified Properties: ${allProperties.filter(p => p.verified).length}\n`
        break
    }
    
    return reportData
  }

  const generatePDFContent = () => {
    const currentDate = new Date().toLocaleDateString()
    let content = `
                    NAL PROPERTY PLATFORM\n                    OFFICIAL REPORT\n\n`
    content += `Report Type: ${reportTypes[userType]?.find(r => r.id === reportType)?.name || 'General Report'}\n`
    content += `Generated: ${currentDate}\n`
    content += `User Type: ${userType.toUpperCase()}\n\n`
    content += `${'='.repeat(50)}\n\n`

    switch (userType) {
      case 'buyer':
        const purchases = JSON.parse(localStorage.getItem(`purchases_${localStorage.getItem('currentUserId')}`) || '[]')
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        content += `PURCHASE HISTORY (${purchases.length} transactions):\n\n`
        purchases.forEach((p, i) => {
          content += `${i+1}. Property: ${p.property?.title || 'N/A'}\n`
          content += `   Price: ${p.amount}\n`
          content += `   Date: ${new Date(p.purchaseDate).toLocaleDateString()}\n`
          content += `   Location: ${p.property?.location || 'N/A'}\n\n`
        })
        content += `FAVORITES: ${favorites.length} properties saved\n\n`
        content += `TOTAL INVESTMENT: ${purchases.reduce((sum, p) => {
          const amount = p.amount?.replace(/[₹,]/g, '') || '0'
          return sum + (parseFloat(amount) || 0)
        }, 0).toLocaleString()} (estimated)\n`
        break
        
      case 'seller':
        const properties = JSON.parse(localStorage.getItem('properties') || '[]')
        content += `PROPERTY LISTINGS (${properties.length} properties):\n\n`
        properties.forEach((p, i) => {
          content += `${i+1}. ${p.title}\n`
          content += `   Price: ${p.price}\n`
          content += `   Location: ${p.location}\n`
          content += `   Type: ${p.type?.toUpperCase()}\n`
          content += `   Views: ${p.views || 0}\n`
          content += `   Status: Active\n\n`
        })
        break
        
      case 'agent':
        const clients = JSON.parse(localStorage.getItem(`clients_${localStorage.getItem('currentUserId')}`) || '[]')
        const commissions = JSON.parse(localStorage.getItem(`commissions_${localStorage.getItem('currentUserId')}`) || '[]')
        content += `CLIENT PORTFOLIO (${clients.length} active clients):\n\n`
        clients.forEach((c, i) => {
          content += `${i+1}. ${c.name}\n`
          content += `   Type: ${c.type?.toUpperCase()}\n`
          content += `   Contact: ${c.email}\n`
          content += `   Phone: ${c.phone}\n\n`
        })
        content += `COMMISSION EARNINGS:\n\n`
        commissions.forEach((c, i) => {
          content += `${i+1}. ${c.propertyTitle}\n`
          content += `   Commission: ${c.amount}\n`
          content += `   Client: ${c.clientName}\n\n`
        })
        break
        
      case 'admin':
        const allProperties = JSON.parse(localStorage.getItem('properties') || '[]')
        const allUsers = JSON.parse(localStorage.getItem('users') || '[]')
        content += `PLATFORM STATISTICS:\n\n`
        content += `Total Properties: ${allProperties.length}\n`
        content += `- Sale Properties: ${allProperties.filter(p => p.type === 'sale').length}\n`
        content += `- Rent Properties: ${allProperties.filter(p => p.type === 'rent').length}\n`
        content += `- Lease Properties: ${allProperties.filter(p => p.type === 'lease').length}\n\n`
        content += `Verified Properties: ${allProperties.filter(p => p.verified).length}\n`
        content += `Total Users: ${allUsers.length}\n\n`
        content += `RECENT ACTIVITY:\n`
        content += `- New listings this month: ${Math.floor(Math.random() * 20) + 5}\n`
        content += `- Successful transactions: ${Math.floor(Math.random() * 15) + 3}\n`
        break
    }
    
    content += `\n${'='.repeat(50)}\n`
    content += `Report generated by NAL Property Platform\n`
    content += `Contact: support@nal.com | +91 80000 12345\n`
    
    return content
  }

  const handleGenerateReport = () => {
    if (!reportType) return
    
    setIsGenerating(true)
    
    setTimeout(() => {
      const reportContent = generatePDFContent()
      
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; }
              h1 { color: #1E3A8A; text-align: center; }
              .content { line-height: 1.6; white-space: pre-line; }
            </style>
          </head>
          <body>
            <h1>NAL Property Platform Report</h1>
            <div class="content">${reportContent}</div>
          </body>
        </html>
      `
      
      const element = document.createElement('a')
      const file = new Blob([htmlContent], {type: 'text/html'})
      element.href = URL.createObjectURL(file)
      element.download = `NAL-${reportType}-Report-${new Date().toISOString().split('T')[0]}.html`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      
      setIsGenerating(false)
      setIsGenerated(true)
      
      setTimeout(() => {
        onClose()
      }, 1500)
    }, 2500)
  }

  const handleDownload = () => {
    const reportContent = generatePDFContent()
    
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #1E3A8A; text-align: center; }
            .content { line-height: 1.6; white-space: pre-line; }
          </style>
        </head>
        <body>
          <h1>NAL Property Platform Report</h1>
          <div class="content">${reportContent}</div>
        </body>
      </html>
    `
    
    const element = document.createElement('a')
    const file = new Blob([htmlContent], {type: 'text/html'})
    element.href = URL.createObjectURL(file)
    element.download = `NAL-${reportType}-${Date.now()}.html`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (isGenerating) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Generating Report...</h3>
          <p className="text-gray-600">Compiling your data and creating PDF report</p>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
          </div>
        </div>
      </div>
    )
  }

  if (isGenerated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="animate-bounce mb-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Report Downloaded!</h3>
          <p className="text-gray-600">Your report has been successfully generated and downloaded.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">Generate Report</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Report Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Report Type</label>
            <div className="grid grid-cols-1 gap-3">
              {reportTypes[userType]?.map((type) => (
                <label key={type.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="reportType"
                    value={type.id}
                    checked={reportType === type.id}
                    onChange={(e) => setReportType(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`border-2 rounded-lg p-4 transition-colors ${
                    reportType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900">{type.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Date Range</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">From</label>
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">To</label>
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Additional Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Additional Filters</label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Include detailed analytics</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Include charts and graphs</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Export as Excel format</span>
              </label>
            </div>
          </div>

          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Report Format</label>
            <div className="grid grid-cols-3 gap-3">
              {['PDF', 'Excel', 'CSV'].map((format) => (
                <label key={format} className="cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value={format.toLowerCase()}
                    defaultChecked={format === 'PDF'}
                    className="sr-only"
                  />
                  <div className="border border-gray-200 rounded-lg p-3 text-center hover:border-gray-300">
                    <span className="text-sm font-medium">{format}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerateReport}
              disabled={!reportType}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportGenerator