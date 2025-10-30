import { useState } from 'react'
import { 
  User, 
  Settings, 
  Heart, 
  Eye, 
  FileText, 
  Bell, 
  Shield, 
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Edit,
  Save,
  X
} from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import { Link } from 'react-router-dom'

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const { favorites, removeFromFavorites } = useFavorites()
  const [profileData, setProfileData] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    bio: 'Real estate investor looking for premium properties in Mumbai and Pune.',
    verified: true,
    joinDate: '2023-01-15'
  })

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'properties', label: 'My Properties', icon: FileText },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'activity', label: 'Activity', icon: Eye },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const myProperties = [
    {
      id: 1,
      title: '2BHK Apartment in Bandra',
      status: 'active',
      type: 'rent',
      price: '₹45,000/month',
      views: 234,
      inquiries: 12
    },
    {
      id: 2,
      title: 'Commercial Office Space',
      status: 'sold',
      type: 'sale',
      price: '₹1.2 Cr',
      views: 156,
      inquiries: 8
    }
  ]



  const recentActivity = [
    { action: 'Viewed property', item: '3BHK Apartment in Andheri', time: '2 hours ago' },
    { action: 'Added to favorites', item: 'Villa in Pune', time: '1 day ago' },
    { action: 'Document verified', item: 'Property Title Deed', time: '3 days ago' },
    { action: 'Posted property', item: '2BHK in Bandra', time: '1 week ago' }
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Save logic here
  }

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const ProfileSection = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="card">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-primary-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                {profileData.verified && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-gray-600">{profileData.email}</p>
              <p className="text-sm text-gray-500">Member since {new Date(profileData.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-secondary"
          >
           
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Profile Details */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              {isEditing ? (
                <input
                  key="name-input"
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="input-field"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{profileData.name}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              {isEditing ? (
                <input
                  key="email-input"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="input-field"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{profileData.email}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              {isEditing ? (
                <input
                  key="phone-input"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="input-field"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{profileData.phone}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              {isEditing ? (
                <input
                  key="location-input"
                  type="text"
                  value={profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="input-field"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{profileData.location}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            {isEditing ? (
              <textarea
                key="bio-input"
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={3}
                className="input-field"
              />
            ) : (
              <p className="text-gray-600">{profileData.bio}</p>
            )}
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button onClick={() => setIsEditing(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary">
            
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const PropertiesSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">My Properties</h3>
        <button className="btn-primary">Add New Property</button>
      </div>

      <div className="space-y-4">
        {myProperties.map(property => (
          <div key={property.id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{property.title}</h4>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <span className="capitalize">{property.type}</span>
                  <span>{property.price}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {property.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {property.views} views
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  {property.inquiries} inquiries
                </div>
                <button className="btn-secondary text-sm">Manage</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const FavoritesSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Favorite Properties</h3>
      
      {favorites.length === 0 ? (
        <div className="card text-center py-12">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h4>
          <p className="text-gray-600 mb-4">Start adding properties to your favorites to see them here</p>
          <Link to="/properties" className="btn-primary">
            Browse Properties
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map(property => (
            <div key={property.id} className="card">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <button
                  onClick={() => removeFromFavorites(property.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                </button>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">{property.title}</h4>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {property.location}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary-600">{property.price}</span>
                <Link to={`/property/${property.id}`} className="btn-secondary text-sm">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const ActivitySection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      
      <div className="space-y-4">
        {recentActivity.map((activity, index) => (
          <div key={index} className="card">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Eye className="w-4 h-4 text-primary-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">
                  <span className="font-medium">{activity.action}</span> {activity.item}
                </p>
                <p className="text-sm text-gray-600">{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const SettingsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
      
      <div className="space-y-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Notifications</h4>
                <p className="text-sm text-gray-600">Manage your notification preferences</p>
              </div>
            </div>
            <button className="btn-secondary">Configure</button>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Privacy & Security</h4>
                <p className="text-sm text-gray-600">Control your privacy settings</p>
              </div>
            </div>
            <button className="btn-secondary">Manage</button>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Payment Methods</h4>
                <p className="text-sm text-gray-600">Manage your payment options</p>
              </div>
            </div>
            <button className="btn-secondary">Update</button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileSection />
      case 'properties': return <PropertiesSection />
      case 'favorites': return <FavoritesSection />
      case 'activity': return <ActivitySection />
      case 'settings': return <SettingsSection />
      default: return <ProfileSection />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card">
            <nav className="space-y-1">
              {tabs.map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default UserProfile