import { NewsItem } from '../types';

const API_KEY = 'YOUR_NEWS_API_KEY'; // NewsAPI key
const BASE_URL = 'https://newsapi.org/v2';

export const fetchTechNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=cybersecurity+OR+artificial+intelligence+OR+software+development&language=en&sortBy=publishedAt&pageSize=10&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const data = await response.json();
    
    return data.articles.map((article: any, index: number) => ({
      id: `news-${index}`,
      title: article.title,
      description: article.description || 'No description available',
      url: article.url,
      source: article.source.name,
      publishedAt: article.publishedAt,
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    return getFallbackNews();
  }
};

const getFallbackNews = (): NewsItem[] => [
  {
    id: 'fallback-1',
    title: 'Cybersecurity Trends 2024',
    description: 'Latest developments in cybersecurity and digital protection',
    url: '#',
    source: 'Tech News',
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'fallback-2',
    title: 'AI Revolution in Software Development',
    description: 'How artificial intelligence is transforming the coding landscape',
    url: '#',
    source: 'Dev Weekly',
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'fallback-3',
    title: 'Future of Web Technologies',
    description: 'Emerging frameworks and tools shaping the future of web development',
    url: '#',
    source: 'Web Dev News',
    publishedAt: new Date().toISOString(),
  },
];