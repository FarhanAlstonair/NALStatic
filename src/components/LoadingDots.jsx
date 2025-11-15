import React from 'react';
import { createPortal } from 'react-dom';

export const LoadingDots = ({ isVisible, onComplete }) => {
  const [completed, setCompleted] = React.useState(false);

  React.useEffect(() => {
    if (isVisible) {
      setCompleted(false);
      if (onComplete) {
        const timer = setTimeout(() => {
          if (!completed) {
            setCompleted(true);
            onComplete();
          }
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, onComplete, completed]);

  const handleClick = () => {
    if (!completed && onComplete) {
      setCompleted(true);
      onComplete();
    }
  };

  if (!isVisible) return null;

  return createPortal(
    <>
      <style>{`
        @keyframes loadingDots {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
        .loading-dot {
          width: 12px;
          height: 12px;
          background-color: #3b82f6;
          border-radius: 50%;
          animation: loadingDots 1.2s infinite ease-in-out;
          margin: 0 4px;
        }
        .loading-dot:nth-child(1) { animation-delay: -0.24s; }
        .loading-dot:nth-child(2) { animation-delay: -0.12s; }
        .loading-dot:nth-child(3) { animation-delay: 0s; }
        .loading-dot:nth-child(4) { animation-delay: 0.12s; }
      `}</style>
      <div 
        onClick={handleClick}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgb(255, 255, 255)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
        </div>
      </div>
    </>,
    document.body
  );
};

export const useLoadingDots = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return {
    isLoading,
    showLoading,
    hideLoading,
    LoadingComponent: () => <LoadingDots isVisible={isLoading} />
  };
};