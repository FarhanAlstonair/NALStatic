import { useState, useEffect } from 'react'
import { Plus, Eye, Edit, Trash2, TrendingUp, Megaphone, Target, Calendar, BarChart3 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const PropertyAds = () => {
  const { user } = useAuth()
  const [ads, setAds] = useState([])
  const [showCreateAd, setShowCreateAd] = useState(false)
  const [adForm, setAdForm] = useState({
    propertyId: '',
    title: '',
    description: '',
    budget: '',
    duration: '7',
    targetAudience: 'buyers',
    adType: 'featured',
    locations: []
  })

  useEffect(() => {
    // Load user's ads from localStorage
    const userAds = JSON.parse(localStorage.getItem(`propertyAds_${user?.id}`) || '[]')
    if (userAds.length === 0) {
      // Add mock ads
      const mockAds = [
        {
          id: 1,
          propertyId: 'prop_1',
          title: '3BHK Luxury Apartment - Prime Location',
          description: 'Spacious 3BHK with modern amenities in Koramangala',
          budget: '₹15,000',
          duration: '14',
          targetAudience: 'buyers',
          adType: 'featured',
          status: 'active',
          views: 1250,
          clicks: 89,
          leads: 12,
          startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 2,
          propertyId: 'prop_2',
          title: '2BHK Modern Flat - Urgent Sale',
          description: 'Well-maintained 2BHK flat with garden view',
          budget: '₹8,000',
          duration: '7',
          targetAudience: 'investors',
          adType: 'urgent',
          status: 'active',
          views: 890,
          clicks: 45,
          leads: 8,
          startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
      setAds(mockAds)
      localStorage.setItem(`propertyAds_${user?.id}`, JSON.stringify(mockAds))
    } else {
      setAds(userAds)
    }
  }, [user])

  const handleCreateAd = (e) => {
    e.preventDefault()
    const newAd = {
      id: Date.now(),
      ...adForm,
      status: 'active',
      views: 0,
      clicks: 0,
      leads: 0,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + parseInt(adForm.duration) * 24 * 60 * 60 * 1000).toISOString()
    }
    
    const updatedAds = [...ads, newAd]
    setAds(updatedAds)
    localStorage.setItem(`propertyAds_${user?.id}`, JSON.stringify(updatedAds))
    
    setShowCreateAd(false)
    setAdForm({
      propertyId: '',
      title: '',
      description: '',
      budget: '',
      duration: '7',
      targetAudience: 'buyers',
      adType: 'featured',
      locations: []
    })
  }

  const handleDeleteAd = (adId) => {
    const updatedAds = ads.filter(ad => ad.id !== adId)
    setAds(updatedAds)
    localStorage.setItem(`propertyAds_${user?.id}`, JSON.stringify(updatedAds))
  }

  const getAdTypeColor = (type) => {
    switch(type) {
      case 'featured': return 'bg-blue-100 text-blue-800'
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'premium': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'expired': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Property Ads & Marketing</h1>
              <p className="text-gray-600">Promote your properties and track campaign performance</p>
            </div>
            <button
              onClick={() => setShowCreateAd(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Create Ad Campaign
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{ads.filter(ad => ad.status === 'active').length}</p>
              </div>
              <Megaphone className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{ads.reduce((sum, ad) => sum + ad.views, 0).toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                <p className="text-2xl font-bold text-gray-900">{ads.reduce((sum, ad) => sum + ad.clicks, 0)}</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{ads.reduce((sum, ad) => sum + ad.leads, 0)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Ad Campaigns List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Ad Campaigns</h2>
          </div>
          
          {ads.length === 0 ? (
            <div className="p-12 text-center">
              <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No ad campaigns yet</h3>
              <p className="text-gray-600 mb-6">Create your first ad campaign to promote your properties</p>
              <button
                onClick={() => setShowCreateAd(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create First Campaign
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {ads.map((ad) => (
                    <tr key={ad.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{ad.title}</div>
                          <div className="text-sm text-gray-500">{ad.description}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {new Date(ad.startDate).toLocaleDateString()} - {new Date(ad.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAdTypeColor(ad.adType)}`}>
                          {ad.adType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{ad.budget}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <div>Views: {ad.views.toLocaleString()}</div>
                          <div>Clicks: {ad.clicks}</div>
                          <div>Leads: {ad.leads}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ad.status)}`}>
                          {ad.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-700">
                            <BarChart3 className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-700">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAd(ad.id)}
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

        {/* Create Ad Modal */}
        {showCreateAd && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Create Ad Campaign</h3>
              </div>
              
              <form onSubmit={handleCreateAd} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Title</label>
                    <input
                      type="text"
                      value={adForm.title}
                      onChange={(e) => setAdForm({...adForm, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter campaign title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ad Type</label>
                    <select
                      value={adForm.adType}
                      onChange={(e) => setAdForm({...adForm, adType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="featured">Featured Listing</option>
                      <option value="urgent">Urgent Sale</option>
                      <option value="premium">Premium Showcase</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={adForm.description}
                    onChange={(e) => setAdForm({...adForm, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Describe your property and campaign"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                    <input
                      type="text"
                      value={adForm.budget}
                      onChange={(e) => setAdForm({...adForm, budget: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="₹10,000"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (days)</label>
                    <select
                      value={adForm.duration}
                      onChange={(e) => setAdForm({...adForm, duration: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="7">7 days</option>
                      <option value="14">14 days</option>
                      <option value="30">30 days</option>
                      <option value="60">60 days</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                    <select
                      value={adForm.targetAudience}
                      onChange={(e) => setAdForm({...adForm, targetAudience: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="buyers">Buyers</option>
                      <option value="investors">Investors</option>
                      <option value="tenants">Tenants</option>
                      <option value="all">All Users</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowCreateAd(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                  >
                    Create Campaign
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyAds