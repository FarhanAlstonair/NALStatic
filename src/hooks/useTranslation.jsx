import { useLanguage } from '../context/LanguageContext'

export const useTranslation = () => {
  const { currentLanguage, switchLanguage, translateText, isTranslating } = useLanguage()

  const t = async (key, fallback = key) => {
    if (currentLanguage === 'en') {
      return fallback
    }
    return await translateText(fallback, currentLanguage)
  }

  const changeLanguage = (lang) => {
    switchLanguage(lang)
  }

  return {
    t,
    currentLanguage,
    changeLanguage,
    isTranslating
  }
}