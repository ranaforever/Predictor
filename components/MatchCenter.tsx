
import React, { useState, useEffect, useMemo } from 'react';
import { Match, MatchStatus, SportType, CompetitionType } from '../types';
import { MOCK_MATCHES } from '../constants';

interface MatchCenterProps {
  onPredictMatch: (match: Match) => void;
}

type CategoryType = 'ALL' | 'INTERNATIONAL' | 'CLUB' | 'LEAGUE' | 'DOMESTIC';

const MatchCenter: React.FC<MatchCenterProps> = ({ onPredictMatch }) => {
  const [activeStatus, setActiveStatus] = useState<MatchStatus>(MatchStatus.LIVE);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('ALL');
  const [matches, setMatches] = useState<Match[]>(MOCK_MATCHES);

  // Simulation for live scores
  useEffect(() => {
    const interval = setInterval(() => {
      setMatches(prev => prev.map(m => {
        if (m.status === MatchStatus.LIVE && Math.random() > 0.85) {
          const isCricket = m.sport === SportType.CRICKET;
          const inc = isCricket ? Math.floor(Math.random() * 6) + 1 : 1;
          return { ...m, scoreA: m.scoreA + (Math.random() > 0.5 ? inc : 0) };
        }
        return m;
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredMatches = useMemo(() => {
    return matches.filter(m => {
      const statusMatch = m.status === activeStatus;
      const categoryMatch = 
        activeCategory === 'ALL' || 
        (activeCategory === 'INTERNATIONAL' && m.competitionType === CompetitionType.INTERNATIONAL) ||
        (activeCategory === 'CLUB' && m.competitionType === CompetitionType.CLUB) ||
        (activeCategory === 'LEAGUE' && m.competitionType === CompetitionType.LEAGUE) ||
        (activeCategory === 'DOMESTIC' && m.competitionType === CompetitionType.DOMESTIC);
      return statusMatch && categoryMatch;
    });
  }, [matches, activeStatus, activeCategory]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col flex-grow">
      {/* Category Tabs */}
      <div className="p-3 bg-slate-900/95 sticky top-0 z-20 backdrop-blur-xl border-b border-slate-800">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 bg-indigo-500 rounded flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-[10px] font-black text-white uppercase tracking-tighter">Pro Match Center</span>
        </div>

        {/* Competition Filters */}
        <div className="flex flex-wrap gap-1 p-1 bg-slate-950 rounded-xl mb-3 shadow-inner">
          {(['ALL', 'INTERNATIONAL', 'CLUB', 'LEAGUE', 'DOMESTIC'] as CategoryType[]).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-grow py-1.5 px-2 text-[9px] font-black rounded-lg transition-all uppercase tracking-tighter border ${
                activeCategory === cat 
                  ? 'bg-slate-800 text-indigo-400 border-slate-700 shadow-xl' 
                  : 'text-slate-600 border-transparent hover:text-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="grid grid-cols-3 gap-1 bg-slate-950/50 p-1 rounded-lg">
          {(Object.values(MatchStatus) as MatchStatus[]).map(status => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`py-1 text-[10px] font-black rounded-md transition-all uppercase ${
                activeStatus === status 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-slate-500 hover:text-slate-400'
              }`}
            >
              {status === MatchStatus.UPCOMING ? 'Fixtures' : status === MatchStatus.FINISHED ? 'Results' : 'Live'}
            </button>
          ))}
        </div>
      </div>

      {/* Match Results/Fixtures Feed */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar bg-slate-950/20">
        {filteredMatches.length > 0 ? (
          filteredMatches.map(match => (
            <div key={match.id} className="relative bg-slate-800/20 border border-slate-700/30 rounded-2xl p-3 hover:bg-slate-800/40 transition-all group overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${
                    match.competitionType === CompetitionType.INTERNATIONAL ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20'
                  }`}>
                    {match.competitionType}
                  </div>
                  <span className="text-[9px] font-bold text-slate-500 truncate max-w-[100px]">{match.leagueName}</span>
                </div>
                {match.status === MatchStatus.LIVE && (
                  <span className="flex items-center gap-1 text-[9px] font-black text-rose-500 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    {match.time}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col items-center flex-1 text-center">
                  <img src={match.teamA.logo} alt="" className="w-10 h-10 rounded-full mb-1.5 bg-slate-900 border border-slate-700 p-1 group-hover:scale-105 transition-transform" />
                  <span className="text-[10px] font-black text-white leading-none h-6 flex items-center justify-center">{match.teamA.name}</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-sm font-black text-white tabular-nums bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-700/50 shadow-inner">
                    {match.status === MatchStatus.UPCOMING ? (
                      <span className="text-[10px] text-slate-500 tracking-widest uppercase">vs</span>
                    ) : (
                      <div className="flex items-center gap-2">
                         <span className={match.scoreA > match.scoreB ? 'text-indigo-400' : ''}>{match.scoreA}</span>
                         <span className="text-slate-700">-</span>
                         <span className={match.scoreB > match.scoreA ? 'text-indigo-400' : ''}>{match.scoreB}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-[8px] font-bold text-slate-600 mt-1 uppercase">
                    {match.status === MatchStatus.UPCOMING ? `${match.date} @ ${match.time}` : match.date}
                  </div>
                </div>

                <div className="flex flex-col items-center flex-1 text-center">
                  <img src={match.teamB.logo} alt="" className="w-10 h-10 rounded-full mb-1.5 bg-slate-900 border border-slate-700 p-1 group-hover:scale-105 transition-transform" />
                  <span className="text-[10px] font-black text-white leading-none h-6 flex items-center justify-center">{match.teamB.name}</span>
                </div>
              </div>

              {match.status === MatchStatus.UPCOMING && (
                <button 
                  onClick={() => onPredictMatch(match)}
                  className="w-full mt-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[9px] font-black rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-all uppercase flex items-center justify-center gap-1.5"
                >
                  Analyze & Predict
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 opacity-50">
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">No Matches Scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCenter;
