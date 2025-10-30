import { Building, Users, Award, Target, Globe, Shield } from 'lucide-react'

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About NAL India
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Revolutionizing property verification and real estate solutions through cutting-edge technology and AI-powered insights.
        </p>
      </div>

      {/* Company Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              NAL India is a flagship product of <strong>Alstonair Technologies</strong>, empowering businesses with 
              intelligent software solutions that drive innovation, efficiency, and growth across multiple industries.
            </p>
            <p>
              Founded with the vision to bring transparency and trust to India's real estate market, we leverage 
              artificial intelligence, machine learning, and advanced analytics to provide comprehensive property 
              verification and investment insights.
            </p>
            <p>
              Our platform combines cutting-edge technology with deep market expertise to help buyers, sellers, 
              and investors make informed decisions in the complex world of real estate.
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Powered by Alstonair</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Globe className="w-6 h-6 text-primary-600" />
              <span className="text-gray-700">Global technology expertise</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-primary-600" />
              <span className="text-gray-700">Enterprise-grade security</span>
            </div>
            <div className="flex items-center space-x-3">
              <Award className="w-6 h-6 text-primary-600" />
              <span className="text-gray-700">Industry-leading innovation</span>
            </div>
            <div className="mt-6">
              <a 
                href="https://alstonair.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Visit Alstonair
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="card">
          <Target className="w-12 h-12 text-primary-600 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
          <p className="text-gray-600">
            To democratize access to reliable property information and create a transparent, 
            efficient real estate ecosystem that benefits all stakeholders through technology-driven solutions.
          </p>
        </div>
        <div className="card">
          <Building className="w-12 h-12 text-primary-600 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
          <p className="text-gray-600">
            To become India's most trusted platform for property verification and real estate intelligence, 
            setting new standards for transparency and reliability in the industry.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          What Makes Us Different
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Verification</h3>
            <p className="text-gray-600">
              Advanced AI algorithms analyze documents and property data to provide instant, accurate verification results.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Team</h3>
            <p className="text-gray-600">
              Our team combines real estate expertise with cutting-edge technology to deliver unparalleled insights.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Trusted Platform</h3>
            <p className="text-gray-600">
              Built on Alstonair's robust infrastructure, ensuring reliability, security, and scalability.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-primary-50 rounded-2xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Our Impact
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">10K+</div>
            <p className="text-gray-600">Documents Verified</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">5K+</div>
            <p className="text-gray-600">Properties Listed</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">2K+</div>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
            <p className="text-gray-600">Cities Covered</p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Transform Your Real Estate Experience?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of users who trust NAL India for their property needs.
        </p>
        <div className="space-x-4">
          <a href="/contact" className="btn-primary">
            Get Started
          </a>
          <a href="/properties" className="btn-secondary">
            Browse Properties
          </a>
        </div>
      </div>
    </div>
  )
}

export default About