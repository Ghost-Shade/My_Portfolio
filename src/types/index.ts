export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export interface FloatingObjectProps {
  mousePosition: { x: number; y: number };
}

export type Achievement = {
  id: string;
  platform: 'Bugcrowd' | 'HackerOne' | 'Other';
  title: string;
  description: string;
  date: string;
  link?: string;
  stats?: {
    rank?: string;
    reputation?: number;
    bugsSubmitted?: number;
    swagReceived?: string[];
  };
};

export type FunFact = {
  id: string;
  fact: string;
  icon: string; // emoji or icon class
  category: string;
};