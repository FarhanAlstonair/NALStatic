import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Bed, Bath, Square, Heart, Share2, MessageCircle, Camera, ShoppingCart } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import { useAuth } from '../context/AuthContext'
import PaymentGateway from '../components/PaymentGateway'
import LeafletMap from '../components/LeafletMap'
import TranslatedText from '../components/TranslatedText'
import ApiTranslatedText from '../components/ApiTranslatedText'
import { useTranslation } from '../hooks/useTranslation'

const PropertyListing = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('newest')

  const [filters, setFilters] = useState({
    location: '',
    priceRange: '',
    bedrooms: '',
    riblScore: ''
  })
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const { toggleFavorite, isFavorite } = useFavorites()
  const { user } = useAuth()
  const [showPaymentGateway, setShowPaymentGateway] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)

  const [allProperties] = useState([
    {
      id: 1,
      title: '3BHK Luxury Apartment in Prime Location',
      location: 'Koramangala 5th Block, Bangalore',
      price: '₹1.8 Cr',
      type: 'sale',
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      images: [
        'https://imagecdn.99acres.com/media1/32690/10/653810107M-1759080334729.jpg',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1560449752-d9d7c2c1e5c4?w=400&h=300&fit=crop'
      ],
      verified: true,
      riblScore: 'A+',
      urgentSale: true,
      originalPrice: '₹2.2 Cr',
      whatsapp: '+91 98765 43210',
      postedBy: 'Owner',
      postedDate: '2 days ago',
      amenities: ['Parking', 'Gym', 'Swimming Pool']
    },
    {
      id: 2,
      title: '2BHK Modern Flat with Balcony',
      location: 'Indiranagar Metro Station, Bangalore',
      price: '₹35,000/month',
      type: 'rent',
      bedrooms: 2,
      bathrooms: 2,
      area: 950,
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
      ],
      verified: true,
      riblScore: 'A',
      whatsapp: '+91 87654 32109',
      postedBy: 'Agent',
      postedDate: '1 week ago',
      amenities: ['Parking', 'Security']
    },
    {
      id: 3,
      title: 'Commercial Office Space IT Park',
      location: 'Whitefield IT Hub, Bangalore',
      price: '₹85,000/month',
      type: 'lease',
      bedrooms: 0,
      bathrooms: 2,
      area: 800,
      images: [
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop'
      ],
      verified: false,
      riblScore: 'B',
      whatsapp: '+91 76543 21098',
      postedBy: 'Builder',
      postedDate: '3 days ago',
      amenities: ['Parking', 'Cafeteria']
    },
    {
      id: 4,
      title: '4BHK Independent Villa with Garden',
      location: 'HSR Layout Sector 2, Bangalore',
      price: '₹2.8 Cr',
      type: 'sale',
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      images: [
        'https://th.bing.com/th/id/OIP.K-jzj1ZkjP7SmF2nxgSsCQHaFj?w=220&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
      ],
      verified: true,
      riblScore: 'A+',
      urgentSale: true,
      originalPrice: '₹3.2 Cr',
      whatsapp: '+91 65432 10987',
      postedBy: 'Owner',
      postedDate: '1 day ago',
      amenities: ['Garden', 'Parking', 'Security']
    },
    {
      id: 5,
      title: '1BHK Studio Near Metro Station',
      location: 'Koramangala 1st Block, Bangalore',
      price: '₹22,000/month',
      type: 'rent',
      bedrooms: 1,
      bathrooms: 1,
      area: 450,
      images: [
        'https://th.bing.com/th/id/OIP.42IrADvcICS4Mx8US1PK1QHaEK?w=244&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
      ],
      verified: true,
      riblScore: 'C',
      whatsapp: '+91 54321 09876',
      postedBy: 'Agent',
      postedDate: '5 days ago',
      amenities: ['Parking']
    },
    {
      id: 6,
      title: 'Prime Retail Shop Main Road',
      location: 'Indiranagar 100 Feet Road, Bangalore',
      price: '₹65,000/month',
      type: 'lease',
      bedrooms: 0,
      bathrooms: 1,
      area: 300,
      images: [
        'https://th.bing.com/th/id/OIP.wCsvKmCQq1qRQ9XD216AdAHaE7?w=273&h=182&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
      ],
      verified: false,
      riblScore: 'D',
      whatsapp: '+91 43210 98765',
      postedBy: 'Owner',
      postedDate: '1 week ago',
      amenities: ['Parking'],
      lat: 12.9784,
      lng: 77.6408
    },
    {
      id: 7,
      title: '2BHK Furnished Apartment Near Tech Park',
      location: 'Electronic City Phase 1, Bangalore',
      price: '₹28,000/month',
      type: 'rent',
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
      images: [
        'https://th.bing.com/th/id/OIP.R6d-zw2qX0YZieesebUZWAHaEK?w=297&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
      ],
      verified: true,
      riblScore: 'A',
      whatsapp: '+91 98765 12345',
      postedBy: 'Agent',
      postedDate: '4 days ago',
      amenities: ['Parking', 'Gym', 'Security']
    },
    {
      id: 8,
      title: '5BHK Luxury Villa with Swimming Pool',
      location: 'Sarjapur Road, Bangalore',
      price: '₹4.2 Cr',
      type: 'sale',
      bedrooms: 5,
      bathrooms: 4,
      area: 3500,
      images: [
        'https://th.bing.com/th/id/OIP.8LBV3GcJFYv7Ec8ZJgBi-wHaFR?w=248&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
      ],
      verified: true,
      riblScore: 'A+',
      whatsapp: '+91 87654 98765',
      postedBy: 'Builder',
      postedDate: '6 days ago',
      amenities: ['Swimming Pool', 'Garden', 'Parking', 'Security']
    },
    {
      id: 9,
      title: 'Commercial Space for Restaurant',
      location: 'Brigade Road, Bangalore',
      price: '₹1,20,000/month',
      type: 'lease',
      bedrooms: 0,
      bathrooms: 3,
      area: 1500,
      images: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'
      ],
      verified: false,
      riblScore: 'B',
      whatsapp: '+91 76543 87654',
      postedBy: 'Owner',
      postedDate: '2 weeks ago',
      amenities: ['Parking', 'Kitchen Setup']
    },
    {
      id: 10,
      title: '3BHK Penthouse with Terrace Garden',
      location: 'JP Nagar 7th Phase, Bangalore',
      price: '₹45,000/month',
      type: 'rent',
      bedrooms: 3,
      bathrooms: 3,
      area: 1800,
      images: [
        'https://th.bing.com/th/id/OIP.itI0w9OVgz8Vkm4IDLno-AHaEK?w=316&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
      ],
      verified: true,
      riblScore: 'A+',
      urgentSale: true,
      originalPrice: '₹55,000/month',
      whatsapp: '+91 65432 76543',
      postedBy: 'Owner',
      postedDate: '3 days ago',
      amenities: ['Terrace Garden', 'Parking', 'Gym']
    },
    {
      id: 11,
      title: '1BHK Compact Home Near Metro',
      location: 'Marathahalli, Bangalore',
      price: '₹18,000/month',
      type: 'rent',
      bedrooms: 1,
      bathrooms: 1,
      area: 550,
      images: [
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop'
      ],
      verified: true,
      riblScore: 'B',
      whatsapp: '+91 54321 65432',
      postedBy: 'Agent',
      postedDate: '1 week ago',
      amenities: ['Parking', 'Security']
    }
  ])

  // Add coordinates to existing properties
  const propertiesWithCoords = allProperties.map((property, index) => ({
    ...property,
    lat: property.lat || [12.9352, 12.9784, 12.9698, 12.9116, 12.8440, 12.9784, 12.8456, 12.9279, 12.9648, 12.9089, 12.9560][index] || 12.9716,
    lng: property.lng || [77.6245, 77.6408, 77.7500, 77.6473, 77.6630, 77.6408, 77.6632, 77.6271, 77.5946, 77.6648, 77.6975][index] || 77.5946
  }))



  // Calculate tab counts based on current filters (excluding activeTab filter)
  const getTabCount = (tabType) => {
    let baseFiltered = propertiesWithCoords
    
    // Apply all filters except tab filter
    if (filters.location) {
      baseFiltered = baseFiltered.filter(property => 
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }
    if (filters.priceRange) {
      baseFiltered = baseFiltered.filter(property => {
        const priceStr = property.price.toLowerCase()
        let price = parseFloat(priceStr.replace(/[^\d.]/g, ''))
        if (priceStr.includes('cr')) price = price * 100
        else if (priceStr.includes('/month')) price = price / 1000
        
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
      baseFiltered = baseFiltered.filter(property => {
        if (filters.bedrooms === '4+') return property.bedrooms >= 4
        return property.bedrooms.toString() === filters.bedrooms
      })
    }
    if (filters.riblScore) {
      baseFiltered = baseFiltered.filter(property => property.riblScore === filters.riblScore)
    }
    
    // Apply tab filter
    switch (tabType) {
      case 'all': return baseFiltered.length
      case 'sale': return baseFiltered.filter(p => p.type === 'sale').length
      case 'rent': return baseFiltered.filter(p => p.type === 'rent').length
      case 'lease': return baseFiltered.filter(p => p.type === 'lease').length
      case 'urgent': return baseFiltered.filter(p => p.urgentSale).length
      default: return 0
    }
  }

  const tabs = [
    { id: 'all', label: 'All Properties', count: getTabCount('all') },
    { id: 'sale', label: 'For Sale', count: getTabCount('sale') },
    { id: 'rent', label: 'For Rent', count: getTabCount('rent') },
    { id: 'lease', label: 'For Lease', count: getTabCount('lease') },
    { id: 'urgent', label: 'Urgent Sale', count: getTabCount('urgent') }
  ]

  const getFilteredAndSortedProperties = () => {
    let filtered = activeTab === 'all' 
      ? propertiesWithCoords 
      : activeTab === 'urgent'
      ? propertiesWithCoords.filter(property => property.urgentSale)
      : propertiesWithCoords.filter(property => property.type === activeTab)
    
    // Apply filters
    if (filters.location) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }
    
    if (filters.priceRange) {
      filtered = filtered.filter(property => {
        // Extract numeric value from price string
        const priceStr = property.price.toLowerCase()
        let price = parseFloat(priceStr.replace(/[^\d.]/g, ''))
        
        // Convert to lakhs for comparison
        if (priceStr.includes('cr')) {
          price = price * 100 // Convert crores to lakhs
        } else if (priceStr.includes('/month')) {
          price = price / 1000 // Convert monthly rent to comparable scale
        }
        
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
        case 'price-high':
          // Extract and normalize prices for sorting
          const getPriceValue = (priceStr) => {
            const str = priceStr.toLowerCase()
            let price = parseFloat(str.replace(/[^\d.]/g, ''))
            if (str.includes('cr')) price = price * 100
            else if (str.includes('/month')) price = price / 1000
            return price
          }
          const priceA = getPriceValue(a.price)
          const priceB = getPriceValue(b.price)
          return sortBy === 'price-low' ? priceA - priceB : priceB - priceA
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

  // Simple map placeholder for now
  useEffect(() => {
    // Map will be implemented here
  }, [filteredProperties])

  const handleBuyProperty = (property) => {
    if (!user) {
      window.location.href = '/signup'
      return
    }
    setSelectedProperty(property)
    setShowPaymentGateway(true)
  }

  const handlePurchaseSuccess = () => {
    // Handle successful purchase
    const purchase = {
      id: Date.now(),
      propertyId: selectedProperty.id,
      property: selectedProperty,
      purchaseDate: new Date().toISOString(),
      amount: selectedProperty.price,
      status: 'completed'
    }
    
    // Save to localStorage
    const existingPurchases = JSON.parse(localStorage.getItem(`purchases_${user?.id}`) || '[]')
    const updatedPurchases = [...existingPurchases, purchase]
    localStorage.setItem(`purchases_${user?.id}`, JSON.stringify(updatedPurchases))
    
    setShowPaymentGateway(false)
    setSelectedProperty(null)
  }

  const PropertyCard = ({ property }) => (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        {property.images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs flex items-center">
            <Camera className="w-3 h-3 mr-1" />
            {property.images.length}
          </div>
        )}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {property.verified && (
            <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
              ✓ Verified
            </span>
          )}
          {property.urgentSale && (
            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
              Urgent Sale
            </span>
          )}
        </div>
        <button 
          onClick={() => toggleFavorite(property)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
        >
          <Heart className={`w-4 h-4 ${isFavorite(property.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>
        </div>

        <div className="mb-3">
          {property.urgentSale && property.originalPrice && (
            <div className="text-sm text-gray-500 line-through mb-1">{property.originalPrice}</div>
          )}
          <div className="text-2xl font-bold text-gray-900">
            {property.price}
          </div>
        </div>

        <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
          <div className="flex items-center space-x-3">
            {property.bedrooms > 0 && (
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                {property.bedrooms}
              </div>
            )}
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              {property.bathrooms}
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              {property.area} sq ft
            </div>
          </div>
          <div className={`px-2 py-1 rounded text-xs font-medium ${
            property.riblScore === 'A+' ? 'bg-green-100 text-green-800' :
            property.riblScore === 'A' ? 'bg-blue-100 text-blue-800' :
            property.riblScore === 'B' ? 'bg-yellow-100 text-yellow-800' :
            property.riblScore === 'C' ? 'bg-orange-100 text-orange-800' :
            'bg-red-100 text-red-800'
          }`}>
            RIBL {property.riblScore}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
          <span>By {property.postedBy}</span>
          <span>{property.postedDate}</span>
        </div>

        <div className="flex space-x-2">
          <Link 
            to={`/property/${property.id}`} 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium text-center transition-colors shadow-sm"
          >
            <ApiTranslatedText>View Details</ApiTranslatedText>
          </Link>
          {user?.role !== 'seller' && property.type === 'sale' && (
            <button
              onClick={() => handleBuyProperty(property)}
              className="flex items-center justify-center px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded transition-colors shadow-sm"
              title="Buy Now"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          )}
          <a 
            href={`https://wa.me/${property.whatsapp?.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in ${property.title} - ${property.price}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: property.title,
                  text: `Check out this property: ${property.title} - ${property.price}`,
                  url: `${window.location.origin}/property/${property.id}`
                })
              } else {
                navigator.clipboard.writeText(`${property.title} - ${property.price} - ${window.location.origin}/property/${property.id}`)
                alert('Property link copied to clipboard!')
              }
            }}
            className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                <ApiTranslatedText>Properties in Bangalore</ApiTranslatedText>
              </h1>
              <p className="text-gray-600">
                {filteredProperties.length} <ApiTranslatedText>results</ApiTranslatedText> • <ApiTranslatedText>Verified listings</ApiTranslatedText>
              </p>
            </div>
            <Link to="/post-property" className="mt-4 sm:mt-0 bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              <ApiTranslatedText>Post Property FREE</ApiTranslatedText>
            </Link>
          </div> 
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <ApiTranslatedText>{tab.label}</ApiTranslatedText> ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <option value=""><ApiTranslatedText parent="option">All Locations</ApiTranslatedText></option>
                <option value="koramangala"><ApiTranslatedText parent="option">Koramangala</ApiTranslatedText></option>
                <option value="indiranagar"><ApiTranslatedText parent="option">Indiranagar</ApiTranslatedText></option>
                <option value="whitefield"><ApiTranslatedText parent="option">Whitefield</ApiTranslatedText></option>
                <option value="hsr"><ApiTranslatedText parent="option">HSR Layout</ApiTranslatedText></option>
              </select>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
              >
                <option value=""><ApiTranslatedText parent="option">Any BHK</ApiTranslatedText></option>
                <option value="1"><ApiTranslatedText parent="option">1 BHK</ApiTranslatedText></option>
                <option value="2"><ApiTranslatedText parent="option">2 BHK</ApiTranslatedText></option>
                <option value="3"><ApiTranslatedText parent="option">3 BHK</ApiTranslatedText></option>
                <option value="4+"><ApiTranslatedText parent="option">4+ BHK</ApiTranslatedText></option>
              </select>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              >
                <option value=""><ApiTranslatedText parent="option">Any Budget</ApiTranslatedText></option>
                <option value="under-50l"><ApiTranslatedText parent="option">Under ₹50L</ApiTranslatedText></option>
                <option value="50l-1cr"><ApiTranslatedText parent="option">₹50L - ₹1Cr</ApiTranslatedText></option>
                <option value="1cr-2cr"><ApiTranslatedText parent="option">₹1Cr - ₹2Cr</ApiTranslatedText></option>
                <option value="above-2cr"><ApiTranslatedText parent="option">Above ₹2Cr</ApiTranslatedText></option>
              </select>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.riblScore}
                onChange={(e) => handleFilterChange('riblScore', e.target.value)}
              >
                <option value=""><ApiTranslatedText parent="option">Any RIBL Score</ApiTranslatedText></option>
                <option value="A+"><ApiTranslatedText parent="option">A+ (Excellent)</ApiTranslatedText></option>
                <option value="A"><ApiTranslatedText parent="option">A (Very Good)</ApiTranslatedText></option>
                <option value="B"><ApiTranslatedText parent="option">B (Good)</ApiTranslatedText></option>
                <option value="C"><ApiTranslatedText parent="option">C (Fair)</ApiTranslatedText></option>
                <option value="D"><ApiTranslatedText parent="option">D (Poor)</ApiTranslatedText></option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest"><ApiTranslatedText parent="option">Newest First</ApiTranslatedText></option>
                <option value="price-low"><ApiTranslatedText parent="option">Price: Low to High</ApiTranslatedText></option>
                <option value="price-high"><ApiTranslatedText parent="option">Price: High to Low</ApiTranslatedText></option>
                <option value="ribl-score"><ApiTranslatedText parent="option">Best RIBL Score</ApiTranslatedText></option>
              </select>
              {(filters.location || filters.bedrooms || filters.priceRange || filters.riblScore) && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  <ApiTranslatedText>Clear Filters</ApiTranslatedText>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Map and Properties Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Google Map - Left Side (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-6">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900"><ApiTranslatedText>Property Locations</ApiTranslatedText></h3>
                <p className="text-sm text-gray-600">{filteredProperties.length} <ApiTranslatedText>properties</ApiTranslatedText></p>
              </div>
              <LeafletMap properties={filteredProperties} />
            </div>
          </div>
          
          {/* Properties Cards - Right Side (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </div>

        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Square className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2"><ApiTranslatedText>No properties found</ApiTranslatedText></h3>
              <p className="text-gray-600"><ApiTranslatedText>Try adjusting your filters to see more results</ApiTranslatedText></p>
            </div>
            <button
              onClick={clearFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              <ApiTranslatedText>Clear All Filters</ApiTranslatedText>
            </button>
          </div>
        )}

        {/* Payment Gateway */}
        {showPaymentGateway && selectedProperty && (
          <PaymentGateway
            property={selectedProperty}
            onClose={() => setShowPaymentGateway(false)}
            onSuccess={handlePurchaseSuccess}
          />
        )}
      </div>
    </div>
  )
}

export default PropertyListing