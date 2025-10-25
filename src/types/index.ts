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