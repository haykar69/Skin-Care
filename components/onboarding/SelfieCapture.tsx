import React, { useState, useRef } from 'react';

interface SelfieCaptureProps {
  onAnalyze: (file: File) => void;
  isAnalyzing: boolean;
}

const SelfieCapture: React.FC<SelfieCaptureProps> = ({ onAnalyze, isAnalyzing }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAnalyzeClick = () => {
    if (imageFile) {
      onAnalyze(imageFile);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-lg w-full border border-slate-200 space-y-4">
        <h2 className="text-2xl font-display font-bold text-primary">AI-Powered Selfie Scan</h2>
        <p className="text-charcoal/70">
          For the best results, use natural light and keep your face centered. This helps our AI get a clear look.
        </p>

        <div className="w-full h-64 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center relative bg-secondary overflow-hidden">
          {previewUrl ? (
            <img src={previewUrl} alt="Skin preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p>Upload your selfie here</p>
            </div>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          capture="user"
          className="hidden"
        />
        
        <div className="flex gap-4 w-full">
            <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isAnalyzing}
                className="w-full text-center bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-primary font-bold py-3 px-4 rounded-xl transition-colors duration-200"
            >
                {imageFile ? 'Change Selfie' : 'Upload Selfie'}
            </button>
            <button
                onClick={handleAnalyzeClick}
                disabled={!imageFile || isAnalyzing}
                className="w-full bg-primary hover:opacity-90 disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200"
            >
                Analyze
            </button>
        </div>
      </div>
    </div>
  );
};

export default SelfieCapture;