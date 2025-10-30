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

const Home = () => {
  const coreFeatures = [
    {
      icon: FileCheck,
      title: 'Instant Document Verification',
      description: 'Verify property documents automatically and quickly',
      color: 'bg-green-500'
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
      color: 'bg-yellow-500'
    },
    {
      icon: Building,
      title: 'Buy/Sell/Rent/Lease',
      description: 'Complete property transaction platform',
      color: 'bg-purple-500'
    },
    {
      icon: Search,
      title: 'Smart Property Search',
      description: 'Advanced search with intelligent filters',
      color: 'bg-indigo-500'
    },
    {
      icon: MessageCircle,
      title: 'Realtime Chatbot',
      description: 'Instant assistance and communication',
      color: 'bg-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Property Trends',
      description: 'Market insights and trend analysis',
      color: 'bg-orange-500'
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Safe and secure payment gateway',
      color: 'bg-red-500'
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
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              India's Most Trusted
              <span className="block text-yellow-300">Property Platform</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Instant document verification, real-time valuations, and secure property transactions all in one place
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/verify" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                Verify Documents
              </Link>
              <Link to="/properties" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                Browse Properties
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Core Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Essential tools and features that make property transactions secure, fast, and reliable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <p className="text-xl text-gray-600">
              Get started with our most popular features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/verify" className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Verify Documents
                </h3>
                <p className="text-gray-600">
                  Upload and verify property documents instantly
                </p>
              </div>
            </Link>

            <Link to="/search" className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Search Properties
                </h3>
                <p className="text-gray-600">
                  Find your perfect property with smart filters
                </p>
              </div>
            </Link>

            <Link to="/properties" className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  List Property
                </h3>
                <p className="text-gray-600">
                  Post your property for sale, rent, or lease
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Category 2 Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Advanced Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take advantage of our premium tools for smarter property decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/bidding" className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gavel className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Property Bidding
              </h3>
              <p className="text-gray-600">
                Participate in live property auctions and get the best deals
              </p>
            </div>
          </Link>

          <Link to="/compare" className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <GitCompare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Compare Properties
              </h3>
              <p className="text-gray-600">
                Compare multiple properties side by side to make informed decisions
              </p>
            </div>
          </Link>

          <Link to="/loan-calculator" className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Loan Calculator
              </h3>
              <p className="text-gray-600">
                Calculate EMI, eligibility, and plan your home loan effectively
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of users who trust NAL India for their property needs
            </p>
            <Link to="/profile" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home