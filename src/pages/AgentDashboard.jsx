import { useState, useEffect } from 'react'
import { Users, Home, TrendingUp, DollarSign, Phone, Mail, Plus, Eye, FileText, Zap, Megaphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AgentDashboard = () => {
  const { user } = useAuth()
  const [clients, setClients] = useState([])
  const [properties, setProperties] = useState([])
  const [commissions, setCommissions] = useState([])

  useEffect(() => {
    // Load agent data from localStorage
    const agentClients = JSON.parse(localStorage.getItem(`clients_${user?.id}`) || '[]')
    const agentProperties = JSON.parse(localStorage.getItem(`agentProperties_${user?.id}`) || '[]')
    const agentCommissions = JSON.parse(localStorage.getItem(`commissions_${user?.id}`) || '[]')
    
    setClients(agentClients)
    setProperties(agentProperties)
    setCommissions(agentCommissions)

    // Add mock data if empty
    if (agentClients.length === 0) {
      const mockClients = [
        {
          id: 1,
          name: 'Rajesh Kumar',
          email: 'rajesh@email.com',
          phone: '+91 98765 43210',
          type: 'buyer',
          budget: '₹50L - ₹1Cr',
          status: 'active'
        },
        {
          id: 2,
          name: 'Priya Sharma',
          email: 'priya@email.com',
          phone: '+91 87654 32109',
          type: 'seller',
          propertyValue: '₹2.5Cr',
          status: 'active'
        }
      ]
      setClients(mockClients)
      localStorage.setItem(`clients_${user?.id}`, JSON.stringify(mockClients))
    }
  }, [user])

  const totalCommission = commissions.reduce((sum, c) => sum + parseFloat(c.amount.replace(/[₹,]/g, '')), 0)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
              <p className="text-gray-600">Manage your clients and property deals</p>
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
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Properties Listed</p>
                <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
              </div>
              <Home className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Deals Closed</p>
                <p className="text-2xl font-bold text-gray-900">{commissions.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Commission</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalCommission.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Client Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Client Management</h2>
            </div>
            <div className="p-6">
              {clients.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No clients yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {clients.map((client) => (
                    <div key={client.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{client.name}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {client.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {client.phone}
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              client.type === 'buyer' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {client.type}
                            </span>
                            <span className="ml-2 text-sm text-gray-600">
                              {client.type === 'buyer' ? client.budget : client.propertyValue}
                            </span>
                          </div>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          {client.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Commissions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Commissions</h2>
            </div>
            <div className="p-6">
              {commissions.length === 0 ? (
                <div className="text-center py-8">
                  <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No commissions earned yet</p>
                  <p className="text-sm text-gray-400 mt-2">Close your first deal to start earning</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {commissions.map((commission) => (
                    <div key={commission.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{commission.propertyTitle}</h3>
                          <p className="text-sm text-gray-500">{commission.clientName}</p>
                          <p className="text-sm text-gray-400">{commission.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{commission.amount}</p>
                          <p className="text-xs text-gray-500">{commission.percentage}% commission</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/post-property"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-6 h-6 text-primary-600" />
              <div>
                <h3 className="font-medium text-gray-900">Add New Property</h3>
                <p className="text-sm text-gray-500">List a new property for clients</p>
              </div>
            </Link>

            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Add New Client</h3>
                <p className="text-sm text-gray-500">Register a new client</p>
              </div>
            </button>

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
                <h3 className="font-medium text-gray-900">Generate Reports</h3>
                <p className="text-sm text-gray-500">Client & commission reports</p>
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

export default AgentDashboard