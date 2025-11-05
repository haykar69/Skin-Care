import React, { useState, useRef, useCallback, useEffect } from 'react';

const PhotoUploader: React.FC<{
    title: string;
    previewUrl: string | null;
    date: string;
    onFileSelect: (url: string) => void;
    onDateChange: (date: string) => void;
}> = ({ title, previewUrl, date, onFileSelect, onDateChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(URL.createObjectURL(file));
        }
    };
    
    return (
        <div className="bg-secondary border border-slate-200 p-4 rounded-lg text-center flex-grow flex flex-col">
            <h4 className="font-bold text-primary mb-2">{title}</h4>
            <div 
                className="w-full h-48 bg-white border-2 border-dashed border-slate-300 rounded-md flex items-center justify-center relative overflow-hidden cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
            >
                {previewUrl ? (
                    <img src={previewUrl} alt={`${title} preview`} className="w-full h-full object-cover" />
                ) : (
                    <div className="text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-sm">Add Photo</span>
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
            <input 
                type="date"
                value={date}
                onChange={(e) => onDateChange(e.target.value)}
                className="mt-2 w-full bg-white border border-slate-300 rounded-md p-2 text-sm text-charcoal focus:ring-accent focus:border-accent"
            />
        </div>
    );
};

const ImageComparator: React.FC<{ beforeImg: string, afterImg: string }> = ({ beforeImg, afterImg }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback((clientX: number) => {
        if (!isDragging || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = (x / rect.width) * 100;
        setSliderPosition(percent);
    }, [isDragging]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        handleMove(e.clientX);
    }, [handleMove]);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        handleMove(e.touches[0].clientX);
    }, [handleMove]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchend', handleTouchEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging, handleMouseMove, handleTouchMove, handleMouseUp, handleTouchEnd]);

    return (
        <div className="mt-6">
             <h4 className="text-lg font-display font-bold text-primary mb-2">Visual Comparison</h4>
             <div 
                ref={containerRef}
                className="relative w-full aspect-video select-none rounded-lg overflow-hidden border border-slate-200"
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
            >
                <img src={afterImg} alt="After" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                <img 
                    src={beforeImg} 
                    alt="Before" 
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                />
                <div 
                    className="absolute top-0 bottom-0 w-1 bg-white/80 cursor-ew-resize"
                    style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg border border-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                    </div>
                </div>
                <div className="absolute top-2 left-4 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-md">BEFORE</div>
                <div className="absolute top-2 right-4 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-md">AFTER</div>
            </div>
        </div>
    );
};


const ProgressTracker: React.FC = () => {
    const [beforeData, setBeforeData] = useState({
        url: null as string | null,
        date: new Date().toISOString().split('T')[0],
    });
    const [afterData, setAfterData] = useState({
        url: null as string | null,
        date: new Date().toISOString().split('T')[0],
    });


    const handleFileSelect = (setter: React.Dispatch<React.SetStateAction<{url: string | null, date: string}>>) => (url: string) => {
        setter(prev => ({...prev, url}));
    };

    const handleDateChange = (setter: React.Dispatch<React.SetStateAction<{url: string | null, date: string}>>) => (date: string) => {
        setter(prev => ({...prev, date}));
    };

    return (
        <div className="animate-fade-in">
            <h3 className="text-xl font-display font-bold text-primary mb-1">Track Your Progress</h3>
            <p className="text-sm text-charcoal/70 mb-4">
                Visually compare your skin over time. Take a photo in similar lighting conditions weekly to see the best results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <PhotoUploader 
                    title="Before" 
                    previewUrl={beforeData.url}
                    date={beforeData.date}
                    onFileSelect={handleFileSelect(setBeforeData)} 
                    onDateChange={handleDateChange(setBeforeData)}
                />
                <PhotoUploader 
                    title="After" 
                    previewUrl={afterData.url}
                    date={afterData.date}
                    onFileSelect={handleFileSelect(setAfterData)}
                    onDateChange={handleDateChange(setAfterData)}
                />
            </div>

            {beforeData.url && afterData.url && (
                <ImageComparator beforeImg={beforeData.url} afterImg={afterData.url} />
            )}
        </div>
    );
};

export default ProgressTracker;