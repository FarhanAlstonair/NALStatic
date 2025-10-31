import { Building, Clock, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'

const AssetManagement = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-12">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Building className="w-12 h-12 text-primary-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Asset Management
          </h1>
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <Wrench className="w-5 h-5 text-blue-500" />
            <span className="text-lg font-semibold text-blue-600">In Progress</span>
          </div>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Our development team is actively working on an advanced asset management system to help you track, analyze, and optimize your property portfolio with powerful insights and automated reporting.
          </p>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Coming:</h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                Portfolio performance tracking and analytics
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                Automated rental income and expense management
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                Real-time property valuation updates
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                Tax optimization and reporting tools
              </li>
            </ul>
          </div>
          

          
          <Link 
            to="/properties" 
            className="btn-primary inline-block"
          >
            Explore Properties
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AssetManagement