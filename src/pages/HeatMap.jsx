import { useState, useEffect } from 'react'
import { MapPin, TrendingUp, TrendingDown, IndianRupee, Home, Users } from 'lucide-react'

const HeatMap = () => {
  const [selectedMetric, setSelectedMetric] = useState('price')
  const [selectedArea, setSelectedArea] = useState(null)
  const [heatMapData, setHeatMapData] = useState([])

  useEffect(() => {
    // Simulate heat map data
    const data = [
      { area: 'Koramangala', price: 8500, demand: 85, growth: 12, properties: 245, lat: 12.9352, lng: 77.6245 },
      { area: 'Indiranagar', price: 9200, demand: 92, growth: 15, properties: 189, lat: 12.9719, lng: 77.6412 },
      { area: 'Whitefield', price: 6800, demand: 78, growth: 18, properties: 312, lat: 12.9698, lng: 77.7500 },
      { area: 'HSR Layout', price: 7900, demand: 88, growth: 14, properties: 267, lat: 12.9082, lng: 77.6476 },
      { area: 'Electronic City', price: 5200, demand: 65, growth: 22, properties: 198, lat: 12.8456, lng: 77.6603 },
      { area: 'Marathahalli', price: 7200, demand: 82, growth: 16, properties: 223, lat: 12.9591, lng: 77.6974 },
      { area: 'Banashankari', price: 6100, demand: 71, growth: 8, properties: 156, lat: 12.9250, lng: 77.5667 },
      { area: 'Jayanagar', price: 7800, demand: 79, growth: 10, properties: 178, lat: 12.9279, lng: 77.5937 }
    ]
    setHeatMapData(data)
    
    // Initialize Leaflet Map
    initializeMap(data)
  }, [])

  useEffect(() => {
    if (window.leafletMap && heatMapData.length > 0) {
      updateHeatMap()
    }
  }, [selectedMetric])

  const initializeMap = async (data) => {
    if (typeof window !== 'undefined' && document.getElementById('heatmap')) {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')
      
      // Fix default markers
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
      })

      const map = L.map('heatmap').setView([12.9716, 77.5946], 11)
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map)

      window.leafletMap = map
      window.L = L
      updateHeatMap()
    }
  }

  const updateHeatMap = () => {
    if (!window.leafletMap || !window.L) return

    // Clear existing overlays
    if (window.heatMapOverlays) {
      window.heatMapOverlays.forEach(overlay => window.leafletMap.removeLayer(overlay))
    }
    window.heatMapOverlays = []

    heatMapData.forEach(area => {
      const value = getMetricValue(area, selectedMetric)
      const intensity = getIntensity(value, selectedMetric)
      
      // Create professional heatmap circle
      const circle = window.L.circle([area.lat, area.lng], {
        color: getCircleColor(intensity),
        weight: 2,
        opacity: 0.8,
        fillColor: getCircleColor(intensity),
        fillOpacity: 0.6,
        radius: 1500 + (intensity * 2500) // Smaller, more professional circles
      }).addTo(window.leafletMap)

      // Create popup
      circle.bindPopup(`
        <div style="padding: 12px; max-width: 200px;">
          <h3 style="font-weight: 600; margin-bottom: 8px;">${area.area}</h3>
          <div style="font-size: 14px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span>Price/sq ft:</span>
              <span style="font-weight: 500;">₹${area.price}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span>Demand:</span>
              <span style="font-weight: 500;">${area.demand}%</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span>Growth:</span>
              <span style="font-weight: 500;">${area.growth}%</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Properties:</span>
              <span style="font-weight: 500;">${area.properties}</span>
            </div>
          </div>
        </div>
      `)

      circle.on('click', () => {
        setSelectedArea(area)
      })

      window.heatMapOverlays.push(circle)
    })
  }

  const getIntensity = (value, metric) => {
    switch (metric) {
      case 'price':
        return Math.min(value / 10000, 1)
      case 'demand':
        return value / 100
      case 'growth':
        return Math.min(value / 25, 1)
      case 'properties':
        return Math.min(value / 350, 1)
      default:
        return 0.5
    }
  }

  const getCircleColor = (intensity) => {
    // Professional heatmap gradient like Zillow
    if (intensity < 0.2) return '#10B981' // Green for very low
    if (intensity < 0.4) return '#84CC16' // Light green for low
    if (intensity < 0.6) return '#EAB308' // Yellow for medium
    if (intensity < 0.8) return '#F97316' // Orange for high
    return '#DC2626' // Red for very high
  }

  const metrics = [
    { key: 'price', label: 'Price per sq ft', icon: IndianRupee, unit: '₹' },
    { key: 'demand', label: 'Demand Index', icon: TrendingUp, unit: '%' },
    { key: 'growth', label: 'Growth Rate', icon: TrendingUp, unit: '%' },
    { key: 'properties', label: 'Available Properties', icon: Home, unit: '' }
  ]



  const getMetricValue = (area, metric) => {
    return area[metric]
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Property Heat Map</h1>
          <p className="text-gray-600">Visual representation of property data and market trends across Bangalore</p>
        </div>

        {/* Metric Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Metric</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map(metric => {
              const Icon = metric.icon
              return (
                <button
                  key={metric.key}
                  onClick={() => setSelectedMetric(metric.key)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedMetric === metric.key
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">{metric.label}</div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Heat Map Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {metrics.find(m => m.key === selectedMetric)?.label} Heat Map
                </h3>
                <p className="text-sm text-gray-600 mt-1">Interactive map showing property data across Bangalore</p>
              </div>
              
              {/* Leaflet Heat Map */}
              <div className="relative">
                <div id="heatmap" className="w-full h-96"></div>
                
                {/* Professional Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg px-3 py-2 border border-gray-200" style={{zIndex: 9999}}>
                  <div className="text-xs font-semibold text-gray-800 mb-1">{metrics.find(m => m.key === selectedMetric)?.label}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">Low</span>
                    <div className="w-16 h-2 bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-600 rounded-full"></div>
                    <span className="text-xs text-gray-600">High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Area Details */}
          <div className="space-y-6">
            {selectedArea ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedArea.area}</h3>
                <div className="space-y-4">
                  {metrics.map(metric => {
                    const Icon = metric.icon
                    const value = getMetricValue(selectedArea, metric.key)
                    return (
                      <div key={metric.key} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{metric.label}</span>
                        </div>
                        <span className="font-medium text-gray-900">
                          {metric.unit}{value}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Area Details</h3>
                <p className="text-gray-500 text-center py-8">
                  Click on an area in the heat map to view detailed information
                </p>
              </div>
            )}

            {/* Top Performing Areas */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Areas</h3>
              <div className="space-y-3">
                {heatMapData
                  .sort((a, b) => getMetricValue(b, selectedMetric) - getMetricValue(a, selectedMetric))
                  .slice(0, 5)
                  .map((area, index) => {
                    const metric = metrics.find(m => m.key === selectedMetric)
                    const value = getMetricValue(area, selectedMetric)
                    return (
                      <div key={area.area} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </span>
                          <span className="text-sm text-gray-700">{area.area}</span>
                        </div>
                        <span className="font-medium text-gray-900">
                          {metric?.unit}{value}
                        </span>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeatMap