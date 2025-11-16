import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Bed, Bath, Square, Heart, Share2, MessageCircle, Camera, ShoppingCart } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import PaymentGateway from '../components/PaymentGateway'
import LeafletMap from '../components/LeafletMap'
import { useTranslation } from '../hooks/useTranslation'

const PropertyListing = () => {
  const { t } = useTranslation()
  const { currentLanguage } = useLanguage()
  
  const getTranslatedText = (text) => {
    if (currentLanguage !== 'kn') return text
    
    const translations = {
      'Loading properties...': 'ಆಸ್ತಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
      'Failed to load properties': 'ಆಸ್ತಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ',
      'Please check your connection and try again': 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
      'Retry': 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
      'Properties in Bangalore': 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಆಸ್ತಿಗಳು',
      'results': 'ಫಲಿತಾಂಶಗಳು',
      'Verified listings': 'ಪರಿಶೀಲಿಸಿದ ಪಟ್ಟಿಗಳು',
      'Using cached data': 'ಸಂಗ್ರಹಿಸಿದ ಡೇಟಾವನ್ನು ಬಳಸಲಾಗುತ್ತಿದೆ',
      'Post Property FREE': 'ಆಸ್ತಿಯನ್ನು ಉಚಿತವಾಗಿ ಪೋಸ್ಟ್ ಮಾಡಿ',
      'All Properties': 'ಎಲ್ಲಾ ಆಸ್ತಿಗಳು',
      'For Sale': 'ಮಾರಾಟಕ್ಕೆ',
      'For Rent': 'ಬಾಡಿಗೆಗೆ',
      'For Lease': 'ಗುತ್ತಿಗೆಗೆ',
      'Urgent Sale': 'ತುರ್ತು ಮಾರಾಟ',
      'View Details': 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
      'Property Locations': 'ಆಸ್ತಿ ಸ್ಥಳಗಳು',
      'properties': 'ಆಸ್ತಿಗಳು',
      'No properties found': 'ಯಾವುದೇ ಆಸ್ತಿಗಳು ಕಂಡುಬಂದಿಲ್ಲ',
      'Try adjusting your filters to see more results': 'ಹೆಚ್ಚಿನ ಫಲಿತಾಂಶಗಳನ್ನು ನೋಡಲು ನಿಮ್ಮ ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಸರಿಹೊಂದಿಸಲು ಪ್ರಯತ್ನಿಸಿ',
      'Clear All Filters': 'ಎಲ್ಲಾ ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೆರವುಗೊಳಿಸಿ',
      'Clear Filters': 'ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೆರವುಗೊಳಿಸಿ',
      'All Locations': 'ಎಲ್ಲಾ ಸ್ಥಳಗಳು',
      'Koramangala': 'ಕೊರಮಂಗಲ',
      'Indiranagar': 'ಇಂದಿರಾನಗರ',
      'Whitefield': 'ವೈಟ್‌ಫೀಲ್ಡ್',
      'HSR Layout': 'HSR ಲೇಔಟ್',
      'Any BHK': 'ಯಾವುದೇ BHK',
      '1 BHK': '1 BHK',
      '2 BHK': '2 BHK',
      '3 BHK': '3 BHK',
      '4+ BHK': '4+ BHK',
      'Any Budget': 'ಯಾವುದೇ ಬಜೆಟ್',
      'Under ₹50L': '₹50L ಕ್ಕಿಂತ ಕಡಿಮೆ',
      '₹50L - ₹1Cr': '₹50L - ₹1Cr',
      '₹1Cr - ₹2Cr': '₹1Cr - ₹2Cr',
      'Above ₹2Cr': '₹2Cr ಕ್ಕಿಂತ ಹೆಚ್ಚು',
      'Any RIBL Score': 'ಯಾವುದೇ RIBL ಸ್ಕೋರ್',
      'A+ (Excellent)': 'A+ (ಅತ್ಯುತ್ತಮ)',
      'A (Very Good)': 'A (ಬಹಳ ಒಳ್ಳೆಯದು)',
      'B (Good)': 'B (ಒಳ್ಳೆಯದು)',
      'C (Fair)': 'C (ಸಾಮಾನ್ಯ)',
      'D (Poor)': 'D (ಕಳಪೆ)',
      'Newest First': 'ಹೊಸದು ಮೊದಲು',
      'Price: Low to High': 'ಬೆಲೆ: ಕಡಿಮೆಯಿಂದ ಹೆಚ್ಚಿಗೆ',
      'Price: High to Low': 'ಬೆಲೆ: ಹೆಚ್ಚಿನಿಂದ ಕಡಿಮೆಗೆ',
      'Best RIBL Score': 'ಅತ್ಯುತ್ತಮ RIBL ಸ್ಕೋರ್'
    }
    
    return translations[text] || text
  }
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
  const [allProperties, setAllProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:3001/api/properties')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setAllProperties(data.properties || [])
      } catch (err) {
        console.error('Error fetching properties:', err)
        setError(err.message)
        // Fallback to static data if API fails
        setAllProperties([
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
              'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
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
              'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'
            ],
            verified: true,
            riblScore: 'A',
            whatsapp: '+91 87654 32109',
            postedBy: 'Agent',
            postedDate: '1 week ago',
            amenities: ['Parking', 'Security']
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  // Add coordinates to existing properties
  const propertiesWithCoords = allProperties.map((property, index) => ({
    ...property,
    lat: property.lat || [12.9352, 12.9784, 12.9698, 12.9116, 12.8440, 12.9784, 12.8456, 12.9279, 12.9648, 12.9089, 12.9560][index] || 12.9716,
    lng: property.lng || [77.6245, 77.6408, 77.7500, 77.6473, 77.6630, 77.6408, 77.6632, 77.6271, 77.5946, 77.6648, 77.6975][index] || 77.5946
  }))

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{getTranslatedText('Loading properties...')}</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error && allProperties.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <Square className="w-16 h-16 mx-auto mb-4" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{getTranslatedText('Failed to load properties')}</h3>
          <p className="text-gray-600 mb-4">{getTranslatedText('Please check your connection and try again')}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            {getTranslatedText('Retry')}
          </button>
        </div>
      </div>
    )
  }



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
            {getTranslatedText('View Details')}
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
                {getTranslatedText('Properties in Bangalore')}
              </h1>
              <p className="text-gray-600">
                {filteredProperties.length} {getTranslatedText('results')} • {getTranslatedText('Verified listings')}
                {error && <span className="text-orange-600 ml-2">({getTranslatedText('Using cached data')})</span>}
              </p>
            </div>
            <Link to="/post-property" className="mt-4 sm:mt-0 bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              {getTranslatedText('Post Property FREE')}
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
                {getTranslatedText(tab.label)} ({tab.count})
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
                <option value="">{getTranslatedText('All Locations')}</option>
                <option value="koramangala">{getTranslatedText('Koramangala')}</option>
                <option value="indiranagar">{getTranslatedText('Indiranagar')}</option>
                <option value="whitefield">{getTranslatedText('Whitefield')}</option>
                <option value="hsr">{getTranslatedText('HSR Layout')}</option>
              </select>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
              >
                <option value="">{getTranslatedText('Any BHK')}</option>
                <option value="1">{getTranslatedText('1 BHK')}</option>
                <option value="2">{getTranslatedText('2 BHK')}</option>
                <option value="3">{getTranslatedText('3 BHK')}</option>
                <option value="4+">{getTranslatedText('4+ BHK')}</option>
              </select>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              >
                <option value="">{getTranslatedText('Any Budget')}</option>
                <option value="under-50l">{getTranslatedText('Under ₹50L')}</option>
                <option value="50l-1cr">{getTranslatedText('₹50L - ₹1Cr')}</option>
                <option value="1cr-2cr">{getTranslatedText('₹1Cr - ₹2Cr')}</option>
                <option value="above-2cr">{getTranslatedText('Above ₹2Cr')}</option>
              </select>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.riblScore}
                onChange={(e) => handleFilterChange('riblScore', e.target.value)}
              >
                <option value="">{getTranslatedText('Any RIBL Score')}</option>
                <option value="A+">{getTranslatedText('A+ (Excellent)')}</option>
                <option value="A">{getTranslatedText('A (Very Good)')}</option>
                <option value="B">{getTranslatedText('B (Good)')}</option>
                <option value="C">{getTranslatedText('C (Fair)')}</option>
                <option value="D">{getTranslatedText('D (Poor)')}</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">{getTranslatedText('Newest First')}</option>
                <option value="price-low">{getTranslatedText('Price: Low to High')}</option>
                <option value="price-high">{getTranslatedText('Price: High to Low')}</option>
                <option value="ribl-score">{getTranslatedText('Best RIBL Score')}</option>
              </select>
              {(filters.location || filters.bedrooms || filters.priceRange || filters.riblScore) && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {getTranslatedText('Clear Filters')}
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
                <h3 className="text-lg font-semibold text-gray-900">{getTranslatedText('Property Locations')}</h3>
                <p className="text-sm text-gray-600">{filteredProperties.length} {getTranslatedText('properties')}</p>
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">{getTranslatedText('No properties found')}</h3>
              <p className="text-gray-600">{getTranslatedText('Try adjusting your filters to see more results')}</p>
            </div>
            <button
              onClick={clearFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {getTranslatedText('Clear All Filters')}
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