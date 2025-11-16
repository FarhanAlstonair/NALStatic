import { createContext, useContext, useState, useEffect } from 'react'

const LanguageLoadingOverlay = ({ currentLanguage }) => {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [dots, setDots] = useState('')
  
  const steps = currentLanguage === 'kn' ? [
    'ಭಾಷೆ ಬದಲಾಯಿಸಲಾಗುತ್ತಿದೆ...',
    'ಪಾಠ್ಯಗಳನ್ನು ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ...',
    'ಮೆನುಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
    'ವಿಷಯಗಳನ್ನು ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ...',
    'ಅಂತಿಮ ಸ್ಪರ್ಶಗಳು...'
  ] : [
    'Switching Language...',
    'Translating Content...',
    'Loading Menus...',
    'Processing Text...',
    'Final Touches...'
  ]
  
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / 150) // 15 seconds = 150 intervals
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return newProgress
      })
    }, 100)
    
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length)
    }, 3000)
    
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)
    
    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
      clearInterval(dotsInterval)
    }
  }, [])
  
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full mx-4 border border-gray-200">
        <div className="text-center space-y-6">
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-indigo-400 animate-spin" style={{animationDirection: 'reverse'}}></div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep]}{dots}
            </h2>
            <p className="text-gray-600">
              {currentLanguage === 'kn' ? 'ದಯವಿಟ್ಟು ಕಾಯಿರಿ, ಇದು ಕೆಲವು ಕ್ಷಣಗಳು ಸಮಯ ತಗೊಳ್ಳುತ್ತದೆ' : 'Please wait, this may take a few moments'}
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              {Math.round(progress)}% {currentLanguage === 'kn' ? 'ಪೂರ್ಣಗೊಂಡಿದೆ' : 'Complete'}
            </p>
          </div>
          
          <div className="flex justify-center space-x-2">
            {[0,1,2,3,4].map(i => (
              <div 
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentStep ? 'bg-blue-600 scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className="text-xs text-gray-400 italic">
            {currentLanguage === 'kn' ? 'ಕೆಲವು ಪಾಠ್ಯಗಳು ಇನ್ನೂ ಅನುವಾದಿಸಲಾಗುತ್ತಿವೆ' : 'Some text may still be translating after this'}
          </div>
        </div>
      </div>
    </div>
  )
}

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [translations, setTranslations] = useState({})
  const [isTranslating, setIsTranslating] = useState(false)
  const [isLanguageSwitching, setIsLanguageSwitching] = useState(false)

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

  const switchLanguage = async (language) => {
    if (language === currentLanguage) return
    
    setIsLanguageSwitching(true)
    setCurrentLanguage(language)
    
    // 15 second loading with interactive elements
    await new Promise(resolve => setTimeout(resolve, 15000))
    setIsLanguageSwitching(false)
  }

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      switchLanguage,
      translateText,
      isTranslating,
      isLanguageSwitching
    }}>
      {children}
      
      {/* Interactive Language Switching Loading Overlay */}
      {isLanguageSwitching && <LanguageLoadingOverlay currentLanguage={currentLanguage} />}
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