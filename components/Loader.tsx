import React from 'react';

const Loader: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-accent"></div>
      <p className="text-lg font-semibold text-charcoal">{message}</p>
      <p className="text-sm text-charcoal/60 max-w-sm">
        Our AI is analyzing your skin. This may take a moment. Please don't close this window.
      </p>
    </div>
  );
};

export default Loader;