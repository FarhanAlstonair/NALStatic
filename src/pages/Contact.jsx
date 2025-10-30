import { Mail, Phone, MapPin, Clock } from 'lucide-react'

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">Get in touch with our team for any queries or support.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="card">
            <Mail className="w-8 h-8 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600">support@nalindia.com</p>
          </div>
          
          <div className="card">
            <Phone className="w-8 h-8 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>
          
          <div className="card">
            <MapPin className="w-8 h-8 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-600">Mumbai, Maharashtra, India</p>
          </div>
          
          <div className="card">
            <Clock className="w-8 h-8 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
            <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Send Message</h3>
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="input-field" />
            <input type="email" placeholder="Your Email" className="input-field" />
            <input type="text" placeholder="Subject" className="input-field" />
            <textarea rows="4" placeholder="Your Message" className="input-field"></textarea>
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact