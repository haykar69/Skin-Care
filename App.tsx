import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Loader from './components/Loader';
import AnalysisResult from './components/AnalysisResult';
import Welcome from './components/onboarding/Welcome';
import UserInfoForm from './components/onboarding/UserInfoForm';
import SelfieCapture from './components/onboarding/SelfieCapture';
import OnboardingResult from './components/onboarding/OnboardingResult';
import BasicRoutine from './components/onboarding/BasicRoutine';
import ProgressTracker from './components/dashboard/ProgressTracker';
import DailyTips from './components/dashboard/DailyTips';
import { analyzeSkinImage, fileToBase64, analyzeOnboardingSelfie } from './services/geminiService';
import type { SkinAnalysisResponse, OnboardingAnalysisResponse, UserProfile } from './types';

type AppStep = 'welcome' | 'userInfo' | 'selfie' | 'analyzing_onboarding' | 'onboarding_result' | 'basic_routine' | 'dashboard';
type DashboardTab = 'analysis' | 'progress' | 'tips';

// The original App component is now the dashboard view
const MainDashboard: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<SkinAnalysisResponse | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<DashboardTab>('analysis');
  
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        if (analysisResult) handleReset(); // Reset if new image is selected
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    };
  
    const handleAnalyzeClick = async () => {
      if (!imageFile) return;
  
      setIsAnalyzing(true);
      setError(null);
      setAnalysisResult(null);
  
      try {
        const base64Image = await fileToBase64(imageFile);
        const result = await analyzeSkinImage(base64Image, imageFile.type);
        setAnalysisResult(result);
        setActiveTab('analysis');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setIsAnalyzing(false);
      }
    };
  
    const handleReset = () => {
      setImageFile(null);
      setPreviewUrl(null);
      setAnalysisResult(null);
      setError(null);
      if (fileInputRef.current) {
          fileInputRef.current.value = "";
      }
    };

    const handleSaveAnalysis = () => {
        if (!analysisResult) {
            alert("No analysis result to save.");
            return;
        }

        try {
            const savedAnalysesRaw = localStorage.getItem('skinScanAnalyses');
            const savedAnalyses: (SkinAnalysisResponse & { savedAt: string })[] = savedAnalysesRaw ? JSON.parse(savedAnalysesRaw) : [];
            
            const analysisToSave = {
                ...analysisResult,
                savedAt: new Date().toISOString(),
            };

            const updatedAnalyses = [...savedAnalyses, analysisToSave];
            
            localStorage.setItem('skinScanAnalyses', JSON.stringify(updatedAnalyses));
            
            alert('Analysis saved to your profile!');
        } catch (error) {
            console.error("Failed to save analysis to localStorage", error);
            alert("There was an error saving your analysis.");
        }
    };

    const TabButton: React.FC<{tab: DashboardTab, label: string}> = ({tab, label}) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === tab ? 'bg-primary text-white' : 'text-charcoal/70 hover:bg-black/5'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="grid md:grid-cols-2 gap-8 h-full animate-fade-in">
            {/* Left Panel: Image Upload & Preview */}
            <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center space-y-4 border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-display font-bold text-center text-primary">Get a Detailed Analysis</h2>
                <p className="text-center text-charcoal/70 max-w-sm">
                For the best results, use a clear, well-lit photo of the area you're concerned about.
                </p>
                
                <div className="w-full max-w-md h-64 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center relative bg-secondary overflow-hidden">
                    {previewUrl ? (
                        <img src={previewUrl} alt="Skin preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-center text-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p>Image preview will appear here</p>
                        </div>
                    )}
                </div>

                <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                />
                
                <div className="flex gap-4 w-full max-w-md">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isAnalyzing}
                        className="w-full text-center bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-primary font-bold py-3 px-4 rounded-xl transition-colors duration-200"
                    >
                        {imageFile ? 'Change Photo' : 'Select Photo'}
                    </button>
                    <button
                        onClick={handleAnalyzeClick}
                        disabled={!imageFile || isAnalyzing}
                        className="w-full bg-primary hover:opacity-90 disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200"
                    >
                        Analyze Skin
                    </button>
                </div>
                {analysisResult && (
                    <button
                        onClick={handleReset}
                        className="w-full max-w-md text-center bg-error/10 hover:bg-error/20 text-error font-bold py-3 px-4 rounded-xl transition-colors duration-200 mt-2"
                    >
                        Start New Analysis
                    </button>
                )}
            </div>

            {/* Right Panel: Results */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 overflow-y-auto max-h-[80vh] shadow-sm">
                <div className="flex items-center justify-center space-x-2 bg-secondary p-1 rounded-lg mb-4">
                    <TabButton tab="analysis" label="AI Analysis" />
                    <TabButton tab="progress" label="Progress Tracker" />
                    <TabButton tab="tips" label="Daily Tips" />
                </div>
                <div className="mt-4">
                    {activeTab === 'analysis' && (
                        <>
                            {isAnalyzing && <Loader message="Analyzing Image..." />}
                            {error && <div className="text-error bg-error/10 p-4 rounded-lg text-center">{error}</div>}
                            {analysisResult && <AnalysisResult data={analysisResult} onSave={handleSaveAnalysis} />}
                            {!isAnalyzing && !error && !analysisResult && (
                                <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 pt-16">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    <h2 className="text-xl font-semibold text-charcoal">Your analysis will appear here</h2>
                                    <p className="max-w-sm mt-2">Upload a photo and click "Analyze Skin" to get your personalized AI-powered report.</p>
                                </div>
                            )}
                        </>
                    )}
                    {activeTab === 'progress' && <ProgressTracker />}
                    {activeTab === 'tips' && <DailyTips />}
                </div>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    const [step, setStep] = useState<AppStep>('welcome');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [onboardingResult, setOnboardingResult] = useState<OnboardingAnalysisResponse | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleUserInfoSubmit = (data: UserProfile) => {
        setUserProfile(data);
        setStep('selfie');
    };

    const handleSelfieAnalyze = async (file: File) => {
        setIsAnalyzing(true);
        setError(null);
        setStep('analyzing_onboarding');

        try {
            const base64Image = await fileToBase64(file);
            const result = await analyzeOnboardingSelfie(base64Image, file.type);
            setOnboardingResult(result);
            setStep('onboarding_result');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            setStep('selfie'); // Go back to selfie step on error
        } finally {
            setIsAnalyzing(false);
        }
    };
    
    const renderContent = () => {
        switch (step) {
            case 'welcome':
                return <Welcome onStart={() => setStep('userInfo')} />;
            case 'userInfo':
                return <UserInfoForm onSubmit={handleUserInfoSubmit} />;
            case 'selfie':
                return <SelfieCapture onAnalyze={handleSelfieAnalyze} isAnalyzing={isAnalyzing} />;
            case 'analyzing_onboarding':
                return <div className="flex justify-center items-center h-full"><Loader message="Performing initial scan..." /></div>;
            case 'onboarding_result':
                return onboardingResult && <OnboardingResult result={onboardingResult} onContinue={() => setStep('basic_routine')} />;
            case 'basic_routine':
                return onboardingResult && <BasicRoutine result={onboardingResult} onContinueToDashboard={() => setStep('dashboard')} />;
            case 'dashboard':
                return <MainDashboard />;
            default:
                return <Welcome onStart={() => setStep('userInfo')} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col justify-center">
               {error && step === 'selfie' && (
                 <div className="text-error bg-error/10 p-4 rounded-lg text-center mb-4 max-w-lg mx-auto">{error}</div>
               )}
               {renderContent()}
            </main>
        </div>
    );
};

export default App;