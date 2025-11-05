import React from 'react';
import type { SkinAnalysisResponse } from '../types';

const SeverityBadge: React.FC<{ severity: 'Low' | 'Medium' | 'High' }> = ({ severity }) => {
  const severityClasses = {
    Low: 'bg-green-500/10 text-green-700',
    Medium: 'bg-yellow-500/10 text-yellow-700',
    High: 'bg-red-500/10 text-red-700',
  };
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${severityClasses[severity]}`}>
      {severity} Severity
    </span>
  );
};

const CategoryIcon: React.FC<{ category: 'Product' | 'Lifestyle' | 'Routine' }> = ({ category }) => {
    const icons = {
        Product: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        ),
        Lifestyle: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        Routine: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    };

    return <div className="text-accent">{icons[category]}</div>;
}

const RecommendationCard: React.FC<{ recommendation: SkinAnalysisResponse['recommendations'][0] }> = ({ recommendation }) => {
    return (
        <div className="bg-secondary p-4 rounded-lg flex gap-4 items-start border border-slate-200">
            <div className="flex-shrink-0 mt-1">
                <CategoryIcon category={recommendation.category} />
            </div>
            <div>
                <h4 className="font-semibold text-charcoal">{recommendation.title}</h4>
                <p className="text-charcoal/70 text-sm">{recommendation.details}</p>
            </div>
        </div>
    );
};

interface AnalysisResultProps {
  data: SkinAnalysisResponse;
  onSave: () => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data, onSave }) => {
  return (
    <div className="space-y-6 animate-fade-in p-1">
      <div>
        <h2 className="text-xl font-display font-bold text-accent mb-2">Overall Analysis</h2>
        <p className="text-charcoal/80">{data.analysis}</p>
      </div>

      <div>
        <h2 className="text-xl font-display font-bold text-accent mb-3">Potential Issues Identified</h2>
        <div className="space-y-4">
          {data.potentialIssues.map((issue, index) => (
            <div key={index} className="bg-white border border-slate-200 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-lg text-primary">{issue.name}</h3>
                <SeverityBadge severity={issue.severity} />
              </div>
              <p className="text-charcoal/70">{issue.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-display font-bold text-accent mb-3">Personalized Recommendations</h2>
        <div className="space-y-3">
            {data.recommendations.map((rec, index) => (
                <RecommendationCard key={index} recommendation={rec} />
            ))}
        </div>
      </div>

      <div className="bg-yellow-400/10 border-l-4 border-yellow-500 p-4 rounded-r-lg">
        <h3 className="font-bold text-yellow-800">Important Disclaimer</h3>
        <p className="text-yellow-700/80 text-sm">{data.disclaimer}</p>
      </div>
      
      <button
        onClick={onSave}
        className="w-full mt-4 bg-accent hover:opacity-90 text-primary font-bold font-display py-3 px-4 rounded-xl transition-opacity duration-200 flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        Save This Analysis
      </button>
    </div>
  );
};

export default AnalysisResult;