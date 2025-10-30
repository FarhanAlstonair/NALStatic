import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get in touch with our team. We're here to help you with all your property verification and real estate needs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">info@alstonair.com</p>
                  <p className="text-gray-600">support@nalindia.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+91 80684 47416</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">
                    Alstonair Technologies<br />
                    #28 Third floor MCHS Layout<br />
                    KV Jayaram Road, Jakkur<br />
                    Bangalore 560064<br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Alston Air Link */}
          <div className="card bg-primary-50 border-primary-200">
            <h3 className="font-semibold text-gray-900 mb-3">About Alstonair</h3>
            <p className="text-gray-600 mb-4">
              NAL India is powered by Alstonair Technologies, empowering businesses with intelligent software solutions that drive innovation, efficiency, and growth across multiple industries.
            </p>
            <a 
              href="https://alstonair.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              Visit Alstonair
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
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
                <button type="submit" className="btn-primary">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-3">How does document verification work?</h3>
            <p className="text-gray-600">
              Our AI-powered system analyzes your property documents using advanced algorithms to verify authenticity, 
              completeness, and legal compliance within minutes.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-3">Is my data secure?</h3>
            <p className="text-gray-600">
              Yes, we use enterprise-grade security measures. All documents are processed securely and deleted after 
              verification. We never store your sensitive information.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-3">What types of properties do you support?</h3>
            <p className="text-gray-600">
              We support residential, commercial, and industrial properties across India, including apartments, 
              villas, offices, retail spaces, and land parcels.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-3">How can I list my property?</h3>
            <p className="text-gray-600">
              Simply create an account, verify your documents, and use our property listing tool. Our team will 
              review and publish your listing within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact