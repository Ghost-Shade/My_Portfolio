import { Achievement } from '../types/index';

export const fetchAchievements = async (): Promise<Achievement[]> => {
  return [
    {
      id: '1',
      platform: 'Bugcrowd',
      title: 'Top 10000 Researcher',
      description: "Achieved top 10000 ranking in Bugcrowd's global leaderboard",
      date: '2025-01-20',
      link: 'https://bugcrowd.com/Ghost-Shade',
      stats: { rank: '#0', reputation: 0, bugsSubmitted: 5, swagReceived: ['Special Badge'] },
    },
    {
      id: '2',
      platform: 'HackerOne',
      title: 'Newbie Hacker',
      description: 'Recognized as Newbie hacker',
      date: '2026-11-17',
      link: 'https://hackerone.com/Ghosts_Shade',
      stats: { rank: 'Top 0%', reputation: 0, bugsSubmitted: 1 },
    },
    {
      id: '3',
      platform: 'Bugcrowd',
      title: 'Program Hall of Fame',
      description: 'Featured in hall of fame for 5+ private programs',
      date: '2025-01-20',
      link: 'https://bugcrowd.com/Ghost-Shade',
      stats: { swagReceived: ['Special Badge'] },
    },
  ];
};