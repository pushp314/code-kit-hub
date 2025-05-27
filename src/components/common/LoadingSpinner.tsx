import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md',
  fullScreen = false 
}) => {
  const sizeMap = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  const spinnerClass = `inline-block rounded-full border-t-primary-500 border-r-primary-500 border-b-primary-200 border-l-primary-200 animate-spin ${sizeMap[size]}`;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <div className={spinnerClass}></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-4">
      <div className={spinnerClass}></div>
    </div>
  );
};

export default LoadingSpinner;