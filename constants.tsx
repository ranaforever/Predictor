
import { SportType, TeamStats, Match, MatchStatus, MatchType } from './types';

export const TEAMS: TeamStats[] = [
  {
    id: 'f1',
    name: 'Spain',
    sport: SportType.FOOTBALL,
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=spain',
    recentForm: ['W', 'W', 'W', 'D', 'W'],
    winRate: 85,
    avgScore: 2.8,
    concededScore: 0.8,
    homeWinRate: 90,
    awayWinRate: 80,
    ranking: 3
  },
  {
    id: 'f2',
    name: 'England',
    sport: SportType.FOOTBALL,
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=england',
    recentForm: ['L', 'W', 'D', 'W', 'L'],
    winRate: 60,
    avgScore: 1.5,
    concededScore: 1.2,
    homeWinRate: 65,
    awayWinRate: 55,
    ranking: 5
  },
  {
    id: 'f3',
    name: 'Real Madrid',
    sport: SportType.FOOTBALL,
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=madrid',
    recentForm: ['W', 'W', 'L', 'W', 'W'],
    winRate: 80,
    avgScore: 3.1,
    concededScore: 1.1,
    homeWinRate: 85,
    awayWinRate: 75,
    ranking: 1
  },
  {
    id: 'f4',
    name: 'Manchester City',
    sport: SportType.FOOTBALL,
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=city',
    recentForm: ['W', 'W', 'W', 'W', 'D'],
    winRate: 88,
    avgScore: 3.4,
    concededScore: 0.9,
    homeWinRate: 92,
    awayWinRate: 84,
    ranking: 2
  },
  {
    id: 'f5',
    name: 'Arsenal',
    sport: SportType.FOOTBALL,
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=arsenal',
    recentForm: ['W', 'D', 'W', 'W', 'L'],
    winRate: 72,
    avgScore: 2.1,
    concededScore: 1.0,
    homeWinRate: 78,
    awayWinRate: 66,
    ranking: 4
  },
  {
    id: 'c1',
    name: 'India',
    sport: SportType.CRICKET,
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=india',
    recentForm: ['W', 'W', 'W', 'W', 'L'],
    winRate: 82,
    avgScore: 310,
    concededScore: 280,
    homeWinRate: 88,
    awayWinRate: 76,
    ranking: 1
  },
  {
    id: 'c2',
    name: 'Australia',
    sport: SportType.CRICKET,
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=australia',
    recentForm: ['W', 'L', 'W', 'L', 'W'],
    winRate: 70,
    avgScore: 295,
    concededScore: 290,
    homeWinRate: 80,
    awayWinRate: 60,
    ranking: 2
  }
];

export const MOCK_MATCHES: Match[] = [
  // --- LIVE MATCHES ---
  {
    id: 'm1',
    sport: SportType.FOOTBALL,
    teamA: TEAMS[0], // Spain
    teamB: TEAMS[1], // England
    scoreA: 2,
    scoreB: 1,
    status: MatchStatus.LIVE,
    date: 'Today',
    time: "72'",
    venue: 'Berlin Olympic Stadium',
    matchType: MatchType.KNOCKOUT,
    isInternational: true,
    leagueName: 'Euro Cup Final'
  },
  {
    id: 'm2',
    sport: SportType.FOOTBALL,
    teamA: TEAMS[2], // Real Madrid
    teamB: TEAMS[4], // Arsenal
    scoreA: 0,
    scoreB: 0,
    status: MatchStatus.LIVE,
    date: 'Today',
    time: "15'",
    venue: 'Santiago Bernabéu',
    matchType: MatchType.KNOCKOUT,
    isInternational: false,
    leagueName: 'Champions League'
  },
  {
    id: 'm3',
    sport: SportType.CRICKET,
    teamA: TEAMS[5], // India
    teamB: TEAMS[6], // Australia
    scoreA: 145,
    scoreB: 110,
    status: MatchStatus.LIVE,
    date: 'Today',
    time: "32.4 Overs",
    venue: 'Eden Gardens',
    matchType: MatchType.LEAGUE,
    isInternational: true,
    leagueName: 'World Cup'
  },

  // --- UPCOMING / FIXTURES ---
  {
    id: 'm4',
    sport: SportType.FOOTBALL,
    teamA: TEAMS[3], // Man City
    teamB: TEAMS[2], // Real Madrid
    scoreA: 0,
    scoreB: 0,
    status: MatchStatus.UPCOMING,
    date: 'Tomorrow',
    time: "20:45",
    venue: 'Etihad Stadium',
    matchType: MatchType.LEAGUE,
    isInternational: false,
    leagueName: 'Premier League'
  },
  {
    id: 'm5',
    sport: SportType.FOOTBALL,
    teamA: TEAMS[1], // England
    teamB: TEAMS[5], // India (Fantasy match-up)
    scoreA: 0,
    scoreB: 0,
    status: MatchStatus.UPCOMING,
    date: 'May 25',
    time: "18:00",
    venue: 'Wembley',
    matchType: MatchType.FRIENDLY,
    isInternational: true,
    leagueName: 'International Cup'
  },
  {
    id: 'm6',
    sport: SportType.FOOTBALL,
    teamA: TEAMS[4], // Arsenal
    teamB: TEAMS[1], // England
    scoreA: 0,
    scoreB: 0,
    status: MatchStatus.UPCOMING,
    date: 'May 26',
    time: "15:00",
    venue: 'Emirates Stadium',
    matchType: MatchType.LEAGUE,
    isInternational: false,
    leagueName: 'Premier League'
  },

  // --- FINISHED / RESULTS ---
  {
    id: 'm7',
    sport: SportType.FOOTBALL,
    teamA: TEAMS[2],
    teamB: TEAMS[0],
    scoreA: 1,
    scoreB: 4,
    status: MatchStatus.FINISHED,
    date: 'May 18',
    venue: 'Mestalla',
    matchType: MatchType.LEAGUE,
    isInternational: false,
    leagueName: 'La Liga'
  },
  {
    id: 'm8',
    sport: SportType.FOOTBALL,
    teamA: TEAMS[0],
    teamB: TEAMS[1],
    scoreA: 3,
    scoreB: 2,
    status: MatchStatus.FINISHED,
    date: 'May 15',
    venue: 'Stade de France',
    matchType: MatchType.FRIENDLY,
    isInternational: true,
    leagueName: 'International Friendly'
  },
  {
    id: 'm9',
    sport: SportType.FOOTBALL,
    teamA: TEAMS[4],
    teamB: TEAMS[3],
    scoreA: 0,
    scoreB: 2,
    status: MatchStatus.FINISHED,
    date: 'May 12',
    venue: 'Emirates Stadium',
    matchType: MatchType.LEAGUE,
    isInternational: false,
    leagueName: 'Premier League'
  }
];
