import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-4 border-b border-slate-200 bg-secondary">
      <div className="container mx-auto flex items-center gap-3">
        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
        <h1 className="text-2xl font-display font-bold text-primary">
          SkinScan
        </h1>
      </div>
    </header>
  );
};

export default Header;