import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowRight, ChevronDown, User, Shield, Building, ShoppingCart } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.jpg'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showDemoAccounts, setShowDemoAccounts] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDemoAccounts(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    setTimeout(() => {
      // Check demo accounts first
      const demoAccount = demoAccounts.find(account => 
        account.email === formData.email && account.password === formData.password
      )
      
      if (demoAccount) {
        const userData = {
          email: demoAccount.email,
          name: demoAccount.type,
          role: demoAccount.type.toLowerCase(),
          id: Date.now()
        }
        
        login(userData)
        
        // Redirect based on role
        switch (demoAccount.type.toLowerCase()) {
          case 'admin':
            localStorage.setItem('adminAuth', 'true')
            navigate('/admin/dashboard')
            break
          case 'agent':
            navigate('/agent-dashboard')
            break
          case 'seller':
            navigate('/seller-dashboard')
            break
          case 'buyer':
            navigate('/buyer-dashboard')
            break
          default:
            navigate('/')
        }
      } else {
        // Check if user exists in localStorage (registered users)
        const users = JSON.parse(localStorage.getItem('nalUsers') || '[]')
        const user = users.find(u => u.email === formData.email && u.password === formData.password)
        
        if (user) {
          localStorage.removeItem('adminAuth')
          login(user)
          navigate('/')
        } else {
          setError('Invalid email or password. Please try again or create a new account.')
        }
      }
      setIsLoading(false)
    }, 1500)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const demoAccounts = [
    {
      type: 'Admin',
      email: 'admin@gmail.com',
      password: '8858',
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      type: 'Agent',
      email: 'agent@gmail.com',
      password: '8858',
      icon: Building,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      type: 'Seller',
      email: 'seller@gmail.com',
      password: '8858',
      icon: User,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      type: 'Buyer',
      email: 'buyer@gmail.com',
      password: '8858',
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  const handleDemoLogin = (account) => {
    setFormData({
      email: account.email,
      password: account.password
    })
    setShowDemoAccounts(false)
    // Auto-submit the form after setting credentials
    setTimeout(() => {
      document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <img src={logo} alt="NAL" className="w-10 h-10 rounded-xl" />
            <span className="text-2xl font-bold text-[#1E3A8A]">NAL</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Quick Access</span>
              </div>
            </div>

            {/* Demo Accounts */}
            <div className="mt-6 relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowDemoAccounts(!showDemoAccounts)}
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                <User className="w-5 h-5 mr-2" />
                Demo Accounts
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showDemoAccounts ? 'rotate-180' : ''}`} />
              </button>

              {/* Demo Accounts Dropdown */}
              {showDemoAccounts && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-2">
                    <div className="text-xs text-gray-500 px-3 py-2 border-b border-gray-100">
                      Select a demo account to test the platform
                    </div>
                    {demoAccounts.map((account) => {
                      const IconComponent = account.icon
                      return (
                        <button
                          key={account.type}
                          onClick={() => handleDemoLogin(account)}
                          className="w-full flex items-center px-3 py-3 text-left hover:bg-gray-50 rounded-lg transition-all group"
                        >
                          <div className={`w-8 h-8 ${account.bgColor} rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}>
                            <IconComponent className={`w-4 h-4 ${account.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 text-sm">{account.type} Account</div>
                            <div className="text-xs text-gray-500">{account.email}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-700">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login