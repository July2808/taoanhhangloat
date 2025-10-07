
import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center my-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
  </div>
);

export default LoadingSpinner;
