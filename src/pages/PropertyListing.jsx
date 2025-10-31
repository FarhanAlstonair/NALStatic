import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Bed, Bath, Square, Heart, Share2, Filter, MessageCircle } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'

const PropertyListing = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('newest')
  const [filters, setFilters] = useState({
    location: '',
    priceRange: '',
    bedrooms: '',
    riblScore: ''
  })
  const [visibleProperties, setVisibleProperties] = useState(8)
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])
  const mapRef = useRef(null)
  const { toggleFavorite, isFavorite } = useFavorites()

  const [allProperties] = useState([
    {
      id: 1,
      title: '3BHK Luxury Apartment',
      location: 'Koramangala, Bangalore',
      price: '₹1.8 Cr',
      type: 'sale',
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      image: 'https://imagecdn.99acres.com/media1/32690/10/653810107M-1759080334729.jpg',
      verified: true,
      riblScore: 'A+',
      urgentSale: true,
      originalPrice: '₹2.2 Cr',
      lat: 12.9352,
      lng: 77.6245,
      whatsapp: '+91 98765 43210'
    },
    {
      id: 2,
      title: '2BHK Modern Flat',
      location: 'Indiranagar, Bangalore',
      price: '₹35,000/month',
      type: 'rent',
      bedrooms: 2,
      bathrooms: 2,
      area: 950,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
      verified: true,
      riblScore: 'A',
      lat: 12.9784,
      lng: 77.6408,
      whatsapp: '+91 87654 32109'
    },
    {
      id: 3,
      title: 'Commercial Office Space',
      location: 'Whitefield, Bangalore',
      price: '₹85,000/month',
      type: 'lease',
      bedrooms: 0,
      bathrooms: 2,
      area: 800,
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop',
      verified: false,
      riblScore: 'B',
      lat: 12.9698,
      lng: 77.7500,
      whatsapp: '+91 76543 21098'
    },
    {
      id: 4,
      title: '4BHK Villa',
      location: 'HSR Layout, Bangalore',
      price: '₹2.8 Cr',
      type: 'sale',
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      image: 'https://th.bing.com/th/id/OIP.DCE_Nl83XmL1WHvbnMojzgHaFW?w=255&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      verified: true,
      riblScore: 'A+',
      urgentSale: true,
      originalPrice: '₹3.2 Cr',
      lat: 12.9116,
      lng: 77.6473,
      whatsapp: '+91 65432 10987'
    },
    {
      id: 5,
      title: '1BHK Studio Apartment',
      location: 'Koramangala, Bangalore',
      price: '₹22,000/month',
      type: 'rent',
      bedrooms: 1,
      bathrooms: 1,
      area: 450,
      image: 'https://th.bing.com/th/id/OIP.qCo-AOmEyzwUOH8O1kz2cAHaJ4?w=127&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      verified: true,
      riblScore: 'C',
      lat: 12.8440,
      lng: 77.6630,
      whatsapp: '+91 54321 09876'
    },
    {
      id: 6,
      title: 'Retail Shop Space',
      location: 'Indiranagar, Bangalore',
      price: '₹65,000/month',
      type: 'lease',
      bedrooms: 0,
      bathrooms: 1,
      area: 300,
      image: 'https://th.bing.com/th/id/OIP.WYXsH91kA9H_9L8ZMApRLgHaE8?w=285&h=190&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      verified: false,
      riblScore: 'D',
      lat: 12.9784,
      lng: 77.6408,
      whatsapp: '+91 43210 98765'
    },
    {
      id: 7,
      title: '3BHK Premium Flat',
      location: 'Whitefield, Bangalore',
      price: '₹2.2 Cr',
      type: 'sale',
      bedrooms: 3,
      bathrooms: 3,
      area: 1400,
      image: 'https://imagecdn.99acres.com/media1/32862/1/657241213M-1759769061882.jpg',
      verified: true,
      riblScore: 'A',
      lat: 12.9698,
      lng: 77.7500,
      whatsapp: '+91 32109 87654'
    },
    {
      id: 8,
      title: '2BHK Garden View',
      location: 'HSR Layout, Bangalore',
      price: '₹28,000/month',
      type: 'rent',
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/736414796.jpg?k=3afde184481bd835cf71b2ba9ccbd83a3e31031a382cdd18ddc6f1814b64bfd4&o=&hp=1',
      verified: true,
      riblScore: 'A',
      lat: 12.9116,
      lng: 77.6473,
      whatsapp: '+91 21098 76543'
    }
  ])

  const properties = allProperties.slice(0, visibleProperties)

  useEffect(() => {
    const initMap = () => {
      if (window.google && mapRef.current) {
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          zoom: 11,
          center: { lat: 12.9716, lng: 77.5946 }
        })
        setMap(mapInstance)
        
        // Add markers for properties
        properties.forEach(property => {
          if (property.lat && property.lng) {
            const marker = new window.google.maps.Marker({
              position: { lat: property.lat, lng: property.lng },
              map: mapInstance,
              title: property.title
            })
            
            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div style="padding: 8px; max-width: 200px;">
                  <h4>${property.title}</h4>
                  <p>${property.location}</p>
                  <p><strong>${property.price}</strong></p>
                  <p>RIBL: ${property.riblScore}</p>
                </div>
              `
            })
            
            marker.addListener('click', () => {
              infoWindow.open(mapInstance, marker)
            })
          }
        })
      }
    }
    
    const timer = setTimeout(() => {
      if (window.google) {
        initMap()
      }
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [properties])

  const tabs = [
    { id: 'all', label: 'All Properties', count: properties.length },
    { id: 'sale', label: 'For Sale', count: properties.filter(p => p.type === 'sale').length },
    { id: 'rent', label: 'For Rent', count: properties.filter(p => p.type === 'rent').length },
    { id: 'lease', label: 'For Lease', count: properties.filter(p => p.type === 'lease').length },
    { id: 'urgent', label: 'Urgent Sale', count: properties.filter(p => p.urgentSale).length }
  ]

  const getFilteredAndSortedProperties = () => {
    let filtered = activeTab === 'all' 
      ? properties 
      : activeTab === 'urgent'
      ? properties.filter(property => property.urgentSale)
      : properties.filter(property => property.type === activeTab)
    
    // Apply filters
    if (filters.location) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }
    
    if (filters.priceRange) {
      filtered = filtered.filter(property => {
        const price = parseFloat(property.price.replace(/[^\d.]/g, ''))
        switch (filters.priceRange) {
          case 'under-50l': return price < 50
          case '50l-1cr': return price >= 50 && price <= 100
          case '1cr-2cr': return price > 100 && price <= 200
          case 'above-2cr': return price > 200
          default: return true
        }
      })
    }
    
    if (filters.bedrooms) {
      filtered = filtered.filter(property => {
        if (filters.bedrooms === '4+') return property.bedrooms >= 4
        return property.bedrooms.toString() === filters.bedrooms
      })
    }
    
    if (filters.riblScore) {
      filtered = filtered.filter(property => {
        switch (filters.riblScore) {
          case 'A+': return property.riblScore === 'A+'
          case 'A': return property.riblScore === 'A'
          case 'B': return property.riblScore === 'B'
          case 'C': return property.riblScore === 'C'
          case 'D': return property.riblScore === 'D'
          default: return true
        }
      })
    }
    
    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price.replace(/[^\d.]/g, '')) - parseFloat(b.price.replace(/[^\d.]/g, ''))
        case 'price-high':
          return parseFloat(b.price.replace(/[^\d.]/g, '')) - parseFloat(a.price.replace(/[^\d.]/g, ''))
        case 'ribl-score':
          const scoreOrder = { 'A+': 5, 'A': 4, 'B': 3, 'C': 2, 'D': 1 }
          return scoreOrder[b.riblScore] - scoreOrder[a.riblScore]
        case 'newest':
        default:
          return b.id - a.id
      }
    })
    
    return sorted
  }
  
  const filteredProperties = getFilteredAndSortedProperties()
  
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
  }
  
  const clearFilters = () => {
    setFilters({
      location: '',
      priceRange: '',
      bedrooms: '',
      riblScore: ''
    })
  }

  const PropertyCard = ({ property }) => (
    <div className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex space-x-2">
          {property.verified && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Verified
            </span>
          )}
          {property.urgentSale && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
              Urgent Sale
            </span>
          )}
          <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium capitalize">
            {property.type}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex space-x-2">
          <button 
            onClick={() => toggleFavorite(property)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all duration-200 hover:scale-110"
          >
            <Heart className={`w-4 h-4 transition-all duration-200 ${isFavorite(property.id) ? 'text-red-500 fill-red-500 scale-110' : 'text-gray-600 hover:text-red-400'}`} />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all duration-200 hover:scale-110">
            <Share2 className="w-4 h-4 text-gray-600 hover:text-primary-600 transition-colors duration-200" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {property.location}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {property.urgentSale && property.originalPrice && (
              <div className="text-sm text-gray-500 line-through">{property.originalPrice}</div>
            )}
            <div className={`text-2xl font-bold ${property.urgentSale ? 'text-red-600' : 'text-primary-600'}`}>
              {property.price}
            </div>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <span>RIBL Score:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              property.riblScore === 'A+' ? 'bg-green-100 text-green-800' :
              property.riblScore === 'A' ? 'bg-blue-100 text-blue-800' :
              property.riblScore === 'B' ? 'bg-yellow-100 text-yellow-800' :
              property.riblScore === 'C' ? 'bg-orange-100 text-orange-800' :
              'bg-red-100 text-red-800'
            }`}>
              {property.riblScore}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600">
          {property.bedrooms > 0 && (
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              {property.bedrooms} Bed
            </div>
          )}
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            {property.bathrooms} Bath
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            {property.area} sq ft
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <Link to={`/property/${property.id}`} className="flex-1 btn-primary text-sm py-2 text-center hover:scale-105 transition-transform duration-200">
            View Details
          </Link>
          <a 
            href={`https://wa.me/${property.whatsapp?.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in ${property.title} - ${property.price}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors hover:scale-105 duration-200"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Property Listings
          </h1>
          <p className="text-lg text-gray-600">
            Discover verified properties for sale, rent, and lease
          </p>
        </div>
        <Link to="/post-property" className="btn-primary mt-4 sm:mt-0 hover:scale-105 transition-all duration-200 hover:shadow-lg">
          Post Property
        </Link>
      </div>

      {/* Tabs and Controls */}
      <div className="card mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <select 
              className="input-field w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Sort by: Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="ribl-score">RIBL Score</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary hover:scale-105 transition-all duration-200 hover:shadow-md"
            >
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="card mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select 
                className="input-field"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <option value="">All Areas</option>
                <option value="koramangala">Koramangala</option>
                <option value="indiranagar">Indiranagar</option>
                <option value="whitefield">Whitefield</option>
                <option value="hsr">HSR Layout</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select 
                className="input-field"
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              >
                <option value="">Any Price</option>
                <option value="under-50l">Under ₹50L</option>
                <option value="50l-1cr">₹50L - ₹1Cr</option>
                <option value="1cr-2cr">₹1Cr - ₹2Cr</option>
                <option value="above-2cr">Above ₹2Cr</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>
              <select 
                className="input-field"
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
              >
                <option value="">Any</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4+">4+ BHK</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                RIBL Score
              </label>
              <select 
                className="input-field"
                value={filters.riblScore}
                onChange={(e) => handleFilterChange('riblScore', e.target.value)}
              >
                <option value="">Any Score</option>
                <option value="A+">A+ (Excellent)</option>
                <option value="A">A (Very Good)</option>
                <option value="B">B (Good)</option>
                <option value="C">C (Fair)</option>
                <option value="D">D (Poor)</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button onClick={clearFilters} className="btn-secondary hover:scale-105 transition-transform duration-200">Clear All</button>
            <button onClick={() => setShowFilters(false)} className="btn-primary hover:scale-105 transition-transform duration-200">Apply Filters</button>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredProperties.length} properties
        </p>
      </div>

      {/* Map and Properties Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Google Map - Left Side (2/3 width) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Property Locations</h3>
              <p className="text-sm text-gray-600">Click on markers to view property details</p>
            </div>
            <div ref={mapRef} className="w-full h-[600px]"></div>
          </div>
        </div>
        
        {/* Properties List - Right Side (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Properties ({filteredProperties.length})</h3>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              <div className="space-y-4 p-4">
                {filteredProperties.map(property => (
                  <div key={property.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex gap-3">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm truncate">{property.title}</h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span className="truncate">{property.location}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className={`text-sm font-bold ${property.urgentSale ? 'text-red-600' : 'text-primary-600'}`}>
                            {property.price}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            property.riblScore === 'A+' ? 'bg-green-100 text-green-800' :
                            property.riblScore === 'A' ? 'bg-blue-100 text-blue-800' :
                            property.riblScore === 'B' ? 'bg-yellow-100 text-yellow-800' :
                            property.riblScore === 'C' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {property.riblScore}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Link 
                            to={`/property/${property.id}`} 
                            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-xs py-2 px-3 rounded-lg text-center transition-colors"
                          >
                            View Details
                          </Link>
                          <a 
                            href={`https://wa.me/${property.whatsapp?.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in ${property.title} - ${property.price}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                          >
                            <MessageCircle className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Load More */}
      {visibleProperties < allProperties.length && (
        <div className="text-center mt-8">
          <button 
            onClick={() => setVisibleProperties(prev => Math.min(prev + 6, allProperties.length))}
            className="btn-secondary hover:scale-105 transition-all duration-200 hover:shadow-lg"
          >
            Load More Properties ({allProperties.length - visibleProperties} remaining)
          </button>
        </div>
      )}
    </div>
  )
}

export default PropertyListing