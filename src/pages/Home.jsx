import { Link } from 'react-router-dom'
import { 
  FileCheck, 
  DollarSign, 
  Star, 
  Building, 
  Search, 
  MessageCircle, 
  TrendingUp, 
  CreditCard,
  MapPin,
  FolderOpen,
  FileText,
  BarChart3,
  Gavel,
  GitCompare,
  Calculator
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { isAuthenticated } = useAuth()
  const coreFeatures = [
    {
      icon: FileCheck,
      title: 'Instant Document Verification',
      description: 'Verify property documents automatically and quickly',
      color: 'bg-emerald-500'
    },
    {
      icon: DollarSign,
      title: 'Urgent Sale Value',
      description: 'Get real-time property value estimations',
      color: 'bg-blue-500'
    },
    {
      icon: Star,
      title: 'RIBL Scorecard',
      description: 'Property quality and ownership scoring',
      color: 'bg-amber-500'
    },
    {
      icon: Building,
      title: 'Buy/Sell/Rent/Lease',
      description: 'Complete property transaction platform',
      color: 'bg-indigo-500'
    },
    {
      icon: Search,
      title: 'Smart Property Search',
      description: 'Advanced search with intelligent filters',
      color: 'bg-emerald-500'
    },
    {
      icon: MessageCircle,
      title: 'Realtime Chatbot',
      description: 'Instant assistance and communication',
      color: 'bg-blue-500'
    },
    {
      icon: TrendingUp,
      title: 'Property Trends',
      description: 'Market insights and trend analysis',
      color: 'bg-amber-500'
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Safe and secure payment gateway',
      color: 'bg-indigo-500'
    }
  ]

  const stats = [
    { label: 'Properties Verified', value: '50K+' },
    { label: 'Active Users', value: '25K+' },
    { label: 'Successful Transactions', value: '15K+' },
    { label: 'Cities Covered', value: '100+' }
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop&crop=center" 
            alt="Modern city skyline" 
            className="w-full h-full object-cover"
          />
<div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/50 via-[#1D4ED8]/70 to-indigo-200/50"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-wide text-white">
              India's Most Trusted
              <span className="block text-yellow-400">Property Platform</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Instant document verification, real-time valuations, and secure property transactions all in one place
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <Link to={isAuthenticated ? "/verify" : "/login"} className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-[#1E3A8A] transform hover:scale-105 transition-all duration-300 ease-in-out">
                Verify Documents
              </Link>
              <Link to="/properties" className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-[#1E3A8A] transform hover:scale-105 transition-all duration-300 ease-in-out">
                Browse Properties
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500" style={{animationDelay: `${index * 100}ms`}}>
                <div className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-3 hover:scale-110 transition-transform duration-300 cursor-default">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Core Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Essential tools and features that make property transactions secure, fast, and reliable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out border border-gray-100 animate-in fade-in slide-in-from-bottom-4" style={{animationDelay: `${index * 100}ms`}}>
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Quick Actions
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Get started with our most popular features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to={isAuthenticated ? "/verify" : "/login"} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[#1E3A8A] border-2 border-transparent group overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=200&fit=crop&crop=center" 
                  alt="Document verification" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors duration-300"></div>
              </div>
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 -mt-12 relative z-10">
                  <FileCheck className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#1E3A8A] transition-colors duration-300">
                  Verify Documents
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 leading-relaxed mb-6">
                  Upload and verify property documents instantly
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block bg-[#1E3A8A] text-white px-6 py-3 rounded-xl font-semibold">
                    Click to Verify →
                  </span>
                </div>
              </div>
            </Link>

            <Link to="/properties" className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[#1E3A8A] border-2 border-transparent group overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=200&fit=crop&crop=center" 
                  alt="Modern apartment interior" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors duration-300"></div>
              </div>
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 -mt-12 relative z-10">
                  <Search className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#1E3A8A] transition-colors duration-300">
                  Search Properties
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 leading-relaxed mb-6">
                  Find your perfect property with smart filters
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block bg-[#1E3A8A] text-white px-6 py-3 rounded-xl font-semibold">
                    Click to Search →
                  </span>
                </div>
              </div>
            </Link>

            <Link to="/post-property" className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[#1E3A8A] border-2 border-transparent group overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=200&fit=crop&crop=center" 
                  alt="Real estate agent with keys" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors duration-300"></div>
              </div>
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 -mt-12 relative z-10">
                  <Building className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#1E3A8A] transition-colors duration-300">
                  List Property
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 leading-relaxed mb-6">
                  Post your property for sale, rent, or lease
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block bg-[#1E3A8A] text-white px-6 py-3 rounded-xl font-semibold">
                    Click to List →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Advanced Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Take advantage of our premium tools for smarter property decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/bidding" className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 border border-gray-100 hover:border-indigo-600 group">
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Gavel className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                  Property Bidding
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 leading-relaxed mb-6">
                  Participate in live property auctions and get the best deals
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold">
                    Click to Explore →
                  </span>
                </div>
              </div>
            </Link>

            <Link to="/compare" className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 border border-gray-100 hover:border-indigo-600 group">
              <div className="text-center">
                <div className="w-20 h-20 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <GitCompare className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                  Compare Properties
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 leading-relaxed mb-6">
                  Compare multiple properties side by side to make informed decisions
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold">
                    Click to Compare →
                  </span>
                </div>
              </div>
            </Link>

            <Link to="/loan-calculator" className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 border border-gray-100 hover:border-indigo-600 group">
              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Calculator className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                  Loan Calculator
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 leading-relaxed mb-6">
                  Calculate EMI, eligibility, and plan your home loan effectively
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold">
                    Click to Calculate →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=800&fit=crop&crop=center" 
            alt="Modern city buildings" 
            className="w-full h-full object-cover"
          />
<div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/50 via-[#1D4ED8]/70 to-indigo-200/50"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              {isAuthenticated ? 'Explore Premium Properties' : 'Ready to Get Started?'}
            </h2>
            <p className="text-xl md:text-2xl mb-6 text-blue-100 leading-relaxed">
              {isAuthenticated ? 'Discover your perfect property in Bangalore' : 'Join thousands of users who trust NAL for their property needs'}
            </p>
            <p className="text-lg mb-10 text-blue-200">
              Built on Alstonair's enterprise-grade technology platform
            </p>
            <Link to={isAuthenticated ? "/properties" : "/signup"} className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-[#1E3A8A] transform hover:scale-105 transition-all duration-300 ease-in-out">
              {isAuthenticated ? 'Explore Properties' : 'Get Started Today'}
            </Link>
          </div>
        </div>  
      </section>
    </div>
  )
}

export default Home