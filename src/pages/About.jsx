import { Shield, Users, Award, Target } from 'lucide-react'

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About NAL India</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          India's most trusted property verification and listing platform, revolutionizing real estate transactions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="card">
          <Shield className="w-12 h-12 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Trusted Platform</h3>
          <p className="text-gray-600">Verified properties and secure transactions for peace of mind.</p>
        </div>
        <div className="card">
          <Users className="w-12 h-12 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Team</h3>
          <p className="text-gray-600">Professional real estate experts guiding you every step.</p>
        </div>
        <div className="card">
          <Award className="w-12 h-12 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Award Winning</h3>
          <p className="text-gray-600">Recognized for excellence in property services.</p>
        </div>
        <div className="card">
          <Target className="w-12 h-12 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Focus</h3>
          <p className="text-gray-600">Dedicated to delivering exceptional customer experiences.</p>
        </div>
      </div>
    </div>
  )
}

export default About