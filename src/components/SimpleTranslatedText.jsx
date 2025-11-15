import React from 'react'
import { useLanguage } from '../context/LanguageContext'

const SimpleTranslatedText = ({ children, as: Component = 'span', ...props }) => {
  const { currentLanguage, translateText } = useLanguage()
  const [translatedText, setTranslatedText] = React.useState(children)

  React.useEffect(() => {
    if (currentLanguage === 'kn' && children) {
      translateText(children, 'kn').then(setTranslatedText)
    } else {
      setTranslatedText(children)
    }
  }, [children, currentLanguage, translateText])

  return <Component {...props}>{translatedText}</Component>
}

export default SimpleTranslatedText