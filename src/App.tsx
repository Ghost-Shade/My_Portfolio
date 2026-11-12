import { Suspense, lazy, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useMousePosition } from './hooks/useMousePosition';
import { initEmailJS } from './utils/email';
import { COLORS } from './constants';

const Navigation = lazy(() => import('./components/ui/Navigation'));
const HeroSection = lazy(() => import('./components/sections/HeroSection'));
const AboutSection = lazy(() => import('./components/sections/AboutSection'));
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection'));
const ContactSection = lazy(() => import('./components/sections/ContactSection'));
const WavesBackground = lazy(() => import('./components/three/WavesBackground'));
const FloatingObject = lazy(() => import('./components/three/FloatingObject'));
const LoadingScreen = lazy(() => import('./components/ui/LoadingScreen'));
const TerminalEasterEgg = lazy(() => import('./components/ui/TerminalEasterEgg'));
const Footer = lazy(() => import('./components/ui/Footer'));
const BlogsPage = lazy(() => import('./pages/BlogsPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

// AchievementsSection is intentionally NOT imported — the file is preserved
// in components/sections/AchievementsSection.tsx for future use.

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!target) return;
    const timer = setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
    return () => clearTimeout(timer);
  }, [location.key]);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}

function Background3D() {
  const mousePosition = useMousePosition();
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 5, 10], fov: 60 }}
          dpr={[1, 2]}
          gl={{ antialias: true }}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color={COLORS.accent} />
          <Suspense fallback={null}>
            <FloatingObject mousePosition={mousePosition} />
          </Suspense>
        </Canvas>
      </div>
      <Suspense fallback={null}>
        <WavesBackground />
      </Suspense>
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isBlogRoute = location.pathname.startsWith('/blogs');

  useEffect(() => {
    initEmailJS();
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    if (isBlogRoute) window.scrollTo({ top: 0 });
  }, [location.pathname, isBlogRoute]);

  return (
    <div className="relative" style={{ backgroundColor: COLORS.background }}>
      {/* 3D backgrounds are skipped on blog routes for readability + perf */}
      {!isBlogRoute && (
        <Suspense fallback={null}>
          <Background3D />
        </Suspense>
      )}

      <Suspense fallback={null}><TerminalEasterEgg /></Suspense>
      <Suspense fallback={null}><Navigation /></Suspense>

      <main className="relative z-10">
        <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: COLORS.background }} />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:slug" element={<BlogPostPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      <Suspense fallback={null}><Footer /></Suspense>

      {/* Overlay loading screen — content loads behind it during the 2s */}
      {isLoading && (
        <Suspense fallback={null}><LoadingScreen /></Suspense>
      )}
    </div>
  );
}