import React from 'react';

const Loader = ({ message = "Processing...", progress = null }) => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <div style={{ color: 'var(--text-secondary)' }}>{message}</div>
      
      {progress !== null && (
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      
      {progress !== null && (
        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {progress}%
        </div>
      )}
    </div>
  );
};

export default Loader;
