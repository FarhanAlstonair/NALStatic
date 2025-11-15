const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json())

// Sample properties data
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
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560449752-d9d7c2c1e5c4?w=400&h=300&fit=crop'
    ],
    verified: true,
    riblScore: 'A+',
    urgentSale: true,
    originalPrice: '₹2.2 Cr',
    whatsapp: '+91 98765 43210',
    postedBy: 'Owner',
    postedDate: '2 days ago',
    amenities: ['Parking', 'Gym', 'Swimming Pool'],
    lat: 12.9352,
    lng: 77.6245
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
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    ],
    verified: true,
    riblScore: 'A',
    whatsapp: '+91 87654 32109',
    postedBy: 'Agent',
    postedDate: '1 week ago',
    amenities: ['Parking', 'Security'],
    lat: 12.9784,
    lng: 77.6408
  },
  {
    id: 3,
    title: 'Commercial Office Space IT Park',
    location: 'Whitefield IT Hub, Bangalore',
    price: '₹85,000/month',
    type: 'lease',
    bedrooms: 0,
    bathrooms: 2,
    area: 800,
    images: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop'
    ],
    verified: false,
    riblScore: 'B',
    whatsapp: '+91 76543 21098',
    postedBy: 'Builder',
    postedDate: '3 days ago',
    amenities: ['Parking', 'Cafeteria'],
    lat: 12.9698,
    lng: 77.7500
  },
  {
    id: 4,
    title: '4BHK Independent Villa with Garden',
    location: 'HSR Layout Sector 2, Bangalore',
    price: '₹2.8 Cr',
    type: 'sale',
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    images: [
      'https://th.bing.com/th/id/OIP.K-jzj1ZkjP7SmF2nxgSsCQHaFj?w=220&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    ],
    verified: true,
    riblScore: 'A+',
    urgentSale: true,
    originalPrice: '₹3.2 Cr',
    whatsapp: '+91 65432 10987',
    postedBy: 'Owner',
    postedDate: '1 day ago',
    amenities: ['Garden', 'Parking', 'Security'],
    lat: 12.9116,
    lng: 77.6473
  },
  {
    id: 5,
    title: '1BHK Studio Near Metro Station',
    location: 'Koramangala 1st Block, Bangalore',
    price: '₹22,000/month',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    area: 450,
    images: [
      'https://th.bing.com/th/id/OIP.42IrADvcICS4Mx8US1PK1QHaEK?w=244&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
    ],
    verified: true,
    riblScore: 'C',
    whatsapp: '+91 54321 09876',
    postedBy: 'Agent',
    postedDate: '5 days ago',
    amenities: ['Parking'],
    lat: 12.8440,
    lng: 77.6630
  }
]

// Routes
app.get('/api/properties', (req, res) => {
  try {
    // Simulate API delay
    setTimeout(() => {
      res.json({
        success: true,
        properties: properties,
        total: properties.length
      })
    }, 500)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch properties'
    })
  }
})

app.get('/api/properties/:id', (req, res) => {
  try {
    const propertyId = parseInt(req.params.id)
    const property = properties.find(p => p.id === propertyId)
    
    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      })
    }
    
    res.json({
      success: true,
      property: property
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch property'
    })
  }
})

// Translation endpoint (existing)
app.post('/api/translate', async (req, res) => {
  try {
    const { text, sourceLocale, targetLocale } = req.body
    
    if (!text || !targetLocale) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    
    // Simple mock translation for demo
    const mockTranslations = {
      'Properties': 'ಗುಣಲಕ್ಷಣಗಳು',
      'Services': 'ಸೇವೆಗಳು',
      'Analytics': 'ವಿಶ್ಲೇಷಣೆ',
      'Resources': 'ಸಂಪನ್ಮೂಲಗಳು',
      'About': 'ಬಗ್ಗೆ',
      'Login': 'ಲಾಗಿನ್',
      'NAL India': 'ಎನ್‌ಎಎಲ್ ಇಂಡಿಯಾ',
      'by Alstonair Technologies': 'ಆಲ್ಸ್ಟನ್‌ಏರ್ ಟೆಕ್ನಾಲಜೀಸ್ ಮೂಲಕ',
      'India\'s most trusted property verification and real estate platform. Empowering property decisions with AI-powered document verification and comprehensive market insights.': 'ಭಾರತದ ಅತ್ಯಂತ ವಿಶ್ವಾಸಾರ್ಹ ಆಸ್ತಿ ಪರಿಶೀಲನೆ ಮತ್ತು ರಿಯಲ್ ಎಸ್ಟೇಟ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್. AI-ಚಾಲಿತ ದಾಖಲೆ ಪರಿಶೀಲನೆ ಮತ್ತು ಸಮಗ್ರ ಮಾರುಕಟ್ಟೆ ಒಳನೋಟಗಳೊಂದಿಗೆ ಆಸ್ತಿ ನಿರ್ಧಾರಗಳನ್ನು ಸಶಕ್ತಗೊಳಿಸುವುದು.',
      'AI-Powered Verification': 'AI-ಚಾಲಿತ ಪರಿಶೀಲನೆ',
      'RIBL Scorecard System': 'RIBL ಸ್ಕೋರ್‌ಕಾರ್ಡ್ ವ್ಯವಸ್ಥೆ',
      'Instant Document Check': 'ತತ್ಕ್ಷಣ ದಾಖಲೆ ಪರಿಶೀಲನೆ',
      'Secure Transactions': 'ಸುರಕ್ಷಿತ ವಹಿವಾಟುಗಳು',
      'NAL Services': 'ಎನ್‌ಎಎಲ್ ಸೇವೆಗಳು',
      'Document Verification': 'ದಾಖಲೆ ಪರಿಶೀಲನೆ',
      'Property Listings': 'ಆಸ್ತಿ ಪಟ್ಟಿಗಳು',
      'Urgent Sale Value': 'ತುರ್ತು ಮಾರಾಟ ಮೌಲ್ಯ',
      'AI Recommendations': 'AI ಶಿಫಾರಸುಗಳು',
      'Price Prediction': 'ಬೆಲೆ ಮುನ್ಸೂಚನೆ',
      'Property Bidding': 'ಆಸ್ತಿ ಬಿಡ್ಡಿಂಗ್',
      'Property Ads': 'ಆಸ್ತಿ ಜಾಹೀರಾತುಗಳು',
      'Document Repository': 'ದಾಖಲೆ ಭಂಡಾರ',
      'Booking Management': 'ಬುಕಿಂಗ್ ನಿರ್ವಹಣೆ',
      'Products': 'ಉತ್ಪಾದನೆಗಳು',
      'Company': 'ಕಂಪನಿ',
      'Alstonair Technologies': 'ಆಲ್ಸ್ಟನ್‌ಏರ್ ಟೆಕ್ನಾಲಜೀಸ್',
      'About NAL': 'ಎನ್‌ಎಎಲ್ ಬಗ್ಗೆ',
      'Contact Us': 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
      'Careers': 'ವೃತ್ತಿಗಳು',
      'Address': 'ವಿಳಾಸ',
      '#28 Third floor MCHS Layout': '#28 ಮೂರನೇ ಮಹಡಿ MCHS ಲೇಔಟ್',
      'KV Jayaram Road, Jakkur': 'ಕೆವಿ ಜಯರಾಮ್ ರಸ್ತೆ, ಜಕ್ಕೂರು',
      'Bangalore 560064, India': 'ಬೆಂಗಳೂರು 560064, ಭಾರತ',
      '© 2025 Alstonair Technologies Private Limited. All rights reserved.': '© 2025 ಆಲ್ಸ್ಟನ್‌ಏರ್ ಟೆಕ್ನಾಲಜೀಸ್ ಪ್ರೈವೇಟ್ ಲಿಮಿಟೆಡ್. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
      'Privacy Policy': 'ಗೌಪ್ಯತೆ ನೀತಿ',
      'Terms of Service': 'ಸೇವೆಯ ನಿಯಮಗಳು',
      'Empowering businesses with intelligent software solutions that drive innovation, efficiency, and growth across multiple industries.': 'ಬಹು ಉದ್ಯಮಗಳಲ್ಲಿ ನಾವೀನ್ಯತೆ, ದಕ್ಷತೆ ಮತ್ತು ಬೆಳವಣಿಗೆಯನ್ನು ಚಾಲನೆ ಮಾಡುವ ಬುದ್ಧಿವಂತ ಸಾಫ್ಟ್‌ವೇರ್ ಪರಿಹಾರಗಳೊಂದಿಗೆ ವ್ಯವಸಾಯಗಳನ್ನು ಸಶಕ್ತಗೊಳಿಸುವುದು.',
      'Properties in Bangalore': 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಆಸ್ತಿಗಳು',
      'results': 'ಫಲಿತಾಂಶಗಳು',
      'Verified listings': 'ಪರಿಶೀಲಿತ ಪಟ್ಟಿಗಳು',
      'Post Property FREE': 'ಆಸ್ತಿಯನ್ನು ಉಚಿತವಾಗಿ ಪೋಸ್ಟ್ ಮಾಡಿ',
      'Loading properties...': 'ಆಸ್ತಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
      'Failed to load properties': 'ಆಸ್ತಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ',
      'Please check your connection and try again': 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
      'Retry': 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
      'Using cached data': 'ಕ್ಯಾಶ್ ಮಾಡಿದ ಡೇಟಾವನ್ನು ಬಳಸಲಾಗುತ್ತಿದೆ'
    }
    
    const translated = mockTranslations[text] || text
    
    res.json({ translated })
  } catch (error) {
    console.error('Translation error:', error)
    res.status(500).json({ error: 'Translation failed' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})