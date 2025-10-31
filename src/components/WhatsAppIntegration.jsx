import { useState } from 'react'
import { MessageCircle, Phone, Share2, Bell } from 'lucide-react'

const WhatsAppIntegration = ({ propertyId, propertyTitle, propertyPrice, agentPhone = "+91-9876543210" }) => {
  const [showOptions, setShowOptions] = useState(false)

  const whatsappBaseUrl = "https://wa.me"
  
  const generateWhatsAppMessage = (type) => {
    const messages = {
      inquiry: `Hi! I'm interested in the property: ${propertyTitle} (₹${propertyPrice}). Can you provide more details? Property ID: ${propertyId}`,
      schedule: `Hello! I would like to schedule a visit for the property: ${propertyTitle}. When would be a good time? Property ID: ${propertyId}`,
      negotiate: `Hi! I'm interested in ${propertyTitle} and would like to discuss the pricing. Is there room for negotiation? Property ID: ${propertyId}`,
      share: `Check out this amazing property: ${propertyTitle} for ₹${propertyPrice}. View details at: ${window.location.href}`
    }
    return encodeURIComponent(messages[type])
  }

  const openWhatsApp = (type, phone = agentPhone) => {
    const message = generateWhatsAppMessage(type)
    const url = `${whatsappBaseUrl}/${phone.replace(/[^0-9]/g, '')}?text=${message}`
    window.open(url, '_blank')
    setShowOptions(false)
  }

  const shareProperty = () => {
    const message = generateWhatsAppMessage('share')
    const url = `${whatsappBaseUrl}?text=${message}`
    window.open(url, '_blank')
    setShowOptions(false)
  }

  return (
    <div className="relative">
      {/* Main WhatsApp Button */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        <span>WhatsApp</span>
      </button>

      {/* Options Dropdown */}
      {showOptions && (
        <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-48 z-50">
          <button
            onClick={() => openWhatsApp('inquiry')}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3"
          >
            <MessageCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm">Send Inquiry</span>
          </button>
          
          <button
            onClick={() => openWhatsApp('schedule')}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3"
          >
            <Phone className="w-4 h-4 text-blue-500" />
            <span className="text-sm">Schedule Visit</span>
          </button>
          
          <button
            onClick={() => openWhatsApp('negotiate')}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3"
          >
            <Bell className="w-4 h-4 text-orange-500" />
            <span className="text-sm">Negotiate Price</span>
          </button>
          
          <hr className="my-1" />
          
          <button
            onClick={shareProperty}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3"
          >
            <Share2 className="w-4 h-4 text-purple-500" />
            <span className="text-sm">Share Property</span>
          </button>
        </div>
      )}
    </div>
  )
}

// WhatsApp Notification Component
export const WhatsAppNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'price_alert',
      message: 'Price dropped for 3BHK in Koramangala',
      property: '3BHK Luxury Apartment',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'new_listing',
      message: 'New property matching your criteria',
      property: '2BHK Modern Flat',
      time: '5 hours ago'
    }
  ])

  const sendWhatsAppNotification = (notification) => {
    const message = encodeURIComponent(`🏠 NAL India Alert: ${notification.message}\n\nProperty: ${notification.property}\n\nView details: ${window.location.origin}`)
    const url = `${whatsappBaseUrl}?text=${message}`
    window.open(url, '_blank')
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-3">WhatsApp Notifications</h3>
      <div className="space-y-3">
        {notifications.map(notification => (
          <div key={notification.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{notification.message}</p>
              <p className="text-xs text-gray-500">{notification.property} • {notification.time}</p>
            </div>
            <button
              onClick={() => sendWhatsAppNotification(notification)}
              className="ml-3 p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhatsAppIntegration