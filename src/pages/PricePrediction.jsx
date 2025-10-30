import { useState } from 'react'
import { TrendingUp, Calculator, MapPin, Calendar, BarChart3, Zap, Target, AlertCircle } from 'lucide-react'

const PricePrediction = () => {
  const [propertyData, setPropertyData] = useState({
    location: 'mumbai-bandra',
    propertyType: 'apartment',
    bedrooms: 2,
    area: 1000,
    age: 5,
    amenities: [],
    floor: 5
  })

  const [prediction, setPrediction] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const locationFactors = {
    'mumbai-bandra': { multiplier: 1.8, growth: 12 },
    'mumbai-andheri': { multiplier: 1.4, growth: 8 },
    'bangalore-koramangala': { multiplier: 1.6, growth: 15 },
    'bangalore-whitefield': { multiplier: 1.3, growth: 18 },
    'delhi-gurgaon': { multiplier: 1.5, growth: 10 }
  }

  const predictPrice = async () => {
    setIsAnalyzing(true)
    
    // Simulate ML prediction
    setTimeout(() => {
      const basePrice = 50000 // per sq ft
      const locationFactor = locationFactors[propertyData.location]
      const typeFactor = propertyData.propertyType === 'villa' ? 1.3 : 1.0
      const ageFactor = Math.max(0.7, 1 - (propertyData.age * 0.02))
      
      const currentPrice = basePrice * locationFactor.multiplier * typeFactor * ageFactor * propertyData.area
      
      const predictions = {
        current: Math.round(currentPrice),
        sixMonths: Math.round(currentPrice * 1.03),
        oneYear: Math.round(currentPrice * 1.06),
        twoYears: Math.round(currentPrice * (1 + locationFactor.growth / 100)),
        fiveYears: Math.round(currentPrice * Math.pow(1 + locationFactor.growth / 100, 2.5)),
        confidence: 87,
        factors: {
          location: locationFactor.growth,
          marketTrend: 'Rising',
          demandSupply: 'High Demand',
          infrastructure: 'Improving'
        }
      }
      
      setPrediction(predictions)
      setIsAnalyzing(false)
    }, 3000)
  }

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`
    }
    return `₹${price.toLocaleString()}`
  }

  const PredictionChart = () => (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Prediction Timeline</h3>
      <div className="space-y-4">
        {[
          { period: 'Current', price: prediction.current, change: 0 },
          { period: '6 Months', price: prediction.sixMonths, change: 3 },
          { period: '1 Year', price: prediction.oneYear, change: 6 },
          { period: '2 Years', price: prediction.twoYears, change: prediction.factors.location },
          { period: '5 Years', price: prediction.fiveYears, change: prediction.factors.location * 2.5 }
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-green-500'}`}></div>
              <span className="font-medium text-gray-900">{item.period}</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">{formatPrice(item.price)}</div>
              {item.change > 0 && (
                <div className="text-sm text-green-600">+{item.change.toFixed(1)}%</div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-900">
            Prediction Confidence: {prediction.confidence}%
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <TrendingUp className="w-8 h-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Price Prediction</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get accurate property price predictions powered by machine learning algorithms
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select 
                  value={propertyData.location}
                  onChange={(e) => setPropertyData({...propertyData, location: e.target.value})}
                  className="input-field"
                >
                  <option value="mumbai-bandra">Mumbai - Bandra</option>
                  <option value="mumbai-andheri">Mumbai - Andheri</option>
                  <option value="bangalore-koramangala">Bangalore - Koramangala</option>
                  <option value="bangalore-whitefield">Bangalore - Whitefield</option>
                  <option value="delhi-gurgaon">Delhi - Gurgaon</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select 
                  value={propertyData.propertyType}
                  onChange={(e) => setPropertyData({...propertyData, propertyType: e.target.value})}
                  className="input-field"
                >
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="office">Office</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select 
                  value={propertyData.bedrooms}
                  onChange={(e) => setPropertyData({...propertyData, bedrooms: Number(e.target.value)})}
                  className="input-field"
                >
                  <option value={1}>1 BHK</option>
                  <option value={2}>2 BHK</option>
                  <option value={3}>3 BHK</option>
                  <option value={4}>4+ BHK</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq ft)</label>
                <input
                  type="number"
                  value={propertyData.area}
                  onChange={(e) => setPropertyData({...propertyData, area: Number(e.target.value)})}
                  className="input-field"
                  min="300"
                  max="5000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Age (years)</label>
                <input
                  type="number"
                  value={propertyData.age}
                  onChange={(e) => setPropertyData({...propertyData, age: Number(e.target.value)})}
                  className="input-field"
                  min="0"
                  max="50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
                <input
                  type="number"
                  value={propertyData.floor}
                  onChange={(e) => setPropertyData({...propertyData, floor: Number(e.target.value)})}
                  className="input-field"
                  min="0"
                  max="50"
                />
              </div>

              <button
                onClick={predictPrice}
                disabled={isAnalyzing}
                className="btn-primary w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Calculator className="w-4 h-4 mr-2 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Predict Price
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          {isAnalyzing ? (
            <div className="text-center py-12">
              <Calculator className="w-16 h-16 text-primary-500 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI is Calculating...</h3>
              <p className="text-gray-600">Analyzing market data, trends, and property factors</p>
            </div>
          ) : prediction ? (
            <div className="space-y-6">
              {/* Current Price */}
              <div className="card text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Market Value</h3>
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {formatPrice(prediction.current)}
                </div>
                <p className="text-gray-600">₹{Math.round(prediction.current / propertyData.area).toLocaleString()} per sq ft</p>
              </div>

              {/* Prediction Timeline */}
              <PredictionChart />

              {/* Market Factors */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Factors</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-900">Location Growth</span>
                    </div>
                    <div className="text-lg font-bold text-green-600">+{prediction.factors.location}%</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Market Trend</span>
                    </div>
                    <div className="text-lg font-bold text-blue-600">{prediction.factors.marketTrend}</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-900">Demand-Supply</span>
                    </div>
                    <div className="text-lg font-bold text-purple-600">{prediction.factors.demandSupply}</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Zap className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-900">Infrastructure</span>
                    </div>
                    <div className="text-lg font-bold text-orange-600">{prediction.factors.infrastructure}</div>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="card bg-yellow-50 border-yellow-200">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900 mb-1">Prediction Disclaimer</h4>
                    <p className="text-sm text-yellow-800">
                      Price predictions are based on historical data and market trends. Actual prices may vary due to 
                      market conditions, property condition, and other factors. Use as guidance only.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ready for Price Prediction
              </h3>
              <p className="text-gray-600">
                Enter property details to get AI-powered price predictions
              </p>
            </div>
          )}
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          How Our AI Predicts Prices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Data Analysis</h3>
            <p className="text-gray-600 text-sm">Analyzes 100K+ property transactions</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Location Factors</h3>
            <p className="text-gray-600 text-sm">Considers micro-location trends</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Market Trends</h3>
            <p className="text-gray-600 text-sm">Real-time market indicators</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calculator className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">ML Algorithm</h3>
            <p className="text-gray-600 text-sm">Advanced prediction models</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricePrediction