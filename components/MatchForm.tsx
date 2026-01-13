
import React, { useState } from 'react';
import { SportType, MatchType, TeamStats, MatchContext } from '../types';
import { TEAMS } from '../constants';

interface MatchFormProps {
  onPredict: (context: MatchContext) => void;
  isLoading: boolean;
}

const MatchForm: React.FC<MatchFormProps> = ({ onPredict, isLoading }) => {
  const [sport, setSport] = useState<SportType>(SportType.FOOTBALL);
  const [teamAId, setTeamAId] = useState<string>('');
  const [teamBId, setTeamBId] = useState<string>('');
  const [matchType, setMatchType] = useState<MatchType>(MatchType.LEAGUE);
  const [location, setLocation] = useState<'Home' | 'Away'>('Home');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const filteredTeams = TEAMS.filter(t => t.sport === sport);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const teamA = filteredTeams.find(t => t.id === teamAId);
    const teamB = filteredTeams.find(t => t.id === teamBId);

    if (teamA && teamB) {
      onPredict({ sport, teamA, teamB, location, matchType, date });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        Configure Match
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Select Sport</label>
          <div className="grid grid-cols-3 gap-2">
            {Object.values(SportType).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => { setSport(s); setTeamAId(''); setTeamBId(''); }}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all border ${
                  sport === s 
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Team A (Perspective)</label>
            <select
              value={teamAId}
              onChange={(e) => setTeamAId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
              required
            >
              <option value="">Choose Team A</option>
              {filteredTeams.map(t => (
                <option key={t.id} value={t.id} disabled={t.id === teamBId}>{t.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Team B</label>
            <select
              value={teamBId}
              onChange={(e) => setTeamBId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
              required
            >
              <option value="">Choose Team B</option>
              {filteredTeams.map(t => (
                <option key={t.id} value={t.id} disabled={t.id === teamAId}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Venue (Team A)</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
            >
              <option value="Home">Home</option>
              <option value="Away">Away</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Match Type</label>
            <select
              value={matchType}
              onChange={(e) => setMatchType(e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
            >
              {Object.values(MatchType).map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !teamAId || !teamBId}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-bold py-3 rounded-lg mt-4 flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.01]"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Predict Results
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default MatchForm;
