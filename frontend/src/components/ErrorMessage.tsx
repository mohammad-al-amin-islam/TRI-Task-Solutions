import React from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  type?: 'error' | 'warning' | 'info';
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onRetry, 
  type = 'error' 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '❌';
    }
  };

  return (
    <div className={`error-container ${type}`}>
      <div className="error-content">
        <span className="error-icon">{getIcon()}</span>
        <div className="error-text">
          <h3 className="error-title">
            {type === 'error' ? 'Something went wrong' : 
             type === 'warning' ? 'Warning' : 'Information'}
          </h3>
          <p className="error-message">{message}</p>
        </div>
      </div>
      {onRetry && (
        <button className="btn btn-primary error-retry" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};