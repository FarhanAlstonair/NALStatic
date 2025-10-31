import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Users, Building, FileCheck, TrendingUp, 
  LogOut, Eye, Edit, Trash2, Plus,
  BarChart3, DollarSign, Clock, Star
} from 'lucide-react'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      navigate('/admin/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    navigate('/admin/login')
  }

  const stats = [
    { title: 'Total Properties', value: '18', icon: Building, color: 'blue' },
    { title: 'Active Users', value: '156', icon: Users, color: 'green' },
    { title: 'Verifications', value: '89', icon: FileCheck, color: 'purple' },
    { title: 'Revenue', value: '₹2.8L', icon: TrendingUp, color: 'orange' }
  ]

  const recentProperties = [
    { id: 1, title: '3BHK Luxury Apartment', location: 'Koramangala', price: '₹1.8 Cr', ribl: 'A+', status: 'Active' },
    { id: 2, title: '2BHK Modern Flat', location: 'Indiranagar', price: '₹35,000/month', ribl: 'A', status: 'Active' },
    { id: 3, title: 'Commercial Office Space', location: 'Whitefield', price: '₹85,000/month', ribl: 'B', status: 'Active' },
    { id: 4, title: '4BHK Villa', location: 'HSR Layout', price: '₹2.8 Cr', ribl: 'A+', status: 'Active' },
    { id: 5, title: '1BHK Studio Apartment', location: 'Koramangala', price: '₹22,000/month', ribl: 'C', status: 'Active' },
    { id: 6, title: 'Retail Shop Space', location: 'Indiranagar', price: '₹65,000/month', ribl: 'D', status: 'Pending' },
    { id: 7, title: '3BHK Premium Flat', location: 'Whitefield', price: '₹2.2 Cr', ribl: 'A', status: 'Active' },
    { id: 8, title: '2BHK Garden View', location: 'HSR Layout', price: '₹28,000/month', ribl: 'A', status: 'Active' }
  ]

  const urgentSaleProperties = [
    { id: 1, title: '3BHK Apartment', location: 'Koramangala', originalPrice: '₹2.2 Cr', urgentPrice: '₹1.8 Cr', discount: '18%', ribl: 'A+' },
    { id: 2, title: '2BHK Flat', location: 'Marathahalli', originalPrice: '₹1.5 Cr', urgentPrice: '₹1.2 Cr', discount: '20%', ribl: 'A' },
    { id: 3, title: 'Villa', location: 'Whitefield', originalPrice: '₹3.5 Cr', urgentPrice: '₹2.8 Cr', discount: '20%', ribl: 'B' }
  ]

  const getRiblColor = (ribl) => {
    switch(ribl) {
      case 'A+': return 'bg-green-100 text-green-800'
      case 'A': return 'bg-blue-100 text-blue-800'
      case 'B': return 'bg-yellow-100 text-yellow-800'
      case 'C': return 'bg-orange-100 text-orange-800'
      case 'D': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Properties */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Properties</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">RIBL Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentProperties.map((property) => (
                <tr key={property.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{property.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{property.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{property.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiblColor(property.ribl)}`}>
                      {property.ribl}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      property.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Urgent Sale Properties */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Urgent Sale Properties</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {urgentSaleProperties.map((property) => (
              <div key={property.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{property.title}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiblColor(property.ribl)}`}>
                    {property.ribl}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{property.location}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 line-through">Original: {property.originalPrice}</span>
                    <span className="text-red-600 font-medium">{property.discount} OFF</span>
                  </div>
                  <div className="text-lg font-bold text-red-600">{property.urgentPrice}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">NAL Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'properties', name: 'Properties', icon: Building },
              { id: 'users', name: 'Users', icon: Users },
              { id: 'verifications', name: 'Verifications', icon: FileCheck }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'properties' && (
          <div className="text-center py-12">
            <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Properties Management</h3>
            <p className="text-gray-600">Manage all property listings and details</p>
          </div>
        )}
        {activeTab === 'users' && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
            <p className="text-gray-600">Manage user accounts and permissions</p>
          </div>
        )}
        {activeTab === 'verifications' && (
          <div className="text-center py-12">
            <FileCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Document Verifications</h3>
            <p className="text-gray-600">Review and manage document verification requests</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard