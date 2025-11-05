import { useState } from 'react'
import { Camera, Play, Pause, RotateCcw, Maximize, Volume2, Settings, Eye, Smartphone } from 'lucide-react'

const ARPropertyTours = () => {
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isARActive, setIsARActive] = useState(false)
  const [tourMode, setTourMode] = useState('360')

  const properties = [
    {
      id: 1,
      title: '3BHK Luxury Apartment',
      location: 'Bandra West, Mumbai',
      price: '₹2.5 Cr',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      arAvailable: true,
      tourTypes: ['360°', 'AR Walk-through', 'Virtual Staging']
    },
    {
      id: 2,
      title: '4BHK Villa',
      location: 'Whitefield, Bangalore',
      price: '₹3.8 Cr',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      arAvailable: true,
      tourTypes: ['360°', 'AR Walk-through', 'Drone View']
    },
    {
      id: 3,
      title: '2BHK Modern Flat',
      location: 'Koramangala, Bangalore',
      price: '₹1.8 Cr',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
      arAvailable: false,
      tourTypes: ['360°', 'Virtual Staging']
    }
  ]

  const startARTour = (property) => {
    setSelectedProperty(property)
    setIsARActive(true)
  }

  const ARViewer = () => (
    <div className="fixed inset-0 bg-black z-50">
      <div className="relative w-full h-full">
        {/* AR Camera View */}
        <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
          <div className="text-center text-white">
            <Camera className="w-24 h-24 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold mb-2">AR Camera Active</h3>
            <p className="text-lg opacity-80">Point your device at the space to see virtual furniture</p>
            <div className="mt-8 space-y-2">
              <div className="w-64 h-2 bg-white/20 rounded-full mx-auto">
                <div className="w-3/4 h-2 bg-white rounded-full"></div>
              </div>
              <p className="text-sm">Loading AR models... 75%</p>
            </div>
          </div>
        </div>

        {/* AR Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <button
            onClick={() => setIsARActive(false)}
            className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="bg-black/50 text-white px-4 py-2 rounded-full">
            <span className="text-sm font-medium">{selectedProperty?.title}</span>
          </div>
          <button className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70">
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-center space-x-6">
              <button className="bg-white/20 text-white p-3 rounded-full hover:bg-white/30">
                <RotateCcw className="w-6 h-6" />
              </button>
              <button className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600">
                <Camera className="w-8 h-8" />
              </button>
              <button className="bg-white/20 text-white p-3 rounded-full hover:bg-white/30">
                <Maximize className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-white text-sm">Tap to place furniture • Pinch to resize • Drag to move</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const PropertyCard = ({ property }) => (
    <div className="card">
      <div className="relative">
        <img
          src={property.images?.[0] || property.image}
          alt={property.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        {property.arAvailable && (
          <div className="absolute top-3 left-3 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            AR Available
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.title}</h3>
          <p className="text-gray-600 text-sm">{property.location}</p>
          <p className="text-xl font-bold text-primary-600 mt-2">{property.price}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Available Tours:</p>
          <div className="flex flex-wrap gap-1">
            {property.tourTypes.map((type, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          {property.arAvailable ? (
            <button
              onClick={() => startARTour(property)}
              className="flex-1 btn-primary text-sm"
            >
              {/* <Camera className="w-4 h-4 mr-2" /> */}
              Start AR Tour
            </button>
          ) : (
            <button className="flex-1 btn-secondary text-sm" disabled>
              AR Coming Soon
            </button>
          )}
          <button className="btn-secondary text-sm px-4">
            <Play className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Camera className="w-8 h-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900">AR Property Tours</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience properties like never before with immersive AR and virtual reality tours
        </p>
      </div>

      {/* Tour Modes */}
      <div className="card mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tour Modes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setTourMode('360')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              tourMode === '360' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Eye className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">360° Virtual Tour</h4>
            <p className="text-sm text-gray-600 mt-1">Immersive panoramic views</p>
          </button>
          <button
            onClick={() => setTourMode('ar')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              tourMode === 'ar' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Camera className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">AR Walk-through</h4>
            <p className="text-sm text-gray-600 mt-1">Augmented reality experience</p>
          </button>
          <button
            onClick={() => setTourMode('staging')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              tourMode === 'staging' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Smartphone className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">Virtual Staging</h4>
            <p className="text-sm text-gray-600 mt-1">See furnished spaces</p>
          </button>
        </div>
      </div>

      {/* Properties with AR Tours */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Properties with AR Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      {/* AR Features */}
      <div className="card mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">AR Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Camera className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Virtual Furniture</h4>
            <p className="text-sm text-gray-600">Place and arrange furniture in real-time</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Room Measurements</h4>
            <p className="text-sm text-gray-600">Get accurate room dimensions</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Customization</h4>
            <p className="text-sm text-gray-600">Change colors, materials, and layouts</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Smartphone className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Mobile Ready</h4>
            <p className="text-sm text-gray-600">Works on smartphones and tablets</p>
          </div>
        </div>
      </div>

      {/* How to Use AR */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">How to Use AR Tours</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Enable Camera</h4>
            <p className="text-sm text-gray-600">Allow camera access for AR experience</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Point & Scan</h4>
            <p className="text-sm text-gray-600">Point your device at the floor or walls</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Place Objects</h4>
            <p className="text-sm text-gray-600">Tap to place furniture and decorations</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-orange-600">4</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Explore</h4>
            <p className="text-sm text-gray-600">Walk around and interact with objects</p>
          </div>
        </div>
      </div>

      {/* AR Viewer Modal */}
      {isARActive && <ARViewer />}
    </div>
  )
}

export default ARPropertyTours