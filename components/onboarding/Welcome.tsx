import React from 'react';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-lg border border-slate-200">
        <div className="h-16 w-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
        <h1 className="text-3xl font-display font-bold text-primary mb-2">Discover your skin type in 30 seconds.</h1>
        <p className="text-charcoal/70 mb-6">
          Ready to transform your skincare routine from guesswork to science? Let's start with a few quick questions and a selfie scan to personalize your journey.
        </p>
        <button
          onClick={onStart}
          className="w-full bg-primary hover:opacity-90 text-white font-bold font-display py-3 px-4 rounded-xl transition-opacity duration-200"
        >
          Start Now
        </button>
      </div>
    </div>
  );
};

export default Welcome;