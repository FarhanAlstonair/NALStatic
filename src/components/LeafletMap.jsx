import { useEffect, useRef } from 'react'

const LeafletMap = ({ properties }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    const initMap = async () => {
      if (typeof window !== 'undefined' && mapRef.current && !mapInstanceRef.current) {
        // Dynamically import Leaflet to avoid SSR issues
        const L = (await import('leaflet')).default
        
        // Import CSS
        await import('leaflet/dist/leaflet.css')
        
        // Fix default markers
        delete L.Icon.Default.prototype._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
        })

        // Create map
        mapInstanceRef.current = L.map(mapRef.current).setView([12.9716, 77.5946], 11)
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstanceRef.current)

        // Add markers
        properties.forEach(property => {
          if (property.lat && property.lng) {
            const marker = L.marker([property.lat, property.lng]).addTo(mapInstanceRef.current)
            
            marker.bindPopup(`
              <div style="max-width: 200px;">
                <img src="${property.images[0]}" style="width: 100%; height: 80px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;" />
                <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600;">${property.title}</h4>
                <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${property.location}</p>
                <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700;">${property.price}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
                  <span>${property.bedrooms}BHK • ${property.area} sq ft</span>
                  <span style="background: #e5e7eb; padding: 2px 6px; border-radius: 4px;">RIBL ${property.riblScore}</span>
                </div>
              </div>
            `)
          }
        })
      }
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [properties])

  return <div ref={mapRef} className="w-full h-[540px]" />
}

export default LeafletMap