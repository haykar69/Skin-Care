import React from 'react';
import type { DailyTip } from '../../types';

const tipsData: DailyTip[] = [
    { id: 1, title: "Drink 2L water daily 💧", description: "Hydration starts from within. Proper water intake helps maintain your skin's elasticity and combat dryness.", category: "Lifestyle" },
    { id: 2, title: "Change Your Pillowcase Weekly", description: "Pillowcases can accumulate oils, dirt, and bacteria, which can contribute to breakouts. Keep it clean!", category: "Habits" },
    { id: 3, title: "Don't Skip Sunscreen", description: "Even on cloudy days, UV rays can damage your skin. Make applying SPF 30+ a non-negotiable part of your morning routine.", category: "Routine" },
    { id: 4, title: "Avoid Hot Showers", description: "Super hot water can strip your skin of its natural oils, leading to dryness and irritation. Opt for lukewarm water instead.", category: "Habits" },
    { id: 5, title: "Get 7-8 Hours of Sleep", description: "Your skin repairs itself while you sleep. Prioritizing rest can lead to a healthier complexion.", category: "Lifestyle" }
];

const TipCard: React.FC<{tip: DailyTip}> = ({ tip }) => {
    return (
        <div className="bg-secondary border border-slate-200 p-4 rounded-lg">
            <span className="text-xs bg-accent/20 text-accent font-semibold px-2 py-1 rounded-full">{tip.category}</span>
            <h4 className="font-bold text-primary mt-2">{tip.title}</h4>
            <p className="text-sm text-charcoal/70 mt-1">{tip.description}</p>
        </div>
    )
}

const DailyTips: React.FC = () => {
    return (
        <div className="animate-fade-in">
            <h3 className="text-xl font-display font-bold text-primary mb-4">Daily Tips & Education</h3>
            <div className="space-y-3">
                {tipsData.map(tip => <TipCard key={tip.id} tip={tip} />)}
            </div>
        </div>
    );
};

export default DailyTips;
