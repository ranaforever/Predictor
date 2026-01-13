
import React, { useState, useEffect, useMemo } from 'react';
import { Match, MatchStatus, SportType } from '../types';
import { MOCK_MATCHES } from '../constants';

interface MatchCenterProps {
  onPredictMatch: (match: Match) => void;
}

type CategoryType = 'ALL' | 'INTERNATIONAL' | 'LEAGUE';

const MatchCenter: React.FC<MatchCenterProps> = ({ onPredictMatch }) => {
  const [activeStatus, setActiveStatus] = useState<MatchStatus>(MatchStatus.LIVE);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('ALL');
  const [matches, setMatches] = useState<Match[]>(MOCK_MATCHES);

  // Simulate live score updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMatches(prev => prev.map(m => {
        if (m.status === MatchStatus.LIVE && Math.random() > 0.9) {
          // Logic for different sports
          const increment = m.sport === SportType.CRICKET ? Math.floor(Math.random() * 4) : 1;
          return { ...m, scoreA: m.scoreA + (Math.random() > 0.6 ? increment : 0) };
        }
        return m;
      }));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const filteredMatches = useMemo(() => {
    return matches.filter(m => {
      const statusMatch = m.status === activeStatus;
      const categoryMatch = 
        activeCategory === 'ALL' || 
        (activeCategory === 'INTERNATIONAL' && m.isInternational) || 
        (activeCategory === 'LEAGUE' && !m.isInternational);
      return statusMatch && categoryMatch;
    });
  }, [matches, activeStatus, activeCategory]);

  const getStatusBadge = (status: MatchStatus) => {
    switch (status) {
      case MatchStatus.LIVE:
        return <span className="flex items-center gap-1.5 text-[10px] font-bold text-rose-500 animate-pulse bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>LIVE</span>;
      case MatchStatus.UPCOMING:
        return <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20 uppercase tracking-tighter">Fixture</span>;
      case MatchStatus.FINISHED:
        return <span className="text-[10px] font-bold text-slate-500 bg-slate-500/10 px-2 py-0.5 rounded-full border border-slate-500/20 uppercase tracking-tighter">Finished</span>;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col transition-all duration-300">
      {/* Header & Category Filters */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/95 sticky top-0 z-10 backdrop-blur-md">
        <h3 className="text-white font-black text-sm flex items-center gap-2 mb-4 uppercase tracking-tighter italic">
          <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.94 5.5c.603 0 1.09.487 1.09 1.09 0 .602-.487 1.09-1.09 1.09A1.091 1.091 0 014.85 6.59c0-.603.487-1.09 1.09-1.09zM15.01 13H4.99c-.58 0-1.054-.473-1.054-1.053 0-1.164.943-2.107 2.107-2.107h7.914c1.164 0 2.107.943 2.107 2.107 0 .58-.474 1.053-1.053 1.053zM14.06 5.5c.602 0 1.09.487 1.09 1.09 0 .602-.488 1.09-1.09 1.09-.603 0-1.09-.488-1.09-1.09 0-.603.487-1.09 1.09-1.09z" />
            </svg>
          </div>
          Live Scoreboard & Fixtures
        </h3>
        
        {/* Main Category Tabs */}
        <div className="flex gap-1 p-1 bg-slate-950 rounded-xl mb-4 shadow-inner">
          {(['ALL', 'INTERNATIONAL', 'LEAGUE'] as CategoryType[]).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all uppercase tracking-tight ${
                activeCategory === cat 
                  ? 'bg-slate-800 text-indigo-400 shadow-xl border border-slate-700' 
                  : 'text-slate-600 hover:text-slate-400'
              }`}
            >
              {cat === 'LEAGUE' ? 'Home League' : cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Status Sub-Tabs */}
        <div className="flex gap-2 justify-between border-t border-slate-800 pt-4">
          {(Object.values(MatchStatus) as MatchStatus[]).map(status => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`group flex flex-col items-center gap-1 transition-all ${
                activeStatus === status ? 'scale-105' : 'opacity-40 grayscale hover:opacity-100'
              }`}
            >
              <div className={`text-[10px] font-black uppercase tracking-widest ${
                activeStatus === status ? 'text-white' : 'text-slate-500'
              }`}>
                {status === MatchStatus.UPCOMING ? 'Fixtures' : status === MatchStatus.FINISHED ? 'Results' : 'Live'}
              </div>
              <div className={`h-1 rounded-full transition-all duration-300 ${
                activeStatus === status ? 'w-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'w-0'
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* Match List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-950/30">
        {filteredMatches.length > 0 ? (
          filteredMatches.map(match => (
            <div key={match.id} className="relative bg-slate-800/30 border border-slate-700/40 rounded-2xl p-4 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-300 group">
              {/* League Ribbon */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${match.isInternational ? 'bg-amber-400' : 'bg-indigo-400'}`} />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{match.leagueName}</span>
                </div>
                {getStatusBadge(match.status)}
              </div>

              {/* Scoreline */}
              <div className="flex items-center justify-between gap-6">
                <div className="flex flex-col items-center flex-1">
                  <div className="relative mb-2">
                    <img src={match.teamA.logo} alt="" className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-800 shadow-xl p-1 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[11px] font-black text-white text-center leading-tight h-8 flex items-center">{match.teamA.name}</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-xl font-black text-white flex items-center gap-3">
                    {match.status === MatchStatus.UPCOMING ? (
                      <span className="text-sm font-bold text-slate-600 uppercase">vs</span>
                    ) : (
                      <>
                        <span className={match.scoreA > match.scoreB ? 'text-indigo-400' : ''}>{match.scoreA}</span>
                        <span className="text-slate-700">-</span>
                        <span className={match.scoreB > match.scoreA ? 'text-indigo-400' : ''}>{match.scoreB}</span>
                      </>
                    )}
                  </div>
                  <div className="mt-1">
                    {match.status === MatchStatus.LIVE ? (
                      <span className="text-[9px] font-black text-rose-500 uppercase flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-rose-500 animate-ping"></span>
                        {match.time}
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                        {match.status === MatchStatus.UPCOMING ? `${match.date} • ${match.time}` : `${match.date}`}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center flex-1">
                  <div className="relative mb-2">
                    <img src={match.teamB.logo} alt="" className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-800 shadow-xl p-1 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[11px] font-black text-white text-center leading-tight h-8 flex items-center">{match.teamB.name}</span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-4 pt-3 border-t border-slate-700/30 flex items-center justify-between">
                <div className="text-[9px] font-bold text-slate-500 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {match.venue}
                </div>
                
                {match.status === MatchStatus.UPCOMING ? (
                  <button 
                    onClick={() => onPredictMatch(match)}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black rounded-lg shadow-lg hover:shadow-indigo-500/20 transition-all uppercase flex items-center gap-2"
                  >
                    Analyze
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{match.matchType}</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-12 animate-in fade-in duration-500">
            <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 shadow-2xl">
              <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h4 className="text-white font-bold mb-1">No matches currently in this category</h4>
            <p className="text-xs text-slate-500 max-w-[200px] leading-relaxed">Try switching to 'All' or checking another status tab for fixtures.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCenter;
