import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

export const useTranslation = () => {
  const { currentLanguage, translateText } = useLanguage()

  const t = async (text) => {
    if (currentLanguage === 'en') return text
    return await translateText(text, 'kn')
  }

  return { t, currentLanguage }
}

export const TranslatedText = ({ children, className = '' }) => {
  const [translatedText, setTranslatedText] = useState(children)
  const { currentLanguage, translateText } = useLanguage()

  useEffect(() => {
    const translate = async () => {
      if (currentLanguage === 'en') {
        setTranslatedText(children)
      } else {
        const translated = await translateText(children, 'kn')
        setTranslatedText(translated)
      }
    }
    translate()
  }, [children, currentLanguage, translateText])

  return <span className={className}>{translatedText}</span>
}