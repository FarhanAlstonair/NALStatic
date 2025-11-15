const express = require('express')
const cors = require('cors')
const { LingoDotDevEngine } = require('lingo.dev/sdk')
require('dotenv').config()

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json())

// Initialize Lingo.dev
const lingoDotDev = new LingoDotDevEngine({
  apiKey: process.env.VITE_LINGO_API_KEY,
})

console.log('🚀 Server starting with Lingo API key:', process.env.VITE_LINGO_API_KEY ? 'Present' : 'Missing')

// Translation endpoint
app.post('/api/translate', async (req, res) => {
  try {
    const { text, sourceLocale = 'en', targetLocale = 'kn' } = req.body
    
    console.log('🔄 Translation request:', { text, sourceLocale, targetLocale })
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' })
    }

    const result = await lingoDotDev.localizeObject(
      { text },
      { sourceLocale, targetLocale }
    )

    console.log('✅ Translation successful:', { original: text, translated: result.text })
    
    res.json({ 
      original: text,
      translated: result.text,
      sourceLocale,
      targetLocale 
    })
  } catch (error) {
    console.error('❌ Translation error:', {
      text: req.body.text,
      error: error.message,
      stack: error.stack
    })
    
    res.status(500).json({ 
      error: 'Translation failed',
      message: error.message,
      original: req.body.text
    })
  }
})

// Properties endpoint
app.get('/api/properties', (req, res) => {
  const properties = [
    {
      id: 1,
      title: '3BHK Luxury Apartment in Prime Location',
      location: 'Koramangala 5th Block, Bangalore',
      price: '₹1.8 Cr',
      type: 'sale',
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      images: [
        'https://imagecdn.99acres.com/media1/32690/10/653810107M-1759080334729.jpg',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
      ],
      verified: true,
      riblScore: 'A+',
      urgentSale: true,
      originalPrice: '₹2.2 Cr',
      whatsapp: '+91 98765 43210',
      postedBy: 'Owner',
      postedDate: '2 days ago',
      amenities: ['Parking', 'Gym', 'Swimming Pool']
    },
    {
      id: 2,
      title: '2BHK Modern Flat with Balcony',
      location: 'Indiranagar Metro Station, Bangalore',
      price: '₹35,000/month',
      type: 'rent',
      bedrooms: 2,
      bathrooms: 2,
      area: 950,
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'
      ],
      verified: true,
      riblScore: 'A',
      whatsapp: '+91 87654 32109',
      postedBy: 'Agent',
      postedDate: '1 week ago',
      amenities: ['Parking', 'Security']
    }
  ]
  
  res.json({ properties })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🌐 Translation server running on http://localhost:${PORT}`)
})