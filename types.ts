
export enum SportType {
  FOOTBALL = 'Football',
  CRICKET = 'Cricket',
  BASKETBALL = 'Basketball'
}

export enum MatchType {
  LEAGUE = 'League',
  FRIENDLY = 'Friendly',
  KNOCKOUT = 'Knockout'
}

export enum MatchStatus {
  LIVE = 'LIVE',
  UPCOMING = 'UPCOMING',
  FINISHED = 'FINISHED'
}

export enum ConfidenceLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface TeamStats {
  id: string;
  name: string;
  sport: SportType;
  logo: string;
  recentForm: string[];
  winRate: number;
  avgScore: number;
  concededScore: number;
  homeWinRate: number;
  awayWinRate: number;
  ranking: number;
}

export interface Match {
  id: string;
  sport: SportType;
  teamA: TeamStats;
  teamB: TeamStats;
  scoreA: number;
  scoreB: number;
  status: MatchStatus;
  date: string;
  time?: string;
  venue: string;
  matchType: MatchType;
  isInternational: boolean;
  leagueName: string;
}

export interface PredictionResult {
  probA: number;
  probB: number;
  probDraw: number;
  predictedWinner: string;
  confidence: ConfidenceLevel;
  explanation: string;
}

export interface MatchContext {
  sport: SportType;
  teamA: TeamStats;
  teamB: TeamStats;
  location: 'Home' | 'Away';
  matchType: MatchType;
  date: string;
}
