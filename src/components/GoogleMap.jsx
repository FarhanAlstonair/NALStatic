import { useEffect, useRef } from 'react'

const GoogleMap = ({ heatMapData, selectedMetric }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const heatmapRef = useRef(null)

  useEffect(() => {
    const initMap = () => {
      if (!window.google || !mapRef.current) return

      // Initialize map centered on Bangalore
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        zoom: 11,
        center: { lat: 12.9716, lng: 77.5946 },
        mapTypeId: 'roadmap',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      })

      updateHeatmap()
    }

    const updateHeatmap = () => {
      if (!window.google || !mapInstanceRef.current) return

      // Clear existing heatmap
      if (heatmapRef.current) {
        heatmapRef.current.setMap(null)
      }

      // Create heatmap data points
      const heatmapData = [
        { location: new window.google.maps.LatLng(12.9352, 77.6245), weight: getWeight('Koramangala') },
        { location: new window.google.maps.LatLng(12.9719, 77.6412), weight: getWeight('Indiranagar') },
        { location: new window.google.maps.LatLng(12.9698, 77.7500), weight: getWeight('Whitefield') },
        { location: new window.google.maps.LatLng(12.9082, 77.6476), weight: getWeight('HSR Layout') },
        { location: new window.google.maps.LatLng(12.8456, 77.6603), weight: getWeight('Electronic City') },
        { location: new window.google.maps.LatLng(12.9591, 77.6974), weight: getWeight('Marathahalli') },
        { location: new window.google.maps.LatLng(12.9250, 77.5667), weight: getWeight('Banashankari') },
        { location: new window.google.maps.LatLng(12.9279, 77.5937), weight: getWeight('Jayanagar') }
      ]

      // Create heatmap
      heatmapRef.current = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: mapInstanceRef.current,
        radius: 50,
        opacity: 0.8
      })

      // Add markers for each area
      heatMapData.forEach(area => {
        const marker = new window.google.maps.Marker({
          position: { lat: area.lat, lng: area.lng },
          map: mapInstanceRef.current,
          title: area.area,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#3b82f6',
            fillOpacity: 0.8,
            strokeColor: '#ffffff',
            strokeWeight: 2
          }
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-semibold text-gray-900">${area.area}</h3>
              <p class="text-sm text-gray-600">
                ${selectedMetric === 'price' ? `₹${area.price}/sq ft` :
                  selectedMetric === 'demand' ? `${area.demand}% demand` :
                  selectedMetric === 'growth' ? `${area.growth}% growth` :
                  `${area.properties} properties`}
              </p>
            </div>
          `
        })

        marker.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, marker)
        })
      })
    }

    const getWeight = (areaName) => {
      const area = heatMapData.find(a => a.area === areaName)
      if (!area) return 1

      switch (selectedMetric) {
        case 'price':
          return area.price / 10000
        case 'demand':
          return area.demand / 100
        case 'growth':
          return area.growth / 25
        case 'properties':
          return area.properties / 350
        default:
          return 1
      }
    }

    // Load Google Maps API if not already loaded
    if (!window.google) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=visualization&callback=initMap`
      script.async = true
      script.defer = true
      window.initMap = initMap
      document.head.appendChild(script)
    } else {
      initMap()
    }

    return () => {
      if (heatmapRef.current) {
        heatmapRef.current.setMap(null)
      }
    }
  }, [heatMapData, selectedMetric])

  return <div ref={mapRef} className="w-full h-96 rounded-lg" />
}

export default GoogleMap