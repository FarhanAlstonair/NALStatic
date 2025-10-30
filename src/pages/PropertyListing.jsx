import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Bed, Bath, Square, Heart, Share2, Filter } from 'lucide-react'

const PropertyListing = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const properties = [
    {
      id: 1,
      title: '3BHK Luxury Apartment',
      location: 'Bandra West, Mumbai',
      price: '₹2.5 Cr',
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
      location: 'Koramangala, Bangalore',
      price: '₹45,000/month',
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
      location: 'Cyber City, Gurgaon',
      price: '₹1.2 Cr',
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
      location: 'Whitefield, Bangalore',
      price: '₹3.8 Cr',
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
      location: 'Andheri East, Mumbai',
      price: '₹28,000/month',
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
      location: 'Connaught Place, Delhi',
      price: '₹80,000/month',
      type: 'lease',
      bedrooms: 0,
      bathrooms: 1,
      area: 300,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      verified: false,
      riblScore: 65
    }
  ]

  const tabs = [
    { id: 'all', label: 'All Properties', count: properties.length },
    { id: 'sale', label: 'For Sale', count: properties.filter(p => p.type === 'sale').length },
    { id: 'rent', label: 'For Rent', count: properties.filter(p => p.type === 'rent').length },
    { id: 'lease', label: 'For Lease', count: properties.filter(p => p.type === 'lease').length }
  ]

  const filteredProperties = activeTab === 'all' 
    ? properties 
    : properties.filter(property => property.type === activeTab)

  const PropertyCard = ({ property }) => (
    <div className="card hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
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
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
            <Share2 className="w-4 h-4 text-gray-600" />
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
          <Link to={`/property/${property.id}`} className="flex-1 btn-primary text-sm py-2 text-center">
            View Details
          </Link>
          <button className="flex-1 btn-secondary text-sm py-2">
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
        <button className="btn-primary mt-4 sm:mt-0">
          Post Property
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between mb-6">
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

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn-secondary"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="card mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select className="input-field">
                <option>All Locations</option>
                <option>Mumbai</option>
                <option>Bangalore</option>
                <option>Delhi</option>
                <option>Gurgaon</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select className="input-field">
                <option>Any Price</option>
                <option>Under ₹50L</option>
                <option>₹50L - ₹1Cr</option>
                <option>₹1Cr - ₹2Cr</option>
                <option>Above ₹2Cr</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>
              <select className="input-field">
                <option>Any</option>
                <option>1 BHK</option>
                <option>2 BHK</option>
                <option>3 BHK</option>
                <option>4+ BHK</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                RIBL Score
              </label>
              <select className="input-field">
                <option>Any Score</option>
                <option>80+ (Excellent)</option>
                <option>70-79 (Good)</option>
                <option>60-69 (Fair)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Showing {filteredProperties.length} properties
        </p>
        <select className="input-field w-auto">
          <option>Sort by: Newest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>RIBL Score</option>
        </select>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="btn-secondary">
          Load More Properties
        </button>
      </div>
    </div>
  )
}

export default PropertyListing