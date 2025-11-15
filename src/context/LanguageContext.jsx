import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [translations, setTranslations] = useState({})
  const [isTranslating, setIsTranslating] = useState(false)

  const translateText = async (text, targetLocale = 'kn') => {
    if (currentLanguage === 'en' || !text) {
      return text
    }
    
    const cacheKey = `${text}_${targetLocale}`
    if (translations[cacheKey]) {
      return translations[cacheKey]
    }

    try {
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
      const translatedText = result.translated
      
      setTranslations(prev => ({
        ...prev,
        [cacheKey]: translatedText
      }))
      
      return translatedText
    } catch (error) {
      console.error('Translation error:', error)
      return text
    } finally {
      setIsTranslating(false)
    }
  }

  const switchLanguage = (language) => {
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