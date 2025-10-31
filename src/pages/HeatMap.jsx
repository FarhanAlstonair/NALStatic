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
    
    // Initialize Google Map
    if (window.google) {
      initializeMap(data)
    } else {
      // Wait for Google Maps to load
      const checkGoogle = setInterval(() => {
        if (window.google) {
          clearInterval(checkGoogle)
          initializeMap(data)
        }
      }, 100)
    }
  }, [])

  useEffect(() => {
    if (window.google && heatMapData.length > 0) {
      updateHeatMap()
    }
  }, [selectedMetric])

  const initializeMap = (data) => {
    const map = new window.google.maps.Map(document.getElementById('heatmap'), {
      zoom: 11,
      center: { lat: 12.9716, lng: 77.5946 }, // Bangalore center
      mapTypeId: 'roadmap',
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    })

    window.heatMapInstance = map
    updateHeatMap()
  }

  const updateHeatMap = () => {
    if (!window.google || !window.heatMapInstance) return

    // Clear existing overlays
    if (window.heatMapOverlays) {
      window.heatMapOverlays.forEach(overlay => overlay.setMap(null))
    }
    window.heatMapOverlays = []

    heatMapData.forEach(area => {
      const value = getMetricValue(area, selectedMetric)
      const intensity = getIntensity(value, selectedMetric)
      
      // Create circle overlay
      const circle = new window.google.maps.Circle({
        strokeColor: getCircleColor(intensity),
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: getCircleColor(intensity),
        fillOpacity: 0.35,
        map: window.heatMapInstance,
        center: { lat: area.lat, lng: area.lng },
        radius: 2000 + (intensity * 3000) // Dynamic radius based on intensity
      })

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-3">
            <h3 class="font-semibold text-gray-900 mb-2">${area.area}</h3>
            <div class="space-y-1 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Price/sq ft:</span>
                <span class="font-medium">₹${area.price}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Demand:</span>
                <span class="font-medium">${area.demand}%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Growth:</span>
                <span class="font-medium">${area.growth}%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Properties:</span>
                <span class="font-medium">${area.properties}</span>
              </div>
            </div>
          </div>
        `
      })

      circle.addListener('click', () => {
        infoWindow.open(window.heatMapInstance, {
          position: { lat: area.lat, lng: area.lng }
        })
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
    if (intensity < 0.3) return '#3B82F6' // Blue for low
    if (intensity < 0.7) return '#F59E0B' // Orange for medium
    return '#EF4444' // Red for high
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
              
              {/* Google Maps Heat Map */}
              <div className="relative">
                <div id="heatmap" className="w-full h-96"></div>
                
                {/* Map Controls */}
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                  <div className="text-xs font-medium text-gray-700 mb-2">Heat Map Legend</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-500">Low</span>
                    <div className="w-16 h-3 bg-gradient-to-r from-blue-400 to-red-500 rounded"></div>
                    <span className="text-xs text-gray-500">High</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    <strong>Showing:</strong> {metrics.find(m => m.key === selectedMetric)?.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Click circles for details
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