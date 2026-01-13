
import { MatchContext, TeamStats } from './types';

export const calculateHeuristicProbabilities = (context: MatchContext) => {
  const { teamA, teamB, location } = context;

  // Weightings
  const FORM_WEIGHT = 0.40;
  const RANK_WEIGHT = 0.30;
  const HOME_ADV_WEIGHT = 0.15;
  const HISTORIC_WEIGHT = 0.15;

  // 1. Recent Form Score (0-1)
  const getFormScore = (form: string[]) => {
    const points = form.reduce((acc, val) => acc + (val === 'W' ? 3 : val === 'D' ? 1 : 0), 0);
    return points / (form.length * 3);
  };

  const formScoreA = getFormScore(teamA.recentForm);
  const formScoreB = getFormScore(teamB.recentForm);

  // 2. Ranking Score (Inverted, lower rank is better)
  const maxRank = 50; 
  const rankScoreA = (maxRank - teamA.ranking) / maxRank;
  const rankScoreB = (maxRank - teamB.ranking) / maxRank;

  // 3. Home Advantage
  const homeAdvA = location === 'Home' ? 1.0 : 0.0;
  const homeAdvB = location === 'Away' ? 1.0 : 0.0;

  // Combine for Raw Score
  let scoreA = (formScoreA * FORM_WEIGHT) + (rankScoreA * RANK_WEIGHT) + (homeAdvA * HOME_ADV_WEIGHT);
  let scoreB = (formScoreB * FORM_WEIGHT) + (rankScoreB * RANK_WEIGHT) + (homeAdvB * HOME_ADV_WEIGHT);

  // Normalize to percentage
  const total = scoreA + scoreB;
  let probA = Math.round((scoreA / total) * 90); // Leave room for Draw
  let probB = Math.round((scoreB / total) * 90);
  
  // Simple Draw Logic (higher draw prob if scores are close)
  const diff = Math.abs(probA - probB);
  const probDraw = Math.max(5, 15 - Math.floor(diff / 2));

  // Final normalization to 100
  const finalTotal = probA + probB + probDraw;
  probA = Math.round((probA / finalTotal) * 100);
  probB = Math.round((probB / finalTotal) * 100);
  const finalDraw = 100 - probA - probB;

  return { probA, probB, probDraw: finalDraw };
};
