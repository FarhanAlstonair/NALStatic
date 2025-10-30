import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Search, User, ChevronDown, Building, FileCheck, Gavel, GitCompare, Calculator } from 'lucide-react'

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()

  const navigation = [
    {
      name: 'Properties',
      href: '/properties',
      dropdown: [
        { name: 'Browse Properties', href: '/properties', icon: Building },
        { name: 'Search Properties', href: '/search', icon: Search },
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
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index)
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
                <img src="/src/assets/logo.jpg" alt="NAL India" className="w-9 h-9 rounded-lg shadow-sm group-hover:shadow-md transition-shadow" />
                <span className="text-xl font-semibold text-gray-900 tracking-tight">NAL India</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
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
                          <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
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
              <div className="hidden md:flex items-center relative">
                <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties, locations..."
                  className="w-80 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
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
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
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
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img src="/src/assets/logo.jpg" alt="NAL India" className="w-8 h-8 rounded-lg" />
              <span className="text-lg font-semibold text-gray-900">NAL India</span>
            </div>
            <p className="text-gray-600">&copy; 2024 NAL India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout