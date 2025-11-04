import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, X, Bot, User, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! 👋 I'm here to help you find your dream property. Are you looking to buy, sell, or rent?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [userContext, setUserContext] = useState({
    lookingFor: null,
    budget: null,
    location: null,
    propertyType: null
  })
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getContextualResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    // Intent detection for property search
    if (message.includes('buy') || message.includes('purchase')) {
      setUserContext(prev => ({...prev, lookingFor: 'buy'}))
      return "Great! Looking to buy a property 🏠 What's your budget range? And which area in Bangalore are you considering?"
    }
    
    if (message.includes('sell')) {
      setUserContext(prev => ({...prev, lookingFor: 'sell'}))
      return "Perfect! I can help you sell your property 💰 What type of property do you have? (Apartment/Villa/Plot/Commercial)"
    }
    
    if (message.includes('rent')) {
      setUserContext(prev => ({...prev, lookingFor: 'rent'}))
      return "Looking for a rental property? 🏡 What's your monthly budget and preferred location?"
    }
    
    // Budget detection
    if (message.match(/\d+\s*(lakh|crore|cr|l)/)) {
      const budget = message.match(/\d+\s*(lakh|crore|cr|l)/)[0]
      setUserContext(prev => ({...prev, budget}))
      return `Got it! Budget of ${budget} 💵 Which areas are you looking at? I can show you properties in Koramangala, Whitefield, HSR Layout, or other localities.`
    }
    
    // Location detection
    const locations = ['koramangala', 'whitefield', 'hsr', 'indiranagar', 'electronic city', 'sarjapur', 'marathahalli']
    const foundLocation = locations.find(loc => message.includes(loc))
    if (foundLocation) {
      setUserContext(prev => ({...prev, location: foundLocation}))
      return `${foundLocation.charAt(0).toUpperCase() + foundLocation.slice(1)} is a great choice! 📍 I found ${Math.floor(Math.random() * 50) + 10} properties there. What type are you looking for? (1BHK/2BHK/3BHK/Villa)`
    }
    
    // Property type detection
    if (message.includes('bhk') || message.includes('bedroom')) {
      const bhk = message.match(/(\d+)\s*bhk/)?.[1] || 'multi'
      return `Perfect! ${bhk}BHK properties 🏠 I can show you verified listings with photos, virtual tours, and RIBL scores. Want to see available options now?`
    }
    
    // Specific queries
    const responses = {
      'hello': 'Hey! 👋 Looking for a property? I can help you buy, sell, or rent in Bangalore!',
      'hi': 'Hi there! 😊 Are you looking to buy, sell, or rent a property today?',
      'loan': 'Need a home loan? 🏦 I can help you check eligibility, compare rates (starting 8.3%), and calculate EMI. What\'s your monthly income?',
      'emi': 'EMI Calculator 📊 Just tell me the loan amount, tenure, and I\'ll calculate your monthly EMI instantly!',
      'documents': 'Document verification made easy! 📄 Upload your sale deed, title deed, or NOC and get instant AI-powered verification.',
      'price': 'Want to know property prices? 💰 Tell me the area and property type, I\'ll share current market rates and trends.',
      'agent': 'Looking for an agent? 👨‍💼 I can connect you with RERA-verified agents in your area. Which locality?',
      'visit': 'Want to schedule a property visit? 📅 Just share the property ID or tell me your requirements!',
      'legal': 'Legal help needed? ⚖️ I can guide you through registration, stamp duty (3-5% in Karnataka), and documentation.',
      'investment': 'Property investment advice? 📈 I can analyze ROI, rental yields, and growth potential. Which area interests you?',
      
      // Legal & Documentation
      'rera': 'RERA = Real Estate (Regulation & Development) Act registration number that certifies project legality. ⚖️ All our listed properties are RERA-verified!',
      'rera number': 'RERA = Real Estate (Regulation & Development) Act registration number that certifies project legality. ⚖️ All our listed properties are RERA-verified!',
      'title verification': 'Title check is performed via Document Repository and Instant Verification API with land records. 📄 Upload your documents for instant verification!',
      'property title': 'Title check is performed via Document Repository and Instant Verification API with land records. 📄 Upload your documents for instant verification!',
      'noc': 'Typical NOCs: Municipal, Electricity, Water, and Fire Department — required before possession. 📋 I can help you track all required NOCs!',
      'noc requirements': 'Typical NOCs: Municipal, Electricity, Water, and Fire Department — required before possession. 📋 I can help you track all required NOCs!',
      'possession': 'After final payment and registration, possession handover occurs within 7 working days (on average). 🏠 Timeline may vary by project.',
      'possession timeline': 'After final payment and registration, possession handover occurs within 7 working days (on average). 🏠 Timeline may vary by project.',
      
      // Technical Support
      'save properties': 'Tap the ♥ icon or "Save Property" button on listing pages; view all saved items under "My Favorites." 💾 Easy property bookmarking!',
      'save property': 'Tap the ♥ icon or "Save Property" button on listing pages; view all saved items under "My Favorites." 💾 Easy property bookmarking!',
      'favorites': 'Tap the ♥ icon or "Save Property" button on listing pages; view all saved items under "My Favorites." 💾 Easy property bookmarking!',
      'schedule visit': 'Use "Book Site Visit." We notify the seller/agent instantly and confirm slot on your dashboard. 📅 Quick and easy scheduling!',
      'book visit': 'Use "Book Site Visit." We notify the seller/agent instantly and confirm slot on your dashboard. 📅 Quick and easy scheduling!',
      'site visit': 'Use "Book Site Visit." We notify the seller/agent instantly and confirm slot on your dashboard. 📅 Quick and easy scheduling!',
      'contact owner': 'Click "Contact Seller/Agent" to chat via WhatsApp or in-app messaging. 📱 Direct communication with property owners!',
      'contact seller': 'Click "Contact Seller/Agent" to chat via WhatsApp or in-app messaging. 📱 Direct communication with property owners!',
      'contact agent': 'Click "Contact Seller/Agent" to chat via WhatsApp or in-app messaging. 📱 Direct communication with property owners!',
      'compare properties': 'Use the Comparison Tool to see side-by-side differences in price, amenities, and RIBL scores. 📊 Smart property comparison!',
      'compare': 'Use the Comparison Tool to see side-by-side differences in price, amenities, and RIBL scores. 📊 Smart property comparison!',
      'comparison': 'Use the Comparison Tool to see side-by-side differences in price, amenities, and RIBL scores. 📊 Smart property comparison!'
    }
    
    for (const [key, response] of Object.entries(responses)) {
      if (message.includes(key)) return response
    }
    
    return "I'm here to help with all your property needs! 🏠 Try asking me about:\n\n🔍 Finding properties\n💰 Loan & EMI calculations\n📄 Document verification\n📊 Market prices\n👨‍💼 Connecting with agents\n📅 Scheduling visits\n\nWhat would you like to know?"
  }

  const quickReplies = [
    'Buy Property',
    'Sell Property',
    'Rent Property',
    'Check Loan EMI',
    'Verify Documents',
    'Market Prices'
  ]

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('homepage') || message.includes('home')) {
      navigate('/')
      return 'Taking you to homepage... 🏠'
    }
    
    return getContextualResponse(userMessage)
  }

  const handleSendMessage = (messageText = inputMessage) => {
    if (!messageText.trim()) return

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(messageText),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
      

    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative flex items-center justify-center">
          {/* Multiple Smaller Ripple Effects */}
          <div className="absolute w-16 h-16 bg-blue-400 rounded-full animate-ping opacity-15" style={{animationDuration: '3s'}}></div>
          <div className="absolute w-15 h-15 bg-blue-500 rounded-full animate-ping opacity-20" style={{animationDuration: '2.5s', animationDelay: '0.3s'}}></div>
          <div className="absolute w-14 h-14 bg-blue-600 rounded-full animate-ping opacity-25" style={{animationDuration: '2s', animationDelay: '0.6s'}}></div>
          <div className="absolute w-13 h-13 bg-blue-400 rounded-full animate-ping opacity-15" style={{animationDuration: '3.5s', animationDelay: '0.9s'}}></div>
          <div className="absolute w-12 h-12 bg-blue-500 rounded-full animate-pulse opacity-20" style={{animationDuration: '4s', animationDelay: '1.2s'}}></div>
          <div className="absolute w-11 h-11 bg-blue-600 rounded-full animate-ping opacity-25" style={{animationDuration: '2.8s', animationDelay: '1.5s'}}></div>
          
          {/* Main Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 z-10"
          >
            {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-primary-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <div>
                <h3 className="font-medium">NAL Assistant</h3>
                <p className="text-xs text-primary-100">Online now</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    message.sender === 'user' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {message.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  </div>
                  <div>
                    <div className={`p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Restart Button */}
          {messages.length > 2 && (
            <div className="px-4 pb-2 text-center">
              <button
                onClick={() => {
                  setMessages([{
                    id: 1,
                    text: "Hi there! 👋 I'm here to help you find your dream property. Are you looking to buy, sell, or rent?",
                    sender: 'bot',
                    timestamp: new Date()
                  }])
                  setUserContext({
                    lookingFor: null,
                    budget: null,
                    location: null,
                    propertyType: null
                  })
                }}
                className="text-xs bg-primary-100 hover:bg-primary-200 text-primary-700 px-3 py-1 rounded-full transition-colors"
              >
                🔄 Start New Conversation
              </button>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim()}
                className="px-3 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot