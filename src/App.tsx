import React from 'react';
import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { useMousePosition } from './hooks/useMousePosition';
import { initEmailJS } from './utils/email';
import { COLORS } from './constants';


// Lazy load components for better performance
const Navigation = () => import('./components/ui/Navigation').then(mod => mod.default);
const HeroSection = () => import('./components/sections/HeroSection').then(mod => mod.default);
const AboutSection = () => import('./components/sections/AboutSection').then(mod => mod.default);
const ProjectsSection = () => import('./components/sections/ProjectsSection').then(mod => mod.default);
//const NewsSection = () => import('./components/sections/NewsSection').then(mod => mod.default);
const AchievementsSection = () => import('./components/sections/AchievementsSection').then(mod => mod.default);
const ContactSection = () => import('./components/sections/ContactSection').then(mod => mod.default);
const WavesBackground = () => import('./components/three/WavesBackground').then(mod => mod.default);
const FloatingObject = () => import('./components/three/FloatingObject').then(mod => mod.default);
const LoadingScreen = () => import('./components/ui/LoadingScreen').then(mod => mod.default);
const TerminalEasterEgg = () => import('./components/ui/TerminalEasterEgg').then(mod => mod.default);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [NavigationComp, setNavigationComp] = useState<any>(null);
  const [HeroComp, setHeroComp] = useState<any>(null);
  const [AboutComp, setAboutComp] = useState<any>(null);
  const [ProjectsComp, setProjectsComp] = useState<any>(null);
  //const [NewsComp, setNewsComp] = useState<any>(null);
  const [AchievementsComp, setAchievementsComp] = useState<any>(null);
  const [ContactComp, setContactComp] = useState<any>(null);
  const [WavesComp, setWavesComp] = useState<any>(null);
  const [FloatingComp, setFloatingComp] = useState<any>(null);
  const [LoadingComp, setLoadingComp] = useState<any>(null);
  const [TerminalComp, setTerminalComp] = useState<any>(null);
  
  const mousePosition = useMousePosition();

  useEffect(() => {
    // Initialize EmailJS
    initEmailJS();

    // Load components
    const loadComponents = async () => {
      const [
        Nav,
        Hero,
        About,
        Projects,
        //News,
        Achievements,
        Contact,
        Waves,
        Floating,
        Loading,
        Terminal,
      ] = await Promise.all([
        Navigation(),
        HeroSection(),
        AboutSection(),
        ProjectsSection(),
        //NewsSection(),
        AchievementsSection(),
        ContactSection(),
        WavesBackground(),
        FloatingObject(),
        LoadingScreen(),
        TerminalEasterEgg(),
      ]);

      setNavigationComp(() => Nav);
      setHeroComp(() => Hero);
      setAboutComp(() => About);
      setProjectsComp(() => Projects);
      //setNewsComp(() => News);
      setAchievementsComp(() => Achievements);
      setContactComp(() => Contact);
      setWavesComp(() => Waves);
      setFloatingComp(() => Floating);
      setLoadingComp(() => Loading);
      setTerminalComp(() => Terminal);

      // Simulate loading time for better UX
      setTimeout(() => setIsLoading(false), 2000);
    };

    loadComponents();
  }, []);

  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  if (isLoading) {
    return (
      <div style={{ backgroundColor: COLORS.background }} className="min-h-screen">
        {LoadingComp && <LoadingComp />}
      </div>
    );
  }

  return (
    <div className="relative" style={{ backgroundColor: COLORS.background }}>
      {/* 3D Background */}
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
            {FloatingComp && <FloatingComp mousePosition={mousePosition} />}
          </Suspense>
        </Canvas>
      </div>

      {/* Waves Background */}
      {WavesComp && <WavesComp />}

      {/* Terminal Easter Egg */}
      {TerminalComp && <TerminalComp />}

      {/* Navigation */}
      {NavigationComp && <NavigationComp />}

      {/* Main Content */}
      <main className="relative z-10">
        {HeroComp && <HeroComp />}
        {AboutComp && <AboutComp />}
        {ProjectsComp && <ProjectsComp />}
        {/*NewsComp && <NewsComp />*/}
        {AchievementsComp && <AchievementsComp/>}
        {ContactComp && <ContactComp />}
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 py-8 px-6 border-t"
        style={{ 
          backgroundColor: COLORS.background,
          borderColor: `${COLORS.accent}30`
        }}
      >
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p style={{ color: COLORS.textSecondary }}>
              © 2025 Jamson Anjera. Built with passion and cutting-edge technology.
            </p>
            <p className="mt-2 text-sm" style={{ color: COLORS.textSecondary }}>
              Kind Sophistication • Crafted with React, Three.js, and ❤️
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default App;