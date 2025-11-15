import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, Loader2 } from 'lucide-react';

const TranslationLoader = ({ isVisible, targetLanguage, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    { id: 1, message: 'Initializing translation engine...', duration: 800 },
    { id: 2, message: `Loading ${targetLanguage === 'kn' ? 'Kannada' : 'English'} language model...`, duration: 1200 },
    { id: 3, message: 'Processing content structure...', duration: 1000 },
    { id: 4, message: 'Applying contextual translations...', duration: 1400 },
    { id: 5, message: 'Finalizing language switch...', duration: 600 }
  ];

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0);
      setCompletedSteps([]);
      return;
    }

    let timeoutId;
    const processSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => {
          timeoutId = setTimeout(resolve, steps[i].duration);
        });
        setCompletedSteps(prev => [...prev, i]);
      }
      
      setTimeout(() => {
        onComplete?.();
      }, 800);
    };

    processSteps();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isVisible, targetLanguage, onComplete]);

  if (!isVisible) return null;

  return createPortal(
    <div className="fixed inset-0 bg-white z-[99999] flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Switching to {targetLanguage === 'kn' ? 'ಕನ್ನಡ' : 'English'}
          </h2>
          <p className="text-gray-600 text-sm">
            Please wait while we prepare your content
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {completedSteps.includes(index) ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : currentStep === index ? (
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-200 rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium transition-colors duration-200 ${
                  completedSteps.includes(index) 
                    ? 'text-green-600' 
                    : currentStep === index 
                    ? 'text-blue-600' 
                    : 'text-gray-400'
                }`}>
                  {step.message}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-300 ease-out"
              style={{ 
                width: `${((completedSteps.length + (currentStep < steps.length ? 0.5 : 0)) / steps.length) * 100}%` 
              }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {Math.round(((completedSteps.length + (currentStep < steps.length ? 0.5 : 0)) / steps.length) * 100)}% complete
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TranslationLoader;