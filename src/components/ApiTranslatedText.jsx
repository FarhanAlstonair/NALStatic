import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

// Global translation tracking
let translationCounter = 0;
let completedTranslations = 0;

const ApiTranslatedText = ({ 
  children, 
  translationKey,
  fallbackText,
  className = '', 
  as: Component = 'span',
  ...props 
}) => {
  const { currentLocale, translateContent } = useLanguage();
  const { t } = useTranslation();
  const [translatedText, setTranslatedText] = useState(children || fallbackText || '');
  const [isLoading, setIsLoading] = useState(false);
  const hasRegistered = useRef(false);

  useEffect(() => {
    // Register this component for translation tracking
    if (!hasRegistered.current && currentLocale !== 'en') {
      translationCounter++;
      hasRegistered.current = true;
    }

    const translateText = async () => {
      if (currentLocale === 'en') {
        setTranslatedText(children || fallbackText || '');
        return;
      }

      const textToTranslate = children || fallbackText || '';
      console.log('Translating:', textToTranslate, 'to', currentLocale);
      
      if (textToTranslate) {
        setIsLoading(true);
        try {
          // Try API translation first
          const apiTranslation = await translateContent(textToTranslate, currentLocale);
          console.log('Translation result:', apiTranslation);
          
          if (apiTranslation && apiTranslation !== textToTranslate) {
            setTranslatedText(apiTranslation);
          } else {
            // Fallback to local JSON
            if (translationKey) {
              const localTranslation = t(translationKey, '');
              if (localTranslation && localTranslation !== translationKey) {
                setTranslatedText(localTranslation);
              } else {
                setTranslatedText(textToTranslate);
              }
            } else {
              setTranslatedText(textToTranslate);
            }
          }
        } catch (error) {
          console.error('Translation error:', error);
          setTranslatedText(textToTranslate);
        } finally {
          setIsLoading(false);
          completedTranslations++;
          
          // Check if all translations are complete
          if (completedTranslations >= translationCounter) {
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('translationComplete'));
              // Reset counters for next translation
              translationCounter = 0;
              completedTranslations = 0;
            }, 100);
          }
        }
      }
    };

    translateText();
  }, [currentLocale, children, translationKey, fallbackText]);

  // Reset registration when language changes
  useEffect(() => {
    hasRegistered.current = false;
    if (currentLocale !== 'en') {
      translationCounter = 0;
      completedTranslations = 0;
    }
  }, [currentLocale]);

  // For option elements, return just text
  if (props.parent === 'option' || Component === 'option') {
    return translatedText;
  }

  return (
    <Component className={className} {...props}>
      {isLoading && currentLocale !== 'en' ? (children || fallbackText || '') : translatedText}
    </Component>
  );
};

export default ApiTranslatedText;