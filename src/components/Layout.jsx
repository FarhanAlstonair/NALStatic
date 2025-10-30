import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, Search, User, ChevronDown, Building, FileCheck, Gavel, GitCompare, Calculator, Brain, BarChart3, TrendingUp, Map, Camera, MapPin } from 'lucide-react'

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const navigation = [
    {
      name: 'Properties',
      href: '/properties',
      dropdown: [
        { name: 'Browse Properties', href: '/properties', icon: Building },
        { name: 'Compare Properties', href: '/compare', icon: GitCompare }
      ]
    },
    {
      name: 'Services',
      href: '/verify',
      dropdown: [
        { name: 'Document Verification', href: '/verify', icon: FileCheck },
        { name: 'Property Bidding', href: '/bidding', icon: Gavel },
        { name: 'Loan Calculator', href: '/loan-calculator', icon: Calculator }
      ]
    },
    {
      name: 'AI & Analytics',
      href: '/ai-recommendations',
      dropdown: [
        { name: 'AI Recommendations', href: '/ai-recommendations', icon: Brain },
        { name: 'Price Prediction', href: '/price-prediction', icon: TrendingUp },
        { name: 'Competitor Analytics', href: '/competitor-analytics', icon: BarChart3 },
        { name: 'Geo Analysis', href: '/geo-analysis', icon: Map },
        { name: 'AR Tours', href: '/ar-tours', icon: Camera }
      ]
    },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  const properties = [
    { id: 1, title: '3BHK Luxury Apartment', location: 'Koramangala, Bangalore', price: '₹1.8 Cr', type: 'sale' },
    { id: 2, title: '2BHK Modern Flat', location: 'Indiranagar, Bangalore', price: '₹35,000/month', type: 'rent' },
    { id: 3, title: 'Commercial Office Space', location: 'Whitefield, Bangalore', price: '₹85,000/month', type: 'lease' },
    { id: 4, title: '4BHK Villa', location: 'HSR Layout, Bangalore', price: '₹2.8 Cr', type: 'sale' },
    { id: 5, title: '1BHK Studio Apartment', location: 'Koramangala, Bangalore', price: '₹22,000/month', type: 'rent' },
    { id: 6, title: 'Retail Shop Space', location: 'Indiranagar, Bangalore', price: '₹65,000/month', type: 'lease' }
  ]

  const filteredProperties = searchQuery.length > 0 
    ? properties.filter(property => 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.type.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : []

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowSearchResults(false)
      setSearchQuery('')
    }
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowSearchResults(value.length > 0)
  }

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`)
    setShowSearchResults(false)
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 group">
                <img src="/src/assets/logo.jpg" alt="NAL India" className="w-9 h-9 rounded-lg shadow-sm" />
                <span className="text-xl font-semibold text-gray-900 tracking-tight">NAL India</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
              {navigation.map((item, index) => {
                const isActive = location.pathname === item.href || 
                  (item.dropdown && item.dropdown.some(sub => location.pathname === sub.href))
                
                return (
                  <div key={item.name} className="relative">
                    {item.dropdown ? (
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(index)}
                          className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? 'text-primary-600 bg-primary-50'
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === index ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        {activeDropdown === index && (
                          <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            {item.dropdown.map((subItem) => {
                              const SubIcon = subItem.icon
                              const isSubActive = location.pathname === subItem.href
                              return (
                                <Link
                                  key={subItem.name}
                                  to={subItem.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className={`flex items-center space-x-3 px-4 py-3 text-sm transition-colors ${
                                    isSubActive
                                      ? 'text-primary-600 bg-primary-50'
                                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                  }`}
                                >
                                  <SubIcon className="w-4 h-4" />
                                  <span>{subItem.name}</span>
                                </Link>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'text-primary-600 bg-primary-50'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Global Search */}
              <div className="hidden md:flex items-center relative" ref={searchRef}>
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search properties, locations..."
                    className="w-80 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </form>
                
                {/* Search Results Dropdown */}
                {showSearchResults && filteredProperties.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                    {filteredProperties.map((property) => (
                      <button
                        key={property.id}
                        onClick={() => handlePropertyClick(property.id)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-start space-x-3">
                          <Building className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{property.title}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-600">{property.location}</span>
                              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full capitalize">
                                {property.type}
                              </span>
                            </div>
                            <p className="text-sm font-semibold text-primary-600 mt-1">{property.price}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                    <div className="px-4 py-2 border-t border-gray-100">
                      <button
                        onClick={() => handleSearchSubmit({ preventDefault: () => {} })}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        View all results for "{searchQuery}" →
                      </button>
                    </div>
                  </div>
                )}
                
                {/* No Results */}
                {showSearchResults && searchQuery.length > 0 && filteredProperties.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 text-center">
                      <p className="text-sm text-gray-600 mb-2">No properties found for "{searchQuery}"</p>
                      <button
                        onClick={() => handleSearchSubmit({ preventDefault: () => {} })}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Search all properties →
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* User Menu */}
              <div className="relative">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="hidden lg:block text-sm font-medium text-gray-700">Profile</span>
                </Link>
              </div>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {isMenuOpen ? <Menu className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <div className="px-3 py-2 text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="ml-4 space-y-1">
                        {item.dropdown.map((subItem) => {
                          const SubIcon = subItem.icon
                          const isSubActive = location.pathname === subItem.href
                          return (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              onClick={() => setIsMenuOpen(false)}
                              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                                isSubActive
                                  ? 'text-primary-600 bg-primary-50'
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                              }`}
                            >
                              <SubIcon className="w-4 h-4" />
                              <span>{subItem.name}</span>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === item.href
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src="/src/assets/logo.jpg" alt="NAL India" className="w-8 h-8 rounded-lg" />
                <span className="text-lg font-semibold text-gray-900">NAL India</span>
              </div>
              <p className="text-gray-600 mb-4">
                Powered by Alstonair - Your trusted partner in property verification and real estate solutions.
              </p>
              <p className="text-sm text-gray-500">
                A product of Alstonair Technologies
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/about" className="hover:text-primary-600">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-primary-600">Contact</Link></li>
                <li><a href="https://alstonair.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600">Alstonair</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Services</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/verify" className="hover:text-primary-600">Document Verification</Link></li>
                <li><Link to="/properties" className="hover:text-primary-600">Property Listings</Link></li>
                <li><Link to="/ai-recommendations" className="hover:text-primary-600">AI Analytics</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600">&copy; 2024 Alstonair Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout