import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Bed, Bath, Square, Heart, Share2, Filter } from 'lucide-react'
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
  const { toggleFavorite, isFavorite } = useFavorites()

  const properties = [
    {
      id: 1,
      title: '3BHK Luxury Apartment',
      location: 'Koramangala, Bangalore',
      price: '₹1.8 Cr',
      type: 'sale',
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      verified: true,
      riblScore: 85
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
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
      verified: true,
      riblScore: 78
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
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
      verified: false,
      riblScore: 72
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
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      verified: true,
      riblScore: 92
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
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      verified: true,
      riblScore: 68
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
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      verified: false,
      riblScore: 65
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
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      verified: true,
      riblScore: 88
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
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
      verified: true,
      riblScore: 82
    }
  ]

  const tabs = [
    { id: 'all', label: 'All Properties', count: properties.length },
    { id: 'sale', label: 'For Sale', count: properties.filter(p => p.type === 'sale').length },
    { id: 'rent', label: 'For Rent', count: properties.filter(p => p.type === 'rent').length },
    { id: 'lease', label: 'For Lease', count: properties.filter(p => p.type === 'lease').length }
  ]

  const getFilteredAndSortedProperties = () => {
    let filtered = activeTab === 'all' 
      ? properties 
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
          case '80+': return property.riblScore >= 80
          case '70-79': return property.riblScore >= 70 && property.riblScore < 80
          case '60-69': return property.riblScore >= 60 && property.riblScore < 70
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
          return b.riblScore - a.riblScore
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
          <div className="text-2xl font-bold text-primary-600">
            {property.price}
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <span>RIBL Score:</span>
            <span className={`font-medium ${
              property.riblScore >= 80 ? 'text-green-600' : 
              property.riblScore >= 70 ? 'text-yellow-600' : 'text-red-600'
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
          <button className="flex-1 btn-secondary text-sm py-2 hover:scale-105 transition-transform duration-200">
            Contact Owner
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <Filter className="w-4 h-4 mr-2" />
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
                <option value="80+">80+ (Excellent)</option>
                <option value="70-79">70-79 (Good)</option>
                <option value="60-69">60-69 (Fair)</option>
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

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="btn-secondary hover:scale-105 transition-all duration-200 hover:shadow-lg">
          Load More Properties
        </button>
      </div>
    </div>
  )
}

export default PropertyListing