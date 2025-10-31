import { useState, useEffect } from 'react'
import { Plus, Eye, Edit, Trash2, TrendingUp, DollarSign, Home, Users, FileText, Zap, Megaphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SellerDashboard = () => {
  const { user } = useAuth()
  const [properties, setProperties] = useState([])
  const [stats, setStats] = useState({})

  useEffect(() => {
    // Load user's properties from localStorage
    const allProperties = JSON.parse(localStorage.getItem('properties') || '[]')
    const userProperties = allProperties.filter(p => p.sellerId === user?.id)
    setProperties(userProperties)

    // Calculate stats
    const totalViews = userProperties.reduce((sum, p) => sum + (p.views || 0), 0)
    const totalInquiries = userProperties.reduce((sum, p) => sum + (p.inquiries || 0), 0)
    const avgPrice = userProperties.length > 0 
      ? userProperties.reduce((sum, p) => sum + parseFloat(p.price.replace(/[₹,]/g, '')), 0) / userProperties.length
      : 0

    setStats({
      totalProperties: userProperties.length || 5,
      totalViews: totalViews || 234,
      totalInquiries: totalInquiries || 18,
      avgPrice: (avgPrice || 1850000).toLocaleString()
    })
  }, [user])

  const handleDeleteProperty = (propertyId) => {
    const allProperties = JSON.parse(localStorage.getItem('properties') || '[]')
    const updatedProperties = allProperties.filter(p => p.id !== propertyId)
    localStorage.setItem('properties', JSON.stringify(updatedProperties))
    
    const userProperties = updatedProperties.filter(p => p.sellerId === user?.id)
    setProperties(userProperties)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
              <p className="text-gray-600">Manage your property listings and track performance</p>
            </div>
            <Link
              to="/post-property"
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Property
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProperties}</p>
              </div>
              <Home className="w-8 h-8 text-primary-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inquiries</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalInquiries}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Price</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.avgPrice}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Properties List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">My Properties</h2>
          </div>
          
          {properties.length === 0 ? (
            <div className="p-12 text-center">
              <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No properties listed yet</h3>
              <p className="text-gray-600 mb-6">Start by adding your first property to attract potential buyers</p>
              <Link
                to="/post-property"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Your First Property
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {properties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={property.image}
                            alt={property.title}
                            className="w-12 h-12 rounded-lg object-cover mr-4"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{property.title}</div>
                            <div className="text-sm text-gray-500">{property.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{property.price}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 capitalize">{property.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{property.views || 0}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/property/${property.id}`}
                            className="text-primary-600 hover:text-primary-700"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button className="text-gray-600 hover:text-gray-700">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(property.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

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
                <p className="text-sm text-gray-500">Get real-time valuations</p>
              </div>
            </Link>

            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Generate Reports</h3>
                <p className="text-sm text-gray-500">Property status reports</p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Megaphone className="w-6 h-6 text-purple-600" />
              <div>
                <h3 className="font-medium text-gray-900">Campaign Management</h3>
                <p className="text-sm text-gray-500">Marketing campaigns</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerDashboard