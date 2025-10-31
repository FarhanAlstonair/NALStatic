import { Construction, Calendar, TrendingUp } from 'lucide-react'

const MarketReports = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <Construction className="w-24 h-24 text-primary-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Market Reports</h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive property market analysis and insights
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Coming Soon</h2>
                <p className="text-gray-600 leading-relaxed">
                  We're working hard to bring you detailed market reports with comprehensive 
                  property analytics, trend analysis, and investment insights.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-medium text-gray-900 mb-3">What to expect:</h3>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li>• Monthly market trend analysis</li>
                  <li>• Area-wise price comparisons</li>
                  <li>• Investment opportunity reports</li>
                  <li>• Rental yield analysis</li>
                  <li>• Future growth predictions</li>
                </ul>
              </div>

              <div className="flex items-center justify-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Expected launch: Q1 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketReports