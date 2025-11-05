import React from 'react';
import type { OnboardingAnalysisResponse } from '../../types';

interface OnboardingResultProps {
  result: OnboardingAnalysisResponse;
  onContinue: () => void;
}

const OnboardingResult: React.FC<OnboardingResultProps> = ({ result, onContinue }) => {
  const confidence = 83; // Mock confidence score as per PRD

  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-lg w-full border border-slate-200 space-y-6">
        <div>
            <h2 className="text-2xl font-display font-bold text-primary mb-2">Your Initial Analysis</h2>
            <p className="text-accent font-semibold">{result.summary}</p>
        </div>

        <div className="text-left bg-secondary p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-charcoal/80">AI Confidence</h3>
            <span className="font-bold text-primary">{confidence}%</span>
          </div>
          <div className="w-full bg-slate-300 rounded-full h-2.5">
            <div className="bg-accent h-2.5 rounded-full" style={{width: `${confidence}%`}}></div>
          </div>
        </div>

        <div className="bg-secondary p-4 rounded-lg">
            <h3 className="font-semibold text-charcoal/80 mb-1">Detected Skin Type</h3>
            <p className="text-2xl font-bold text-primary">{result.skinType}</p>
        </div>

        <div className="space-y-3">
            <h3 className="font-semibold text-charcoal/80 mb-2">Top Visible Concerns</h3>
            {result.topConcerns.map((concern, index) => (
                <div key={index} className="bg-secondary p-4 rounded-lg text-left">
                    <h4 className="font-semibold text-primary">{concern.name}</h4>
                    <p className="text-sm text-charcoal/70">{concern.description}</p>
                </div>
            ))}
        </div>

        <button
          onClick={onContinue}
          className="w-full bg-primary hover:opacity-90 text-white font-bold font-display py-3 px-4 rounded-xl transition-opacity duration-200"
        >
          View My Routine
        </button>
      </div>
    </div>
  );
};

export default OnboardingResult;