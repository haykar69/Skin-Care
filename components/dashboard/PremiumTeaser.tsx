import React from 'react';

const PremiumTeaser: React.FC = () => {
    const handleWaitlistClick = () => {
        alert("Thanks for your interest! Personalized plans are coming soon.");
    }

    return (
        <div 
            className="bg-secondary p-4 rounded-xl text-left border border-slate-200 relative overflow-hidden cursor-pointer"
            onClick={handleWaitlistClick}
        >
            <div className="flex gap-4 items-center">
                <div className="bg-primary/10 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <div>
                    <h4 className="font-bold text-primary">Unlock your AI-Personalized Plan</h4>
                    <p className="text-sm text-charcoal/70">Get specific product recommendations.</p>
                </div>
            </div>
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                <span className="bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">JOIN WAITLIST</span>
            </div>
        </div>
    );
};

export default PremiumTeaser;
