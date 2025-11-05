import React from 'react';
import type { OnboardingAnalysisResponse } from '../../types';
import PremiumTeaser from '../dashboard/PremiumTeaser';

interface BasicRoutineProps {
  result: OnboardingAnalysisResponse;
  onContinueToDashboard: () => void;
}

const getRoutineSuggestions = (skinType: OnboardingAnalysisResponse['skinType']) => {
    switch (skinType) {
        case 'Oily':
            return {
                cleanse: 'Foaming or Gel Cleanser',
                moisturize: 'Oil-Free, Lightweight Moisturizer',
                protect: 'Gel or Fluid Sunscreen (SPF 30+)',
            };
        case 'Dry':
            return {
                cleanse: 'Hydrating Cream or Milk Cleanser',
                moisturize: 'Rich Cream with Ceramides',
                protect: 'Moisturizing Sunscreen (SPF 30+)',
            };
        case 'Combination':
            return {
                cleanse: 'Gentle Gel Cleanser',
                moisturize: 'Lightweight Lotion or Gel-Cream',
                protect: 'Non-Comedogenic Sunscreen (SPF 30+)',
            };
        case 'Normal':
        default:
            return {
                cleanse: 'Gentle, pH-balanced Cleanser',
                moisturize: 'Standard Hydrating Lotion',
                protect: 'Broad-Spectrum Sunscreen (SPF 30+)',
            };
    }
};

const RoutineStepCard: React.FC<{
    icon: React.ReactNode;
    step: string;
    title: string;
    description: string;
    suggestion: string;
}> = ({ icon, step, title, description, suggestion }) => (
    <div className="bg-white border border-slate-200 p-4 rounded-xl text-center flex flex-col items-center">
        <div className="text-accent mb-2">{icon}</div>
        <h3 className="font-bold font-display text-primary">{step}: {title}</h3>
        <p className="text-sm text-charcoal/70 flex-grow mt-1 mb-3">{description}</p>
        <div className="bg-secondary w-full p-2 rounded-lg">
            <p className="text-xs text-charcoal/60">Suggested Category</p>
            <p className="font-semibold text-primary text-sm">{suggestion}</p>
        </div>
    </div>
);


const BasicRoutine: React.FC<BasicRoutineProps> = ({ result, onContinueToDashboard }) => {
    const suggestions = getRoutineSuggestions(result.skinType);

    return (
        <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
            <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl w-full border border-slate-200 space-y-6">
                <div>
                    <h2 className="text-3xl font-display font-bold text-primary mb-2">Your Starter Skincare Routine</h2>
                    <p className="text-charcoal/70 max-w-2xl mx-auto">
                        Here is a simple but effective 3-step routine based on your <span className="font-bold text-accent">{result.skinType.toLowerCase()}</span> skin type. Consistency is key!
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    <RoutineStepCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
                        step="Step 1"
                        title="Cleanse"
                        description="Wash your face morning and night to remove dirt, oil, and impurities."
                        suggestion={suggestions.cleanse}
                    />
                    <RoutineStepCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2.25 2.25 0 003.182-3.182l-1.04-1.04a2.25 2.25 0 10-3.182 3.182l1.04 1.04zM3.429 5.429a2.25 2.25 0 103.182 3.182l1.04-1.04a2.25 2.25 0 00-3.182-3.182L3.43 5.43z" /></svg>}
                        step="Step 2"
                        title="Moisturize"
                        description="Hydrate your skin to maintain its barrier, preventing dryness and irritation."
                        suggestion={suggestions.moisturize}
                    />
                    <RoutineStepCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                        step="Step 3"
                        title="Protect"
                        description="Apply sunscreen every morning to protect against sun damage and premature aging."
                        suggestion={suggestions.protect}
                    />
                </div>
                
                <div className="pt-4 grid sm:grid-cols-2 gap-4 items-center">
                    <PremiumTeaser />
                    <button
                        onClick={onContinueToDashboard}
                        className="w-full bg-primary hover:opacity-90 text-white font-bold font-display py-3 px-4 rounded-xl transition-opacity duration-200"
                        >
                        Track My Progress
                    </button>
                </div>

            </div>
        </div>
    );
};

export default BasicRoutine;
