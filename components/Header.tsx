
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          ProSport AI
        </h1>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Predictions</a>
        <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Live Stats</a>
        <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Historical Data</a>
      </nav>
      <div className="flex items-center gap-4">
        <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20">PREMIUM AI</span>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-all">
          Connect Wallet
        </button>
      </div>
    </header>
  );
};

export default Header;
