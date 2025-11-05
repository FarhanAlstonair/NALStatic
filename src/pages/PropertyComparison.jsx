import { useState } from 'react'
import { Plus, X, Check, Minus, MapPin, Bed, Bath, Square, Star } from 'lucide-react'

const PropertyComparison = () => {
  const [selectedProperties, setSelectedProperties] = useState([])

  const availableProperties = [
    {
      id: 1,
      title: '3BHK Luxury Apartment',
      location: 'Koramangala, Bangalore',
      price: 2500000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      riblScore: 85,
      amenities: ['Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden'],
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop&crop=center'
    },
    {
      id: 2,
      title: '2BHK Modern Flat',
      location: 'Koramangala, Bangalore',
      price: 1800000,
      bedrooms: 2,
      bathrooms: 2,
      area: 950,
      riblScore: 78,
      amenities: ['Gym', 'Parking', 'Security', 'Elevator', 'Internet'],
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=200&fit=crop&crop=center'
    },
    {
      id: 3,
      title: '4BHK Villa',
      location: 'Whitefield, Bangalore',
      price: 3800000,
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      riblScore: 92,
      amenities: ['Swimming Pool', 'Garden', 'Parking', 'Security', 'Power Backup'],
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop&crop=center'
    }
  ]

  const allAmenities = [
    'Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden', 
    'Elevator', 'Power Backup', 'Water Supply', 'Internet', 'AC'
  ]

  const addProperty = (property) => {
    if (selectedProperties.length < 3 && !selectedProperties.find(p => p.id === property.id)) {
      setSelectedProperties([...selectedProperties, property])
    }
  }

  const removeProperty = (propertyId) => {
    setSelectedProperties(selectedProperties.filter(p => p.id !== propertyId))
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const ComparisonTable = () => (
    <div className="card overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 px-4 font-semibold text-gray-900">Features</th>
            {selectedProperties.map(property => (
              <th key={property.id} className="text-center py-4 px-4 min-w-64">
                <div className="relative">
                  <img
                    src={property.images?.[0] || property.image}
                    alt={property.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <button
                    onClick={() => removeProperty(property.id)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <h3 className="font-semibold text-gray-900 text-sm">{property.title}</h3>
                  <p className="text-gray-600 text-xs">{property.location}</p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="py-3 px-4 font-medium text-gray-900">Price</td>
            {selectedProperties.map(property => (
              <td key={property.id} className="py-3 px-4 text-center">
                <span className="text-lg font-bold text-primary-600">
                  {formatPrice(property.price)}
                </span>
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="py-3 px-4 font-medium text-gray-900">RIBL Score</td>
            {selectedProperties.map(property => (
              <td key={property.id} className="py-3 px-4 text-center">
                <div className="flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className={`font-semibold ${
                    property.riblScore >= 80 ? 'text-green-600' : 
                    property.riblScore >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {property.riblScore}
                  </span>
                </div>
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="py-3 px-4 font-medium text-gray-900">Bedrooms</td>
            {selectedProperties.map(property => (
              <td key={property.id} className="py-3 px-4 text-center">
                <div className="flex items-center justify-center">
                  <Bed className="w-4 h-4 text-gray-500 mr-1" />
                  {property.bedrooms}
                </div>
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="py-3 px-4 font-medium text-gray-900">Bathrooms</td>
            {selectedProperties.map(property => (
              <td key={property.id} className="py-3 px-4 text-center">
                <div className="flex items-center justify-center">
                  <Bath className="w-4 h-4 text-gray-500 mr-1" />
                  {property.bathrooms}
                </div>
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="py-3 px-4 font-medium text-gray-900">Area (sq ft)</td>
            {selectedProperties.map(property => (
              <td key={property.id} className="py-3 px-4 text-center">
                <div className="flex items-center justify-center">
                  <Square className="w-4 h-4 text-gray-500 mr-1" />
                  {property.area}
                </div>
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="py-3 px-4 font-medium text-gray-900">Price per sq ft</td>
            {selectedProperties.map(property => (
              <td key={property.id} className="py-3 px-4 text-center">
                <span className="text-sm text-gray-600">
                  ₹{Math.round(property.price / property.area).toLocaleString()}
                </span>
              </td>
            ))}
          </tr>
          {allAmenities.map(amenity => (
            <tr key={amenity} className="border-b border-gray-100">
              <td className="py-3 px-4 font-medium text-gray-900">{amenity}</td>
              {selectedProperties.map(property => (
                <td key={property.id} className="py-3 px-4 text-center">
                  {property.amenities.includes(amenity) ? (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <Minus className="w-5 h-5 text-gray-300 mx-auto" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Property Comparison
        </h1>
        <p className="text-lg text-gray-600">
          Compare properties side by side to make informed decisions
        </p>
      </div>

      {/* Selected Properties Count */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            {selectedProperties.length} of 3 properties selected for comparison
          </p>
          {selectedProperties.length > 0 && (
            <button
              onClick={() => setSelectedProperties([])}
              className="btn-secondary text-sm"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Property Selection */}
      {selectedProperties.length < 3 && (
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Select Properties to Compare
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availableProperties
              .filter(property => !selectedProperties.find(p => p.id === property.id))
              .map(property => (
                <div key={property.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                  <img
                    src={property.images?.[0] || property.image}
                    alt={property.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-medium text-gray-900 mb-1">{property.title}</h4>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    {property.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary-600">
                      {formatPrice(property.price)}
                    </span>
                    <button
                      onClick={() => addProperty(property)}
                      className="btn-primary text-sm py-1 px-3"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Comparison Table */}
      {selectedProperties.length > 0 ? (
        <ComparisonTable />
      ) : (
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Properties Selected
          </h3>
          <p className="text-gray-600">
            Select up to 3 properties to compare their features side by side
          </p>
        </div>
      )}

      {/* Comparison Tips */}
      <div className="mt-8 card bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          Comparison Tips
        </h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• Compare properties in similar locations for better insights</li>
          <li>• Look at price per sq ft to understand value for money</li>
          <li>• Consider RIBL scores for quality assessment</li>
          <li>• Check amenities that matter most to you</li>
          <li>• Factor in additional costs like maintenance and taxes</li>
        </ul>
      </div>
    </div>
  )
}

export default PropertyComparison