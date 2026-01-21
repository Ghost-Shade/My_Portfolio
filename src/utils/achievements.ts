import { Achievement, FunFact } from '../types/index';
export const fetchAchievements = async (): Promise<Achievement[]> => {
    return [
    {
      id: '1',
      platform: 'Bugcrowd',
      title: 'Top 100 Researcher',
      description: 'Achieved top 100 ranking in Bugcrowd\'s global leaderboard',
      date: '2024-03-15',
      link: 'https://bugcrowd.com/your-profile',
      stats: {
        rank: '#78',
        reputation: 2450,
        bugsSubmitted: 42,
        swagReceived: ['Hoodie', 'Stickers', 'Special Badge']
      }
    },
    {
      id: '2',
      platform: 'HackerOne',
      title: 'Elite Hacker',
      description: 'Recognized as Elite hacker with multiple critical findings',
      date: '2024-02-28',
      link: 'https://hackerone.com/your-profile',
      stats: {
        rank: 'Top 2%',
        reputation: 3150,
        bugsSubmitted: 37
      }
    },
    {
      id: '3',
      platform: 'Bugcrowd',
      title: 'Program Hall of Fame',
      description: 'Featured in hall of fame for 5+ private programs',
      date: '2024-01-20',
      link: 'https://bugcrowd.com/your-profile',
      stats: {
        swagReceived: ['Certificate', 'Exclusive Invite']
      }
    },
    {
      id: '4',
      platform: 'Other',
      title: 'CTF Champion',
      description: 'Won first place in regional cybersecurity competition',
      date: '2023-12-10',
    },
    {
      id: '5',
      platform: 'Other',
      title: 'CVE Published',
      description: 'Discovered and published CVE-2024-XXXXX',
      date: '2023-11-05',
      link: 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-XXXXX'
    },
    {
      id: '6',
      platform: 'Other',
      title: 'Conference Speaker',
      description: 'Presented research at BlackHat/Defcon',
      date: '2023-10-15',
    }
  ];
};

export const fetchFunFacts = async (): Promise<FunFact[]> => {
    return [
    {
      id: '1',
      fact: 'Found my first bug in 2018',
      icon: '🐛',
      category: 'Career'
    },
    {
      id: '2',
      fact: 'Have tested 100+ applications',
      icon: '🎯',
      category: 'Stats'
    },
    {
      id: '3',
      fact: 'Specialize in API & Mobile security',
      icon: '🔐',
      category: 'Expertise'
    },
    {
      id: '4',
      fact: 'Love automating recon workflows',
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
      fact: 'Brew my own coffee for late-night hacking sessions',
      icon: '☕',
      category: 'Fun'
    }
  ];
};