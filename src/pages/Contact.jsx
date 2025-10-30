import { Mail, Phone, MapPin, Clock, Send, FileCheck, Building, Calculator } from 'lucide-react'
import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Have questions about our platform? Need help with property verification? 
          We're here to assist you every step of the way.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="card text-center hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
          <p className="text-gray-600 mb-3">Send us an email anytime</p>
          <div className="space-y-1">
            <p className="text-sm text-gray-700 font-medium">info@alstonair.com</p>
            <p className="text-sm text-gray-700 font-medium">support@nalindia.com</p>
          </div>
        </div>

        <div className="card text-center hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
          <p className="text-gray-600 mb-3">Mon-Fri 9AM-6PM IST</p>
          <p className="text-lg font-semibold text-gray-900">+91 80684 47416</p>
        </div>

        <div className="card text-center hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
          <p className="text-gray-600 mb-3">Our office in Bangalore</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            #28 Third floor MCHS Layout<br />
            KV Jayaram Road, Jakkur<br />
            Bangalore 560064
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="order-2 lg:order-1">
          <div className="card">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Send us a Message</h2>
              <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="verification">Document Verification</option>
                    <option value="property">Property Listing</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="input-field"
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <div>
                <button type="submit" className="btn-primary w-full md:w-auto">
                  {/* <Send className="w-4 h-4 mr-2" /> */}
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="order-1 lg:order-2 space-y-8">
          {/* Business Hours */}
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="font-medium text-gray-900">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday</span>
                <span className="font-medium text-gray-900">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="font-medium text-gray-900">Closed</span>
              </div>
            </div>
          </div>

          {/* About Alstonair */}
          <div className="card bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About Alstonair</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              NAL India is powered by Alstonair Technologies, empowering businesses with intelligent software solutions that drive innovation, efficiency, and growth across multiple industries.
            </p>
            <a 
              href="https://alstonair.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary text-sm inline-flex items-center"
            >
              Visit Alstonair
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Quick Links */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <a href="/verify" className="flex items-center text-gray-600 hover:text-primary-600 transition-colors">
                <FileCheck className="w-4 h-4 mr-3" />
                Document Verification
              </a>
              <a href="/properties" className="flex items-center text-gray-600 hover:text-primary-600 transition-colors">
                <Building className="w-4 h-4 mr-3" />
                Browse Properties
              </a>
              <a href="/loan-calculator" className="flex items-center text-gray-600 hover:text-primary-600 transition-colors">
                <Calculator className="w-4 h-4 mr-3" />
                Loan Calculator
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our platform and services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">How does document verification work?</h3>
            <p className="text-gray-600 leading-relaxed">
              Our AI-powered system analyzes your property documents using advanced algorithms to verify authenticity, 
              completeness, and legal compliance within minutes.
            </p>
          </div>
          <div className="card hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">Is my data secure?</h3>
            <p className="text-gray-600 leading-relaxed">
              Yes, we use enterprise-grade security measures. All documents are processed securely and deleted after verification. 
              Your privacy is our top priority.
            </p>
          </div>
          <div className="card hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">What types of properties can I list?</h3>
            <p className="text-gray-600 leading-relaxed">
              You can list residential, commercial, and industrial properties for sale, rent, or lease. 
              Our platform supports all property types across Bangalore.
            </p>
          </div>
          <div className="card hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">How accurate are the RIBL scores?</h3>
            <p className="text-gray-600 leading-relaxed">
              Our RIBL scoring system uses multiple data points and AI analysis to provide highly accurate property 
              quality assessments with over 95% reliability.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact