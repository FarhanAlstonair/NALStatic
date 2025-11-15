import React from 'react'
import { useLanguage } from '../context/LanguageContext'

const LanguageSwitcher = () => {
  const { currentLanguage, switchLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          currentLanguage === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('kn')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          currentLanguage === 'kn'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        ಕನ್ನಡ
      </button>
    </div>
  )
}

export default LanguageSwitcher