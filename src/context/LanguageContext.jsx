import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

console.log('🚀 Initializing translation service with API caching')

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [translations, setTranslations] = useState({})
  const [isTranslating, setIsTranslating] = useState(false)

  const translateText = async (text, targetLocale = 'kn') => {
    console.log('🔄 Translation Request:', { text, targetLocale, currentLanguage })
    
    if (currentLanguage === 'en' || !text) {
      console.log('⏭️ Using English text:', text)
      return text
    }
    
    const cacheKey = `${text}_${targetLocale}`
    if (translations[cacheKey]) {
      console.log('💾 Using cached translation:', translations[cacheKey])
      return translations[cacheKey]
    }

    try {
      console.log('🌐 Calling backend API for:', text)
      setIsTranslating(true)
      
      const response = await fetch('http://localhost:3001/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          sourceLocale: 'en',
          targetLocale: targetLocale,
        }),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      console.log('✅ Translation successful - CACHING:', { original: text, translated: result.translated })
      
      const translatedText = result.translated
      setTranslations(prev => ({
        ...prev,
        [cacheKey]: translatedText
      }))
      
      return translatedText
    } catch (error) {
      console.error('❌ Translation error:', {
        text,
        targetLocale,
        error: error.message
      })
      return text
    } finally {
      setIsTranslating(false)
    }
  }

  const switchLanguage = (language) => {
    console.log('🌍 Language switch:', { from: currentLanguage, to: language })
    setCurrentLanguage(language)
  }

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      switchLanguage,
      translateText,
      isTranslating
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}