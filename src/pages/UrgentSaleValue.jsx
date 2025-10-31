import { useState } from 'react'
import { Calculator, MapPin, Home, TrendingUp, Clock, AlertCircle } from 'lucide-react'

const UrgentSaleValue = () => {
  const [propertyData, setPropertyData] = useState({
    propertyType: '',
    location: '',
    area: '',
    bedrooms: '',
    age: '',
    condition: '',
    urgencyLevel: ''
  })
  const [valuation, setValuation] = useState(null)
  const [loading, setLoading] = useState(false)

  const propertyTypes = ['Apartment', 'Villa', 'Independent House', 'Plot', 'Commercial']
  const conditions = ['Excellent', 'Good', 'Average', 'Needs Renovation']
  const urgencyLevels = ['Immediate (1-7 days)', 'Quick (1-2 weeks)', 'Standard (1 month)']

  const handleInputChange = (field, value) => {
    setPropertyData(prev => ({ ...prev, [field]: value }))
  }

  const calculateUrgentValue = () => {
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const baseValue = 7500 // Base price per sq ft
      const areaMultiplier = parseInt(propertyData.area) || 1000
      
      // Location multiplier
      const locationMultipliers = {
        'koramangala': 1.3,
        'indiranagar': 1.25,
        'whitefield': 1.1,
        'hsr': 1.2,
        'electronic city': 0.9
      }
      
      const locationKey = propertyData.location.toLowerCase()
      const locationMultiplier = locationMultipliers[locationKey] || 1.0
      
      // Urgency discount
      const urgencyDiscounts = {
        'Immediate (1-7 days)': 0.15,
        'Quick (1-2 weeks)': 0.08,
        'Standard (1 month)': 0.03
      }
      
      const urgencyDiscount = urgencyDiscounts[propertyData.urgencyLevel] || 0
      
      // Condition multiplier
      const conditionMultipliers = {
        'Excellent': 1.1,
        'Good': 1.0,
        'Average': 0.9,
        'Needs Renovation': 0.75
      }
      
      const conditionMultiplier = conditionMultipliers[propertyData.condition] || 1.0
      
      const marketValue = baseValue * areaMultiplier * locationMultiplier * conditionMultiplier
      const urgentValue = marketValue * (1 - urgencyDiscount)
      
      setValuation({
        marketValue,
        urgentValue,
        discount: urgencyDiscount * 100,
        pricePerSqFt: urgentValue / areaMultiplier,
        timeToSell: propertyData.urgencyLevel.split('(')[1].split(')')[0],
        confidence: 85
      })
      
      setLoading(false)
    }, 2000)
  }

  const isFormValid = Object.values(propertyData).every(value => value !== '')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Urgent Sale Value Calculator</h1>
          <p className="text-gray-600">Get instant property valuation for urgent sales with market-adjusted pricing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Property Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select
                  value={propertyData.propertyType}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select Property Type</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={propertyData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter location (e.g., Koramangala, Bangalore)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq ft)</label>
                  <input
                    type="number"
                    value={propertyData.area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                    placeholder="1200"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <select
                    value={propertyData.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4+ BHK</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Age</label>
                <input
                  type="number"
                  value={propertyData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="5 years"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Condition</label>
                <select
                  value={propertyData.condition}
                  onChange={(e) => handleInputChange('condition', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select Condition</option>
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sale Urgency</label>
                <select
                  value={propertyData.urgencyLevel}
                  onChange={(e) => handleInputChange('urgencyLevel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select Urgency</option>
                  {urgencyLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={calculateUrgentValue}
                disabled={!isFormValid || loading}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="w-4 h-4" />
                    Calculate Urgent Value
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {valuation ? (
              <>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Valuation Results</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Market Value</span>
                      <span className="font-semibold text-gray-900">₹{(valuation.marketValue / 100000).toFixed(1)}L</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-primary-50 rounded-lg border border-primary-200">
                      <span className="text-primary-700 font-medium">Urgent Sale Value</span>
                      <span className="font-bold text-primary-900 text-lg">₹{(valuation.urgentValue / 100000).toFixed(1)}L</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-red-600">Urgency Discount</span>
                      <span className="font-semibold text-red-700">-{valuation.discount.toFixed(1)}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Price per sq ft</span>
                      <span className="font-semibold text-gray-900">₹{valuation.pricePerSqFt.toFixed(0)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sale Timeline</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <span className="text-gray-700">Expected time to sell: <strong>{valuation.timeToSell}</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Confidence level: <strong>{valuation.confidence}%</strong></span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-1">Important Note</h4>
                      <p className="text-sm text-yellow-700">
                        This is an estimated value based on market data. Actual sale price may vary based on market conditions, 
                        property specifics, and negotiation. Consider getting a professional appraisal for accurate valuation.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="text-center py-12">
                  <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-600">Fill in the property details to get your urgent sale valuation</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UrgentSaleValue