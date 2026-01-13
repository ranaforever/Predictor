
import React, { useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import MatchForm from './components/MatchForm';
import AnalysisView from './components/AnalysisView';
import MatchCenter from './components/MatchCenter';
import { MatchContext, PredictionResult, ConfidenceLevel, Match } from './types';
import { calculateHeuristicProbabilities } from './utils';
import { getAIPredictionExplanation } from './geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currentContext, setCurrentContext] = useState<MatchContext | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  
  // Ref for the form to scroll into view when predicted from center
  const formRef = useRef<HTMLDivElement>(null);

  const handlePredict = useCallback(async (context: MatchContext) => {
    setLoading(true);
    setCurrentContext(context);
    
    // Level 1/2: Heuristic Calculation
    const { probA, probB, probDraw } = calculateHeuristicProbabilities(context);
    
    // Level 3: Advanced AI
    const aiInsight = await getAIPredictionExplanation(context, { probA, probB, probDraw });

    const predictedWinner = probA > probB ? context.teamA.name : probB > probA ? context.teamB.name : 'Draw';

    setPrediction({
      probA,
      probB,
      probDraw,
      predictedWinner,
      confidence: aiInsight.confidence,
      explanation: aiInsight.explanation
    });

    setLoading(false);
  }, []);

  const handlePredictMatch = (match: Match) => {
    const context: MatchContext = {
      sport: match.sport,
      teamA: match.teamA,
      teamB: match.teamB,
      location: 'Home', // Default
      matchType: match.matchType,
      date: match.date
    };
    
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
    handlePredict(context);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      <Header />
      
      <main className="max-w-[1600px] mx-auto px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Match Center Feed */}
          <div className="xl:col-span-3 h-[calc(100vh-140px)] xl:sticky xl:top-24 hidden xl:block">
            <MatchCenter onPredictMatch={handlePredictMatch} />
          </div>

          {/* Center Column: Prediction Engine */}
          <div className="xl:col-span-6 space-y-8">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
                Match <span className="text-indigo-500">Intelligence</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Analyze real-time data, historical performance, and AI projections for professional sport outcomes.
              </p>
            </div>

            <div ref={formRef}>
              <MatchForm onPredict={handlePredict} isLoading={loading} />
            </div>

            {prediction && currentContext ? (
              <AnalysisView context={currentContext} prediction={prediction} />
            ) : (
              <div className="bg-slate-900 border border-slate-800 border-dashed rounded-2xl h-[400px] flex flex-col items-center justify-center text-center p-8">
                <div className="bg-indigo-500/10 p-4 rounded-full mb-6">
                  <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Awaiting Data Input</h3>
                <p className="text-slate-500 text-sm max-w-xs">
                  Configure a custom matchup or pick a live fixture from the Match Center to begin deep-learning analysis.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Insights & Stats Panel */}
          <div className="xl:col-span-3 space-y-6 lg:sticky lg:top-24">
            <div className="bg-indigo-600 rounded-2xl p-6 text-white overflow-hidden relative shadow-2xl">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Live AI Advantage</h3>
                <p className="text-xs text-indigo-100 mb-4 leading-relaxed">
                  Our models are processing over 45,000 data points per minute for live global fixtures.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <img key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-indigo-600" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 40}`} alt="" />
                    ))}
                  </div>
                  <span className="text-[10px] font-medium">+1.2k scouts online</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-between">
                Market Trends
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-emerald-400 font-black">+4.2%</span>
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Football Volume', value: 'High', color: 'bg-indigo-500' },
                  { label: 'Prediction Accuracy', value: '92.4%', color: 'bg-emerald-500' },
                  { label: 'Live Server Latency', value: '14ms', color: 'bg-amber-500' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{item.label}</span>
                    <span className={`text-[11px] font-bold ${item.color.replace('bg-', 'text-')}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile/Tablet fallback for MatchCenter if on small screens */}
            <div className="xl:hidden">
              <MatchCenter onPredictMatch={handlePredictMatch} />
            </div>
          </div>
        </div>

        <footer className="mt-20 pt-8 border-t border-slate-800 text-center text-slate-600 text-xs">
          <p className="max-w-3xl mx-auto">
            Disclaimer: ProSport AI predictions are generated using proprietary heuristic algorithms and large language models. No guarantee of accuracy is implied. Please use this data for entertainment and educational purposes only.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
