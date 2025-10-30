import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Wifi, 
  Shield, 
  Star,
  Phone,
  Mail,
  Calendar,
  Eye,
  Camera,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const PropertyDetails = () => {
  const { id } = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Mock property data - in real app, fetch by ID
  const property = {
    id: 1,
    title: '3BHK Luxury Apartment',
    location: 'Bandra West, Mumbai',
    price: 2500000,
    type: 'sale',
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    verified: true,
    riblScore: 85,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    description: 'Stunning 3BHK luxury apartment in the heart of Bandra West. This premium property offers modern amenities, excellent connectivity, and breathtaking views. Perfect for families looking for comfort and convenience.',
    amenities: [
      'Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden', 
      'Elevator', 'Power Backup', 'Water Supply', 'Internet', 'AC'
    ],
    features: {
      floor: '12th Floor',
      facing: 'North-East',
      furnished: 'Semi-Furnished',
      age: '2 years',
      parking: '2 Covered'
    },
    owner: {
      name: 'Rajesh Sharma',
      phone: '+91 98765 43210',
      email: 'rajesh@email.com',
      verified: true
    },
    nearbyPlaces: [
      { name: 'Bandra Station', distance: '0.5 km', type: 'Transport' },
      { name: 'Linking Road', distance: '0.8 km', type: 'Shopping' },
      { name: 'Lilavati Hospital', distance: '1.2 km', type: 'Healthcare' },
      { name: 'St. Andrews School', distance: '0.7 km', type: 'Education' }
    ]
  }

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`
    }
    return `₹${price.toLocaleString()}`
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/properties" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Properties
            </Link>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-primary-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    {property.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    {formatPrice(property.price)}
                  </div>
                  <div className="flex items-center space-x-2">
                    {property.verified && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Verified
                      </span>
                    )}
                    <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
                      For {property.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bed className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bath className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Square className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{property.area}</div>
                  <div className="text-sm text-gray-600">Sq Ft</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{property.riblScore}</div>
                  <div className="text-sm text-gray-600">RIBL Score</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Property Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(property.features).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700 text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Nearby Places */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Places</h3>
              <div className="space-y-3">
                {property.nearbyPlaces.map((place, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium text-gray-900">{place.name}</div>
                      <div className="text-sm text-gray-600">{place.type}</div>
                    </div>
                    <div className="text-sm font-medium text-primary-600">{place.distance}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Contact Owner */}
            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-sm">
                    {property.owner.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{property.owner.name}</div>
                  {property.owner.verified && (
                    <div className="text-xs text-green-600">✓ Verified Owner</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <button className="btn-primary text-sm py-2">
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </button>
                <button className="btn-secondary text-sm py-2">
                  <Mail className="w-4 h-4 mr-1" />
                  Message
                </button>
                <button className="btn-secondary text-sm py-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  Visit
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h4 className="font-medium text-gray-900 mb-3 text-sm">Quick Actions</h4>
              <div className="grid grid-cols-1 gap-2">
                <Link to="/loan-calculator" className="text-sm text-primary-600 hover:text-primary-700 py-1">
                  Calculate EMI
                </Link>
                <Link to="/compare" className="text-sm text-primary-600 hover:text-primary-700 py-1">
                  Compare Properties
                </Link>
                <Link to="/ar-tours" className="text-sm text-primary-600 hover:text-primary-700 py-1 flex items-center">
                  <Camera className="w-3 h-3 mr-1" />
                  Virtual Tour
                </Link>
              </div>
            </div>

            {/* Property Stats */}
            <div className="card">
              <h4 className="font-medium text-gray-900 mb-3 text-sm">Property Stats</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Views</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Inquiries</span>
                  <span className="font-medium">45</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Listed</span>
                  <span className="font-medium">2 weeks ago</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Price/Sq Ft</span>
                  <span className="font-medium">₹{Math.round(property.price / property.area).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails