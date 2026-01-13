
import React from 'react';
import { MatchContext, PredictionResult, ConfidenceLevel } from '../types';
import StatCard from './StatCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';

interface AnalysisViewProps {
  context: MatchContext;
  prediction: PredictionResult;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ context, prediction }) => {
  const { teamA, teamB, location } = context;

  const probabilityData = [
    { name: teamA.name, value: prediction.probA, color: '#4f46e5' },
    { name: 'Draw', value: prediction.probDraw, color: '#475569' },
    { name: teamB.name, value: prediction.probB, color: '#e11d48' },
  ];

  const compareData = [
    { name: 'Win %', a: teamA.winRate, b: teamB.winRate },
    { name: 'Home/Away %', a: location === 'Home' ? teamA.homeWinRate : teamA.awayWinRate, b: location === 'Home' ? teamB.awayWinRate : teamB.homeWinRate },
    { name: 'Avg Score', a: teamA.avgScore * 10, b: teamB.avgScore * 10 }, 
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Prediction Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 right-0 p-4">
           <div className="bg-indigo-600/20 text-indigo-400 text-[10px] font-black px-2 py-0.5 rounded border border-indigo-500/20 uppercase tracking-tighter">AI Certified</div>
        </div>

        <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-rose-950/20 border-b border-slate-800 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="relative">
              <img src={teamA.logo} alt={teamA.name} className="w-24 h-24 rounded-full border-4 border-slate-800 shadow-2xl bg-slate-900 p-2" />
              <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full text-white ring-4 ring-slate-900">Rank #{teamA.ranking}</div>
            </div>
            <div>
              <h3 className="text-xl font-black text-white">{teamA.name}</h3>
              <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest">{prediction.probA}% Probability</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Outcome Confidence</div>
            <div className={`text-2xl font-black px-6 py-2 rounded-2xl border-2 ${
              prediction.confidence === ConfidenceLevel.HIGH ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
              prediction.confidence === ConfidenceLevel.MEDIUM ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
              'bg-rose-500/10 text-rose-400 border-rose-500/30'
            } shadow-[0_0_40px_rgba(0,0,0,0.3)]`}>
              {prediction.confidence}
            </div>
            <div className="mt-4 text-center">
               <div className="text-[10px] text-slate-600 font-bold uppercase">Predicted Winner</div>
               <div className="text-sm text-white font-black truncate max-w-[150px]">{prediction.predictedWinner}</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <div className="relative">
              <img src={teamB.logo} alt={teamB.name} className="w-24 h-24 rounded-full border-4 border-slate-800 shadow-2xl bg-slate-900 p-2" />
              <div className="absolute -bottom-1 -right-1 bg-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full text-white ring-4 ring-slate-900">Rank #{teamB.ranking}</div>
            </div>
            <div>
              <h3 className="text-xl font-black text-white">{teamB.name}</h3>
              <p className="text-xs text-rose-400 font-bold uppercase tracking-widest">{prediction.probB}% Probability</p>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-black text-white uppercase tracking-widest">Statistical Distribution</h4>
              <span className="text-[10px] text-slate-500 font-bold">DRAW: {prediction.probDraw}%</span>
            </div>
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={probabilityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {probabilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <div className="text-3xl font-black text-white">{Math.max(prediction.probA, prediction.probB)}%</div>
                 <div className="text-[10px] text-slate-500 font-bold uppercase">Favored</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="bg-slate-950/50 p-6 rounded-3xl border border-slate-800 shadow-inner relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg className="w-16 h-16 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z"/>
                </svg>
              </div>
              <h4 className="text-indigo-400 text-xs font-black mb-4 flex items-center gap-2 uppercase tracking-[0.2em]">
                <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                AI Reasoning Engine
              </h4>
              <p className="text-slate-200 text-sm leading-relaxed font-medium italic relative z-10">
                "{prediction.explanation}"
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-sm font-black text-white uppercase tracking-widest">Head-to-Head Delta</h4>
            </div>
            <div className="text-[10px] font-bold text-slate-500">Metric Breakdown</div>
          </div>
          
          <div className="h-48 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compareData}>
                <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#1e293b'}} 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }}
                />
                <Bar dataKey="a" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={24} />
                <Bar dataKey="b" fill="#e11d48" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Recent Form A</div>
                <div className="flex gap-1">
                  {teamA.recentForm.map((res, i) => (
                    <span key={i} className={`w-4 h-4 rounded text-[8px] flex items-center justify-center font-black ${res === 'W' ? 'bg-emerald-500 text-white' : res === 'D' ? 'bg-slate-700 text-slate-300' : 'bg-rose-500 text-white'}`}>{res}</span>
                  ))}
                </div>
             </div>
             <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Recent Form B</div>
                <div className="flex gap-1">
                  {teamB.recentForm.map((res, i) => (
                    <span key={i} className={`w-4 h-4 rounded text-[8px] flex items-center justify-center font-black ${res === 'W' ? 'bg-emerald-500 text-white' : res === 'D' ? 'bg-slate-700 text-slate-300' : 'bg-rose-500 text-white'}`}>{res}</span>
                  ))}
                </div>
             </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
           <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-rose-600/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-sm font-black text-white uppercase tracking-widest">Performance Insights</h4>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Attack Power</div>
                  <div className="text-white font-black">{teamA.avgScore} Goals/G</div>
                </div>
                <div className="h-1 flex-1 mx-8 bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-indigo-500" style={{ width: `${(teamA.avgScore / 4) * 100}%` }}></div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Attack Power</div>
                  <div className="text-white font-black">{teamB.avgScore} Goals/G</div>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Defensive Solidity</div>
                  <div className="text-white font-black">{teamA.concededScore} Conceded</div>
                </div>
                <div className="h-1 flex-1 mx-8 bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-rose-500" style={{ width: `${(teamA.concededScore / 4) * 100}%` }}></div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Defensive Solidity</div>
                  <div className="text-white font-black">{teamB.concededScore} Conceded</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center bg-indigo-500/5 p-4 rounded-2xl border border-indigo-500/10">
             <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest mb-1">Contextual Modifier</p>
             <p className="text-xs text-indigo-400 font-bold">Venue Advantage: {location} Factor (+{location === 'Home' ? '12.4' : '4.2'}%)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;
