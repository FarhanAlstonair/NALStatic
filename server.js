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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🌐 Translation server running on http://localhost:${PORT}`)
})