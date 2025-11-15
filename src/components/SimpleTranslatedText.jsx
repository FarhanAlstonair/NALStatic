import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

const SimpleTranslatedText = ({ children, className = '' }) => {
  const [translatedText, setTranslatedText] = useState(children)
  const { currentLanguage, translateText } = useLanguage()

  useEffect(() => {
    const translate = async () => {
      console.log('📝 SimpleTranslatedText rendering:', { text: children, currentLanguage })
      
      if (currentLanguage === 'en') {
        setTranslatedText(children)
      } else {
        const translated = await translateText(children, 'kn')
        console.log('✅ Translation result:', { original: children, translated })
        setTranslatedText(translated)
      }
    }
    translate()
  }, [children, currentLanguage, translateText])

  return <span className={className}>{translatedText}</span>
}

export default SimpleTranslatedText