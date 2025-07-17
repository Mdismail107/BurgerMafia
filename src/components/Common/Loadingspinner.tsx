import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50" aria-live="polite">
      <div className="text-center">
        <div 
          className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500 mx-auto"
          aria-label="Loading"
        />
        <p className="mt-4 text-xl text-white">Loading delicious content...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;