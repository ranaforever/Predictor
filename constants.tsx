
import { SportType, TeamStats, Match, MatchStatus, MatchType, CompetitionType } from './types';

export const TEAMS: TeamStats[] = [
  // Football Teams
  { id: 'f1', name: 'Spain', sport: SportType.FOOTBALL, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=spain', recentForm: ['W', 'W', 'W', 'D', 'W'], winRate: 85, avgScore: 2.8, concededScore: 0.8, homeWinRate: 90, awayWinRate: 80, ranking: 3 },
  { id: 'f2', name: 'England', sport: SportType.FOOTBALL, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=england', recentForm: ['L', 'W', 'D', 'W', 'L'], winRate: 60, avgScore: 1.5, concededScore: 1.2, homeWinRate: 65, awayWinRate: 55, ranking: 5 },
  { id: 'f3', name: 'Real Madrid', sport: SportType.FOOTBALL, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=madrid', recentForm: ['W', 'W', 'L', 'W', 'W'], winRate: 80, avgScore: 3.1, concededScore: 1.1, homeWinRate: 85, awayWinRate: 75, ranking: 1 },
  { id: 'f4', name: 'Manchester City', sport: SportType.FOOTBALL, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=city', recentForm: ['W', 'W', 'W', 'W', 'D'], winRate: 88, avgScore: 3.4, concededScore: 0.9, homeWinRate: 92, awayWinRate: 84, ranking: 2 },
  { id: 'f5', name: 'Arsenal', sport: SportType.FOOTBALL, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=arsenal', recentForm: ['W', 'D', 'W', 'W', 'L'], winRate: 72, avgScore: 2.1, concededScore: 1.0, homeWinRate: 78, awayWinRate: 66, ranking: 4 },
  
  // Cricket Teams
  { id: 'c1', name: 'India', sport: SportType.CRICKET, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=india', recentForm: ['W', 'W', 'W', 'W', 'L'], winRate: 82, avgScore: 310, concededScore: 280, homeWinRate: 88, awayWinRate: 76, ranking: 1 },
  { id: 'c2', name: 'Australia', sport: SportType.CRICKET, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=australia', recentForm: ['W', 'L', 'W', 'L', 'W'], winRate: 70, avgScore: 295, concededScore: 290, homeWinRate: 80, awayWinRate: 60, ranking: 2 },
  { id: 'c3', name: 'Mumbai Indians', sport: SportType.CRICKET, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=mumbai', recentForm: ['L', 'W', 'W', 'L', 'W'], winRate: 65, avgScore: 185, concededScore: 178, homeWinRate: 72, awayWinRate: 58, ranking: 3 },
  { id: 'c4', name: 'CSK', sport: SportType.CRICKET, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=chennai', recentForm: ['W', 'W', 'L', 'W', 'W'], winRate: 75, avgScore: 192, concededScore: 172, homeWinRate: 85, awayWinRate: 65, ranking: 2 },
  { id: 'c5', name: 'Surrey', sport: SportType.CRICKET, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=surrey', recentForm: ['W', 'D', 'W', 'L', 'W'], winRate: 60, avgScore: 450, concededScore: 420, homeWinRate: 70, awayWinRate: 50, ranking: 8 }
];

export const MOCK_MATCHES: Match[] = [
  // --- LIVE MATCHES ---
  { id: 'm1', sport: SportType.FOOTBALL, teamA: TEAMS[0], teamB: TEAMS[1], scoreA: 2, scoreB: 1, status: MatchStatus.LIVE, date: 'Today', time: "72'", venue: 'Berlin', matchType: MatchType.KNOCKOUT, competitionType: CompetitionType.INTERNATIONAL, leagueName: 'Euro Cup Final' },
  { id: 'm2', sport: SportType.FOOTBALL, teamA: TEAMS[2], teamB: TEAMS[4], scoreA: 1, scoreB: 1, status: MatchStatus.LIVE, date: 'Today', time: "34'", venue: 'Madrid', matchType: MatchType.KNOCKOUT, competitionType: CompetitionType.CLUB, leagueName: 'Champions League' },
  { id: 'm3', sport: SportType.CRICKET, teamA: TEAMS[5], teamB: TEAMS[6], scoreA: 214, scoreB: 189, status: MatchStatus.LIVE, date: 'Today', time: "44.2 Overs", venue: 'Mumbai', matchType: MatchType.LEAGUE, competitionType: CompetitionType.INTERNATIONAL, leagueName: 'ICC World Cup' },
  { id: 'm4', sport: SportType.CRICKET, teamA: TEAMS[7], teamB: TEAMS[8], scoreA: 82, scoreB: 45, status: MatchStatus.LIVE, date: 'Today', time: "8.1 Overs", venue: 'Chennai', matchType: MatchType.LEAGUE, competitionType: CompetitionType.LEAGUE, leagueName: 'IPL 2024' },

  // --- UPCOMING / FIXTURES ---
  { id: 'm5', sport: SportType.FOOTBALL, teamA: TEAMS[3], teamB: TEAMS[2], scoreA: 0, scoreB: 0, status: MatchStatus.UPCOMING, date: 'Tomorrow', time: "20:00", venue: 'Manchester', matchType: MatchType.LEAGUE, competitionType: CompetitionType.LEAGUE, leagueName: 'Premier League' },
  { id: 'm6', sport: SportType.CRICKET, teamA: TEAMS[9], teamB: TEAMS[7], scoreA: 0, scoreB: 0, status: MatchStatus.UPCOMING, date: 'May 25', time: "11:00", venue: 'The Oval', matchType: MatchType.LEAGUE, competitionType: CompetitionType.DOMESTIC, leagueName: 'County Championship' },
  { id: 'm7', sport: SportType.FOOTBALL, teamA: TEAMS[4], teamB: TEAMS[3], scoreA: 0, scoreB: 0, status: MatchStatus.UPCOMING, date: 'May 28', time: "19:45", venue: 'London', matchType: MatchType.KNOCKOUT, competitionType: CompetitionType.DOMESTIC, leagueName: 'FA Cup Semi-Final' },
  { id: 'm8', sport: SportType.CRICKET, teamA: TEAMS[5], teamB: TEAMS[8], scoreA: 0, scoreB: 0, status: MatchStatus.UPCOMING, date: 'June 01', time: "14:30", venue: 'Melbourne', matchType: MatchType.LEAGUE, competitionType: CompetitionType.INTERNATIONAL, leagueName: 'T20 World Cup' },

  // --- FINISHED / RESULTS ---
  { id: 'm9', sport: SportType.FOOTBALL, teamA: TEAMS[2], teamB: TEAMS[0], scoreA: 3, scoreB: 0, status: MatchStatus.FINISHED, date: 'May 18', venue: 'Bernabéu', matchType: MatchType.LEAGUE, competitionType: CompetitionType.CLUB, leagueName: 'La Liga' },
  { id: 'm10', sport: SportType.CRICKET, teamA: TEAMS[7], teamB: TEAMS[9], scoreA: 201, scoreB: 198, status: MatchStatus.FINISHED, date: 'May 15', venue: 'Wankhede', matchType: MatchType.LEAGUE, competitionType: CompetitionType.LEAGUE, leagueName: 'IPL 2024' },
  { id: 'm11', sport: SportType.FOOTBALL, teamA: TEAMS[1], teamB: TEAMS[5], scoreA: 1, scoreB: 2, status: MatchStatus.FINISHED, date: 'May 12', venue: 'Wembley', matchType: MatchType.FRIENDLY, competitionType: CompetitionType.INTERNATIONAL, leagueName: 'International Friendly' }
];
