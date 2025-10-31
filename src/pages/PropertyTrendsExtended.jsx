import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, BarChart3, PieChart, Calendar, MapPin, DollarSign, Home } from 'lucide-react'

const PropertyTrendsExtended = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months')
  const [selectedArea, setSelectedArea] = useState('all')
  const [trendsData, setTrendsData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTrendsData({
        priceIndex: {
          current: 142.5,
          change: 8.2,
          trend: 'up'
        },
        demandSupply: {
          demand: 78,
          supply: 65,
          ratio: 1.2
        },
        topAreas: [
          { name: 'Koramangala', growth: 15.2, avgPrice: 8500, properties: 245 },
          { name: 'Indiranagar', growth: 12.8, avgPrice: 9200, properties: 189 },
          { name: 'Whitefield', growth: 18.5, avgPrice: 6800, properties: 312 },
          { name: 'HSR Layout', growth: 14.1, avgPrice: 7900, properties: 267 }
        ],
        propertyTypes: [
          { type: '2BHK', share: 35, growth: 12.5 },
          { type: '3BHK', share: 40, growth: 15.2 },
          { type: '4BHK', share: 15, growth: 8.7 },
          { type: 'Villa', share: 10, growth: 22.1 }
        ],
        monthlyData: [
          { month: 'Jan', sales: 245, rentals: 189, avgPrice: 7200 },
          { month: 'Feb', sales: 267, rentals: 201, avgPrice: 7350 },
          { month: 'Mar', sales: 289, rentals: 223, avgPrice: 7480 },
          { month: 'Apr', sales: 312, rentals: 245, avgPrice: 7620 },
          { month: 'May', sales: 298, rentals: 234, avgPrice: 7750 },
          { month: 'Jun', sales: 334, rentals: 267, avgPrice: 7890 }
        ],
        insights: [
          {
            title: 'Rising Demand in Tech Corridors',
            description: 'Properties near IT hubs showing 20% higher demand',
            impact: 'high'
          },
          {
            title: 'Rental Market Recovery',
            description: 'Rental prices recovering post-pandemic with 15% growth',
            impact: 'medium'
          },
          {
            title: 'Luxury Segment Growth',
            description: 'Premium properties (>₹2Cr) showing strong growth',
            impact: 'medium'
          }
        ]
      })
      setLoading(false)
    }, 1000)
  }, [selectedTimeframe, selectedArea])

  const timeframes = [
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' },
    { value: '2years', label: '2 Years' }
  ]

  const areas = [
    { value: 'all', label: 'All Areas' },
    { value: 'koramangala', label: 'Koramangala' },
    { value: 'indiranagar', label: 'Indiranagar' },
    { value: 'whitefield', label: 'Whitefield' },
    { value: 'hsr', label: 'HSR Layout' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading market trends...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Property Market Trends</h1>
          <p className="text-gray-600">Comprehensive insights into property market trends and analytics</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {timeframes.map(tf => (
                  <option key={tf.value} value={tf.value}>{tf.label}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {areas.map(area => (
                  <option key={area.value} value={area.value}>{area.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Price Index</h3>
              <BarChart3 className="w-6 h-6 text-primary-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{trendsData.priceIndex.current}</div>
            <div className={`flex items-center gap-1 text-sm ${
              trendsData.priceIndex.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trendsData.priceIndex.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{trendsData.priceIndex.change}% vs last period</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Demand vs Supply</h3>
              <PieChart className="w-6 h-6 text-primary-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Demand</span>
                <span className="font-semibold">{trendsData.demandSupply.demand}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Supply</span>
                <span className="font-semibold">{trendsData.demandSupply.supply}%</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ratio</span>
                  <span className="font-bold text-primary-600">{trendsData.demandSupply.ratio}:1</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Market Activity</h3>
              <Home className="w-6 h-6 text-primary-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Listings</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">New This Week</span>
                <span className="font-semibold">89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Days on Market</span>
                <span className="font-semibold">45</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Performing Areas */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Areas</h3>
            <div className="space-y-4">
              {trendsData.topAreas.map((area, index) => (
                <div key={area.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <div>
                      <div className="font-medium text-gray-900">{area.name}</div>
                      <div className="text-sm text-gray-500">{area.properties} properties</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">₹{area.avgPrice}/sq ft</div>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {area.growth}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Property Type Distribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Type Performance</h3>
            <div className="space-y-4">
              {trendsData.propertyTypes.map((type) => (
                <div key={type.type} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{type.type}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{type.share}%</span>
                      <span className={`text-sm flex items-center gap-1 ${
                        type.growth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {type.growth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(type.growth)}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${type.share}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Insights */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trendsData.insights.map((insight, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className={`w-3 h-3 rounded-full mt-1 ${
                    insight.impact === 'high' ? 'bg-red-500' :
                    insight.impact === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyTrendsExtended