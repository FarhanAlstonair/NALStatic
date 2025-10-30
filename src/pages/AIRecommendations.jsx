import { useState } from 'react'
import { Brain, TrendingUp, MapPin, Star, Filter, Zap, Target, Heart } from 'lucide-react'

const AIRecommendations = () => {
  const [preferences, setPreferences] = useState({
    budget: 5000000,
    propertyType: 'apartment',
    location: 'mumbai',
    bedrooms: 2,
    amenities: []
  })

  const [recommendations, setRecommendations] = useState([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const aiRecommendations = [
    {
      id: 1,
      title: '3BHK Premium Apartment',
      location: 'Bandra West, Mumbai',
      price: 4500000,
      matchScore: 95,
      reasons: ['Perfect location match', 'Within budget', 'High ROI potential'],
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      aiInsights: {
        priceGrowth: '+12% in 2 years',
        marketTrend: 'Rising',
        investmentScore: 8.5
      }
    },
    {
      id: 2,
      title: '2BHK Modern Flat',
      location: 'Koramangala, Bangalore',
      price: 3800000,
      matchScore: 88,
      reasons: ['Tech hub proximity', 'Good connectivity', 'Rental potential'],
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
      aiInsights: {
        priceGrowth: '+15% in 2 years',
        marketTrend: 'Hot',
        investmentScore: 9.2
      }
    },
    {
      id: 3,
      title: '4BHK Luxury Villa',
      location: 'Whitefield, Bangalore',
      price: 6200000,
      matchScore: 82,
      reasons: ['Premium location', 'Future metro connectivity', 'Spacious'],
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      aiInsights: {
        priceGrowth: '+18% in 2 years',
        marketTrend: 'Emerging',
        investmentScore: 8.8
      }
    }
  ]

  const generateRecommendations = async () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setRecommendations(aiRecommendations)
      setIsAnalyzing(false)
    }, 3000)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const RecommendationCard = ({ property }) => (
    <div className="card hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {property.matchScore}% Match
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.title}</h3>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {property.location}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(property.price)}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">{property.aiInsights.investmentScore}</span>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-3">
          <h4 className="text-sm font-medium text-blue-900 mb-2">AI Insights</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-blue-700">Price Growth:</span>
              <div className="font-medium text-green-600">{property.aiInsights.priceGrowth}</div>
            </div>
            <div>
              <span className="text-blue-700">Market:</span>
              <div className="font-medium">{property.aiInsights.marketTrend}</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Why AI Recommends</h4>
          <ul className="space-y-1">
            {property.reasons.map((reason, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex space-x-2">
          <button className="flex-1 btn-primary text-sm">View Details</button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Brain className="w-8 h-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Property Recommendations</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get personalized property suggestions powered by advanced AI algorithms
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Preferences Panel */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Preferences</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                <select 
                  value={preferences.budget}
                  onChange={(e) => setPreferences({...preferences, budget: Number(e.target.value)})}
                  className="input-field"
                >
                  <option value={2000000}>₹20L - ₹50L</option>
                  <option value={5000000}>₹50L - ₹1Cr</option>
                  <option value={10000000}>₹1Cr - ₹2Cr</option>
                  <option value={20000000}>₹2Cr+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select 
                  value={preferences.propertyType}
                  onChange={(e) => setPreferences({...preferences, propertyType: e.target.value})}
                  className="input-field"
                >
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="office">Office</option>
                  <option value="shop">Shop</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Location</label>
                <select 
                  value={preferences.location}
                  onChange={(e) => setPreferences({...preferences, location: e.target.value})}
                  className="input-field"
                >
                  <option value="mumbai">Mumbai</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="delhi">Delhi</option>
                  <option value="pune">Pune</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select 
                  value={preferences.bedrooms}
                  onChange={(e) => setPreferences({...preferences, bedrooms: Number(e.target.value)})}
                  className="input-field"
                >
                  <option value={1}>1 BHK</option>
                  <option value={2}>2 BHK</option>
                  <option value={3}>3 BHK</option>
                  <option value={4}>4+ BHK</option>
                </select>
              </div>

              <button
                onClick={generateRecommendations}
                disabled={isAnalyzing}
                className="btn-primary w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Get AI Recommendations
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="lg:col-span-3">
          {isAnalyzing ? (
            <div className="text-center py-12">
              <Brain className="w-16 h-16 text-primary-500 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI is Analyzing...</h3>
              <p className="text-gray-600">Processing market data, trends, and your preferences</p>
            </div>
          ) : recommendations.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recommended for You ({recommendations.length})
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Target className="w-4 h-4" />
                  <span>Sorted by AI match score</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommendations.map(property => (
                  <RecommendationCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ready for AI Recommendations
              </h3>
              <p className="text-gray-600">
                Set your preferences and let our AI find the perfect properties for you
              </p>
            </div>
          )}
        </div>
      </div>

      {/* AI Features */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          How Our AI Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Analysis</h3>
            <p className="text-gray-600 text-sm">Analyzes 50+ factors including location, pricing, trends, and amenities</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Market Insights</h3>
            <p className="text-gray-600 text-sm">Real-time market data and price prediction algorithms</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Personalized</h3>
            <p className="text-gray-600 text-sm">Learns from your preferences and behavior patterns</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIRecommendations