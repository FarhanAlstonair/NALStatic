import { useState, useEffect } from 'react'
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
import { useLanguage } from '../context/LanguageContext'
import TranslatedText from '../components/TranslatedText'
import ApiTranslatedText from '../components/ApiTranslatedText'

// Import NAL icons
import nal1 from '../assets/icons/NAL/nal 1.png'
import nal2 from '../assets/icons/NAL/nal 2.png'
import nal3 from '../assets/icons/NAL/nal 3.png'
import nal4 from '../assets/icons/NAL/nal 4.png'
import nal5 from '../assets/icons/NAL/nal 5.png'
import nal6 from '../assets/icons/NAL/nal 6.png'
import nal7 from '../assets/icons/NAL/nal 7.png'
import nal8 from '../assets/icons/NAL/nal 8.png'
import nal9 from '../assets/icons/NAL/nal 9.png'
import nal10 from '../assets/icons/NAL/nal 10.png'
import nal11 from '../assets/icons/NAL/nal 11.png'

const Home = () => {
  const { isAuthenticated } = useAuth()
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const heroImages = [
    {
      url: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Modern City Skyline'
    },
    {
      url: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Luxury Villa'
    },
    {
      url: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Modern Apartments'
    },
    {
      url: 'https://images.pexels.com/photos/374023/pexels-photo-374023.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'City Buildings'
    },
    {
      url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Residential Complex'
    }
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])
  const coreFeatures = [
    {
      image: nal1,
      titleKey: 'features.instantDocumentVerification',
      title: 'Instant Document Verification',
      descriptionKey: 'features.instantDocumentVerificationDesc',
      description: 'Verify property documents automatically and quickly'
    },
    {
      image: nal2,
      titleKey: 'features.urgentSaleValue',
      title: 'Urgent Sale Value',
      descriptionKey: 'features.urgentSaleValueDesc',
      description: 'Get real-time property value estimations'
    },
    {
      image: nal3,
      titleKey: 'features.riblScorecard',
      title: 'RIBL Scorecard',
      descriptionKey: 'features.riblScorecardDesc',
      description: 'Property quality and ownership scoring'
    },
    {
      image: nal4,
      titleKey: 'features.buySellRentLease',
      title: 'Buy/Sell/Rent/Lease',
      descriptionKey: 'features.buySellRentLeaseDesc',
      description: 'Complete property transaction platform'
    },
    {
      image: nal5,
      titleKey: 'features.smartPropertySearch',
      title: 'Smart Property Search',
      descriptionKey: 'features.smartPropertySearchDesc',
      description: 'Advanced search with intelligent filters'
    },
    {
      image: nal6,
      titleKey: 'features.realtimeChatbot',
      title: 'Realtime Chatbot',
      descriptionKey: 'features.realtimeChatbotDesc',
      description: 'Instant assistance and communication'
    },
    {
      image: nal7,
      titleKey: 'features.propertyTrends',
      title: 'Property Trends',
      descriptionKey: 'features.propertyTrendsDesc',
      description: 'Market insights and trend analysis'
    },
    {
      image: nal8,
      titleKey: 'features.securePayments',
      title: 'Secure Payments',
      descriptionKey: 'features.securePaymentsDesc',
      description: 'Safe and secure payment gateway'
    }
  ]

  const stats = [
    { label: 'Properties Verified', translationKey: 'stats.propertiesVerified', value: '50K+' },
    { label: 'Active Users', translationKey: 'stats.activeUsers', value: '25K+' },
    { label: 'Successful Transactions', translationKey: 'stats.successfulTransactions', value: '15K+' },
    { label: 'Cities Covered', translationKey: 'stats.citiesCovered', value: '100+' }
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-screen">
        {/* Image Slider */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
            >
              <img 
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/60 via-[#1D4ED8]/70 to-indigo-200/50"></div>
          
          {/* Animated Particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-bounce"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-white/10 rounded-full animate-ping"></div>
            <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-white/25 rounded-full animate-bounce"></div>
          </div>
        </div>
        

        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center w-full">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-wide text-white">
              <ApiTranslatedText translationKey="hero.title">India's Most Trusted</ApiTranslatedText>
              <span className="block text-yellow-400"><ApiTranslatedText translationKey="hero.subtitle">Property Platform</ApiTranslatedText></span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed">
              <ApiTranslatedText translationKey="hero.description">Instant document verification, real-time valuations, and secure property transactions all in one place</ApiTranslatedText>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <Link to="/verify" className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-[#1E3A8A] transform hover:scale-105 transition-all duration-300 ease-in-out shadow-sm">
                <ApiTranslatedText translationKey="hero.verifyDocuments">Verify Documents</ApiTranslatedText>
              </Link>
              <Link to="/properties" className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-[#1E3A8A] transform hover:scale-105 transition-all duration-300 ease-in-out shadow-sm">
                <ApiTranslatedText translationKey="hero.browseProperties">Browse Properties</ApiTranslatedText>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500" style={{animationDelay: `${index * 100}ms`}}>
                <div className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-3 hover:scale-110 transition-transform duration-300 cursor-default">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium text-lg">
                  <ApiTranslatedText translationKey={stat.translationKey}>{stat.label}</ApiTranslatedText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              <ApiTranslatedText translationKey="features.coreFeatures">Core Features</ApiTranslatedText>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <ApiTranslatedText translationKey="features.coreDescription">Essential tools and features that make property transactions secure, fast, and reliable</ApiTranslatedText>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feature, index) => {
              return (
                <div key={index} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out h-full flex flex-col" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="flex justify-center mb-6">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-contain hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center">
                    <ApiTranslatedText translationKey={feature.titleKey} fallbackText={feature.title}>{feature.title}</ApiTranslatedText>
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base text-center flex-grow">
                    <ApiTranslatedText translationKey={feature.descriptionKey} fallbackText={feature.description}>{feature.description}</ApiTranslatedText>
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              <ApiTranslatedText translationKey="quickActions.title">Quick Actions</ApiTranslatedText>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              <ApiTranslatedText translationKey="quickActions.description">Get started with our most popular features</ApiTranslatedText>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/verify" className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[#1E3A8A] border-2 border-transparent group overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center" 
                  alt="Property document verification" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors duration-300"></div>
              </div>
              <div className="p-8 text-center">
                {/* <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 -mt-12 relative z-10 p-4">
                  <img 
                    src={nal1} 
                    alt="Document Verification"
                    className="w-12 h-12 object-contain"
                  />
                </div> */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#1E3A8A] transition-colors duration-300">
                  <ApiTranslatedText translationKey="quickActions.verifyDocuments">Verify Documents</ApiTranslatedText>
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 leading-relaxed mb-6">
                  <ApiTranslatedText translationKey="quickActions.verifyDocumentsDesc">Upload and verify property documents instantly</ApiTranslatedText>
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block bg-[#1E3A8A] text-white px-6 py-3 rounded-xl font-semibold">
                    <ApiTranslatedText translationKey="quickActions.clickToVerify">Click to Verify →</ApiTranslatedText>
                  </span>
                </div>
              </div>
            </Link>

            <Link to="/properties" className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[#1E3A8A] border-2 border-transparent group overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center" 
                  alt="Modern apartments" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors duration-300"></div>
              </div>
              <div className="p-8 text-center">
                {/* <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 -mt-12 relative z-10 p-4">
                  <img 
                    src={nal5} 
                    alt="Property Search"
                    className="w-12 h-12 object-contain"
                  />
                </div> */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#1E3A8A] transition-colors duration-300">
                  <ApiTranslatedText translationKey="quickActions.searchProperties">Search Properties</ApiTranslatedText>
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 leading-relaxed mb-6">
                  <ApiTranslatedText translationKey="quickActions.searchPropertiesDesc">Find your perfect property with smart filters</ApiTranslatedText>
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block bg-[#1E3A8A] text-white px-6 py-3 rounded-xl font-semibold">
                    <ApiTranslatedText translationKey="quickActions.clickToSearch">Click to Search →</ApiTranslatedText>
                  </span>
                </div>
              </div>
            </Link>

            <Link to="/post-property" className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[#1E3A8A] border-2 border-transparent group overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop&crop=center" 
                  alt="Property listing" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors duration-300"></div>
              </div>
              <div className="p-8 text-center">
                {/* <div className="w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 -mt-12 relative z-10 p-4">
                  <img 
                    src={nal4} 
                    alt="List Property"
                    className="w-12 h-12 object-contain"
                  />
                </div> */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#1E3A8A] transition-colors duration-300">
                  <ApiTranslatedText translationKey="quickActions.listProperty">List Property</ApiTranslatedText>
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 leading-relaxed mb-6">
                  <ApiTranslatedText translationKey="quickActions.listPropertyDesc">Post your property for sale, rent, or lease</ApiTranslatedText>
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block bg-[#1E3A8A] text-white px-6 py-3 rounded-xl font-semibold">
                    <ApiTranslatedText translationKey="quickActions.clickToList">Click to List →</ApiTranslatedText>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              <ApiTranslatedText translationKey="advancedFeatures.title">Advanced Features</ApiTranslatedText>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <ApiTranslatedText translationKey="advancedFeatures.description">Take advantage of our premium tools for smarter property decisions</ApiTranslatedText>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/bidding" className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 group h-full flex flex-col">
              <div className="text-center flex-1 flex flex-col">
                <div className="flex justify-center mb-6">
                  <img 
                    src={nal9} 
                    alt="Property Bidding"
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                  <ApiTranslatedText translationKey="advancedFeatures.propertyBidding">Property Bidding</ApiTranslatedText>
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-6 flex-grow">
                  <ApiTranslatedText translationKey="advancedFeatures.propertyBiddingDesc">Participate in live property auctions and get the best deals</ApiTranslatedText>
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold text-sm">
                    <ApiTranslatedText translationKey="advancedFeatures.clickToExplore">Click to Explore →</ApiTranslatedText>
                  </span>
                </div>
              </div>
            </Link>

            <Link to="/compare" className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 group h-full flex flex-col">
              <div className="text-center flex-1 flex flex-col">
                <div className="flex justify-center mb-6">
                  <img 
                    src={nal10} 
                    alt="Compare Properties"
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                  <ApiTranslatedText translationKey="advancedFeatures.compareProperties">Compare Properties</ApiTranslatedText>
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-6 flex-grow">
                  <ApiTranslatedText translationKey="advancedFeatures.comparePropertiesDesc">Compare multiple properties side by side to make informed decisions</ApiTranslatedText>
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold text-sm">
                    <ApiTranslatedText translationKey="advancedFeatures.clickToCompare">Click to Compare →</ApiTranslatedText>
                  </span>
                </div>
              </div>
            </Link>

            <Link to="/loan-calculator" className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 group h-full flex flex-col">
              <div className="text-center flex-1 flex flex-col">
                <div className="flex justify-center mb-6">
                  <img 
                    src={nal11} 
                    alt="Loan Calculator"
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                  <ApiTranslatedText translationKey="advancedFeatures.loanCalculator">Loan Calculator</ApiTranslatedText>
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-6 flex-grow">
                  <ApiTranslatedText translationKey="advancedFeatures.loanCalculatorDesc">Calculate EMI, eligibility, and plan your home loan effectively</ApiTranslatedText>
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold text-sm">
                    <ApiTranslatedText translationKey="advancedFeatures.clickToCalculate">Click to Calculate →</ApiTranslatedText>
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
              <ApiTranslatedText translationKey={isAuthenticated ? 'cta.explorePremiumProperties' : 'cta.readyToGetStarted'}>
                {isAuthenticated ? 'Explore Premium Properties' : 'Ready to Get Started?'}
              </ApiTranslatedText>
            </h2>
            <p className="text-xl md:text-2xl mb-6 text-blue-100 leading-relaxed">
              <ApiTranslatedText translationKey={isAuthenticated ? 'cta.discoverPerfectProperty' : 'cta.joinThousandsOfUsers'}>
                {isAuthenticated ? 'Discover your perfect property in Bangalore' : 'Join thousands of users who trust NAL for their property needs'}
              </ApiTranslatedText>
            </p>
            <p className="text-lg mb-10 text-blue-200">
              <ApiTranslatedText translationKey="cta.builtOnAlstonair">Built on Alstonair's enterprise-grade technology platform</ApiTranslatedText>
            </p>
            <Link to="/properties" className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-[#1E3A8A] transform hover:scale-105 transition-all duration-300 ease-in-out shadow-sm">
              <ApiTranslatedText translationKey="cta.exploreProperties">Explore Properties</ApiTranslatedText>
            </Link>
          </div>
        </div>  
      </section>
    </div>
  )
}

export default Home