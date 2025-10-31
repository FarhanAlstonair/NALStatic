import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, X, Bot, User, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm NAL Assistant. How can I help you with your property needs today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const predefinedResponses = {
    'hello': 'Hello! Welcome to NAL India. How can I assist you today?',
    'hi': 'Hi there! I\'m here to help with your property queries.',
    'property verification': 'Our document verification service uses AI to instantly verify property documents. You can upload documents like sale deeds, title deeds, and NOCs for quick verification.',
    'document verification': 'We verify various property documents including sale deeds, title deeds, NOCs, building approvals, and RERA certificates. The process takes just a few minutes.',
    'ribl score': 'RIBL Score is our proprietary scoring system that evaluates property quality, legal status, and investment potential on a scale of 1-100.',
    'property search': 'You can search properties by location, price range, property type (buy/sell/rent/lease), and various filters like BHK, amenities, and more.',
    'payment': 'We offer secure payment gateway integration for property transactions. All payments are encrypted and processed through trusted payment partners.',
    'contact': 'You can reach us at support@nalindia.com or call our helpline at +91-XXXXXXXXXX. Our team is available 24/7.',
    'pricing': 'Our pricing varies based on services. Document verification starts at ₹99, property listing is free, and premium features have subscription plans.',
    'rera': 'RERA (Real Estate Regulatory Authority) registration is mandatory for projects above 500 sq meters. We help verify RERA compliance for all listed properties.',
    'loan calculator': 'Our loan calculator helps you estimate EMI, eligibility, and compare offers from multiple banks. You can access it from the Services menu.',
    'property trends': 'We provide detailed market analysis, price trends, and growth predictions for different areas. Check our Property Trends section for insights.',
    'default': 'I understand you\'re asking about property services. Here are some things I can help with:\n\n• Property verification and documentation\n• RIBL score information\n• Property search and listings\n• Payment and pricing details\n• RERA compliance\n• Market trends and analysis\n\nWhat specific information would you like to know?'
  }

  const quickReplies = [
    'Document Verification',
    'Property Search',
    'RIBL Score',
    'Pricing'
  ]

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('homepage') || message.includes('home')) {
      navigate('/')
      return 'Redirecting you to homepage...'
    }
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (message.includes(key)) {
        return response
      }
    }
    
    return predefinedResponses.default
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
      
      // Show quick questions after bot response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now() + 2,
          text: '',
          sender: 'quick-questions',
          timestamp: new Date()
        }])
      }, 500)
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

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
                      {message.sender === 'quick-questions' ? (
                        <div>
                          <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                          <div className="flex flex-wrap gap-1">
                            {quickReplies.map((reply) => (
                              <button
                                key={reply}
                                onClick={() => handleSendMessage(reply)}
                                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
                              >
                                {reply}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                      )}
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

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSendMessage(reply)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
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