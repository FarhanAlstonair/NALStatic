import { useState, useEffect } from 'react'
import { FileText, AlertCircle, Calendar, ExternalLink, Search, Filter } from 'lucide-react'

const GovernmentGuidelines = () => {
  const [guidelines, setGuidelines] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load real government guidelines
    setTimeout(() => {
      setGuidelines([
        {
          id: 1,
          title: 'Real Estate (Regulation and Development) Act, 2016 (RERA)',
          category: 'RERA',
          date: '2024-01-15',
          summary: 'Central act regulating sale of plots, apartments, buildings, real-estate projects in Bangalore',
          content: 'This central act regulates sale of plots, apartments, buildings, real-estate projects and mandates registration of both projects and agents. Key provisions: Section 3 requires prior registration of real estate project with Real Estate Regulatory Authority. Section 12 covers obligations of promoter regarding veracity of advertisement or prospectus.',
          priority: 'high',
          source: 'Ministry of Housing and Urban Affairs',
          link: 'https://www.indiacode.nic.in/handle/123456789/2158?view_type=browse'
        },
        {
          id: 2,
          title: 'Karnataka RERA (K-RERA) Guidelines for Bangalore',
          category: 'RERA',
          date: '2024-01-10',
          summary: 'State-specific RERA regulations for Karnataka and Bangalore properties',
          content: 'Karnataka Real Estate Regulatory Authority governs all real estate projects in Bangalore. All projects above 500 sq meters or 8 apartments must be registered. Agents must also be registered under K-RERA.',
          priority: 'high',
          source: 'Karnataka RERA Authority',
          link: 'https://rera.karnataka.gov.in'
        },
        {
          id: 3,
          title: 'Property Registration Guidelines - Karnataka',
          category: 'Documentation',
          date: '2024-01-05',
          summary: 'Document requirements and registration process for Bangalore properties',
          content: 'Guidelines for property registration in Karnataka including stamp duty rates, registration fees, and required documents. Online registration available through Kaveri portal.',
          priority: 'medium',
          source: 'Department of Stamps and Registration, Karnataka',
          link: 'https://kaveri.karnataka.gov.in'
        },
        {
          id: 4,
          title: 'Bangalore Development Authority (BDA) Regulations',
          category: 'Planning',
          date: '2023-12-20',
          summary: 'Building approvals and development guidelines for Bangalore',
          content: 'BDA regulations for building approvals, layout sanctions, and development permissions in Bangalore. Includes guidelines for residential and commercial constructions.',
          priority: 'medium',
          source: 'Bangalore Development Authority',
          link: 'https://www.bdabangalore.org'
        },
        {
          id: 5,
          title: 'Property Tax Guidelines - BBMP',
          category: 'Tax',
          date: '2023-12-15',
          summary: 'Property tax calculation and payment guidelines for Bangalore properties',
          content: 'Bruhat Bengaluru Mahanagara Palike (BBMP) property tax guidelines including Self Assessment Scheme (SAS), tax rates, and online payment procedures.',
          priority: 'medium',
          source: 'BBMP',
          link: 'https://bbmp.gov.in'
        },

      ])
      setLoading(false)
    }, 1000)
  }, [])

  const categories = ['all', 'RERA', 'Tax', 'Documentation', 'Planning', 'Compliance']

  const filteredGuidelines = guidelines

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Government Guidelines & Policies</h1>
          <p className="text-gray-600">Stay updated with RERA, Karnataka state regulations, and Bangalore-specific property policies</p>
          
          {/* Important Notice */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900 mb-1">Important for Property Listings</h3>
                <p className="text-sm text-blue-800">
                  All properties listed on NAL India must comply with RERA regulations. 
                  Projects above 500 sq meters or 8 apartments require RERA registration. 
                  Always verify RERA registration numbers before listing.
                </p>
              </div>
            </div>
          </div>
        </div>



        {/* Guidelines List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading guidelines...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredGuidelines.map(guideline => (
              <div key={guideline.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{guideline.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(guideline.priority)}`}>
                        {guideline.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{guideline.summary}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(guideline.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>{guideline.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{guideline.source}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-700 mb-4">{guideline.content}</p>
                  {guideline.link && (
                    <a 
                      href={guideline.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      <span>Read Full Guidelines</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GovernmentGuidelines