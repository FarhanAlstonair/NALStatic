import { useState } from 'react'
import { BarChart3, TrendingUp, TrendingDown, Eye, Users, DollarSign, MapPin, Filter } from 'lucide-react'

const CompetitorAnalytics = () => {
  const [selectedLocation, setSelectedLocation] = useState('mumbai')
  const [timeRange, setTimeRange] = useState('30d')

  const competitorData = [
    {
      id: 1,
      name: 'MagicBricks',
      marketShare: 35,
      avgPrice: 4500000,
      listings: 12500,
      growth: 8.5,
      strengths: ['Brand Recognition', 'Large Inventory', 'Marketing'],
      weaknesses: ['User Experience', 'Verification Process']
    },
    {
      id: 2,
      name: '99acres',
      marketShare: 28,
      avgPrice: 4200000,
      listings: 9800,
      growth: 6.2,
      strengths: ['Technology', 'Mobile App', 'Analytics'],
      weaknesses: ['Premium Pricing', 'Limited Support']
    },
    {
      id: 3,
      name: 'Housing.com',
      marketShare: 22,
      avgPrice: 3900000,
      listings: 8200,
      growth: -2.1,
      strengths: ['User Interface', 'Virtual Tours', 'Maps'],
      weaknesses: ['Market Reach', 'Inventory Size']
    },
    {
      id: 4,
      name: 'NAL India',
      marketShare: 15,
      avgPrice: 4100000,
      listings: 5500,
      growth: 15.8,
      strengths: ['Document Verification', 'AI Features', 'Clean Design'],
      weaknesses: ['New Brand', 'Market Penetration']
    }
  ]

  const marketTrends = [
    { month: 'Jan', nalIndia: 12, magicBricks: 35, acres99: 28, housing: 25 },
    { month: 'Feb', nalIndia: 13, magicBricks: 34, acres99: 28, housing: 25 },
    { month: 'Mar', nalIndia: 14, magicBricks: 34, acres99: 27, housing: 25 },
    { month: 'Apr', nalIndia: 15, magicBricks: 33, acres99: 27, housing: 25 },
    { month: 'May', nalIndia: 16, magicBricks: 33, acres99: 26, housing: 25 },
    { month: 'Jun', nalIndia: 18, magicBricks: 32, acres99: 26, housing: 24 }
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const CompetitorCard = ({ competitor }) => (
    <div className={`card ${competitor.name === 'NAL India' ? 'border-primary-200 bg-primary-50' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{competitor.name}</h3>
        {competitor.name === 'NAL India' && (
          <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            You
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Market Share</p>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${competitor.name === 'NAL India' ? 'bg-primary-600' : 'bg-gray-400'}`}
                style={{ width: `${competitor.marketShare}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{competitor.marketShare}%</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600">Growth</p>
          <div className="flex items-center space-x-1">
            {competitor.growth > 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`font-medium ${competitor.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {competitor.growth > 0 ? '+' : ''}{competitor.growth}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Avg Price</p>
          <p className="font-semibold">{formatPrice(competitor.avgPrice)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Listings</p>
          <p className="font-semibold">{competitor.listings.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-green-700 mb-1">Strengths</p>
          <div className="flex flex-wrap gap-1">
            {competitor.strengths.map((strength, index) => (
              <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                {strength}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-red-700 mb-1">Weaknesses</p>
          <div className="flex flex-wrap gap-1">
            {competitor.weaknesses.map((weakness, index) => (
              <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                {weakness}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Competitor Analytics
        </h1>
        <p className="text-lg text-gray-600">
          Real-time market intelligence and competitive analysis
        </p>
      </div>

      {/* Filters */}
      <div className="card mb-8">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="input-field w-auto"
            >
              <option value="koramangala">Koramangala, Bangalore</option>
              <option value="indiranagar">Indiranagar, Bangalore</option>
              <option value="whitefield">Whitefield, Bangalore</option>
              <option value="hsr-layout">HSR Layout, Bangalore</option>
              <option value="electronic-city">Electronic City, Bangalore</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="input-field w-auto"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 3 months</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">4</h3>
          <p className="text-gray-600">Major Competitors</p>
        </div>
        <div className="card text-center">
          <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">36K</h3>
          <p className="text-gray-600">Total Listings</p>
        </div>
        <div className="card text-center">
          <DollarSign className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">₹4.2Cr</h3>
          <p className="text-gray-600">Avg Market Price</p>
        </div>
        <div className="card text-center">
          <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">+7.1%</h3>
          <p className="text-gray-600">Market Growth</p>
        </div>
      </div>

      {/* Market Share Trend */}
      <div className="card mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Share Trends</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Interactive chart showing market share trends over time</p>
            <p className="text-sm text-gray-500">NAL India: +15.8% growth (highest in market)</p>
          </div>
        </div>
      </div>

      {/* Competitor Analysis */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Competitor Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competitorData.map(competitor => (
            <CompetitorCard key={competitor.id} competitor={competitor} />
          ))}
        </div>
      </div>

      {/* Strategic Insights */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-green-700 mb-3">Opportunities</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                <span>Document verification is unique differentiator</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                <span>AI features ahead of competition</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                <span>Fastest growth rate in market</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                <span>Clean UX compared to competitors</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-red-700 mb-3">Challenges</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                <span>Need to increase market penetration</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                <span>Build brand recognition</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                <span>Expand property inventory</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                <span>Compete with established players</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompetitorAnalytics