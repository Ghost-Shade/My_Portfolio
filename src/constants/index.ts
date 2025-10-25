export const COLORS = {
  background: '#0A0A0A',
  accent: '#7A3EFF',
  text: '#EDEDED',
  textSecondary: '#A0A0A0',
  gradient: 'linear-gradient(135deg, #7A3EFF 0%, #4A1FA0 100%)',
} as const;

export const FONTS = {
  primary: 'Inter, system-ui, sans-serif',
  secondary: 'Poppins, system-ui, sans-serif',
} as const;

export const ANIMATIONS = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
  },
  easing: {
    ease: 'easeInOut',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
} as const;

export const SECTIONS = {
  hero: 'hero',
  about: 'about',
  projects: 'projects',
  news: 'news',
  contact: 'contact',
} as const;