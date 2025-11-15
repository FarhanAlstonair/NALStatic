import { useState, useEffect } from 'react'
import kannadaTranslations from '../locales/kannada.json'

export const useTranslation = () => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('nal-language') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('nal-language', language)
    console.log('Language changed to:', language)
  }, [language])

  // Listen for language changes from other components
  useEffect(() => {
    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem('nal-language') || 'en'
      setLanguage(newLanguage)
    }

    window.addEventListener('languagechange', handleLanguageChange)
    return () => window.removeEventListener('languagechange', handleLanguageChange)
  }, [])

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj)
  }

  const t = (key, fallbackText = '') => {
    console.log('Translation request:', { key, language, fallbackText })
    
    if (language === 'en') {
      return fallbackText || key.split('.').pop()
    }

    if (language === 'kn') {
      const translation = getNestedValue(kannadaTranslations, key)
      console.log('Translation found:', translation)
      if (translation) {
        return translation
      }
    }

    return fallbackText || key.split('.').pop()
  }

  const changeLanguage = async (newLanguage) => {
    console.log('Changing language to:', newLanguage)
    
    // Trigger loading state via LanguageContext if available
    const event = new CustomEvent('languageSwitch', { detail: { locale: newLanguage } })
    window.dispatchEvent(event)
    
    setLanguage(newLanguage)
  }

  return {
    t,
    language,
    changeLanguage
  }
}