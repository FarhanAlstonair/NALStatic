import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, MapPin, Filter, SlidersHorizontal, Map, List, Star } from 'lucide-react'

const PropertySearch = () => {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [viewMode, setViewMode] = useState('list')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [map, setMap] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  const propertyLocations = [
    { lat: 12.9352, lng: 77.6245, title: 'Koramangala Property', price: '₹1.8Cr' },
    { lat: 12.9784, lng: 77.6408, title: 'Indiranagar Property', price: '₹2.2Cr' },
    { lat: 12.9698, lng: 77.7500, title: 'Whitefield Property', price: '₹2.8Cr' },
    { lat: 12.9116, lng: 77.6473, title: 'HSR Layout Property', price: '₹2.5Cr' }
  ]

  useEffect(() => {
    if (viewMode === 'map' && !map) {
      initializeMap()
    }
  }, [viewMode])

  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchQuery(query)
      performSearch(query)
    }
  }, [searchParams])

  const performSearch = (query) => {
    const properties = [
      { id: 1, title: '3BHK Luxury Apartment', location: 'Koramangala, Bangalore', price: '₹1.8 Cr', type: 'sale', image: 'https://imagecdn.99acres.com/media1/32690/10/653810107M-1759080334729.jpg', riblScore: 'A+', urgentSale: true },
      { id: 2, title: '2BHK Modern Flat', location: 'Indiranagar, Bangalore', price: '₹35,000/month', type: 'rent', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop', riblScore: 'A' },
      { id: 3, title: 'Commercial Office Space', location: 'Whitefield, Bangalore', price: '₹85,000/month', type: 'lease', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop', riblScore: 'B' },
      { id: 4, title: '4BHK Villa', location: 'HSR Layout, Bangalore', price: '₹2.8 Cr', type: 'sale', image: 'https://th.bing.com/th/id/OIP.DCE_Nl83XmL1WHvbnMojzgHaFW?w=255&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', riblScore: 'A+', urgentSale: true },
      { id: 5, title: '1BHK Studio Apartment', location: 'Koramangala, Bangalore', price: '₹22,000/month', type: 'rent', image: 'https://th.bing.com/th/id/OIP.qCo-AOmEyzwUOH8O1kz2cAHaJ4?w=127&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', riblScore: 'C' },
      { id: 6, title: 'Retail Shop Space', location: 'Indiranagar, Bangalore', price: '₹65,000/month', type: 'lease', image: 'https://th.bing.com/th/id/OIP.WYXsH91kA9H_9L8ZMApRLgHaE8?w=285&h=190&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', riblScore: 'D' },
      { id: 7, title: 'Penthouse Suite', location: 'Marathahalli, Bangalore', price: '₹3.5 Cr', type: 'sale', image: 'https://th.bing.com/th/id/OIP.luenMWzwU7wouNGkU1D9SAHaEK?w=328&h=185&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', riblScore: 'A+', urgentSale: true },
      { id: 8, title: 'Duplex Villa', location: 'Bannerghatta, Bangalore', price: '₹1.9 Cr', type: 'sale', image: 'https://th.bing.com/th/id/OIP.pzVNwqIJUEXycMbtiCXtDgHaEA?w=298&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', riblScore: 'A' },
      { id: 9, title: 'Modern Office Complex', location: 'Electronic City, Bangalore', price: '₹120,000/month', type: 'lease', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop', riblScore: 'B' },
      { id: 10, title: '5BHK Independent House', location: 'Rajajinagar, Bangalore', price: '₹4.2 Cr', type: 'sale', image: 'https://th.bing.com/th/id/OIP.Hi6q8O0PC-rB_utEoTXUzQHaEN?w=311&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', riblScore: 'A+' },
      { id: 11, title: '2BHK Service Apartment', location: 'MG Road, Bangalore', price: '₹45,000/month', type: 'rent', image: 'https://imagecdn.99acres.com/media1/26520/11/530411005M-1755137433691.jpg', riblScore: 'A' },
      { id: 12, title: 'Warehouse Space', location: 'Peenya, Bangalore', price: '₹95,000/month', type: 'lease', image: 'https://imagecdn.99acres.com/media1/31234/8/624688851M-1753691189396.jpg', riblScore: 'C' },
      { id: 13, title: '3BHK Luxury Condo', location: 'Bellandur, Bangalore', price: '₹2.6 Cr', type: 'sale', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop', riblScore: 'A+' },
      { id: 14, title: '1BHK Compact Home', location: 'Bommanahalli, Bangalore', price: '₹18,000/month', type: 'rent', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop', riblScore: 'B' },
      { id: 15, title: 'Commercial Plot', location: 'Sarjapur Road, Bangalore', price: '₹1.8 Cr', type: 'sale', image: 'https://images.unsplash.com/photo-1590725140246-20acdee442be?w=400&h=300&fit=crop', riblScore: 'B' },
      { id: 16, title: '4BHK Terrace House', location: 'Jayanagar, Bangalore', price: '₹3.1 Cr', type: 'sale', image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&h=300&fit=crop', riblScore: 'A', urgentSale: true },
      { id: 17, title: '2BHK Garden Apartment', location: 'Banashankari, Bangalore', price: '₹28,000/month', type: 'rent', image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/736414796.jpg?k=3afde184481bd835cf71b2ba9ccbd83a3e31031a382cdd18ddc6f1814b64bfd4&o=&hp=1', riblScore: 'A' },
      { id: 18, title: 'Executive Office Suite', location: 'UB City Mall, Bangalore', price: '₹150,000/month', type: 'lease', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop', riblScore: 'A+' }
    ]
    
    const filtered = properties.filter(property => 
      property.title.toLowerCase().includes(query.toLowerCase()) ||
      property.location.toLowerCase().includes(query.toLowerCase()) ||
      property.type.toLowerCase().includes(query.toLowerCase())
    )
    
    setSearchResults(filtered)
  }

  const initializeMap = () => {
    if (window.google) {
      const mapInstance = new window.google.maps.Map(document.getElementById('google-map'), {
        zoom: 6,
        center: { lat: 12.9716, lng: 77.5946 }, // Center of Bangalore
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      })

      // Add property markers
      propertyLocations.forEach(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: mapInstance,
          title: location.title,
          icon: {
            url: 'data:image/svg+xml;base64,' + btoa(`
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#3b82f6" stroke="white" stroke-width="3"/>
                <text x="20" y="25" text-anchor="middle" fill="white" font-size="12" font-weight="bold">₹</text>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(40, 40)
          }
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; font-family: Inter, sans-serif;">
              <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600;">${location.title}</h3>
              <p style="margin: 0; color: #3b82f6; font-weight: 600;">${location.price}</p>
              <button style="margin-top: 8px; padding: 4px 12px; background: #3b82f6; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">View Details</button>
            </div>
          `
        })

        marker.addListener('click', () => {
          infoWindow.open(mapInstance, marker)
        })
      })

      setMap(mapInstance)
    }
  }

  const [filters, setFilters] = useState({
    propertyType: 'all',
    transactionType: 'all',
    priceRange: [0, 10000000],
    bedrooms: 'any',
    bathrooms: 'any',
    area: [0, 5000],
    amenities: [],
    verified: false
  })

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'office', label: 'Office' },
    { value: 'shop', label: 'Shop' },
    { value: 'warehouse', label: 'Warehouse' }
  ]

  const transactionTypes = [
    { value: 'all', label: 'All' },
    { value: 'sale', label: 'Sale' },
    { value: 'rent', label: 'Rent' },
    { value: 'lease', label: 'Lease' }
  ]

  const amenities = [
    'Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden', 
    'Elevator', 'Power Backup', 'Water Supply', 'Internet', 'AC'
  ]

  const popularSearches = [
    '3BHK in Koramangala',
    '2BHK for rent in Indiranagar',
    'Office space in Whitefield',
    'Villa in HSR Layout',
    'Commercial space in Koramangala'
  ]

  const recentSearches = [
    'Apartment in Koramangala',
    'Office in Whitefield',
    '2BHK in Indiranagar'
  ]

  const searchSuggestions = [
    { type: 'location', text: 'Koramangala, Bangalore', count: '856 properties' },
    { type: 'location', text: 'Indiranagar, Bangalore', count: '742 properties' },
    { type: 'location', text: 'Whitefield, Bangalore', count: '623 properties' },
    { type: 'location', text: 'HSR Layout, Bangalore', count: '489 properties' },
    { type: 'property', text: '3BHK Apartment', count: '1,245 properties' },
    { type: 'property', text: 'Commercial Office', count: '367 properties' }
  ]

  return (
    <>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Find Your Perfect Property
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Search through thousands of verified properties with our intelligent search engine
        </p>
      </div>

      {/* Search Bar */}
      <div className="card mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by location, property type, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              value={filters.propertyType}
              onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
              className="input-field w-auto"
            >
              {propertyTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            
            <select 
              value={filters.transactionType}
              onChange={(e) => setFilters({...filters, transactionType: e.target.value})}
              className="input-field w-auto"
            >
              {transactionTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            
            <button onClick={() => performSearch(searchQuery)} className="btn-primary">
              <Search className="w-4 h-4 mr-2" />
              Search
            </button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="btn-secondary text-sm"
          >
            <SlidersHorizontal className="w-4 h-4 mr-1" />
            Advanced Filters
          </button>
          
          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700">
            Verified Only
          </button>
          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700">
            High RIBL Score
          </button>
          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700">
            Recently Added
          </button>
          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700">
            Price Drop
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Filters</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  value={filters.priceRange[1]}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹0</span>
                  <span>₹{(filters.priceRange[1] / 100000).toFixed(0)}L</span>
                </div>
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>
              <select 
                value={filters.bedrooms}
                onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                className="input-field"
              >
                <option value="any">Any</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bathrooms
              </label>
              <select 
                value={filters.bathrooms}
                onChange={(e) => setFilters({...filters, bathrooms: e.target.value})}
                className="input-field"
              >
                <option value="any">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </div>

            {/* Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area (sq ft)
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={filters.area[1]}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0</span>
                  <span>{filters.area[1]} sq ft</span>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {amenities.map(amenity => (
                <label key={amenity} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button className="btn-secondary">Clear All</button>
            <button className="btn-primary">Apply Filters</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Popular Searches */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Popular Searches
            </h3>
            <div className="space-y-2">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(search)
                    performSearch(search)
                  }}
                  className="block w-full text-left text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 px-2 py-1 rounded"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Searches */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Searches
            </h3>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="block w-full text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Search Tips */}
          <div className="card bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Search Tips
            </h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Use specific location names for better results</li>
              <li>• Try different property types</li>
              <li>• Use filters to narrow down options</li>
              <li>• Check verified properties first</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* View Toggle */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Search Suggestions
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-md ${viewMode === 'map' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Map className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Search Results for "{searchQuery}" ({searchResults.length} found)
              </h3>
              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((property) => (
                    <div key={property.id} className="card hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <img
                          src={property.images?.[0] || property.image}
                          alt={property.title}
                          className="w-20 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{property.title}</h4>
                          <div className="flex items-center text-gray-600 text-sm mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {property.location}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                              <span className={`text-lg font-bold ${property.urgentSale ? 'text-red-600' : 'text-primary-600'}`}>{property.price}</span>
                              {property.urgentSale && (
                                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                                  Urgent Sale
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                property.riblScore === 'A+' ? 'bg-green-100 text-green-800' :
                                property.riblScore === 'A' ? 'bg-blue-100 text-blue-800' :
                                property.riblScore === 'B' ? 'bg-yellow-100 text-yellow-800' :
                                property.riblScore === 'C' ? 'bg-orange-100 text-orange-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                RIBL: {property.riblScore}
                              </span>
                              <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs capitalize">
                                {property.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Link to={`/property/${property.id}`} className="btn-secondary text-sm">
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No properties found for "{searchQuery}"</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('')
                      setSearchResults([])
                    }}
                    className="btn-secondary"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Search Suggestions */}
          {!searchQuery && (
            <div className="space-y-4">
              {searchSuggestions.map((suggestion, index) => (
                <div key={index} className="card hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        suggestion.type === 'location' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {suggestion.type === 'location' ? (
                          <MapPin className={`w-5 h-5 ${suggestion.type === 'location' ? 'text-green-600' : 'text-blue-600'}`} />
                        ) : (
                          <Star className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{suggestion.text}</h3>
                        <p className="text-sm text-gray-600">{suggestion.count}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setSearchQuery(suggestion.text)
                        performSearch(suggestion.text)
                      }}
                      className="btn-secondary text-sm"
                    >
                      Search
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Google Maps View */}
          {viewMode === 'map' && (
            <div className="card mt-6">
              <div id="google-map" className="h-96 rounded-lg"></div>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  )
}

export default PropertySearch