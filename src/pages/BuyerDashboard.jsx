import { useState, useEffect } from 'react'
import { Heart, Eye, ShoppingCart, CreditCard, MapPin, Home, TrendingUp, FileText, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../context/FavoritesContext'

const BuyerDashboard = () => {
  const { user } = useAuth()
  const { favorites } = useFavorites()
  const [recentViews, setRecentViews] = useState([])
  const [purchases, setPurchases] = useState([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)

  const formatCurrency = (amount) => {
    if (amount >= 100) return `₹${(amount / 100).toFixed(1)} Cr`
    if (amount >= 1) return `₹${amount.toFixed(1)} L`
    return `₹${(amount * 100).toFixed(0)}`
  }

  useEffect(() => {
    // Load user data from localStorage
    const userViews = JSON.parse(localStorage.getItem(`recentViews_${user?.id}`) || '[]')
    const userPurchases = JSON.parse(localStorage.getItem(`purchases_${user?.id}`) || '[]')
    
    setRecentViews(userViews)
    
    // Add mock purchases if none exist
    if (userPurchases.length === 0) {
      const mockPurchases = [
        {
          id: 1,
          propertyId: 15,
          property: {
            title: '3BHK Luxury Condo',
            location: 'Bellandur, Bangalore',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop'
          },
          purchaseDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          amount: '₹2.6 Cr',
          status: 'completed'
        },
        {
          id: 2,
          propertyId: 8,
          property: {
            title: '2BHK Garden View',
            location: 'HSR Layout, Bangalore',
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/736414796.jpg?k=3afde184481bd835cf71b2ba9ccbd83a3e31031a382cdd18ddc6f1814b64bfd4&o=&hp=1'
          },
          purchaseDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          amount: '₹28,000/month',
          status: 'completed'
        }
      ]
      setPurchases(mockPurchases)
      localStorage.setItem(`purchases_${user?.id}`, JSON.stringify(mockPurchases))
    } else {
      setPurchases(userPurchases)
    }
  }, [user])

  const handleBuyProperty = (property) => {
    setSelectedProperty(property)
    setShowCheckout(true)
  }

  const handleCheckout = () => {
    // Simulate purchase
    const purchase = {
      id: Date.now(),
      propertyId: selectedProperty.id,
      property: selectedProperty,
      purchaseDate: new Date().toISOString(),
      amount: selectedProperty.price,
      status: 'completed'
    }
    
    const updatedPurchases = [...purchases, purchase]
    setPurchases(updatedPurchases)
    localStorage.setItem(`purchases_${user?.id}`, JSON.stringify(updatedPurchases))
    
    setShowCheckout(false)
    setSelectedProperty(null)
  }

  const mockProperties = [
    {
      id: 1,
      title: '3BHK Luxury Apartment',
      location: 'Koramangala, Bangalore',
      price: '₹1.8 Cr',
      image: 'https://imagecdn.99acres.com/media1/32690/10/653810107M-1759080334729.jpg',
      type: 'sale',
      riblScore: 'A+',
      urgentSale: true
    },
    {
      id: 2,
      title: '2BHK Modern Flat',
      location: 'Indiranagar, Bangalore',
      price: '₹1.2 Cr',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
      type: 'sale',
      riblScore: 'A'
    },
    {
      id: 3,
      title: '4BHK Villa',
      location: 'HSR Layout, Bangalore',
      price: '₹2.8 Cr',
      image: 'https://th.bing.com/th/id/OIP.DCE_Nl83XmL1WHvbnMojzgHaFW?w=255&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      type: 'sale',
      riblScore: 'A+',
      urgentSale: true
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Buyer Dashboard</h1>
          <p className="text-gray-600">Track your property interests and purchases</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Favorites</p>
                <p className="text-2xl font-bold text-gray-900">{favorites.length || 7}</p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recent Views</p>
                <p className="text-2xl font-bold text-gray-900">{recentViews.length || 12}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Purchases</p>
                <p className="text-2xl font-bold text-gray-900">{purchases.length || 2}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {purchases.length > 0 ? formatCurrency(purchases.reduce((sum, p) => {
                    const cleanAmount = p.amount.replace(/[₹,\s]/g, '')
                    if (cleanAmount.includes('Cr')) {
                      return sum + parseFloat(cleanAmount.replace('Cr', '')) * 100
                    } else if (cleanAmount.includes('L')) {
                      return sum + parseFloat(cleanAmount.replace('L', ''))
                    }
                    return sum + parseFloat(cleanAmount) / 100000
                  }, 0)) : '₹2.4 Cr'}
                </p>
              </div>
              <CreditCard className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Properties */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Available Properties</h2>
            </div>
            <div className="p-6 space-y-4">
              {mockProperties.map((property) => (
                <div key={property.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{property.title}</h3>
                        {property.urgentSale && (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                            Urgent Sale
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                        <MapPin className="w-3 h-3" />
                        {property.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className={`font-semibold ${property.urgentSale ? 'text-red-600' : 'text-primary-600'}`}>{property.price}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          property.riblScore === 'A+' ? 'bg-green-100 text-green-800' :
                          property.riblScore === 'A' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          RIBL: {property.riblScore}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleBuyProperty(property)}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Purchases */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Purchases</h2>
            </div>
            <div className="p-6">
              {purchases.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No purchases yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {purchases.map((purchase) => (
                    <div key={purchase.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={purchase.property.image}
                          alt={purchase.property.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{purchase.property.title}</h3>
                          <p className="text-sm text-gray-500">
                            Purchased on {new Date(purchase.purchaseDate).toLocaleDateString()}
                          </p>
                          <p className="font-semibold text-green-600">{purchase.amount}</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Checkout Modal */}
        {showCheckout && selectedProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Complete Purchase</h3>
              
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  className="w-full h-32 rounded-lg object-cover mb-4"
                />
                <h4 className="font-medium text-gray-900">{selectedProperty.title}</h4>
                <p className="text-sm text-gray-500">{selectedProperty.location}</p>
                <p className="text-lg font-bold text-primary-600 mt-2">{selectedProperty.price}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Credit Card</option>
                    <option>Bank Transfer</option>
                    <option>UPI</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Complete Purchase
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/urgent-sale-value"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Zap className="w-6 h-6 text-orange-600" />
              <div>
                <h3 className="font-medium text-gray-900">Urgent Sale Value</h3>
                <p className="text-sm text-gray-500">Get property valuations</p>
              </div>
            </Link>

            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Purchase Reports</h3>
                <p className="text-sm text-gray-500">Download purchase history</p>
              </div>
            </button>

            <Link
              to="/properties"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-medium text-gray-900">Browse More</h3>
                <p className="text-sm text-gray-500">Explore properties</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyerDashboard