import React, { useState } from 'react';
import type { UserProfile } from '../../types';

interface UserInfoFormProps {
  onSubmit: (data: UserProfile) => void;
}

const goalsOptions = ["Reduce Acne", "Minimize Pores", "Even Skin Tone", "Reduce Fine Lines", "Improve Hydration", "Control Oiliness"];
const sunExposureOptions = ["Low (Mostly Indoors)", "Medium (Occasional Sun)", "High (Often Outdoors)"];
const stressLevelOptions = ["Low", "Medium", "High"];

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit }) => {
  const [age, setAge] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [sunExposure, setSunExposure] = useState(sunExposureOptions[1]);
  const [stressLevel, setStressLevel] = useState(stressLevelOptions[1]);

  const handleGoalToggle = (goal: string) => {
    setGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (age && goals.length > 0) {
      onSubmit({ age, goals, sunExposure, stressLevel });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl w-full border border-slate-200">
            <h2 className="text-2xl font-display font-bold text-primary mb-2">Tell Us About Yourself</h2>
            <p className="text-charcoal/70 mb-6">This helps us tailor your recommendations.</p>
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div>
                    <label htmlFor="age" className="block text-sm font-medium text-charcoal/80 mb-2">What is your age?</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full bg-secondary border border-slate-300 rounded-lg p-3 text-charcoal focus:ring-accent focus:border-accent"
                        placeholder="e.g., 28"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-charcoal/80 mb-2">What are your main skin goals? (Select up to 3)</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {goalsOptions.map(goal => (
                            <button
                                type="button"
                                key={goal}
                                onClick={() => handleGoalToggle(goal)}
                                className={`p-3 rounded-lg text-sm text-center transition-colors duration-200 border ${
                                    goals.includes(goal)
                                        ? 'bg-primary text-white font-semibold border-primary'
                                        : 'bg-white hover:bg-secondary text-charcoal border-slate-300'
                                }`}
                                disabled={!goals.includes(goal) && goals.length >= 3}
                            >
                                {goal}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-charcoal/80 mb-2">Typical Sun Exposure</label>
                    <div className="flex bg-secondary rounded-lg p-1">
                        {sunExposureOptions.map(option => (
                            <button type="button" key={option} onClick={() => setSunExposure(option)} className={`w-full text-sm py-2 rounded-md transition-colors ${sunExposure === option ? 'bg-primary text-white font-semibold' : 'hover:bg-black/5 text-charcoal/80'}`}>{option}</button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-charcoal/80 mb-2">Average Stress Level</label>
                    <div className="flex bg-secondary rounded-lg p-1">
                        {stressLevelOptions.map(option => (
                            <button type="button" key={option} onClick={() => setStressLevel(option)} className={`w-full text-sm py-2 rounded-md transition-colors ${stressLevel === option ? 'bg-primary text-white font-semibold' : 'hover:bg-black/5 text-charcoal/80'}`}>{option}</button>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!age || goals.length === 0}
                    className="w-full bg-primary hover:opacity-90 disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-bold font-display py-3 px-4 rounded-xl transition-opacity duration-200"
                >
                    Next: Selfie Scan
                </button>
            </form>
        </div>
    </div>
  );
};

export default UserInfoForm;