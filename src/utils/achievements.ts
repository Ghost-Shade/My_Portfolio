import { Achievement, FunFact } from '../types/index';
export const fetchAchievements = async (): Promise<Achievement[]> => {
    return [
    {
      id: '1',
      platform: 'Bugcrowd',
      title: 'Top 10000 Researcher',
      description: 'Achieved top 10000 ranking in Bugcrowd\'s global leaderboard',
      date: '2025-01-20',
      link: 'https://bugcrowd.com/Ghost-Shade',
      stats: {
        rank: '#0',
        reputation: 0,
        bugsSubmitted: 5,
        swagReceived: ['Special Badge']
      }
    },
    {
      id: '2',
      platform: 'HackerOne',
      title: 'Newbie Hacker',
      description: 'Recognized as Newbie hacker',
      date: '2026-11-17',
      link: 'https://hackerone.com/Ghosts_Shade',
      stats: {
        rank: 'Top 0%',
        reputation: 0,
        bugsSubmitted: 1
      }
    },
    {
      id: '3',
      platform: 'Bugcrowd',
      title: 'Program Hall of Fame',
      description: 'Featured in hall of fame for 5+ private programs',
      date: '2025-01-20',
      link: 'https://bugcrowd.com/Ghost-Shade',
      stats: {
        swagReceived: ['Special Badge']
      }
    },
    // {
    //   id: '4',
    //   platform: 'Other',
    //   title: 'CTF',
    //   description: 'Participated',
    //   date: '2025-10-10',
    // },
    // {
    //   id: '5',
    //   platform: 'Other',
    //   title: 'CVE Published',
    //   description: 'Discovered and published CVE-2024-XXXXX',
    //   date: '2023-11-05',
    //   link: 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-XXXXX'
    // },
    // {
    //   id: '6',
    //   platform: 'Other',
    //   title: 'Conference Speaker',
    //   description: 'Presented research at BlackHat/Defcon',
    //   date: '2023-10-15',
    // }
  ];
};

export const fetchFunFacts = async (): Promise<FunFact[]> => {
    return [
    {
      id: '1',
      fact: 'Found my first bug in 2025',
      icon: '🐛',
      category: 'Career'
    },
    {
      id: '2',
      fact: 'Have tested on your current internet provider',
      icon: '🎯',
      category: 'Stats'
    },
    {
      id: '3',
      fact: 'My first project ever was driven by fear',
      icon: '🔐',
      category: 'Expertise'
    },
    {
      id: '4',
      fact: 'Kata master',
      icon: '🤖',
      category: 'Hobbies'
    },
    {
      id: '5',
      fact: 'Contributor to open-source security tools',
      icon: '📦',
      category: 'Community'
    },
    {
      id: '6',
      fact: '"Eunoia" is my favorite word',
      icon: '☕',
      category: 'Fun'
    },
    {
      id: '7',
      fact: 'Try to press CTRL + ` (backtick) to open a secret terminal right now!',
      icon: '🖥️',
      category: 'Fun'
    }
  ];
};