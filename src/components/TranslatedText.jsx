import React from 'react'
import { useTranslation } from '../hooks/useTranslation'

const TranslatedText = ({ 
  translationKey, 
  fallbackText = '', 
  className = '', 
  as: Component = 'span',
  children,
  ...props 
}) => {
  try {
    const { t } = useTranslation()
    
    const text = translationKey 
      ? t(translationKey, fallbackText || children)
      : (fallbackText || children)

    // For option elements, return just text to avoid DOM nesting issues
    if (props.parent === 'option' || Component === 'option') {
      return text
    }

    return (
      <Component className={className} {...props}>
        {text}
      </Component>
    )
  } catch (error) {
    console.error('TranslatedText error:', error)
    return fallbackText || children || ''
  }
}

export default TranslatedText